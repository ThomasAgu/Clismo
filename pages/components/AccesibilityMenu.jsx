import React from 'react'
import { useEffect, useState } from 'react'

import styles from '../../styles/Accesibility.module.css'

const AccesibilityMenu = ({activeMenu, setActiveMenu}) => {

  const [paletteChecked, setPaletteChecked] = useState(false)
  const [fsChecked, setFsChecked] = useState(false)

  useEffect(() => {
    const palette = localStorage.getItem('palette')
    const root = document.documentElement;
    if(palette !== null){
      if(palette == 'dark'){
        root.classList.add('theme2');
        setPaletteChecked(true)
      }
      else{
        root.classList.remove('theme2');
        setPaletteChecked(false)
      }
    }
    else{
      if(palette == 'dark'){
        root.classList.add('theme2');
        setPaletteChecked(true)
      }
      else{
        root.classList.remove('theme2');
        setPaletteChecked(false)
      }
    }
  }, [])



    const handleClickPaleta = (e) => {
        const root = document.documentElement;
        const palette = localStorage.getItem('palette')
        console.log(palette)
        if(palette !== null){
          if(palette == 'dark'){
            root.classList.remove('theme2');
            localStorage.setItem('palette', 'light')
            setPaletteChecked(false)
          }
          else{
            root.classList.add('theme2');
            localStorage.setItem('palette', 'dark')
            setPaletteChecked(true)
          }
        }
        else{
            console.log('se esta ejecutando este else')
            root.classList.add('theme2');
            localStorage.setItem('palette', 'dark')
            setPaletteChecked(true)
        }
    }

    useEffect(() => {
      const font_size = localStorage.getItem('font_size')
      const root = document.documentElement;
      if(font_size !== null){
        if(font_size == 'bigger'){
          root.classList.add('biggerText');
          setFsChecked(true)
        }
        else{
          root.classList.remove('biggerText');
          setFsChecked(false)
        }
      }
      else{
        if(font_size == 'bigger'){
          root.classList.add('biggerText');
          setFsChecked(true)
        }
        else{
          root.classList.remove('biggerText');
          setFsChecked(false)
        }
      }
    }, [])

    
      const handleClickTamanioLetra = (e) => {
        const root = document.documentElement;
        const font_size = localStorage.getItem('font_size')
        if(font_size !== null){
          if(font_size == 'bigger'){
            root.classList.remove('biggerText');
            localStorage.setItem('font_size', 'normal')
            setFsChecked(false)
          }
          else{
            root.classList.add('biggerText');
            localStorage.setItem('font_size', 'bigger')
            setFsChecked(true)
          }
        }
        else{
            root.classList.add('biggerText');
            localStorage.setItem('font_size', 'bigger')
            setFsChecked(true)
        }
      }


  return (
    <div id={styles.menu}>
        {activeMenu ?
            <div id={styles.activeMenu}>
                 <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={paletteChecked}  onChange={handleClickPaleta}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked" className={styles.label}> Modo Oscuro </label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={fsChecked} onChange={handleClickTamanioLetra}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked" className={styles.label}  > Letra Grande</label>
                </div>
            </div>
        :
        <div id={styles.inactiveMenu}></div>}

    </div>
  )
}

export default AccesibilityMenu