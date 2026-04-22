import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Favourites {

  /*first thing that happens is this constructor calls 
  a init method that creates the storage.
  then we have basic getters and setters and a remove function*/
  
  constructor(private storage: Storage){
    this.init();
  }
  async init(){
    await this.storage.create();
  }
  async set(key:string, value:any){
    await this.storage.set(key, value);
  }
  async get(key:string){
    return await this.storage.get(key);
  }
  async remove(key: string) {
    await this.storage.remove(key);
  } 
} 
