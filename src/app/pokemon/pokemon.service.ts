import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, from, of, tap } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { child, getDatabase, ref, get, set, onValue } from "firebase/database";
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons$ : Observable<Pokemon[]>

  

  constructor(private http: HttpClient) {
    const firebaseConfig = {
      databaseURL: "https://pokedex-13810-default-rtdb.europe-west1.firebasedatabase.app/",
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    this.getPokemonTypeList();
    this.pokemons$ = this.getPokemonList();

  }

  getPokemonTypeList(): string[] {

    const dbRef = ref(getDatabase());
    const types: string[] = [];
    get(child(dbRef, `types`)).then((snapshot) => {
      if (snapshot.exists()) {
        for(const type of Object.entries(snapshot.val())) {
          const capitalized =
           type[0].charAt(0).toUpperCase()
            + type[0].slice(1)
          types.push(capitalized)
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return types;
  }




  getPokemonList(): Observable<Pokemon[]>  {
    const dbRef = ref(getDatabase());
    const pokemons : Pokemon[] = []
    get(child(dbRef, `pokemon`)).then((snapshot) => {
      if (snapshot.exists()) {
        for(const pokemon of Object.entries<Pokemon>(snapshot.val())) {
          pokemons.push(pokemon[1])
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
        return of(pokemons) ;
      }      
    

  getPokemonById(pokemonId: number): Promise<Pokemon> {
    const dbRef = ref(getDatabase());
    return new Promise((resolve, reject) => {
      get(child(dbRef, `pokemon/${pokemonId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          this.pokemons$ = snapshot.val();
          resolve(snapshot.val());
        } else {
          console.log("No data available");
          reject(snapshot.val());
        }
      }).catch((error) => {
        console.error(error);
        reject();
      });
    });    
  }

  searchPokemonList(term : string ): Pokemon[] {
    const dbRef = ref(getDatabase());
    const list: Pokemon[] = [];
    if(term.length <= 1) {
      return [];
    }



    return list;
    // get(child(dbRef , `pokemon/${term}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     for(const pokemon of Object.entries<Pokemon>(snapshot.val())){
    //       if (term === pokemon[1].name) {
    //         list.push(pokemon[1]);
    //       };
    //     };
    //   };
    //   return list;
    // }).catch((error) => {
    //   console.error(error);
    //   return of([]);
    // });
    // console.log("dernier");
    // return of([]);
  } 

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-type' : 'application/json'})
    }

    return this.http.put('api/pokemons' , pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error , null))
    )
  }
  
   addPokemon(pokemon: Pokemon): Promise<void> {
    const db = getDatabase();
    console.log(pokemon);
    
    return set(ref(db, 'pokemon/' + pokemon.id), pokemon);
   }


  deletePokemonById(pokemonId: number) : Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error , null))
    );
  }

  private log(response : any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of (errorValue)
  }

  

}
