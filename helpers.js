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

export async function createTodosInDB(todo) {
    const {title, isCompleted} = todo;

    const file = await fs.readFile(configs.path, configs.options);
    const data = JSON.parse(file);
    const {todos} = data;
    let {nextTodoId} = data;

    todos.push({
        id: nextTodoId,
        title,
        isCompleted,
    });

    nextTodoId++;

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







