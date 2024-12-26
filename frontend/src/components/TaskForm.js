import React, {useState, useEffect} from 'react'
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material'

const TaskForm = ({open, handleClose, handleSubmit, existingTask}) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
  })

  useEffect(() => {
    if (existingTask) {
      setTask(existingTask)
    } else {
      setTask({
        name: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Low',
      })
    }
  }, [existingTask])

  const handleChange = e => {
    const {name, value} = e.target
    setTask(prev => ({...prev, [name]: value}))
  }

  const onSubmit = () => {
    handleSubmit(task)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{existingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Task Name'
            name='name'
            value={task.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label='Description'
            name='description'
            value={task.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label='Due Date'
            name='dueDate'
            type='date'
            value={task.dueDate}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{shrink: true}}
          />
          <TextField
            label='Status'
            name='status'
            value={task.status}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='In Progress'>In Progress</MenuItem>
            <MenuItem value='Completed'>Completed</MenuItem>
          </TextField>
          <TextField
            label='Priority'
            name='priority'
            value={task.priority}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value='Low'>Low</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='High'>High</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          {existingTask ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskForm
