import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: string): string {
  
    let color: string;
  
    switch (type) {
      case 'Feu':
        color = 'red lighten-1';
        break;
      case 'Eau':
        color = 'blue lighten-1';
        break;
      case 'Plante':
        color = 'green lighten-1';
        break;
      case 'Insecte':
        color = 'light-green darken-1';
        break;
      case 'Normal':
        color = 'grey lighten-3';
        break;
      case 'Vol':
        color = 'blue lighten-3';
        break;
      case 'Poison':
        color = 'deep-purple accent-1';
        break;
      case 'Fée':
        color = 'pink lighten-4';
        break;
      case 'Psy':
        color = 'deep-purple darken-2';
        break;
      case 'Electrik':
        color = 'lime accent-1';
        break;
      case 'Glace':
        color = 'light-blue accent-3';
        break;
        case 'Dragon':
        color = 'light-blue darken-4';
        break;
        case 'Sol':
        color = 'brown darken-4';
        break;
        case 'Spectre':
        color = 'deep-purple';
        break;
        case 'Ténèbre':
        color = 'grey darken-4';
        break;
        case 'Acier':
        color = 'blue-grey darken-2';
        break;
        case 'Roche':
        color = 'brown lighten-2';
        break;
      default:
        color = 'grey';
        break;
    }
  
    return 'chip ' + color;
  
  }

}
