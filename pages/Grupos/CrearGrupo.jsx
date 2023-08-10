import React, { useEffect } from 'react'
import { useState } from 'react'
import Head from 'next/head'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import InputComponent from '../components/InputComponent'
import RadioComponent from '../components/RadioComponent'
import ElegirHorarios from './ElegirHorarios'
import BackArrow from '../components/BackArrow'
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
    const [misEntrenamientos, setMisEntrenamientos] = useState([])

    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
    const user_role = useSelector(state => state.login.user.role)
    //utils
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() =>{
      fetch(`${BASE_URL}trainings/list`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        const traingingTotales = result
        if(user_role === 'TEACHER'){
        const trainingsPropios = traingingTotales.filter((t) =>{
          if(t.teacher_id === user_id){
            return t
          } 
        })
        if(trainingsPropios.length !== 0){
          setMisEntrenamientos(trainingsPropios)
        }
      }
    })
    }, [])
    

    
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
      e.preventDefault()
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
      fetch(`${BASE_URL}groups/create`,{
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
      <Head>
        <title>Clismo</title>
        <meta name="description" content="Pagina de creacion de grupos." />
      </Head>
      <NavBar />
      <NavNarSesion/>
      <BackArrow/>
      <div>
        <div className='d-flex flex-column text-center mt-3' id={styles.title}>
            <div id={styles.contentIcon}><FontAwesomeIcon icon={faUsersLine} id={styles.icon} /> </div>
            <h1> Crear Grupo </h1>
        </div>
        <form className='m-auto' id={styles.form}>
            <InputComponent label={'Nombre de grupo'} type={'text'} valor={groupName} setValue={handleChangeGroupName} ariaLabel={'Ingresa el nombre del nuevo grupo'}/>
            <InputComponent label={'Descripcion'} type={'text'} valor={groupDescription} setValue={handleChangeGroupDescription} ariaLabel={'Ingresa la descripcion de un nuevo grupo'}/>
            <InputComponent label={'Capacidad'} type={'number'} valor={capacidad} setValue={handleChangeCapacidad} ariaLabel={'Ingresa la capacidad maxima del grupo'} min={1}/>
            {/* Radio dificultard */}
            <label htmlFor="" className='pt-3' id={styles.labelForRol} ariaLabel={'Selecciona la dificultad'}>Dificultad</label>
              <div className='' id={styles.radiogroupDificultad}>
                <label for="opcion1" className={nivel === 'EASY' ? styles.labelRadioActive : styles.labelRadio}>Principiante
                  <input type="radio" id="opcion1" name="dificultad" value="EASY" className={styles.radio} aria-label='Dificultad: principiante' onChange={handleChangeRadio}/>
                </label>
                <label for="opcion2" className={nivel === 'MIDDLE' ? styles.labelRadioActive : styles.labelRadio}>Intermedio
                  <input type="radio" id="opcion2" name="dificultad" value="MIDDLE" className={styles.radio} aria-label='Dificultad: intermedio' onChange={handleChangeRadio}/>
                </label>
                <label for="opcion3" className={nivel === 'HARD' ? styles.labelRadioActive : styles.labelRadio}>Avanzado
                  <input type="radio" id="opcion3" name="dificultad" value="HARD" className={styles.radio} aria-label='Dificultad: avanzado' onChange={handleChangeRadio}/>
                </label>
            </div>
          {/* Radio de privacidad */}
            <label htmlFor="" className='pt-3' id={styles.labelForRol}  ariaLabel={'Selecciona la privacidad'}>Privacidad</label>
              <div className='d-flex w-100 justify-content-center  pb-3'>
                <label for="opcion5" className={privacidad === 'PUBLIC' ? styles.labelRadioActive : styles.labelRadio}>Publico
                  <input type="radio" id="opcion5" name="privacidad" value="PUBLIC" className={styles.radio}  aria-label='Dificultad: principiante' onChange={handleChangeRadioPrivacidad}/>
                </label>
                <label for="opcion6" className={privacidad === 'PRIVATE' ? styles.labelRadioActive : styles.labelRadio}>Privado
                  <input type="radio" id="opcion6" name="privacidad" value="PRIVATE" className={styles.radio}  aria-label='Dificultad: intermedio' onChange={handleChangeRadioPrivacidad}/>
                </label>
              </div>
            <ElegirHorarios pasos={pasos} horarios={horarios} setHorarios={setHorarios} misEntrenamientos={misEntrenamientos}/>
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