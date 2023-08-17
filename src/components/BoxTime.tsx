
interface BoxTimeProps {
  value: number,
  type: 'day' | 'hour' | 'minute' | 'second',
}

export function BoxTime({ value, type }: BoxTimeProps) {

  const prefixo = type[0];

  return (
    <div 
      className='flex flex-col items-center justify-center dark:bg-zinc-800 bg-white h-40 w-40 shadow-md rounded'
    >
      <h3 
        contentEditable={false}
        onBlur={() => alert('al')}
        className="font-bold dark:text-zinc-400 text-zinc-700 text-4xl"
      >
        {value < 10 ? `0${value}` : value}
        <span className="font-normal text-3xl text-blue-500">{prefixo}</span>
      </h3>
      
      <p className='font-light relative top-1 dark:text-zinc-200 text-zinc-600 text-lg'>
        [ {type}<span className="dark:text-zinc-500 text-sm">s</span> ]
      </p>
    </div>
  )
}