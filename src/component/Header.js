import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Navbar,
  Nav,
  Tooltip,
  OverlayTrigger,
  NavDropdown,
} from 'react-bootstrap'
import logo from '../assets/img/neganoon.png'
import { BsList, BsDownload } from 'react-icons/bs'
import { ImLocation } from 'react-icons/im'
import { FiShoppingCart } from 'react-icons/fi'
import { LinkContainer } from 'react-router-bootstrap'
import { useProjectContext } from '../context/ProjectProvider'
import Login from './LoginRegister/Login'
import CityModal from './City/CityModal'
import { Cookies, useCookies } from 'react-cookie'

const Header = () => {
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const downloadAndroid = () => {
    const url = 'https://new.neganoon.ir/app/apk/v2/neganoon.apk'
    window.open(url, '_blank')
  }
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const { pathname } = useLocation()
  const activePath = pathname.split('/')[1]
  const [active, setActive] = useState('')
  const {
    loginModalShow,
    loginModal,
    cityModalShow,
    cityModal,
    cityIdChange,
    setCityIdChange,
    userData,
    setUserData,
  } = useProjectContext()
  const [categories, setCategories] = useState([])

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
  useEffect(() => {
    if (!activePath) {
      setActive('home')
    } else {
      setActive(activePath)
    }
  }, [activePath])
  useEffect(() => {
    getAllCategories()
  }, [cityIdChange])

  const logOut = () => {
    removeCookie('user')
    setUserData(null)
  }

  return (
    <Navbar
      collapseOnSelect
      expand='xl'
      bg='white'
      variant='dark'
      className='py-4 nav-mobile-p'
      style={{
        position: 'fixed',
        top: '0',
        justifyContent: 'space-between',
        padding: '50px',
        boxShadow: 'rgb(225 225 225 / 50%) 0px 0px 12px 12px',
        zIndex: '999',
      }}
    >
      <img src={logo} className='logo-size-mobile ' alt='logo' />

      <Navbar.Toggle style={{ border: 'none' }}>
        <BsList style={{ color: '#000' }} size={35} />
      </Navbar.Toggle>
      <Navbar.Collapse style={{ flexGrow: '0' }} id='responsive-navbar-nav'>
        <div className='d-flex' style={{ justifyContent: 'end' }}>
          <OverlayTrigger
            placement={'bottom'}
            overlay={<Tooltip> دانلود نرم‌افزار</Tooltip>}
          >
            <button
              onClick={downloadAndroid}
              className='Hollow-btn btn-p'
              style={{ marginTop: '20px' }}
            >
              <span
                style={{
                  marginRight: '5px',
                  fontSize: '15px',
                  borderRight: '2px solid #ffb135',
                  padding: ' 0 10px 0 10px',
                }}
                className='show-btnTxt nav-font'
              >
                دانلود نرم‌افزار
              </span>
              <BsDownload style={{ color: '#FFB135' }} size={15} />
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            placement={'bottom'}
            overlay={<Tooltip> سفارش آنلاین</Tooltip>}
          >
            <LinkContainer
              to={categories.length > 0 ? `/products/1` : `/error`}
            >
              <button
                className='fill-btn mx-3 btn-p'
                style={{ marginTop: '20px' }}
              >
                <span
                  style={{
                    marginRight: '5px',

                    fontSize: '15px',
                    borderRight: '2px solid #ffb135',
                    padding: ' 0 10px 0 10px',
                  }}
                  className='show-btnTxt nav-font'
                >
                  سفارش آنلاین
                </span>
                <FiShoppingCart style={{ color: '#FFB135' }} size={15} />
              </button>
            </LinkContainer>
          </OverlayTrigger>

          <OverlayTrigger
            placement={'bottom'}
            overlay={<Tooltip> انتخاب شهر</Tooltip>}
          >
            <button
              onClick={cityModalShow}
              className='Hollow-btn btn-p'
              style={{ marginTop: '20px' }}
            >
              <span
                style={{
                  marginRight: '5px',
                  fontSize: '15px',
                  borderRight: '2px solid #ffb135',
                  padding: ' 0 10px 0 10px',
                }}
                className={
                  cookiesCityname
                    ? ' nav-font cityTxt-style'
                    : 'show-btnTxt nav-font'
                }
              >
                {cookiesCityname['cityname']
                  ? cookiesCityname['cityname']
                  : 'شهر'}
              </span>
              <ImLocation
                className={cookiesCityname ? 'show-btnIcon ' : null}
                style={{ color: '#FFB135' }}
                size={15}
              />
            </button>
          </OverlayTrigger>

          {cityModal ? <CityModal /> : null}
        </div>
        <Nav
          className='me-auto '
          style={{
            background: '#FFB135',
            marginLeft: '50px',
            borderRadius: '10px',
            padding: ' 10px',
            boxShadow: '0 0 15px 8px rgb(217 217 217 / 50%)',
          }}
        >
          <LinkContainer
            to='/'
            className={
              active === 'home' ? 'active-nav mx-2 nav-font' : 'mx-2 nav-font'
            }
          >
            <Nav.Link onClick={() => setActive('home')}>صفحه اصلی</Nav.Link>
          </LinkContainer>

          <LinkContainer
            to='/about'
            className={
              active === 'about' ? 'active-nav mx-2 nav-font' : 'mx-2 nav-font'
            }
          >
            <Nav.Link onClick={() => setActive('about')}>درباره ما</Nav.Link>
          </LinkContainer>

          <LinkContainer
            className={
              active === 'support'
                ? 'active-nav mx-2 nav-font'
                : 'mx-2 nav-font'
            }
            to='/support'
          >
            <Nav.Link onClick={() => setActive('support')}>پشتیبانی</Nav.Link>
          </LinkContainer>

          <LinkContainer
            to='/rules'
            className={
              active === 'rules' ? 'active-nav mx-2 nav-font' : 'mx-2 nav-font'
            }
          >
            <Nav.Link onClick={() => setActive('rules')}>
              قوانین و مقررات
            </Nav.Link>
          </LinkContainer>

          {!userData ? (
            <>
              <Nav.Link
                onClick={() => {
                  loginModalShow()
                  setActive('login')
                }}
                className={
                  active === 'login'
                    ? 'active-nav mx-2 nav-font'
                    : 'mx-2 nav-font'
                }
                style={{ color: 'white', fontSize: '15px' }}
              >
                ورود و ثبت نام
              </Nav.Link>
              {loginModal ? <Login /> : null}{' '}
            </>
          ) : (
            <NavDropdown
              onClick={() => {
                setActive(
                  userData['customerFirstName'] +
                    ' ' +
                    userData['customerLastName']
                )
              }}
              className={
                active ===
                userData['customerFirstName'] +
                  ' ' +
                  userData['customerLastName']
                  ? 'active-nav-name mx-2 nav-font'
                  : 'mx-2 nav-font'
              }
              title={
                userData['customerFirstName'] +
                ' ' +
                userData['customerLastName']
              }
              id='collasible-nav-dropdown '
              style={{ right: '0px', borderRadius: '20px' }}
            >
              <LinkContainer to='/dashboard' style={{ textAlign: 'right' }}>
                <NavDropdown.Item>داشبورد</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => logOut()}
                style={{ textAlign: 'right' }}
              >
                خروج
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
