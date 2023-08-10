import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
import EntrenamientoCard from './components/EntrenamientoCard';
import Calendar from './components/Calendar';
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faPlus} from '@fortawesome/free-solid-svg-icons'
//style
import styles from '../styles/entrenamientos.module.css'
//store
import { BASE_URL } from './api/url';
import { useSelector } from 'react-redux';
import { obtenerEntrenamientos } from '../store/actions/actions';
import ProxEntrenamiento from './components/ProxEntrenamiento';
import SemanaDeEntrenamientos from './components/SemanaDeEntrenamientos';
import BorrarEntrenamiento from './components/BorrarEntrenamiento';
import HistorialCard from './components/HistorialCard.jsx'  
import NotificacionPopUpComponent from './components/NotificacionPopUpComponent';
import grupos from '../datosParaProbar/grupos';

const Entrenamientos = () => {
  const router = useRouter();
  const user_role = useSelector(state=> state.login.user.role) //trae el id del usuario
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

  const [misEntrenamientos, setMisEntrenamientos] = useState([])
  const [misGrupos, setMisGrupos] = useState([])
  const [scheduleTotal, setScheduleTotal] = useState([])
  const [primerEntrenamiento, setprimerEntrenamiento] = useState({})
  //para el borrado
  const [activateDel, setActivateDel] = useState(false)
  const [name, setName] = useState('')
  //para el historial 
  const [historial, setHistorial] = useState([])
  //para el popup
  const [msg, setMsg] = useState('')
  const [todoBienOMal,setTodoBienOMal] =useState('todobien')
  const [popUp, setPopUp ] = useState(false)

  const diasSemana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  
  useEffect(() => {
    fetch(`${BASE_URL}groups/list`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        //setear mis grupos 
        const gruposTotales = result
        const gruposPropios = gruposTotales.filter((g)=>{ 
          if(g.users.filter((user) => user.id === user_id).length !== 0){
            return g
          } 
        })
        setMisGrupos(gruposPropios)
        
       
        const sched = [] 
        gruposPropios.map((g) =>{ g.schedules.map((s) => sched.push(s))})
        

        //agregar los entrenamientos donde soy profe
        if(user_role === 'TEACHER'){
          const gruposDondeTeacheo = gruposTotales.filter((g)=>{ 
            if(g.teacher.id == user_id){
              return g
            } 
          })
          setMisGrupos((state) => [...state,...gruposDondeTeacheo])
          gruposDondeTeacheo.map((g) => g.schedules.map((s => sched.push(s))))
        }
                
        setScheduleTotal(sched)
        //proximo calcular
        const diaActual = new Date().getDay(); 
        const schedOrdenado = sched.sort((a,b) => diasSemana.indexOf(a.day) - diasSemana.indexOf(b.day))
       
        const schedFiltradoPorDiaSemana = schedOrdenado.filter((d) => diasSemana.indexOf(d.day) >= diaActual)
        if(schedFiltradoPorDiaSemana.length > 0) {
          setprimerEntrenamiento(schedFiltradoPorDiaSemana[0])
        }
        else{
          setprimerEntrenamiento(schedOrdenado[0])
        }
      })

      //entrenamientos
      fetch(`${BASE_URL}trainings/list`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        const traingingTotales = result
        if(user_role === 'TEACHER'){
        const trainingsPropios = traingingTotales.filter((t) =>{
          if(t.teacher_id === user_id){
            return t
          } 
        })
        if(trainingsPropios.length !== 0){
          setMisEntrenamientos(trainingsPropios)
        }
      }
        const idEntrenamientos = misGrupos.map((e) => e.schedules.map((s) =>  s.training_id)[0])
        
      
        const entrenamientosAnotado = traingingTotales.filter((t) =>{
          if (idEntrenamientos.indexOf(t.id )!== -1){
            return t
          }
        })
        //historial get
        setHistorial([])
        fetch(`${BASE_URL}users/${user_id}/schedules/completed/allData?days_lapse=7`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(result => {
              const idsSched = result.record_of_realized_schedules.map((el) => el.schedule_id)
              const realized_at = result.record_of_realized_schedules.map((el) =>el.realized_at)
              //terminar aca :D
              idsSched.map((id, index)=>{
                fetch(`${BASE_URL}/schedules/${id}`,{
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(result => {
                const data = result
                data.realized_at = realized_at[index]

                setHistorial((el) => [...el, data])
              })
            }) 
          })
      })
  }, [])



  
  return (
    <div id={styles.content}>
      <Head>
      <title>Entrenamientos</title>
        <meta name="description" content="Entrenamientos de clismo." />
      </Head>
      <NavBar/>
      <NavNarSesion/>
      <BorrarEntrenamiento active={activateDel} setActive={setActivateDel} name={name} setPopUp={setPopUp} setMsg={setMsg} setTodoBienOMal={setTodoBienOMal}/>
      <div id={styles.mainContent}>
        <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
          <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faBicycle} id={styles.titleIcon}/></div>
          <h1 id={styles.title}>Entrenamientos</h1>
          {user_role === 'TEACHER'?
            <div id={styles.agregarEntrenamientoDiv}><button id={styles.agregarEntrenamientoBtn} onClick={()=> router.push('/Entrenamientos/CrearEntrenamiento')}><FontAwesomeIcon icon={faPlus} id={styles.addIcon}/> Crear Entrenamiento</button></div>
            :
            <></>
          }
        </div> 
        
        {primerEntrenamiento == undefined ? <div id={styles.noHayNadaContent}> {user_role !== "TEACHER" ? <h2 id={styles.noHayNadaTitle}>Actualmente, no estas anotado en ningún grupo...</h2>: <h2 id={styles.noHayNadaTitle}>Actualmente,no creaste ningún grupo...</h2>}</div>:<h2 className={styles.subtitle}>Proximo entrenamiento</h2>}
        {primerEntrenamiento !== undefined ? 
        <section id={styles.firstSection}>
          <div id={styles.fsFirstElement}>
            <ProxEntrenamiento primerEntrenamiento={primerEntrenamiento} historial={historial} setHistorial={setHistorial}/>
          </div>
          <div id={styles.fsSecondElement}>
            <SemanaDeEntrenamientos scheduleTotal={scheduleTotal}/>
          </div>
      
        </section>
        :
        <></>
        }
        {user_role === 'TEACHER' && misEntrenamientos.length > 0 ? <h2 className={styles.subtitle}>Entrenamientos creados</h2> : <></>}
        {user_role === 'TEACHER' ? 
          <section id={styles.misEntrenamientosSection}>
            {misEntrenamientos.map((el) => <EntrenamientoCard key={el.id} props={el} setActiveDel={setActivateDel} setName={setName}/>)}
          </section> : <></>}
        {historial.length > 0 ? <h2 className={styles.subtitle}>Historial</h2>: <></>}
        <div>
          {historial.length > 0 ?  
            <div>
              <Calendar historial={historial}/>
            </div>
            :
          <></>}
          
        </div>
        
      </div>
      { popUp ? 
        <NotificacionPopUpComponent msg={msg} todoBienOtodoMal={todoBienOMal} active={popUp} setActive={setPopUp} tiempo={100}/>
      :
      <></>
      }
    </div>
  )
}

export default Entrenamientos