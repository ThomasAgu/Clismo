import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
//Styles
import styles from '../../styles/NavBarSesion.module.css'
import { useSelector } from 'react-redux'
const NavNarSesion = () => {

    const [opcion, setOpcion] = useState('');

    const handleClickSetOpcion = (e) => {
      e.preventDefault()
      setOpcion(opcion => e.target.value) 
      router.push(e.target.value);
    }
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const router = useRouter();
    if (!isLoggedIn){
      return (<></>)
    }
      else{
      return (
      
        <nav className='' id={styles.bigDiv}>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Home'} className={`${styles.btnNav} ${opcion === '/Home' ? styles.btnNavActive : ''}`}>Inicio</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Entrenamientos'} className={`${styles.btnNav} ${opcion === '/Entrenamientos' ? styles.btnNavActive : ''}`} >Entrenamientos</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Grupos'} className={`${styles.btnNav} ${opcion === '/Grupos' ? styles.btnNavActive : ''}`} >Grupos</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Yo'} className={`${styles.btnNav} ${opcion === '/Yo' ? styles.btnNavActive : ''}`}>Yo </button></div>
        </nav>
      )
    }
    
}

export default NavNarSesion