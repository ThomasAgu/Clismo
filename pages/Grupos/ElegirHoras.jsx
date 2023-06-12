import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

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
    <div>
        {dia !== ''?
            <form action="">
                <input type="time" name="" id="" value={hora_ini} onChange={(e)=> setHora_ini(e.target.value)}/>
                <input type="time" name="" id="" value={hora_fin}  onChange={(e)=> setHora_fin(e.target.value)}/>
                
                <label htmlFor="">Seleccionar entrenamiento</label>
                <select name="" id="" value={entrenamiento} onChange={handleChangeSelect}>
                    <option value="">Seleccionar</option>
                    {entrenamientos.map((e) =>  {
                        return(
                            <option key={e.nombre} value={e.nombre}>{e.nombre}</option>)
                    })}
                </select>
                <button onClick={handleClickSave}>Guardar</button>

            </form>
        :
            <></>
        }
    </div>
  )
}

export default ElegirHoras