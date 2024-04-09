import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CalcService {
  data: any;

  constructor() { }

  public get miles() : number {
    let data = this.data.filter((doc: any) => doc._milesEnd > 0 && doc._milesStart > 0);
    let sum = 0;
    
    data.forEach((doc: any) => {
      let difference = doc._milesEnd - doc._milesStart;
      sum += difference
    });

    return Number(sum);
  }
  
  public get missing() : any {
    return this.data.filter((doc: any) => doc._milesEnd == 0);
  }

  public get lastMileage() : number {
    let startMile = Math.max(...this.data.map((data: any) => data._milesStart));
    let endMile = Math.max(...this.data.map((data: any) => data._milesEnd));
    let last = startMile > endMile ? startMile : endMile;

    return last;
  }
  
  public getData() : any {
    return this.data 
  }

  public setData(v : any) {
    this.data = v;
  }

}
