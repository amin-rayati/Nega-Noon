import { React, useState } from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import certificate from '../../assets/Img/certificate.jpg'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'
import Swal from 'sweetalert2'
import validator from 'validator'
import Loader from '../../component/Loading/LoginLoading'
import axios from 'axios'
const AskDore = () => {
  const [Loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [nameReq, setNameReq] = useState(false)

  const [phone, setPhone] = useState('')
  const [phoneReq, setPhoneReq] = useState(false)
  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      setPhoneReq(false)
      return true
    } else {
      return false
    }
  }

  const [email, setEmail] = useState('')
  const [emailReq, setEmailReq] = useState(false)
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailReq(false)
      return true
    } else {
      return false
    }
  }

  const [text, setText] = useState('')
  const [textReq, setTextReq] = useState(false)

  const [dore, setDore] = useState('')
  const [doreReq, setDoreReq] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 2) {
      setNameReq(false)
    }
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleTextChange = (e) => {
    setText(e.target.value)
    if (e.target.value.length > 4) {
      setTextReq(false)
    }
  }
  const handleDoreChange = (e) => {
    setDore(e.target.value)
    if (e.target.value.length > 4) {
      setDoreReq(false)
    }
  }

  const submit = () => {
    if (name.length < 3) {
      setNameReq(true)
      return
    }
    if (!validateMobilephone(phone)) {
      setPhoneReq(true)
      return
    }
    if (!validateEmail(email)) {
      setEmailReq(true)
      return
    }
    if (text.length < 5) {
      setTextReq(true)
      return
    }
    if (dore.length < 5) {
      setDoreReq(true)
      return
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('text', text)
    formData.append('dore', dore)
    try {
      const response = axios({
        method: 'post',
        url: 'https://meyt.neganoon.ir/admin/Customers/API/_startLoginRegister?token=test',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='my-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>دوره ها</h1>
        <div
          style={{
            backgroundColor: '#161f3c',
            padding: '15px 30px 30px 30px',
            borderRadius: '15px',
            margin: 'auto',
          }}
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-3'
        >
          <p
            style={{
              color: 'white',
              fontWeight: 'bolder',
              fontSize: '20px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            درخواست دوره
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mx-auto my-5'
          style={{ justifyContent: 'center' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
            }}
          >
            <div
              className='row my-2'
              style={{ width: '100%', justifyContent: 'end' }}
            >
              <div
                className='col-lg-4 col-md-12 col-sm-12 col-12 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='mt-3'
                    style={{ direction: 'rtl' }}
                  >
                    ایمیل :
                  </label>
                  <input
                    onChange={handleEmailChange}
                    value={email}
                    required
                    className='col-7 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='everest@gmail.com'
                    style={
                      !emailReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {emailReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا ایمیل خود را وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-4 col-md-12 col-sm-12 col-12 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='phone'
                    className='mt-3'
                    style={{ direction: 'rtl' }}
                  >
                    شماره تماس :
                  </label>
                  <input
                    onChange={handlePhoneChange}
                    value={phone}
                    required
                    className='col-7 mt-3 mx-1'
                    id='phone'
                    type='text'
                    placeHolder='09362625488'
                    style={
                      !phoneReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {phoneReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا شماره خود را وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-4 col-md-12 col-sm-12 col-12 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='name '
                    className='mt-3'
                    style={{ direction: 'ltr' }}
                  >
                    {' '}
                    : نام و نام خانوادگی
                  </label>
                  <input
                    onChange={handleNameChange}
                    value={name}
                    required
                    className='col-7 mt-3 mx-1'
                    id='name'
                    type='text'
                    placeHolder='نام و نام خانوادگی'
                    style={
                      !nameReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {nameReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا نام خود را کامل وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-4 col-md-12 col-sm-12 col-12 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='name '
                    className='mt-3'
                    style={{ direction: 'rtl' }}
                  >
                    سمت شما :
                  </label>
                  <input
                    onChange={handleTextChange}
                    value={text}
                    required
                    className='col-7 mt-3 mx-1'
                    id='name'
                    type='text'
                    placeHolder='نام سازمان'
                    style={
                      !textReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {textReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا متن خود را کامل وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-10 col-md-12 col-sm-12 col-12 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='name '
                    className='mt-3'
                    style={{ direction: 'rtl' }}
                  >
                    نام دوره مورد نیاز :
                  </label>
                  <input
                    onChange={handleDoreChange}
                    value={dore}
                    required
                    className='col-7 mt-3 mx-1'
                    id='name'
                    type='text'
                    placeHolder='نام دوره'
                    style={
                      !doreReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {doreReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا نام دوره خود را کامل وارد کنید
                  </h5>
                ) : null}
              </div>
            </div>
            <div className='my-5' style={{ textAlign: 'center' }}>
              <button
                onClick={submit}
                variant=' my-3 mr-3 '
                className='login-btn px-5 hover-item py-3'
              >
                {Loading ? <Loader /> : 'ثبت درخواست'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskDore
