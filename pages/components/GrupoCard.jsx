import React from 'react'
import { useState } from 'react';
import { Router,useRouter } from 'next/router';
import styles from '../../styles/GrupoCard.module.css'
//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faPersonBiking } from '@fortawesome/free-solid-svg-icons';
//components
import MostrarHoras from './MostrarHoras';
import BorrarGrupoComponent from './BorrarGrupoComponent';
//store
import { useSelector } from 'react-redux';
import { BASE_URL } from '../api/url';

const GrupoCard = ({nombre, descripcion, privacidad, cantIntegrantes, capacidad, dificultad, setMisGrupos, setGrupos, grupos, misGrupos, unido, setActivateDel, setName, setDelId, id}) => {
  
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

  const [dia, setDia] = useState('')
  const [horarioCompleto, setHorarioCompleto] = useState('')
  const [horario, setHorario] = useState({})


  //para el update
  const router = useRouter();


  const handleClickChange = () => {
    //API CALL
    
    const gruposName = grupos.map(el=> el.name);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    grupo.users.push({'id': user_id, "name": ''}) 
    setMisGrupos((misGrupos) => [...misGrupos, grupo])
    const gruposLibres = grupos.filter((el) => el.name !== nombre)
    setGrupos(gruposLibres)

    const body = {
      "user_id" : user_id
    }
    fetch(`${BASE_URL}groups/${grupo.id}/addUser`, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(body)
    })
      .then(result=>{
        console.log('agregado')
      })
  }

  const handleClickAbandonarGrupo = () => { 
    //API CALL
    const gruposName = grupos.map(el=> el.name)
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    console.log(grupo)
    grupo.users.pop() 

    setGrupos((misGrupos) => [...misGrupos, grupo])
    const updatedArray = grupos.filter((obj) => obj.name !== nombre);
    setMisGrupos(updatedArray);

    const body = {
      "user_id" : user_id
    }
    fetch(`${BASE_URL}groups/${grupo.id}/removeUser`, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(body)
    })
      .then(result=>{
        console.log('agregado')
      })
  }

  const handleSelecDia = (e) => {
    e.preventDefault()
    const gruposName = grupos.map(el=> el.name);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    setHorarioCompleto(grupo.schedules)
    const diaElegido = grupo.schedules.filter((el) => el.day === e.target.value)[0]

    //Quedarnos con el horario del dia elegido
    //Luego seteamos
    if(diaElegido !== undefined){
      console.log(dia)
      dia.day === e.target.value ? 
        setDia('')
        :
        setDia(diaElegido) 
      }
     
  }

  const handleDelegateClass = (diaAct) => {
    if(grupos !== undefined){
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
    return `${styles.btnDayInactive}`
    
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
  }

  const handleClickBorrar = () =>{
    setName(nombre)
    setDelId(id)
    setActivateDel(true)
  }

  const handleClickEditar = () =>{
    router.push({
      pathname : `/Grupos/GrupoDetalles`,
      query : { id : id}
    })
  }

  const mostrarBotonSegunEstadoDelGrupo = () =>{
    if(grupos !== undefined){
      const  grupo  = grupos.filter((el) => el.name === nombre)[0]
      if(grupo.teacher.id === user_id){
      
      return(
        <div id={styles.profeDivBtns}>
          <button id={styles.editarBtn} onClick={handleClickEditar}><FontAwesomeIcon icon={faEdit} id={styles.editIcon}/> editar</button>
          <button id={styles.borrarBtn} onClick={handleClickBorrar}><FontAwesomeIcon icon={faDeleteLeft} id={styles.delIcon}/> borrar</button>
        </div>
      )
    }
    else{
      if(unido) 
        return (<button id={styles.salirDelGrupoBtn} onClick={handleClickAbandonarGrupo}>Abandonar</button>)
      else
        return(<button id={styles.anotarseBtn} onClick={handleClickChange}>Unirme</button>)
    }
    }
    
  }
  
  return (
    <div className='mx-auto' id={styles.content}>
      <div id={styles.firstColumn}>
        <div id={styles.groupName} tabIndex={0}>{nombre}</div>
        <div id={styles.description} tabIndex={0}>{descripcion}</div>
        {mostrarBotonSegunEstadoDelGrupo()}
        
      </div>
      <div className="" id={styles.secondColumn}>
        <div>
          <p id={styles.horarios} tabIndex={0}>Horarios</p>
          <div id={styles.horariosBigDiv}>
            <div id={styles.horariosDiv}>
              <button onClick={handleSelecDia}   className={dia.day === 'MONDAY' ? styles.btnDayActive : handleDelegateClass('MONDAY')}  id='L' value={'MONDAY'}>L</button>
              <button onClick={handleSelecDia} className={dia.day === 'TUESDAY' ? styles.btnDayActive : handleDelegateClass('TUESDAY')}  id='M' value={'TUESDAY'}>M</button>
              <button onClick={handleSelecDia} className={dia.day === 'WEDNESDAY' ? styles.btnDayActive : handleDelegateClass('WEDNESDAY')}  id='X' value={'WEDNESDAY'}>X</button>
              <button onClick={handleSelecDia} className={dia.day === 'THURSDAY' ? styles.btnDayActive : handleDelegateClass('THURSDAY')}  id='J' value={'THURSDAY'}>J</button>
              <button onClick={handleSelecDia} className={dia.day === 'FRIDAY' ? styles.btnDayActive : handleDelegateClass('FRIDAY')}  id='V' value={'FRIDAY'}>V</button>
              <button onClick={handleSelecDia} className={dia.day === 'SATURDAY' ? styles.btnDayActive : handleDelegateClass('SATURDAY')}  id='S' value={'SATURDAY'}>S</button>
              <button onClick={handleSelecDia} className={dia.day === 'SUNDAY' ? styles.btnDayActive : handleDelegateClass('SUNDAY')}  id='D' value={'SUNDAY'}>D</button>
            </div>
          <MostrarHoras dia={dia} setDia={setDia} horarioCompleto={horarioCompleto}/>
          </div>
        </div>
        <div id={styles.aditionalInfo} tabIndex={0}>
          <div id={styles.textNivel}>{handleDificultad()}</div>
          <div  id={styles.textCapacidad}><FontAwesomeIcon icon={faPersonBiking} id={styles.biciIcon}/><div>Capacidad {cantIntegrantes}/{capacidad}</div></div>
        </div>
      </div>
    </div>
  )
}

export default GrupoCard