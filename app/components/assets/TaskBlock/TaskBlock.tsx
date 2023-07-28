'use client'
import React, { useState } from 'react';
import style from './taskBlock.module.scss'
import { Task } from '@/app/types';
import { IoMdAdd } from "react-icons/io";



type PropsType = {
    tasks: Array<Task>
    setModalWindow: any
    setCreateModalWindow: any
}

export default function TaskBlock(props:PropsType) {

    return ( 
        <div className={style.wrapper}>
            <div className={style.add_task_button}>
            <div className={style.add_task_block} onClick={()=>props.setCreateModalWindow(true)}><IoMdAdd className={style.add_plus}/></div>
            </div>
            {
                props.tasks.map((task: Task) => (
                    <div className={style.task_block} key={task.id} onClick={()=>props.setModalWindow(task.id)}>
                        <p className={style.task_number}>{task.name}</p>
                        <p className={style.task_description}>{task.description}</p>
                    </div>
                ))
            }
        </div>
    );
}