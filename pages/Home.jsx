import React from 'react'
import { useEffect } from 'react'
//components
import NavBar from './components/NavBar'
import NavNarSesion from './components/NavNarSesion'
//baseURL
import { BASE_URL } from './api/url'
//store
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';

const Home = () => {

  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
  const user = {}
  const dispatch = useDispatch();


  useEffect(() => {
    fetch(`${BASE_URL}users/${user_id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        user['id'] = result.id
        user["age"] = result.age,
        user['height'] = result.height
        user['weight'] = result.weight
        user['role'] = result.role
        user['username'] = result.username
        dispatch(loginSuccess(user));
        console.log(result)
        //Aca setear en la store los grupos que vienen con el usuario
      })
      
  }, [])
  return (
    <div>
        <NavBar/>
        <NavNarSesion/>
    </div>
  )
}

export default Home