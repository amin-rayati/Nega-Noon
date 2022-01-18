import React, { useContext, useState, useEffect } from 'react'

const ProjectContext = React.createContext()

export const ProjectProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [idOfDay, setIdOfDay] = useState('')
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  )
  const [totalCount, setTotalCount] = useState('')
  const count = []
  const [updateUi, setUpdateUi] = useState(true)

  const addToCart = (item) => {
    setUpdateUi(false)
    let tmpCart = cart
    if (!tmpCart.hasOwnProperty(item.id.toString())) {
      tmpCart[item.id.toString()] = 0
    }

    tmpCart[item.id.toString()] = {
      amount: +[[tmpCart[item.id]][0].amount] + +item.factor,
      pro: item,
    }

    setCart(tmpCart)
    updateCart(item)
  }
  const removeFromCart = (item) => {
    setUpdateUi(false)
    let tmpCart = cart
    if (!tmpCart.hasOwnProperty(item.id.toString())) {
      tmpCart[item.id.toString()] = 0
    }
    if (item['unit'] == 'کیلوگرم') {
      tmpCart[item.id.toString()] = {
        amount: +[[tmpCart[item.id]][0].amount] - +item.factor,
        pro: item,
      }
    } else {
      tmpCart[item.id.toString()] = {
        amount: +[[tmpCart[item.id]][0].amount] - +item.factor,
        pro: item,
      }
    }

    if ([[tmpCart[item.id]][0].amount] == '0') {
      delete tmpCart[item.id.toString()]
    }

    setCart(tmpCart)
    updateCart(item)
  }
  const removeFromCartTotaly = (item) => {
    setUpdateUi(false)
    let tmpCart = cart
    if (tmpCart.hasOwnProperty(item.id.toString())) {
      delete tmpCart[item.id.toString()]
    }
    setCart(tmpCart)
    updateCart(item)
  }
  const updateCart = (item) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    setTimeout(() => setUpdateUi(true), 0)
    Object.keys(cart).map((index) => {
      count.push(cart[index]['amount'])
      setTotalCount(count.reduce((partial_sum, a) => partial_sum + a, 0))
    })
  }

  const [cityModal, setCityModal] = useState(false)
  const [addressList, setAddressList] = useState([])

  const [showModal, setShowModal] = useState(false)
  const shiftModalClose = () => setShowModal(false)
  const shiftModalOpen = () => setShowModal(true)
  const [closeModal, setCloseModal] = useState(false)

  const [addressModalClose, setAddressModalClose] = useState(false)
  const [selectedShift, setSelectedShift] = useState({})
  const [paymentTypeList, setPaymentTypeList] = useState(null)

  const cityModalClose = () => setCityModal(false)
  const cityModalShow = () => setCityModal(true)

  const [stateId, setStateId] = useState('')
  const [cityId, setCityId] = useState('')
  const [cityIdChange, setCityIdChange] = useState('')

  const [loginModal, setLoginModal] = useState(false)
  const [addressModal, setAddressModal] = useState(false)
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false)
  const paymentTypeModalShow = () => setShowPaymentTypeModal(true)
  const closePaymentTypeModal = () => setShowPaymentTypeModal(false)
  const loginModalClose = () => setLoginModal(false)
  const [paymentTypeModalClose, setPaymentTypeModalClose] = useState(false)
  const loginModalShow = () => setLoginModal(true)
  const showAddressModal = () => setAddressModal(true)
  const closeAddressModal = () => setAddressModal(false)
  const [registerModal, setRegisterModal] = useState(false)
  const RegisterClose = () => setRegisterModal(false)
  const RegisterShow = () => setRegisterModal(true)

  const [discountModal, setDiscountModal] = useState(false)
  const DiscountClose = () => setDiscountModal(false)
  const DiscountShow = () => setDiscountModal(true)

  const [shiftModal, setShiftModal] = useState(false)
  const ShiftClose = () => setShiftModal(false)
  const ShiftShow = () => setShiftModal(true)

  const [mapModal, setMapModal] = useState(false)
  const MapModalClose = () => setMapModal(false)
  const MapModalOpen = () => setMapModal(true)

  const [editModal, setEditModal] = useState(false)
  const editModalClose = () => setEditModal(false)
  const editModalOpen = () => setEditModal(true)

  const [RecepieModal, setRecepieModal] = useState(false)
  const RecepieClose = () => setRecepieModal(false)
  const RecepieShow = () => setRecepieModal(true)

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [selectedPaymentType, setSelectedPaymentType] = useState(null)

  const [customerPosition, setCustomerPosition] = useState('')
  const [ui, setUi] = useState(true)
  return (
    <ProjectContext.Provider
      value={{
        discountModal,
        DiscountClose,
        DiscountShow,
        idOfDay,
        setIdOfDay,
        shiftModalOpen,
        shiftModalClose,
        editModal,
        editModalClose,
        editModalOpen,
        ui,
        setUi,
        customerPosition,
        setCustomerPosition,
        mapModal,
        MapModalClose,
        MapModalOpen,
        userData,
        setUserData,
        RecepieModal,
        RecepieClose,
        RecepieShow,
        shiftModal,
        ShiftClose,
        ShiftShow,
        removeFromCartTotaly,
        totalCount,
        cart,
        setCart,
        updateUi,
        setUpdateUi,
        removeFromCart,
        addToCart,
        updateCart,
        stateId,
        setStateId,
        cityId,
        setCityId,
        cityModal,
        cityModalClose,
        cityModalShow,
        loginModal,
        loginModalClose,
        loginModalShow,
        showAddressModal,
        closeAddressModal,
        addressModal,
        setAddressModal,
        registerModal,
        RegisterClose,
        RegisterShow,

        cityIdChange,
        setCityIdChange,
        showModal,
        closeModal,
        setShowModal,
        setCloseModal,
        setSelectedShift,
        selectedShift,
        addressList,
        setAddressList,
        setSelectedAddress,
        selectedAddress,
        addressModalClose,
        setAddressModalClose,
        showPaymentTypeModal,
        setShowPaymentTypeModal,
        paymentTypeModalShow,
        closePaymentTypeModal,
        paymentTypeModalClose,
        setPaymentTypeModalClose,
        paymentTypeList,
        selectedPaymentType,
        setSelectedPaymentType,
        setPaymentTypeList,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export const useProjectContext = () => {
  return useContext(ProjectContext)
}
