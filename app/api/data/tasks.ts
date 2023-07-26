import { Task } from "@/app/types"

export let tasks = [
    {id: 1, name: "Задание #1", description: "Описание задания #1"},
    {id: 2, name: "Задание #2", description: "Описание задания #2"},
    {id: 3, name: "Задание #3", description: "Описание задания #3"},
    {id: 4, name: "Задание #4", description: "Описание задания #4"},
    {id: 5, name: "Задание #5", description: "Описание задания #5"},
    {id: 6, name: "Задание #6", description: "Описание задания #6"}
]

export const setTasks = (newTasks: Array<Task>) => {tasks = [...newTasks]}