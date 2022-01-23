import { React, useState, useEffect } from 'react'
import user from '../../assets/img/user.png'
import male from '../../assets/img/male.png'
import female from '../../assets/img/female.png'
import male1 from '../../assets/img/male1.png'
import female1 from '../../assets/img/female1.png'
import { useProjectContext } from '../../context/ProjectProvider'
import axios from 'axios'
import { Cookies, useCookies } from 'react-cookie'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2'
import PageLoader from '../PageLoader/PageLoader'
import Loader from '../../component/Loading/LoginLoading'
import Breadcrump from '../../component/BreadCrump/BreadCrumpDashboard'
import { Helmet } from 'react-helmet'
import gif from '../../assets/img/logo.gif'

const Dashboard = () => {
  const { userData, setUserData } = useProjectContext()

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'Stateid',
  ])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [profileImg, setProfileImg] = useState([])
  const [name, setName] = useState(
    userData ? userData['customerFirstName'] : ''
  )
  const [lname, setLname] = useState(
    userData ? userData['customerLastName'] : ''
  )
  const [gender, setgender] = useState(
    userData ? userData['customerGender'] : ''
  )
  const [coponCode, setCoponCode] = useState(
    userData ? userData['refer_code'] : ''
  )

  const [image, setImage] = useState(userData ? userData['avatar'] : '')

  const onDrop = async (acceptedFiles) => {
    if (profileImg.length < 1) {
      profileImg.push(...acceptedFiles)
      setProfileImg(profileImg)
    } else {
      profileImg.length = 0
      profileImg.push(acceptedFiles.pop())
      setProfileImg(profileImg)
    }

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }
    let base64Images = await profileImg.map(async (e) => {
      let tmp = await convertBase64(e)
      setImageUrl(tmp.split(',')[1])
    })

    Promise.all(base64Images).then((res) => {})
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLnameChange = (e) => {
    setLname(e.target.value)
  }
  const handleCoponCodeChange = (e) => {
    setCoponCode(e.target.value)
  }
  const setFemale = () => {
    setgender('2')
  }
  const setMale = () => {
    setgender('1')
  }

  const getIndividualInfo = () => {
    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_getCustomerInfo?token=test',
        {
          mobile: cookies['user']['mobile'],
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setUserData(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)

    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_editProfile?token=test',
        {
          mobile: cookies['user']['mobile'],
          fname: name,
          lname: lname,
          gender: gender,
          stateId: cookies['stateId'],
          cityId: cookies['cityId'],
          image: imageUrl,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          getIndividualInfo(e)
          Swal.fire({
            type: 'success',
            text: 'پروفایل شما با موفقیت تغییر کرد',
          })
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (userData !== null) {
      setName(userData['customerFirstName'])
      setLname(userData['customerLastName'])
      setgender(userData['customerGender'])
      setCoponCode(userData['refer_code'])
      setImage(userData['avatar'])
    }
  }, [userData])

  return (
    <div className='container mx-auto ' style={{ marginTop: '170px' }}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>نگانون </title>
      </Helmet>
      <Breadcrump page={'پروفایل'} />
      <div className='row' style={{ justifyContent: 'center' }}>
        <div
          className='col-lg-1 col-md-12 col-sm-12 col-10 order-lg-1 order-md-4 order-sm-4 order-4 '
          style={{ textAlign: 'center', marginTop: '10%' }}
        >
          <button
            onClick={submitForm}
            className='login-btn'
            style={{ border: 'none' }}
          >
            {loading ? <Loader /> : 'ثبت اطلاعات'}
          </button>
        </div>
        <div className='col-lg-5 col-md-12 col-sm-12 col-10 order-lg-1 order-md-3 order-sm-3 order-3 mt-3'>
          <div className='row mx-2' style={{ justifyContent: 'center' }}>
            <div
              onClick={setFemale}
              className='col-lg-5 col-md-5 col-sm-5 col-12 m-2'
              style={
                gender == '2'
                  ? {
                      textAlign: 'center',
                      boxShadow: '0 0 7px 4px #f5f3f3',
                      padding: '15px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }
                  : {
                      textAlign: 'center',
                      border: '1px solid #B1B1B1',
                      padding: '15px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }
              }
            >
              <img src={gender == '2' ? female1 : female} alt='male' />
            </div>
            <div
              onClick={setMale}
              className='col-lg-5 col-md-5 col-sm-5 col-12 m-2'
              style={
                gender == '1'
                  ? {
                      textAlign: 'center',
                      boxShadow: '0 0 7px 4px #f5f3f3',
                      padding: '15px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }
                  : {
                      textAlign: 'center',
                      border: '1px solid #B1B1B1',
                      padding: '15px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }
              }
            >
              <img src={gender == '1' ? male : male1} alt='male' />
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-12 col-sm-12 col-10 order-lg-2 order-md-2 order-sm-2 order-2 mt-3'>
          <div style={{ textAlign: 'right' }}>
            <label>
              <h6 style={{ color: '#0000006b' }}>نام</h6>
            </label>
          </div>
          <div className='row mx-0 mt-2'>
            <input
              onChange={handleNameChange}
              value={name}
              required
              className=' select'
              type='text'
              title='Ten digits code'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '35px',
                width: '100%',
                outline: 'none',
                background: 'white',
                textAlign: 'right',
              }}
            />
          </div>
          <div className='mt-3' style={{ textAlign: 'right' }}>
            <label>
              <h6 style={{ color: '#0000006b' }}>نام خانوادگی</h6>
            </label>
          </div>
          <div className='row mx-0 mt-2'>
            <input
              required
              onChange={handleLnameChange}
              value={lname}
              className=' select'
              type='text'
              title='Ten digits code'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '35px',
                width: '100%',
                outline: 'none',
                background: 'white',
                textAlign: 'right',
              }}
            />
          </div>
          <div className='mt-3' style={{ textAlign: 'right' }}>
            <label>
              <h6 style={{ color: '#0000006b' }}>کد معرف</h6>
            </label>
          </div>
          <div className='row mx-0 mt-2'>
            <input
              onChange={handleCoponCodeChange}
              value={coponCode}
              required
              disabled
              className=' select'
              type='text'
              title='Ten digits code'
              style={{
                borderRadius: '0.45rem',
                border: '1px solid #0000004f',
                height: '35px',
                width: '100%',
                outline: 'none',
                background: 'white',
                textAlign: 'right',
              }}
            />
          </div>
        </div>
        <div className='col-lg-3 col-md-12 col-sm-12 col-10  order-lg-3 order-md-1 order-sm-1 order-1 mt-3'>
          <div
            style={{
              borderRadius: '15px',
              background: '#fbfcff',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0px 10px 10px 0px #e7e7e7',
            }}
          >
            <img src={gif} alt={gif} style={{ width: '70%', margin: '20px' }} />
            {/* <Dropzone onDrop={onDrop} accept='image/png,image/jpeg,image/jpg'>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    height: '11em',
                    width: '80%',
                    borderRadius: '25px',
                    border: '2px solid rgb(194 194 194)',
                  }}
                  className='mt-2 text-center container'
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='mt-2'>عکس خود را اپلود کنید</p>
                    <br />
                    <div className='d-flex flex-wrap justify-content-center'>
                      {profileImg.map((e) => {
                        return (
                          <div className='col-md-12'>
                            <img
                              style={{
                                width: '75px',
                                height: '75px',
                                borderRadius: '50%',
                              }}
                              alt='b'
                              src={
                                URL.createObjectURL(e)
                                  ? URL.createObjectURL(e)
                                  : user
                              }
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone> */}
            {/* 
            <div className='mt-3' style={{ textAlign: '-webkit-center' }}>
              <h6 style={{ fontSize: '18px' }}>عکس پروفایل</h6>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
