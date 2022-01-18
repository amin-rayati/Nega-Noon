import { useState, useCallback, useEffect } from 'react'
import { Modal, ThemeProvider } from 'react-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Loading from '../Loading/LoginLoading'
import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap'
import { Cookies, useCookies } from 'react-cookie'
import Grow from '@mui/material/Grow'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
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
        confirmButtonText: 'فهمیدم',
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
            confirmButtonText: 'فهمیدم',
          })
        } else {
          Swal.fire({
            type: 'error',
            text: 'دوباره تلاش کنید',
            confirmButtonText: 'فهمیدم',
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
        confirmButtonText: 'فهمیدم',
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
            //   confirmButtonText: 'فهمیدم',
            // })
            // loginModalClose()
            // setLoading(false)
          } else {
            Swal.fire({
              type: 'error',
              text: response.data.data,
              confirmButtonText: 'فهمیدم',
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
            confirmButtonText: 'فهمیدم',
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
        confirmButtonText: 'فهمیدم',
        showConfirmButton: false,
        showCloseButton: true,
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
                confirmButtonText: 'فهمیدم',
              })
            }
          } else {
            Swal.fire({
              type: 'error',
              text: 'دوباره تلاش کنید',
              confirmButtonText: 'فهمیدم',
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
        confirmButtonText: 'فهمیدم',
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
              confirmButtonText: 'فهمیدم',
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
              confirmButtonText: 'فهمیدم',
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
        confirmButtonText: 'فهمیدم',
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
              confirmButtonText: 'فهمیدم',
              onAfterClose: () => {
                loginModalClose()
                setLoading(false)
              },
            })
          } else {
            Swal.fire({
              type: 'error',
              text: response.data.data,
              confirmButtonText: 'فهمیدم',
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
      <Modal show={loginModal} onHide={loginModalClose}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title style={{ fontWeight: 'bolder' }}>
            ورود به سایت
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grow
            in={loginModal}
            timeout={500}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-2'>
              <input
                onChange={handlePhoneChange}
                onKeyDown={handleKeyDownSendMobile}
                value={phone}
                required
                className=' select'
                pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                type='text'
                title='Ten digits code'
                placeHolder='شماره موبایل'
                style={{
                  textAlign: 'right',
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
                <div className='row mx-0 mt-5'>
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
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      width: '100%',
                      outline: 'none',
                      background: 'white',
                      textAlign: 'right',
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
                <div className='row mx-0 mt-5'>
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
                      borderRadius: '0.45rem',
                      border: '1px solid #0000004f',
                      height: '40px',
                      outline: 'none',
                      width: '100%',
                      background: 'white',
                      textAlign: 'right',
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
                <div className='row mx-0 mt-5'>
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
                      textAlign: 'right',
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
                <div className='row mx-0 mt-5'>
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
                      textAlign: 'right',
                    }}
                  />
                </div>
              </Grow>
            </>
          ) : null}

          <div className='d-flex justify-content-between mt-4'>
            {resendcode ? (
              <Button
                variant=' my-3 mr-3 '
                className='login-btn '
                onClick={resendCode}
              >
                {!loading1 ? 'ارسال مجدد کد' : <Loading />}
              </Button>
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
              <Button
                variant=' my-3 mr-3 '
                className='login-btn'
                onClick={foregtpass}
              >
                فراموشی رمز
              </Button>
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
            <Button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendMobile}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </Button>
          ) : null}

          {btnRegister ? (
            <Button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendCode}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </Button>
          ) : null}

          {btnLogin ? (
            <Button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendPass}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </Button>
          ) : null}
          {btncode1 ? (
            <Button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={sendCode1}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </Button>
          ) : null}

          {btnnewpass ? (
            <Button
              variant=' my-3 mr-3 '
              className='login-btn px-3 hover-item p-2'
              onClick={setNewpassword}
            >
              {!loading ? 'ورود/ثبت نام' : <Loading />}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
      <Modal show={registerModal} onHide={RegisterClose}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title>ثبت نام</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ direction: 'rtl', textAlign: 'right' }}>
          <Grow
            in={registerModal}
            timeout={500}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 '>
              <input
                onChange={handleNameChange}
                value={name}
                required
                className='col-9 mt-3'
                id='name'
                type='text'
                placeHolder='نام'
                style={{
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

          <Grow
            in={registerModal}
            timeout={700}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-2'>
              <input
                onChange={handleLnameChange}
                value={lastName}
                required
                className='col-9 mt-3'
                id='lastname'
                type='text'
                placeHolder='نام خانوادگی'
                style={{
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

          <Grow
            in={registerModal}
            timeout={900}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-2'>
              <input
                onChange={handlePasswordChange}
                value={password}
                required
                className='col-9 mt-3'
                id='lastname'
                type='text'
                placeHolder='رمز عبور'
                style={{
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

          <Grow
            in={registerModal}
            timeout={1100}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-2'>
              <input
                onChange={handleLRefererChange}
                value={Referer}
                required
                className='col-9 mt-3'
                id='lastname'
                type='text'
                placeHolder='کد معرف'
                style={{
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

          <Grow
            in={registerModal}
            timeout={1300}
            style={{ transformOrigin: '0 0 0' }}
          >
            <div className='row mx-0 mt-4' style={{ textAlign: 'end' }}>
              <div
                className='col-3 my-auto  text-right'
                style={{ textAlign: 'right' }}
              >
                <label>جنسیت :</label>
              </div>
              <div className='row col-7 col-lg-9 col-md-8 col-sm-8  '>
                <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                  <label
                    className='fontsize-sm '
                    style={{ marginLeft: '15px' }}
                  >
                    خانم
                  </label>
                  <input
                    onChange={handleGenderChange}
                    value={gender}
                    required
                    type='radio'
                    name='sex'
                    className='sex text-start'
                    value='2'
                    style={{ textAlign: 'end' }}
                  />
                </div>
                <div className='col-6 col-lg-6 col-md-6 col-sm-6 text-right'>
                  <label
                    className='fontsize-sm '
                    style={{ marginLeft: '15px' }}
                  >
                    اقا
                  </label>
                  <input
                    onChange={handleGenderChange}
                    value={gender}
                    required
                    type='radio'
                    name='sex'
                    className='sex text-start'
                    value='1'
                    style={{ textAlign: 'end' }}
                  />
                </div>
              </div>
            </div>
          </Grow>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button
            variant=' my-3 mr-3 '
            className='login-btn'
            onClick={Register}
          >
            {!loading ? 'ورود/ثبت نام' : <Loading />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login
