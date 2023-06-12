import React from 'react'
import { useState } from 'react'
import ElegirHoras from './ElegirHoras'

const ElegirHorarios = ({pasos, horarios, setHorarios}) => {

    const [dia, setDia] = useState('')
    

    const handleSelecDia  =  (e) =>{
        const botonSeleccionado = document.getElementById(e.target.value)
        setDia(e.target.value)
    }
  return (
    
    <div>
        {(pasos > 1) ?
            <div>
                <label htmlFor="">Horarios</label>
                <div>
                    <button onClick={handleSelecDia}  id='L' value={'L'}>L</button>
                    <button onClick={handleSelecDia}  id='M' value={'M'}>M</button>
                    <button onClick={handleSelecDia}  id='X' value={'X'}>X</button>
                    <button onClick={handleSelecDia}  id='J' value={'J'}>J</button>
                    <button onClick={handleSelecDia}  id='V' value={'V'}>V</button>
                    <button onClick={handleSelecDia}  id='S' value={'S'}>S</button>
                    <button onClick={handleSelecDia}  id='D' value={'D'}>D</button>
                </div>
                <ElegirHoras dia={dia} setDia={setDia} setHorarios={setHorarios}/>
            </div>
        :
        <></>
        }
    </div>
  )
}

export default ElegirHorarios