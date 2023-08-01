import React from 'react'
import { BASE_URL } from '../api/url'

//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSquareMinus  } from '@fortawesome/free-solid-svg-icons'

//styles
import styles from '../../styles/UserComponent.module.css'
import { useSelector } from 'react-redux'

const UserComponent = ({name, esUser, uid, gid, setPopUp, setTodoBienOMal, setMsg}) => {

    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

    const handleClickKickUser = () => {
        setPopUp(true)
        setTodoBienOMal('todomal')
        setMsg(`Se ha eliminado al usuario ${name} del grupo`)
        const body = {"user_id" : uid}
        fetch(`${BASE_URL}groups/${gid}/removeUser`, {
            method : 'PUT',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
          })
            .then(result=>{
              console.log('Kickeado')
            })
        }

    const handleClickInviteUser = () =>{
        setPopUp(true)
        setTodoBienOMal('todobien')
        setMsg(`Se ha invitado al usuario ${name}`)
        const body = {
            "teacher_id" : user_id
        }
        fetch(`${BASE_URL}groups/${gid}/generateInvitationForUser/${uid}`,{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
            })
            .then(response => response.json())
            .then(result =>{
                console.log('Invitacion enviada')
            })
            .catch(err =>{
                console.error('Error: ', err)
            });
        }
  return (
    <div id={esUser ? styles.userContent : styles.notUser} className={styles.user}>
        <div id={styles.userName}>{name} </div>
        <div>
            {esUser ? 
                <button id={styles.kickBtn} onClick={handleClickKickUser}><FontAwesomeIcon icon={faSquareMinus} id={styles.iconQuit}/></button>
            :
                <button id={styles.inviteBtn} onClick={handleClickInviteUser}><FontAwesomeIcon icon={faEnvelope} id={styles.iconInvite}/></button>
            }
        </div>
        </div>
  )
}

export default UserComponent