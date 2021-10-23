import axios from 'axios';
import { parseCookies } from 'nookies'

const cookie = parseCookies(undefined)
export const apiAuth = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookie['nextauth.token']}`
    }
})