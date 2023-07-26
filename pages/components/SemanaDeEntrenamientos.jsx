import React, {useState} from 'react'

import MostrarHoras from './MostrarHoras'

import styles from '../../styles/SemanaEntrenamiento.module.css'
const SemanaDeEntrenamientos = () => {
  
    const [dia, setDia] = useState('')
    const [horarioCompleto, setHorarioCompleto] = useState('')
    const [horario, setHorario] = useState({})
  
  const handleSelecDia = () =>{

  }

  const handleDelegateClass  = () =>{
    return `${styles.btnDayInactive}`
  }
    return (
    <div id={styles.content}>
        <h3>Semana del nn/nn</h3>
        
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
            <MostrarHoras dia={dia} setDia={setDia} horarioCompleto={horarioCompleto}/>
        </div>

    </div>
  )
}

export default SemanaDeEntrenamientos