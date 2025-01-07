import axios from 'axios';
import { jwtVerify } from 'jose';

export const verifyToken = async (token, secret) => {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        return payload;
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = async (token, secret) => {
    const payload = await verifyToken(token, secret);
    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = payload.exp < currentTime;
    return expTime;
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/account/token/refresh/", {
            refresh: refreshToken,
        });

        // Return the new access token from the response data
        return response.data.accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error.response ? error.response.data : error.message);
        return null;
    }
};
