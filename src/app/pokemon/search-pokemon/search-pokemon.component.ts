import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { log } from 'console';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
  searchTerms! : string; //flux de données des recherches de l'utilisateur
  pokemons$: Observable<Pokemon[]>
  allPokemons: Pokemon[];
  

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }


    //paramètres de recherche de pokemon
  ngOnInit(): void {
    console.log("init");
    this.pokemons$ = this.pokemonService.getPokemonList()
  }
  

    search(term: string) {
      console.log("keyup");
      console.log(this.searchTerms);
    }

    goToDetail(pokemon: Pokemon) {
      const link = ['/pokemon', pokemon.id];
      this.router.navigate(link); 
    }

    isMatchFilter(pokemonName : string) {
      console.log(pokemonName);
      
      if (pokemonName.includes(this.searchTerms)) {
        return true
      } 
      return false
    }
    researchFilterIsEmpty(searchBox : string) {
      if (searchBox.length === 0 ) {
        return true
      } 
      return false
    }
}
