import { Component, OnInit} from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls : ['./list-pokemon.component.css']
})

export class ListPokemonComponent implements OnInit {

  pokemonList$: Observable<Pokemon[]>; 
  isCarouselView: boolean = true;

  constructor(
    private router : Router,
    private pokemonService : PokemonService
    ) {}

      ngOnInit () {
        this.pokemonList$ = this.pokemonService.getPokemonList()
      }

  goToPokemon(pokemon : Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
  toggleView(): void {
    this.isCarouselView = !this.isCarouselView; // Change la valeur de la variable isCarouselView pour afficher la liste ou le carousel
  }

}
