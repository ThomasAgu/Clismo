import React from 'react'
import { useState } from 'react'
import InputComponent from '../components/InputComponent'
import SelectRangeComponent from '../components/SelectRangeComponent'
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
        setVelActivate(true);
    }

    const handleClickActivateFR = (e) => {
        e.preventDefault();
        setFRActivate(true);
    }

    const handleClickActivateDuracion = (e) => {
        e.preventDefault();
        setDurActivate(true);
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
        console.log(ejercicio)
        setEjercicios(ejercicios => [...ejercicios, ejercicio])
    }


    return (
    <div>
        {pasos > 1? 
            <form>
                <p>Aca vamos a ir selecionando / creando entrenamientos 1 a 1 </p>
                <InputComponent label={'Nombre'} type={'text'} valor={nombre} setValue={onChangeNombre}/>
                <InputComponent label={'Descripcion'} type={'text'} valor={descriptcion} setValue={onChangeDescription}/>

                <div className='d-flex justify-content-between'>
                    <button onClick={handleClickActivateVel}>Velocidad</button>
                    <SelectRangeComponent activate={velActivate} setActivate={setVelActivate} min={20} max={100}  valor={velocidad} onChange={handleChangeVelocidad}/>
                    <button onClick={handleClickActivateFR}>Frecuencia cardiaca</button>
                    <SelectRangeComponent activate={fRActivate} setActivate={setFRActivate} min={80} max={160} valor={frecCardiaca} onChange={handleChangeFR}/>
                    <button onClick={handleClickActivateDuracion}>Duracion</button>
                    <SelectRangeComponent activate={durActivate} setActivate={setDurActivate} min={5} max={60} valor={duracion} onChange={handleChangeDuracion}/>
                </div>

                <button onClick={handleClickAddEntrenamiento}>Agregar</button>
            </form>
        :
            <></>
        }
    </div>
  )
}

export default ElegirEntrenamientos