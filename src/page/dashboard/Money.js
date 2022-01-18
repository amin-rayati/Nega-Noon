import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { useProjectContext } from '../../context/ProjectProvider'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaPlus, FaMinus } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

const Money = () => {
  const slickDefaults = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '')

  const { userData } = useProjectContext()
  const [active, setActive] = useState('1')
  const [price, setPrice] = useState(5000)

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }
  const choosePrice = (id) => {
    setActive(id)
  }
  const plus = () => {
    if (price === '') {
      setPrice(0 + 5000)
    } else {
      setPrice(parseInt(price) + 5000)
    }
  }
  const minus = () => {
    if (price > 5000) setPrice(parseInt(price) - 5000)
  }

  const addCredit = () => {
    if (price < 5000) {
      Swal.fire({
        type: 'warning',
        text: `حداقل قیمت برای افزایش اعتبارتان باید بیشتر از 5000 تومان باشد`,
        showConfirmButton: false,
        showCloseButton: true,
      }).then((result) => {
        console.log(result)
      })
    } else {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_chargingWallet?token=test',
          {
            customerId: userData ? userData['customerId'] : null,
            credit: price,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone) {
            window.open(response.data.data.url, '_blank')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>کیف پول نگانون </title>
      </Helmet>

      <div className='container mx-auto ' style={{ marginTop: '170px' }}>
        <Breadcrump page={'کیف پول'} />

        <div
          className='row'
          style={{ justifyContent: 'center', textAlign: 'center' }}
        >
          <div className='col-lg-5 col-md-12 col-sm-12 col-12'>
            <div
              className='d-flex'
              style={{
                background: 'white',
                justifyContent: 'center',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0px 0px 50px 10px #e7e7e7',
              }}
            >
              <p>تومان</p>
              <p>{nummber(userData ? userData['credit'] : 1000)}</p>
              <h5 className='mx-3'>:</h5>
              <h5>موجودی فعلی کیف پول </h5>
            </div>
            <Slider {...slickDefaults}>
              <div>
                <button
                  onClick={() => {
                    choosePrice('1')
                    setPrice(5000)
                  }}
                  className={
                    active === '1'
                      ? 'choosen-cat-btn1 mx-2 mt-2  d-flex'
                      : 'cat-btn mx-1 mt-2  d-flex'
                  }
                >
                  <span className='mx-2'>تومان</span>
                  {nummber(5000)}
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    choosePrice('2')
                    setPrice(10000)
                  }}
                  className={
                    active === '2'
                      ? 'choosen-cat-btn1 mx-2 mt-2  d-flex'
                      : 'cat-btn mx-1 mt-2  d-flex'
                  }
                >
                  <span className='mx-2'>تومان</span>
                  {nummber(10000)}
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    choosePrice('3')
                    setPrice(15000)
                  }}
                  className={
                    active === '3'
                      ? 'choosen-cat-btn1 mx-2 mt-2  d-flex'
                      : 'cat-btn mx-1 mt-2  d-flex'
                  }
                >
                  <span className='mx-2'>تومان</span>
                  {nummber(15000)}
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    choosePrice('4')
                    setPrice(20000)
                  }}
                  className={
                    active === '4'
                      ? 'choosen-cat-btn1 mx-2 mt-2 d-flex'
                      : 'cat-btn mx-1 mt-2 d-flex'
                  }
                >
                  <span className='mx-2'>تومان</span>
                  {nummber(20000)}
                </button>
              </div>
            </Slider>
            <div className='d-flex my-4' style={{ justifyContent: 'center' }}>
              <div
                style={{
                  border: '2px solid gray',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  padding: '5px 10px 5px 10px',
                }}
                className='px-2'
              >
                <FaMinus onClick={minus} style={{ color: 'gray' }} size={20} />
              </div>
              <input
                className='mx-1'
                maxLength='10'
                onChange={handlePriceChange}
                value={price}
                style={{
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                  outline: 'none',
                  textAlign: 'center',
                }}
              />

              <div
                style={{
                  background: '#ff8333',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  padding: '5px 10px 5px 10px',
                }}
                className='px-2 '
              >
                <FaPlus onClick={plus} style={{ color: 'white' }} size={20} />
              </div>
            </div>
            <div>
              <button
                onClick={addCredit}
                style={{
                  padding: ' 10px 30px 10px 30px',
                  border: 'none',
                  borderRadius: '15px',
                  color: 'white',
                  background: '#45ce29',
                }}
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Money
