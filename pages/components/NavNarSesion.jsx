import React from 'react'
import { useRouter } from 'next/router'
//Styles
import styles from '../../styles/NavBarSesion.module.css'
import { useSelector } from 'react-redux'
const NavNarSesion = () => {


    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const router = useRouter();
    if (!isLoggedIn){
      return (<></>)
    }
      else{
      return (
      
        <nav className='' id={styles.bigDiv}>
            <div className={styles.navDiv}><button className={styles.btnNav} onClick={() => router.push('/Home')}>Inicio</button></div>
            <div className={styles.navDiv}><button className={styles.btnNav} onClick={() => router.push('/Entrenamientos')}>Entrenamientos</button></div>
            <div className={styles.navDiv}> <button className={styles.btnNav} onClick={() => router.push('/Grupos')}>Grupos</button></div>
            <div className={styles.navDiv}><button className={styles.btnNav} onClick={() => router.push('/Yo')}>Yo</button></div>
        </nav>
      )
    }
    
}

export default NavNarSesion