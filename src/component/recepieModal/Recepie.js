import { React, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'

const Recepie = ({ pro }) => {
  const { RecepieModal, RecepieClose, RecepieShow } = useProjectContext()
  console.log(pro)
  return (
    <Modal
      onHide={RecepieClose}
      show={RecepieModal}
      size='md'
      style={{ height: '80%', overFelow: 'scroll' }}
    >
      <Modal.Header style={{ justifyContent: 'center' }}>
        <Modal.Title
          style={{ color: '#ff8334', marginTop: '10px', textAlign: 'center' }}
        >
          طرز تهیه {pro['name']}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ justifyContent: 'center' }}>
          <p
            style={{
              fontWeight: '500',
              fontSize: '20px',
              direction: 'rtl',
              textAlign: 'justify',
            }}
          >
            {pro['howToCook']}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Recepie
