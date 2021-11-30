import { React, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import noon from '../../assets/img/noon.png'
import sonati from '../../assets/img/sonati.jpg'
import { ImPriceTags } from 'react-icons/im'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

export default function Carousel2() {
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const [amount, setAmount] = useState(1)
  const [addToCartBtn, setAddToCartBtn] = useState(false)

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1
      if (tempAmount > 15) {
        tempAmount = 15
      }
      return tempAmount
    })
  }
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
        setAddToCartBtn(false)
      }
      return tempAmount
    })
  }
  const slickDefaults = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  const addToCart = () => {
    setAddToCartBtn(true)
  }

  return (
    <Slider {...slickDefaults}>
      <div className=' mt-5'>
        <div
          style={{
            padding: '40px',
            border: '1px solid #e1d2d2',
            borderRadius: '15px',
            margin: '1px',
          }}
        >
          <LinkContainer
            to='/products/3'
            style={{
              width: '70%',
              margin: 'auto',
              height: '150px',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
          >
            <img src={noon} alt='noon' />
          </LinkContainer>

          <div className='d-flex mt-3' style={{ justifyContent: 'center' }}>
            <span style={{ cursor: 'pointer' }}>واحد عدد -</span>
            <h5 style={{ cursor: 'pointer' }}>نان بربری</h5>
          </div>
          <div className='d-flex mt-3' style={{ justifyContent: 'right' }}>
            <div className='d-flex'>
              <span style={{ fontSize: '16px', marginRight: '5px' }}>
                تومان
              </span>
              <span style={{ fontSize: '18px' }}> {nummber(4000)} </span>
            </div>
            <ImPriceTags
              style={{
                marginTop: '7px',
                marginLeft: '5px',
                color: '#FF8333',
              }}
            />
          </div>
          <div className='mt-3'>
            {!addToCartBtn ? (
              <button
                onClick={addToCart}
                style={{
                  color: 'white',
                  background: '#33BB41',
                  padding: '10px 25px 10px 25px',
                  borderRadius: '20px',
                  border: ' none',
                }}
              >
                خرید
              </button>
            ) : (
              <div className='d-flex'>
                <div
                  onClick={decrease}
                  style={{
                    border: '2px solid gray',
                    cursor: 'pointer',
                    borderRadius: '5px',
                  }}
                  className='px-2'
                >
                  <FaMinus style={{ color: 'gray' }} size={12} />
                </div>
                <span className='mx-3 '>{amount}</span>
                <div
                  onClick={increase}
                  style={{
                    background: '#ff8333',
                    cursor: 'pointer',
                    borderRadius: '5px',
                  }}
                  className='px-2 '
                >
                  <FaPlus
                    style={{ color: 'white', marginTop: '5px' }}
                    size={13}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Slider>
  )
}
