
export class Pokemon {
    id: number;
    name: string;
    hp: number;
    cp: number;
    picture: string;
    types: Array<string>;
    generations: Array<string>;
    created: Date;

    constructor(
        name: string = 'Entrer un nom...'  ,
        hp:  number = 100,
        cp: number = 10,
        id: number = 999,
        types: string[] = ['Normal'],
        generations: string[] = ['1'],
        created : Date = new Date()
    ) {
        this.name = name;
        this.hp = hp;
        this.cp = cp;
        this.id = id;
        this.types = types;
        this.created= created;
        this.generations = generations;
    }

}
