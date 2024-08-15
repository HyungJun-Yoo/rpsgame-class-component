import React, { Component } from 'react'
import Box from './component/Box'
import Modal from './component/Modal'
import rock from './assets/rock.png'
import scissors from './assets/scissors.png'
import paper from './assets/paper.png'

const choice = {
  rock: {
    name: 'Rock',
    img: rock,
  },
  scissors: {
    name: 'Scissors',
    img: scissors,
  },
  paper: {
    name: 'Paper',
    img: paper,
  },
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        select: '',
        result: '',
      },
      computer: {
        select: '',
        result: '',
      },
      timer: 0,
      score: 0,
      gameOver: false,
      modalOpen: false,
      gameStarted: false,
    }

    this.interval = null
  }

  componentDidUpdate() {
    if (
      this.state.timer === 0 &&
      this.state.gameStarted &&
      !this.state.gameOver
    ) {
      this.setState({ gameOver: true, modalOpen: true })
    }
  }

  componentWillUnmount() {
    // 타이머 정리
    clearInterval(this.interval)
  }

  play = (userChoice) => {
    if (this.state.gameOver) return

    const userChioce = choice[userChoice]
    const computerChoice = this.randomChoice()

    const [userResult, computerResult] = this.judgement(
      userChioce,
      computerChoice
    )

    this.setState((prevState) => ({
      score:
        userResult === 'tie'
          ? prevState.score + 2
          : userResult === 'win'
          ? prevState.score + 5
          : prevState.score,
      user: {
        select: userChioce,
        result: userResult,
      },
      computer: {
        select: computerChoice,
        result: computerResult,
      },
    }))
  }

  randomChoice = () => {
    const itemArray = Object.keys(choice)
    const randomItem = Math.floor(Math.random() * itemArray.length)
    const final = itemArray[randomItem]
    return choice[final]
  }

  judgement = (user, computer) => {
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

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      gameOver: false,
      gameStarted: false,
    })
  }

  startGame = () => {
    this.interval = null
    this.setState(
      {
        gameStarted: true,
        score: 0,
        timer: 30,
        user: { select: '', result: '' },
        computer: { select: '', result: '' },
      },
      () => {
        this.startTimer()
      }
    )
  }

  startTimer = () => {
    if (this.interval) return

    this.interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer < 1) {
          clearInterval(this.interval)
          return { timer: 0 }
        }

        return { timer: prevState.timer - 1 }
      })
    }, 1000)
  }

  render() {
    const { startGame, play, handleCloseModal } = this
    const { user, computer, timer, score, modalOpen, gameStarted } = this.state

    return (
      <div className='h-screen bg-gradient-to-b from-pink-200 to-purple-300 flex flex-col justify-center items-center min-h-[800px]'>
        <div className='w-full max-w-4xl h-[90%] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 max-sm:w-[95%] min-h-[600px]'>
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
                    승리하면{' '}
                    <span className='font-bold text-green-600'>5점</span>,
                    비기면{' '}
                    <span className='font-bold text-yellow-600'>2점</span>,
                    패배하면 <span className='font-bold text-red-600'>0점</span>
                    이 주어집니다.
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
            <div className='flex flex-col h-full justify-between min-h-[600px]'>
              <div className='flex h-full flex-col justify-between items-center'>
                <div className='flex flex-col items-center'>
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
              </div>
            </div>
          )}
        </div>
        <Modal isOpen={modalOpen} onClose={handleCloseModal} score={score} />{' '}
      </div>
    )
  }
}
