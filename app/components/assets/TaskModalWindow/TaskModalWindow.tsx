'use client'
import React, { useRef, useState } from 'react';
import style from './taskModalWindow.module.scss'
import { Task } from '@/app/types';
import { TiTick } from "react-icons/ti";
import { useRouter } from 'next/navigation';
import { changeTaskDescription, changeTaskName, setTaskComplete } from '@/app/api/data/requests';

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
            setEditTaskName(false);
            taskNameRef.current?changeTaskName(taskNameRef.current["value"], taskID):null
            router.refresh() 
        }
    }

    const submitTaskDescriptionChanges = async (taskID:number) => {
        if(editTaskDescription){
            setEditTaskDescription(false);
            taskDescriptionRef.current?await changeTaskDescription(taskDescriptionRef.current["value"], taskID):null
            router.refresh()
        }
    }

    const completeTask = async ( taskID: number ) => {
        await setTaskComplete(taskID)
        props.setModalWindow();
        router.refresh();
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper} onClick={setEditModButtonVisible}>
                <div>
                    <textarea className={style.task_header} ref={taskNameRef} defaultValue={props.task?.name} />
                    <button className={style.success_button} type="submit" disabled={editTaskName?false:true} style={{opacity:editTaskName?"100%":"0%"}} onClick={()=>props.task?submitTaskNameChanges(props.task.id):null} ><TiTick className={style.icon}/></button>
                </div>
                <div>
                    <textarea className={style.task_description} ref={taskDescriptionRef} defaultValue={props.task?.description} />
                    <button className={style.success_button} type="submit" disabled={editTaskDescription?false:true} style={{opacity:editTaskDescription?"100%":"0%"}} onClick={()=>props.task?submitTaskDescriptionChanges(props.task.id):null} ><TiTick className={style.icon}/></button>
                </div>
                <div className={style.buttons_block}>
                    <button className={style.completeTask} onClick={()=>props.task?completeTask(props.task?.id):null}>Выполнено</button>
                </div>
            </div>
        </div>
    );
}