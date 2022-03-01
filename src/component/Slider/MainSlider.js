import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner from '../../assets/Img/banner.PNG'
export default function Carousel() {
  const slickDefaults = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          infinite: false,
          speed: 500,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: false,
          speed: 500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: false,
          speed: 500,
        },
      },
    ],
  }

  return (
    <Slider {...slickDefaults}>
      <div>
        <div
          style={{ height: '510px !important' }}
          className=' mx-auto Adslider'
        >
          <div className=''>
            <img src={banner} alt='tarh' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div>
        <div
          style={{ height: '510px !important' }}
          className=' mx-auto Adslider'
        >
          <div className=''>
            <img src={banner} alt='tarh' style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </Slider>
  )
}
