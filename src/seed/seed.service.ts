import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  

  constructor(
    // ? inyectamos el model del modulo Pokemon
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    //? hacemos la peticion a pokeapi y extraemos la data
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

      // borramos todos los datos
    await this.pokemonModel.deleteMany({})

      // ? creamos un array para guaredar todos lo objetos que obtengamos del api
    const pokemonToInsert: {name: string, no: number}[] = [];

    // ? con el results hacemos un foreach para extraer de cada pokemon los datos necesarios
    data.results.forEach(async ({ name, url }) => {
      
      // separamos la respuesta de la url para obtener el id del pokemon
      const segments = url.split('/');
      
      // obtenemos solo el numero de la url ( id de pokemon )
      const no = +segments[segments.length - 2];
      
      // guardamos los pokemon en un array para poder insertarlos de manera simultanea
      pokemonToInsert.push({name, no});

    });
  
    // insertamos los pokemon a la bd
    this.pokemonModel.insertMany(pokemonToInsert);

    return 'seed executed successfully';
  }
}
