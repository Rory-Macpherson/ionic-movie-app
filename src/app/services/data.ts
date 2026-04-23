import { Injectable } from '@angular/core';

//i made this service just to save some id's. 
//services are great!

@Injectable({
  providedIn: 'root',
})
export class DataService {

  movieID: number = 0;
  memberID: number = 0;

  constructor() { }

}
