import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import certificate from '../../assets/Img/certificate.jpg'
export default function Carousel() {
  const slickDefaults = {
    slidesToShow: 6,
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
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bolder',
            width: '90%',
            justifyContent: 'center',
          }}
        >
          <p>مجوز عمران</p>
          <img
            src={certificate}
            alt='certificate'
            style={{ width: '70%', margin: 'auto' }}
          />
        </div>
      </div>
    </Slider>
  )
}
