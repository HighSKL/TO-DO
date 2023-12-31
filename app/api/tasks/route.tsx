import { NextResponse } from "next/server";
import {tasks, setTasks} from "../data/tasks"
import { Task } from "@/app/types";

export async function GET(res: Response){

    let {searchParams} = new URL(res.url)
    const query = searchParams.get('id')

    let currentTasks = tasks
    
    if(query){
        currentTasks = currentTasks.filter(task => {
            if(task.id.toString().toLowerCase() == query.toLowerCase()){
                return task
            }
        })
    }
    return NextResponse.json(currentTasks)
}

export async function POST(req: Request, res: Response){
    const body = await req.json()

    let changedTask:Task[] = []

    if(body.description){
        tasks.forEach(task=>{
            if(task.id == body.id)
                task.description = body.description
            changedTask.push(task)
        })
    }
    if(body.name){
        tasks.forEach(task=>{
            if(task.id == body.id)
                task.name = body.name
            changedTask.push(task)
        })
    }
    
    setTasks(changedTask)

    return NextResponse.json({status:200})
}

export async function DELETE(req: Request, res: Response){
    const body = await req.json()

    let changedTask:Task[] = []

    tasks.forEach(task=>{
        if(task.id != body.id){
            changedTask.push(task)
        }
    })

    setTasks(changedTask)

    NextResponse.json({status:200})
}