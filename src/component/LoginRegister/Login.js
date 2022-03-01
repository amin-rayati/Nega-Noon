import { useState, useCallback, useEffect } from 'react'
import { Modal, ThemeProvider } from 'react-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from '../Loading/LoginLoading'
import Swal from 'sweetalert2'
import { button } from 'react-bootstrap'
import { Cookies, useCookies } from 'react-cookie'
import Grow from '@mui/material/Grow'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { LinkContainer } from 'react-router-bootstrap'
const mobileUrl =
  'https://meyt.neganoon.ir/admin/Customers/API/_startLoginRegister?token=test'

const registerUrl =
  'https://meyt.neganoon.ir/admin/Customers/API/_register?token=test'

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const {
    Id,
    RegisterShow,
    RegisterClose,
    registerModal,
    buyModal,
    buyModalClose,
    loginModal,
    loginModalClose,
    loginModalShow,
    userData,
    setUserData,
  } = useProjectContext()

  const handleCookie = (infoObject) => {
    setUserData(infoObject)
    setCookie(
      'user',
      {
        mobile: infoObject.mobile,
      },
      {
        path: '/',
      }
    )
  }

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [newpass1, setnewpass1] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [Referer, setReferer] = useState('')
  const [name1, setName1] = useState()
  const [lastName1, setLastName1] = useState()
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')

  const [seconds, setSeconds] = useState(30)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [ispass, setIsPass] = useState(false)
  const [btn, setBtn] = useState(true)
  const [btnLogin, setBtnLogin] = useState(false)
  const [btnRegister, setBtnRegister] = useState(false)
  const [resendcode, setresendcode] = useState(false)
  const [coundown, setCountdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [btnsetpass, setbtnsetpass] = useState(false)
  const [inputcode1, setinputcode1] = useState(false)
  const [btncode1, setbtncode1] = useState(false)
  const [setnewpass, setsetnewpass] = useState(false)
  const [btnnewpass, setbtnnewpass] = useState(false)

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleNewPassChange = (e) => {
    setnewpass1(e.target.value)
  }
  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleLnameChange = (e) => {
    setLastName(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLRefererChange = (e) => {
    setReferer(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      return input
    } else {
      Swal.fire({
        type: 'error',
        text: 'لطفا شماره تماس را درست وارد کنید',
        confirmbuttonText: 'فهمیدم',
      })
      return false
    }
  }
  const handleCountDown = useCallback(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      setCountdown(false)
      setresendcode(true)
      setTimeout(() => {
        setLoading1(false)
      }, 4000)
    }
  }, [seconds])
  const foregtpass = (e) => {
    e.preventDefault()
    setBtnLogin(false)
    setIsPass(false)
    setbtnsetpass(false)
    setbtncode1(true)
    handleCountDown()
    setCountdown(true)
    setinputcode1(true)
    e.preventDefault()

    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_forgetPassword?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {})
      .catch((error) => {
        console.error(error)
      })
  }
  const resendCode = (e) => {
    e.preventDefault()
    setLoading1(true)
    setTimeout(() => {
      setCountdown(true)
      setresendcode(false)
      setSeconds(30)
    }, 1000)

    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return

    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_forgetPassword?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            type: 'success',
            text: 'کد تایید ارسال شد',
            confirmbuttonText: 'فهمیدم',
          })
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
            confirmbuttonText: 'فهمیدم',
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const sendCode1 = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmbuttonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_codeValidate?token=test',
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone === true) {
            Swal.fire({
              type: 'success',
              text: 'کد درست است ',
            })
            setCountdown(false)
            setinputcode1(false)
            setsetnewpass(true)
            setbtnnewpass(true)
            setbtncode1(false)
            setresendcode(false)
            // getIndividualInfo(e)
            // setLoading(false)
            // Swal.fire({
            //   type: 'success',
            //   text: 'به نگانون خوش آمدید',
            //   confirmbuttonText: 'فهمیدم',
            // })
            // loginModalClose()
            // setLoading(false)
          } else {
            Swal.fire({
              type: 'error',
              text: response.data.data,
              confirmbuttonText: 'فهمیدم',
            })
          }

          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const handleKeyDownSendCode1 = (event) => {
    if (event.key === 'Enter') {
      sendCode1(event)
    }
  }
  const setNewpassword = (e) => {
    e.preventDefault()
    setLoading(true)
    if (newpass1 === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } else {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_setPassword?token=test',
          {
            mobile: phone,
            password: newpass1,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone === true) {
            getIndividualInfo(e)
            Swal.fire({
              type: 'success',
              text: ' به نگانون خوش آمدید, رمز جدید با موفقیت ثبت شد',
            })
            getIndividualInfo(e)
          }

          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const handleKeyDownSetNewpassword = (event) => {
    if (event.key === 'Enter') {
      setNewpassword(event)
    }
  }
  const sendMobile = (e) => {
    e.preventDefault()
    validateMobilephone(phone)
    if (validateMobilephone(phone) === false) return
    setLoading(true)
    axios
      .post(
        mobileUrl,
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          if (response.data.data['status'] == '1') {
            setBtn(false)
            setBtnLogin(true)
            setIsPass(true)
            setbtnsetpass(true)
          } else {
            handleCountDown()
            setCountdown(true)
            setBtn(false)
            setBtnRegister(true)
            setIsCodeSent(true)
          }
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
            confirmbuttonText: 'فهمیدم',
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const handleKeyDownSendMobile = (event) => {
    if (event.key === 'Enter') {
      sendMobile(event)
    }
  }
  const sendCode = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmbuttonText: 'فهمیدم',
        showConfirmbutton: false,
        showClosebutton: true,
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_codeValidate?token=test',
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            setIsCodeSent(true)

            if (response.data.isDone === true) {
              // buyModalClose()
              RegisterShow()
            } else {
              Swal.fire({
                type: 'error',
                text: response.data.data['message'],
                confirmbuttonText: 'فهمیدم',
              })
            }
          } else {
            Swal.fire({
              type: 'error',
              text: 'دوباره تلاش کنید',
              confirmbuttonText: 'فهمیدم',
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const handleKeyDownSendCode = (event) => {
    if (event.key === 'Enter') {
      sendCode(event)
    }
  }
  const Register = (e) => {
    e.preventDefault()
    setLoading(true)
    if (name === '' || lastName === '' || gender === '' || password === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmbuttonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          registerUrl,
          {
            fname: name,
            lname: lastName,
            mobile: phone,
            referrer: Referer,
            gender: gender,
            password: password,
            // code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )
        .then((response) => {
          if (response.data.isDone) {
            Swal.fire({
              type: 'success',
              text: 'به نگانون خوش آمدید',
              confirmbuttonText: 'فهمیدم',
            })
            getIndividualInfo(e)
            setIsCodeSent(true)
            setLoading(false)
            RegisterClose()
            loginModalClose()
          } else {
            Swal.fire({
              type: 'error',
              text: 'کد معرف نامعتبر',
              confirmbuttonText: 'فهمیدم',
            })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const handleKeyDownRegister = (event) => {
    if (event.key === 'Enter') {
      Register(event)
    }
  }
  const sendPass = (e) => {
    e.preventDefault()
    setLoading(true)
    if (code === '') {
      Swal.fire({
        type: 'error',
        text: 'تمام فیلد ها پر شود',
        confirmbuttonText: 'فهمیدم',
        onAfterClose: () => {
          setLoading(false)
        },
      })
    } else {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_login?token=test',
          {
            mobile: phone,
            code: code,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setLoading(false)
          if (response.data.isDone) {
            getIndividualInfo(e)
            setLoading(false)
            Swal.fire({
              type: 'success',
              text: 'به نگانون خوش آمدید',
              confirmbuttonText: 'فهمیدم',
              onAfterClose: () => {
                loginModalClose()
                setLoading(false)
              },
            })
          } else {
            Swal.fire({
              type: 'error',
              text: response.data.data,
              confirmbuttonText: 'فهمیدم',
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const handleKeyDownSendPass = (event) => {
    if (event.key === 'Enter') {
      sendPass(event)
    }
  }
  const getIndividualInfo = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_getCustomerInfo?token=test',
        {
          mobile: phone,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          handleCookie(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    if (isCodeSent) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
    if (inputcode1) {
      const timerID = setInterval(() => handleCountDown(), 1000)
      return () => clearInterval(timerID)
    }
  }, [handleCountDown, isCodeSent, inputcode1])

  return (
    <>
      <Modal show={loginModal} onHide={loginModalClose} size={'lg'}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title style={{ fontWeight: 'bolder', borderBottom: 'none' }}>
            ورود
          </Modal.Title>
        </Modal.Header>
        <div className='btn-modal'>
          <button
            onClick={loginModalClose}
            style={{
              border: 'none',
              borderRadius: '15px',
              fontSize: '12px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              boxShadow: 'inset -1px -2px 11px -5px rgba(0 0 0/50%)',
            }}
            className='mx-2'
          >
            بازگشت
          </button>
          <LinkContainer
            style={{
              border: 'none',
              borderRadius: '15px',
              fontSize: '12px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              boxShadow: 'inset -1px -2px 11px -5px rgba(0 0 0/50%)',
            }}
            className='mx-2'
            to='/'
          >
            <button onClick={loginModalClose}>خانه</button>
          </LinkContainer>
        </div>
        <Modal.Body style={{ width: '50%', margin: 'auto' }}>
          <Grow
            in={loginModal}
            timeout={500}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-2' style={{ justifyContent: 'center' }}>
              <input
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDownSendMobile}
                value={phone}
                required
                className=' select'
                pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                type='text'
                title='Ten digits code'
                placeHolder='09** *** ** **'
                style={{
                  textAlign: 'left',
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',
                  height: '40px',
                  width: '100%',
                  outline: 'none',
                  background: 'white',
                }}
              />
            </div>
          </Grow>

          {isCodeSent ? (
            <>
              <Grow
                in={isCodeSent}
                timeout={500}
                style={{ transformOrigin: '0 0 0' }}
              >
                <div
                  className='row mx-0 mt-5'
                  style={{ justifyContent: 'center' }}
                >
                  <input
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDownSendCode}
                    value={code}
                    required
                    className=' select'
                    type='text'
                    title='Ten digits code'
                    placeHolder='کد تایید'
                    style={{
                      textAlign: 'left',
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      width: '100%',
                      outline: 'none',
                      background: 'white',
                    }}
                  />
                </div>
              </Grow>
            </>
          ) : null}

          {ispass ? (
            <>
              <Grow
                in={ispass}
                timeout={500}
                style={{ transformOrigin: '0 0 0' }}
              >
                <div
                  className='row mx-0 mt-5'
                  style={{ justifyContent: 'center' }}
                >
                  <input
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDownSendPass}
                    value={code}
                    required
                    className=' select'
                    type='password'
                    title='Ten digits code'
                    placeHolder='رمز عبور'
                    style={{
                      textAlign: 'left',
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      outline: 'none',
                      width: '100%',
                      background: 'white',
                    }}
                  />
                </div>
              </Grow>
            </>
          ) : null}

          {inputcode1 ? (
            <>
              <Grow
                in={inputcode1}
                timeout={500}
                style={{ transformOrigin: '0 0 0' }}
              >
                <div
                  className='row mx-0 mt-5'
                  style={{ justifyContent: 'center' }}
                >
                  <input
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDownSendCode1}
                    value={code}
                    required
                    className=' select'
                    type='text'
                    title='Ten digits code'
                    placeHolder='کد تایید'
                    style={{
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      width: '100%',
                      outline: 'none',
                      background: 'white',
                      textAlign: 'left',
                    }}
                  />
                </div>
              </Grow>
            </>
          ) : null}

          {setnewpass ? (
            <>
              <Grow
                in={setnewpass}
                timeout={500}
                style={{ transformOrigin: '0 0 0' }}
              >
                <div
                  className='row mx-0 mt-5'
                  style={{ justifyContent: 'center' }}
                >
                  <input
                    onChange={handleNewPassChange}
                    onKeyDown={handleKeyDownSetNewpassword}
                    value={newpass1}
                    required
                    className=' select'
                    type='password'
                    title='Ten digits code'
                    placeHolder='رمز عبور جدید'
                    style={{
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      width: '100%',
                      outline: 'none',
                      background: 'white',
                      textAlign: 'left',
                    }}
                  />
                </div>
              </Grow>
            </>
          ) : null}

          <div className='d-flex justify-content-between mt-4'>
            {resendcode ? (
              <button
                variant=' my-3 mr-3 '
                className='login-btn'
                onClick={resendCode}
              >
                {!loading1 ? 'ارسال مجدد کد' : <Loading />}
              </button>
            ) : null}
            {coundown ? (
              <p className='text-left mt-auto'>
                {`${
                  seconds !== 0
                    ? `${seconds}   ثانیه در ارسال مجدد کد تائید  `
                    : ` ارسال مجدد کد تایید`
                }`}
              </p>
            ) : null}
          </div>

          <div className='d-flex justify-content-between mt-4'>
            {btnsetpass ? (
              <button
                variant=' my-3 mr-3 '
                className='login-btn'
                onClick={foregtpass}
              >
                فراموشی رمز
              </button>
            ) : null}
            {/* {coundown ? (
              <p className='text-left mt-auto'>
                {`${
                  seconds !== 0
                    ? `${seconds}   ثانیه در ارسال مجدد کد تائید  `
                    : ` ارسال مجدد کد تایید`
                }`}
              </p>
            ) : null} */}
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          {btn ? (
            <button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendMobile}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}

          {btnRegister ? (
            <button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendCode}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}

          {btnLogin ? (
            <button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendPass}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}
          {btncode1 ? (
            <button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendCode1}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}

          {btnnewpass ? (
            <button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={setNewpassword}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </button>
          ) : null}
        </Modal.Footer>
      </Modal>
      <Modal show={registerModal} onHide={RegisterClose} size={'lg'}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title style={{ fontWeight: 'bolder', borderBottom: 'none' }}>
            ثبت نام
          </Modal.Title>
        </Modal.Header>
        <div className='btn-modal'>
          <button
            onClick={loginModalClose}
            style={{
              border: 'none',
              borderRadius: '15px',
              fontSize: '12px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              boxShadow: 'inset -1px -2px 11px -5px rgba(0 0 0/50%)',
            }}
            className='mx-2'
          >
            بازگشت
          </button>
          <LinkContainer
            style={{
              border: 'none',
              borderRadius: '15px',
              fontSize: '12px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              boxShadow: 'inset -1px -2px 11px -5px rgba(0 0 0/50%)',
            }}
            className='mx-2'
            to='/'
          >
            <button onClick={loginModalClose}>خانه</button>
          </LinkContainer>
        </div>
        <Modal.Body style={{ direction: 'rtl', textAlign: 'right' }}>
          <Grow
            in={registerModal}
            timeout={500}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 '>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label for='name' style={{ direction: 'ltr', width: '35%' }}>
                  {' '}
                  : نام و نام خانوادگی
                </label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  required
                  className='col-9 mt-3 mx-1'
                  id='name'
                  type='text'
                  placeHolder='نام و نام خانوادگی'
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label for='names' style={{ direction: 'rtl', width: '35%' }}>
                  {' '}
                  نام سازمان یا شرکت :
                </label>
                <input
                  onChange={handleLnameChange}
                  value={lastName}
                  required
                  className='col-9 mt-3 mx-1'
                  id='names'
                  type='text'
                  placeHolder='  نام سازمان یا شرکت '
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label
                  for='nameSemat'
                  style={{ direction: 'rtl', width: '35%' }}
                >
                  {' '}
                  سمت شما :
                </label>
                <input
                  onChange={handleLnameChange}
                  value={lastName}
                  required
                  className='col-9 mt-3 mx-1'
                  id='nameSemat'
                  type='text'
                  placeHolder=' سمت شما '
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label for='pass' style={{ direction: 'rtl', width: '35%' }}>
                  {' '}
                  رمز عبور :
                </label>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  required
                  className='col-9 mt-3 mx-1'
                  id='pass'
                  type='text'
                  placeHolder='رمز عبور '
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label for='state' style={{ direction: 'rtl', width: '35%' }}>
                  {' '}
                  استان :
                </label>
                <input
                  onChange={handleLnameChange}
                  value={lastName}
                  required
                  className='col-9 mt-3 mx-1'
                  id='state'
                  type='text'
                  placeHolder=' استان'
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
              <div className='col-lg-6 col-md-5 col-sm-10 col-10'>
                <label for='city' style={{ direction: 'rtl', width: '35%' }}>
                  {' '}
                  شهر :
                </label>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  required
                  className='col-9 mt-3 mx-1'
                  id='city'
                  type='text'
                  placeHolder='شهر'
                  style={{
                    borderRadius: '0.45rem',
                    border: '1px solid #0000004f',
                    height: '40px',
                    width: '55%',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                  }}
                />
              </div>
            </div>
          </Grow>
        </Modal.Body>
        <Modal.Footer className='justify-content-center my-4'>
          <button
            variant=' my-3 mr-3 '
            className='login-btn'
            onClick={Register}
          >
            {!loading ? 'ورود/ثبت نام' : <Loading />}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login
