'use client'
import React from 'react';
import style from './createTaskModalWindow.module.scss'

type PropsType = {
    closeWindow: any
}

export default function CreateTaskModalWindow(props: PropsType) {

    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.closeWindow();
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper}>
            </div>
        </div>
    );
}