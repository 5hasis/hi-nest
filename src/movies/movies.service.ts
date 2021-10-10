import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {

    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        //string으로 받아온 걸 number로 변경
        //이렇게도 가능 movie => movie.id === +id
        //const movie = this.movies.find(movie => movie.id === parseInt(id));
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            throw new NotFoundException(`Movie with Id ${id} not found.`);
        }
        return movie
    }

    deleteOne(id:number): boolean {
        this.getOne(id) //해당 영화가 있으면
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id:this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
