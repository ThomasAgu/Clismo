import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
import EntrenamientoCard from './components/EntrenamientoCard';
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

const Entrenamientos = () => {
  const router = useRouter();
  const user_role = useSelector(state=> state.login.user.role) //trae el id del usuario
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

  const [misEntrenamientos, setMisEntrenamientos] = useState([])
  const [misGrupos, setMisGrupos] = useState([])
  const [scheduleTotal, setScheduleTotal] = useState([])
  const [primerEntrenamiento, setprimerEntrenamiento] = useState({})
  const [primerEntrenamientoData, setPrimerEntrenamientoData] = useState({})
  //para el borrado
  const [activateDel, setActivateDel] = useState(false)
  const [name, setName] = useState('')
  //para el historial 
  const [historial, setHistorial] = useState([])
  
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
        setScheduleTotal(sched)
        //proximo calcular
        setprimerEntrenamiento(sched[0])
        //setear grupos publicos con capacidad donde no estoy
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
        console.log('entreenamiento proximo ', entrenamientosAnotado)

        const data = entrenamientosAnotado.filter((el) => el.id == primerEntrenamiento.training_id)
        console.log('data ', data[0])
        setPrimerEntrenamientoData(data[0])


        //historial get
        setHistorial([])
        fetch(`${BASE_URL}users/${user_id}/schedules/completed?days_lapse=7`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(result => {
        const idsSched = result.ids_of_realized_schedules

        idsSched.map((id)=>{
          fetch(`${BASE_URL}users/${user_id}/schedules/completed?days_lapse=7`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(result => {
              const idsSched = result.ids_of_realized_schedules
  
              idsSched.map((id)=>{
                fetch(`${BASE_URL}/schedules/${id}`,{
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(result => {
                setHistorial((el) => [...el, result])
              })
            })
          })
        })
      })
    })
  }, [])



  
  return (
    <div id={styles.content}>
      <NavBar/>
      <NavNarSesion/>
      <BorrarEntrenamiento active={activateDel} setActive={setActivateDel} name={name}/>
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
        <h2 className={styles.subtitle}>Proximo entrenamiento</h2>
        <section id={styles.firstSection}>
          <div id={styles.fsFirstElement}>
            <ProxEntrenamiento primerEntrenamiento={primerEntrenamiento} primerEntrenamientoData={primerEntrenamientoData}/>
          </div>
          <div id={styles.fsSecondElement}>
            <SemanaDeEntrenamientos scheduleTotal={scheduleTotal}/>
          </div>
      
        </section>
        {user_role === 'TEACHER' ? <h2 className={styles.subtitle}>Entrenamientos creados</h2> : <></>}
        {user_role === 'TEACHER' ? 
          <section id={styles.misEntrenamientosSection}>
            {misEntrenamientos.map((el) => <EntrenamientoCard key={el.id} props={el} setActiveDel={setActivateDel} setName={setName}/>)}
          </section> : <></>}
        <h2 className={styles.subtitle}>Historial</h2>
        <div>
          {historial.map((h) => <HistorialCard key={h.id} data={h}/>)}
        </div>
        
      </div>
    </div>
  )
}

export default Entrenamientos