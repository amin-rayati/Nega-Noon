import { React, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'

const ModalCity = () => {
  const [cookiesStateid, setCookieStateid, removeCookieStateid] = useCookies([
    'stateid',
  ])
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const [cookiesCityname, setCookieCityname, removeCookieCityname] = useCookies(
    ['cityname']
  )

  const { cityModal, cityModalClose, cityIdChange, setCityIdChange } =
    useProjectContext()
  const [states, setStates] = useState('')
  const [city, setCity] = useState('')

  const getAllStates = async () => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/States/API/_apiGetStates?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: {
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setStates(content.data)
      }
      console.log(content)
    } catch (error) {
      console.log(error)
    }
  }
  const stateIdset = (id) => {
    setCookieStateid('stateid', id, {
      path: '/',
    })
  }
  const cityIdset = (id) => {
    setCookieCityid('cityid', id, {
      path: '/',
    })
    setCityIdChange(id)
  }

  const cityNameset = (name) => {
    setCookieCityname('cityname', name, {
      path: '/',
    })
    cityModalClose()
  }

  const getAllcities = async (id) => {
    try {
      const rawResponse = await fetch(
        'https://meyt.neganoon.ir/admin/Cities/API/_apiGetCities?token=test',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          }),
          body: JSON.stringify({
            stateId: id,
          }),
        }
      )
      const content = await rawResponse.json()

      if (content.isDone) {
        setCity(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllStates()
    getAllcities(cookiesStateid['stateid'])
  }, [])

  return (
    <Modal
      show={cityModal}
      size='lg'
      style={{ height: '80%', overFelow: 'scroll' }}
      backdrop='static'
    >
      <Modal.Header style={{ justifyContent: 'center' }}>
        <Modal.Title
          style={{ color: '#ff8334', marginTop: '10px', textAlign: 'center' }}
        >
          منطقه خود را انتخاب کنید
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row' style={{ justifyContent: 'end' }}>
          <div
            className='col-lg-8 col-md-8 col-sm-8 col-5   row'
            style={{ justifyContent: 'end', height: '100%' }}
          >
            {city &&
              city.map((e) => {
                return (
                  <div
                    onClick={() => {
                      cityIdset(e.cityId)
                    }}
                    className='col-lg-4 col-md-6 col-sm-6 col-12 pl-0'
                  >
                    <p
                      onClick={() => {
                        cityNameset(e.cityName)
                      }}
                      className={
                        e.cityId == cookiesCityid['cityid']
                          ? 'choosen-city'
                          : 'city'
                      }
                    >
                      {e.cityName}
                    </p>
                  </div>
                )
              })}
          </div>
          <div
            className='col-lg-4 col-md-4 col-sm-4 col-7 d-flex flex-column'
            style={{ borderLeft: '3px solid #ff873b' }}
          >
            {states &&
              states.map((e) => {
                return (
                  <span
                    onClick={() => {
                      stateIdset(e.stateId)
                      getAllcities(e.stateId)
                    }}
                    className={
                      e.stateId == cookiesStateid['stateid']
                        ? 'choosen-state'
                        : 'state'
                    }
                  >
                    {e.stateName}
                  </span>
                )
              })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalCity
