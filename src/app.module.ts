import { join } from 'path'; // propio de node al inicio
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [

    // ? contenido estatico (sitio web)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot('mongodb://localhost:27018/nest-pokemon'),

    PokemonModule,

    CommonModule,
  ],
})
export class AppModule {}
