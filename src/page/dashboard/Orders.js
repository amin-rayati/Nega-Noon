import { React, useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import axios from 'axios'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { Helmet } from 'react-helmet'
import PageLoader from '../PageLoader/PageLoader'
const Orders = () => {
  const { userData, setUserData } = useProjectContext()
  const [orders, setOrders] = useState('')

  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-Pers')
  }
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
  useEffect(() => {
    getOrders()
  }, [userData])

  if (!orders) {
    return <PageLoader />
  } else {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title>نگانون </title>
        </Helmet>
        <div className='container mx-auto ' style={{ marginTop: '170px' }}>
          <Breadcrump page={'سفارشات'} />

          <div className='row' style={{ justifyContent: 'center' }}>
            {orders &&
              orders.map((e) => {
                return (
                  <div
                    key={e.orderId}
                    className='col-lg-3 mx-3 mt-3'
                    style={{
                      padding: '15px',
                      borderRadius: '15px',
                      boxShadow: '0 0 15px 7px #e5e5e5',
                    }}
                  >
                    <div className='d-flex' style={{ justifyContent: 'end' }}>
                      <p>{e.sdate}</p>
                      <span className='mx-3'> :</span>
                      <span style={{ color: '#A7A7A7' }}>تاریخ ثبت سفارش</span>
                    </div>
                    <div className='d-flex' style={{ justifyContent: 'end' }}>
                      <p>{e.stime}</p>
                      <span className='mx-3'> :</span>
                      <span style={{ color: '#A7A7A7' }}>ساعت ثبت سفارش</span>
                    </div>
                    <div className='d-flex' style={{ justifyContent: 'end' }}>
                      <p>1400/1/15</p>
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
                    <div style={{ textAlign: 'center' }}>
                      <LinkContainer to={`/ordersDetails/${e.orderId}`}>
                        <button className='fill-btn px-5'>جزییات بیشتر</button>
                      </LinkContainer>
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

export default Orders
