export interface IPrice {
  total : number,
  pier : number,
}

interface IMark {
  title : string,
  background : string,
  color : string,
}

interface IState {
  id: number,
  img : string,
  duration : string,
  mark? : IMark,
  title : string,
  content : string[],
  times : string[],
  price : IPrice,
}

export const State: IState[] = [
  {
    id : 1,
    img : 'https://sun9-39.userapi.com/impg/4utxEa8Ywfq80zsoHht4rVijr6UKw1BrSScAJQ/I6s0Id-rKw4.jpg?size=473x369&quality=96&sign=4be7d121ed9fd4298a327f44d221514c&type=album',
    duration : '2 часа',
    mark : {
      title : 'Новинка',
      background : 'rgba(9, 156, 232, 1)',
      color : 'rgba(255, 255, 255, 1)',
    },
    title : 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    content : [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times : ['12:00', '12:00', '12:00', '12:00'],
    price : {
      total : 1900,
      pier : 1200,
    },
  },
  {
    id : 2,
    mark : {
      title : 'Круглый год',
      background : 'rgba(255, 216, 59, 1)',
      color : 'rgba(50, 50, 50, 1)',
    },
    img : 'https://sun9-76.userapi.com/impg/4FH968kO10u8FuZvA_C0OzsSH7vlAV4YUwUfEQ/UHX9LP5TdKI.jpg?size=472x369&quality=96&sign=c1a525e9e752ee6e16da9724367a0863&type=album',
    duration : '2 часа',
    title : 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    content : [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times : ['12:00', '12:00', '12:00', '12:00', '12:00', '12:00', '12:00', '12:00'],
    price : {
      total : 2900,
      pier : 1200,
    },
  },
  {
    id : 2,
    img : 'https://sun9-83.userapi.com/impg/QN1zI8EZ7r-6LOpxH3HNCJ1dX864ezgf3pxDbg/Y06zNYkJeQ8.jpg?size=467x368&quality=96&sign=65273a923af6c9243d7facf69dd230e6&type=album',
    duration : '2 часа',
    title : 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
    content : [
      'Билет на целый день',
      'Неограниченное число катаний',
      '6 остановок у главных достопримечательностей',
    ],
    times : ['12:00', '12:00', '12:00', '12:00', '12:00'],
    price : {
      total : 2900,
      pier : 1200,
    },
  }
]
