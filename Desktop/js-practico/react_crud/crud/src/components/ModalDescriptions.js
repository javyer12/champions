import React,{useState} from 'react'
import {
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

export const ModalDesc = () => {
  const [ modalOpenDesc, setModalOpenDesc ] = useState(false)
  // const handleOpenDesc = () => {
  //   setModalOpenDesc(true)
  // }
  return (

    <Modal isOpen={modalOpenDesc}>
      <ModalHeader>
        <p>title</p>
      </ModalHeader>
      <ModalBody>
        <input
          className="form-control"
          readoOnly
          placeholder='el equipo que selecciones'
          type='text'
          name='season'
        />
      </ModalBody>
      <ModalFooter>
            
        <button
          className='btn btn-primary'
          onClick={() => setModalOpenDesc(false)}>
          ok
        </button>
      </ModalFooter>
    </Modal>
  )
}