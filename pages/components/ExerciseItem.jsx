import React from 'react'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCircle } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../../styles/CrearEntrenamiento.module.css'


const ExerciseItem = ({ex, click, actEx}) => {
  return (
    <FontAwesomeIcon icon={faCircle} id={actEx === ex ? styles.circlesActive :styles.circles} onClick={()=> click(ex)} tabIndex={0} ariaLabel={"ejercicio "+actEx}/>
  )
}

export default ExerciseItem