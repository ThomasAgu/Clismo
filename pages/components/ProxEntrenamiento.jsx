import React from 'react'
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../styles/ProxEntrenamiento.module.css'

const ProxEntrenamiento = () => {
  return (
    <div id={styles.content}>
        <div id={styles.circle}>
            <div id={styles.circleContent}>
                <FontAwesomeIcon icon={faCalendar} id={styles.icon}/>
                <p id={styles.day}>dia</p>
            </div>
        </div>
        <h3 id={styles.nombre}>Nombre</h3>
        <div id={styles.descriptionDiv}>
            <p id={styles.descripcion}>descripcion</p>
        </div>
        
        <h4 id={styles.parametros}>duracion | cantEjercicio</h4>
        
        <div id={styles.horas}> 
            <div className={styles.clock}>
                <FontAwesomeIcon icon={faClock}/>
                <div>ho:in</div>
            </div>
            <div className={styles.clockDark}>
                <FontAwesomeIcon icon={faClock}/>
                <div>ho:Fin</div>
            </div>

        </div>
    </div>
  )
}

export default ProxEntrenamiento