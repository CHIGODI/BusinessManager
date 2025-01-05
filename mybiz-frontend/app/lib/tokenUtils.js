import axios from 'axios';
import { jwtVerify } from 'jose';

// Verify and decode JWT
export const verifyToken = async (token, secret) => {
    try {
        // Decode the JWT token using the secret
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        return payload;
    } catch (error) {
        return null;
    }
};

// Check if the token is expired
export const isTokenExpired = async (token, secret) => {
    const payload = await verifyToken(token, secret);

    console.log('Payload:', payload);


    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime)// Current time in seconds
    const expTime = payload.exp < currentTime;
    console.log(expTime)
    return expTime; // Return true if token is expired
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/account/token/refresh/", {
            refresh: refreshToken, // Ensure the key name matches what the API expects
        });

        // Return the new access token from the response data
        return response.data.accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error.response ? error.response.data : error.message);
        return null;
    }
};
