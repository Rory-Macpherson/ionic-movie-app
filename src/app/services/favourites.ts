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

  //make storage
  async init(){
    await this.storage.create();
  }

  //set into storage
  async set(key:string, value:any){
    await this.storage.set(key, value);
  }
  //return from storage 
  async get(key:string){
    return await this.storage.get(key);
  }

  //this is basically a boolean, it returns true if result gets a movie and 
  //false if it is null
  async check(key: string) {
  const result = await this.storage.get(key);
  return result !== null;
}

//romoveeeeeee- its in the name 
  async remove(key: string) {
    await this.storage.remove(key);
  } 


  // ok new method
  // i looked up how to do this
  //from https://forum.ionicframework.com/t/get-all-values-from-ionic-storage/101842/10
  //its a method called getAll
  //it returns all the values from all the keys in the storage.
  //pretty nifty and short
 async getAll() {
   return this.storage.keys()
  .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }
} 
