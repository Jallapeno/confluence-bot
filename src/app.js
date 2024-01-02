import fetch from 'node-fetch';
import btoa from 'btoa';
import dotenv from 'dotenv';
dotenv.config();

export const handle = async () => {
    try {
        const confluenceUrl = process.env.CONFLUENCE_URL
        const pageId = 33155
        // Basic Athentication (login and password)
        const username = process.env.USERNAME
        const password = process.env.PASSWORD
        const base64Credentials = btoa(`${username}:${password}`);
        const authHeaderBasic = `Basic ${base64Credentials}`;
        // Bearer Athentication (Api key)
        const spaceKey = process.env.SPACE_KEY
        const authHeaderBearer = `Bearer ${spaceKey}`;

        const response = await fetch(`${confluenceUrl}/rest/api/content/${33155}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeaderBearer,
            },
        });

        // const data = await response.json();
        console.log(await response);

    } catch (error) {
        console.error(error);
        
    }
}