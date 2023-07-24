'use client'
import React from 'react';
import style from './taskModalWindow.module.scss'
import { Task } from '@/app/types';

type PropsType = {
    task: Task|null
    setModalWindow: any
}

export default function TaskModalWindow(props: PropsType) {

    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.setModalWindow();
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper} >
                <h1 className={style.task_header}>{props.task?.name}</h1>
                <p className={style.task_description}>{props.task?.description}</p>
            </div>
        </div>
    );
}