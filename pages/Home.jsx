import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
//components
import NavBar from './components/NavBar'
import NavNarSesion from './components/NavNarSesion'
import InicioCardComponent from './components/InicioCardComponent'
//baseURL
import { BASE_URL } from './api/url'
//store
import { useSelector, useDispatch } from 'react-redux';
import { agregarEntrenamiento, loginSuccess } from '../store/actions/actions';

//styles 
import styles from '../styles/homeReal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,  faBicycle, faUsersLine, faUser, faGear} from '@fortawesome/free-solid-svg-icons'
import foto from '../public/images/foto.jpg'
import profile from '../public/images/profilePic.png'

const Home = () => {

  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
  const user_role = useSelector(state => state.login.user.role)
  const user = useSelector(state=> state.login.user) //trae el id del usuario
  
  //horarios
  const [dia, setDia] = useState('')
  const [horarioCompleto, setHorarioCompleto] = useState('')
  const [horario, setHorario] = useState({})

  const [thisWeekTrainings, setThisWeekTrainings]  = useState([])
  const [thisWeekTrainingsCompleted, setThisWeekTrainingsCompleted] = useState([])

  const dispatch = useDispatch();
  

  useEffect(() => {
    fetch(`${BASE_URL}users/${user_id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        user['id'] = result.id
        user["age"] = result.age,
        user['height'] = result.height
        user['weight'] = result.weight
        user['role'] = result.role
        user['username'] = result.username
        dispatch(loginSuccess(user));
        //Aca setear en la store los grupos que vienen con el usuario
      })
      
      
  }, [])

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
        
        const sched = [] 
        gruposPropios.map((g) =>{ g.schedules.map((s) => sched.push(s))})

        if(user_role === 'TEACHER'){
          const gruposDondeTeacheo = gruposTotales.filter((g)=>{ 
            if(g.teacher.id == user_id){
              return g
            } 
          })
          setThisWeekTrainings((state) => [...state,...gruposDondeTeacheo])
          gruposDondeTeacheo.map((g) => g.schedules.map((s => sched.push(s))))
        }
        setThisWeekTrainings(sched)
        //setear grupos publicos con capacidad donde no estoy
      })

      const diasSemana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
      const diaActual = new Date().getDay();
      
      fetch(`${BASE_URL}users/${user_id}/schedules/completed?days_lapse=${diaActual}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
      .then(result => {
          setThisWeekTrainingsCompleted(result.ids_of_realized_schedules)
        })
  }, [])

  const calculateWidth = () => {
    const per_total = thisWeekTrainings.length
    const per_actual = thisWeekTrainingsCompleted.length

    return Math.floor(((per_actual*100)/per_total))
  }


  
  const handleDelegateClass = (diaAct) => {
    return `${styles.btnDayInactive}`
  }
  return (
    <div id={styles.content}>
       <Head>
        <title>Home</title>
        <meta name="description" content="Home de clismo." />
        </Head>
        <NavBar/>
        <NavNarSesion/>
        <main >
          <div className='d-flex flex-column text-center mt-3' id={styles.title}>
                <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faHome} id={styles.icon} /> </div>
                <h1 id={styles.titleText}> Inicio </h1>
          </div>
           
            <div id={styles.mainContent}>
              {/* Aca ocurre la magia*/}
              <div id={styles.informacionPersonalSeccion}>
                <div id={styles.infoPersonalContent}>
                  <div id={styles.borderTop}></div>
                  <Image 
                    src={profile}
                    id={styles.img} 
                    alt='Foto de perfil'
                  />
                  <div id={styles.profileData}>
                    <h2>{user.username}</h2>
                    <h3>{user.role === 'TEACHER' ? 'Profesor': 'Estudiante'}</h3>
                  </div>

                 {/*  <p>stats</p> */}
                  <div id={styles.entrenamientos}>
                    <h4>Entrenamientos esta semana</h4>
                    <div id={styles.barraExterna} >
                      <div id={styles.barraInterna} style={{width: `${calculateWidth()}%`}}></div>
                    </div>
                  </div>
                  <div id={styles.borderBottom}>{thisWeekTrainingsCompleted.length}/{thisWeekTrainings.length}</div>
                </div>
            </div>
            {/* Aca ocurre la magia*/}
            {/* Entrenamientos dara 2da columan */}
             <div id={styles.entrenamientosSeccion}>
                <InicioCardComponent name={'Entrenamientos'} data={'Busca tus entrenamientos, historial y mas'} orientation={'left'} icon={faBicycle} ruta={'/Entrenamientos'} />
                <InicioCardComponent name={'Grupos'} data={'Mira en que grupos te podes meter ademas de los grupos liberados'} orientation={'right'} icon={faUsersLine} ruta={'/Grupos'}/>
                <InicioCardComponent name={'Yo'} data={'Mira tus estadisticas'} orientation={'left'} icon={faUser} ruta={'/Yo'}/>
                <InicioCardComponent name={'Configuracion'} data={'Todavia no implementado'} orientation={'right'} icon={faGear}/>
             </div>
          </div>
        </main>
    </div>
  )
}

export default Home