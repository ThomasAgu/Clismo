import React from 'react'
import { useRouter } from 'next/router';
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'


const Entrenamientos = () => {
  const router = useRouter();

  return (
    <div>
      <NavBar/>
      <NavNarSesion/>
      <div>
        <h2><FontAwesomeIcon icon={faBicycle}/>Entrenamientos</h2>
        <h4>Proximo entrenamiento</h4>
        <h4>Mis entrenamientos</h4>
        <button onClick={()=> router.push('/Entrenamientos/CrearEntrenamiento')}>Crear Entrenamiento</button>
      </div>
    </div>
  )
}

export default Entrenamientos