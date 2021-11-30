import { React, useState, useEffect } from 'react'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { Cookies, useCookies } from 'react-cookie'
import { useProjectContext } from '../../context/ProjectProvider'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const Wish = ({ isWishList, id }) => {
  const { pathname } = useLocation()
  const activeCat = pathname.split('/')[2]
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [iswish, setIsWish] = useState(isWishList)
  const { userData, loginModalShow } = useProjectContext()

  const ChangeWish = async () => {
    if (userData) {
      try {
        const rawResponse = await fetch(
          'https://meyt.neganoon.ir/admin/WishLists/API/_WishList?token=test',
          {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
              token: 'test',
            }),
            body: JSON.stringify({
              token: 'test',
              productId: id,
              customerId: userData && userData['customerId'],
            }),
          }
        )
        const content = await rawResponse.json()
        if (content.isDone) {
          setIsWish(!iswish)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire({
        title:
          'برای اضافه کردن این محصول به علاقه مندی ها ابتدا باید وارد نگانون شوید',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff8334',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
      }).then((result) => {
        if (result.value) {
          loginModalShow()
        }
      })
    }
  }
  useEffect(() => {
    setIsWish(isWishList)
  }, [isWishList])

  return (
    <div style={{ textAlign: 'initial' }}>
      {iswish ? (
        <BsBookmarkFill
          onClick={ChangeWish}
          size={25}
          style={{
            position: 'absolute',
            color: '#ff8334',
            cursor: 'pointer',
          }}
        />
      ) : (
        <BsBookmark
          onClick={ChangeWish}
          size={25}
          style={{
            position: 'absolute',
            color: '#ff8334',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  )
}

export default Wish
