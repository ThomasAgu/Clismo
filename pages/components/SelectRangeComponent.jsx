import React from 'react'
import { useState } from 'react';

const SelectRangeComponent = ({activate, setActivate, min, max, valor, onChange}) => {

    const handleClickOk = () =>{
        setActivate(false);
    }
  return (
    <div>
        {activate ?
        //RECIBIR MIN MAX POR PARAMETRO Y VALUE SET VALUE 
            <div>
                <input type="range" min={min} max={max} step={1} value={valor} onChange={onChange} />
                <button onClick={handleClickOk}>Ok</button>
                <p>{valor}</p>
            </div>
        :
            <></>
        }
    </div>
  )
}

export default SelectRangeComponent