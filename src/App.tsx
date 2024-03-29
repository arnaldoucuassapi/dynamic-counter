import { useEffect, useState } from 'react'
import { BoxTime } from './components/BoxTime'
import { DotSeparator } from './components/DotSeparator'
import { Moon, RotateCcw, Settings, Sun } from 'lucide-react'
import { changeDarkMode } from './lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'

function App() {
  
  const [active, setActive] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | undefined>(true);

  // Select theme based in operating system
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage))) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [])

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

  function resetCounter() {
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
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
                    defaultValue={days}
                    maxLength={365}
                    onChange={(event) =>setDays(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Hour</Label>
                  <Input
                    id="maxWidth"
                    defaultValue={hours}
                    className="col-span-2 h-8"
                    type='number'
                    maxLength={24}
                    onChange={(event) => setHours(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Minute</Label>
                  <Input
                    id="height"
                    defaultValue={minutes}
                    className="col-span-2 h-8"
                    type='number'
                    maxLength={60}
                    onChange={(event) => setMinutes(Number(event.target.value))}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxHeight">Second</Label>
                  <Input
                    id="maxHeight"
                    className="col-span-2 h-8"
                    defaultValue={seconds}
                    type='number'
                    maxLength={60}
                    onChange={(event) => setSeconds(Number(event.target.value))}
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
