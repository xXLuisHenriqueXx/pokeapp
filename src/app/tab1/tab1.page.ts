import { Component } from '@angular/core';

import { PokeapiService } from '../services/pokeapi.service';
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pokemonDataList: any[] = [];

  constructor(private pokeapiService: PokeapiService, private modalController: ModalController) {}

  ngOnInit() {
    for (let i = 0; i < 15; i++) {
      const randomId = this.pokeapiService.getRandomId(1, 1010);
      this.pokeapiService.getPokemon(randomId).subscribe((data) => {
        this.pokemonDataList.push(data);
      });
    }
  }

  async openPokemonDetail(pokemon: any) {
    const modal = await this.modalController.create({
      component: PokemonDetailComponent,
      componentProps: {
        pokemon
      }
    });
    return await modal.present();
  }

}
