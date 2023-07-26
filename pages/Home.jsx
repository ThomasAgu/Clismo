import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
//components
import NavBar from './components/NavBar'
import NavNarSesion from './components/NavNarSesion'
import MostrarHoras from './components/MostrarHoras'
//baseURL
import { BASE_URL } from './api/url'
//store
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';
//styles 
import styles from '../styles/homeReal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
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
              <div id={styles.proximoEntrenamiento}>
                <h4>Proximo entrenamiento</h4>
                <div id={styles.proximoEntrenamientoDetails}>
                  <div id={styles.proximoEntrenamientoDetailsInfo}>
                    <h5>Nombre</h5>
                    <p id={styles.descripccion}>Descripcion</p>
                    <p id={styles.duracion}>Duracion | Cant Ejercicios </p>
                  </div>
                  <div id={styles.proximoEntrenamientoCalendarInfo}> 
                    <FontAwesomeIcon icon={faCalendar} id={styles.iconCalendar}/>
                    <p id={styles.dayCalendar}>32/4</p>
                  </div>
                </div>
              </div>
              {/* Aca se termina prox entrenamiento */}
              <div id={styles.horarios}>
                <h4>Horarios</h4>
                <div id={styles.horariosBigDiv}>
                  <div id={styles.horariosDiv}>
                    <button onClick={handleSelecDia} className={dia.day === 'MONDAY' ? styles.btnDayActive : handleDelegateClass('MONDAY')}  id='L' value={'MONDAY'}>L</button>
                    <button onClick={handleSelecDia} className={dia.day === 'TUESDAY' ? styles.btnDayActive : handleDelegateClass('TUESDAY')}  id='M' value={'TUESDAY'}>M</button>
                    <button onClick={handleSelecDia} className={dia.day === 'WEDNESDAY' ? styles.btnDayActive : handleDelegateClass('WEDNESDAY')}  id='X' value={'WEDNESDAY'}>X</button>
                    <button onClick={handleSelecDia} className={dia.day === 'THURSDAY' ? styles.btnDayActive : handleDelegateClass('THURSDAY')}  id='J' value={'THURSDAY'}>J</button>
                    <button onClick={handleSelecDia} className={dia.day === 'FRIDAY' ? styles.btnDayActive : handleDelegateClass('FRIDAY')}  id='V' value={'FRIDAY'}>V</button>
                    <button onClick={handleSelecDia} className={dia.day === 'SATURDAY' ? styles.btnDayActive : handleDelegateClass('SATURDAY')}  id='S' value={'SATURDAY'}>S</button>
                    <button onClick={handleSelecDia} className={dia.day === 'SUNDAY' ? styles.btnDayActive : handleDelegateClass('SUNDAY')}  id='D' value={'SUNDAY'}>D</button>
                  </div>
                <MostrarHoras dia={dia} setDia={setDia} horarioCompleto={horarioCompleto}/>
              </div>
              </div>
              <div>CAlendario y stats</div>
             </div>
            {/* Entrenamientos dara 2da columan */}
           
            <div id={styles.gruposSeccion}>Grupos data</div>
          </div>
        </main>
    </div>
  )
}

export default Home