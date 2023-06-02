import React from 'react'

const RadioSelectComponent = ({options}) => {

   
  return (
    <div className='d-flex flex-row'>
        {options.map((op) =>{
            return (
                <div key={op.name}>
                    <input type="radio" class="btn-check" name={op.name} id={op.name} autocomplete="off" />
                    <label class="btn btn-secondary" for={op.name}>{op.label}</label>
                </div>
                )
        })}
       
    </div>
  )
}

export default RadioSelectComponent