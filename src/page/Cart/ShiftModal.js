import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Loading from '../../component/Loading/Loading'
import { useProjectContext } from '../../context/ProjectProvider'
import { useCookies } from 'react-cookie'

export const ShiftModal = (categoryId, dayId) => {
  const [shifts, setShifts] = useState({ catname: '', shifts: [] })
  const [loadingShifts, setLoadingShifts] = useState(false)
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const {
    showModal,
    setCloseModal,
    setShowModal,
    closeModal,
    selectedShift,
    setSelectedShift,
  } = useProjectContext()
  const getShifts = (categoryId, dayId) => {
    let body = {}
    body[categoryId['categoryId']] = categoryId['dayId']
    axios
      .post(
        'https://meyt.neganoon.ir/admin/SendingTimes/API/_SendingTimes?token=test',
        {
          cityId: parseInt(cookiesCityid['cityid']),
          categoryId: body,
        },
        {
          headers: {
            token: 'test',
          },
        }
      )
      .then((response) => {
        if (response.data.isDone) {
          setShifts(response.data.data[0])
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getShifts(categoryId, dayId)
  }, [showModal])

  const selectShift = (shift) => {
    setSelectedShift((oldValue) => {
      oldValue[categoryId['categoryId']] = shift
      return oldValue
    })
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={closeModal} size='md'>
      <Modal.Body>
        {!loadingShifts && shifts ? (
          <>
            <Modal.Title
              className='col-12'
              style={{ fontWeight: 'bolder', textAlign: 'center' }}
            >
              <div
                className='d-flex'
                style={{
                  borderRadius: '10px',
                  background: '#ff8334',
                  color: 'white',
                  padding: '10px 15px 10px 15px',
                  justifyContent: 'center',
                }}
              >
                <span style={{ marginLeft: '5px' }}>
                  ساعت تحویل {shifts['catname']}
                </span>
              </div>
            </Modal.Title>
            <div className='col-10 mt-3' style={{ margin: 'auto' }}>
              {shifts ? (
                shifts['shifts'].map((e) => {
                  return (
                    <div
                      onClick={() => selectShift(e)}
                      className='mt-3'
                      style={{
                        cursor: 'pointer',
                        borderRadius: '10px',
                        background: 'white',
                        border: '1px solid #c9c1c1',
                        color: 'balck',
                        padding: '15px 15px 15px 15px',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 'bolder',
                          fontSize: '20px',
                        }}
                      >
                        {e['sending_time_start']} -{e['sending_time_end']}
                      </span>
                    </div>
                  )
                })
              ) : (
                <Loading />
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => {
                  setCloseModal(true)
                  setShowModal(false)
                }}
                className='purchase-btn'
              >
                بعدی
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </Modal.Body>
    </Modal>
  )
}
