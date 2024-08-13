import React from 'react'

const Box = ({ title, item }) => {
  const { select, result } = item

  // 결과에 따라 테두리 색상 설정
  const borderColor =
    result === 'win'
      ? 'border-green-500'
      : result === 'lose'
      ? 'border-red-500'
      : 'border-gray-300'

  return (
    <div
      className={`border-solid border-4 ${borderColor} rounded-lg min-h-[450px] md:min-h-[500px] p-6 flex flex-col items-center justify-between transition-all duration-300 max-sm:w-[150px]`}
    >
      <h1 className='text-xl font-semibold mb-2'>{title}</h1>
      <h2 data-testid='item-name' className='text-lg'>
        {select && select.name}
      </h2>

      <div className='w-full flex justify-center bg-white'>
        {select && select.img ? (
          <img
            className='w-[150px] h-[150px] object-contain rounded-full shadow-lg'
            src={select.img}
            alt={select.name}
          />
        ) : (
          <div className='w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center shadow-lg'>
            <span className='text-gray-500'></span>
          </div>
        )}
      </div>
      <h2 className='text-lg mt-2'>{item && result}</h2>
    </div>
  )
}

export default Box
