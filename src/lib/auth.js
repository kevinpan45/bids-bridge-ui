import { createAuth0Client } from "@auth0/auth0-spa-js";

let auth0Client;

async function init() {
    if (!auth0Client) {
        auth0Client = await createAuth0Client({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        });
    }
    return auth0Client;
}

export async function login() {
    const client = await init();

    await client.loginWithRedirect({
        authorizationParams: {
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
        }
    });
}

export async function logout() {
    const client = await init();
    await client.logout();
}

export async function isAuthenticated() {
    const client = await init();
    return await client.isAuthenticated();
}

export async function getUser() {
    const client = await init();
    return await client.getUser();
}