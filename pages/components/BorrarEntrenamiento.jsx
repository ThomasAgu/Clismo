import React from 'react'
import styles from '../../styles/BorrarEntrenamiento.module.css'
const BorrarEntrenamiento = ({name, active, setActive, setPopUp,setMsg,setTodoBienOMal}) => {

    const handleClickDelete = () =>{

        setActive(false)
        setPopUp(true)
        setMsg(`Se ha borrado el entrenamiento ${name}`)
      }
  return (
    <div>
        {active ? 
        <div id={styles.borrarComponent}>
            <h4 id={styles.borrarText}>Esta seguro que desea borrar el entrenamiento <strong id={styles.name}>{name}</strong> ?</h4>
            <div id={styles.borrarBtnsDiv}>
                <button className={styles.borrarBtns} id={styles.cancelBtn} onClick={() => setActive(false)}>Cancelar</button>
                <button className={styles.borrarBtns} id={styles.delBtn} onClick={handleClickDelete}>Borrar</button>
            </div>
        </div> : <></>}
    </div>
  )
}

export default BorrarEntrenamiento