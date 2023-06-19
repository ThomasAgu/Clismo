import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../../styles/GrupoCard.module.css'

const MostrarHoras = ({dia, setDia, horarioCompleto}) => {


  const [hora_ini, setHora_ini] = useState('')




  return (
    <div>
        {dia !== '' ?
            <div id={styles.activeDiv}>
                <p>De: Hora inicial</p>
                <p>Hasta: Hora Final</p>
                <p>Duradcion: 39Hrs</p>

            </div>
        :
        <div id={styles.inactiveDiv}></div>}
    </div>
  )
}

export default MostrarHoras