import { BASE_URL } from "./url";

export async function login(user){

    fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error('Error:', error);
    });
    //hasta que santi no cambie que sea un post no puedo hacer el login
    /* const data = await response.json() */  
}

