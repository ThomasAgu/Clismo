import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../../styles/GrupoCard.module.css'

const MostrarHoras = ({dia, setDia, horarioCompleto}) => {


  const handleShowTime = (horaFea) =>{
    const fmat = horaFea.split(':')
    return `${fmat[0]}:${fmat[1]}`
  }

  return (
    <div>
        {dia !== '' ?
            <div id={styles.activeDiv}>
                <p>Desde: {handleShowTime(dia.starttime)}</p>
                <p>Hasta: {handleShowTime(dia.endingtime)}</p>
            </div>
        :
        <div id={styles.inactiveDiv}></div>}
    </div>
  )
}

export default MostrarHoras