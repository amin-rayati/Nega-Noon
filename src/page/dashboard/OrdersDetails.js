import { React, useEffect, useState } from 'react'
import Breadcrump from '../../component/BreadCrump/BreadCrumpOrder'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import PageLoader from '../PageLoader/PageLoader'

const OrdersDetails = () => {
  const { pathname } = useLocation()
  const orderId = pathname.split('/')[2]

  const [ordersDetail, setOrdersDetail] = useState('')

  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-Pers')
  }
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
            orderId: orderId,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setOrdersDetail(content.data)
        console.log(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOrdersDetail()
  }, [])

  console.log(ordersDetail)

  if (!ordersDetail) {
    return <PageLoader />
  } else {
    return (
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
            {ordersDetail &&
              ordersDetail.product.map((e) => {
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
                      <div className='d-flex'>
                        <p>تومان</p>
                        <p>{nummber(e.price)}</p>
                        <div className='d-flex'>
                          <p className='mx-2'>:</p>
                          <p>قیمت </p>
                        </div>
                      </div>
                      <div className='d-flex'>
                        <p>{e.count} عدد</p>
                        <p className='mx-2'>-</p>
                        <p style={{ color: '#ff8334' }}>{e.name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div
            className='mt-5 col-lg-3'
            style={{ border: '1px solid #bbbbbb', borderRadius: '15px' }}
          >
            <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
              <p>تومان</p>
              <p>{ordersDetail && nummber(ordersDetail[0]['productsPrice'])}</p>
              <p className='mx-3'>:</p>
              <p>مجموع سفارش</p>
            </div>
            <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
              <p>تومان</p>
              <p>{ordersDetail && nummber(ordersDetail[1]['sendPrice'])}</p>
              <p className='mx-3'>:</p>
              <p>هزینه ارسال</p>
            </div>
            <div className='d-flex  mt-4' style={{ justifyContent: 'center' }}>
              <p>تومان</p>
              <p>{ordersDetail && nummber(ordersDetail[2]['packagePrice'])}</p>
              <p className='mx-3'>:</p>
              <p>هزینه بسته بندی</p>
            </div>
            <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
              <p>تومان</p>
              <p>{ordersDetail && nummber(ordersDetail[3]['totalPrice'])}</p>
              <p className='mx-3'>:</p>
              <p>مبلغ قابل پرداخت</p>
            </div>
            <div className='d-flex mt-4' style={{ justifyContent: 'center' }}>
              <p style={{ textAlign: 'end' }}>
                {ordersDetail && nummber(ordersDetail[4]['customerAddress'])}
              </p>
              <p className='mx-3'>:</p>
              <p> آدرس</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrdersDetails
