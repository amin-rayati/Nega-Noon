import { ReactChild, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useLocation,
} from 'react-router-dom'

import { useProjectContext } from './context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'

import Public from './page/sepratePage/Public'
import Private from './page/sepratePage/Private'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'
function _ScrollToTop(props) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return props.children
}
export const ScrollToTop = withRouter(_ScrollToTop)

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
    <div>
      <Router>
        <Switch>
          <Route path='/callback' component={Private} />
          <Route path='/' component={Public} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
