// Import the getToken function from the authenticate.js library
import { getToken } from './authenticate';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Function to add an item to favorites
export async function addToFavourites(id) {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/favourites/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return [];
    }
}

// Function to remove an item from favorites
export async function removeFromFavourites(id) {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/favourites/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return [];
    }
}

// Function to get the list of favorites
export async function getFavourites() {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/favourites`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

// Function to add an item to history
export async function addToHistory(id) {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/history/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error adding to history:', error);
        return [];
    }
}

// Function to remove an item from history
export async function removeFromHistory(id) {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/history/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error removing from history:', error);
        return [];
    }
}

// Function to get the list of history items
export async function getHistory() {
    const token = getToken();
    try {
        const res = await fetch(`${apiUrl}/history`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`
            }
        });
        if (res.status === 200) {
            return await res.json();
        }
        return [];
    } catch (error) {
        console.error('Error fetching history:', error);
        return [];
    }
}
