import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'
import Header from './component/Header'
import Footer from './component/Footer'
import Home from './page/Home/Home'
import Error from './page/Error/Error'
import ErrorLogin from './page/Error/ErrorLogin'
import Products from './page/products/Products'
import About from './page/aboutus/About'
import Rules from './page/rules/Rules'
import Support from './page/support/Support'
import { useProjectContext } from './context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import SingleProduct from './page/products/SingleProduct'
import Cart from './page/Cart/Cart'
import axios from 'axios'
import PageLoader from './page/PageLoader/PageLoader'
import Dashboard from './page/dashboard/Dashboard'
import Profile from './page/dashboard/Profile'
import Favourite from './page/dashboard/Favourite'
import Money from './page/dashboard/Money'
import Address from './page/dashboard/Address'
import Orders from './page/dashboard/Orders'
import Payments from './page/dashboard/Payments'
import OrdersDetails from './page/dashboard/OrdersDetails'
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )
  const { cityModalShow, cityModal, userData, setUserData } =
    useProjectContext()

  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

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
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/Products/:id'>
          <Products />
        </Route>
        <Route exact path='/Products/:id/:id'>
          <SingleProduct />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/About'>
          <About />
        </Route>
        <Route exact path='/Rules'>
          <Rules />
        </Route>
        <Route exact path='/Support'>
          <Support />
        </Route>
        <Route exact path='/Dashboard'>
          {cookies['user'] ? <Dashboard /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Profile'>
          {cookies['user'] ? <Profile /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Favourite'>
          {cookies['user'] ? <Favourite /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Address'>
          {cookies['user'] ? <Address /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Payments'>
          {cookies['user'] ? <Payments /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Orders'>
          {cookies['user'] ? <Orders /> : <ErrorLogin />}
        </Route>
        <Route exact path='/Money'>
          {cookies['user'] ? <Money /> : <ErrorLogin />}
        </Route>
        <Route exact path='/OrdersDetails/:id'>
          {cookies['user'] ? <OrdersDetails /> : <ErrorLogin />}
        </Route>
        <Route exact path='/pageLoader'>
          <PageLoader />
        </Route>

        <Route exact path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
