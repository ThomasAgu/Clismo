import React from 'react'
//styles
import styles from '../../styles/BorrarGroupComponent.module.css'
import { BASE_URL } from '../api/url'
import { useSelector } from 'react-redux'

const BorrarGrupoComponent = ({name, active, setActive, delId, setGruposProfe}) => {
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario


  const handleClickDelete = () =>{

    setGruposProfe((groups) => groups.filter((g) => g.id !== delId) )


    const teacher = {
      "teacher_id": user_id
    }
    fetch(`${BASE_URL}groups/${delId}/delete`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(teacher)
    })
    //EL error esta aca que no devuelve nada
      .then(result => {
        setActive(false)
      })
      .catch(err =>{
        console.error('Error', err)
      });
  }
    return (
    <div >
        {active ? 
        <div id={styles.borrarComponent}>
            <h4 id={styles.borrarText}>Esta seguro que desea borrar el grupo <strong id={styles.name}>{name}</strong>  ?</h4>
            <div id={styles.borrarBtnsDiv}>
                <button className={styles.borrarBtns} id={styles.cancelBtn} onClick={() => setActive(false)}>Cancelar</button>
                <button className={styles.borrarBtns}id={styles.delBtn} onClick={handleClickDelete}>Borrar</button>
            </div>
        </div> : <></>}
    </div>
  )
}

export default BorrarGrupoComponent