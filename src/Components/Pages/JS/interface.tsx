export interface IWay {
  isActive : boolean,
  ways : IWays[],
  activeWay : null | IWays,
};

interface IWays {
  id : string,
  text : string
}

//

export interface IResult {
  disabled : boolean,
  isActive : boolean,
  countOfTickets : number,
  price : number,
  duration : IDuration,
  start : null | IStart,
  toBack? : string,
  end : null | string,
}

interface IDuration {
  hours? : number,
  minutes : number,
}

interface IStart {
  number? : number | null,
  string : string| null,
}

//

export interface ILocalTimes {
  toA : ILocalTime[],
  toB : ILocalTime[],
}

export interface ITimesState {
  isActive : boolean,
  start : null | IStart,
  times : null | ILocalTime[],
};

export interface ILocalTime {
  resultNumber : number,
  resultString : string,
}

export interface IMoscowTimes {
  toA : string[],
  toB : string[],
}
