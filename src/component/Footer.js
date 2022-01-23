import { React, useState, useEffect } from 'react'
import logo from '../assets/img/neganoon.png'

import { BsFillSquareFill } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { FaVoicemail, FaInstagram, FaTelegram } from 'react-icons/fa'
import { AiOutlinePhone } from 'react-icons/ai'
import { LinkContainer } from 'react-router-bootstrap'
const Footer = () => {
  const downloadAndroid = () => {
    const url = 'https://new.neganoon.ir/app/apk/v2/neganoon.apk'
    window.open(url, '_blank')
  }
  const instagram = () => {
    const url = 'https://www.instagram.com/neganoon/'
    window.open(url, '_blank')
  }
  const telegram = () => {
    const url = 'https://t.me/neganoon'
    window.open(url, '_blank')
  }

  const negarine = () => {
    const url = 'https://negarine.com/'
    window.open(url, '_blank')
  }
  const negaclub = () => {
    const url = 'https://site.negaclub.ir/'
    window.open(url, '_blank')
  }
  const negamarket = () => {
    const url = 'https://negamarket.com/'
    window.open(url, '_blank')
  }

  const [data, setData] = useState()

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

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <div style={{ marginTop: '150px' }}>
      <div className='row px-3 footer-style mx-0'>
        <div
          className='col-lg-3 order-lg-1 col-md-12  order-md-4 col-sm-12 order-sm-2 col-12 order-4 footer-box'
          style={{ textAlign: '-webkit-right' }}
        >
          <h6 className='mt-4'>ارتباط با ما</h6>
          <hr className='mt-2 w-75 ' />

          <div
            className='footer-add d-flex flex-row mt-4 mx-2'
            style={{ cursor: 'pointer' }}
          >
            <p className='m-0' style={{ color: 'white', fontSize: '13px' }}>
              آدرس : {data && data.address}
            </p>

            <GoLocation
              size={20}
              style={{ color: 'white', marginLeft: '20px' }}
            />
          </div>

          <div
            className='footer-add d-flex flex-row mt-4'
            style={{ cursor: 'pointer' }}
          >
            <p className='m-0' style={{ color: 'white', fontSize: '13px' }}>
              {data && data.onlineSupport} : ایمیل
            </p>

            <FaVoicemail
              size={20}
              style={{ color: 'white', marginLeft: '20px' }}
            />
          </div>

          <div
            className='footer-add d-flex flex-row mt-4'
            style={{ cursor: 'pointer' }}
          >
            <p className='m-0' style={{ color: 'white', fontSize: '13px' }}>
              تلفن : {data && data.telephone}
            </p>

            <AiOutlinePhone
              size={20}
              style={{ color: 'white', marginLeft: '20px' }}
            />
          </div>

          <div
            className='footer-add d-flex flex-row mt-4'
            style={{ cursor: 'pointer' }}
          >
            <p className='m-0' style={{ color: 'white', fontSize: '13px' }}>
              021-تلفن های سراسری :91071231
            </p>

            <AiOutlinePhone
              size={20}
              style={{ color: 'white', marginLeft: '20px' }}
            />
          </div>

          <div
            className=' d-flex flex-row mt-2  social-icons'
            style={{ justifyContent: 'flex-end' }}
          >
            {/* <p style={{ margin: 'inherit' }}>اینستاگرام</p> */}

            <div
              className='bg-circle1 bg-circle5  mb-3'
              style={{
                border: '1px solid white',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            >
              <FaInstagram
                onClick={instagram}
                className='instagram'
                style={{ color: 'white', marginTop: '7px', cursor: 'pointer' }}
                size={15}
              />
            </div>
            <div
              className='bg-circle1 bg-circle5  mb-3'
              style={{
                border: '1px solid white',
                marginLeft: '20px',
                cursor: 'pointer',
              }}
            >
              <FaTelegram
                onClick={telegram}
                className='instagram'
                style={{ color: 'white', marginTop: '7px', cursor: 'pointer' }}
                size={15}
              />
            </div>
          </div>
        </div>

        <div
          className='col-lg-3 order-lg-2 col-md-12 order-md-3 col-sm-12 order-sm-2 col-12 order-3 footer-box'
          style={{ textAlign: '-webkit-right' }}
        >
          <h6 className='mt-4'>لینک های مفید</h6>
          <hr className='mt-2 w-75' />
          <div
            className='footer-add d-flex flex-row mt-4'
            style={{ cursor: 'pointer' }}
          >
            <p
              onClick={negarine}
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگارینه
            </p>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <p
              onClick={negaclub}
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگاکلاب
            </p>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <p
              onClick={negamarket}
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگامارکت
            </p>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
        </div>

        <div
          className='col-lg-3 order-lg-3 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 footer-box'
          style={{ textAlign: '-webkit-right' }}
        >
          <h6 className='mt-4'>دسترسی سریع</h6>
          <hr className='mt-2 w-75' />
          <div
            className='footer-add d-flex flex-row mt-4'
            style={{ cursor: 'pointer' }}
          >
            <LinkContainer to='/products/1'>
              <p className='' style={{ color: 'white', fontSize: '15px' }}>
                محصولات
              </p>
            </LinkContainer>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <p
              onClick={downloadAndroid}
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              دانلود نرم افزار
            </p>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <p className='' style={{ color: 'white', fontSize: '15px' }}>
              سفارشات
            </p>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>
        </div>

        <div
          className='col-lg-3 order-lg-4 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 footer-box'
          style={{ textAlign: 'center', justifyContent: 'center' }}
        >
          <img
            src={logo}
            style={{ width: '50%' }}
            className=' mt-4'
            alt='logo'
          />
          <h6 className='mt-4'>نگانون</h6>
          <a
            className='enamad-style mx-auto '
            style={{ marginTop: '15px' }}
            referrerpolicy='origin'
            target='_blank'
            href='http://trustseal.enamad.ir/?id=181182&amp;Code=GTc0Xcwir0FjcNUG7vQD'
          >
            <img
              referrerpolicy='origin'
              src={
                'http://Trustseal.eNamad.ir/logo.aspx?id=181182&amp;Code=GTc0Xcwir0FjcNUG7vQD'
              }
              alt=''
              style={{ cursor: 'pointer' }}
              id='GTc0Xcwir0FjcNUG7vQD'
            />
          </a>
        </div>
      </div>

      <p
        className='text-center my-3'
        style={{ fontSize: '12px', fontWeight: 'bolder' }}
      >
        کلیه حقوق این پرتال نزد گروه شرکت های
        <a
          href='https://negarine.com/'
          className='mx-2'
          style={{ color: '#bf9b30', fontSize: '20px' }}
        >
          نگارینه
        </a>
        محفوظ میباشد
      </p>
    </div>
  )
}

export default Footer
