import React from 'react'
import styles from '../../styles/EntrenamientoCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
const EntrenamientoCard = ({props, setActiveDel, setName}) => {
  
  const handleClickDel = () =>{
    if(props !== undefined){
      setName(props.name)
      setActiveDel(true)
    }
  }

    return (
    <div id={styles.content}>
        <div id={styles.contentTitle}><h5 tabIndex={0}>{props == undefined ? "" : props.name}</h5></div>
        <div id={styles.contentDes}><p tabIndex={0}>{props == undefined ? "" : props.description}</p></div>
        <div id={styles.contentData}>
            <div className={styles.contentDataContet} >
                <h6 tabIndex={0}>Cant Ejercicios</h6>
                <div tabIndex={0}>{props == undefined ? '' : props.exercises.length}</div>
            </div>
            <div className={styles.contentDataContet}>
                <h6 tabIndex={0}>Duracion</h6>
                <div tabIndex={0}>{props == undefined ? '' : props.exercises.reduce(function(acc,ex) {return acc + Number(ex.duration)},0)}</div>
            </div>
        </div>
        <div id={styles.contentDelete}><button id={styles.deleteBtn} onClick={handleClickDel}> Borrar  <FontAwesomeIcon icon={faDeleteLeft} id={styles.deleteIcon}/></button></div>
    </div>
  )
}

export default EntrenamientoCard