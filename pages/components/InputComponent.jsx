import React from 'react'
import styles from '../../styles/InputComponent.module.css'

const InputComponent = ({label, type}) => {
  return (
    <div className='d-flex flex-column' id={styles.inputDiv} >
        <label htmlFor="" >{label}</label>
        <input type={type} name="" id={styles.input}/>
    </div>
  )
}

export default InputComponent