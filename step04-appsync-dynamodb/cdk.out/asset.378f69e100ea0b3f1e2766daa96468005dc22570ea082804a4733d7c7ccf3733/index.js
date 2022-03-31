"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddTodo_1 = require("./AddTodo");
const DeleteTodo_1 = require("./DeleteTodo");
const GetTodos_1 = require("./GetTodos");
const UpdateTodo_1 = require("./UpdateTodo");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await AddTodo_1.addTodo(event.arguments.todo);
        case "getTodos":
            return await GetTodos_1.getTodos();
        case "deleteTodo":
            return await DeleteTodo_1.deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await UpdateTodo_1.updateTodo(event.arguments.todo);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFtQztBQUNuQyw2Q0FBeUM7QUFDekMseUNBQXFDO0FBRXJDLDZDQUF5QztBQVl6QyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFtQixFQUFFLEVBQUU7SUFDNUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUMxQixLQUFLLFNBQVM7WUFDVixPQUFPLE1BQU0saUJBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLEtBQUssVUFBVTtZQUNYLE9BQU8sTUFBTSxtQkFBUSxFQUFFLENBQUM7UUFDNUIsS0FBSyxZQUFZO1lBQ2IsT0FBTyxNQUFNLHVCQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxLQUFLLFlBQVk7WUFDYixPQUFPLE1BQU0sdUJBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xEO1lBQ0ksT0FBTyxJQUFJLENBQUM7S0FDbkI7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkaydcbmltcG9ydCB7IGFkZFRvZG8gfSBmcm9tICcuL0FkZFRvZG8nXG5pbXBvcnQgeyBkZWxldGVUb2RvIH0gZnJvbSAnLi9EZWxldGVUb2RvJ1xuaW1wb3J0IHsgZ2V0VG9kb3MgfSBmcm9tICcuL0dldFRvZG9zJ1xuaW1wb3J0IHsgVG9kbyB9IGZyb20gJy4vVG9kbydcbmltcG9ydCB7IHVwZGF0ZVRvZG8gfSBmcm9tICcuL1VwZGF0ZVRvZG8nXG5cbmV4cG9ydCB0eXBlIEFwcFN5bmNFdmVudCA9IHtcbiAgICBpbmZvOiB7XG4gICAgICAgIGZpZWxkTmFtZTogc3RyaW5nXG4gICAgfVxuICAgIGFyZ3VtZW50czoge1xuICAgICAgICB0b2RvSWQ6IHN0cmluZyxcbiAgICAgICAgdG9kbzogVG9kb1xuICAgIH1cbn1cblxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBcHBTeW5jRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmluZm8uZmllbGROYW1lKSB7XG4gICAgICAgIGNhc2UgXCJhZGRUb2RvXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgYWRkVG9kbyhldmVudC5hcmd1bWVudHMudG9kbyk7XG4gICAgICAgIGNhc2UgXCJnZXRUb2Rvc1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldFRvZG9zKCk7XG4gICAgICAgIGNhc2UgXCJkZWxldGVUb2RvXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZGVsZXRlVG9kbyhldmVudC5hcmd1bWVudHMudG9kb0lkKTtcbiAgICAgICAgY2FzZSBcInVwZGF0ZVRvZG9cIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB1cGRhdGVUb2RvKGV2ZW50LmFyZ3VtZW50cy50b2RvKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0iXX0=