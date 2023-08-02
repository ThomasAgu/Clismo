import React, {useState, useEffect} from 'react'

import MostrarTrainingGroupData from './MostrarTrainingGroupData'
import { BASE_URL } from '../api/url'
import styles from '../../styles/SemanaEntrenamiento.module.css'
const SemanaDeEntrenamientos = ({scheduleTotal}) => {
  
    const [dia, setDia] = useState('')
    const [horarioCompleto, setHorarioCompleto] = useState('')
    const [horario, setHorario] = useState({})    
    const [primerLunes, setPrimerLunes] = useState('')

    const [trainSelected, setTrainSelected] = useState({})
    const [groupSelected, setGroupSelected] = useState({})
    const [active, setActive] = useState(false)

    useEffect(() => {
      const today = new Date();
      const currentDayOfWeek = today.getDay()+1; // 0 para domingo, 1 para lunes, ..., 6 para sábado
      const daysToMonday = (currentDayOfWeek === 0) ? 6 : (currentDayOfWeek - 2);
      const firstMonday = new Date(today.getTime() - daysToMonday * 24 * 60 * 60 * 1000);
      setPrimerLunes(`${firstMonday.getDate()}/${firstMonday.getMonth()+1}`)
    }, [])
  
  const handleSelecDia = (e) =>{ 
    e.preventDefault();
    //schedules del dia seleccionado
    setGroupSelected({})
    setTrainSelected({})
    const schedules = scheduleTotal.filter((s) => s.day == e.target.value )
    
    //traer grupo
    if(schedules !== []){
      schedules.map((el) =>{
        fetch(`${BASE_URL}groups/${el.group_id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(result => {
            setGroupSelected(result)
        })
        if(el.training_id !== null){
          fetch(`${BASE_URL}trainings/${el.training_id}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(result => {
              setTrainSelected(result)
          })
        }
      })
      
      if(schedules.filter((s) => s.day == e.target.value).length > 0) {
        setDia(e.target.value)
        if(dia !== ''){
          dia === e.target.value ?setDia(''):setDia(e.target.value)
        }
      }
    }
    //traer entrenamiento
    //setearlo antes de activar el componente
  }

  const handleDelegateClass  = (diaAct) =>{
    if(scheduleTotal !== undefined){
      const diaEnSchedule = scheduleTotal.filter((el) => el.day === diaAct)[0]
      /* console.log(diaEnSchedule) */
      if(diaEnSchedule !== undefined){
        return (`${styles.btnDay} ${dia === diaAct ? styles.btnDayActive : ''}`)
      }
    }
    
    return `${styles.btnDayInactive}`
  }

    return (
    <div id={styles.content}>
        <h3>Semana del {primerLunes}</h3>
        
        <div id={styles.horariosBigDiv}>
                <div id={styles.horariosDiv}>
                <button onClick={handleSelecDia} className={dia.day === 'MONDAY' ? styles.btnDayActive : handleDelegateClass('MONDAY')}  id='L' value={'MONDAY'}>L</button>
                <button onClick={handleSelecDia} className={dia.day === 'TUESDAY' ? styles.btnDayActive : handleDelegateClass('TUESDAY')}  id='M' value={'TUESDAY'}>M</button>
                <button onClick={handleSelecDia} className={dia.day === 'WEDNESDAY' ? styles.btnDayActive : handleDelegateClass('WEDNESDAY')}  id='X' value={'WEDNESDAY'}>X</button>
                <button onClick={handleSelecDia} className={dia.day === 'THURSDAY' ? styles.btnDayActive : handleDelegateClass('THURSDAY')}  id='J' value={'THURSDAY'}>J</button>
                <button onClick={handleSelecDia} className={dia.day === 'FRIDAY' ? styles.btnDayActive : handleDelegateClass('FRIDAY')}  id='V' value={'FRIDAY'}>V</button>
                <button onClick={handleSelecDia} className={dia.day === 'SATURDAY' ? styles.btnDayActive : handleDelegateClass('SATURDAY')}  id='S' value={'SATURDAY'}>S</button>
                <button onClick={handleSelecDia} className={dia.day === 'SUNDAY' ? styles.btnDayActive : handleDelegateClass('SUNDAY')}  id='D' value={'SUNDAY'}>D</button>
                </div>
            <MostrarTrainingGroupData groupSelected={groupSelected} trainSelected={trainSelected} active={active} dia={dia} setDia={setDia}/>
        </div>

    </div>
  )
}

export default SemanaDeEntrenamientos