import { React, useState, useEffect } from 'react'
import Bread from '../../assets/img/bread.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loading from '../../component/Loading/LoginLoading'
import PageLoader from '../PageLoader/PageLoader'
import { Helmet } from 'react-helmet'
import Fade from '@mui/material/Fade'
const Support = () => {
  const [data, setData] = useState()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [isLoad, setIsLoaded] = useState(false)

  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      return input
    } else {
      Swal.fire({
        type: 'error',
        text: 'لطفا شماره تماس را درست وارد کنید',
        confirmButtonText: 'فهمیدم',
      })
      return false
    }
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const getAllData = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/AboutUs/API/_neganoonInfo?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setData(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sendTicket = () => {
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return
    setIsLoaded(true)
    axios
      .post(
        'https://meyt.neganoon.ir/admin/Tickets/API/_addTicket?token=test',
        {
          name: name,
          mobile: phone,
          message: text,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          Swal.fire({
            type: 'success',
            text: 'پیام شما با موفقیت ثبت شد',
            confirmButtonText: 'فهمیدم',
          })
        }
        setIsLoaded(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getAllData()
  }, [])
  if (!data) {
    return <Loading />
  } else {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div className='container mx-auto ' style={{ marginTop: '170px' }}>
          <Helmet>
            <meta charSet='utf-8' />
            <title>پشتیبانی نگانون </title>
          </Helmet>
          <div className='row'>
            <div className='mt-5 col-lg-8 col-md-12 col-sm-12 col-12'>
              <div
                style={{
                  background: '#ff8334',
                  borderRadius: '15px ',
                  padding: '15px 25px 15px 25px',
                }}
              >
                <h2 style={{ color: 'white', textAlign: 'end' }}>
                  با ما در تماس باشید
                </h2>
                <div className='row mt-3'>
                  <div className='col-lg-6 mt-3 col-md-12 col-sm-12 col-12'>
                    <input
                      value={name}
                      onChange={handleNameChange}
                      required
                      className=' select'
                      type='text'
                      title='Ten digits code'
                      placeholder='نام شما'
                      style={{
                        borderRadius: '0.45rem',
                        border: 'none',
                        height: '40px',
                        width: '100%',
                        outline: 'none',
                        background: 'white',
                        textAlign: 'right',
                        padding: '15px',
                      }}
                    />
                  </div>
                  <div className='col-lg-6 mt-3 col-md-12 col-sm-12 col-12'>
                    <input
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className=' select'
                      type='text'
                      title='Ten digits code'
                      placeholder='شماره تلفن'
                      style={{
                        borderRadius: '0.45rem',
                        height: '40px',
                        width: '100%',
                        outline: 'none',
                        background: 'white',
                        textAlign: 'right',
                        padding: '15px',
                        border: 'none',
                      }}
                    />
                  </div>
                  <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <textarea
                      value={text}
                      onChange={handleTextChange}
                      className='form-input my-3'
                      type='text'
                      name='name'
                      placeholder='متن پیغام'
                      style={{ height: '150px', border: 'none' }}
                    ></textarea>
                  </div>
                  <div>
                    <button className='btn-send' onClick={sendTicket}>
                      {isLoad ? <Loading /> : '    ارسال پیام'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='mt-5 col-lg-4 col-md-12 col-sm-12 col-12'
              style={{ textAlign: 'center' }}
            >
              <div className='mt-3' style={{ textAlign: '-webkit-right' }}>
                <h3>شماره تماس</h3>
                <div className='underLine'></div>
                <p style={{ fontSize: '20', fontWeight: '100' }}>
                  {data && data.telephone}
                </p>
              </div>
              <div className='mt-5' style={{ textAlign: '-webkit-right' }}>
                <h3>پشتیبانی آنلاین</h3>
                <div className='underLine'></div>
                <p style={{ fontSize: '20', fontWeight: '100' }}>
                  {' '}
                  {data && data.onlineSupport}
                </p>
              </div>
              <div className='mt-3' style={{ textAlign: '-webkit-right' }}>
                <h3>آدرس </h3>
                <div className='underLine'></div>
                <p style={{ fontSize: '20', fontWeight: '100' }}>
                  {data && data.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default Support
