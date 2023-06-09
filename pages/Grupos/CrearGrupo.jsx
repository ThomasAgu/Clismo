import React, { useEffect } from 'react'
import { useState } from 'react'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import InputComponent from '../components/InputComponent'
import RadioComponent from '../components/RadioComponent'
import ElegirHorarios from './ElegirHorarios'
//Store
import { useDispatch, useSelector } from 'react-redux';
import { agregarGrupo, obtenerEntrenamientos } from '../../store/actions/actions';
import { Router, useRouter } from 'next/router'
//url
import { BASE_URL } from '../api/url'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine } from '@fortawesome/free-solid-svg-icons';
//Styles
import styles from '../../styles/creargrupo.module.css'
const CrearGrupo = ({grupos}) => {

    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDescription] = useState('')
    const [capacidad, setCapacidad] = useState(1);
    const [nivel, setNivel] = useState('');
    const [privacidad, setPrivacidad] = useState('');
    const [horarios, setHorarios] = useState([])

    const [pasos, setPasos] = useState(1);
    //store
    const entrenamientos = useSelector(state=> state.entrenamientos.entrenamientos)
    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
    //utils
    const dispatch = useDispatch();
    const router = useRouter();

    
    const handleChangeGroupName = (e) => {
        setGroupName(groupName => e.target.value);
    }

    const handleChangeGroupDescription = (e) =>{
        setGroupDescription(groupDescription=> e.target.value)
    }

    const handleChangeCapacidad = (e) => {
        setCapacidad(capacidad => e.target.value)
    }

    const handleChangeRadio  = (e) =>{
        setNivel(nivel => e.target.value)
    }
    const handleChangeRadioPrivacidad = (e) =>{
      setPrivacidad( privacidad => e.target.value)
    }

    const handleClickSiguiente = (e) => {
      e.preventDefault();
      setPasos(pasos=> pasos +1)
    }

    const handleAgregarGrupo = (e) =>{
      e.preventDefault();
      const grupo = {
        "teacher_id": user_id,
        "name": groupName,
        "privacy": privacidad,
        "description": groupDescription,
        "difficulty": nivel,      
        "capacity": Number(capacidad),
        "schedules": horarios
      }
      console.log(grupo)
      fetch(`${BASE_URL}groups/create`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(grupo)
      })
        .then(response => response.json())
        .then(result => {
          dispatch(agregarGrupo(grupo))
          router.back()
        })   
        .catch(error => {
          console.error('Error:', error);
      });  
    }


  return (
    
    <div id={styles.content}>
      <NavBar />
      <NavNarSesion/>
      <div>
        <div className='d-flex flex-column text-center mt-3' id={styles.title}>
            <FontAwesomeIcon icon={faUsersLine} id={styles.icon} /> 
            <h1> Crear Grupo </h1>
        </div>
        <form className='m-auto' id={styles.form}>
            <InputComponent label={'Nombre de grupo'} type={'text'} valor={groupName} setValue={handleChangeGroupName} tabIndex={4} ariaLabel={'Ingresa el nombre del nuevo grupo'}/>
            <InputComponent label={'Descripcion'} type={'text'} valor={groupDescription} setValue={handleChangeGroupDescription} tabIndex={5} ariaLabel={'Ingresa la descripcion de un nuevo grupo'}/>
            <InputComponent label={'Capacidad'} type={'number'} valor={capacidad} setValue={handleChangeCapacidad} tabIndex={5} ariaLabel={'Ingresa la capacidad maxima del grupo'} min={1}/>
            {/* Radio dificultard */}
            <label htmlFor="" className='pt-3' id={styles.labelForRol} tabIndex={6} ariaLabel={'Selecciona la dificultad'}>Dificultad</label>
              <div className='' id={styles.radiogroupDificultad}>
                <input type="radio" id="opcion1" name="dificultad" value="EASY" className={styles.radio} tabIndex='7' aria-label='Dificultad: principiante' onChange={handleChangeRadio}/>
                <label for="opcion1" className={styles.labelRadio}>Principiante</label>
                <input type="radio" id="opcion2" name="dificultad" value="MIDDLE" className={styles.radio} tabIndex='8' aria-label='Dificultad: intermedio' onChange={handleChangeRadio}/>
                <label for="opcion2" className={styles.labelRadio}>Intermedio</label>
                <input type="radio" id="opcion3" name="dificultad" value="HARD" className={styles.radio} tabIndex='9' aria-label='Dificultad: avanzado' onChange={handleChangeRadio}/>
                <label for="opcion3" className={styles.labelRadio}>Avanzado</label>
            </div>
          {/* Radio de privacidad */}
            <label htmlFor="" className='pt-3' id={styles.labelForRol} tabIndex={10} ariaLabel={'Selecciona la privacidad'}>Privacidad</label>
              <div className='d-flex w-100 justify-content-center  pb-3'>
                <input type="radio" id="opcion5" name="privacidad" value="PUBLIC" className={styles.radio} tabIndex='11' aria-label='Dificultad: principiante' onChange={handleChangeRadioPrivacidad}/>
                <label for="opcion5" className={styles.labelRadio}>Publico</label>
                <input type="radio" id="opcion6" name="privacidad" value="PRIVATE" className={styles.radio} tabIndex='12' aria-label='Dificultad: intermedio' onChange={handleChangeRadioPrivacidad}/>
                <label for="opcion6" className={styles.labelRadio}>Privado</label>
              </div>
            <ElegirHorarios pasos={pasos} horarios={horarios} setHorarios={setHorarios}/>
        {pasos < 2 ? 
          <div className='d-flex justify-content-center'><button onClick={handleClickSiguiente} id={styles.horariosBtn}> Elegir horarios </button></div>
        :
          <div className='d-flex justify-content-center'><button onClick={handleAgregarGrupo} id={styles.crearBtn}>Crear Grupo</button></div>
        }
        </form>
      </div>
    </div>
  )
}

export default CrearGrupo