import { React, useEffect, useState } from 'react'
import Breadcrump from '../../component/BreadCrump/BreadCrumpOrder'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import PageLoader from '../PageLoader/PageLoader'
import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'
import { GiCancel } from 'react-icons/gi'
import Swal from 'sweetalert2'
import { LinkContainer } from 'react-router-bootstrap'

const OrdersDetails = () => {
  const { pathname } = useLocation()
  const orderId = pathname.split('/')[2]
  const canDelete = pathname.split('/')[3]

  const [ordersDetail, setOrdersDetail] = useState('')

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const getOrdersDetail = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Orders/API/_orderDetails?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },
          body: JSON.stringify({
            token: 'test',
            orderShiftId: orderId,
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setOrdersDetail(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const askToDelete = (shiftId, productId) => {
    Swal.fire({
      title: `آیا میخواهید سفارش خود را لغو کنید `,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8334',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    }).then((result) => {
      if (result.value) {
        deleteOrder(shiftId, productId)
      }
    })
  }
  const deleteOrder = async (shiftId, productId) => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Orders/API/_deleteOrder?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },
          body: JSON.stringify({
            token: 'test',
            orderShiftId: shiftId,
            productId: productId,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        Swal.fire({
          type: 'success',
          text: 'سفارش شما با موفقیت لغو شد',
          confirmButtonText: 'فهمیدم',
        })
        getOrdersDetail()
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrdersDetail()
  }, [])

  if (ordersDetail.length < 1) {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div
          className='container mx-auto '
          style={{
            marginTop: '200px',
          }}
        >
          <Breadcrump page={'سفارشات'} />
          <div
            className='row'
            style={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <div
              style={{
                border: '1px solid #cfc7c7',
                borderRadius: '15px',

                padding: '50px',
                boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
                cursor: 'pointer',
              }}
              className='col-lg-6 col-md-12 col-sm-12  col-10 mx-5'
            >
              <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                تاکنون سفارشی توسط شما ثبت نشده است
              </p>
              <LinkContainer style={{ color: '#ffb135' }} to='/products/1'>
                <p>سفارش از نگانون</p>
              </LinkContainer>
            </div>
          </div>
        </div>
      </Fade>
    )
  } else if (ordersDetail && ordersDetail['products'].length < 1) {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div
          className='container mx-auto '
          style={{
            marginTop: '200px',
          }}
        >
          <Breadcrump page={'سفارشات'} />
          <div
            className='row'
            style={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <div
              style={{
                border: '1px solid #cfc7c7',
                borderRadius: '15px',

                padding: '50px',
                boxShadow: '0 0 17px 5px rgb(223 222 222 / 50%)',
                cursor: 'pointer',
              }}
              className='col-lg-6 col-md-12 col-sm-12  col-10 mx-5'
            >
              <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                تاکنون سفارشی توسط شما ثبت نشده است
              </p>
              <LinkContainer style={{ color: '#ffb135' }} to='/products/1'>
                <p>سفارش از نگانون</p>
              </LinkContainer>
            </div>
          </div>
        </div>
      </Fade>
    )
  } else {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div className='container mx-auto ' style={{ marginTop: '170px' }}>
          <Helmet>
            <meta charSet='utf-8' />
            <title>نگانون </title>
          </Helmet>
          <Breadcrump page={'سفارشات'} page2={'نان بربری'} />

          <div className='row ' style={{ justifyContent: 'center' }}>
            <div
              className='row col-lg-12 p-4'
              style={{ justifyContent: 'center' }}
            >
              {ordersDetail
                ? ordersDetail.products.map((e) => {
                    return (
                      <div
                        className='col-lg-5 mt-3'
                        style={{
                          border: '1px solid #bbbbbb',
                          padding: '20px',
                          borderRadius: '15px',
                          marginRight: '15px',
                        }}
                      >
                        <div
                          className='d-flex'
                          style={{ justifyContent: 'space-between' }}
                        >
                          {canDelete === '1' ? (
                            <button
                              onClick={() => askToDelete(orderId, e.id)}
                              style={{
                                padding: '10px 5px 10px 5px',
                                borderRadius: '8px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                              }}
                            >
                              لغو سفارش
                              <GiCancel className='mx-2' />
                            </button>
                          ) : null}
                          <div className='d-flex'>
                            <p>تومان</p>
                            <p>{nummber(e.price)}</p>
                            <div className='d-flex'>
                              <p className='mx-2'>:</p>
                              <p>قیمت </p>
                            </div>
                          </div>

                          <div className='d-flex'>
                            <p>
                              {e.count} {e.unit}
                            </p>
                            <p className='mx-2'>-</p>
                            <p style={{ color: '#ff8334' }}>{e.name}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>
            <div
              className='mt-5 col-lg-3'
              style={{ border: '1px solid #bbbbbb', borderRadius: '15px' }}
            >
              <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
                <p>تومان</p>
                <p>
                  {ordersDetail ? nummber(ordersDetail['productsPrice']) : null}
                </p>
                <p className='mx-3'>:</p>
                <p>مجموع سفارش</p>
              </div>
              <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
                <p>تومان</p>
                <p>
                  {ordersDetail ? nummber(ordersDetail['sendPrice']) : null}
                </p>
                <p className='mx-3'>:</p>
                <p>هزینه ارسال</p>
              </div>
              <div
                className='d-flex  mt-4'
                style={{ justifyContent: 'center' }}
              >
                <p>تومان</p>
                <p>
                  {ordersDetail ? nummber(ordersDetail['packagePrice']) : null}
                </p>
                <p className='mx-3'>:</p>
                <p>هزینه بسته بندی</p>
              </div>
              <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
                <p>تومان</p>
                <p>
                  {ordersDetail ? nummber(ordersDetail['totalPrice']) : null}
                </p>
                <p className='mx-3'>:</p>
                <p>مبلغ قابل پرداخت</p>
              </div>
              <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
                <p style={{ textAlign: 'end' }}>
                  {ordersDetail
                    ? nummber(ordersDetail['customerAddress'])
                    : null}
                </p>
                <p className='mx-3'>:</p>
                <p> آدرس</p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default OrdersDetails
