import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
const Breadcrump = ({ page, page2 }) => {
  return (
    <Breadcrumb
      className='bread'
      style={{ direction: 'rtl', cursor: 'pointer' }}
    >
      <LinkContainer to={`/dashboard`}>
        <p className='text-dark mx-2'>داشبورد</p>
      </LinkContainer>
      <IoIosArrowBack className='mt-1 h5' />
      <LinkContainer to={`/orders`}>
        <p className='text-dark mx-2'>{page}</p>
      </LinkContainer>

      <IoIosArrowBack className='mt-1 h5' />
    </Breadcrumb>
  )
}

export default Breadcrump
