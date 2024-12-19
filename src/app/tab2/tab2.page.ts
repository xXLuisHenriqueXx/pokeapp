import { Component } from '@angular/core';

import { PokeapiService } from '../services/pokeapi.service';
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokeball: boolean = false;

  constructor(private pokeapiService: PokeapiService, private modalController: ModalController, private storageSerive: StorageService) { }

  async openPokemonDetail(pokemon: any) {
    const modal = await this.modalController.create({
      component: PokemonDetailComponent,
      componentProps: {
        pokemon
      }
    });
    return await modal.present();
  }

  getPokemon() {
    const id = this.pokeapiService.getRandomId(1, 1010);

    this.pokeapiService.getPokemon(id).subscribe((pokemon: any) => {
      this.openPokemonDetail(pokemon);
      this.addPokemon(pokemon);
    });
  }

  async addPokemon(PokemonData: any) {
    await this.storageSerive.savePokemon(PokemonData.id);
  }

  async ionViewWillEnter() {
    this.pokeball = await this.storageSerive.getPokeball();
  }
}