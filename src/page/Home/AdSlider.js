import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { LinkContainer } from 'react-router-bootstrap'
import sabad from '../../assets/img/sabad.png'
import iconBread from '../../assets/img/iconBread.png'
import main from '../../assets/img/main.png'
import slogan from '../../assets/img/slogan.png'
export default function Carousel() {
  const [slides, setSlides] = useState([])

  const getAllSlides = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Sliders/API/_getSliders?token=test',
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
        setSlides(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllSlides()
  }, [])

  const slickDefaults = {
    rtl: false,
    autoplay: true,
    autoplaySpeed: 2000,
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
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...slickDefaults}>
      {slides &&
        slides.map((e) => {
          return (
            <>
              <div
                key={e.sliderId}
                // className='px-0'
                style={{ height: '510px !important', marginTop: '85px' }}
                className=' mx-auto Adslider'
              >
                <div className=''>
                  <img
                    src={e.sliderImage}
                    alt='tarh'
                    className='img-w '
                    style={{
                      height: ' 500px !important',
                    }}
                  />
                </div>

                <div
                  className='col-12  order-1 order-md-2 col-lg-6 m-auto header-title-md sliderText'
                  style={{
                    position: 'relative',
                    top: '-500px ',
                    left: '300px',
                  }}
                >
                  <h4
                    className='text text-center mb-3 mt-3 header-title-font'
                    style={{ fontWeight: 'bolder', fontSize: '40px' }}
                  >
                    {e.sliderTitle}
                  </h4>
                  <p
                    className='text text-center header-detail-font'
                    style={{ color: 'black', fontSize: '20px' }}
                  >
                    {e.sliderText}
                  </p>
                </div>
              </div>
            </>
          )
        })}
    </Slider>
  )
}
