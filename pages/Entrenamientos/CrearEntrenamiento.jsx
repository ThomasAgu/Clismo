import React, { use } from 'react'
import { useState, useEffect } from 'react'
//store
import { useDispatch, useSelector } from 'react-redux'
import { agregarEntrenamiento } from '../../store/actions/actions'
//router
import { useRouter } from 'next/router'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import InputComponent from '../components/InputComponent'
import ExerciseItem from '../components/ExerciseItem'
import BackArrow from '../components/BackArrow'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faSquare } from '@fortawesome/free-solid-svg-icons'
// Styles
import styles from '../../styles/CrearEntrenamiento.module.css'
import ElegirEntrenamientos from './ElegirEntrenamientos'
import { BASE_URL } from '../api/url'

const CrearEntrenamiento = () => {
  //utils
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
  const dispatch = useDispatch();
  const router = useRouter();
  //state
  const [name, setName] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [pasos, setPasos] = useState(1)
  const [activate, setActivate] =useState(false)

  const [ejercicios, setEjercicios] = useState([])
  // Guardar el total de ejercicios de la rutina y duracion
  const [cantEjercicios, setCantEjercicios] = useState()
  const [duracionTotal, setDuracionTotal] = useState()

  //actial ex
  const [actEx, setActEx] = useState()

  useEffect(() => {
    setCantEjercicios(ejercicios.length)
    setDuracionTotal(ejercicios.reduce(function(acc, ex) {
      return acc + Number(ex.duration)
    }, 0))
  },[ejercicios])

  const handleChangeName = (e) =>{
    setName(name => e.target.value)
  }
  const handleChangeDescription = (e) =>{
    setDescripcion(descripcion => e.target.value)
  }


  const handleClickSiguiente  = (e) =>{
    e.preventDefault()
      setPasos(pasos => pasos + 1);
      setActivate(true)
  } 


  const handleClickAddEntrenamiento = (e) => {
    const entrenamiento = {
      "name": name,
      "description": descripcion,
      "teacher_id": user_id,
      "exercises":ejercicios,
    }
    
    fetch(`${BASE_URL}trainings/create`,{
      method: 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(entrenamiento)
    })
      .then(response => response.json())
      .then(result =>{
        dispatch(agregarEntrenamiento(entrenamiento))
        //router.back()
      })
      .catch(err =>{
        console.error('Error: ', err)
      });
  }

  const handleClickSetearEntrenamiento = (ex) =>{
    //setear valores de entrenamiento. Boton actualizar, o borrar
    setActEx(ex)
  }
  
  return (
    <div id={styles.content}>
        <NavBar/>
        <NavNarSesion />
        <BackArrow />
        <div>
            <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
                <div id={styles.iconContent}><FontAwesomeIcon icon={faBicycle} id={styles.icon}/> </div>
                <h1 id={styles.titleDiv}> Crear Entrenamiento </h1>
            </div>
        </div>
        <div >
            <form action="" className='m-auto' id={styles.form}>
                <InputComponent label={'Nombre'} type={'text'} valor={name} setValue={handleChangeName} tabIndex={4} ariaLabel={'Ingresa el nombre del nuevo entrenamiento'}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descripcion} setValue={handleChangeDescription} tabIndex={5} ariaLabel={'Ingresa la descripcion del nuevo entrenamiento'}/>
              
              {activate ? <h2 id={styles.h2Form}>Rutina</h2> : <></>}
              {activate ? 
              
                <div id={styles.secondPartContainer}>
                  <ElegirEntrenamientos activate={activate} pasos={pasos} ejercicios={ejercicios} setEjercicios={setEjercicios} actEx={actEx} setActEx={setActEx}/>
                  <div id={styles.secondPartSecondColumn}>
                    <div id={styles.exerciseSquareBoxes}>
                      {ejercicios.map((ex) => {
                        return (
                          <ExerciseItem key={ex.nombre} ex={ex} click={handleClickSetearEntrenamiento} actEx={actEx}/>
                        )
                      })}
                      {actEx === undefined  ? <FontAwesomeIcon icon={faSquare} id={styles.squares}/> : '' 
}
                    </div>
                    <div id={styles.exerciseTotalStadistics}>
                      <p><strong className={styles.numero}>{cantEjercicios}</strong> Ejercicios</p>
                      <p><strong className={styles.numero}>{duracionTotal}</strong> minutos</p>
                    </div>
                  </div>
              </div>
              :
              <></>}
              
              {(pasos < 2) ?
                <div className='d-flex justify-content-center'><button onClick={handleClickSiguiente} id={styles.siguienteBtn} >Rutina</button></div>
                :
                <div className='d-flex justify-content-center'><button onClick={handleClickAddEntrenamiento} id={styles.finalizarBtn} > Finalizar </button></div>
              }
            </form>
        </div>
    </div>
  )
}

export default CrearEntrenamiento