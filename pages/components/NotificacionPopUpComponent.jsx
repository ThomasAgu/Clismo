import React, {useEffect, useState} from 'react'

import styles from '../../styles/NotiPopUpComponent.module.css'

const NotificacionPopUpComponent = ({msg, todoBienOtodoMal, active, setActive, tiempo}) => {
    const [tiempoDeVida, setTiempoDeVida] = useState(tiempo)
    const [ancho, setAncho] = useState(100)
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
    <div id={todoBienOtodoMal == 'todobien' ? styles.popUpDiv : styles.popUpDivMalito}> 
        {active ?
            <div className={`cartel-${todoBienOtodoMal}`} id={styles.popupCartel}>
                <div id={styles.barraAchicandose} style={{'width':`${ancho}%`, borderTop: '5px solid white'}} ></div>
                <div id={styles.text}>{msg}</div>
                <button id={todoBienOtodoMal == 'todobien' ? styles.closeBtn : styles.closeBtnMalito} onClick={handleClickClose}>x</button>
            </div>
          :
          <></>
        }



    </div>
    )
}

export default NotificacionPopUpComponent