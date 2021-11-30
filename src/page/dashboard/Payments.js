import React from 'react'
import { Helmet } from 'react-helmet'

const Payments = () => {
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>نگانون </title>
      </Helmet>
      <div className='container mx-auto ' style={{ marginTop: '170px' }}>
        <div className='row mt-3' style={{ justifyContent: 'center' }}>
          <div className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 row'>
            <div className='col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2 '>
              <div className='d-flex mt-3 cart-amount-btn'>
                <button className='successBtn'>موفق</button>
              </div>
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
                    1400/2/15
                  </span>
                  <span style={{ fontSize: '15px', color: '#ff8334' }}>/</span>
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  15:34
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
                  <span style={{ fontSize: '18px' }}>{nummber(5000)} </span>
                </div>
              </div>
            </div>
            <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
              <div
                className='d-flex mt-3 '
                style={{ justifyContent: 'flex-end' }}
              >
                <span className='mx-2' style={{ cursor: 'pointer' }}>
                  پارسیان
                </span>
                <span className='mx-2' style={{ cursor: 'pointer' }}>
                  -
                </span>
                <h5 className='ml-2' style={{ cursor: 'pointer' }}>
                  افزایش اعتبار
                </h5>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='row mt-3' style={{ justifyContent: 'center' }}>
          <div className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 row'>
            <div className='col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2 '>
              <div className='d-flex mt-3 cart-amount-btn'>
                <button className='failedBtn'>ناموفق</button>
              </div>
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
                    1400/2/15
                  </span>
                  <span style={{ fontSize: '15px', color: '#ff8334' }}>/</span>
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  15:34
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
                  <span style={{ fontSize: '18px' }}>{nummber(5000)} </span>
                </div>
              </div>
            </div>
            <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
              <div
                className='d-flex mt-3 '
                style={{ justifyContent: 'flex-end' }}
              >
                <span className='mx-2' style={{ cursor: 'pointer' }}>
                  پارسیان
                </span>
                <span className='mx-2' style={{ cursor: 'pointer' }}>
                  -
                </span>
                <h5 className='ml-2' style={{ cursor: 'pointer' }}>
                  افزایش اعتبار
                </h5>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  )
}

export default Payments
