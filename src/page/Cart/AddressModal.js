import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Loading from '../../component/Loading/Loading'
import { useProjectContext } from '../../context/ProjectProvider'
import { useCookies } from 'react-cookie'
import { BsPlus } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import MyMap from '../../component/MyMap'
import EditMap from '../../component/EditMap'
import Swal from 'sweetalert2'
import Loader from '../../component/Loading/LoginLoading'

export const AddressModal = () => {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'stateid',
  ])

  const [singleAdd, setSingleAdd] = useState('')
  const [loading, setloading] = useState(false)
  const [activeAddress, setActiveAddress] = useState('')
  const [regions, setRegions] = useState('')
  const [addressTitle, setAddressTitle] = useState('')
  const [addressTitleRequire, setAddressTitleRequire] = useState(false)
  const [fullAddress, setFullAddress] = useState('')
  const [fullAddressRequire, setFullAddressRequire] = useState(false)
  const [mainStreet, setMainStreet] = useState('')
  const [mainStreetRequire, setMainStreetRequire] = useState(false)
  const [alley, setAlley] = useState('')
  const [alleyRequire, setAlleyRequire] = useState(false)

  const [addressIdEdit, setAddIdEdit] = useState('')
  const [addressLatEdit, setAddLatEdit] = useState('')
  const [addressLongEdit, setAddLongEdit] = useState('')
  const [addressTitleEdit, setAddressTitleEdit] = useState('')
  const [fullAddressEdit, setFullAddressEdit] = useState('')
  const [mainStreetEdit, setMainStreetEdit] = useState('')
  const [alleyEdit, setAlleyEdit] = useState('')
  const [addressTitleEditRequire, setAddressTitleEditRequire] = useState(false)
  const [fullAddressEditRequire, setFullAddressEditRequire] = useState(false)
  const [mainStreetEditRequire, setMainStreetEditRequire] = useState(false)
  const [alleyEditRequire, setAlleyEditRequire] = useState(false)

  const {
    editModal,
    editModalClose,
    editModalOpen,
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
    userData,
    customerPosition,
  } = useProjectContext()

  const handleAddressTitleChange = (e) => {
    setAddressTitle(e.target.value)
    if (e.target.value.length > 4) {
      setAddressTitleRequire(false)
    }
  }
  const handleFullAddressChange = (e) => {
    setFullAddress(e.target.value)
    if (e.target.value.length > 10) {
      setFullAddressRequire(false)
    }
  }
  const handleMainStreetChange = (e) => {
    setMainStreet(e.target.value)
    if (e.target.value.length > 4) {
      setMainStreetRequire(false)
    }
  }
  const handleAlleyChange = (e) => {
    setAlley(e.target.value)
    if (e.target.value.length > 4) {
      setAlleyRequire(false)
    }
  }

  const handleAddressTitleEditChange = (e) => {
    setAddressTitleEdit(e.target.value)
    if (e.target.value.length > 4) {
      setAddressTitleEditRequire(false)
    }
  }
  const handleFullAddressEditChange = (e) => {
    setFullAddressEdit(e.target.value)
    if (e.target.value.length > 10) {
      setFullAddressEditRequire(false)
    }
  }
  const handleMainStreetEditChange = (e) => {
    setMainStreetEdit(e.target.value)
    if (e.target.value.length > 4) {
      setMainStreetEditRequire(false)
    }
  }
  const handleAlleyEditChange = (e) => {
    setAlleyEdit(e.target.value)
    if (e.target.value.length > 4) {
      setAlleyEditRequire(false)
    }
  }

  const selectAddress = (address) => {
    setSelectedAddress(address)
    setActiveAddress(address['customer_address_id'])
    setTimeout(() => {
      closeAddressModal()
    }, 300)
  }
  const handleModal = () => {
    MapModalOpen()
    closeAddressModal()
  }
  const changeAddress = () => {
    if (userData) {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Customers/API/_CustomerAddress?token=test',
          {
            customerId: userData.customerId,
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          setAddressList(response.data.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const getRegions = () => {
    if (userData) {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Districts/API/_apiGetRegions?token=test',
          {
            cityId: cookiesCityid['cityid'],
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone) {
            setRegions(response.data.data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const deleteAdd = (id) => {
    Swal.fire({
      title: `ایا میخواهید ادرس مورد نظر را پاک کنید`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8334',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    }).then((result) => {
      if (result.value) {
        axios
          .post(
            'https://meyt.neganoon.ir/admin/CustomerAddresses/API/_deleteAddress?token=test',
            {
              customerAddressId: id,
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
                title: 'ادرس شما با موفقیت پاک شد',
              })
              closeAddressModal()
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    })
  }
  const geteditAddInfo = (id) => {
    axios
      .post(
        'https://meyt.neganoon.ir/admin/CustomerAddresses/API/_singleAddress?token=test',
        {
          addressId: id,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.data.isDone) {
          setSingleAdd(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const editAddModal = () => {
    editModalOpen()
  }
  const editAddress = () => {
    if (addressTitleEdit.length < 3) {
      setAddressTitleEditRequire(true)
      return
    }
    if (fullAddressEdit.length < 10) {
      setFullAddressEditRequire(true)
      return
    }
    if (mainStreetEdit.length < 3) {
      setMainStreetEditRequire(true)
      return
    }
    if (alleyEdit.length < 3) {
      setAlleyEditRequire(true)
      return
    }
    if (userData) {
      setloading(true)
      axios
        .post(
          'https://meyt.neganoon.ir/admin/CustomerAddresses/API/_editAddress?token=test',
          {
            customerAddressId: addressIdEdit,
            districtId: document.getElementById('catEdit').value,
            mainStreet: mainStreetEdit,
            addressName: addressTitleEdit,
            alley: alleyEdit,
            fullAddress: fullAddressEdit,
            latitude: customerPosition['lat'],
            longitude: customerPosition['lng'],
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone) {
            setloading(false)
            Swal.fire({
              type: 'success',
              title: 'آدرس شما با موفقیت ویرایش شد',
            })
            editModalClose()
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const AddAddress = () => {
    if (addressTitle.length < 3) {
      setAddressTitleRequire(true)
      return
    }
    if (fullAddress.length < 10) {
      setFullAddressRequire(true)
      return
    }
    if (mainStreet.length < 3) {
      setMainStreetRequire(true)
      return
    }
    if (alley.length < 3) {
      setAlleyRequire(true)
      return
    }
    if (userData) {
      setloading(true)
      axios
        .post(
          'https://meyt.neganoon.ir/admin/CustomerAddresses/API/_addAddress?token=test',
          {
            customer_id: userData.customerId,
            stateId: cookiesStateid['stateid'],
            cityId: cookiesCityid['cityid'],
            districtId: document.getElementById('cat').value,
            mainStreet: mainStreet,
            addressName: addressTitle,
            alley: alley,
            fullAddress: fullAddress,
            latitude: customerPosition['lat'],
            longitude: customerPosition['lng'],
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone) {
            setloading(false)
            Swal.fire({
              type: 'success',
              title: 'آدرس شما با موفقیت ثبت شد',
            })
            MapModalClose()
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  useEffect(() => {
    changeAddress()
    getRegions()
  }, [addressModal, editModal])

  useEffect(() => {
    if (singleAdd) {
      setFullAddressEdit(singleAdd['full'])
      setAddressTitleEdit(singleAdd['addressName'])
      setMainStreetEdit(singleAdd['mainStreet'])
      setAlleyEdit(singleAdd['alley'])
      setAddIdEdit(singleAdd['customer_address_id'])
      setAddLatEdit(singleAdd['latitude'])
      setAddLongEdit(singleAdd['longitude'])
    }
  }, [singleAdd])

  return (
    <>
      <Modal show={addressModal} onHide={closeAddressModal} size='md'>
        <Modal.Body>
          {addressList ? (
            <>
              <Modal.Title
                className='col-12'
                style={{ fontWeight: 'bolder', textAlign: 'center' }}
              >
                <div
                  className='d-flex'
                  style={{
                    borderRadius: '10px',
                    background: '#ff8334',
                    color: 'white',
                    padding: '10px 15px 10px 15px',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ marginLeft: '5px' }}>انتخاب آدرس</span>
                </div>
              </Modal.Title>
              <div className='col-12 mt-3' style={{ margin: 'auto' }}>
                {addressList ? (
                  addressList.map((e) => {
                    return (
                      <>
                        <div
                          className='d-flex'
                          style={{ justifyContent: 'center' }}
                        >
                          <div
                            style={{
                              background: 'white',
                              border: '1px solid #c9c1c1',
                              borderRadius: '10px  0 0 10px',
                              marginTop: '16px',
                              width: '20%',
                              textAlign: 'center',
                              borderRight: 'none',
                            }}
                          >
                            <div
                              className='flex-column'
                              style={{
                                marginTop: '13px',
                              }}
                            >
                              <FiEdit
                                onClick={() => {
                                  editAddModal(e.customer_address_id)
                                  geteditAddInfo(e.customer_address_id)
                                }}
                                style={{ color: '#FFB135', cursor: 'pointer' }}
                                size={25}
                              />
                              <MdDeleteForever
                                onClick={() => deleteAdd(e.customer_address_id)}
                                style={{ color: '#AB0C0C', cursor: 'pointer' }}
                                size={25}
                              />
                              {activeAddress === e['customer_address_id'] ? (
                                <AiFillCheckCircle
                                  onClick={() => selectAddress(e)}
                                  style={{ color: 'green', cursor: 'pointer' }}
                                  size={25}
                                />
                              ) : (
                                <AiOutlineCheckCircle
                                  onClick={() => selectAddress(e)}
                                  style={{ color: 'green', cursor: 'pointer' }}
                                  size={25}
                                />
                              )}
                            </div>
                          </div>

                          <div
                            onClick={() => selectAddress(e)}
                            className='mt-3 d-flex'
                            style={{
                              cursor: 'pointer',
                              borderRadius: '0 10px 10px 0',
                              background: 'white',
                              border: '1px solid #c9c1c1',
                              color: 'balck',
                              padding: '20px 15px 20px 15px',
                              textAlign: 'center',
                              justifyContent: 'center',
                              width: '80%',
                              borderLeft: 'none',
                              lineBreak: 'anywhere',
                            }}
                          >
                            <span
                              style={
                                activeAddress === e['customer_address_id']
                                  ? {
                                      fontWeight: 'bold',
                                      fontSize: '12px',
                                      color: 'black',
                                    }
                                  : {
                                      fontWeight: 'small',
                                      fontSize: '10px',
                                      color: 'black',
                                    }
                              }
                            >
                              {e['full']}
                            </span>
                          </div>
                        </div>
                      </>
                    )
                  })
                ) : (
                  <Loading />
                )}

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      handleModal()
                    }}
                    className='address-btn px-3'
                  >
                    <BsPlus className='mx-1' />
                    افزودن ادرس
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={mapModal} onHide={MapModalClose} size='md'>
        <Modal.Body>
          <Modal.Title
            className='col-12'
            style={{ fontWeight: 'bolder', textAlign: 'center' }}
          >
            <div
              className='d-flex'
              style={{
                borderRadius: '10px 10px 0 0',
                background: '#ff8334',
                color: 'white',
                padding: '10px 15px 10px 15px',
                justifyContent: 'center',
              }}
            >
              <span style={{ marginLeft: '5px' }}> تکمیل اطلاعات</span>
            </div>

            <MyMap />
            <div className='row mt-3'>
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>منطقه</h6>
                </label>
              </div>
              <div>
                <select
                  id='cat'
                  className=' form-input my-3'
                  placeholder='دسته بندی'
                  type='text'
                  title='Ten digits code'
                >
                  <option disabled>نوع درخواست</option>
                  {regions &&
                    regions.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.districtName}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>عنوان آدرس</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleAddressTitleChange}
                  value={addressTitle}
                  required
                  className={
                    addressTitleRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {addressTitleRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا عنوان آدرس خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>آدرس کامل</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleFullAddressChange}
                  value={fullAddress}
                  required
                  className={
                    fullAddressRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {fullAddressRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا آدرس خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>خیابان اصلی</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleMainStreetChange}
                  value={mainStreet}
                  required
                  className={
                    mainStreetRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {mainStreetRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا نام خیابان اصلی خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>خیابان فرعی</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleAlleyChange}
                  value={alley}
                  required
                  className={
                    alleyRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {alleyRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا نام خیابان فرعی خود را وارد کنید
                </h5>
              ) : null}
            </div>
            <div className='mt-3'>
              <button onClick={AddAddress} className='btn-send-address'>
                {loading ? <Loader /> : 'تایید و ساخت آدرس'}
              </button>
            </div>
          </Modal.Title>
        </Modal.Body>
      </Modal>
      <Modal show={editModal} onHide={editModalClose} size='md'>
        <Modal.Body>
          <Modal.Title
            className='col-12'
            style={{ fontWeight: 'bolder', textAlign: 'center' }}
          >
            <div
              className='d-flex'
              style={{
                borderRadius: '10px 10px 0 0',
                background: '#ff8334',
                color: 'white',
                padding: '10px 15px 10px 15px',
                justifyContent: 'center',
              }}
            >
              <span style={{ marginLeft: '5px' }}> تکمیل اطلاعات</span>
            </div>

            {singleAdd ? (
              <EditMap lat={addressLatEdit} long={addressLongEdit} />
            ) : null}
            <div className='row mt-3'>
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>منطقه</h6>
                </label>
              </div>
              <div>
                <select
                  id='catEdit'
                  className=' form-input my-3'
                  placeholder='دسته بندی'
                  type='text'
                  title='Ten digits code'
                >
                  <option disabled>منطقه</option>
                  {regions &&
                    regions.map((e) => {
                      return (
                        <option
                          selected={e.id === singleAdd['district_id']}
                          key={e.id}
                          value={e.id}
                        >
                          {e.districtName}
                        </option>
                      )
                    })}
                </select>
              </div>

              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>عنوان آدرس</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleAddressTitleEditChange}
                  value={addressTitleEdit}
                  required
                  className={
                    addressTitleEditRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {addressTitleEditRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا عنوان آدرس خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>آدرس کامل</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleFullAddressEditChange}
                  value={fullAddressEdit}
                  required
                  className={
                    fullAddressEditRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {fullAddressEditRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا آدرس خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>خیابان اصلی</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleMainStreetEditChange}
                  value={mainStreetEdit}
                  required
                  className={
                    mainStreetEditRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {mainStreetEditRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا نام خیابان اصلی خود را وارد کنید
                </h5>
              ) : null}
              <div style={{ textAlign: 'right' }}>
                <label>
                  <h6 style={{ color: 'black' }}>خیابان فرعی</h6>
                </label>
              </div>
              <div className='row mx-0 mt-2'>
                <input
                  onChange={handleAlleyEditChange}
                  value={alleyEdit}
                  required
                  className={
                    alleyEditRequire
                      ? ' select form-input-red'
                      : ' select form-input'
                  }
                  pattern='[0-9]{5}[-][0-9]{7}[-][0-9]{1}'
                  type='text'
                  title='Ten digits code'
                />
              </div>
              {alleyEditRequire ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا نام خیابان فرعی خود را وارد کنید
                </h5>
              ) : null}
            </div>
            <div className='mt-3'>
              <button onClick={editAddress} className='btn-send-address'>
                {loading ? <Loader /> : 'تایید و ساخت آدرس'}
              </button>
            </div>
          </Modal.Title>
        </Modal.Body>
      </Modal>
    </>
  )
}
