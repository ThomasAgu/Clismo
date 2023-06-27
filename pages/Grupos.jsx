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
import { faUsersLine, faPlus } from '@fortawesome/free-solid-svg-icons';
//datos de prueba
import gruposList from '../datosParaProbar/grupos';
import GrupoCard from './components/GrupoCard';
import CrearGrupo from './Grupos/CrearGrupo';
//style
import styles from '../styles/Grupos.module.css'
const Grupos = () => {
  const grupos = useSelector(state=> state.grupos.grupos) //trae los grupos de la store
  const user_role = useSelector(state=> state.login.user.role) //trae el id del usuario
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
        <div  id={styles.content}>
            <div className='d-flex flex-column text-center mt-3' id={styles.title}>
                <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faUsersLine} id={styles.icon} /> </div>
                <h1 id={styles.titleText}> Grupos </h1>
                {user_role === 'TEACHER'?
                  <div id={styles.agregarGroupDiv}><button id={styles.agregarGroupBtn} onClick={()=> router.push('/Grupos/CrearGrupo')}><FontAwesomeIcon icon={faPlus} id={styles.addIcon}/>  Agregar Grupo </button></div>
                  :
                  <></>
                }
            </div>

            {misGrupos.length !== 0? 
              <div>
                <h2 className={styles.subtitle}>Mis grupos</h2>
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
                        setMisGrupos={setMisGrupos}
                        setGrupos={setGruposDisponibles}
                        grupos ={gruposDisponibles}
                        misGrupos={misGrupos}
                        unido={true}
                        />)
                      })}
                  </div>
                </div>
            :
            <></>}
            
            <h2 className={styles.subtitle}>Grupos publicos</h2>
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
        </div>
    </div>
  )
}

export default Grupos