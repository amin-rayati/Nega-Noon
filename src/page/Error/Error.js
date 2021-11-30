import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Error = () => {
  return (
    <div
      className='container mx-auto '
      style={{
        marginTop: '230px',
      }}
    >
      <div
        className='row'
        style={{ justifyContent: 'center', textAlign: 'center' }}
      >
        <div
          style={{
            border: '1px solid #cfc7c7',
            borderRadius: '15px',
            width: '50%',
            padding: '50px',
            boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
            cursor: 'pointer',
          }}
        >
          <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
            این صفحه وجود ندارد
          </p>
          <LinkContainer style={{ color: '#ffb135' }} to='/'>
            <p>بازگشت به صفحه اصلی</p>
          </LinkContainer>
        </div>
      </div>
    </div>
  )
}

export default Error
