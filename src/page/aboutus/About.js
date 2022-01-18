import { React, useState, useEffect } from 'react'
import aboutUs from '../../assets/img/aboutUs.png'
import PageLoader from '../PageLoader/PageLoader'
import { Helmet } from 'react-helmet'

import Loading from '../../component/Loading/Loading'
import Fade from '@mui/material/Fade'
const About = () => {
  const [data, setData] = useState()

  const getAllData = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/AboutUs/API/_aboutUs?token=test',
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
        console.log(content)
        setData(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  if (!data) {
    return <Loading />
  } else {
    return (
      <Fade
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 2000 } : {})}
      >
        <div className='container' style={{ marginTop: '170px' }}>
          <Helmet>
            <meta charSet='utf-8' />
            <title>درباره نگانون </title>
          </Helmet>
          <div className='row'>
            <div
              className='mt-1 col-lg-6 col-md-12 coll-sm-12 col-12'
              style={{
                textAlign: 'right',
                direction: 'rtl',
                msLineBreak: 'auto',
              }}
            >
              <h1>{data && data.title}</h1>
              <div className='mt-5'>
                <p
                  style={{
                    textAlign: 'justify',
                    direction: 'rtl',
                    lineHeight: '35px',
                  }}
                >
                  {data && data.secondText}
                </p>
              </div>
            </div>

            <div className='mt-1 col-lg-6 col-md-12 coll-sm-12 col-12'>
              <div style={{ textAlign: 'center' }}>
                <img src={data && data.image} style={{ width: '60%' }} />
              </div>
              <div className='mt-2'>
                <p
                  style={{
                    textAlign: 'justify',
                    direction: 'rtl',
                    lineHeight: '35px',
                  }}
                >
                  {data && data.firstText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default About
