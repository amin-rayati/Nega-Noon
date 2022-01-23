import { React, useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import noon from '../../assets/img/noon.png'
import sonati from '../../assets/img/sonati.jpg'
import def from '../../assets/img/default.jpeg'
import { useProjectContext } from '../../context/ProjectProvider'
import { ImPriceTags } from 'react-icons/im'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Wish from '../products/Wish'
import { Cookies, useCookies } from 'react-cookie'

export default function Carousel2() {
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
  const {
    setUserData,
    cityIdChange,
    setCityIdChange,
    cart,
    setCart,
    removeFromCart,
    addToCart,
    updateCart,
    updateUi,
    setUpdateUi,
    totalCount,
    userData,
  } = useProjectContext()
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [data, setData] = useState('')
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getAllProducts = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Products/API/_popularProducts?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            cityId: cookiesCityid['cityid'],
            customerId: userData && userData['customerId'],
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
    getAllProducts()
  }, [userData])

  return (
    <Slider {...slickDefaults}>
      {data &&
        data.map((e) => {
          return (
            <div className='my-5 mx-5 favourite-box'>
              <Wish isWishList={e.isWishList} id={e.id} />
              <LinkContainer
                style={{
                  width: '70%',
                  margin: 'auto',
                  height: '150px',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                to={`/products/${e.categoryId}/${e.id}`}
              >
                <img src={e.image !== '' ? e.image : def} alt='noon' />
              </LinkContainer>

              <div
                className='d-flex mt-3 mx-2'
                style={{ justifyContent: 'center' }}
              >
                <h5 className='mx-2' style={{ cursor: 'pointer' }}>
                  {e.name}
                </h5>
              </div>
              <div className='d-flex mt-3' style={{ justifyContent: 'center' }}>
                <div className='d-flex'>
                  <span style={{ fontSize: '14px', marginRight: '5px' }}>
                    تومان
                  </span>
                  <span className='mx-2' style={{ fontSize: '15px' }}>
                    {nummber(e.price)}
                  </span>
                  <span style={{ fontSize: '15px' }}>به ازای هر {e.unit}</span>
                </div>
                <ImPriceTags
                  style={{
                    marginTop: '7px',
                    marginLeft: '5px',
                    color: '#FF8333',
                  }}
                />
              </div>
              <div className='mt-4' style={{ textAlign: 'center' }}>
                {!cart.hasOwnProperty(e.id) ? (
                  <button
                    onClick={() => addToCart(e)}
                    style={{
                      color: 'white',
                      background: '#33BB41',
                      padding: '10px 25px 10px 25px',
                      borderRadius: '20px',
                      border: ' none',
                      textAlign: 'l',
                    }}
                  >
                    خرید
                  </button>
                ) : (
                  <div
                    className='d-flex'
                    style={{ justifyContent: 'center', marginTop: '35px' }}
                  >
                    <div
                      onClick={() => removeFromCart(e)}
                      style={{
                        border: '2px solid gray',
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                      className='px-2'
                    >
                      <FaMinus style={{ color: 'gray' }} size={12} />
                    </div>
                    <span className='mx-2'>
                      {cart ? cart[e.id]['amount'] : null}
                    </span>
                    <div
                      onClick={() => {
                        addToCart(e)
                      }}
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
          )
        })}

      {/* <div className=' mt-5'>
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
      </div> */}
    </Slider>
  )
}
