'use client'
import React from 'react';
import style from './tasksPage.module.scss'
import TaskModalWindow from '../assets/TaskModalWindow/TaskModalWindow';
import TaskBlock from '../assets/TaskBlock/TaskBlock';
import { Task } from '@/app/types';
import CreateTaskModalWindow from '../assets/CreateTaskModalWindow/CreateTaskModalWindow';
import { getCurrentTask } from '@/app/api/data/requests';

type PropsType = {
    tasks: Array<Task>
}

export default function TasksPage(props:PropsType){

    let [activeTask, setActiveTask] = React.useState<Task|null>(null)
    let [isModalWindowOpen, setModalWindowOpen] = React.useState<boolean>(false)
    let [isCreateTaskModalOpen, setCreateTaskModalOpen] = React.useState<boolean>(false)
    async function setModalWindowOpenHandler(taskID?: number){
        if(taskID){
            const task = await getCurrentTask(taskID)
            setActiveTask(task[0]);
            setModalWindowOpen(isModalWindowOpen?false:true)
        }
    }

    return (
        <>
            {isModalWindowOpen?<TaskModalWindow task={activeTask} setModalWindow={setModalWindowOpen}/>:null}
            {isCreateTaskModalOpen?<CreateTaskModalWindow closeWindow={setCreateTaskModalOpen}/>: null}
            <div className={style.wrapper}>
                <div className={style.content_wrapper}>
                    <h1 className={style.header}>To-Do</h1>
                    <div className={style.tasks_block_container}>
                        <TaskBlock tasks={props.tasks} setModalWindow={setModalWindowOpenHandler} setCreateModalWindow={setCreateTaskModalOpen}/>
                    </div>
                </div>
            </div>
        </>
    );
};