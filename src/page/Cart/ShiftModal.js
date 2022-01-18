import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Loading from '../../component/Loading/Loading'
import { useProjectContext } from '../../context/ProjectProvider'
import { useCookies } from 'react-cookie'

export const ShiftModal = (categoryId, dayId) => {
  const [shifts, setShifts] = useState({ catname: '', shifts: [] })
  const [loadingShifts, setLoadingShifts] = useState(false)
  const [loading, setLoading] = useState(false)
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
    shiftModalOpen,
    shiftModalClose,
    idOfDay,
    setIdOfDay,
  } = useProjectContext()
  const getShifts = (categoryId) => {
    setLoading(true)
    let body = {}
    body[categoryId['categoryId']] = categoryId['dayId']

    axios
      .post(
        'https://meyt.neganoon.ir/admin/SendingTimes/API/_SendingTimes?token=test',
        {
          cityId: parseInt(cookiesCityid['cityid']),
          categoryId: categoryId['categoryId'],
          dayId: categoryId['dayId'],
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
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getShifts(categoryId, dayId)
  }, [showModal])

  const selectShift = (shift, DAYID) => {
    setSelectedShift((oldValue) => {
      oldValue[categoryId['categoryId']] = { shift, DAYID }
      return oldValue
    })
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={shiftModalClose} size='md'>
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
              {shifts['shifts'].length > 0 ? (
                shifts['shifts'].map((e) => {
                  return (
                    <div
                      onClick={() => {
                        selectShift(e, shifts['dayId'])
                      }}
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
                <>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                      <span>در حال حاضر شیفتی برای این محصول وجود ندارد</span>
                    </div>
                  )}
                </>
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
