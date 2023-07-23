import { NextResponse } from "next/server";
import {tasks} from "../data/tasks"

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
