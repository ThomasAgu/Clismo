import React from 'react'
//styles
import styles from '../../styles/BorrarGroupComponent.module.css'

const BorrarGrupoComponent = ({name, active, setActive}) => {
  
  const handleClickDelete = () =>{
    console.log('borrar')
  }
    return (
    <div >
        {active ? 
        <div id={styles.borrarComponent}>
            <h4 id={styles.borrarText}>Esta seguro que desea borrar el grupo {name} ?</h4>
            <div id={styles.borrarBtnsDiv}>
                <button className={styles.borrarBtns} onClick={() => setActive(false)}>Cancelar</button>
                <button className={styles.borrarBtns} onClick={handleClickDelete}>Borrar</button>
            </div>
        </div> : <></>}
    </div>
  )
}

export default BorrarGrupoComponent