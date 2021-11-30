import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
const Breadcrump = ({ catName, catId, proName, proId }) => {
  return (
    <Breadcrumb
      className='bread'
      style={{ direction: 'rtl', cursor: 'pointer' }}
    >
      <LinkContainer to={`/products/${catId}`}>
        <p className='text-dark mx-2'>{catName}</p>
      </LinkContainer>
      <IoIosArrowBack className='mt-1 h5' />
      <LinkContainer to={`/products/${catId}/${proId}`}>
        <p className='text-dark mx-2'>{proName}</p>
      </LinkContainer>
      <IoIosArrowBack className='mt-1 h5' />
    </Breadcrumb>
  )
}

export default Breadcrump
