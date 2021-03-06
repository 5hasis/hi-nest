import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {

    // @IsString()
    // readonly title?: string; // ? :필수는 아님

    // @IsNumber()
    // readonly year?: number;

    // @IsString({ each: true })
    // readonly genres?: string[];
}