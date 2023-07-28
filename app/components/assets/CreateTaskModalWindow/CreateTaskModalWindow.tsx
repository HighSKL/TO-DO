'use client'
import React from 'react';
import style from './createTaskModalWindow.module.scss'
import { useRouter } from 'next/navigation';

type PropsType = {
    closeWindow: any
}

export default function CreateTaskModalWindow(props: PropsType) {

    let [firstBlockCompleted, setFirstBlockCompleted] = React.useState(false);

    const taskNameTextareaRef = React.useRef(null);
    const taskDescriptionTextareaRef = React.useRef(null);

    let route = useRouter()
    
    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.closeWindow();
    }

    const createTask = async () => {
        let request = await fetch('http://localhost:3000/api/tasks/create', {
            method:"POST",
            // @ts-ignore
            body: JSON.stringify({name: taskNameTextareaRef.current.value, description: taskDescriptionTextareaRef.current.value}),
        })
        props.closeWindow();
        route.refresh();
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper}>
                <div className={style.slider_line}></div>
                <div className={style.task_name_block} style={{marginLeft: firstBlockCompleted?"-150%":"0%"}}>
                    <h1>Введите название задачи</h1>
                    <textarea ref={taskNameTextareaRef}></textarea>
                    <button onClick={()=>{setFirstBlockCompleted(true)}}>Далее</button>
                </div>
                <div className={style.task_description_block} style={{marginLeft: firstBlockCompleted?"0%":"110%", opacity: firstBlockCompleted?"100%":"0%"}}>
                    <h1>Введите описание задачи</h1>
                    <textarea ref={taskDescriptionTextareaRef}></textarea>
                    <button onClick={()=>{createTask()}}>Создать</button>
                    <button onClick={()=>{()=>{setFirstBlockCompleted(false)}}} style={{float: "left", marginLeft:"7%"}}>Назад</button>

                </div>
            
            </div>
        </div>
    );
}