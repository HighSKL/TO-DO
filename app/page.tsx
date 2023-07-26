import Header from './components/header/Header'
import TasksPage from './components/tasksPage/TasksPage'
import styles from './page.module.css'
import backgroundImage from './images/background.jpg'
import Image from 'next/image'

async function getTasks(){
  let res = await fetch(`http://localhost:3000/api/tasks`, { cache: 'no-store' })
  let data = await res.json()
  return data
}

export default async function Home() {

  let tasks = await getTasks()

  return (
    <div>
      {/* <Image src={backgroundImage} alt='' style={{width:"100%",height:"100vh", position:"fixed", top:0, left:0, zIndex: -1, filter:"blur(1px)"}}/> */}
      <TasksPage tasks={tasks} />
    </div>
  )
}