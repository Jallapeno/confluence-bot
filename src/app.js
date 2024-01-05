import fetch from 'node-fetch';
import btoa from 'btoa';
import dotenv from 'dotenv';
dotenv.config();

export const handle = async () => {
    try {
        const confluenceUrl = process.env.CONFLUENCE_URL
        const pageId = 425989
        // Basic Athentication (login and password)
        const username = process.env.USERNAME
        const email = process.env.EMAIL
        const password = process.env.PASSWORD
        const spaceKey = process.env.SPACE_KEY
        const base64Credentials = btoa(`${email}:${spaceKey}`);
        const authHeaderBasic = `Basic ${base64Credentials}`;
        const authHeaderBearer = `Bearer ${spaceKey}`;

        const newVersion = 5;
        const newTitle = 'Novo Título teste 2.0';
        const newContent = 'Novo conteúdo da página testando';

        const requestBody = {
            version: { number: newVersion },
            title: newTitle,
            type: 'page',
            body: {
                storage: {
                value: newContent,
                representation: 'storage',
                },
            },
        };

        fetch(`${confluenceUrl}/wiki/rest/api/content/${pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeaderBasic
            },
            body: JSON.stringify(requestBody),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Página atualizada com sucesso:', data);
            })
            .catch(error => {
              console.error('Erro ao atualizar a página:', error);
            });


        // const response = await fetch(`${confluenceUrl}/wiki/rest/api/content/${pageId}`, {
        //     method: 'GET',
            // headers: {
            //   'Content-Type': 'application/json',
            //   'Authorization': authHeaderBasic
            // },
        // });

        // const data = await response.json();
        // console.log(data);



    } catch (error) {
        console.error(error);
        
    }
}