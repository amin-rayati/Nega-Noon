import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import noon from '../../assets/img/noon.png'
import { ImPriceTags } from 'react-icons/im'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import sabad1 from '../../assets/img/sabad.png'
import iconBread from '../../assets/img/iconBread.png'
import { Cookies, useCookies } from 'react-cookie'
import { useProjectContext } from '../../context/ProjectProvider'
import Error from '../Error/Error'
import Loading from '../../component/Loading/Loading'
import { logDOM } from '@testing-library/dom'
import CartIcon from '../../component/CartIcon'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { Helmet } from 'react-helmet'
import Fade from '@mui/material/Fade'
const Favourite = () => {
  const { pathname } = useLocation()
  const activeCat = pathname.split('/')[2]
  const [wishList, setWishList] = useState()
  const { cart, removeFromCart, addToCart, userData } = useProjectContext()
  const [ui, setUi] = useState(true)

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const getAllWishes = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/WishLists/API/_customerWishList?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },
          body: JSON.stringify({
            token: 'test',
            customerId: userData['customerId'],
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setWishList(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ChangeWish = async (id) => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/WishLists/API/_WishList?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            productId: id,
            customerId: userData && userData['customerId'],
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setUi(false)
        if (userData) {
          getAllWishes()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllWishes()
  }, [userData])

  if (!wishList || wishList.length == 0) {
    return (
      <div
        className='container mx-auto '
        style={{
          marginTop: '230px',
        }}
      >
        <div
          className='row'
          style={{ justifyContent: 'center', textAlign: 'center' }}
        >
          <div
            style={{
              border: '1px solid #cfc7c7',
              borderRadius: '15px',
              width: '50%',
              padding: '50px',
              boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
              cursor: 'pointer',
            }}
          >
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
              شما هیچ محصولی را در علاقه مندی های خود وارد نکردید
            </p>
            <LinkContainer style={{ color: '#ffb135' }} to='/products/1'>
              <p>اضافه کردن به علاقه مندی</p>
            </LinkContainer>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>نگانون </title>
        </Helmet>
        <div className='container mb-wish ' style={{ marginTop: '170px' }}>
          <CartIcon />
          <Breadcrump page={'علاقه مندی ها'} />
        </div>

        <div className='container m-auto mt-5'>
          <div
            className='row  mx-2'
            style={{ justifyContent: 'center', marginTop: '60px' }}
          >
            {wishList &&
              wishList.map((e) => {
                return (
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
                    <BsBookmarkFill
                      onClick={() => ChangeWish(e.id)}
                      size={25}
                      style={{
                        position: 'absolute',
                        color: '#ff8334',
                        cursor: 'pointer',
                      }}
                    />
                    <LinkContainer
                      style={{
                        width: '70%',
                        margin: 'auto',
                        height: '150px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                      }}
                      to={`/products/${activeCat}/5`}
                    >
                      <img src={e.image} alt='noon' />
                    </LinkContainer>
                    <div
                      className='d-flex mt-3 mx-2'
                      style={{ justifyContent: 'center' }}
                    >
                      <span className='mx-2' style={{ cursor: 'pointer' }}>
                        {e.unit}
                      </span>
                      <span className='mx-2' style={{ cursor: 'pointer' }}>
                        -
                      </span>
                      <h5 className='mx-2' style={{ cursor: 'pointer' }}>
                        {e.name}
                      </h5>
                    </div>
                    <div
                      className='d-flex mt-3'
                      style={{ justifyContent: 'right' }}
                    >
                      <div className='d-flex'>
                        <span style={{ fontSize: '16px', marginRight: '5px' }}>
                          تومان
                        </span>
                        <span style={{ fontSize: '18px' }}>
                          {' '}
                          {nummber(e.price)}
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
                    <div className='mt-3' style={{ textAlign: 'initial' }}>
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
                        <div className='d-flex'>
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
                            {' '}
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
          </div>
        </div>
      </>
    )
  }
}

export default Favourite
