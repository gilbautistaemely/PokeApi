import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = environment.url

  constructor(private Http : HttpClient) { }

  getAll(){
    return this.Http.get<any>(`${this.url}`)
  }

  getPokemon(index){
    return this.Http.get<any>(`${this.url}/${index}`)
  }

  
}
