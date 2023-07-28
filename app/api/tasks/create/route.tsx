import { NextResponse } from "next/server";
import {tasks, setTasks} from "@/app/api/data/tasks"

export async function POST(req: Request, res: Response){

    const body = await req.json()

    tasks.push({id: Math.floor(Math.random()*999999), name: body.name, description: body.description})

    return NextResponse.json({})
}