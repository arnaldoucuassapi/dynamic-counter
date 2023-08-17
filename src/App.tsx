import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BoxTime } from './components/BoxTime'
import { DotSeparator } from './components/DotSeparator'
import { Clock, Moon, Plus, RotateCcw, Settings, Sun } from 'lucide-react'
import { changeDarkMode } from './lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { Switch } from './components/ui/switch'
import { Button } from './components/ui/button'

function App() {
  
  const [active, setActive] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | undefined>(true);

  // Select theme based in operating system
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [])

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

  function resetCounter() {
    setDias(0);
    setHoras(0);
    setMinutos(0);
    setSegundos(0);
  }

  return (
    <div 
      className='flex flex-col items-center justify-center gap-16 bg-zinc-100 dark:bg-zinc-900 h-screen'
    >
      <div className='flex space-x-4 items-center absolute top-8 right-24'>
        <button onClick={() => {changeDarkMode(); setDarkMode(!darkMode);}} className='text-zinc-400 p-1'>
          {!darkMode && <Moon  className='text-slate-700'/>}
          {darkMode && <Sun className='animate-spin repeat-1 duration-200' />}
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button className='text-zinc-700 dark:text-zinc-400 shadow-lg p-1 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800'>
              <Settings />
            </button>
          </PopoverTrigger>

          <PopoverContent className='mr-8'>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="dark:text-zinc-100 text-zinc-900 font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Set the values for the counter.
                </p>
              </div>

              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Day</Label>
                  <Input
                    id="width"
                    className="col-span-2 h-8"
                    type='number'
                    defaultValue={dias}
                    maxLength={365}
                    onChange={(event) =>setDias(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Hour</Label>
                  <Input
                    id="maxWidth"
                    defaultValue={horas}
                    className="col-span-2 h-8"
                    type='number'
                    maxLength={24}
                    onChange={(event) => setHoras(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Minute</Label>
                  <Input
                    id="height"
                    defaultValue={minutos}
                    className="col-span-2 h-8"
                    type='number'
                    maxLength={60}
                    onChange={(event) => setMinutos(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Second</Label>
                  <Input
                    id="maxHeight"
                    className="col-span-2 h-8"
                    defaultValue={segundos}
                    type='number'
                    maxLength={60}
                    onChange={(event) => setSegundos(Number(event.target.value))}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={resetCounter} className='flex items-center gap-1 h-9'>RESET <RotateCcw size={18} /></Button>
      </div>

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
