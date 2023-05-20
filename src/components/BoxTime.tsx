
interface BoxTimeProps {
  value: number,
  type: 'dia' | 'hora' | 'minuto' | 'segundo',
}

export function BoxTime({ value, type }: BoxTimeProps) {

  const prefixo = type[0];

  return (
    <div 
      className='flex flex-col items-center justify-center bg-white h-40 w-40 shadow-md rounded-lg'
    >
      <h3 
        contentEditable={true}
        onBlur={() => alert('al')}
        className="font-extrabold text-zinc-700 text-4xl"
      >
        {value < 10 ? `0${value}` : value}
        <span className="text-3xl text-blue-600">{prefixo}</span>
      </h3>
      <span className='font-normal relative top-1 text-zinc-600 text-lg'>
        ({type}<strong className="text-sm">s</strong>)
      </span>
    </div>
  )
}