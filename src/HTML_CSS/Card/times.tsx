interface ITimesProps {
  times : string[],
}

export const Times: React.FC<ITimesProps> = ({ times }) => {

  if (times.length > 4) {
    return (
      <>
        {times.map((item, index) => index < 3 ? <span className='times__option' key={index}>{item}</span> : '')}
        <span className='times__option'>Еще...</span>
      </>
    )
  }
  return (
    <>
      { times.map((item, index) => <span className='times__option' key={index}>{item}</span>) }
    </>
  )
}
