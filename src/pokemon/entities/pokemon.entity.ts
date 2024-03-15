import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// ? esta es la forma o estructura qe tendrá mi tabla y cada objeto que se vaya insertar
@Schema()
export class Pokemon extends Document {

    //id // mongo me da el id
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;

}
// ? exportamos como un schema
export const PokemonSchema = SchemaFactory.createForClass( Pokemon )
