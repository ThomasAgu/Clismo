import React, { useState } from 'react'
import styles from '../../styles/RangeComponent.module.css'

const RangeComponent = ({label, min, max, type}) => {


    const [value, setValue] = useState(min);

    const handleChangeValue = (e) =>{
        setValue(e.target.value);
    }
   return (
    <div>
        <label for="customRange1" class="form-label" id={styles.label}>{label}</label>
        <input type="range" class="form-range" id={styles.input} min={min} max={max} step='1' value={value} onChange={handleChangeValue} />
        <p className={styles.showValue}>{value} {type}</p>
    </div>
  )
}

export default RangeComponent