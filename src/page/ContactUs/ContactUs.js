import { React, useState } from 'react'
import { ImLocation } from 'react-icons/im'
import { FaEnvelope } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import Swal from 'sweetalert2'
import validator from 'validator'
import Loader from '../../component/Loading/LoginLoading'
import axios from 'axios'
const ContactUs = () => {
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

  const [file, setFile] = useState('')
  const [fileReq, setFileReq] = useState(false)

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
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
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
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('text', text)
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
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>تماس با ما</h1>
        <div
          style={{
            backgroundColor: '#161f3c',
            padding: '15px 30px 30px 30px',
            borderRadius: '15px',
            margin: 'auto',
          }}
          className='row col-10 mt-3'
        >
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              کرج خیابان شهید بهشتی دهقان ویلای دوم
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <ImLocation size={20} style={{ color: 'white' }} />
            </div>
          </div>
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              aminrayati469gmail.com
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <FaEnvelope size={20} style={{ color: 'white' }} />
            </div>
          </div>
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              09362625488
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <AiFillPhone size={20} style={{ color: 'white' }} />
            </div>
          </div>
        </div>

        <div>
          <div
            className='row my-5'
            style={{ width: '100%', justifyContent: 'end' }}
          >
            <div
              className='col-lg-4 col-md-12 col-sm-12 col-12'
              style={{ direction: 'rtl' }}
            >
              <div>
                <label
                  for='email'
                  className='mt-3'
                  style={{ direction: 'rtl', width: '35%' }}
                >
                  ایمیل :
                </label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  required
                  className='col-9 mt-3 mx-1'
                  id='email'
                  type='text'
                  placeHolder='everest@gmail.com'
                  style={
                    !emailReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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
              className='col-lg-4 col-md-12 col-sm-12 col-12'
              style={{ direction: 'rtl' }}
            >
              <div>
                <label
                  for='phone'
                  className='mt-3'
                  style={{ direction: 'rtl', width: '35%' }}
                >
                  شماره تماس :
                </label>
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  required
                  className='col-9 mt-3 mx-1'
                  id='phone'
                  type='text'
                  placeHolder='09362625488'
                  style={
                    !phoneReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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
            </div>{' '}
            <div
              className='col-lg-4 col-md-12 col-sm-12 col-12'
              style={{ direction: 'rtl' }}
            >
              <div>
                <label
                  for='name '
                  className='mt-3'
                  style={{ direction: 'ltr', width: '35%' }}
                >
                  {' '}
                  : نام و نام خانوادگی
                </label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  required
                  className='col-9 mt-3 mx-1'
                  id='name'
                  type='text'
                  placeHolder='نام و نام خانوادگی'
                  style={
                    !nameReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',
                          width: '65%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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
              className='col-lg-10 col-md-12 col-sm-12 col-12'
              style={{ direction: 'rtl' }}
            >
              <p className='mt-3'>متن پیام :</p>
              <div>
                <textarea
                  onChange={handleTextChange}
                  value={text}
                  required
                  className='col-9 mt-3 mx-1'
                  id='name'
                  type='text'
                  placeHolder='پیام خود را بنویسید'
                  style={
                    !textReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '200px',
                          width: '80%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '200px',
                          width: '80%',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                  }
                ></textarea>
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
            <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
              <p className='mt-3' style={{ direction: 'rtl' }}>
                فایل ضمیمه :
              </p>

              <input
                onChange={handleFileChange}
                required
                className='col-9 mt-3 mx-1'
                id='file'
                type='file'
                placeHolder='پیام خود را بنویسید'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  width: '80%',
                  outline: 'none',
                  background: 'white',
                  padding: '10px',
                  boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                }}
              />
              <div className='d-flex mt-3' style={{ justifyContent: 'end' }}>
                <p className='mx-4'>PDF,WORD,EXCEL,PPT,ZIP,MP3,MP4,JPEG,JPG</p>
                <p style={{ direction: 'rtl' }}>فایل های مجاز :</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={submit}
            variant=' my-3 mr-3 '
            className='login-btn px-5 hover-item py-3'
          >
            {Loading ? <Loader /> : 'ارسال  پیام'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
