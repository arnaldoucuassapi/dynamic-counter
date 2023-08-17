import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BoxTime } from './components/BoxTime'
import { DotSeparator } from './components/DotSeparator'

function App() {
  
  const [active, setActive] = useState(false)

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(3);

  function startCountage() {
    setActive(!active)    
  }

  function changeDate() {
    setTimeout(() => {
      if(seconds >= 1) {
        setSeconds(seconds - 1)
      } else if (minutes >= 1){
        setMinutes(minutes - 1)
        setSeconds(59)
      } else if (hours >= 1) {
        setHours(hours - 1)
        setMinutes(59)
      } else if (days >= 1) {
        setDays(days - 1)
        setHours(23)
      } else {
        setActive(!active)
      }
      
    }, 1000)
  }

  if (active) {
    changeDate()
  }

  return (
    <div 
      className='flex flex-col items-center justify-center gap-16 bg-zinc-100 dark:bg-zinc-900 h-screen'
    >
      <h1 
        className='text-6xl font-bold text-center bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text'
      >
        Dynamic Counter
      </h1>


      <div className='flex justify-center items-center'>
        <BoxTime value={days} type='day' />
        <DotSeparator />
        <BoxTime value={hours} type='hour' />
        <DotSeparator />
        <BoxTime value={minutes} type='minute' />
        <DotSeparator />
        <BoxTime value={seconds} type='second' />
      </div>


      <button 
        onClick={startCountage}
        data-active={active}
        className='bg-blue-600 py-2 px-8 data-[active=true]:bg-red-600 hover:opacity-75 rounded shadow-md shadow-zinc-900/40 font-semilbold text-lg transition-opacity text-zinc-100'
      >
        {active ? 'Stop' : 'Start'} counter
      </button>
    </div>
  )
}

export default App
