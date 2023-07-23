'use client'
import React from 'react';
import style from './search.module.scss'
import { CiSearch } from "react-icons/ci";



export default function Search(){
    return (
        <div className={style.wrapper}>
            <CiSearch className={style.icon} />
            <textarea className={style.textarea} maxLength={30} placeholder={"Начните вводить описание задачи"}/>
        </div>
    );
};

