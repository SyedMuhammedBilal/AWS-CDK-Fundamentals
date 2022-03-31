import * as AWS from 'aws-sdk'
import { addTodo } from './AddTodo'
import { deleteTodo } from './DeleteTodo'
import { getTodos } from './GetTodos'
import { Todo } from './Todo'
import { updateTodo } from './UpdateTodo'

export type AppSyncEvent = {
    info: {
        fieldName: string
    }
    arguments: {
        todoId: string,
        todo: Todo
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await addTodo(event.arguments.todo);
        case "getTodos":
            return await getTodos();
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo(event.arguments.todo);
        default:
            return null;
    }
}