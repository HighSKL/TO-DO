'use client'
import React, { useRef, useState } from 'react';
import style from './taskModalWindow.module.scss'
import { Task } from '@/app/types';
import { TiTick } from "react-icons/ti";
import { useRouter } from 'next/navigation';



type PropsType = {
    task: Task|null
    setModalWindow: any
}

export default function TaskModalWindow(props: PropsType) {

    const [editTaskName, setEditTaskName] = useState(false)
    const [editTaskDescription, setEditTaskDescription] = useState(false)
    const taskNameRef = React.useRef(null)
    const taskDescriptionRef = React.useRef(null)

    const router = useRouter();

    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.setModalWindow();
    }

    const setEditModButtonVisible = (event: any) => {
        event.stopPropagation();
        if (event.target !== taskNameRef.current)
            setEditTaskName(false);
        else if (event.target === taskNameRef.current){
            if(!editTaskName)
                setEditTaskName(true);
        }
        if(event.target === taskDescriptionRef.current)
                setEditTaskDescription(true);
        else if (event.target !== taskDescriptionRef.current)
            setEditTaskDescription(false);
    }
     
    const submitTaskNameChanges = async (taskID:number) => {
        if(editTaskName){
            setEditTaskDescription(false);
            if(taskDescriptionRef.current != null){
                let request = await fetch(`http://localhost:3000/api/tasks`,{
                    // @ts-ignore
                    method: 'POST', body: JSON.stringify({name: taskNameRef.current.value, id: taskID}),
                })
                router.refresh()
            }
            
        }
    }

    const submitTaskDescriptionChanges = async (taskID:number) => {
        if(editTaskName){
            setEditTaskName(false);
            if(taskNameRef.current != null){
                let request = await fetch(`http://localhost:3000/api/tasks`,{
                    // @ts-ignore
                    method: 'POST', body: JSON.stringify({description: taskDescriptionRef.current.value, id: taskID}),
                })
                // props.setModalWindow()
                router.refresh()
            }
            
        }
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper} onClick={setEditModButtonVisible}>
                <div>
                    <textarea className={style.task_header} ref={taskNameRef}>{props.task?.name}</textarea>
                    {/* @ts-ignore */}
                    <button className={style.success_button} type="submit" disabled={editTaskName?false:true} style={{opacity:editTaskName?"100%":"0%"}} onClick={()=>{submitTaskNameChanges(props.task.id)}} ><TiTick className={style.icon}/></button>
                </div>
                <div>
                    <textarea className={style.task_description} ref={taskDescriptionRef}>{props.task?.description}</textarea>
                    {/* @ts-ignore */}
                    <button className={style.success_button} type="submit" disabled={editTaskDescription?false:true} style={{opacity:editTaskDescription?"100%":"0%"}} onClick={()=>{submitTaskDescriptionChanges(props.task.id)}} ><TiTick className={style.icon}/></button>
                </div>
            </div>
        </div>
    );
}