import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
//style
import styles from '../../styles/NavBar.module.css'
//store
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/actions';
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {

  const [active, setActive] = useState(false);

  const handleClickLogout = () =>{
    //aca sacar la sesion si la iniciamos
    dispatch(logout())
    router.push('/')
  }

  const setActiveSubmenu = () =>{
    setActive(active => !active)
  }

  const dispatch = useDispatch();

  const UserProfile = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const user = useSelector((state) => state.login.user);
    if (isLoggedIn) {
      return (
        <div>
          <div className='d-flex justify-content-end align-items-end me-3' id={styles.navBarDiv}>
              <button id={styles.logoutBtn} className={styles.btn} onClick={handleClickLogout}>Cerrar Sesion</button>
          </div>
          <div>
            <button id={styles.togglebtn} onClick={setActiveSubmenu}><FontAwesomeIcon icon={faBars} /></button>
            {active ? 
              <div id={styles.divNavResponsive}>
                <button className={styles.btnResponsive}  onClick={handleClickLogout}>Cerrar Sesion</button>
              </div>
              :
              <></>
            }
          </div>
        </div>
      )
      } 
    else {
      return (
        <div id={styles.navDiv}>
          <div className='d-flex justify-content-around align-items-center' id={styles.navBarDiv}>
              <button id={styles.loginBtn} className={styles.btn} onClick={() => router.push('/Login')}  tabIndex={2}>Iniciar Sesion</button>
              <button id={styles.logupBtn} className={styles.btn} onClick={() => router.push('/Register')}  tabIndex={3}>Registrarse</button>
          </div>
          <div >
            <button id={styles.togglebtn} onClick={setActiveSubmenu}><FontAwesomeIcon icon={faBars} /></button>
            {active ? 
              <div id={styles.divNavResponsive}>
                <button className={styles.btnResponsive}  onClick={() => router.push('/Login')}  tabIndex={2}>Iniciar Sesion</button>
                <button className={styles.btnResponsive}  onClick={() => router.push('/Register')}  tabIndex={3}>Registrarse</button>
              </div>
            : 
              <></>
            }
            
            
          </div>
        </div>
      )
    }
  };

  const router = useRouter();

  return (
    <nav className='d-flex justify-content-between' id={styles.NavBar}>
        <h3 id={styles.title} tabIndex={1}>Clismo</h3>
        <UserProfile />
    </nav>
  )
}

export default NavBar