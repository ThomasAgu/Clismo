import React from 'react'
import { useState } from 'react'
import ElegirHoras from './ElegirHoras'

import styles from '../../styles/elegirHorarios.module.css'

const ElegirHorarios = ({pasos, horarios, setHorarios}) => {

    const [dia, setDia] = useState('')

    const [horaYRutina, setHoraYRutina] = useState({
        "dia": '',
        "hora_ini":'',
        "hora_fin":'',
        "entrenamiento": '',
    })
    

    const handleSelecDia  =  (e) =>{
        e.preventDefault()
        const diasQueYaHayHorario = horarios.map((el) => el.dia)
        const entrenamientoExistente = horarios.filter((el) => el.dia === e.target.value)[0]

        if(diasQueYaHayHorario.includes(e.target.value)){
            setHoraYRutina(prevState => ({
                ...prevState,
                dia: entrenamientoExistente.dia,
                hora_ini: entrenamientoExistente.hora_ini,
                hora_fin: entrenamientoExistente.hora_fin,
                entrenamiento: entrenamientoExistente.entrenamiento
            }))
        }
        else{
            setHoraYRutina(prevState => ({
                ...prevState,
                dia: '',
                hora_ini: '',
                hora_fin: '',
                entrenamiento: ''
            }))
        }
        setDia(e.target.value)
        console.log(horaYRutina)
    }


  return (
    
    <div>
        {(pasos > 1) ?
            <div id={styles.diasContent}>
                <label htmlFor="" id={styles.labelHorarios}>Horarios</label>
                <div id={styles.diasDiv}>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'L' ? styles.btnDayActive : ''}`}  id='L' value={'L'}>L</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'M' ? styles.btnDayActive : ''}`}  id='M' value={'M'}>M</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'X' ? styles.btnDayActive : ''}`}  id='X' value={'X'}>X</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'J' ? styles.btnDayActive : ''}`}  id='J' value={'J'}>J</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'V' ? styles.btnDayActive : ''}`}  id='V' value={'V'}>V</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'S' ? styles.btnDayActive : ''}`}  id='S' value={'S'}>S</button>
                    <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'D' ? styles.btnDayActive : ''}`}  id='D' value={'D'}>D</button>
                </div>
                <ElegirHoras dia={dia} setDia={setDia} setHorarios={setHorarios} horarios={horarios} horaYRutina={horaYRutina}/>
            </div>
        :
        <></>
        }
    </div>
  )
}

export default ElegirHorarios