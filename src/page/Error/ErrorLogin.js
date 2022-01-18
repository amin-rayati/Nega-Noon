import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'

const ErrorLogin = () => {
  const { loginModalShow } = useProjectContext()
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
            padding: '50px',
            boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
            cursor: 'pointer',
          }}
          className='col-lg-6 col-md-12 col-sm-12  col-10 mx-5'
        >
          <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
            برای دسترسی به این صفحه ابتدا باید وارد سایت شوید
          </p>
          <LinkContainer style={{ color: '#white' }} to='/'>
            <button
              onClick={() => {
                loginModalShow()
              }}
              className='fill-btn'
              style={{ color: 'white' }}
            >
              ورود وثبت نام
            </button>
          </LinkContainer>
        </div>
      </div>
    </div>
  )
}

export default ErrorLogin
