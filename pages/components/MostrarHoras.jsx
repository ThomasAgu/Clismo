import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../../styles/GrupoCard.module.css'

const MostrarHoras = ({dia, setDia, horarioCompleto}) => {


  const [hora_ini, setHora_ini] = useState('')

  return (
    <div>
        {dia !== '' ?
            <div id={styles.activeDiv}>
                <p>De: {dia.starttime}</p>
                <p>Hasta: {dia.endingtime}</p>
                <p>Duradcion: {dia.training}</p>

            </div>
        :
        <div id={styles.inactiveDiv}></div>}
    </div>
  )
}

export default MostrarHoras