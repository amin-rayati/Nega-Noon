import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ax1 from '../../assets/Img/ax1.jpg'
import ax2 from '../../assets/Img/ax2.jpg'
import ax3 from '../../assets/Img/ax3.jpg'
import ax4 from '../../assets/Img/ax4.jpg'
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
          <img
            src={ax1}
            alt='ax1'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <img
            src={ax2}
            alt='ax2'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <img
            src={ax3}
            alt='ax3'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <img
            src={ax4}
            alt='ax4'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <img
            src={ax1}
            alt='ax1'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '90%', margin: 'auto' }}>
          <img
            src={ax1}
            alt='ax1'
            style={{
              width: '100%',
              borderRadius: '20px 20px 0px 0px',
              height: '250px',
            }}
          />
          <div
            style={{
              backgroundColor: '#fff',
              textAlign: 'end',
              padding: '10px',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>دوره ها IT</p>
            <p
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
            <div style={{ textAlign: 'left' }}>
              <button
                style={{
                  borderRadius: '10px',
                  padding: '10px 15px ',
                  backgroundColor: '#f1a314',
                  border: 'none',
                }}
              >
                بیشتر
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  )
}
