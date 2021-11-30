import React from 'react'
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
              آدرس : کرج-بلوارشهید بهشتی-نبش دهقان ویلای دوم-ساختمان اتیه-طبقه
              ششم
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
              info@negaclub.ir : ایمیل
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
              026-34239231 - 026-تلفن :34239221
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
              021-9107132 - 021-تلفن های سراسری:91071231
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
              style={{ border: '1px solid white', marginLeft: '20px' }}
            >
              <FaInstagram
                onClick={instagram}
                className='instagram'
                style={{ color: 'white', marginTop: '7px' }}
                size={15}
              />
            </div>
            <div
              className='bg-circle1 bg-circle5  mb-3'
              style={{ border: '1px solid white', marginLeft: '20px' }}
            >
              <FaTelegram
                onClick={telegram}
                className='instagram'
                style={{ color: 'white', marginTop: '7px' }}
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
            <a
              href='https://negarine.com/'
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگارینه
            </a>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>{' '}
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <a
              href='https://site.negaclub.ir/'
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگاکلاب
            </a>

            <BsFillSquareFill
              className='mt-2'
              size={8}
              style={{ color: '#FFB135', marginLeft: '20px' }}
            />
          </div>{' '}
          <div
            className='footer-add d-flex flex-row mt-2'
            style={{ cursor: 'pointer' }}
          >
            <a
              href='https://negamarket.com/'
              className=''
              style={{ color: 'white', fontSize: '15px' }}
            >
              نگامارکت
            </a>

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
          style={{ textAlign: 'center' }}
        >
          <img
            src={logo}
            style={{ width: '50%' }}
            className=' mt-4'
            alt='logo'
          />
          <h6 className='mt-4'>نگانون</h6>
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
