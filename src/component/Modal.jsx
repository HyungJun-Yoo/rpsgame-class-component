// Modal.js
import React from 'react'

const Modal = ({ isOpen, onClose, score }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 shadow-md w-96'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
          게임 종료
        </h2>
        <p className='text-gray-600 text-center'>최종 점수: {score}점</p>
        <button
          onClick={onClose}
          className='mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300'
        >
          닫기
        </button>
      </div>
    </div>
  )
}

export default Modal
