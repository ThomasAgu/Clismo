import React from 'react'
import { useState } from 'react';
import styles from '../../styles/GrupoCard.module.css'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons';
import MostrarHoras from './MostrarHoras';
//components


const GrupoCard = ({nombre, descripcion, privacidad, cantIntegrantes, capacidad, dificultad, setMisGrupos, setGrupos, grupos, misGrupos, unido}) => {
  
  const [dia, setDia] = useState('')
  const [horarioCompleto, setHorarioCompleto] = useState('')
  const [horario, setHorario] = useState({})

  const handleClickChange = () => {
    //API CALL
    const gruposName = grupos.map(el=> el.name);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    setMisGrupos((misGrupos) => [...misGrupos, grupo])
    const gruposLibres = grupos.filter((el) => el.name !== nombre)
    setGrupos(gruposLibres)
  }

  const handleClickAbandonarGrupo = () => { 
    //API CALL
    const gruposName = misGrupos.map(el=> el.name)
    const index  =gruposName.indexOf(nombre)
    const grupo = misGrupos[index];
    setGrupos((misGrupos) => [...misGrupos, grupo])
    const updatedArray = misGrupos.filter((obj) => obj.name !== nombre);
    setMisGrupos(updatedArray);
  }

  const handleSelecDia = (e) => {
    e.preventDefault()
    const gruposName = grupos.map(el=> el.name);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    console.log(grupo.schedules)
    setHorarioCompleto(grupo.schedules)
    const diaElegido = grupo.schedules.filter((el) => el.day === e.target.value)[0]

    //Quedarnos con el horario del dia elegido
    //Luego seteamos
    if(diaElegido !== undefined){
      dia.day === e.target.value ? 
        setDia('')
        :
        setDia(diaElegido) 
      }
     
  }

  const handleDelegateClass = (diaAct) => {
    const gruposName = grupos.map(el=> el.name);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    const diaEnSchedule = grupo.schedules.filter((el) => el.day === diaAct)[0]
    if(diaEnSchedule !== undefined){
      return (`${styles.btnDay} ${dia === diaAct ? styles.btnDayActive : ''}`)
    }
    else{
      return `${styles.btnDayInactive}`
    }
    
  }

  const handleDificultad = () =>{
    switch (dificultad){
      case 'EASY':
        return 'dificultad Fácil'
        break;
      case 'MIDDLE':
        return 'dificultad Intermedio'
        break;
      case 'HARD':
        return 'dificultad Difícil'
        break;
      default:
        return ''
        break; 
    }
    console.log(dificultad)
  }
  
  return (
    <div className='mx-auto' id={styles.content}>
      <div id={styles.firstColumn}>
        <div id={styles.groupName}>{nombre}</div>
        <div id={styles.description}>{descripcion}</div>
        {unido ? 
        <button id={styles.salirDelGrupoBtn} onClick={handleClickAbandonarGrupo}>Abandonar</button>
        :
        <button id={styles.anotarseBtn} onClick={handleClickChange}>Unirme</button>
        }
      </div>
      <div className="" id={styles.secondColumn}>
        <div>
          <p id={styles.horarios}>Horarios</p>
          <div id={styles.horariosBigDiv}>
            <div id={styles.horariosDiv}>
              <button onClick={handleSelecDia} className={handleDelegateClass('MONDAY')}  id='L' value={'MONDAY'}>L</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('TUESDAY')}  id='M' value={'TUESDAY'}>M</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('WEDNESDAY')}  id='X' value={'WEDNESDAY'}>X</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('THURSDAY')}  id='J' value={'THURSDAY'}>J</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('FRIDAY')}  id='V' value={'FRIDAY'}>V</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('SATURDAY')}  id='S' value={'SATURDAY'}>S</button>
              <button onClick={handleSelecDia} className={handleDelegateClass('SUNDAY')}  id='D' value={'SUNDAY'}>D</button>
            </div>
          <MostrarHoras dia={dia} setDia={setDia} horarioCompleto={horarioCompleto}/>
          </div>
        </div>
        <div id={styles.aditionalInfo}>
          <p id={styles.textNivel}>{handleDificultad()}</p>
          <div  id={styles.textCapacidad}><FontAwesomeIcon icon={faPersonBiking}/><p>Capacidad{cantIntegrantes}/{capacidad}</p></div>
        </div>
      </div>
    </div>
  )
}

export default GrupoCard