type AppSyncEvent = {
    info: {
        fieldName: string
    }
    arguments: {
        title: string
    }
}

exports.handler = async (event: AppSyncEvent) => {
    return "Hello world"
}