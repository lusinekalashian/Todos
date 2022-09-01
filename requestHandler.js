import {
    createTodosInDB,
    getTodoByIDFromDB,
    getTodosFromDB,
    deleteTodoById,
    updateById
} from "./helpers.js"
import url from 'url';
import qs from 'querystring';

export async function getRequest(req,res){
    let data = null;
    const id = Number(url.parse(req.url, true).query.id);
    if (id) {
        data = await getTodoByIDFromDB(id);
    } else {
        data = await getTodosFromDB();
    }

    res.end(JSON.stringify({
        code: 200,
        message: 'Success',
        data
    }))
}

export async function postRequest(req,res){
    let data = ''

    req.on('data', (chunk) => {
        data += String(chunk)
    })

    req.on('end', async () => {
        const body = qs.parse(data)
        await createTodosInDB(body);

        res.end(JSON.stringify({
            code: 200,
            message: 'Success',
        }))
    })
}

export async function deleteRequest(req,res){
    await deleteTodoById(Number(url.parse(req.url, true).query.id));
    res.end(JSON.stringify({
        code: 200,
        message: 'Success',
    }))
}
export async function putRequest(req,res){
    const id = Number(url.parse(req.url, true).query.id);
    let data = '';

    req.on('data', (chunk) => {
        data += String(chunk)
    })

    req.on('end', async () => {
        const body = qs.parse(data)
        await updateById(id, body);

        res.end(JSON.stringify({
            code: 200,
            message: 'Success',
        }))
    })
}


export async function toDosHandler(req,res) {
    switch (req.method) {
        case 'GET' : {
            await getRequest(req,res);
            break;
        }
        case 'POST' : {
            await postRequest(req,res);
            break;
        }

        case 'DELETE' : {
            await deleteRequest(req,res);
        }

        case "PUT" : {
            await putRequest(req,res);
            break;

        }

    }
}

