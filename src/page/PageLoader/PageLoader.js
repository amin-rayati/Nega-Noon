import React from 'react'
import { Spinner } from 'react-bootstrap'

const PageLoader = () => {
  return (
    <div className='text-center ' style={{ marginTop: '220px' }}>
      <Spinner
        animation='border'
        role='status'
        style={{ marginLeft: '10px', marginRight: '10px' }}
      >
        <span className='visually-hidden'></span>
      </Spinner>
    </div>
  )
}

export default PageLoader
