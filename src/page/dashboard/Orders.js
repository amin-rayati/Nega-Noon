import { React, useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import axios from 'axios'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { Helmet } from 'react-helmet'
import PageLoader from '../PageLoader/PageLoader'
import { GiCancel } from 'react-icons/gi'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'

import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'
const Orders = () => {
  const { userData, setUserData } = useProjectContext()
  const [orders, setOrders] = useState('')
  const { pathname } = useLocation()
  // const date = (date) => {
  //   const newdate = new Date(date * 1000)
  //   return newdate.toLocaleDateString('fa-Pers')
  // }
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const getOrders = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Orders/API/_customerOrders?token=test',
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
        setOrders(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const askToDelete = (id) => {
  //   Swal.fire({
  //     title: `آیا میخواهید سفارش خود را لغو کنید `,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#ff8334',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'بله',
  //     cancelButtonText: 'خیر',
  //   }).then((result) => {
  //     if (result.value) {
  //       deleteOrder(id)
  //     }
  //   })
  // }

  // const deleteOrder = async (id) => {
  //   try {
  //     const rawResponse = await fetch(
  //       'https://meyt.neganoon.ir/admin/Orders/API/_deleteOrder?token=test',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           token: 'test',
  //         },
  //         body: JSON.stringify({
  //           token: 'test',
  //           orderShiftId: id,
  //         }),
  //       }
  //     )
  //     const content = await rawResponse.json()

  //     if (content.isDone) {
  //       getOrders()
  //       Swal.fire({
  //         type: 'success',
  //         text: 'سفارش شما با موفقیت لغو شد',
  //         confirmButtonText: 'فهمیدم',
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getOrders()
  }, [userData, pathname])

  if (!orders) {
    return <Loading />
  } else if (orders.length < 1) {
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
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>نگانون </title>
        </Helmet>
        <Fade
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 2000 } : {})}
        >
          <div className='container mx-auto ' style={{ marginTop: '170px' }}>
            <Breadcrump page={'سفارشات'} />

            <div className='row' style={{ justifyContent: 'center' }}>
              {orders &&
                orders.map((e) => {
                  return (
                    <div
                      key={e.orderId}
                      className='col-lg-3 col-md-11 col-sm-11 col-11  mx-3 mt-3'
                      style={{
                        padding: '15px',
                        borderRadius: '15px',
                        boxShadow: '0 0 15px 7px #e5e5e5',
                      }}
                    >
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <p>{e.sdate}</p>
                        <span className='mx-3'> :</span>
                        <span style={{ color: '#A7A7A7' }}>
                          تاریخ ثبت سفارش
                        </span>
                      </div>
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <p>{e.stime}</p>
                        <span className='mx-3'> :</span>
                        <span style={{ color: '#A7A7A7' }}>ساعت ثبت سفارش</span>
                      </div>
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <p>{e.deliveryTime}</p>
                        <span className='mx-3'> :</span>
                        <span style={{ color: '#A7A7A7' }}> تاریخ تحویل </span>
                      </div>
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <div className='d-flex'>
                          <p className='mx-2'>تومان</p>
                          <p>{nummber(e.totalPrice)}</p>
                        </div>
                        <span style={{ color: '#A7A7A7' }} className='mx-3'>
                          {' '}
                          :
                        </span>
                        <span style={{ color: '#A7A7A7' }}> مبلغ کل</span>
                      </div>
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <div className='d-flex'>
                          <p>{e.time_end}</p>
                          <p className='mx-2'>تا</p>
                          <p>{e.time_start}</p>
                        </div>
                        <span style={{ color: '#A7A7A7' }} className='mx-3'>
                          {' '}
                          :
                        </span>
                        <span style={{ color: '#A7A7A7' }}> ساعت تحویل </span>
                      </div>
                      <div className='d-flex' style={{ justifyContent: 'end' }}>
                        <p>{e.payment_type}</p>
                        <span style={{ color: '#A7A7A7' }} className='mx-3'>
                          {' '}
                          :
                        </span>
                        <span style={{ color: '#A7A7A7' }}> نحوه پرداخت</span>
                      </div>
                      <div
                        className='d-flex'
                        style={{
                          textAlign: 'center',
                          justifyContent: 'space-around',
                        }}
                      >
                        {/* {e.canDelete ? (
                          <button
                            onClick={() => askToDelete(e.orderShiftId)}
                            className=' px-2 '
                            style={{
                              marginTop: ' 20px',
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
                        ) : null} */}

                        <LinkContainer
                          to={
                            e.canDelete
                              ? `/ordersDetails/${e.orderShiftId}/1`
                              : `/ordersDetails/${e.orderShiftId}/2`
                          }
                        >
                          <button className='fill-btn px-2'>
                            جزییات بیشتر
                          </button>
                        </LinkContainer>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </Fade>
      </>
    )
  }
}

export default Orders
