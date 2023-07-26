'use client'
import React, { useState } from 'react';
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
    const taskNameRef = React.useRef(null)

    const router = useRouter();

    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.setModalWindow();
    }
    
    const submitChanges = async (taskID:number) => {
        if(editTaskName){
            setEditTaskName(false);
            if(taskNameRef.current != null){
                let request = await fetch(`http://localhost:3000/api/tasks`,{
                    // @ts-ignore
                    method: 'POST', body: JSON.stringify({name: taskNameRef.current.value, id: taskID}),
                })
                // props.setModalWindow()
                router.refresh()
            }
            
        }
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper} >
                <textarea className={style.task_header} ref={taskNameRef} onFocus={()=>{setEditTaskName(true)}}>{props.task?.name}</textarea>
                {/* @ts-ignore */}
                <button className={style.success_button} type="submit" disabled={editTaskName?false:true} onClick={()=>{submitChanges(props.task.id)}} ><TiTick className={style.icon}/></button>
                <p className={style.task_description}>{props.task?.description}</p>
            </div>
        </div>
    );
}