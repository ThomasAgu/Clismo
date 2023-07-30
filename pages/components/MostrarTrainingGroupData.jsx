import React from 'react'
import styles from '../../styles/TrainenDetails.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
const MostrarTrainingGroupData = ({groupSelected, trainSelected, active, dia, setDia}) => {
  


    const  horaFormateada = (horario) => {
        if(horario !== undefined){
            const horas = horario.split(':')
            return `${horas[0]}:${horas[1]}`
        }
        return ''
    }

    return (
    <div id={styles.content}>
        {dia !== '' ? 
            <div id={styles.details}>
                <div id={styles.trainingDetails}>
                    <div id={styles.trainingDetailsContent}>
                        <div id={styles.trainingTitle}><h4>Entrenmaiento: {trainSelected == undefined ? '':trainSelected.name}</h4></div>
                        <div id={styles.description}>{trainSelected == undefined ? '':trainSelected.description}</div>
                        <div id={styles.horas}> 
                            <div className={styles.clock}>
                                <FontAwesomeIcon icon={faClock} id={styles.iconClock}/>
                                <div>{/* Aca va a ir la hora inicio del entrenamiento */}</div>
                            </div>
                            <div className={styles.clockDark}>
                                <FontAwesomeIcon icon={faClock}  id={styles.iconClock}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id={styles.groupDetails}>
                    <div id={styles.groupDetailsContent}>
                        <div id={styles.trainingTitle}><h4>Grupo: {groupSelected == undefined ? '': groupSelected.name}</h4></div>
                        <div id={styles.description}>{groupSelected == undefined ? '': groupSelected.description}</div>
                    </div>
                </div>
            </div>

            
        :
        <div id={styles.detailsInactive}></div>
        }
    </div>
  )
}

export default MostrarTrainingGroupData