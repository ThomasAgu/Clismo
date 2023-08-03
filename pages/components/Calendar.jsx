import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../../styles/Calendar.module.css'
import HistorialCard from './HistorialCard'
const Calendar = ({historial}) => {

  const getDaysInMonth =(year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }

const  getMonthName =(month) =>{
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  }


  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()-1;

    const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);
    
    const [diasEntrenamiento, setDiasEntrenamiento ] = useState([])

  useEffect(() =>{
    if(historial !== undefined){
      setDiasEntrenamiento([])
      const diasDeEntrenamiento = historial.map((el) => el.realized_at)
      diasDeEntrenamiento.map((dia) =>{
        const fecha = new Date(dia);
        const day = fecha.getDay();
        setDiasEntrenamiento((dias)=>[...dias, day]) 
        console.log(diasEntrenamiento, 'Dias de entrenamiento')
      })
    }
    
  }, [historial])

   
    
    
  return (
    <div>
        <h3 id={styles.month}>{getMonthName(currentMonth)}</h3>
        <div className={styles.grid_container}>
            {daysOfWeek.map((day) => (
            <div key={day} className={styles.grid_item_day}>{day}</div>
            ))}
            {Array(firstDayIndex).fill(<div className={styles.grid_item_empty}/>)}
            {daysArray.map((day) => (
                diasEntrenamiento.includes(day) ? 
                  <div key={day} className={styles.grid_item_entrenamiento}><HistorialCard  data={historial[diasEntrenamiento.indexOf(day)]} /></div>
                  :
                  <div key={day}  className={styles.grid_item}>{day}</div>
            ))}
        </div>
       
    </div>
  )
}

export default Calendar