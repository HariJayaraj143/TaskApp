import React from 'react'
import {Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material'

const StatusFilter = ({currentStatus, handleStatusChange}) => {
  return (
    <Box sx={{minWidth: 200}}>
      <FormControl fullWidth>
        <InputLabel id='status-filter-label'>Filter by Status</InputLabel>
        <Select
          labelId='status-filter-label'
          id='status-filter'
          value={currentStatus}
          onChange={e => handleStatusChange(e.target.value)}
          label='Filter by Status'
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default StatusFilter
