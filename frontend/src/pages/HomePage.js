import React, {useState, useEffect} from 'react'
import {Box, Button, Typography, Container} from '@mui/material'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import StatusFilter from '../components/StatusFilter'
import {fetchTasks, createTask, updateTask, deleteTask} from '../services/api'

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  // Fetch tasks from the backend
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const {data} = await fetchTasks()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    loadTasks()
  }, [])

  // Filter tasks when the filter changes or tasks are updated
  useEffect(() => {
    if (filter === 'All') {
      setFilteredTasks(tasks)
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter))
    }
  }, [tasks, filter])

  // Handle opening the form (for add or edit)
  const handleOpenForm = (task = null) => {
    setTaskToEdit(task)
    setIsFormOpen(true)
  }

  // Handle closing the form
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setTaskToEdit(null)
  }

  // Handle adding or updating tasks
  const handleFormSubmit = async task => {
    try {
      if (taskToEdit) {
        // Update task
        const {data} = await updateTask(taskToEdit._id, task)
        setTasks(prevTasks =>
          prevTasks.map(t => (t._id === data._id ? data : t)),
        )
      } else {
        // Create new task
        const {data} = await createTask(task)
        setTasks(prevTasks => [...prevTasks, data])
      }
      handleCloseForm()
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  // Handle task deletion
  const handleDeleteTask = async taskId => {
    try {
      await deleteTask(taskId)
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <Container maxWidth='md' sx={{mt: 4}}>
      <Typography variant='h4' gutterBottom>
        Task Tracker
      </Typography>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <StatusFilter currentStatus={filter} handleStatusChange={setFilter} />
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleOpenForm()}
        >
          Add Task
        </Button>
      </Box>
      <TaskList
        tasks={filteredTasks}
        onEdit={handleOpenForm}
        onDelete={handleDeleteTask}
      />
      <TaskForm
        open={isFormOpen}
        handleClose={handleCloseForm}
        handleSubmit={handleFormSubmit}
        existingTask={taskToEdit}
      />
    </Container>
  )
}

export default HomePage
