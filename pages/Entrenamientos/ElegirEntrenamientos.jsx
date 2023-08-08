import React, { useState, useEffect } from 'react'
import InputComponent from '../components/InputComponent'
import SelectRangeComponent from '../components/SelectRangeComponent'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch,  faHeartPulse, faGauge, faPlus , faEdit, faDeleteLeft, faTrash} from '@fortawesome/free-solid-svg-icons';

//styles
import styles from '../../styles/CrearEntrenamiento.module.css'

const ElegirEntrenamientos = ({activate, pasos, ejercicios, setEjercicios, actEx, setActEx}) => {
    
    const [nombre, setNombre] = useState(actEx === undefined ? '' : actEx.name)
    const [descripcion, setDescripcion] = useState(actEx === undefined ? '' : actEx.description)

    const [velActivate, setVelActivate] = useState(actEx === undefined ? false : true)
    const [fRActivate,setFRActivate] = useState(actEx === undefined ? false : true);
    const [durActivate, setDurActivate] = useState(actEx === undefined ? false : true);

    const [velocidad, setVelocidad] = useState(actEx === undefined ? 0 : actEx.speed);
    const [frecCardiaca, setFrecCardiaca] = useState(actEx === undefined ? 0 : actEx.heart_rate);
    const [duracion, setDuracion] = useState(actEx === undefined ? 0 : actEx.duration)

    useEffect(()=>{
        setNombre(actEx === undefined ? '' : actEx.name)
        setDescripcion(actEx === undefined ? '' : actEx.description)
        setFRActivate(actEx === undefined ? false : true)
        setDurActivate(actEx === undefined ? false : true)
        setVelActivate(actEx === undefined ? false : true)
        setVelocidad(actEx === undefined ? 0 : actEx.speed)
        setFrecCardiaca(actEx === undefined ? 0 : actEx.heart_rate)
        setDuracion(actEx === undefined ? 0 : actEx.duration)
    }, [actEx])
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
    function resetearDatos(){
        setNombre('')
        setDescripcion('')
        setFRActivate(false)
        setDurActivate(false)
        setVelActivate(false)
        setActEx()
        setVelocidad(0)
        setFrecCardiaca(0)
        setDuracion(0)
    }

    const handleClickAddEntrenamiento = (e) => {
        e.preventDefault();
        const speedFloat = parseFloat(velocidad) + 0.01
        const heartFloat = parseFloat(frecCardiaca) + 0.01
        const durFloat = parseFloat(duracion) + 0.01
        const ejercicio = { 
            'name' : nombre,
            'description' : descripcion,
            'speed' : speedFloat,
            'heart_rate' : heartFloat,
            'duration' : durFloat,
        }
        resetearDatos()
        //falta fr, duracion y velocidad
        console.log(ejercicio)
        setEjercicios(ejercicios => [...ejercicios, ejercicio])
    }

    const handleClickActEntrenamiento = (e) =>{
        e.preventDefault()
        let pos = -1
        const ejercicio = { 
        'name' : nombre,
        'description' : descripcion,
        'speed' : velocidad,
        'heart_rate' : frecCardiaca,
        'duration' : duracion,
        }
        const nuevosEjercicios = ejercicios.filter((ejercicio,i) => {
        if(ejercicio !== actEx){
            return ejercicio
        }
        else{
            pos = i
        }
        });
        nuevosEjercicios.splice(pos, 0, ejercicio);
        setEjercicios(nuevosEjercicios);
        resetearDatos();
    }

    const handleClickDelEntrenamiento = (e) =>{
        
        e.preventDefault()
        resetearDatos()
        const nuevosEjercicios = ejercicios.filter(ejercicio => ejercicio !== actEx);
        setEjercicios(nuevosEjercicios);
    }


    return (
    <div id={styles.secondPartFirstColumn}>
        {pasos > 1? 
            <form id={styles.secondForm}>
                <h3  className='text-center' id={styles.newExerciseTitle}>{actEx === undefined ? 'Nuevo ' : 'Modificando '} ejercicio</h3>
                <InputComponent label={'Nombre'} type={'text'} valor={nombre} setValue={onChangeNombre}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descripcion} setValue={onChangeDescription}/>

                <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column' id={styles.parametersBigDiv}>
                        <button onClick={handleClickActivateVel} id={styles.parametersBtn} style={{border: '1px solid #4ED0A2', backgroundColor: '#4ED0A2'}}>Velocidad</button>
                        <SelectRangeComponent activate={velActivate}  setActivate={setVelActivate} min={20} max={100}  valor={velocidad} onChange={handleChangeVelocidad} icon={faGauge} unidad={'Kmh'} colorAccento={'4ED0A2'}/>
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
                {actEx === undefined ?
                    <div className='d-flex justify-content-center' id={styles.addExerciseDiv}>
                        <button onClick={handleClickAddEntrenamiento} id={styles.addExerciseBtn}><FontAwesomeIcon icon={faPlus}/></button>: 
                    </div>
                    :
                    <div className='' id={styles.optionExerciseDiv}>
                        <button onClick={handleClickActEntrenamiento} id={styles.updateExerciseBtn}><FontAwesomeIcon icon={faEdit} id={styles.editIcon} /> Actualizar</button>
                        <button onClick={handleClickDelEntrenamiento} id={styles.deleteExerciseBtn}><FontAwesomeIcon icon={faTrash} id={styles.delIcon}/> Borrar</button>
                    </div>
                }
            </form>
        :
            <></>
        }
    </div>
  )
}

export default ElegirEntrenamientos