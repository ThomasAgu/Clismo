import React from 'react'
//styles
import styles from '../../styles/statsComparadas.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const StatsComparadas = ({nombre, valorAct, valorComparado, type,valorMax, icon, color}) => {
  
  const handleCalculateHeigh = (valor) =>{    
    const altura = (valor*100/valorMax)
    return altura
  }
  
  return (
    <div id={styles.content}>
      <div id={styles.name} style={{color: color}}>{nombre}</div>
      <div id={styles.statsDouble}>
        <div id={styles.statContent}>
          <p style={{color: color}} className={styles.valueStat}>{valorAct}{type}</p>
          <div id={styles.barContainer}><div style={{color: color, backgroundColor: color, height: handleCalculateHeigh(valorAct)}} className={styles.barra} id={styles.barra}></div></div>
          <FontAwesomeIcon icon={icon} style={{color: color}} id={styles.iconStat}/>
        </div>
        <div id={styles.statContent}>
          <p className={styles.valueStat}>{valorComparado}{type} </p>
          <div id={styles.barContainer}><div style={{ height: handleCalculateHeigh(valorComparado)}} className={styles.barra} id={styles.barra}></div></div>
          <FontAwesomeIcon icon={icon} id={styles.iconStat}/>
        </div>
      </div>  
    </div>
  )
}

export default StatsComparadas