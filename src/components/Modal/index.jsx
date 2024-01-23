import React from 'react'
import './modal.scss'

export default function Modal({children}) {
  return (
    <div className='modal_outlayer_container'>
        <div className='modal_inside_layer_container'>
            {children}
        </div>
    </div>
  )
}
