import { React, useState, useEffect } from 'react'
import { ImPriceTags } from 'react-icons/im'
import { BiReceipt } from 'react-icons/bi'
import { FaPlus, FaMinus } from 'react-icons/fa'
import sabad from '../../assets/img/wSabad.png'
import singlenoon from '../../assets/img/singlenoon.png'
import main from '../../assets/img/main.png'
import sonati from '../../assets/img/sonati.jpg'
import sabad1 from '../../assets/img/sabad.png'
import iconBread from '../../assets/img/iconBread.png'
import CartIcon from '../../component/CartIcon'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import Recepie from '../../component/recepieModal/Recepie'
import { Carousel } from 'react-carousel-minimal'
import Breadcrump from '../../component/BreadCrump/BreadCrump'
import { Cookies, useCookies } from 'react-cookie'
import ImageGallery from 'react-image-gallery'
import { Helmet } from 'react-helmet'
import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'
const SingleProduct = () => {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const { pathname } = useLocation()
  const productId = pathname.split('/')[3]
  const [product, setProduct] = useState('')

  const {
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
    RecepieModal,
    RecepieClose,
    RecepieShow,
  } = useProjectContext()

  const images = [
    {
      original: product && product.product['image'],
      originalHeight: 500,
      thumbnail: product && product.product['image'],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[0],
      originalHeight: 500,
      thumbnail: product && product.gallery[0],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[1],
      originalHeight: 500,
      thumbnail: product && product.gallery[1],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[2],
      originalHeight: 500,
      thumbnail: product && product.gallery[2],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[3],
      originalHeight: 500,
      thumbnail: product && product.gallery[3],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[4],
      originalHeight: 500,
      thumbnail: product && product.gallery[4],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[5],
      originalHeight: 500,
      thumbnail: product && product.gallery[5],
      thumbnailHeight: 100,
    },
    {
      original: product && product.gallery[6],
      originalHeight: 500,
      thumbnail: product && product.gallery[6],
      thumbnailHeight: 100,
    },
  ]

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const getSingleProduct = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Products/API/_singleProducts?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            productId: productId,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setProduct(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [pathname])

  if (!product) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div className='container mx-auto ' style={{ marginTop: '170px' }}>
          <CartIcon />
          <Breadcrump
            catName={product && product.product['categoryName']}
            catId={product && product.product['categoryId']}
            proName={product && product.product['name']}
            proId={product && product.product['id']}
          />
          <div className='row'>
            <div className='col-lg-7 mt-5 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12  order-2'>
              <div
                className='d-flex mt-3 ml-2'
                style={{ justifyContent: 'end' }}
              >
                <span
                  className='mx-2'
                  style={{
                    cursor: 'pointer',
                    fontSize: '15px',
                    marginTop: '3px',
                  }}
                >
                  {product && product.product['unit']}
                </span>
                <span
                  className='mx-2'
                  style={{ cursor: 'pointer', fontSize: '23px' }}
                >
                  -
                </span>
                <h5
                  className='ml-2'
                  style={{ cursor: 'pointer', fontSize: '25px' }}
                >
                  {product && product.product['name']}
                </h5>
              </div>
              <div className='d-flex mt-3' style={{ justifyContent: 'right' }}>
                <div className='d-flex'>
                  <span style={{ fontSize: '16px', marginRight: '5px' }}>
                    تومان
                  </span>
                  <span style={{ fontSize: '18px' }}>
                    {' '}
                    {product && nummber(product.product['price'])}{' '}
                  </span>
                </div>
                <ImPriceTags
                  style={{
                    marginTop: '7px',
                    marginLeft: '5px',
                    color: '#FF8333',
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    marginTop: '25px',
                    textAlign: 'justify',
                    direction: 'rtl',
                    lineHeight: '30px',
                  }}
                >
                  {product && product.product['detail']}
                </p>
              </div>
              <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-6 col-12 single-btn-style '>
                  <button
                    className='single-btn-yellow d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['energy']} kcal</span>
                    <span>انرژی</span>
                  </button>
                  <button
                    className='single-btn-org d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['sugar']} g</span>
                    <span>قند</span>
                  </button>
                  <button
                    className='single-btn-yellow d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['fat']} g</span>
                    <span>چربی</span>
                  </button>
                  <button
                    className='single-btn-org d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['salt']} g</span>
                    <span>نمک</span>
                  </button>
                  <button
                    className='single-btn-yellow d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['trans']} g</span>
                    <span>اسید چرب ترانس</span>
                  </button>
                  <button
                    className='single-btn-org d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['trans']} g</span>
                    <span>پروتین</span>
                  </button>
                  <button
                    className='single-btn-yellow d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['fiber']} g</span>
                    <span>فیبر</span>
                  </button>
                  <button
                    className='single-btn-org d-flex mt-2'
                    style={{ justifyContent: 'space-between', width: '280px' }}
                  >
                    <span>{product && product.product['carbohydrate']} g</span>
                    <span>کربوهیدرات</span>
                  </button>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6 col-12 single-btn-style1 '>
                  <button
                    onClick={RecepieShow}
                    className='single-btn-org d-flex mt-2'
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span>طرز تهیه</span>
                    <BiReceipt size={20} style={{ marginLeft: '7px' }} />
                  </button>
                  {RecepieModal ? (
                    <Recepie pro={product && product.product} />
                  ) : null}
                  {product && (
                    <div>
                      {!cart.hasOwnProperty(product.product['id']) ? (
                        <button
                          onClick={() => {
                            addToCart(product.product)
                          }}
                          className='single-btn-sabad mt-3'
                        >
                          خرید
                        </button>
                      ) : (
                        <div className='d-flex mt-3 amountBtn'>
                          <div
                            onClick={() => {
                              removeFromCart(product.product)
                            }}
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
                            {product && cart[product.product['id']]['amount']}
                          </span>
                          <div
                            onClick={() => addToCart(product.product)}
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
                  )}

                  <LinkContainer to='/cart'>
                    <button
                      className='single-btn-sabad d-flex mt-3'
                      style={{ justifyContent: 'space-between' }}
                    >
                      <span>سبد خرید</span>
                      <img src={sabad} style={{ width: '25%' }} />
                    </button>
                  </LinkContainer>
                </div>
              </div>
            </div>

            <div
              className='col-lg-5 mt-5 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1'
              style={{ textAlign: 'center' }}
            >
              <ImageGallery
                showPlayButton={false}
                autoPlay={false}
                showNav={false}
                items={images}
              />
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default SingleProduct
