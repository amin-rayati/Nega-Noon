import { React, useEffect } from 'react'
import { useProjectContext } from '../context/ProjectProvider'
import sabad1 from '../assets/img/sabad.png'
import iconBread from '../assets/img/iconBread.png'
import { Navbar, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const CartIcon = () => {
  const {
    cityIdChange,
    setCityIdChange,
    cart,
    setCart,
    removeFromCart,
    addToCart,
    updateCart,
    updateUi,
    setUpdateUi,
    totalCount,
  } = useProjectContext()

  useEffect(() => {
    updateCart()
  }, [cart, totalCount])

  return (
    <LinkContainer to='/cart'>
      <div>
        <OverlayTrigger
          placement={'bottom'}
          overlay={<Tooltip>سبد خرید</Tooltip>}
        >
          <div className='add-cart-basket sabad-kharid-position '>
            <div>
              <img src={sabad1} style={{ width: '50%' }} alt='sabad' />
              <img
                src={iconBread}
                alt='sabad'
                style={{
                  position: 'relative',
                  left: ' -20px',
                  top: '-20px',
                  width: '50%',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '70px',
                }}
              >
                {Math.round(totalCount)}
              </span>
            </div>
          </div>
        </OverlayTrigger>
      </div>
    </LinkContainer>
  )
}

export default CartIcon
