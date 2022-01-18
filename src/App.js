import { ReactChild, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useProjectContext } from './context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'

import Public from './page/sepratePage/Public'
import Private from './page/sepratePage/Private'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )
  const { cityModalShow, cityModal, userData, setUserData } =
    useProjectContext()

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0)
  // }
  window.onload = function () {
    if (cookies['user']) {
      getIndividualInfo()
    }
    if (!cookiesCityname['cityname']) {
      cityModalShow()
    }
  }
  function ScrollToTop() {
    const { pathname } = useLocation()
    const activePath = pathname.split('2')

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }
  const getIndividualInfo = () => {
    axios
      .post(
        'https://meyt.neganoon.ir/admin/Customers/API/_getCustomerInfo?token=test',
        {
          mobile: cookies['user']['mobile'],
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setUserData(response.data.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path='/callback' component={Private} />
          <Route path='/' component={Public} />
        </Switch>
      </Router>
    </>
  )
}

export default App
