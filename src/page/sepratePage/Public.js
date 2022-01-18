import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import axios from 'axios'

import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Home from '../Home/Home'
import Error from '../Error/Error'
import ErrorLogin from '../Error/ErrorLogin'
import Products from '../products/Products'
import About from '../aboutus/About'
import Rules from '../rules/Rules'
import Support from '../support/Support'
import SingleProduct from '../products/SingleProduct'
import Cart from '../Cart/Cart'
import PageLoader from '../PageLoader/PageLoader'
import Dashboard from '../dashboard/Dashboard'
import Profile from '../dashboard/Profile'
import Favourite from '../dashboard/Favourite'
import Money from '../dashboard/Money'
import Address from '../dashboard/Address'
import Orders from '../dashboard/Orders'
import Payments from '../dashboard/Payments'
import OrdersDetails from '../dashboard/OrdersDetails'

const Public = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

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
        <Route exact path='/OrdersDetails/:id/:id'>
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

export default Public
