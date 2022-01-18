import { React, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { useProjectContext } from '../../context/ProjectProvider'
import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'

const Payments = () => {
  const { userData } = useProjectContext()
  const [payments, setPayments] = useState('')
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const date = (date) => {
    const newdate = new Date(date * 1000)
    return newdate.toLocaleDateString('fa-Pers')
  }

  const getPayments = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Customers/API/_customerPaymentList?token=test',
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
        setPayments(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPayments()
  }, [userData])

  if (!payments) {
    return <Loading />
  } else if (payments.length < 1) {
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
          <Breadcrump page={'لیست پرداخت ها'} />
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
                شما هیچ پرداختی در سایت انجام ندادید
              </p>
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
        <div className='container mx-auto ' style={{ marginTop: '170px' }}>
          <Breadcrump page={'لیست پرداخت ها'} />
          {payments &&
            payments.map((e) => {
              return (
                <>
                  <div
                    className='row mt-3'
                    style={{ justifyContent: 'center' }}
                  >
                    <div className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 row'>
                      <div className='col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2 '>
                        {e.payment_status === 0 ? (
                          <div className='d-flex mt-3 cart-amount-btn'>
                            <button className='failedBtn'>ناموفق</button>
                          </div>
                        ) : (
                          <div className='d-flex mt-3 cart-amount-btn'>
                            <button className='successBtn'>موفق</button>
                          </div>
                        )}
                      </div>
                      <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
                        <div className='d-flex mt-3 cart-price1-justify'>
                          <div className='d-flex'>
                            <span
                              style={{
                                fontSize: '16px',
                                marginRight: '5px',
                              }}
                            >
                              {date(e.payment_date)}
                            </span>
                            <span
                              style={{ fontSize: '15px', color: '#ff8334' }}
                            >
                              /
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '16px',
                              marginLeft: '5px',
                            }}
                          >
                            {e.payment_sdate.split(' ')[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 order-lg-2 col-md-12  order-md-1 col-sm-12 order-sm-1 col-12 order-1 row'>
                      <div className=' col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2'>
                        <div className='d-flex mt-3 cart-price-justify'>
                          <div className='d-flex'>
                            <span
                              style={{
                                fontSize: '16px',
                                marginRight: '5px',
                              }}
                            >
                              تومان
                            </span>
                            <span style={{ fontSize: '18px' }}>
                              {nummber(e.payment_amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
                        <div
                          className='d-flex mt-3 '
                          style={{ justifyContent: 'flex-end' }}
                        >
                          <span className='mx-2' style={{ cursor: 'pointer' }}>
                            {e.payment_gate}
                          </span>
                          <span className='mx-2' style={{ cursor: 'pointer' }}>
                            -
                          </span>
                          <h5 className='ml-2' style={{ cursor: 'pointer' }}>
                            {e.payment_type === 'online_order'
                              ? 'پرداخت آنلاین'
                              : 'افزایش اعتبار کیف پول'}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              )
            })}
        </div>
      </>
    )
  }
}

export default Payments
