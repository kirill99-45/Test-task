import { useState, useRef } from 'react';

interface ITimesProps {
  times : string[],
  countOfVisibleTimes : number,
}

export const Times: React.FC<ITimesProps> = ({ times, countOfVisibleTimes }) => {

  if (times.length > countOfVisibleTimes) {
    return (
      <>
        {times.map((item, index) => {
          return index < countOfVisibleTimes ? <span className='times__option' key={index}>{item}</span> : ''
        })}
      </>
    )
  }
  return (
    <>
      { times.map((item, index) => <span className='times__option' key={index}>{item}</span>) }
    </>
  )
}
