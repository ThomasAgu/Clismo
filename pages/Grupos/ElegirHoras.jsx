import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '../../styles/elegirHorarios.module.css'

const ElegirHoras = ({dia, setDia,setHorarios}) => {

    const [hora_ini, setHora_ini] = useState('')
    const [hora_fin, setHora_fin] = useState('')
    const [entrenamiento, setEntrenamiento] = useState('')

    const entrenamientos = useSelector(state=> state.entrenamientos.entrenamientos)


    const handleChangeSelect = (e) => {
        setEntrenamiento(entrenamiento => e.target.value )
    }


    const handleClickSave = (E) =>{
        E.preventDefault()
        const horario = { 
            "dia": dia,
            "hora_ini":hora_ini,
            "hora_fin":hora_fin,
            "entrenamiento": entrenamiento,
        } 

        setHorarios(horarios=>[...horarios, horario])
        setHora_ini('')
        setHora_fin('')
        setDia(dia => '')
        setEntrenamiento('')
    }
  return (
    <div >
        {dia !== ''?
            <form action="" id={styles.formActive}>
                <div id={styles.fromContent}>
                    <div id={styles.formFistColum}>
                        <label htmlFor="">Hora inicio: </label>
                        <input type="time" name="" id="" value={hora_ini} onChange={(e)=> setHora_ini(e.target.value)}/>
                        <label htmlFor="">Hora fin</label>
                        <input type="time" name="" id="" value={hora_fin}  onChange={(e)=> setHora_fin(e.target.value)}/>
                    </div>
                    <div id={styles.formSecondColumn}>
                        <label htmlFor="">Seleccionar entrenamiento</label>
                        <select name="" id="" value={entrenamiento} onChange={handleChangeSelect}>
                            <option value="">Seleccionar</option>
                            {entrenamientos.map((e) =>  {
                                return(
                                    <option key={e.nombre} value={e.nombre}>{e.nombre}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-end'><button onClick={handleClickSave} id={styles.formGuardarBtn}>Guardar</button></div>

            </form>
        :
            <form id={styles.formInactive}></form>
        }
    </div>
  )
}

export default ElegirHoras