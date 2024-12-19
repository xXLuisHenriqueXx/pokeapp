import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface PokemonData {
  id: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage | null = null;
  private pokeball: boolean = true;


  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();

    this._storage = storage;
  }

  async savePokemon(id: number) {
    const date = new Date().toISOString().split('T')[0];

    const pokemonList: PokemonData[] = (await this._storage?.get('pokemon-list')) || [];

    if (pokemonList.find((item: PokemonData) => item.id === id)) return;
  
    pokemonList.push({ id, date });
    await this._storage?.set('pokemon-list', pokemonList);
  }

  async getAllPokemons(): Promise<PokemonData[]> {
    return (await this._storage?.get('pokemon-list')) || [];
  }

  async getPokeball(): Promise<boolean> {
    await this.checkPokeball();
    return this.pokeball;
  }

  private async checkPokeball() {
    const storedPokemonList = await this.getAllPokemons();
    const today = new Date().toISOString().split('T')[0];
    this.pokeball = storedPokemonList.some((pokemon: PokemonData) => pokemon.date === today);
  }
}
