import React from 'react'

//stiles
import styles from '../../styles/InitCard.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

import { get_route, set_route } from '../../store/actions/actions'
import { useDispatch } from 'react-redux'
const InicioCardComponent = ({name, data, icon, orientation, ruta}) => {
  
  const router = useRouter()
const dispatch = useDispatch()
  
  const handleClickChangeRoute = (e) => {
    e.preventDefault()
    dispatch(set_route(ruta))
    router.push(ruta)
  }
    return (
    <div id={styles.content} onClick={handleClickChangeRoute} tabIndex={0}>
        {orientation === 'left' ? <div id={styles.weirdBar}><FontAwesomeIcon icon={icon} id={styles.icon}/></div> : <></>}
        <div id={styles.text}>
            <h5>{name}</h5>
            <p>{data}</p>
        </div>
        {orientation === 'right' ? <div id={styles.weirdBar}><FontAwesomeIcon icon={icon} id={styles.icon}/></div> : <></>}
    </div>

  )
}

export default InicioCardComponent