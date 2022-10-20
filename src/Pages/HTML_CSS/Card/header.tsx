interface IHeaderProps {
  img : string,
  mark? : string,
}

export const Header: React.FC<IHeaderProps> = ({ img, mark }) => {
  return (
    <header className='card__header'>
      <img src={img} alt='Постер'/>
      { mark && <div className='card__mark' style={{ background : mark.background, color : mark.color }}>{mark.title}</div> }
    </header>
  )
}
