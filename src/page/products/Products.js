import { React, useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import bread from '../../assets/img/bread.png'
import { ImPriceTags } from 'react-icons/im'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import def from '../../assets/img/default.jpeg'
import iconBread from '../../assets/img/iconBread.png'
import { Cookies, useCookies } from 'react-cookie'
import { useProjectContext } from '../../context/ProjectProvider'
import Error from '../Error/Error'
import Loading from '../../component/Loading/Loading'
import { logDOM } from '@testing-library/dom'
import CartIcon from '../../component/CartIcon'
import axios from 'axios'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import Wish from './Wish'
import { Helmet } from 'react-helmet'
import Grow from '@mui/material/Grow'

const Products = () => {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

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

  const { pathname } = useLocation()
  const activeCat = pathname.split('/')[2]
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [showProduct, setShowProduct] = useState(false)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
  const getAllProducts = async () => {
    setShowProduct(false)
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/ProductGroups/API/_getProductByCategoryId?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            categoryId: activeCat,
            cityId: cookiesCityid['cityid'],
            customerId: userData && userData['customerId'],
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setShowProduct(true)

        setProducts(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories()
    getAllProducts()
  }, [activeCat, cityIdChange, userData])

  if (products.length < 0 && categories.length < 0) {
    setTimeout(() => {
      return <Loading />
    }, 2000)
  } else {
    return (
      <div className='container mx-auto ' style={{ marginTop: '170px' }}>
        <Helmet>
          <meta charSet='utf-8' />
          <title> نگانون </title>
        </Helmet>
        <>
          {categories.length > 0 ? <CartIcon /> : null}

          <div style={{ textAlign: 'end' }} className='catPosition'>
            {categories.length > 0 &&
              categories.map((e) => {
                return (
                  <LinkContainer to={`/products/${e.id}`}>
                    <button
                      className={
                        activeCat == e.id
                          ? 'choosen-cat-btn mx-2 mt-2'
                          : 'cat-btn mx-2 mt-2'
                      }
                    >
                      {e.name}
                    </button>
                  </LinkContainer>
                )
              })}
          </div>
          {products.length > 0 && categories.length > 0 ? (
            <>
              <div
                className='row  mx-2'
                style={{ justifyContent: 'center', marginTop: '60px' }}
              >
                {products &&
                  products.map((e, index) => {
                    return (
                      <Grow
                        in={showProduct}
                        timeout={index * (100 + index)}
                        style={{ transformOrigin: '0 0 0' }}
                      >
                        <div
                          className='col-lg-3 col-md-12 col-sm-12 col-12 product-box-width mt-2'
                          style={{
                            padding: '40px',
                            border: '1px solid #e1d2d2',
                            borderRadius: '15px',
                            margin: '1px',
                            textAlign: 'center',
                          }}
                        >
                          <Wish isWishList={e.isWishList} id={e.id} />
                          <LinkContainer
                            style={{
                              width: '70%',
                              margin: 'auto',
                              height: '150px',
                              objectFit: 'contain',
                              cursor: 'pointer',
                            }}
                            to={`/products/${activeCat}/${e.id}`}
                          >
                            <img
                              src={e.image !== '' ? e.image : def}
                              alt='noon'
                            />
                          </LinkContainer>

                          <div
                            className='d-flex mt-3 mx-2'
                            style={{ justifyContent: 'center' }}
                          >
                            <h5 className='mx-2' style={{ cursor: 'pointer' }}>
                              {e.name}
                            </h5>
                          </div>
                          <div
                            className='d-flex mt-3'
                            style={{ justifyContent: 'center' }}
                          >
                            <div className='d-flex'>
                              <span
                                style={{ fontSize: '14px', marginRight: '5px' }}
                              >
                                تومان
                              </span>
                              <span
                                className='mx-2'
                                style={{ fontSize: '15px' }}
                              >
                                {' '}
                                {nummber(e.price)}
                              </span>
                              <span style={{ fontSize: '15px' }}>
                                به ازای هر {e.unit}
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
                          <div className='mt-3' style={{ textAlign: 'center' }}>
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
                                style={{ justifyContent: 'center' }}
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
                                  <FaMinus
                                    style={{ color: 'gray' }}
                                    size={12}
                                  />
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
                      </Grow>
                    )
                  })}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </>
      </div>
    )
  }
}

export default Products
