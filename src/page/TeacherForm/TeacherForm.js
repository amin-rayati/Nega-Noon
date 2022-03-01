import { React, useState } from 'react'
import Dropzone from 'react-dropzone'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import validator from 'validator'
import Date from '../../component/DatePicker/DatePicker'
const AskDore = () => {
  const [showState, setShowState] = useState(false)
  const [value, setValue] = useState('female')
  const handleChange = (event) => {
    setValue(event.target.value)
    if (event.target.value === 'state') {
      setShowState(true)
    } else {
      setShowState(false)
    }
  }

  const [Loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [profileImg, setProfileImg] = useState([])

  const [name, setName] = useState('')
  const [nameReq, setNameReq] = useState(false)
  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 4) {
      setNameReq(false)
    }
  }

  const [birth, setBirth] = useState('')
  const [birthReq, setBirthReq] = useState(false)
  const handleBirthChange = (e) => {
    setBirth(document.getElementsByClassName('datepicker-input')[0].value)
  }

  const [nationCode, setNationCode] = useState('')
  const [nationCodeReq, setNationCodeReq] = useState(false)
  const handleNationCodeChange = (e) => {
    setNationCode(e.target.value)
    if (e.target.value.length > 10) {
      setNationCodeReq(false)
    }
  }

  const [regin, setRegin] = useState('')
  const [reginReq, setReginReq] = useState(false)
  const handleReginChange = (e) => {
    setRegin(e.target.value)
    if (e.target.value.length > 4) {
      setReginReq(false)
    }
  }

  const [state, setState] = useState('')
  const [stateReq, setStateReq] = useState(false)
  const handleStateChange = (e) => {
    setState(e.target.value)
    if (e.target.value.length > 10) {
      setStateReq(true)
    }
  }

  const [city, setCity] = useState('')
  const [cityReq, setCityReq] = useState(false)
  const handleCityChange = (e) => {
    setCity(e.target.value)
    if (e.target.value.length > 10) {
      setCityReq(true)
    }
  }

  const [phone, setPhone] = useState('')
  const [phoneReq, setPhoneReq] = useState(false)
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
    if (e.target.value.length > 10) {
      setPhoneReq(true)
    }
  }

  const [tell, setTell] = useState('')
  const [tellReq, setTellReq] = useState(false)
  const handleTellChange = (e) => {
    setTell(e.target.value)
    if (e.target.value.length > 10) {
      setTellReq(true)
    }
  }

  const [major, setMajor] = useState('')
  const [majorReq, setMajorReq] = useState(false)
  const handleMajorChange = (e) => {
    setMajor(e.target.value)
    if (e.target.value.length > 5) {
      setMajorReq(true)
    }
  }

  const [uni, setUni] = useState('')
  const [uniReq, setUniReq] = useState(false)
  const handleUniChange = (e) => {
    setUni(e.target.value)
    if (e.target.value.length > 5) {
      setUniReq(true)
    }
  }

  const [maqta, setMaqta] = useState('')
  const [maqtaReq, setMataReq] = useState(false)
  const handleMaqtaChange = (e) => {
    setMaqta(e.target.value)
    if (e.target.value.length > 5) {
      setMataReq(true)
    }
  }

  const [sabeqe, setSabeqe] = useState('')
  const [sabeqeReq, setSabeqeReq] = useState(false)
  const handleSabeqeChange = (e) => {
    setSabeqe(e.target.value)
    if (e.target.value.length > 5) {
      setSabeqeReq(true)
    }
  }

  const [desc, setDesc] = useState('')
  const [descReq, setDescReq] = useState(false)
  const handleDescChange = (e) => {
    setDesc(e.target.value)
    if (e.target.value.length > 5) {
      setDescReq(true)
    }
  }

  const [file, setFile] = useState('')
  const [fileReq, setFileReq] = useState(false)
  const handleFileChange = (e) => {
    setFile(e.target.value)
    if (e.target.value.length > 5) {
      setFileReq(true)
    }
  }

  const [cityPlace, setCityPlace] = useState('')
  const [cityPlaceReq, setCityPlaceReq] = useState(false)
  const handleCityPlaceChange = (e) => {
    setCityPlace(e.target.value)
    if (e.target.value.length > 5) {
      setCityPlaceReq(true)
    }
  }

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

  const submit = () => {
    if (name.length < 5) {
      setNameReq(true)
      return
    }

    if (nationCode.length < 11) {
      setNationCodeReq(true)
      return
    }
    if (regin.length < 5) {
      setReginReq(true)
      return
    }
    if (state.length < 5) {
      setStateReq(true)
      return
    }
    if (city.length < 5) {
      setCityReq(true)
      return
    }
    if (phone.length < 10) {
      setPhoneReq(true)
      return
    }
    if (tell.length < 10) {
      setTellReq(true)
      return
    }
    if (major.length < 5) {
      setMajorReq(true)
      return
    }
    if (maqta.length < 5) {
      setMaqta(true)
      return
    }
    if (uni.length < 5) {
      setUniReq(true)
      return
    }
    if (sabeqe.length < 5) {
      setSabeqeReq(true)
      return
    }
    if (desc.length < 5) {
      setDescReq(true)
      return
    }
  }

  return (
    <div>
      <div className='my-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>ثبت نام </h1>
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
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            ثبت نام مدرس
          </p>
        </div>
        <div
          className='row col-lg-8 col-md-12 col-sm-12 col-12 mx-auto my-5'
          style={{ justifyContent: 'center' }}
        >
          <div
            className='row my-2'
            style={{ width: '100%', justifyContent: 'end' }}
          >
            <div>
              <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                اطلاعات شخصی
              </p>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div className='row mt-3' style={{ textAlign: 'right' }}>
                  <label className='col-lg-3  col-md-12 col-sm-12 col-12 mt-3 '>
                    تاریخ تولد :
                  </label>

                  <div className='col-lg-8 col-md-12 col-sm-12 col-12 mx-1 mt-3'>
                    <Date onChange={handleBirthChange} />
                  </div>
                </div>
              </div>

              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '>
                    نام و نام خانوادگی :
                  </label>
                  <input
                    onChange={handleNameChange}
                    value={name}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='نام و نام خانوادگی'
                    style={
                      !nameReq
                        ? {
                            borderRadius: '10px',
                            border: '1px solid #0000004f',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '10px',
                            border: '1px solid #dc3545',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {nameReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا نام خود را وارد کنید
                  </h5>
                ) : null}
              </div>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    دین :
                  </label>
                  <input
                    onChange={handleReginChange}
                    value={regin}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='دین'
                    style={
                      !reginReq
                        ? {
                            borderRadius: '10px',
                            border: '1px solid #0000004f',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '10px',
                            border: '1px solid #dc3545',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {reginReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا دین خود را وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    کد ملی :
                  </label>
                  <input
                    onChange={handleNationCodeChange}
                    value={nationCode}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='کد ملی'
                    style={
                      !nationCodeReq
                        ? {
                            borderRadius: '10px',
                            border: '1px solid #0000004f',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '10px',
                            border: '1px solid #dc3545',
                            height: '50px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {nationCodeReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا کد ملی خود را وارد کنید
                  </h5>
                ) : null}
              </div>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    شهر :
                  </label>
                  <select
                    onChange={handleCityChange}
                    value={city}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    type='text'
                    placeHolder=''
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  >
                    <option key='1' value='عالی'>
                      کرج
                    </option>
                    <option key='2' value='متوسط'>
                      تهران
                    </option>
                    <option key='3' value='ضعیف'>
                      عظیمیه
                    </option>
                  </select>
                </div>
              </div>
              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    استان :
                  </label>
                  <select
                    onChange={handleStateChange}
                    value={state}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    type='text'
                    placeHolder=''
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  >
                    <option key='1' value='عالی'>
                      کرج
                    </option>
                    <option key='2' value='متوسط'>
                      تهران
                    </option>
                    <option key='3' value='ضعیف'>
                      عظیمیه
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    تلفن ثابت :
                  </label>
                  <input
                    onChange={handleTellChange}
                    value={tell}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='تلفن ثابت'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    شماره موبایل :
                  </label>
                  <input
                    onChange={handlePhoneChange}
                    value={phone}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='شماره موبایل'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    مقطع تحصیلی :
                  </label>
                  <input
                    onChange={handleMaqtaChange}
                    value={maqta}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='مقطع تحصیلی'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    رشته تحصیلی :
                  </label>
                  <input
                    onChange={handleMajorChange}
                    value={major}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='رشته تحصیلی'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    سابقه :
                  </label>
                  <input
                    onChange={handleSabeqeChange}
                    value={sabeqe}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='سابقه'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
              <div
                className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div style={{ textAlign: 'right' }}>
                  <label
                    for='email'
                    className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                  >
                    دانشگاه :
                  </label>
                  <input
                    onChange={handleUniChange}
                    value={uni}
                    required
                    className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                    id='email'
                    type='text'
                    placeHolder='دانشگاه'
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* sabeqe */}
            <div>
              <div className='row mt-5 text-center'>
                <p
                  className='col-6 '
                  style={{ fontWeight: 'bolder', fontSize: '19px' }}
                >
                  تسلط
                </p>
                <p
                  className='col-6 '
                  style={{ fontWeight: 'bolder', fontSize: '19px' }}
                >
                  مهارت
                </p>
              </div>
              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      1 :
                    </label>
                    <select
                      id='level1'
                      required
                      className='col-10 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    >
                      <option key='1' value='عالی'>
                        عالی
                      </option>
                      <option key='2' value='متوسط'>
                        متوسط
                      </option>
                      <option key='3' value='ضعیف'>
                        ضعیف
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      1 :
                    </label>
                    <input
                      required
                      className='col-10 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      2 :
                    </label>
                    <select
                      id='level2'
                      required
                      className='col-10 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    >
                      <option key='1' value='عالی'>
                        عالی
                      </option>
                      <option key='2' value='متوسط'>
                        متوسط
                      </option>
                      <option key='3' value='ضعیف'>
                        ضعیف
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      2 :
                    </label>
                    <input
                      required
                      className='col-10 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      3 :
                    </label>
                    <select
                      id='level3'
                      required
                      className='col-10 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    >
                      <option key='1' value='عالی'>
                        عالی
                      </option>
                      <option key='2' value='متوسط'>
                        متوسط
                      </option>
                      <option key='3' value='ضعیف'>
                        ضعیف
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      3 :
                    </label>
                    <input
                      required
                      className='col-10 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      4 :
                    </label>
                    <select
                      id='level4'
                      required
                      className='col-10 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    >
                      <option key='1' value='عالی'>
                        عالی
                      </option>
                      <option key='2' value='متوسط'>
                        متوسط
                      </option>
                      <option key='3' value='ضعیف'>
                        ضعیف
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      for='email'
                      className='mt-3'
                      style={{ direction: 'rtl', width: '5%' }}
                    >
                      4 :
                    </label>
                    <input
                      required
                      className='col-10 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder=''
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #0000004f',
                        height: '50px',
                        outline: 'none',
                        background: 'white',
                        padding: '10px',
                        textAlign: 'right',
                        boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* sabeqe */}
          </div>

          <div className='my-3'>
            <div className='my-3'>
              <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                توضیح درمورد درس
              </p>
              <div style={{ textAlign: 'right' }}>
                <textarea
                  onChange={handleDescChange}
                  value={desc}
                  required
                  className='col-12 mt-3 mx-1'
                  type='text'
                  placeHolder=''
                  style={{
                    borderRadius: '10px',
                    border: '1px solid #0000004f',
                    height: '100px',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                    textAlign: 'right',
                    boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                  }}
                ></textarea>
              </div>
            </div>
          </div>

          <div
            className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
            style={{ direction: 'rtl' }}
          >
            <div className='my-3'>
              <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                آپلود تصویر
              </p>
              <Dropzone onDrop={onDrop} accept='image/png,image/jpeg,image/jpg'>
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
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                }}
                                alt='b'
                                src={URL.createObjectURL(e)}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>

          <div
            className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
            style={{ direction: 'rtl' }}
          >
            <div className='my-3'>
              <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                آپلود رزومه
              </p>
              <div style={{ textAlign: 'right' }}>
                <input
                  onChange={handleFileChange}
                  value={file}
                  required
                  className='col-12 mt-3 mx-1'
                  type='file'
                  placeHolder=''
                  style={{
                    borderRadius: '10px',
                    border: '1px solid #0000004f',
                    height: '50px',
                    outline: 'none',
                    background: 'white',
                    padding: '10px',
                    textAlign: 'right',
                    boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
            style={{ direction: 'rtl' }}
          >
            <div className='my-3'>
              <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                در چه مناطقی تمایل دارم تدریس کنم
              </p>
              <div style={{ textAlign: 'right' }}>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='all'
                    control={<Radio />}
                    label='کل کشور'
                    style={{ fontSize: '15px' }}
                  />
                  <FormControlLabel
                    value='state'
                    control={<Radio />}
                    style={{ fontSize: '15px' }}
                    label='شهر خود را انتخاب کنید'
                  />
                </RadioGroup>
                {showState ? (
                  <select
                    onChange={handleCityPlaceChange}
                    value={cityPlace}
                    required
                    className='col-10 mt-3 mx-1'
                    type='text'
                    placeHolder=''
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  >
                    <option key='1' value='عالی'>
                      کرج
                    </option>
                    <option key='2' value='متوسط'>
                      تهران
                    </option>
                    <option key='3' value='ضعیف'>
                      عظیمیه
                    </option>
                  </select>
                ) : null}
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className='my-5' style={{ textAlign: 'center' }}>
            <button
              onClick={submit}
              variant=' my-3 mr-3 '
              className='login-btn px-5 hover-item py-3'
            >
              ارسال پیام
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskDore
