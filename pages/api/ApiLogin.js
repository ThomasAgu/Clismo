import { BASE_URL } from "./url";

export async function login(user){
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
    });
    const data = await response.json()
    return data;
}

