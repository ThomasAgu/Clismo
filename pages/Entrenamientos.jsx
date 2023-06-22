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

const Entrenamientos = () => {
  const router = useRouter();

  return (
    <div id={styles.content}>
      <NavBar/>
      <NavNarSesion/>
      <div id={styles.mainContent}>
        <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
          <FontAwesomeIcon icon={faBicycle} id={styles.icon}/> 
          <h1 id={styles.title}>Entrenamientos</h1>
          <div id={styles.agregarEntrenamientoDiv}><button id={styles.agregarEntrenamientoBtn} onClick={()=> router.push('/Entrenamientos/CrearEntrenamiento')}><FontAwesomeIcon icon={faPlus}/> Crear Entrenamiento</button></div>
        </div> 
        <h2 className={styles.subtitle}>Proximo entrenamiento</h2>
        <h2 className={styles.subtitle}>Historial</h2>
        
      </div>
    </div>
  )
}

export default Entrenamientos