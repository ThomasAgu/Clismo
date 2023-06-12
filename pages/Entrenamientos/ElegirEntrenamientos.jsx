import React from 'react'
import { useState } from 'react'
import InputComponent from '../components/InputComponent'

const ElegirEntrenamientos = ({activate, pasos}) => {
    
    const [nombre, setNombre] = useState('')
    const [descriptcion, setDescripcion] = useState('')

  
    return (
    <div>
        {pasos > 1? 
            <form>
                <p>Aca vamos a ir selecionando / creando entrenamientos 1 a 1
                </p>
            </form>
        :
            <></>
        }
    </div>
  )
}

export default ElegirEntrenamientos