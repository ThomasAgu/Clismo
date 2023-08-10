import React from 'react'
import styles from '../../styles/InputComponent.module.css'

const InputComponent = ({label, type, valor, setValue, tabIndex, ariaLabel, min}) => {
  return (
    <div className='d-flex flex-column' id={styles.inputDiv} >
        <label htmlFor="" className={styles.label}>{label}
        <input type={type} name="" id={styles.input} onChange={setValue} value={valor} tabIndex={tabIndex} aria-label={ariaLabel} min={min}/>
        </label>
    </div>
  )
}

export default InputComponent