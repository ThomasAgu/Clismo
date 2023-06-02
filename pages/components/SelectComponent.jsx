import React from 'react'

const SelectComponent = ({options, label}) => {
  return (
    <div>  
        <label htmlFor="" >{label}</label>
        <select class="form-select" aria-label="Default select example">
            {options.map((op) =>{
                return (
                  <div>
                    <option value={op}>{op}</option>
                    <label htmlFor="" for={op}/>
                  </div>
                )
            })}
        </select>
    </div>
  )
}

export default SelectComponent