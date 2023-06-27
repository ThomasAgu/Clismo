import React, { useState } from 'react'
import styles from '../../styles/RangeComponent.module.css'

const RangeComponent = ({label, min, max, type, valor, setValor}) => {



    
   return (
    <div>
        <label for="customRange1" class="form-label text-start" id={styles.label}>{label}</label>
        <input type="range" class="form-range" id={styles.input} min={min} max={max} step='1' value={valor} onChange={setValor} />
        <p className={styles.showValue}>{valor} {type}</p>
    </div>
  )
}

export default RangeComponent