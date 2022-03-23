type AppSyncEvent = {
    info: {
        fieldName: string
    }
    arguments: {
        msg: string
    }
}

exports.handler = async (event: AppSyncEvent) => {
    if (event.info.fieldName === "hello") {
        return "Hello world"
    } else if (event.arguments.msg === "myCustomMsg") {
        return `Hello from ${event.arguments.msg}`
    } else {
        return "Error"
    }
}