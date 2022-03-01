import React from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import certificate from '../../assets/Img/certificate.jpg'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'

const Service = () => {
  const onPageChange = (event, value) => {
    console.log(value)
  }
  return (
    <div>
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>خدمات ما </h1>
        <div
          style={{
            backgroundColor: '#161f3c',
            padding: '15px 30px 30px 30px',
            borderRadius: '15px',
            margin: 'auto',
          }}
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-3'
        >
          <p
            style={{
              color: 'white',
              fontWeight: 'bolder',
              fontSize: '20px',
              textAlign: 'right',
              marginTop: '20px',
            }}
          >
            خدمات ما
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-5'
          style={{ margin: 'auto' }}
        >
          <div className='col-lg-12 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'>
            <div className='m-3'>
              <div
                className='row  mt-3'
                style={{
                  boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 50%)',
                  borderRadius: '15px',
                }}
              >
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
                  <p style={{ lineHeight: '25px' }}>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img
                    src={mec}
                    alt='computer'
                    style={{ width: '100%', borderRadius: '15px' }}
                  />
                </div>
              </div>
            </div>
            <div className='m-3'>
              <div
                className='row  mt-3'
                style={{
                  boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 50%)',
                  borderRadius: '15px',
                }}
              >
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
                  <p style={{ lineHeight: '25px' }}>
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                    همه ما، از بچه و پیر و جوون، خاطرات خوبی از صف نونوایی
                    نداریم! کلی معطل میشیم که چند تا دونه نون بخریم و اینکار هر
                    روز یا هر چند روز یکبار هم باید تکرار بشه... خوب وقتش بود که
                    یه کاری بکنیم... این همه نونوایی خوب... اینترنت نسبتا مناسب
                  </p>
                </div>
                <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                  <img
                    src={mec}
                    alt='computer'
                    style={{ width: '100%', borderRadius: '15px' }}
                  />
                </div>
              </div>
            </div>
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

export default Service
