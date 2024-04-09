import React from 'react'
import List from './List'
import { useDispatch, useSelector } from 'react-redux'

const TaskList = () => {
    const {taskstore} = useSelector((state)=>state)
    console.log(taskstore)
    // if there is no tasks in taskstore, then show "No tasks"
    // List component is used to represent a particular task
    // taskstore.tasks.map is used to map every task with List component
  return (
    <div className="w-2/5">
      {
        taskstore.tasks.length === 0 && 
        <div className="text-center">
          You have no tasks
        </div>
      }
      {
        taskstore.tasks.map((task)=> <List task={task}/>)
      }
    </div>
  )
}

export default TaskList