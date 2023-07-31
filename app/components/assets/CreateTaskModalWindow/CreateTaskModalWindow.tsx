'use client'
import React from 'react';
import style from './createTaskModalWindow.module.scss'
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/api/data/requests';

type PropsType = {
    closeWindow: any
}

export default function CreateTaskModalWindow(props: PropsType) {

    let [firstBlockCompleted, setFirstBlockCompleted] = React.useState(false);

    const taskNameTextareaRef = React.useRef(null);
    const taskDescriptionTextareaRef = React.useRef(null);
    
    const router = useRouter();

    const closeWindowHandler = (event: any) => {
        event.preventDefault();
        if (event.target === event.currentTarget)
            props.closeWindow();
    }

    const createTaskFunc = async () => {
        if(taskNameTextareaRef.current && taskDescriptionTextareaRef.current)
            await createTask(taskNameTextareaRef.current["value"], taskDescriptionTextareaRef.current["value"])
        props.closeWindow();
        router.refresh();
    }

    return (
        <div className={style.wrapper} onClick={closeWindowHandler}>
            <div className={style.content_wrapper}>
                <div className={style.task_name_block} style={{marginLeft: firstBlockCompleted?"-150%":"0%"}}>
                    <h1>Введите название задачи</h1>
                    <textarea ref={taskNameTextareaRef} defaultValue={""}/>
                    <button onClick={()=>setFirstBlockCompleted(true)}>Далее</button>
                </div>
                <div className={style.task_description_block} style={{marginLeft: firstBlockCompleted?"0%":"110%", opacity: firstBlockCompleted?"100%":"0%"}}>
                    <h1>Введите описание задачи</h1>
                    <textarea ref={taskDescriptionTextareaRef} placeholder='Поле может оставаться пустым'></textarea>
                    <button onClick={()=>createTaskFunc()}>Создать</button>
                </div>
            </div>
        </div>
    );
}