import { BASE_URL } from "./url";

export async function register(user){
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

export async function registerExtra(user){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
    });
    const data = await response.json()
    return data;
}