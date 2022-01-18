import { React, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useProjectContext } from '../../context/ProjectProvider'
import giff from '../../assets/img/giff.gif'
const Recepie = ({ pro }) => {
  const { RecepieModal, RecepieClose, RecepieShow } = useProjectContext()

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
        <script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></script>
        <img src={giff} alt='gif' style={{ width: '100%' }} />
        <div style={{ justifyContent: 'center' }}>
          <p
            style={{
              fontWeight: '100',
              fontSize: '15px',
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
