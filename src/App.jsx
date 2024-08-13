import { useState, useEffect } from 'react'
import Box from './component/Box'
import Modal from './component/Modal' // 모달 컴포넌트 import

const choice = {
  rock: {
    name: 'Rock',
    img: 'https://media.istockphoto.com/photos/stone-pebble-gray-picture-id1288973456?b=1&k=20&m=1288973456&s=170667a&w=0&h=GBGgp4yrZv4ooDBws8yHF24sJ3rkEpObYsBWpVNKFT8=',
  },
  scissors: {
    name: 'Scissors',
    img: 'https://www.ikea.com/kr/en/images/products/sy-scissors__0112301_pe263788_s5.jpg?f=s',
  },
  paper: {
    name: 'Paper',
    img: 'https://www.collinsdictionary.com/images/full/paper_111691001.jpg',
  },
}

function App() {
  // 유저 선택과 승패 여부
  const [user, setUser] = useState({
    select: '',
    result: '',
  })

  // 컴퓨터 선택과 승패 여부
  const [computer, setComputer] = useState({
    select: '',
    result: '',
  })

  // 타이머
  const [timer, setTimer] = useState(30)
  // 최종 점수 기록
  const [score, setScore] = useState(0)
  // 게임 종료 여부
  const [gameOver, setGameOver] = useState(false)
  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false)
  // 게임 시작 여부
  const [gameStarted, setGameStarted] = useState(false)

  // 게임이 시작되고 타이머가 0초가 되면 게임이 종료되고 기록된 최종 점수를 모달로 보여줌
  useEffect(() => {
    if (timer > 0 && gameStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0 && gameStarted) {
      setGameOver(true)
      setModalOpen(true) // 모달 열기
    }
  }, [timer, gameStarted])

  // 게임 플레이
  const play = (userChoice) => {
    if (gameOver) return // 게임이 끝나면 더 이상 진행하지 않음

    let userChioce = choice[userChoice]
    let computerChoice = randomChoice()

    // 결과 기록 [유저의 승무패, 컴퓨터의 승무패]
    let [userResult, computerResult] = judgement(userChioce, computerChoice)

    // 점수 기록
    setScore((prev) =>
      userResult === 'tie'
        ? prev + 2
        : userResult === 'win'
        ? prev + 5
        : prev + 0
    )

    setUser((user) => ({
      ...user,
      select: userChioce,
      result: userResult,
    }))

    setComputer((computer) => ({
      ...computer,
      select: computerChoice,
      result: computerResult,
    }))
  }

  // 컴퓨터의 랜덤 선택
  const randomChoice = () => {
    let itemArray = Object.keys(choice)
    let randomItem = Math.floor(Math.random() * itemArray.length)
    let final = itemArray[randomItem]
    return choice[final]
  }

  // 유저와 컴퓨터의 승무패를 알려줌
  const judgement = (user, computer) => {
    if (user.name === computer.name) {
      return ['tie', 'tie']
    } else if (user.name === 'Rock') {
      return computer.name === 'Scissors' ? ['win', 'lose'] : ['lose', 'win']
    } else if (user.name === 'Scissors') {
      return computer.name === 'Paper' ? ['win', 'lose'] : ['lose', 'win']
    } else if (user.name === 'Paper') {
      return computer.name === 'Rock' ? ['win', 'lose'] : ['lose', 'win']
    }
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false) // 모달 닫기
    setGameOver(false) // 게임 상태 초기화
    setGameStarted(false) // 게임 시작 상태 초기화
  }

  // 게임 시작 시 초기화
  const startGame = () => {
    setGameStarted(true) // 게임 시작 상태 설정
    setScore(0) // 점수 초기화
    setTimer(30) // 타이머 초기화
    setUser({ select: '', result: '' }) // 사용자 선택 초기화
    setComputer({ select: '', result: '' }) // 컴퓨터 선택 초기화
  }

  return (
    <div className='h-screen bg-gradient-to-b from-pink-200 to-purple-300 flex flex-col justify-center items-center'>
      <div className='w-full max-w-4xl h-[90%] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 max-sm:w-[95%]'>
        {!gameStarted ? (
          <div className='flex flex-col items-center'>
            <h2
              className='text-2xl font-bold mb-4 text-center text-sky-600'
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              가위 바위 보 게임 이용 방법
            </h2>
            <p
              className='text-center mb-6 text-gray-800 px-4'
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              이 게임은 가위, 바위, 보 중 하나를 선택하여 컴퓨터와 겨루는
              게임입니다.
            </p>
            <div className='bg-white rounded-lg shadow-md p-6 mb-4 w-full'>
              <ul className='list-disc list-inside text-gray-700 text-sm md:text-base'>
                <li style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  가위는 보를 이기고, 바위는 가위를 이기며, 보는 바위를
                  이깁니다.
                </li>
                <li style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  같은 것을 내면 비기게 됩니다.
                </li>
                <li style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  승리하면 <span className='font-bold text-green-600'>5점</span>
                  , 비기면{' '}
                  <span className='font-bold text-yellow-600'>2점</span>,
                  패배하면 <span className='font-bold text-red-600'>0점</span>이
                  주어집니다.
                </li>
              </ul>
            </div>
            <p
              className='text-center text-lg font-semibold text-sky-500 mb-8'
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              제한 시간 내에 많은 점수를 획득해보세요!
            </p>
            <button
              onClick={startGame}
              className='bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300'
            >
              게임 시작
            </button>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center mb-8'>
              <div className='flex flex-col items-center mb-8'>
                <div className='bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg p-4 shadow-lg mb-4 w-full max-w-xs text-center'>
                  <div className='text-xl font-bold text-white'>{`타이머: ${timer}`}</div>
                </div>
                <div className='bg-gray-200 rounded-lg p-4 shadow-lg w-full max-w-xs text-center'>
                  <div className='text-xl font-bold text-gray-800'>{`Score: ${score}`}</div>
                </div>
              </div>
              <div className='flex w-full justify-center items-center mt-4 gap-8'>
                <Box title='User' item={user} />
                <Box title='Computer' item={computer} />
              </div>
            </div>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={() => play('scissors')}
                className='bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300'
              >
                가위
              </button>
              <button
                onClick={() => play('rock')}
                className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300'
              >
                바위
              </button>
              <button
                onClick={() => play('paper')}
                className='bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300'
              >
                보
              </button>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} score={score} />{' '}
      {/* 모달 추가 */}
    </div>
  )
}

export default App
