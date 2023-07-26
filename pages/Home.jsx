import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
//components
import NavBar from './components/NavBar'
import NavNarSesion from './components/NavNarSesion'
import InicioCardComponent from './components/InicioCardComponent'
//baseURL
import { BASE_URL } from './api/url'
//store
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';

//styles 
import styles from '../styles/homeReal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,  faBicycle, faUsersLine, faUser, faGear} from '@fortawesome/free-solid-svg-icons'
import foto from '../public/images/foto.jpg'
const Home = () => {

  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
  const user = useSelector(state=> state.login.user) //trae el id del usuario
  
  //horarios
  const [dia, setDia] = useState('')
  const [horarioCompleto, setHorarioCompleto] = useState('')
  const [horario, setHorario] = useState({})

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
        console.log(result)
        //Aca setear en la store los grupos que vienen con el usuario
      })
      
  }, [])

  const handleSelecDia = (e) => {
    e.preventDefault()
     
  }

  const handleDelegateClass = (diaAct) => {
    return `${styles.btnDayInactive}`
  }
  return (
    <div id={styles.content}>
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
                    src={foto}
                    id={styles.img} 
                    alt='Foto de perfil'
                  />
                  <div id={styles.profileData}>
                    <h3>{user.username}</h3>
                    <p>{user.role === 'TEACHER' ? 'Profesor': 'Estudiante'}</p>
                  </div>

                 {/*  <p>stats</p> */}
                  <div id={styles.entrenamientos}>
                    <h4>Entrenamientos esta semana</h4>
                    <div id={styles.barraExterna}>
                      <div id={styles.barraInterna}></div>
                    </div>
                  </div>
                  <div id={styles.borderBottom}>1/4</div>
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