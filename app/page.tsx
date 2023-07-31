import { getTasks } from './api/data/requests'
import TasksPage from './components/tasksPage/TasksPage'

export default async function Home() {
  
  let tasks = await getTasks()

  return (
    <div> 
      <TasksPage tasks={tasks} />
    </div>
  )
}