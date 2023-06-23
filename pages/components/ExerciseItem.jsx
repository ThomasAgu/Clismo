import React from 'react'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../../styles/CrearEntrenamiento.module.css'


const ExerciseItem = () => {
  return (
    <FontAwesomeIcon icon={faCircle} id={styles.circles}/>
  )
}

export default ExerciseItem