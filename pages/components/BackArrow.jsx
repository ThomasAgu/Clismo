import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import styles from '../../styles/Arrow.module.css'
import {useRouter } from 'next/router'

const BackArrow = () => {

    const router = useRouter()
  return (
    <div id={styles.content}>
        <button id={styles.btn} onClick={()=>{router.back()}}><FontAwesomeIcon icon={faArrowLeft} id={styles.icon}/>Volver-Atras</button>
    </div>
  )
}

export default BackArrow