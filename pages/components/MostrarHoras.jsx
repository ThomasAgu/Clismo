import React from 'react'

import styles from '../../styles/GrupoCard.module.css'

const MostrarHoras = ({dia, setDia}) => {
  return (
    <div>
        {dia !== '' ?
            <div id={styles.activeDiv}>
                <p>De: Hora Inicio</p>
                <p>Hasta: Hora Final</p>
                <p>Duradcion: 39Hrs</p>

            </div>
        :
        <div id={styles.inactiveDiv}></div>}
    </div>
  )
}

export default MostrarHoras