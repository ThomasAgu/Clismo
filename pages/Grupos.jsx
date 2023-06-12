import React, { use } from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//Store D:
import { useDispatch, useSelector } from 'react-redux';
import { obtenerGrupos } from '../store/actions/actions'
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine } from '@fortawesome/free-solid-svg-icons';
//datos de prueba
import gruposList from '../datosParaProbar/grupos';
import GrupoCard from './components/GrupoCard';
import CrearGrupo from './Grupos/CrearGrupo';
const Grupos = () => {
  const grupos = useSelector(state=> state.grupos.grupos) //trae los grupos de la store
  const dispatch = useDispatch();

  
 

  const [gruposDisponibles, setGruposDisponibles] = useState([grupos.filter((g) => (g.privacidad === 'público')&&(g.cantidad_integrantes< g.capacidad))][0]);
  const [misGrupos, setMisGrupos] = useState([])
  
  useEffect(() => {
    setMisGrupos([])
  }, [])



  console.log(grupos)

  /* const [grupos, setGrupos] = useState([])
  useEffect(() =>{
    setGrupos(gruposList)
  }, []) */


  

  const router = useRouter();
  return (
    <div>
        <NavBar/>
        <NavNarSesion/>
        <div>
            <h2><FontAwesomeIcon icon={faUsersLine} /> Grupos </h2>
            <h4>Mis grupos</h4>
              <div className='d-flex flex-row flex-wrap gap-2 justify-content-center'>
                  {misGrupos.map((g) => {
                    return (
                    <GrupoCard 
                      key={g.nombre} 
                      nombre={g.nombre} 
                      descripcion={g.descripcion} 
                      privacidad={g.privacidad} 
                      cantIntegrantes={g.cantidad_integrantes} 
                      capacidad={g.capacidad} 
                      dificultad={g.dificultad}
                      />)
                    })}
                </div>
            <h4>Grupos publicos</h4>
              <div className='d-flex flex-row flex-wrap gap-2 justify-content-center'>
                {gruposDisponibles.map((g) => {
                    return(  
                      <GrupoCard 
                        key={g.nombre} 
                        nombre={g.nombre} 
                        descripcion={g.descripcion} 
                        privacidad={g.privacidad} 
                        cantIntegrantes={g.cantidad_integrantes} 
                        capacidad={g.capacidad} 
                        dificultad={g.dificultad}
                        setMisGrupos={setMisGrupos}
                        setGrupos={setGruposDisponibles}
                        grupos ={gruposDisponibles}
                        />
                    )
                  }
                )}
              </div>
            <button onClick={()=> router.push('/Grupos/CrearGrupo')}>Agregar Grupo</button>
        </div>
    </div>
  )
}

export default Grupos