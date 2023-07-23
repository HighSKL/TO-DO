import Header from './components/header/Header'
import TasksPage from './components/tasksPage/TasksPage'
import styles from './page.module.css'

async function getTasks(){
  let res = await fetch(`http://localhost:3000/api/tasks`, { next: { revalidate: 5 } })
  let data = await res.json()
  return data
}

export default async function Home() {

  let tasks = await getTasks()

  return (
    <div>
      <TasksPage tasks={tasks} />
    </div>
  )
}