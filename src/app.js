import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import FormData from 'form-data';

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

        const nomeArquivo = 'swagger.yaml';
        const caminhoArquivo = '/home/hytal-wsl/projects/confluence-bot/src/doc/swagger.yaml';
        
        try {
            const fileContent = await fs.readFile(caminhoArquivo);
            const form = new FormData();
            form.append('file', fileContent, { filename: 'swagger.yaml' });
            const response = await fetch(`${confluenceUrl}/wiki/rest/api/content/${pageId}/child/attachment`, {
                method: 'POST',
                headers: {
                    'Authorization': authHeaderBasic,
                    ...form.getHeaders(),
                    'X-Atlassian-Token': 'no-check',
                },
                body: form
            });
        
            const data = await response.text();
            console.log('New file added with success:', data); 
        } catch (error) {
            console.error('Erro to add new file:', error);
        }
          
    //     try {
    //         const response = await fetch(`${confluenceUrl}/wiki/rest/api/content/${pageId}/child/attachment`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': authHeaderBasic,
    //             },
    //             body: formData,
    //           })
    //             // .then(response => response.json())
    //             // .then(data => {
    //             //   console.log('Anexo adicionado com sucesso:', data);
    //             // })
    //             // .catch(error => {
    //             //   console.error('Erro ao adicionar anexo:', error);
    //             // });
    //             const data = await response.json();
    //   console.log('Anexo adicionado com sucesso:', data);
    //     } catch (error) {
    //         console.log(error);
    //     }


        // const requestBody = {
        //     version: { number: newVersion },
        //     title: newTitle,
        //     type: 'page',
        //     body: {
        //         storage: {
        //         value: newContent,
        //         representation: 'storage',
        //         },
        //     },
        // };

        // fetch(`${confluenceUrl}/wiki/rest/api/content/${pageId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': authHeaderBasic
        //     },
        //     body: JSON.stringify(requestBody),
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log('Página atualizada com sucesso:', data);
        //     })
        //     .catch(error => {
        //       console.error('Erro ao atualizar a página:', error);
        //     });


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