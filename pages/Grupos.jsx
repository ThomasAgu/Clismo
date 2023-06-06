import React from 'react'
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine } from '@fortawesome/free-solid-svg-icons';
//datos de prueba
import grupos from '../datosParaProbar/grupos';
import GrupoCard from './components/GrupoCard';
const Grupos = () => {
  return (
    <div>
        <NavBar/>
        <NavNarSesion/>
        <div>
            <h2><FontAwesomeIcon icon={faUsersLine} /> Grupos </h2>
            <h4>Mis grupos</h4>
                <p>Aca poner los grupos a los que formo parte </p>
            <h4>Grupos publicos</h4>
                {grupos.map((g) => <GrupoCard />)}
                <p>Aca va el listado de los grupos publicos. Agregar boton para dificultad (itermedio, principiante, avanzado)</p>
            
            <button>Agregar Grupo</button>
        </div>
    </div>
  )
}

export default Grupos