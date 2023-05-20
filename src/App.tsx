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
    <div className='flex flex-col justify-between h-[100vh]'>
      
      <div className='mt-10'>
        <h1 className='text-5xl text-blue-600 mb-3 text-center font-extrabold'>Timer Page</h1>
        <p className='text-center text-2xl'>Esta página estará disponivel brevemente...</p>
      </div>


      <div className='flex flex-1 justify-center items-center my-16'>
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
        className={
          `${active ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-800 hover:bg-blue-900'} py-3 px-9 rounded-lg shadow-2xl text-lg transition-colors text-zinc-100  w-fit m-auto my-10 relative -top-10`}
      >
        {active ? 'Parar' : 'Iniciar'} contangem
      </button>
    </div>
  )
}

export default App
