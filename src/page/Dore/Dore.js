import React from 'react'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
const Dore = () => {
  const onPageChange = (event, value) => {
    console.log(value)
  }
  return (
    <div>
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>لیست دوره ها</h1>
        <div className='mt-3' style={{ textAlign: '-webkit-right' }}>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
            <div
              style={{
                padding: '5px 15px',
                backgroundColor: '#161f3c',
              }}
              className='row py-4'
            >
              <div className='col-lg-6 mt-2 ' style={{ textAlign: 'center' }}>
                <h5
                  style={{
                    color: 'white',
                    fontWeight: 'bolder',
                    padding: '10px',
                    cursor: 'pointer',
                  }}
                >
                  لیست دوره ها طبق دپارتمان
                </h5>
              </div>
              <div className='col-lg-6 mt-2 ' style={{ textAlign: 'center' }}>
                <h5
                  style={{
                    color: 'white',
                    fontWeight: 'bolder',
                    backgroundColor: 'gray',
                    padding: '10px',
                    cursor: 'pointer',
                  }}
                >
                  لیست دوره ها طبق صنعت
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className='row' style={{ justifyContent: 'end' }}>
          <div className='col-lg-8 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'>
            <p className='my-3' style={{ color: 'gray', fontWeight: 'bolder' }}>
              دپارتمان مکانیک 57 دوره
            </p>
            <div className='m-3'>
              <div className='row  mt-3' style={{ border: '1px solid black' }}>
                <div className='col-lg-9 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 py-4 px-4'>
                  <p
                    style={{
                      color: '#3b4872',
                      fontWeight: 'bolder',
                      fontSize: '18px',
                    }}
                  >
                    دوره تخصصی مکانیک
                  </p>
                  <p>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                  <div style={{ textAlign: 'left' }}>
                    <button
                      style={{
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        background: '#161f3c',
                        borderRadius: '15px',
                      }}
                    >
                      اطلاعات بیشتر
                    </button>
                  </div>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img src={mec} alt='computer' style={{ width: '100%' }} />
                </div>
              </div>
              <div className='row  mt-3' style={{ border: '1px solid black' }}>
                <div className='col-lg-9 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 py-4 px-4'>
                  <p
                    style={{
                      color: '#3b4872',
                      fontWeight: 'bolder',
                      fontSize: '18px',
                    }}
                  >
                    دوره تخصصی مکانیک
                  </p>
                  <p>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                  <div style={{ textAlign: 'left' }}>
                    <button
                      style={{
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        background: '#161f3c',
                        borderRadius: '15px',
                      }}
                    >
                      اطلاعات بیشتر
                    </button>
                  </div>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img src={mec} alt='computer' style={{ width: '100%' }} />
                </div>
              </div>
              <div className='row  mt-3' style={{ border: '1px solid black' }}>
                <div className='col-lg-9 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 py-4 px-4'>
                  <p
                    style={{
                      color: '#3b4872',
                      fontWeight: 'bolder',
                      fontSize: '18px',
                    }}
                  >
                    دوره تخصصی مکانیک
                  </p>
                  <p>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                  <div style={{ textAlign: 'left' }}>
                    <button
                      style={{
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        background: '#161f3c',
                        borderRadius: '15px',
                      }}
                    >
                      اطلاعات بیشتر
                    </button>
                  </div>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img src={mec} alt='computer' style={{ width: '100%' }} />
                </div>
              </div>
              <div className='row  mt-3' style={{ border: '1px solid black' }}>
                <div className='col-lg-9 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 py-4 px-4'>
                  <p
                    style={{
                      color: '#3b4872',
                      fontWeight: 'bolder',
                      fontSize: '18px',
                    }}
                  >
                    دوره تخصصی مکانیک
                  </p>
                  <p>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                  <div style={{ textAlign: 'left' }}>
                    <button
                      style={{
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        background: '#161f3c',
                        borderRadius: '15px',
                      }}
                    >
                      اطلاعات بیشتر
                    </button>
                  </div>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img src={mec} alt='computer' style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
          <div
            className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1'
            style={{
              backgroundColor: '#e3e3e3',
              padding: '10px',
              textAlign: '-webkit-right',
            }}
          >
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: '#f1a314',
                padding: '10px',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              دپارتمان عمران
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان مکانبک
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان برق
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان کامپبوتر
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان فیزیک
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان عمران
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان مکانبک
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان برق
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان کامپبوتر
            </p>
            <p
              className='mt-4'
              style={{
                fontWeight: 'bolder',
                fontSize: '15px',
                width: 'fit-content',
                cursor: 'pointer',
                background: 'none',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              دپارتمان فیزیک
            </p>
          </div>
        </div>

        <div style={{ justifyContent: 'center' }}>
          <Pagination
            onChange={onPageChange}
            count={6}
            defaultPage={1}
            siblingCount={6}
          />
        </div>
      </div>
    </div>
  )
}

export default Dore
