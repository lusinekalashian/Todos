import fs from "fs/promises";

const configs = {
    path: "db.json",
    options: 'utf-8'
};

export async function getFileData() {
    try {
        const file = await fs.readFile(configs.path, configs.options);
        return JSON.parse(file);
    } catch (err) {
        console.log("can't get file's data!")
    }
}

export async function getTodosFromDB() {
    const res = await getFileData();
    return res.todos;
}

export async function getTodoByIDFromDB(id) {
    const res = await getFileData();
    return res.todos.find(todo => todo.id === id);
}

export async function writeDataInFile(todos,nextTodoId){
    await fs.writeFile(
        configs.path,
        JSON.stringify(
            {
                todos,
                nextTodoId
            }),
        configs.options
    )
}

export async function createTodosInDB(todo) {
    const {title, isCompleted} = todo;
    let {todos, nextTodoId} = JSON.parse(await fs.readFile(configs.path, configs.options));

    todos.push({
        id: nextTodoId++,
        title,
        isCompleted,
    });
    await writeDataInFile(todos,nextTodoId);
}



export async function deleteTodoById(id){
    try {
        const data = JSON.parse(await fs.readFile(configs.path, configs.options));
        const todos = data.todos.filter(todo => todo.id !== id);
        await writeDataInFile(todos,data.nextTodoId);
    }
    catch (err){
        return console.log(err);
    }
}

export async function updateById(id, updatedData){
    const data = JSON.parse(await fs.readFile(configs.path, configs.options));

    data.todos = data.todos.map((todo) => {
        if (todo.id === id){
            return {
                ...todo,
                ...updatedData,
            }
        } else {
            return todo;
        }
    })
    await fs.writeFile(configs.path, JSON.stringify(data));
}








