import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls : ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon;
  generations: string[] ;
  types : string[];
  isAddForm: boolean;

  constructor(
    private pokemonService : PokemonService,
    private router: Router
    ) { }

  ngOnInit() {
    
    this.types = this.pokemonService.getPokemonTypeList();
    this.generations = this.pokemonService.getPokemonGenerationList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type : string): boolean {
    return this.pokemon.types.includes(type);
  } 

  selectType($event: Event, type : string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type : string): boolean {
      
    if(this.pokemon.types.length==1 && this.hasType(type)) {
      return false;
    }

    if(this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    
    return true;
  }

  hasGeneration(generation: string): boolean {
    return this.pokemon.generations.includes(generation);
  }

  selectGeneration($event: Event, generation: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon.generations.push(generation);
    } else {
      const index = this.pokemon.generations.indexOf(generation);
      this.pokemon.types.splice(index, 1);
    }
  }

  // isGenerationsValid(generation : string): boolean {
  //   if(this.pokemon.types.length > 1 && !this.hasGeneration(generation)) {
  //     return false;
  //   }
  //   return true;
  // }

  onSubmit() {
    // Récupérer l'ID depuis un champ number
    // Logique de formatage de l'ID
    let formattedId;
  
    if (this.pokemon.id >= 1 && this.pokemon.id <= 9) {
      formattedId = `00${this.pokemon.id}`;
    } else if (this.pokemon.id >= 10 && this.pokemon.id <= 99) {
      formattedId = `0${this.pokemon.id}`;
    } else {
      formattedId = this.pokemon.id.toString();
    }
  
    // Construction de l'URL de l'image
    this.pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedId}.png`;
    this.pokemonService.addPokemon(this.pokemon).then(() => {
      this.router.navigate(['/pokemon/', this.pokemon.id]);
    });
  }
}


// [disabled]="!isGenerationsValid(generation)"