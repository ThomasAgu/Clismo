import React from 'react'
import { useState, useEffect } from 'react'
//store
import { useDispatch } from 'react-redux'
import { agregarEntrenamiento } from '../../store/actions/actions'
//router
import { useRouter } from 'next/router'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import InputComponent from '../components/InputComponent'
import ExerciseItem from '../components/ExerciseItem'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faSquare } from '@fortawesome/free-solid-svg-icons'
// Styles
import styles from '../../styles/CrearEntrenamiento.module.css'
import ElegirEntrenamientos from './ElegirEntrenamientos'

const CrearEntrenamiento = () => {
  //utils
  const dispatch = useDispatch();
  const router = useRouter();
  //state
  const [name, setName] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [nivel, setNivel] = useState('')

  const [pasos, setPasos] = useState(1)
  const [activate, setActivate] =useState(false)

  const [ejercicios, setEjercicios] = useState([])
  // Guardar el total de ejercicios de la rutina y duracion
  const [cantEjercicios, setCantEjercicios] = useState()
  const [duracionTotal, setDuracionTotal] = useState()

  useEffect(() => {
    setCantEjercicios(ejercicios.length)
    setDuracionTotal(ejercicios.reduce(function(acc, ex) {
      return acc + Number(ex.parametros.duracion)
    }, 0))
  },[ejercicios])

  const handleChangeName = (e) =>{
    setName(name => e.target.value)
  }
  const handleChangeDescription = (e) =>{
    setDescripcion(descripcion => e.target.value)
  }
  const handleChangeRadio = (e) =>{
    setNivel(nivel => e.target.value)
  }


  const handleClickSiguiente  = (e) =>{
    e.preventDefault()
      setPasos(pasos => pasos + 1);
      setActivate(true)
  } 


  const handleClickAddEntrenamiento = () => {
    const entrenamiento = {
      "nombre": name,
      "descripcion": descripcion,
      "duracion":120,
      "dificultad": nivel,
      "ejercicios":[{}],
    }

    dispatch(agregarEntrenamiento(entrenamiento))
    router.back()
    //crear el entrenamiento llamando a la base de datos
  }
  
  return (
    <div id={styles.content}>
        <NavBar/>
        <NavNarSesion />
        <div>
            <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
                <FontAwesomeIcon icon={faBicycle} id={styles.icon}/> 
                <h1 id={styles.titleDiv}> Crear Entrenamiento </h1>
            </div>
        </div>
        <div >
            <form action="" className='m-auto' id={styles.form}>
                <InputComponent label={'Nombre'} type={'text'} valor={name} setValue={handleChangeName} tabIndex={4} ariaLabel={'Ingresa el nombre del nuevo entrenamiento'}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descripcion} setValue={handleChangeDescription} tabIndex={5} ariaLabel={'Ingresa la descripcion del nuevo entrenamiento'}/>
                {/* Radio dificultard */}
                <label htmlFor="" className='pt-3' id={styles.labelForRol} tabIndex={6} ariaLabel={'Selecciona la dificultad'}>Dificultad</label>
                <div className='d-flex w-100 justify-content-center  pb-3' id={styles.roleLabelsDiv}>
                    <input type="radio" id="opcion1" name="dificultad" value="principiante" className={styles.radio} tabIndex='7' aria-label='Dificultad: principiante' onChange={handleChangeRadio}/>
                    <label for="opcion1" className={styles.labelRadio}>Principiante</label>
                    <input type="radio" id="opcion2" name="dificultad" value="intermedio" className={styles.radio} tabIndex='8' aria-label='Dificultad: intermedio' onChange={handleChangeRadio}/>
                    <label for="opcion2" className={styles.labelRadio}>Intermedio</label>
                    <input type="radio" id="opcion3" name="dificultad" value="avanzado" className={styles.radio} tabIndex='9' aria-label='Dificultad: avanzado' onChange={handleChangeRadio}/>
                    <label for="opcion3" className={styles.labelRadio}>Avanzado</label>
                </div>
                {/* Radio de privacidad */}
              {activate ? 
                <div id={styles.secondPartContainer}>
                  <ElegirEntrenamientos activate={activate} pasos={pasos} ejercicios={ejercicios} setEjercicios={setEjercicios} />
                  <div id={styles.secondPartSecondColumn}>
                    <div id={styles.exerciseSquareBoxes}>
                      {ejercicios.map((ex) => {
                        return (
                          <ExerciseItem key={ex.nombre} />
                        )
                      })}
                      <FontAwesomeIcon icon={faSquare} id={styles.squares}/>
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
                <div className='d-flex justify-content-center'><button onClick={handleClickSiguiente} id={styles.siguienteBtn} >Siguiente</button></div>
                :
                <div className='d-flex justify-content-center'><button onClick={handleClickAddEntrenamiento} id={styles.finalizarBtn} > Finalizar </button></div>
              }
            </form>
        </div>
    </div>
  )
}

export default CrearEntrenamiento