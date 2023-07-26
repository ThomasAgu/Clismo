import React from 'react'
//styles
import styles from '../../styles/statGlobal.module.css'

const StatGlobal = ({name, value, color}) => {
  return (
    <div id={styles.content}>
        <div style={{color: color}} id={styles.name}>{name}</div>
        <div id={styles.value}>{value}</div>
    </div>
  )
}

export default StatGlobal