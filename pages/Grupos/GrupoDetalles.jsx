import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import UserComponent from '../components/UserComponent'
//fA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersLine } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../../styles/GrupoDetalles.module.css'
import { BASE_URL } from '../api/url'
import { useSelector } from 'react-redux'
const GrupoDetalles = () => {
    const router = useRouter();

    const { id } = router.query; 
    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

    const [ grupoAct, setGrupo ] = useState({})
    const [usuariosExternos, setUsuariosExternos] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}groups/${id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(result => {
            setGrupo(result)
          })
      }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/users/list`,{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result =>{
            //setear los usuarios que son al grupo / y no al grupo
            const users = result
            const usuariosExternos = users.filter((u) =>{
                if((u.groups.filter((g) => (g.id == id)).length === 0)&&(user_id !== u.id)){
                    
                    return u
                } 
            })
            setUsuariosExternos(usuariosExternos) 
        
            console.log(usuariosExternos)
        })
        }, [])

   

    return (
    <div id={styles.bigDiv}>
         <NavBar/>
        <NavNarSesion/>
        <div className='d-flex flex-column text-center mt-3' id={styles.title}>
                <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faUsersLine} id={styles.icon} /> </div>
                <h1 id={styles.titleText}> Grupo {grupoAct.name} </h1>
        </div>
        <div id={styles.mainContent}>
            {/* gRUPO CARD */}
            <div id={styles.grupoCard}>
                <div id={styles.nameContent}><h4>{grupoAct.name}</h4></div>
                <div id={styles.descContent}><p>{grupoAct.description}</p></div>
                <div id={styles.difficultyContent}>
                    <h5>Dificultad</h5>
                    <div id={styles.labels}>
                        <div className={grupoAct.difficulty === 'EASY' ? styles.labelActive : styles.labelInactive }><div>Fácil</div></div>
                        <div className={grupoAct.difficulty === 'MEDIUM' ? styles.labelActive : styles.labelInactive }><div>Medio</div></div>
                        <div className={grupoAct.difficulty === 'HARD' ? styles.labelActive : styles.labelInactive }><div>Difícil</div></div>
                    </div>
                </div>

                <div id={styles.privacyContent}>
                    <h5>Privacidad</h5>
                    <div id={styles.labels}>
                        <div className={grupoAct.privacy === 'PUBLIC' ? styles.labelActive : styles.labelInactive }><div>Público</div></div>
                        <div className={grupoAct.privacy === 'PRIVATE' ? styles.labelActive : styles.labelInactive }><div>Privado</div></div>
                    </div>
                </div>
            </div>
            {/* FIn grupo card */}
            {/* Horarios */}
            {/* Horarios */}
            {/* Integrantes e invitaciones */}
            <div id={styles.usersCard}>
                <div id={styles.searchContent}><input type="text" name="" id={styles.inputUsuario}  placeholder='Buscar usuarios'/></div>
                <div id={styles.usuarios}>
                    {grupoAct.users !== [] && grupoAct.users !== undefined ?
                        grupoAct.users.map((u)=>{
                            return (<UserComponent key={u.id} name={u.username} esUser={true} uid={u.id} gid={grupoAct.id}/>)
                    })
                    :
                    <></>
                    }
                    {usuariosExternos.map((u) =>{
                        return(<UserComponent key={u.id} name={u.username} esUser={false} uid={u.id} gid={grupoAct.id}/>)
                    })}
                
                </div>
            </div>

        </div>


    </div>
  )
}

export default GrupoDetalles