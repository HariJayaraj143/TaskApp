import React, {useEffect, useState} from 'react'
import {fetchTasks} from '../services/api'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const {data} = await fetchTasks()
      setTasks(data)
    }
    getTasks()
  }, [])

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  )
}

export default TaskList
