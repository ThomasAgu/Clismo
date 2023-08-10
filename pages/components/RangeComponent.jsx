import React, { useState } from 'react'
import styles from '../../styles/RangeComponent.module.css'

const RangeComponent = ({label, min, max, type, valor, setValor}) => {



    
   return (
    <div>
        <label for="customRange1" class="form-label text-start" id={styles.label}>{label}
          <input type="range" class="form-range" id={styles.input} min={min} max={max} step='1' value={valor} onChange={setValor} />
        </label>
        <h2 className={styles.showValue}>{valor} {type}</h2>
    </div>
  )
}

export default RangeComponent