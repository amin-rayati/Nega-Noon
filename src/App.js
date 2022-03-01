import { ReactChild, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useLocation,
} from 'react-router-dom'
import Home from './Page/Home/Home'
import Dore from './Page/Dore/Dore'
import ContactUs from './Page/ContactUs/ContactUs'
import About from './Page/About/About'
import Customers from './Page/Customers/Customers'
import Certificate from './Page/Certificate/Certificate'
import Service from './Page/Service/Service'
import AskDore from './Page/Dore/AskDore'
import TeacherForm from './Page/TeacherForm/TeacherForm'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { useProjectContext } from './context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/doreha'>
            <Dore />
          </Route>
          <Route exact path='/ask'>
            <AskDore />
          </Route>
          <Route exact path='/contact'>
            <ContactUs />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/Customers'>
            <Customers />
          </Route>
          <Route exact path='/Certificate'>
            <Certificate />
          </Route>
          <Route exact path='/Service'>
            <Service />
          </Route>
          <Route exact path='/teacherregister'>
            <TeacherForm />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
