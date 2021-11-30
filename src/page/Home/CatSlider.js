import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { LinkContainer } from 'react-router-bootstrap'
import { Cookies, useCookies } from 'react-cookie'
import { useProjectContext } from '../../context/ProjectProvider'

export default function Carousel() {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])

  const { cityIdChange, setCityIdChange } = useProjectContext()

  const [categories, setCategories] = useState([])
  const evenNummber = (num) => {
    let answer = num % 2
    if (answer == '0') return true
  }
  const getAllCategories = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/ProductGroups/API/_Categories?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            cityId: cookiesCityid['cityid'],
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setCategories(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const slickDefaults = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: categories.length - 1,
    slidesToScroll: categories.length - 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: categories.length - 1,
          slidesToScroll: categories.length - 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: categories.length - 1,
          slidesToScroll: categories.length - 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: categories.length - 2,
          slidesToScroll: categories.length - 2,
        },
      },
    ],
  }
  useEffect(() => {
    getAllCategories()
  }, [cityIdChange])

  return (
    <Slider
      {...slickDefaults}
      className=' col-lg-8 col-md-10 col-sm-10 col-12 cat-show  dark-box'
      style={{
        backgroundColor: '#2A2A2A',
        borderRadius: '20px',
        margin: 'auto',
        justifyContent: 'space-around',
        height: '130px',
      }}
    >
      {categories.length > 1 ? (
        categories.map((e, index) => {
          return (
            <>
              <LinkContainer to={`/products/${e.id}`}>
                <div
                  className={
                    evenNummber(index) ? 'circle-cat-yellow' : 'circle-cat-org'
                  }
                >
                  <h4
                    className={
                      evenNummber(index) ? 'cat-font-yellow' : 'cat-font-org'
                    }
                    style={
                      evenNummber(index)
                        ? {
                            textAlign: 'center',
                            marginTop: '21px',
                            color: 'white',
                          }
                        : {
                            textAlign: 'center',
                            marginTop: '65px',
                            color: 'white',
                          }
                    }
                  >
                    {e.name}
                  </h4>
                </div>
              </LinkContainer>
            </>
          )
        })
      ) : (
        <span className='cat-span'>برای شهر شما دسته بندی وجود ندارد</span>
      )}
    </Slider>
  )
}
