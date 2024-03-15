import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

// está heredando del dto de create con el PartialType
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
