import { React, useState, useEffect } from 'react'
import Bread from '../../assets/img/bread.png'
import PageLoader from '../PageLoader/PageLoader'
import { Helmet } from 'react-helmet'

const Rules = () => {
  const [data, setData] = useState()
  const getAllData = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Rules/API/_getRules?token=test',
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

      setData(content.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllData()
  }, [])
  if (!data) {
    return <PageLoader />
  } else {
    return (
      <div className='container mx-auto ' style={{ marginTop: '170px' }}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>قوانین و مقررات نگانون </title>
        </Helmet>
        <div style={{ textAlign: 'center' }}>
          <h1>قوانین و مقررات</h1>
        </div>
        <div
          className='mt-5 col-lg-8  col-md-12 col-sm-12 col-12'
          style={{ textAlign: 'right', margin: 'auto' }}
        >
          {data &&
            data.map((e) => {
              return (
                <div
                  key={e.id}
                  className='row mt-5'
                  style={{ justifyContent: 'center' }}
                >
                  <p
                    className='col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2 col-md-12 col-sm-12 col-12'
                    style={{
                      fontSize: '15px',
                      fontWeight: '400',
                      marginRight: '10px',
                      direction: 'rtl',
                      marginTop: '15px',
                    }}
                  >
                    {e.text}
                  </p>
                  <img
                    className='rules-img col-lg-3  order-lg-2 order-md-1 order-sm-1 order-1 col-md-12 col-sm-12 col-12 '
                    src={e.image}
                    alt='noon'
                  />
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default Rules
