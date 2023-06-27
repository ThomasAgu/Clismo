import React from 'react'
import { useRouter } from 'next/router';
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faPlus} from '@fortawesome/free-solid-svg-icons'
//style
import styles from '../styles/entrenamientos.module.css'
//store
import { useSelector } from 'react-redux';
const Entrenamientos = () => {
  const router = useRouter();
  const user_role = useSelector(state=> state.login.user.role) //trae el id del usuario


  return (
    <div id={styles.content}>
      <NavBar/>
      <NavNarSesion/>
      <div id={styles.mainContent}>
        <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
          <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faBicycle} id={styles.icon}/></div>
          <h1 id={styles.title}>Entrenamientos</h1>
          {user_role === 'TEACHER'?
            <div id={styles.agregarEntrenamientoDiv}><button id={styles.agregarEntrenamientoBtn} onClick={()=> router.push('/Entrenamientos/CrearEntrenamiento')}><FontAwesomeIcon icon={faPlus} id={styles.addIcon}/> Crear Entrenamiento</button></div>
            :
            <></>
          }
        </div> 
        <h2 className={styles.subtitle}>Proximo entrenamiento</h2>
        <h2 className={styles.subtitle}>Historial</h2>
        
      </div>
    </div>
  )
}

export default Entrenamientos