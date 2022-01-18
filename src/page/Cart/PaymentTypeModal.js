import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Loading from '../../component/Loading/Loading'
import { useProjectContext } from '../../context/ProjectProvider'
import { useCookies } from 'react-cookie'

export const PaymentTypeModal = ({ sendData }) => {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  const {
    showPaymentTypeModal,
    setShowPaymentTypeModal,
    paymentTypeModalShow,
    paymentTypeModalClose,
    setPaymentTypeModalClose,
    setSelectedPaymentType,
    paymentTypeList,
    setPaymentTypeList,
    closePaymentTypeModal,
    userData,
  } = useProjectContext()

  useEffect(() => {}, [showPaymentTypeModal])

  const selectPaymentType = (address) => {
    setSelectedPaymentType(address)
    closePaymentTypeModal()
    sendData(address)
  }

  return (
    <Modal show={showPaymentTypeModal} onHide={closePaymentTypeModal} size='md'>
      <Modal.Body>
        {paymentTypeList ? (
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
                <span style={{ marginLeft: '5px' }}>انتخاب روش پرداخت</span>
              </div>
            </Modal.Title>
            <div className='col-10 mt-3' style={{ margin: 'auto' }}>
              {paymentTypeList ? (
                paymentTypeList.map((e) => {
                  return (
                    <div
                      onClick={() => selectPaymentType(e.id)}
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
                          marginRight: '15px',
                        }}
                      >
                        {e['name']}
                      </span>
                      <img alt={e.id} src={e.image} style={{ width: '10%' }} />
                    </div>
                  )
                })
              ) : (
                <Loading />
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </Modal.Body>
    </Modal>
  )
}
