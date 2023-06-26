import React from 'react'
import { useState } from 'react'
import InputComponent from '../components/InputComponent'
import SelectRangeComponent from '../components/SelectRangeComponent'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch,  faHeartPulse, faGauge, faPlus } from '@fortawesome/free-solid-svg-icons';

//styles
import styles from '../../styles/CrearEntrenamiento.module.css'

const ElegirEntrenamientos = ({activate, pasos, ejercicios, setEjercicios}) => {
    
    const [nombre, setNombre] = useState('')
    const [descriptcion, setDescripcion] = useState('')

    const [velActivate, setVelActivate] = useState(false)
    const [fRActivate,setFRActivate] = useState(false);
    const [durActivate, setDurActivate] = useState(false);

    const [velocidad, setVelocidad] = useState(20);
    const [frecCardiaca, setFrecCardiaca] = useState(80);
    const [duracion, setDuracion] = useState(5)

    const onChangeNombre = (e) => {
        setNombre(nombre => e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescripcion(d => e.target.value)
    }

    const handleClickActivateVel = (e) =>{
        e.preventDefault();
        setVelActivate(value => !value);
    }

    const handleClickActivateFR = (e) => {
        e.preventDefault();
        setFRActivate(value => !value);
    }

    const handleClickActivateDuracion = (e) => {
        e.preventDefault();
        setDurActivate(value => !value);
    }

    const handleChangeVelocidad = (e) =>{
        setVelocidad(vel => e.target.value)
    }
    const handleChangeFR = (e) =>{
        setFrecCardiaca(fr => e.target.value)
    }   
    const handleChangeDuracion = (e) => {
        setDuracion(d => e.target.value)
    }

    const handleClickAddEntrenamiento = (e) => {
        e.preventDefault();
        const ejercicio = { 
            'nombre' : nombre,
            'descripcion' : descriptcion,
            'parametros' : {
                'velocidad' : velocidad,
                'frecuencia_cardiaca' : frecCardiaca,
                'duracion' : duracion,
            }
        }
        setEjercicios(ejercicios => [...ejercicios, ejercicio])
    }


    return (
    <div id={styles.secondPartFirstColumn}>
        {pasos > 1? 
            <form id={styles.secondForm}>
                <h3  className='text-center' id={styles.newExerciseTitle}>Nuevo ejercicio</h3>
                <InputComponent label={'Nombre'} type={'text'} valor={nombre} setValue={onChangeNombre}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descriptcion} setValue={onChangeDescription}/>

                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column' id={styles.parametersBigDiv}>
                        <button onClick={handleClickActivateVel} id={styles.parametersBtn} style={{border: '1px solid #4ED0A2', backgroundColor: '#4ED0A2'}}>Velocidad</button>
                        <SelectRangeComponent activate={velActivate} setActivate={setVelActivate} min={20} max={100}  valor={velocidad} onChange={handleChangeVelocidad} icon={faGauge} unidad={'Kmh'} colorAccento={'4ED0A2'}/>
                    </div>
                    <div className="d-flex flex-column" id={styles.parametersBigDiv}>
                        <button onClick={handleClickActivateFR} id={styles.parametersBtn} style={{border: '1px solid #DC7F9B', backgroundColor: '#DC7F9B'}}>Frec. C</button>
                        <SelectRangeComponent activate={fRActivate} setActivate={setFRActivate} min={80} max={160} valor={frecCardiaca} onChange={handleChangeFR} icon={faHeartPulse} unidad={'Puls.'} colorAccento={'DC7F9B'}/>
                    </div>
                    <div className="d-flex flex-column" id={styles.parametersBigDiv}>
                        <button onClick={handleClickActivateDuracion} id={styles.parametersBtn} style={{border: '1px solid #FFA62B', backgroundColor: '#FFA62B'}}>Duracion</button>
                        <SelectRangeComponent activate={durActivate} setActivate={setDurActivate} min={5} max={60} valor={duracion} onChange={handleChangeDuracion} icon={faStopwatch} unidad={'Min.'} colorAccento={'FFA62B'}/>
                    </div>
                </div>

                <div className='d-flex justify-content-center' id={styles.addExerciseDiv}><button onClick={handleClickAddEntrenamiento} id={styles.addExerciseBtn}><FontAwesomeIcon icon={faPlus}/></button></div>
            </form>
        :
            <></>
        }
    </div>
  )
}

export default ElegirEntrenamientos