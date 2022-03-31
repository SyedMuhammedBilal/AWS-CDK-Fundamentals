import { Todo } from './Todo';
export declare type AppSyncEvent = {
    info: {
        fieldName: string;
    };
    arguments: {
        todoId: string;
        todo: Todo;
    };
};
