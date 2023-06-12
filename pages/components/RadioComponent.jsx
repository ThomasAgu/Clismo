import React from 'react'

const RadioComponent = ({opcion, value, onchange}) => {
  return (
    <div>
        <input type="radio" id={opcion} value={value} onChange={onchange}/>
        <label for={opcion} >{value}</label>
   </div>
  )
}

export default RadioComponent