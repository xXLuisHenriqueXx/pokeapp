import { Component } from '@angular/core';

import { PokeapiService } from '../services/pokeapi.service';
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokemonList: any[] = [];

  constructor(private pokeapiService: PokeapiService, private modalController: ModalController, private storageService: StorageService) { }

  async openPokemonDetail(pokemon: any) {
    const modal = await this.modalController.create({
      component: PokemonDetailComponent,
      componentProps: {
        pokemon
      }
    });
    return await modal.present();
  }

  async loadPokemons() {
    const storagePokemonList = await this.storageService.getAllPokemons();
    if (storagePokemonList.length === 0) return;

    const promises = storagePokemonList.map((storedPokemon: any) =>
      this.pokeapiService.getPokemon(storedPokemon.id).toPromise()
    );

    const pokemonDataArray = await Promise.all(promises);
    this.pokemonList = pokemonDataArray;
  }

  async ionViewWillEnter() {
    await this.loadPokemons();
  }
}
