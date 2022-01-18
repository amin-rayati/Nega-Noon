import React from 'react'
import { Spinner } from 'react-bootstrap'
import Fade from '@mui/material/Fade'

const Loading = () => {
  return (
    <Fade
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...(true ? { timeout: 3000 } : {})}
    >
      <div className='text-center' style={{ margin: '529px' }}>
        <div class='wrapper'>
          <div class='circle'></div>
          <div class='circle'></div>
          <div class='circle'></div>
          <div class='shadow'></div>
          <div class='shadow'></div>
          <div class='shadow'></div>
        </div>
      </div>
    </Fade>
  )
}

export default Loading
