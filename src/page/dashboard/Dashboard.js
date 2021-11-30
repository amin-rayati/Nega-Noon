import { React, useEffect, useState } from 'react'
import user from '../../assets/img/user.png'
import credit from '../../assets/img/credit.png'
import { LinkContainer } from 'react-router-bootstrap'
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai'
import { ImLocation2 } from 'react-icons/im'
import { MdPayment } from 'react-icons/md'
import { useProjectContext } from '../../context/ProjectProvider'
import { Helmet } from 'react-helmet'
import { AddressModal } from '../Cart/AddressModal'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'

const Dashboard = () => {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [activeAddress, setActiveAddress] = useState('')
  const {
    userData,
    setUserData,
    showAddressModal,
    closeAddressModal,
    addressModal,
    setAddressModal,
    setAddressList,
    setSelectedAddress,
    selectedAddress,
    addressList,
    addressModalClose,
    setAddressModalClose,
    mapModal,
    MapModalClose,
    MapModalOpen,
  } = useProjectContext()

  useEffect(() => {}, [addressModal])
  return (
    <div className='container mx-auto ' style={{ marginTop: '170px' }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>نگانون </title>
      </Helmet>
      <div className='row'>
        <div className='col-lg-3 col-md-12 col-sm-12 col-12 order-lg-1 order-md-3 order-sm-3 order-3 mt-3'>
          <div
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
            }}
          >
            <div className='mt-3' style={{ textAlign: '-webkit-center' }}>
              <h6 style={{ fontSize: '25px', direction: 'rtl' }}>
                موجودی کیف پول :{' '}
              </h6>
              <h6
                style={{
                  fontSize: '15px',
                }}
                className='mt-3'
              >
                5000 تومان
              </h6>
            </div>
            <img alt='user' style={{ width: '60%' }} src={credit} />
            {/* <div className='mt-3' style={{ textAlign: 'left' }}>
              <LinkContainer
                to='/money'
                style={{
                  color: '#ffb135',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <span>افزایش موجودی</span>
              </LinkContainer>
            </div> */}
          </div>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-md-2 order-sm-2 order-2 mt-3'>
          <LinkContainer
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '35px  15px 30px 15px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
              cursor: 'pointer',
            }}
            to='/favourite'
          >
            <div>
              <div
                className='d-flex'
                style={{ justifyContent: 'space-between' }}
              >
                <AiOutlineHeart size={25} style={{ color: 'red' }} />
                <h6 style={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  علاقه مندی ها
                </h6>
              </div>
            </div>
          </LinkContainer>

          <div
            onClick={showAddressModal}
            className='mt-3'
            style={{
              cursor: 'pointer',
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '35px  15px 30px 15px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
            }}
          >
            <div className='d-flex' style={{ justifyContent: 'space-between' }}>
              <ImLocation2 size={25} style={{ color: '#2098ff' }} />
              <h6 style={{ fontWeight: 'bolder', fontSize: '18px' }}>
                آدرس ها
              </h6>
            </div>
          </div>
          <AddressModal />

          <LinkContainer
            to='/payments'
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '35px  15px 30px 15px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
              cursor: 'pointer',
            }}
          >
            <div className='mt-3'>
              <div
                className='d-flex'
                style={{ justifyContent: 'space-between' }}
              >
                <MdPayment size={25} style={{ color: '#FFB135' }} />
                <h6 style={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  لیست پرداخت ها
                </h6>
              </div>
            </div>
          </LinkContainer>

          <LinkContainer
            to='/orders'
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '35px  15px 30px 15px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
              cursor: 'pointer',
            }}
          >
            <div className='mt-3'>
              <div
                className='d-flex'
                style={{ justifyContent: 'space-between' }}
              >
                <AiOutlineUnorderedList
                  size={30}
                  style={{ color: '#ffb135' }}
                />
                <h6 style={{ fontWeight: 'bolder', fontSize: '18px' }}>
                  لیست سفارشات ها
                </h6>
              </div>
            </div>
          </LinkContainer>
        </div>
        <div className='col-lg-3 col-md-12 col-sm-12 col-12  order-lg-3 order-md-1 order-sm-1 order-1 mt-3'>
          <div
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
            }}
          >
            <img alt='user' style={{ width: '60%' }} src={user} />
            <div className='mt-3' style={{ textAlign: '-webkit-center' }}>
              <h6 style={{ fontSize: '25px' }}>
                {userData
                  ? userData['customerFirstName'] +
                    ' ' +
                    userData['customerLastName']
                  : 'کاربر'}
              </h6>
              <LinkContainer
                to='/profile'
                style={{
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#ff8334',
                }}
              >
                <h6 className='mt-3'>ویرایش پروفایل</h6>
              </LinkContainer>

              <div
                className='mt-3'
                style={{ width: '50%', borderBottom: '2px solid #ff8334' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
