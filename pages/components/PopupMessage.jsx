import React from 'react'
import { useState, useEffect } from 'react'
//style
import styles from '../../styles/PopupMessage.module.css'

const PopupMessage = ({msg, todoBienOtodoMal, active, setActive, tiempo}) => {
  
  const [tiempoDeVida, setTiempoDeVida] = useState(tiempo)
  const [ancho, setAncho]  = useState(100)
  let anchete = 100
  useEffect(() =>  {

    const interval = setInterval(() =>{
      setTiempoDeVida(tiempo => tiempo -1)
      setAncho(ancho => ancho -1)

      
      anchete -= 1
      if(anchete == 0){
        
        handleClickClose()
      }

    }, 20)

    return() =>{
      
      clearInterval(interval)
    }

  }, [active])

  const handleClickClose = () => {
    setActive(false)
    setAncho(100)
  }


  return (
    <div id={styles.popupDiv}>
      {active ? 
        <div className={`cartel-${todoBienOtodoMal}`} id={styles.popupCartel}>
          <div id={styles.barraAchicandose} style={{'width':`${ancho}%`, borderTop: '5px solid white'}} ></div>
          <p id={styles.text}>{msg}</p>
          <button id={styles.closeBtn} onClick={handleClickClose}>x</button>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default PopupMessage