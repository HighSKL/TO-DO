export async function createTask(taskName: string, taskDescription: string){
    await fetch(`api/tasks/create`, {
        method:"POST",
        body: JSON.stringify({name: taskName, description: taskDescription})
    })
}

export async function setTaskComplete(taskID: number) {
    await fetch(`api/tasks/`, {
        method: 'DELETE',
        body: JSON.stringify({id: taskID})
    })
}

export async function changeTaskName(taskName:string, taskID: number) {
    await fetch(`api/tasks`,{
        method: 'POST', body: JSON.stringify({name: taskName, id: taskID})
    })
}

export async function changeTaskDescription(taskDescription:string, taskID: number) {
    await fetch(`api/tasks`,{
        method: 'POST', body: JSON.stringify({description: taskDescription, id: taskID})
    })
}

export async function getCurrentTask(taskID:number){
    return await fetch(`api/tasks?id=${taskID}`,{ cache: 'no-store' }).then(res => res.json())
}

export async function getTasks(){
    return await fetch(`http://localhost:3000/api/tasks`, { cache: 'no-store' }).then(res => res.json())
}