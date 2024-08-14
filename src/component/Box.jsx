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

  // 결과에 따라 폰트 색상 설정
  const fontColor =
    result === 'win'
      ? 'text-green-400'
      : result === 'lose'
      ? 'text-red-400'
      : 'text-gray-400'

  return (
    <div
      className={`border-solid border-4 ${borderColor} rounded-lg h-[450px] p-6 flex flex-col items-center justify-between transition-all duration-300 max-sm:w-[150px] max-md:h-[400px]`}
    >
      <h1
        className={`text-4xl font-semibold mb-2 ${fontColor} transition-all duration-300 max-sm:text-2xl`}
      >
        {title}
      </h1>

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
      <h2
        className={`text-3xl mt-2 font-bold ${fontColor} transition-all duration-300 max-sm:text-2xl`}
      >
        {item && result}
      </h2>
    </div>
  )
}

export default Box
