import { React, useState, useEffect } from 'react'
import main from '../../assets/img/main.png'
import slogan from '../../assets/img/slogan.png'
import bread from '../../assets/img/bread.png'
import task from '../../assets/img/task.png'
import people from '../../assets/img/people.png'
import CatSlider from './CatSlider'
import AdSlider from './AdSlider'
import FavouriteProductsSlider from './FavouriteProductsSlider'
import map from '../../assets/img/map.png'
import sabad from '../../assets/img/sabad.png'
import iconBread from '../../assets/img/iconBread.png'
import CartIcon from '../../component/CartIcon'
import PageLoader from '../PageLoader/PageLoader'
import { Helmet } from 'react-helmet'
import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'

const Home = () => {
  const [data, setData] = useState()
  const [area, setArea] = useState()
  const [checked, setChecked] = useState(false)
  const getAllData = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/MiddleInfos/API/_getMiddleInfos?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setData(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAllArea = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/MiddleInfos/API/_getCoveredAreas?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setArea(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData()
    getAllArea()
  }, [])

  if (!data) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div>
          <AdSlider />
          <div
            className='w-75 mx-auto '
            style={{ justifyContent: 'center', marginTop: '170px' }}
          >
            <Helmet>
              <meta charSet='utf-8' />
              <title>نگانون </title>
            </Helmet>

            <div style={{ textAlign: '-webkit-center', marginTop: '150px' }}>
              <CatSlider />
            </div>
            <h2
              className='mt-5'
              style={{
                fontWeight: 'bolder',
                cursor: 'pointer',
                color: '#ff8334',
                textAlign: 'center',
              }}
            >
              سفارش آنلاین
            </h2>

            <div
              className='mt-5 py-5'
              style={{ background: '#FAFAFA', textAlign: 'center' }}
            >
              <h2
                className='mt-5'
                style={{ fontWeight: 'bolder', cursor: 'pointer' }}
              >
                {data && data.mainTitle}
              </h2>
              <h5
                className='mt-3'
                style={{ cursor: 'pointer', fontSize: '15px' }}
              >
                {data && data.mainText}
              </h5>
              <div className='row my-5 justify-content-center'>
                <div
                  className='col-lg-3 col-md-10 col-sm-10 col-10 mt-3 mx-3'
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={data && data.thirdImage}
                    style={{ width: '40%' }}
                    alt='people'
                  />
                  <div className='mt-3'>
                    <h4 style={{ fontWeight: 'bolder', color: '#FF8333' }}>
                      {data && data.thirdTitle}
                    </h4>
                    <h5
                      className='mt-2 three-grid-font'
                      style={{
                        textAlign: 'justify',
                        direction: 'rtl',
                        lineHeight: '30px',
                        fontSize: '15px',
                      }}
                    >
                      {data && data.thirdText}
                    </h5>
                  </div>
                </div>
                <div
                  className='col-lg-3 col-md-10 col-sm-10 col-10 mx-3 mt-3 box-border'
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={data && data.secondImage}
                    style={{ width: '40%' }}
                    alt='bread'
                  />
                  <div className='mt-3'>
                    <h4 style={{ fontWeight: 'bolder', color: '#FF8333' }}>
                      {data && data.secondTitle}
                    </h4>
                    <h5
                      className='mt-2 three-grid-font'
                      style={{
                        textAlign: 'justify',
                        direction: 'rtl',
                        lineHeight: '30px',
                        fontSize: '15px',
                      }}
                    >
                      {data && data.secondText}
                    </h5>
                  </div>
                </div>
                <div
                  className='col-lg-3 col-md-10 col-sm-10 col-10 mt-3 mx-3'
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={data && data.firstImage}
                    style={{ width: '40%' }}
                    alt='task'
                  />
                  <div className='mt-3'>
                    <h4 style={{ fontWeight: 'bolder', color: '#FF8333' }}>
                      {data && data.firstTitle}
                    </h4>
                    <h5
                      className='mt-2 three-grid-font'
                      style={{
                        textAlign: 'justify',
                        direction: 'rtl',
                        lineHeight: '30px',
                        fontSize: '15px',
                      }}
                    >
                      {data && data.firstText}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5'>
              <h5
                style={{
                  textAlign: 'right',
                  fontSize: '25px',
                  fontWeight: 'bolder',
                }}
              >
                محصولات پرطرفدار
              </h5>

              <FavouriteProductsSlider />
            </div>

            <div className='mt-5' style={{ textAlign: '-webkit-center' }}>
              <h5
                style={{
                  textAlign: 'center',
                  fontSize: '25px',
                  fontWeight: 'bolder',
                }}
              >
                مناطق تحت پوشش نگانون
              </h5>
              <img
                className='mt-4'
                src={area && area}
                alt='map'
                style={{
                  width: '70%',
                  height: '50%',
                  borderRadius: '15px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default Home
