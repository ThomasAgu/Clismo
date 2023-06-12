import React from 'react'
import { useState } from 'react'
//store
import { useDispatch } from 'react-redux'
import { agregarEntrenamiento } from '../../store/actions/actions'
//router
import { useRouter } from 'next/router'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import InputComponent from '../components/InputComponent'
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
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
    <div>
        <NavBar/>
        <NavNarSesion />
        <div>
            <div className='d-flex flex-column text-center mt-3'>
                <h2><FontAwesomeIcon icon={faBicycle} /> </h2>
                <h2> Crear Entrenamiento </h2>
            </div>
        </div>
        <div className='w-75 m-auto'>
            <form action="">
                <InputComponent label={'Nombre'} type={'text'} valor={name} setValue={handleChangeName} tabIndex={4} ariaLabel={'Ingresa el nombre del nuevo entrenamiento'}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descripcion} setValue={handleChangeDescription} tabIndex={5} ariaLabel={'Ingresa la descripcion del nuevo entrenamiento'}/>
                {/* Radio dificultard */}
                <label htmlFor="" className='pt-3' id={styles.labelForRol} tabIndex={6} ariaLabel={'Selecciona la dificultad'}>Dificultad</label>
                <div className='d-flex w-100 justify-content-center  pb-3'>
                    <input type="radio" id="opcion1" name="dificultad" value="principiante" className={styles.radio} tabIndex='7' aria-label='Dificultad: principiante' onChange={handleChangeRadio}/>
                    <label for="opcion1" className={styles.labelRadio}>Principiante</label>
                    <input type="radio" id="opcion2" name="dificultad" value="intermedio" className={styles.radio} tabIndex='8' aria-label='Dificultad: intermedio' onChange={handleChangeRadio}/>
                    <label for="opcion2" className={styles.labelRadio}>Intermedio</label>
                    <input type="radio" id="opcion3" name="dificultad" value="avanzado" className={styles.radio} tabIndex='9' aria-label='Dificultad: avanzado' onChange={handleChangeRadio}/>
                    <label for="opcion3" className={styles.labelRadio}>Avanzado</label>
                </div>
                {/* Radio de privacidad */}
            </form>
            <ElegirEntrenamientos activate={activate} pasos={pasos} />
          
            {(pasos < 2) ?
              <button onClick={handleClickSiguiente} id='btn-sig'>Siguiente</button>
              :
              <button onClick={handleClickAddEntrenamiento}> Finalizar </button>
            }
            <p> {pasos} / 2</p>
        </div>
    </div>
  )
}

export default CrearEntrenamiento