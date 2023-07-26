import React from 'react'
import { useState } from 'react'
import ElegirHoras from './ElegirHoras'

import styles from '../../styles/elegirHorarios.module.css'

const ElegirHorarios = ({pasos, horarios, setHorarios, misEntrenamientos}) => {

    const [day, setDay] = useState('')

    const [horaYRutina, setHoraYRutina] = useState({
        "day": '',
        "starttime":'',
        "endingtime":'',
        "training_id": '',
    })
    

    const handleSelecDia  =  (e) =>{
        e.preventDefault()
        const diasQueYaHayHorario = horarios.map((el) => el.day)
        const entrenamientoExistente = horarios.filter((el) => el.day === e.target.value)[0]
        
        if(diasQueYaHayHorario.includes(e.target.value)){
            setHoraYRutina(prevState => ({
                ...prevState,
                day: entrenamientoExistente.day,
                starttime: entrenamientoExistente.starttime,
                endingtime: entrenamientoExistente.endingtime,
                training_id: entrenamientoExistente.training_id
            }))
        }
        else{
            setHoraYRutina(prevState => ({
                ...prevState,
                day: '',
                starttime: '',
                endingtime: '',
                training_id: ''
            }))
        }
        setDay(e.target.value)
        console.log(horaYRutina)
    }


  return (
    
    <div>
        {(pasos > 1) ?
            <div id={styles.diasContent}>
                <label htmlFor="" id={styles.labelHorarios}>Horarios</label>
                <div id={styles.diasDiv}>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'L' ? styles.btnDayActive : ''}`}  id='L' value={'MONDAY'}>L</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'M' ? styles.btnDayActive : ''}`}  id='M' value={'TUESDAY'}>M</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'X' ? styles.btnDayActive : ''}`}  id='X' value={'WEDNESDAY'}>X</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'J' ? styles.btnDayActive : ''}`}  id='J' value={'THURSDAY'}>J</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'V' ? styles.btnDayActive : ''}`}  id='V' value={'FRIDAY'}>V</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'S' ? styles.btnDayActive : ''}`}  id='S' value={'SATURDAY'}>S</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${day === 'D' ? styles.btnDayActive : ''}`}  id='D' value={'SUNDAY'}>D</button>
                </div>
                <ElegirHoras dia={day} setDia={setDay} setHorarios={setHorarios} horarios={horarios} horaYRutina={horaYRutina} misEntrenamientos={misEntrenamientos}/>
            </div>
        :
        <></>
        }
    </div>
  )
}

export default ElegirHorarios