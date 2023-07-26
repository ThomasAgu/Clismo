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
import BorrarGrupoComponent from './components/BorrarGrupoComponent';
//apo
import { BASE_URL } from './api/url';
//style
import styles from '../styles/Grupos.module.css'
const Grupos = () => {
 
  const user_role = useSelector(state=> state.login.user.role) //trae el rol del usuario
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
  const dispatch = useDispatch();
  
 

  const [gruposDisponibles, setGruposDisponibles] = useState([]);
  const [misGrupos, setMisGrupos] = useState([])
  const [gruposProfe, setGruposProfe] = useState([])
  
  //para el borrado
  const [activateDel, setActivateDel] = useState(false)
  const [name, setName] = useState('')
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
        //setear grupos publicos con capacidad donde no estoy
        const gruposPublicosQueNoEstoy = gruposTotales.filter((g)=>{ 
          if((g.users.filter((user) => user.id === user_id).length === 0)&&(g.privacy === 'PUBLIC')&&(g.teacher.id !== user_id)){
            return g
          } 
        })
        setGruposDisponibles(gruposPublicosQueNoEstoy)
        //setear grupos donde soy profe
        if(user_role === 'TEACHER'){
          const gruposDondeSoyProfe = gruposTotales.filter((g) => {
            return g.teacher.id === user_id
          })
          console.log('grupos sot profe', gruposDondeSoyProfe)
          setGruposProfe(gruposDondeSoyProfe)
        }
      })
  }, [])


  const router = useRouter();
  return (
    <div id={styles.bigDiv}>
        <NavBar/>
        <NavNarSesion/>
        <BorrarGrupoComponent active={activateDel} setActive={setActivateDel} name={name}/>
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

            {gruposProfe.length !== 0?
            <div>
              <h2 className={styles.subtitle}> Soy profe de</h2>
              <div className='d-flex flex-row flex-wrap gap-2 justify-content-center'>
                {gruposProfe.map((g) => {
                  return (
                    <GrupoCard 
                    key={g.id} 
                    nombre={g.name} 
                    descripcion={g.description} 
                    privacidad={g.privacy} 
                    cantIntegrantes={g.users.length} 
                    capacidad={g.capacity} 
                    dificultad={g.difficulty}
                    setMisGrupos={setGruposProfe}
                    setGrupos={setGruposProfe}
                    grupos ={gruposProfe}
                    misGrupos={gruposProfe}
                    setActivateDel={setActivateDel}
                    setName={setName}
                  />)
                  })}
                </div>
              </div>
              :
              <></>
            }

            {misGrupos.length !== 0? 
              <div>
                <h2 className={styles.subtitle}>Mis grupos</h2>
                <div className='d-flex flex-row flex-wrap gap-2 justify-content-center'>
                    {misGrupos.map((g) => {
                      return (
                      <GrupoCard 
                        key={g.id} 
                        nombre={g.name} 
                        descripcion={g.description} 
                        privacidad={g.privacy} 
                        cantIntegrantes={g.users.length} 
                        capacidad={g.capacity} 
                        dificultad={g.difficulty}
                        setMisGrupos={setMisGrupos}
                        setGrupos={setGruposDisponibles}
                        grupos ={misGrupos}
                        misGrupos={gruposDisponibles}
                        unido={true}
                        />)
                      })}
                  </div>
                </div>
            :
            <></>}
            {gruposDisponibles.length !== 0? 
              <div>
                <h2 className={styles.subtitle}>Grupos publicos</h2>
              <div className='d-flex flex-row flex-wrap gap-2 justify-content-center'>
                {gruposDisponibles.map((g) => {
                    return(  
                      <GrupoCard 
                        key={g.id} 
                        nombre={g.name} 
                        descripcion={g.description} 
                        privacidad={g.privacy} 
                        cantIntegrantes={g.users.length} 
                        capacidad={g.capacity} 
                        dificultad={g.difficulty}
                        setMisGrupos={setMisGrupos}
                        setGrupos={setGruposDisponibles}
                        grupos ={gruposDisponibles}
                        />
                    )
                  }
                )}
              </div>
              </div>
              :
              <></>
            }
              
        </div>
    </div>
  )
}

export default Grupos