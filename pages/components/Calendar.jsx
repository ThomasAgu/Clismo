import React from 'react'
import styles from '../../styles/Calendar.module.css'
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

  return (
    <div>
        <h3 id={styles.month}>{getMonthName(currentMonth)}</h3>
        <div className={styles.grid_container}>
            {daysOfWeek.map((day) => (
            <div key={day} className={styles.grid_item_day}>{day}</div>
            ))}
            {Array(firstDayIndex).fill(<div className={styles.grid_item_empty}/>)}
            {daysArray.map((day) => (
            <div key={day}  className={styles.grid_item}>{day}</div>
            ))}
        </div>
    </div>
  )
}

export default Calendar