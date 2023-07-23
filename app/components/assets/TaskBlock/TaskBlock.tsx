'use client'
import React from 'react';
import style from './taskBlock.module.scss'
import { Task } from '@/app/types';

type PropsType = {
    tasks: Array<Task>
    setModalWindow: any
}

export default function TaskBlock(props:PropsType) {
    return ( 
        <div className={style.wrapper}>
            {
                props.tasks.map((task: Task) => (
                    <div className={style.task_block} key={task.id} onClick={()=>{props.setModalWindow(task.id)}}>
                        <p className={style.task_number}>{task.name}</p>
                        <p className={style.task_description}>{task.description}</p>
                    </div>
                ))
            }
        </div>
    );
}