import * as React from 'react'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { BiWorld } from 'react-icons/bi'
import Login from '../LoginRegister/Login'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'

import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const {
    loginModalShow,
    loginModal,

    userData,
    setUserData,
  } = useProjectContext()
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='dark'
        className='px-5 py-3  showNav1'
        style={{ justifyContent: 'space-between', backgroundColor: '#161f3c' }}
      >
        <button
          style={{
            borderRadius: '10px',
            padding: '10px 15px ',
            backgroundColor: '#f1a314',
            border: 'none',
          }}
          onClick={() => {
            loginModalShow()
          }}
        >
          ورود و ثبت نام
        </button>
        {loginModal ? <Login /> : null}{' '}
        <h4 style={{ color: 'white' }}>
          {' '}
          مرکز تخصصی آموزش سازمان ها و شرکت ها
        </h4>
        <BiWorld style={{ color: '#f1a314' }} size={50} />
      </Navbar>

      <Navbar
        collapseOnSelect
        expand='lg'
        style={{ backgroundColor: '#e6ebef ' }}
        variant='dark'
        className='showNav1'
      >
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          style={{ justifyContent: 'right' }}
        >
          <Nav className='px-5'>
            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/contact'
            >
              <Nav.Link>تماس با ما</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/teacherregister'
            >
              <Nav.Link>ثبت نام مدرس</Nav.Link>
            </LinkContainer>

            <LinkContainer
              to='/about'
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
            >
              <Nav.Link>درباره ما</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/ask'
            >
              <Nav.Link>درخواست دوره</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/req'
            >
              <Nav.Link>درخواست مشاوره</Nav.Link>
            </LinkContainer>

            <NavDropdown
              style={{ color: 'black' }}
              title='خدمات ما'
              id='collasible-nav-dropdown'
              className='mx-3 '
            >
              <div className='px-3'>
                <NavDropdown.Item
                  href='#action/3.1'
                  style={{ textAlign: 'right' }}
                >
                  آموزش حضوری در محل شما
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  آموزش آنلاین
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  گواهینامه پابان دوره
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  سفارش تولید محتوا آموزش
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/doreha'
            >
              <NavDropdown
                style={{ color: 'black' }}
                title='دوره'
                id='collasible-nav-dropdown'
                className='mx-3'
              >
                <div className='d-flex px-3'>
                  <div>
                    <div className='d-flex' style={{ justifyContent: 'end' }}>
                      <p style={{ color: 'white' }}>دپارتمان</p>
                    </div>
                    <NavDropdown.Item
                      href='#action/3.1'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                  </div>
                  <div>
                    <div className='d-flex' style={{ justifyContent: 'end' }}>
                      <p style={{ color: 'white' }}>صنایع</p>
                    </div>
                    <NavDropdown.Item
                      href='#action/3.1'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href='#action/3.3'
                      style={{ textAlign: 'right', color: '#000' }}
                    >
                      دپارتمان عمران
                    </NavDropdown.Item>
                  </div>
                </div>
              </NavDropdown>
            </LinkContainer>

            <LinkContainer
              to='/'
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
            >
              <Nav.Link>خانه</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Navbar
        collapseOnSelect
        expand='lg'
        style={{ backgroundColor: '#161f3c' }}
        variant='dark'
        className='showNav2 p-3'
      >
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          style={{ justifyContent: 'right' }}
        >
          <Nav className='px-5'>
            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              خانه
            </Nav.Link>

            <NavDropdown
              title='دوره'
              id='collasible-nav-dropdown'
              className='mx-3'
            >
              <div className='d-flex px-3'>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'white' }}>دپارتمان</p>
                  </div>
                  <NavDropdown.Item
                    href='#action/3.1'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                </div>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'white' }}>صنایع</p>
                  </div>
                  <NavDropdown.Item
                    href='#action/3.1'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    style={{ textAlign: 'right', color: '#000' }}
                  >
                    دپارتمان عمران
                  </NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>

            <NavDropdown
              style={{ color: 'black' }}
              title='خدمات ما'
              id='collasible-nav-dropdown'
              className='mx-3 '
            >
              <div className='px-3'>
                <NavDropdown.Item
                  href='#action/3.1'
                  style={{ textAlign: 'right' }}
                >
                  آموزش حضوری در محل شما
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  آموزش آنلاین
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  گواهینامه پابان دوره
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href='#action/3.3'
                  style={{ textAlign: 'right' }}
                >
                  سفارش تولید محتوا آموزش
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              درخواست مشاوره
            </Nav.Link>

            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              درخواست دوره
            </Nav.Link>

            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              درباره ما
            </Nav.Link>

            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              ثبت نام مدرس
            </Nav.Link>

            <Nav.Link
              className='mx-3'
              style={{ color: 'white', fontWeight: 'bolder', textAlign: 'end' }}
            >
              تماس با ما
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
