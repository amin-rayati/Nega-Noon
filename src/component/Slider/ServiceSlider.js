import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import work1 from '../../assets/Img/work1.jpg'

export default function Carousel() {
  const slickDefaults = {
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: true,
    rtl: true,
    infinite: true,

    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true,
          rtl: true,
          infinite: true,

          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          rtl: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 2000,
        },
      },
    ],
  }
  return (
    <Slider
      {...slickDefaults}
      style={{ marginTop: '40px', marginBottom: '40px' }}
    >
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 0px',
              boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
              آموزش آفلاین
            </p>
            <img
              src={work1}
              alt='work1'
              style={{ width: '80%', borderRadius: '15px', margin: 'auto' }}
            />
            <p
              className='mt-3 mx-5'
              style={{
                lineHeight: '30px',
                textAlign: 'justify',
                direction: 'rtl',
              }}
            >
              در دوره های ای تی کالج اورست شما بهترین آموزش هارا میبینید و به
              بهترین توانایی در برنامه نویسی میرسید مه میتوانید پروژه های خیلی
              حرفه ای را انجام دهید
            </p>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 0px',
              boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
              آموزش آفلاین
            </p>
            <img
              src={work1}
              alt='work1'
              style={{ width: '80%', borderRadius: '15px', margin: 'auto' }}
            />
            <p
              className='mt-3 mx-5'
              style={{
                lineHeight: '30px',
                textAlign: 'justify',
                direction: 'rtl',
              }}
            >
              در دوره های ای تی کالج اورست شما بهترین آموزش هارا میبینید و به
              بهترین توانایی در برنامه نویسی میرسید مه میتوانید پروژه های خیلی
              حرفه ای را انجام دهید
            </p>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 0px',
              boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
              آموزش آفلاین
            </p>
            <img
              src={work1}
              alt='work1'
              style={{ width: '80%', borderRadius: '15px', margin: 'auto' }}
            />
            <p
              className='mt-3 mx-5'
              style={{
                lineHeight: '30px',
                textAlign: 'justify',
                direction: 'rtl',
              }}
            >
              در دوره های ای تی کالج اورست شما بهترین آموزش هارا میبینید و به
              بهترین توانایی در برنامه نویسی میرسید مه میتوانید پروژه های خیلی
              حرفه ای را انجام دهید
            </p>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 0px',
              boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
              آموزش آفلاین
            </p>
            <img
              src={work1}
              alt='work1'
              style={{ width: '80%', borderRadius: '15px', margin: 'auto' }}
            />
            <p
              className='mt-3 mx-5'
              style={{
                lineHeight: '30px',
                textAlign: 'justify',
                direction: 'rtl',
              }}
            >
              در دوره های ای تی کالج اورست شما بهترین آموزش هارا میبینید و به
              بهترین توانایی در برنامه نویسی میرسید مه میتوانید پروژه های خیلی
              حرفه ای را انجام دهید
            </p>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 0px',
              boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
              آموزش آفلاین
            </p>
            <img
              src={work1}
              alt='work1'
              style={{ width: '80%', borderRadius: '15px', margin: 'auto' }}
            />
            <p
              className='mt-3 mx-5'
              style={{
                lineHeight: '30px',
                textAlign: 'justify',
                direction: 'rtl',
              }}
            >
              در دوره های ای تی کالج اورست شما بهترین آموزش هارا میبینید و به
              بهترین توانایی در برنامه نویسی میرسید مه میتوانید پروژه های خیلی
              حرفه ای را انجام دهید
            </p>
          </div>
        </div>
      </div>
    </Slider>
  )
}
