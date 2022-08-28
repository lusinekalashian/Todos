import {
    createTodosInDB,
    getTodoByIDFromDB,
    getTodosFromDB
} from "./helpers.js"
import url from 'url';
import qs from 'querystring';

export async function toDosHandler(req,res) {
    switch (req.method) {
        case 'GET' : {
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
            break;
        }
        case 'POST' : {
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
            break;
        }
    }
}

