import { jwtDecode } from 'jwt-decode';

function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    try {
        return localStorage.getItem('token');
    } catch (err) {
        return null;
    }
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function readToken() {
    try {
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch (err) {
        return null;
    }
}

export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password, password2: password2 }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    const data = await res.json();

    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}