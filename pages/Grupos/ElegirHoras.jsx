import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '../../styles/elegirHorarios.module.css'

const ElegirHoras = ({dia, setDia,setHorarios,horarios ,horaYRutina, misEntrenamientos}) => {
    const [hora_ini, setHora_ini] = useState('')/* useState(horaYRutina.hora_ini) */
    const [hora_fin, setHora_fin] = useState('')/* useState(horaYRutina.hora_fin) */
    const [entrenamiento, setEntrenamiento] = useState('')/* useState(horaYRutina.entrenamiento) */


    const handleChangeSelect = (e) => {
        setEntrenamiento(entrenamiento => e.target.value )
        console.log(entrenamiento);
    }


    const handleClickSave = (E) =>{
        E.preventDefault()
        const horario = { 
            "day": dia,
            "starttime": `${hora_ini}:00`,
            "endingtime":`${hora_fin}:00`,
            "training_id": Number(entrenamiento),
        } 
        const indiceEntrenamientoExistente = horarios.findIndex((el) => el.dia === dia)
        if(indiceEntrenamientoExistente === -1){
            setHorarios([...horarios, horario ])
        }
        else{
            setHorarios(horarios => 
                horarios.map((h, i) => {
                    if( i === indiceEntrenamientoExistente){
                        return{
                            ...h,
                            "starttime":hora_ini,
                            "endingtime":hora_fin,
                            "training_id": entrenamiento.id,
                        };
                    }
                    return h;
                })
            )
        }
        setHora_ini('')
        setHora_fin('')
        setDia(dia => '')
        setEntrenamiento('')
        console.log(horarios)
    }

  return (
    <div >
        {dia !== ''?
            <div action="" id={styles.formActive}>
                <div id={styles.fromContent}>
                    <div id={styles.formFistColum}>
                        <label htmlFor="">Hora inicio:   </label>
                        <input type="time" name="" id="" value={hora_ini}  onChange={(e)=> setHora_ini(e.target.value)}  />
                       
                        <label htmlFor="">Hora fin</label>
                        <input type="time" name="" id="" value={hora_fin}  onChange={(e)=> setHora_fin(e.target.value)} />
                        
                    </div>
                    <div id={styles.formSecondColumn}>
                        <label htmlFor="">Seleccionar entrenamiento</label>
                            <select name="" id="" value={entrenamiento} onChange={handleChangeSelect} >
                                <option value="" >Seleccionar</option>
                                {Array.isArray(misEntrenamientos) && misEntrenamientos.length > 0
                                    ? misEntrenamientos.map((e) => (
                                        <option key={e.name} value={e.id} tabIndex={0}>{e.name}</option>
                                    ))
                                : ""}
                            </select>
                        
                    </div>
                </div>
                <div className='d-flex justify-content-end'><button onClick={handleClickSave} id={styles.formGuardarBtn}>Guardar</button></div>

            </div>
        :
            <div id={styles.formInactive}></div>
        }
    </div>
  )
}

export default ElegirHoras