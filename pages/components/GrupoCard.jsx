import React from 'react'
import { useState } from 'react';
import styles from '../../styles/GrupoCard.module.css'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons';
import MostrarHoras from './MostrarHoras';
//components


const GrupoCard = ({nombre, descripcion, privacidad, cantIntegrantes, capacidad, dificultad, setMisGrupos, setGrupos, grupos}) => {
  
  const [dia, setDia] = useState('')

  const handleClickChange = () => {
    const gruposName = grupos.map(el=> el.nombre);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    setMisGrupos((misGrupos) => [...misGrupos, grupo])
    const gruposLibres = grupos.filter((el) => el.nombre !== nombre)
    setGrupos(gruposLibres)
  }

  const handleSelecDia = (e) => {
    e.preventDefault()
    dia === e.target.value ? 
      setDia('')
      :
      setDia(e.target.value)
  }
  
  return (
    <div className='mx-auto' id={styles.content}>
      <div id={styles.firstColumn}>
        <div id={styles.groupName}>{nombre}</div>
        <div id={styles.description}>{descripcion}</div>
        <button id={styles.anotarseBtn} onClick={handleClickChange}>Unirme</button>
      </div>
      <div className="" id={styles.secondColumn}>
        <div>
          <p id={styles.horarios}>Horarios</p>
          <div id={styles.horariosBigDiv}>
            <div id={styles.horariosDiv}>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'L' ? styles.btnDayActive : ''}`}  id='L' value={'L'}>L</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'M' ? styles.btnDayActive : ''}`}  id='M' value={'M'}>M</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'X' ? styles.btnDayActive : ''}`}  id='X' value={'X'}>X</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'J' ? styles.btnDayActive : ''}`}  id='J' value={'J'}>J</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'V' ? styles.btnDayActive : ''}`}  id='V' value={'V'}>V</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'S' ? styles.btnDayActive : ''}`}  id='S' value={'S'}>S</button>
              <button onClick={handleSelecDia} className={`${styles.btnDay} ${dia === 'D' ? styles.btnDayActive : ''}`}  id='D' value={'D'}>D</button>
            </div>
          <MostrarHoras dia={dia} setDia={setDia}/>
          </div>
        </div>
        <div id={styles.aditionalInfo}>
          <p id={styles.textNivel}>Nivel: {dificultad}</p>
          <div  id={styles.textCapacidad}><FontAwesomeIcon icon={faPersonBiking}/><p>Capacidad{cantIntegrantes}/{capacidad}</p></div>
        </div>
      </div>
    </div>
  )
}

export default GrupoCard