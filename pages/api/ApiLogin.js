import { BASE_URL } from "./url";

export function login(user){


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
        return result
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
}

