interface IWays {
  id : string,
  text : string
}

export interface ITimesState {
  isActive : boolean,
  start : null | string | number,
  times : null | string[] ,
};

export interface IWay {
  isActive : boolean,
  ways : IWays[],
  activeWay : null | IWays,
};

interface IDuration {
  hours? : number,
  minutes : number,
}

interface IStart {
  number : number,
  string : string,
}

export interface IResult {
  disabled : boolean,
  isActive : boolean,
  countOfTickets : number,
  price : number,
  duration : IDuration,
  start : null | IStart | string,
  end : null | string,
}
