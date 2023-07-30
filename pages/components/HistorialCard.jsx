import React from 'react'

const HistorialCard = ({data}) => {

    console.log(data,'historial card')
  return (
    <div>{data == undefined ? '' : data.day}</div>
  )
}

export default HistorialCard