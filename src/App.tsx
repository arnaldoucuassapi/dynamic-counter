import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BoxTime } from './components/BoxTime'
import { DotSeparator } from './components/DotSeparator'

function App() {
  
  const [active, setActive] = useState(false)

  const [dias, setDias] = useState<number>(0);
  const [horas, setHoras] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(1);
  const [segundos, setSegundos] = useState<number>(3);

  function startCountage() {
    setActive(!active)    
  }

  function changeDate() {
    setTimeout(() => {
      if(segundos >= 1) {
        setSegundos(segundos - 1)
      } else if (minutos >= 1){
        setMinutos(minutos - 1)
        setSegundos(59)
      } else if (horas >= 1) {
        setHoras(horas - 1)
        setMinutos(59)
      } else if (dias >= 1) {
        setDias(dias - 1)
        setHoras(23)
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
        <BoxTime value={dias} type='dia' />
        <DotSeparator />
        <BoxTime value={horas} type='hora' />
        <DotSeparator />
        <BoxTime value={minutos} type='minuto' />
        <DotSeparator />
        <BoxTime value={segundos} type='segundo' />
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
