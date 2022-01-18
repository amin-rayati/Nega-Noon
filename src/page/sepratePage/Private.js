import React from 'react'
import PositiveCallBack from '../callBack/PositiveCallBack'
import NegativeCallBack from '../callBack/NegativeCallBack'
import WallerCallBack from '../callBack/WalletCallBack'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Cookies, useCookies } from 'react-cookie'

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
const Private = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header />
            <Home />
            <Footer />
          </Route>

          <Route exact path='/Products/:id'>
            <Header />

            <Products />
            <Footer />
          </Route>
          <Route exact path='/Products/:id/:id'>
            <Header />

            <SingleProduct />
            <Footer />
          </Route>
          <Route exact path='/cart'>
            <Header />

            <Cart />
            <Footer />
          </Route>
          <Route exact path='/About'>
            <Header />

            <About />
            <Footer />
          </Route>
          <Route exact path='/Rules'>
            <Header />

            <Rules />
            <Footer />
          </Route>
          <Route exact path='/Support'>
            <Header />

            <Support />
            <Footer />
          </Route>
          <Route exact path='/Dashboard'>
            <Header />

            {cookies['user'] ? <Dashboard /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Profile'>
            <Header />

            {cookies['user'] ? <Profile /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Favourite'>
            <Header />

            {cookies['user'] ? <Favourite /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Address'>
            <Header />

            {cookies['user'] ? <Address /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Payments'>
            <Header />

            {cookies['user'] ? <Payments /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Orders'>
            <Header />

            {cookies['user'] ? <Orders /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/Money'>
            <Header />

            {cookies['user'] ? <Money /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/OrdersDetails/:id'>
            <Header />

            {cookies['user'] ? <OrdersDetails /> : <ErrorLogin />}
            <Footer />
          </Route>
          <Route exact path='/pageLoader'>
            <Header />

            <PageLoader />
            <Footer />
          </Route>

          <Route exact path='/callback/addcredit/success'>
            <WallerCallBack />
          </Route>
          <Route exact path='/callback/payment/success'>
            <PositiveCallBack />
          </Route>
          <Route exact path='/callback/fail'>
            <NegativeCallBack />
          </Route>

          <Route exact path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Private
