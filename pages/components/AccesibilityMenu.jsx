import React from 'react'

import styles from '../../styles/Accesibility.module.css'

const AccesibilityMenu = ({activeMenu, setActiveMenu}) => {

    const handleClickPaleta = (e) => {
        console.log(e.target.checked)
        const root = document.documentElement;
        //setear el valor de la paleta en local storage asi persiste en el cliente
        root.classList.toggle('theme2');
      }
    
      const handleClickTamanioLetra = (e) => {
        const root = document.documentElement;
        //setear el valor de la paleta en local storage asi persiste en el cliente
        root.classList.toggle('biggerText');
      }


  return (
    <div id={styles.menu}>
        {activeMenu ?
            <div id={styles.activeMenu}>
                 <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  onChange={handleClickPaleta}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked" className={styles.label}> Modo Oscuro </label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  onChange={handleClickTamanioLetra}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked" className={styles.label} > Letra Grande</label>
                </div>
            </div>
        :
        <div id={styles.inactiveMenu}></div>}

    </div>
  )
}

export default AccesibilityMenu