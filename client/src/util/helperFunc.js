import {jwtDecode} from 'jwt-decode';


//JWT Token Decode
export const decodeJWToken =  (token) => {
    return jwtDecode(token)
} 

// Random Int for Keys
export const getRandomInt = () => {
    return Math.floor(Math.random() * 500000000000);
};
