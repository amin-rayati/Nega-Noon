import { React, useState, useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { ImPriceTags } from 'react-icons/im'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { useProjectContext } from '../../context/ProjectProvider'
import { LinkContainer } from 'react-router-bootstrap'
import { Cookies, useCookies } from 'react-cookie'
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ShiftModal } from './ShiftModal'
import { Modal } from 'react-bootstrap'
import Loading from '../../component/Loading/Loading'
import PageLoader from '../PageLoader/PageLoader'
import Login from '../../component/LoginRegister/Login'
import { AddressModal } from './AddressModal'
import { PaymentTypeModal } from './PaymentTypeModal'
import { Helmet } from 'react-helmet'
import Grow from '@mui/material/Grow'
import Slide from '@mui/material/Slide'
const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart'))
  )
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])

  const [isWallet, setIsWallet] = useState(0)

  const [discountPrice, setDiscountPrice] = useState('')
  const [categories, setCategories] = useState([])
  const [shift, setShift] = useState([])
  const [shiftt, setShiftt] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedDayAndCategory, setSelectedDayAndCategory] = useState({})
  const [totalCountp, setTotalCountp] = useState('')
  const [i, setI] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingShifts, setLoadingShifts] = useState(false)
  const [sendPrice, setSendPrice] = useState('')
  const [packagePrice, setPackagePrice] = useState('')

  const [code, setCode] = useState('')
  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }
  let list = []
  const price = []
  let wallet = []
  const {
    removeFromCartTotaly,
    cityIdChange,
    setCityIdChange,
    cart,
    setCart,
    removeFromCart,
    addToCart,
    setShowModal,
    selectedShift,

    updateCart,
    userData,
    loginModal,
    loginModalClose,
    loginModalShow,
    addressList,
    setAddressList,
    showAddressModal,
    addressModal,
    selectedAddress,
    setSelectedAddress,
    closeAddressModal,
    paymentTypeModalShow,
    paymentTypeList,
    setPaymentTypeList,
    selectedPaymentType,
    discountModal,
    DiscountClose,
    DiscountShow,
  } = useProjectContext()

  const nummber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const removecart = (item) => {
    Swal.fire({
      title: `آیا میخواهید ${item.name} را از سبد خرید خود پاک  کنید؟ `,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8334',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
    }).then((result) => {
      if (result.value) {
        removeFromCartTotaly(item)
      }
    })
  }
  const getAllCategories = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/ProductGroups/API/_Categories?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            token: 'test',
            cityId: cookiesCityid['cityid'],
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setCategories(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (JSON.parse(localStorage.getItem('cart'))) {
    Object.keys(JSON.parse(localStorage.getItem('cart'))).map((e) => {
      categories.map((j) => {
        if (
          j.id ===
          JSON.parse(localStorage.getItem('cart'))[e]['pro']['categoryId']
        ) {
          let tmp = list
          if (!tmp[j.id]) {
            tmp[j.id] = []
          }
          tmp[j.id].push({
            pro: JSON.parse(localStorage.getItem('cart'))[e]['pro'],
            amount: JSON.parse(localStorage.getItem('cart'))[e]['amount'],
          })
        }
      })
    })
  }

  const sendDataCallBack = (paymentTypeId) => {
    let products = {}

    for (let productGroupId in selectedDayAndCategory) {
      products[productGroupId] = {
        sending_time: selectedShift[productGroupId]['shift'].sending_time_id,
        order_date: Date.now() / 1000,
        products: {},
        // packagePrice: 1000,
        // sendPrice: sendPrice,
      }
      for (let item in cart) {
        if (cart[item]['pro']['categoryId'] == productGroupId) {
          products[productGroupId].products[item] = {
            count: cart[item].amount,
            price: cart[item].pro.price,
            unit: cart[item].pro.unit,
            provider_id: 0,
            isToday: selectedDayAndCategory[productGroupId],
          }
        }
      }
    }
    if (paymentTypeId === 7) {
      if (discountPrice) {
        if (userData['credit'] <= discountPrice) {
          if (discountPrice - userData['credit'] < 1000) {
            Swal.fire({
              text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را درب منزل پرداخت کنید؟`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#1fb811',
              cancelButtonColor: '#ff8900',
              cancelButtonText: 'خیر',
              confirmButtonText: 'بله',
            }).then((result) => {
              if (result.value) {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 5,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 5,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }
                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              }
            })
            return
          } else {
            Swal.fire({
              text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را از طریق دیگری پرداخت کنید؟`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#1fb811',
              cancelButtonColor: '#ff8900',
              cancelButtonText: 'پرداخت آنلاین',
              confirmButtonText: 'پرداخت درب منزل',
            }).then((result) => {
              if (result.value) {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 5,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 5,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }
                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              } else if (result.dismiss === 'cancel') {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 4,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 4,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }
                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              }
            })
            return
          }
        } else {
          let body = {
            customer_id: userData.customerId,
            order_products: JSON.stringify(products),
            customer_address_id: selectedAddress.customer_address_id,
            order_delivery_type_yes_no: 1,
            order_payment_type: 7,
            products_price: totalCountp,
            total_price: discountPrice
              ? discountPrice
              : totalCountp + sendPrice + packagePrice,
            payment_method: 7,
            sendPrice: sendPrice,
            packagePrice: packagePrice,
            orderFrom: 2,
          }

          axios
            .post(
              'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
              body,
              {
                headers: {
                  token: 'test',
                },
              }
            )
            .then((response) => {
              if (response.data.isDone) {
                if (response.data.data.url) {
                  window.open(response.data.data.url, '_blank')
                } else {
                  Swal.fire({
                    type: 'success',
                    title: '! ثبت موفق',
                    text: `کد رهگیری: ${response.data.data.id}`,
                    showConfirmButton: false,
                    showCloseButton: true,
                  }).then((result) => {
                    localStorage.removeItem('cart')
                    window.location.reload(true)
                  })
                }
              } else {
                Swal.fire({
                  type: 'warning',
                  title: '! ثبت ناموفق',
                  text: `ثبت سفارش شما با مشکل مواجه شد`,
                  showConfirmButton: false,
                  showCloseButton: true,
                }).then((result) => {
                  console.log(result)
                })
              }
            })
        }
      } else {
        if (userData['credit'] <= totalCountp + sendPrice + packagePrice) {
          if (
            totalCountp + sendPrice + packagePrice - userData['credit'] <
            1000
          ) {
            Swal.fire({
              text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را درب منزل پرداخت کنید؟`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#1fb811',
              cancelButtonColor: '#ff8900',
              showCloseButton: true,
              cancelButtonText: 'خیر',
              confirmButtonText: 'بله',
            }).then((result) => {
              if (result.value) {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 5,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 5,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }

                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              }
            })

            return
          } else {
            Swal.fire({
              text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را از طریق دیگری پرداخت کنید؟`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#1fb811',
              cancelButtonColor: '#ff8900',
              cancelButtonText: 'پرداخت آنلاین',
              confirmButtonText: 'پرداخت درب منزل',
            }).then((result) => {
              console.log(result)
              if (result.value) {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 5,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 5,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }

                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                        // if (response.data.data.status) {
                        //   Swal.fire({
                        //     type: 'success',
                        //     title: '! ثبت موفق',
                        //     text: `کد رهگیری: ${response.data.data.id}`,
                        //     showConfirmButton: false,
                        //     showCloseButton: true,
                        //   }).then((result) => {
                        //     localStorage.removeItem('cart')
                        //     window.location.reload(true)
                        //   })
                        // } else {
                        //   if (response.data.data.id === null) {
                        //     Swal.fire({
                        //       text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را از طریق دیگری پرداخت کنید؟`,
                        //       type: 'warning',
                        //       showCancelButton: true,
                        //       confirmButtonColor: '#1fb811',
                        //       cancelButtonColor: '#ff8900',
                        //       cancelButtonText: 'پرداخت آنلاین',
                        //       confirmButtonText: 'پرداخت درب منزل',
                        //     }).then((result) => {
                        //       if (result.value) {
                        //         sendDataCallBack(5)
                        //       } else {
                        //         sendDataCallBack(4)
                        //       }
                        //     })
                        //   } else {
                        //     Swal.fire({
                        //       type: 'warning',
                        //       title: '! ثبت ناموفق',
                        //       text: `ثبت سفارش شما با مشکل مواجه شد`,
                        //       showConfirmButton: false,
                        //       showCloseButton: true,
                        //     }).then((result) => {
                        //       console.log(result)
                        //     })
                        //   }
                        // }
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              } else if (result.dismiss === 'cancel') {
                let body = {
                  customer_id: userData.customerId,
                  order_products: JSON.stringify(products),
                  customer_address_id: selectedAddress.customer_address_id,
                  order_delivery_type_yes_no: 1,
                  order_payment_type: 4,
                  products_price: totalCountp,
                  total_price: discountPrice
                    ? discountPrice
                    : totalCountp + sendPrice + packagePrice,
                  payment_method: 4,
                  sendPrice: sendPrice,
                  packagePrice: packagePrice,
                  orderFrom: 2,
                }
                axios
                  .post(
                    'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
                    body,
                    {
                      headers: {
                        token: 'test',
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.isDone) {
                      if (response.data.data.url) {
                        window.open(response.data.data.url, '_blank')
                      } else {
                        Swal.fire({
                          type: 'success',
                          title: '! ثبت موفق',
                          text: `کد رهگیری: ${response.data.data.id}`,
                          showConfirmButton: false,
                          showCloseButton: true,
                        }).then((result) => {
                          localStorage.removeItem('cart')
                          window.location.reload(true)
                        })
                        // if (response.data.data.status) {
                        //   Swal.fire({
                        //     type: 'success',
                        //     title: '! ثبت موفق',
                        //     text: `کد رهگیری: ${response.data.data.id}`,
                        //     showConfirmButton: false,
                        //     showCloseButton: true,
                        //   }).then((result) => {
                        //     localStorage.removeItem('cart')
                        //     window.location.reload(true)
                        //   })
                        // } else {
                        //   if (response.data.data.id === null) {
                        //     Swal.fire({
                        //       text: `موجودی کیف پول شما کافی نیست آیا میخواهید مابقی قیمت را از طریق دیگری پرداخت کنید؟`,
                        //       type: 'warning',
                        //       showCancelButton: true,
                        //       confirmButtonColor: '#1fb811',
                        //       cancelButtonColor: '#ff8900',
                        //       cancelButtonText: 'پرداخت آنلاین',
                        //       confirmButtonText: 'پرداخت درب منزل',
                        //     }).then((result) => {
                        //       if (result.value) {
                        //         sendDataCallBack(5)
                        //       } else {
                        //         sendDataCallBack(4)
                        //       }
                        //     })
                        //   } else {
                        //     Swal.fire({
                        //       type: 'warning',
                        //       title: '! ثبت ناموفق',
                        //       text: `ثبت سفارش شما با مشکل مواجه شد`,
                        //       showConfirmButton: false,
                        //       showCloseButton: true,
                        //     }).then((result) => {
                        //       console.log(result)
                        //     })
                        //   }
                        // }
                      }
                    } else {
                      Swal.fire({
                        type: 'warning',
                        title: '! ثبت ناموفق',
                        text: `ثبت سفارش شما با مشکل مواجه شد`,
                        showConfirmButton: false,
                        showCloseButton: true,
                      }).then((result) => {
                        console.log(result)
                      })
                    }
                  })
              }
            })
          }
        } else {
          let body = {
            customer_id: userData.customerId,
            order_products: JSON.stringify(products),
            customer_address_id: selectedAddress.customer_address_id,
            order_delivery_type_yes_no: 1,
            order_payment_type: 7,
            products_price: totalCountp,
            total_price: discountPrice
              ? discountPrice
              : totalCountp + sendPrice + packagePrice,
            payment_method: 7,
            sendPrice: sendPrice,
            packagePrice: packagePrice,
            orderFrom: 2,
          }

          axios
            .post(
              'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
              body,
              {
                headers: {
                  token: 'test',
                },
              }
            )
            .then((response) => {
              if (response.data.isDone) {
                if (response.data.data.url) {
                  window.open(response.data.data.url, '_blank')
                } else {
                  Swal.fire({
                    type: 'success',
                    title: '! ثبت موفق',
                    text: `کد رهگیری: ${response.data.data.id}`,
                    showConfirmButton: false,
                    showCloseButton: true,
                  }).then((result) => {
                    localStorage.removeItem('cart')
                    window.location.reload(true)
                  })
                }
              } else {
                Swal.fire({
                  type: 'warning',
                  title: '! ثبت ناموفق',
                  text: `ثبت سفارش شما با مشکل مواجه شد`,
                  showConfirmButton: false,
                  showCloseButton: true,
                }).then((result) => {
                  console.log(result)
                })
              }
            })
        }
      }
    } else {
      let body = {
        customer_id: userData.customerId,
        order_products: JSON.stringify(products),
        customer_address_id: selectedAddress.customer_address_id,
        order_delivery_type_yes_no: 1,
        order_payment_type: paymentTypeId,
        products_price: totalCountp,
        total_price: discountPrice
          ? discountPrice
          : totalCountp + sendPrice + packagePrice,
        payment_method: paymentTypeId,
        sendPrice: sendPrice,
        packagePrice: packagePrice,
        orderFrom: 2,
      }
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Orders/API/_submitAppOrder?token=test',
          body,
          {
            headers: {
              token: 'test',
            },
          }
        )
        .then((response) => {
          if (response.data.isDone) {
            if (response.data.data.url) {
              window.open(response.data.data.url, '_blank')
            } else {
              Swal.fire({
                type: 'success',
                title: '! ثبت موفق',
                text: `کد رهگیری: ${response.data.data.id}`,
                showConfirmButton: false,
                showCloseButton: true,
              }).then((result) => {
                localStorage.removeItem('cart')
                window.location.reload(true)
              })
            }
          } else {
            Swal.fire({
              type: 'warning',
              title: '! ثبت ناموفق',
              text: `ثبت سفارش شما با مشکل مواجه شد`,
              showConfirmButton: false,
              showCloseButton: true,
            }).then((result) => {
              console.log(result)
            })
          }
        })
    }
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
          showAddressModal()
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      loginModalShow()
    }
  }

  const DayList = () => {
    let array = []
    Object.keys(list).map((e) => {
      array.push(list[e])
    })
    let myData = selectedDayAndCategory
    for (var i = 0; i < array.length; i++) {
      if (!myData[array[i]['0']['pro']['categoryId']]) {
        myData[array[i]['0']['pro']['categoryId']] = '1'
      }
    }
    setSelectedDayAndCategory(myData)
    setIsLoaded(true)
  }
  const changeDay = (catID, dayId) => {
    setIsLoaded(false)
    setSelectedDayAndCategory((oldData) => {
      oldData[catID] = dayId
      return oldData
    })

    setSelectedCategory(catID)

    setTimeout(() => {
      setIsLoaded(true)
    }, 0)
    getShifts(catID, dayId)
  }
  const today = (catID) => {
    changeDay(catID, '1')
  }
  const tomorow = (catID) => {
    changeDay(catID, '2')
  }
  const getShifts = (categoryId, dayId) => {
    setTimeout(() => {
      setShowModal(true)
    }, 1)
  }
  const sendData = () => {
    DiscountClose()
    axios
      .get(
        'https://meyt.neganoon.ir/admin/Customers/API/_getPaymentMethods?token=test',

        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        setPaymentTypeList(response.data.data)
        paymentTypeModalShow()
      })
  }
  const continueBuy = () => {
    let notSelectedItems = []
    for (let item in selectedDayAndCategory) {
      if (!selectedShift.hasOwnProperty(item)) {
        notSelectedItems.push(item)
      } else {
      }
      axios
        .post(
          'https://meyt.neganoon.ir/admin/ProductGroups/API/_getGroupNamesByListOfIds?token=test',
          {
            listOfGroupIds: JSON.stringify(notSelectedItems),
          },
          {
            headers: {
              token: 'test',
            },
          }
        )
        .then((response) => {
          if (response.data.data.length > 0) {
            Swal.fire({
              type: 'error',
              title: 'لطفا ساعت تحویل مربوط به گروه های زیر را انتخاب کنید',
              text: response.data.data.toString().replaceAll('-', '٬ '),
              showCloseButton: false,
              confirmButtonText: '!فهمیدم',
            })
          } else {
            if (!selectedAddress) {
              changeAddress()
            } else {
              DiscountShow()
              // sendData()
            }
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  const calcSendPrice = () => {
    let products = {}
    for (let item in cart) {
      products[item] = cart[item].amount
    }
    axios
      .post(
        'https://meyt.neganoon.ir/admin/Orders/API/_calculate?token=test',
        {
          data: JSON.stringify(products),
        },
        {
          headers: {
            token: 'test',
          },
        }
      )

      .then((response) => {
        if (response.data.isDone) {
          setSendPrice(response.data.data['sendPrice'])
          setPackagePrice(response.data.data['packagePrice'])
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const sendDiscountCode = () => {
    let arr = []
    let arr2 = []
    Object.keys(list).map((e) => {
      arr.push(e)
    })
    Object.keys(list).map((e) => {
      Object.keys(list[e]).map((j) => {
        arr2.push(list[e][j]['pro']['id'])
      })
    })

    axios
      .post(
        'https://meyt.neganoon.ir/admin/DiscountCode/API/_countDiscountCode?token=test',
        {
          discountCode: code,
          customerId: userData['customerId'],
          productGroupId: JSON.stringify(arr),
          productNameId: JSON.stringify(arr2),
          productPrice: totalCountp,
          sendPrice: sendPrice,
          packagePrice: packagePrice,
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
            text: `کد تخفیف شما با موفقیت محاسبه شد`,
            showConfirmButton: false,
            showCloseButton: true,
          }).then((result) => {
            console.log(result)
          })
          setDiscountPrice(response.data.data)
        } else {
          Swal.fire({
            type: 'error',
            title: 'خطا',
            text: `${response.data.data}`,
            showConfirmButton: false,
            showCloseButton: true,
          }).then((result) => {
            console.log(result)
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  calcSendPrice()

  useEffect(() => {
    getAllCategories()
  }, [cityIdChange])

  useEffect(() => {
    DayList()
  }, [list])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      if (Object.keys(JSON.parse(localStorage.getItem('cart'))).length !== 0) {
        Object.keys(JSON.parse(localStorage.getItem('cart'))).map((index) => {
          price.push(
            JSON.parse(localStorage.getItem('cart'))[index]['pro']['price'] *
              JSON.parse(localStorage.getItem('cart'))[index]['amount']
          )
          setTotalCountp(price.reduce((partial_sum, a) => partial_sum + a, 0))
        })
      }
    }
  }, [JSON.parse(localStorage.getItem('cart'))])

  useEffect(() => {
    setDiscountPrice('')
    setCode('')
  }, [totalCountp])

  if (!JSON.parse(localStorage.getItem('cart'))) {
    return (
      <div style={{ textAlign: 'center', marginTop: '250px' }}>
        <h4>سبد خرید شما خالی است</h4>
        <LinkContainer to='/products/1'>
          <button className='purchase-btn'>خرید</button>
        </LinkContainer>
      </div>
    )
  } else {
    return (
      <>
        <Helmet>
          <meta charSet='utf-8' />
          <title> نگانون </title>
        </Helmet>
        <PaymentTypeModal sendData={sendDataCallBack} />
        <AddressModal />
        <Grow
          in={true}
          style={{ transformOrigin: '0 0 0' }}
          {...(true ? { timeout: 2000 } : {})}
        >
          <div className='container mx-auto ' style={{ marginTop: '170px' }}>
            {localStorage.getItem('cart') &&
            Object.keys(JSON.parse(localStorage.getItem('cart'))).length !==
              0 ? (
              <>
                <div>
                  {Object.keys(list).length !== 0 &&
                    Object.keys(list).map((e, index1) => {
                      return (
                        <>
                          <Slide
                            direction='right'
                            in={true}
                            mountOnEnter
                            unmountOnExit
                            timeout={index1 * (400 + index1)}
                            style={{ transformOrigin: '0 0 0' }}
                          >
                            <div className='row'>
                              <div className='col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-4 order-sm-1 col-12 order-2  mt-4 send-price '></div>

                              <div
                                className='d-flex cart-btn-flex  col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-8 order-sm-2 col-12 order-1 '
                                style={{ justifyContent: 'end' }}
                              >
                                {selectedShift[
                                  list[e][0]['pro']['categoryId']
                                ] ? (
                                  <button
                                    className={
                                      selectedShift[
                                        list[e][0]['pro']['categoryId']
                                      ]['DAYID'] === '1'
                                        ? 'choosen-shift-btn-cart1 mx-2 '
                                        : 'choosen-shift-btn-cart2 mx-2 '
                                    }
                                  >
                                    {
                                      selectedShift[
                                        list[e][0]['pro']['categoryId']
                                      ]['shift']['sending_time_start']
                                    }
                                    -
                                    {
                                      selectedShift[
                                        list[e][0]['pro']['categoryId']
                                      ]['shift']['sending_time_end']
                                    }
                                  </button>
                                ) : null}

                                <div className='d-flex flex-column'>
                                  <button
                                    onClick={() => {
                                      today(list[e][0]['pro']['categoryId'])
                                    }}
                                    className={
                                      selectedDayAndCategory[
                                        list[e][0]['pro']['categoryId']
                                      ] === '1'
                                        ? 'choosen-shift-btn-cart mx-2 '
                                        : 'shift-btn-cart  mx-2'
                                    }
                                  >
                                    سفارش برای امروز
                                  </button>
                                  <button
                                    onClick={() => {
                                      tomorow(list[e][0]['pro']['categoryId'])
                                    }}
                                    className={
                                      selectedDayAndCategory &&
                                      selectedDayAndCategory[
                                        list[e][0]['pro']['categoryId']
                                      ] === '2'
                                        ? 'choosen-shift-btn-cart mx-2 '
                                        : 'shift-btn-cart  mx-2'
                                    }
                                  >
                                    سفارش برای فردا
                                  </button>
                                </div>

                                <button
                                  className={'choosen-cat-btn-cart mx-2 mt-2'}
                                >
                                  {list[e][0]['pro']['categoryName']}
                                </button>
                              </div>
                            </div>
                          </Slide>
                          {Object.keys(list[e]).map((j, index) => {
                            return (
                              <>
                                <Slide
                                  direction='right'
                                  in={true}
                                  mountOnEnter
                                  unmountOnExit
                                  timeout={index * (800 + index)}
                                  style={{ transformOrigin: '0 0 0' }}
                                >
                                  <div
                                    className='row mt-3'
                                    style={{ justifyContent: 'center' }}
                                  >
                                    <div className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 row'>
                                      <div className='col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2 '>
                                        <div className='d-flex mt-3 cart-amount-btn'>
                                          <div
                                            onClick={() => {
                                              removecart(list[e][j]['pro'])
                                              // removeFromCartTotaly(list[e][j]['pro'])
                                              updateCart()
                                            }}
                                            style={{
                                              cursor: 'pointer',
                                              borderRadius: '5px',
                                              marginTop: 'auto',
                                              marginRight: '10px',
                                            }}
                                            className='px-2'
                                          >
                                            <BsFillTrashFill
                                              style={{ color: 'red' }}
                                              size={20}
                                            />
                                          </div>
                                          <div
                                            onClick={() => {
                                              removeFromCart(list[e][j]['pro'])
                                              updateCart()
                                            }}
                                            style={{
                                              border: '2px solid gray',
                                              cursor: 'pointer',
                                              borderRadius: '5px',
                                            }}
                                            className='px-2'
                                          >
                                            <FaMinus
                                              style={{ color: 'gray' }}
                                              size={12}
                                            />
                                          </div>
                                          <span className='mx-2'>
                                            {list[e][j]['amount']}
                                          </span>
                                          <div
                                            onClick={() => {
                                              addToCart(list[e][j]['pro'])
                                              updateCart()
                                            }}
                                            style={{
                                              background: '#ff8333',
                                              cursor: 'pointer',
                                              borderRadius: '5px',
                                            }}
                                            className='px-2 '
                                          >
                                            <FaPlus
                                              style={{
                                                color: 'white',
                                                marginTop: '5px',
                                              }}
                                              size={13}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
                                        <div className='d-flex mt-3 cart-price1-justify'>
                                          <div className='d-flex'>
                                            <span
                                              style={{
                                                fontSize: '16px',
                                                marginRight: '5px',
                                              }}
                                            >
                                              تومان
                                            </span>
                                            <span style={{ fontSize: '15px' }}>
                                              {/* {nummber(
                                  JSON.parse(localStorage.getItem('cart'))[e][
                                    'pro'
                                  ]['price'] *
                                    JSON.parse(localStorage.getItem('cart'))[e][
                                      'amount'
                                    ]
                                )} */}
                                              {nummber(
                                                list[e][j]['pro']['price'] *
                                                  list[e][j]['amount']
                                              )}
                                            </span>
                                          </div>
                                          <span
                                            style={{
                                              fontSize: '16px',
                                              marginLeft: '5px',
                                            }}
                                          >
                                            : قیمت در سبد خرید
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-lg-6 order-lg-2 col-md-12  order-md-1 col-sm-12 order-sm-1 col-12 order-1 row'>
                                      <div className=' col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-6 order-sm-1 col-12 order-2'>
                                        <div className='d-flex mt-3 cart-price-justify'>
                                          <div className='d-flex'>
                                            <span
                                              style={{
                                                fontSize: '16px',
                                                marginRight: '5px',
                                              }}
                                            >
                                              تومان
                                            </span>
                                            <span style={{ fontSize: '18px' }}>
                                              {/* {nummber(
                                  JSON.parse(localStorage.getItem('cart'))[e][
                                    'pro'
                                  ]['price']
                                )} */}
                                              {nummber(
                                                list[e][j]['pro']['price']
                                              )}
                                            </span>
                                          </div>
                                          <ImPriceTags
                                            style={{
                                              marginTop: '7px',
                                              marginLeft: '5px',
                                              color: '#FF8333',
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className=' col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-6 order-sm-2 col-12 order-1'>
                                        <div
                                          className='d-flex mt-3 '
                                          style={{
                                            justifyContent: 'flex-end',
                                          }}
                                        >
                                          <span
                                            className='mx-2'
                                            style={{ cursor: 'pointer' }}
                                          >
                                            {list[e][j]['pro']['unit']}
                                          </span>
                                          <span
                                            className='mx-2'
                                            style={{ cursor: 'pointer' }}
                                          >
                                            -
                                          </span>
                                          <h5
                                            className='ml-2'
                                            style={{ cursor: 'pointer' }}
                                          >
                                            {list[e][j]['pro']['name']}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Slide>
                                <hr />
                              </>
                            )
                          })}
                        </>
                      )
                    })}
                </div>

                <ShiftModal
                  categoryId={selectedCategory}
                  dayId={selectedDayAndCategory[selectedCategory]}
                />
                {
                  <div
                    className='row mt-5  mx-2'
                    style={{ justifyContent: 'center' }}
                  >
                    <div
                      className='col-lg-5 col-md-12 col-sm-12 col-12 p-4'
                      style={{
                        background: 'white',
                        borderRadius: '15px',
                        border: '2px solid #ffb135',
                      }}
                    >
                      {/* <div
                        className='row '
                        style={{ justifyContent: 'space-between' }}
                      >
                        <button className='continu-btn col-4'>
                          <MdEdit size={28} style={{ color: 'white' }} />
                          اعمال کد تخفیف
                        </button>
                        <input
                          className='col-6'
                          id='couponCodeInput'
                          type='text'
                          style={{
                            border: 'none',
                            borderBottom: '2px solid #b1b5b9',
                            outline: 'none',
                            width: '40%',
                          }}
                        />

                        <span
                          className='col-3'
                          style={{
                            fontSize: '15px',
                            textAlign: 'end',
                            marginTop: '23px',
                          }}
                        >
                          : کد تخفیف
                        </span>
                      </div>
                      <hr /> */}
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span
                            onClick={() => changeAddress()}
                            style={{
                              fontSize: '16px',
                              color: '#ff8334',
                              cursor: 'pointer',
                            }}
                          >
                            تغییر آدرس
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>
                          {selectedAddress
                            ? selectedAddress.full
                            : 'انتخاب نشده'}
                        </span>
                      </div>
                      <hr />
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span style={{ fontSize: '15px' }}>تومان</span>
                          <span style={{ fontSize: '15px' }}>
                            {nummber(totalCountp)}{' '}
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>: مجموع سفارش</span>
                      </div>
                      <hr />
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span style={{ fontSize: '15px' }}>تومان</span>
                          <span style={{ fontSize: '15px' }}>
                            {nummber(sendPrice)}{' '}
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>: هزینه ارسال</span>
                      </div>
                      <hr />
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span style={{ fontSize: '15px' }}>تومان</span>
                          <span style={{ fontSize: '15px' }}>
                            {nummber(packagePrice)}{' '}
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>
                          : هزینه بسته بندی
                        </span>
                      </div>
                      <hr />
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span style={{ fontSize: '15px' }}>تومان</span>
                          <span style={{ fontSize: '15px' }}>
                            {nummber(totalCountp + sendPrice + packagePrice)}{' '}
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>
                          : مبلغ قابل پرداخت
                        </span>
                      </div>
                      <hr />
                      <div className='text-center'>
                        <button
                          onClick={() => continueBuy()}
                          className='continu-btn'
                        >
                          ادامه
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <h4>سبد خرید شما خالی است</h4>
                <LinkContainer to='/products/1'>
                  <button className='purchase-btn'>خرید</button>
                </LinkContainer>
              </div>
            )}
            {loginModal ? <Login /> : null}
          </div>
        </Grow>
        {discountModal ? (
          <Modal show={discountModal} onHide={DiscountClose} size='md'>
            <Modal.Body>
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
                    <span style={{ marginLeft: '5px' }}>فاکتور خرید</span>
                  </div>
                </Modal.Title>
                <div
                  className='row mt-5  mx-2'
                  style={{ justifyContent: 'center' }}
                >
                  <div className='col-lg-12 col-md-12 col-sm-12 col-12 p-4'>
                    <div
                      className='row '
                      style={{ justifyContent: 'space-between' }}
                    >
                      <button
                        className='continu-btn col-4'
                        onClick={sendDiscountCode}
                      >
                        <MdEdit size={28} style={{ color: 'white' }} />
                        اعمال کد تخفیف
                      </button>
                      <input
                        onChange={handleCodeChange}
                        value={code}
                        className='col-6'
                        id='couponCodeInput'
                        type='text'
                        style={{
                          background: 'none',
                          border: 'none',
                          borderBottom: '2px solid #b1b5b9',
                          outline: 'none',
                          width: '40%',
                        }}
                      />

                      <span
                        className='col-3'
                        style={{
                          fontSize: '15px',
                          textAlign: 'end',
                          marginTop: '23px',
                        }}
                      >
                        : کد تخفیف
                      </span>
                    </div>
                    <hr />

                    <div
                      className='d-flex mt-3'
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div className='d-flex'>
                        <span style={{ fontSize: '15px' }}>تومان</span>
                        <span style={{ fontSize: '15px' }}>
                          {nummber(totalCountp)}
                        </span>
                      </div>
                      <span style={{ fontSize: '15px' }}>: مجموع سفارش</span>
                    </div>
                    <hr />
                    <div
                      className='d-flex mt-3'
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div className='d-flex'>
                        <span style={{ fontSize: '15px' }}>تومان</span>
                        <span style={{ fontSize: '15px' }}>
                          {nummber(sendPrice)}
                        </span>
                      </div>
                      <span style={{ fontSize: '15px' }}>: هزینه ارسال</span>
                    </div>
                    <hr />
                    <div
                      className='d-flex mt-3'
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div className='d-flex'>
                        <span style={{ fontSize: '15px' }}>تومان</span>
                        <span style={{ fontSize: '15px' }}>
                          {nummber(packagePrice)}
                        </span>
                      </div>
                      <span style={{ fontSize: '15px' }}>
                        : هزینه بسته بندی
                      </span>
                    </div>
                    <hr />
                    <div
                      className='d-flex mt-3'
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div className='d-flex'>
                        <span style={{ fontSize: '15px' }}>تومان</span>

                        {discountPrice ? (
                          <del style={{ fontSize: '15px' }}>
                            {nummber(totalCountp + sendPrice + packagePrice)}
                          </del>
                        ) : (
                          <span style={{ fontSize: '15px' }}>
                            {nummber(totalCountp + sendPrice + packagePrice)}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '15px' }}>
                        : مبلغ قابل پرداخت
                      </span>
                    </div>

                    {discountPrice ? (
                      <div
                        className='d-flex mt-3'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div className='d-flex'>
                          <span style={{ fontSize: '15px' }}>تومان</span>

                          <span style={{ fontSize: '15px' }}>
                            {nummber(discountPrice)}
                          </span>
                        </div>
                        <span style={{ fontSize: '15px' }}>
                          : مبلغ قابل پرداخت با تخفیف
                        </span>
                      </div>
                    ) : null}

                    <hr />
                    <div className='text-center'>
                      <button
                        onClick={() => sendData()}
                        className='continu-btn'
                      >
                        ادامه
                      </button>
                    </div>
                  </div>
                </div>
              </>
            </Modal.Body>
          </Modal>
        ) : null}
      </>
    )
  }
}

export default Cart
