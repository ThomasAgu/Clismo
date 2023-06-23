import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react'
import { useState } from 'react';
//styles
import styles from '../../styles/CrearEntrenamiento.module.css'

const SelectRangeComponent = ({activate, setActivate, min, max, valor, onChange, icon, unidad, colorAccento}) => {

    const handleClickOk = () =>{
        setActivate(false);
    }
  return (
    <div>
        {activate ?
        //RECIBIR MIN MAX POR PARAMETRO Y VALUE SET VALUE 
            <div className='d-flex flex-column' style={{border: `1px solid #${colorAccento}`}} id={styles.parametersDiv}>
                <FontAwesomeIcon icon={icon} style={{color: colorAccento}} id={styles.parametersIcon}/>
                <input type="range" min={min} max={max} step={1} value={valor} onChange={onChange} />
                <div className='d-flex flex-column align-items-center' id={styles.parametersInfo}>
                    <strong>{valor}</strong>
                    <p>{unidad}</p>
                </div>
    
            </div>
        :
            <div id={styles.parametersDivInactive}></div>
        }
    </div>
  )
}

export default SelectRangeComponent