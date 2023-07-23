'use client'
import React from 'react';
import style from './tasksPage.module.scss'
import Search from '../assets/SearchButton/Search';
import TaskModalWindow from '../assets/TaskModalWindow/TaskModalWindow';
import TaskBlock from '../assets/TaskBlock/TaskBlock';
import { Task } from '@/app/types';

type PropsType = {
    tasks: Array<Task>
}

export default function TasksPage(props:PropsType){

    let [isModalWindowOpen, setModalWindowOpen] = React.useState(false)
    let [activeTask, setActiveTask] = React.useState<Task|null>(null)

    const getCurrentTask=async(taskID:number)=>await fetch(`http://localhost:3000/api/tasks?id=${taskID}`,{next:{revalidate:5}})

    async function setModalWindowOpenHandler(taskID?: number){
        setModalWindowOpen(isModalWindowOpen?false:true)
        if(taskID){
            const task = await getCurrentTask(taskID).then(res => res.json())
            //@ts-ignore
            setActiveTask(task[0]);
        }
    }

    return (
        <>
            {isModalWindowOpen?<TaskModalWindow task={activeTask} setModalWindow={setModalWindowOpen}/>:null}
            <div className={style.wrapper}>
                <div className={style.content_wrapper}>
                    <div className={style.search_block}>
                        <Search />
                    </div>
                    <TaskBlock tasks={props.tasks} setModalWindow={setModalWindowOpenHandler} />
                </div>
            </div>
        </>
    );
};