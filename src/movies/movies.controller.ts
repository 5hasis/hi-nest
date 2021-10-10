import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity'
import { MoviesService } from './movies.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query('year') searchingYear:string){ //movies/search?year=2000
        return `We are searching for a movie made after ${searchingYear} `
    }

    @Get("/:id")
    getOne(@Param('id') movieId: number): Movie{ //데코레이터에 있는 두개는 (id) 같아두댐, 파라미터 이름은 달라두댐(movieId)
        //return `This will return one movie with the id: ${movieId}`
        console.log(typeof movieId)
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData:CreateMovieDto){
        console.log(movieData)
        //return 'This will create a movie'
        //return movieData;
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number){
        //return `This will delete a movie with the id: ${movieId}`
        return this.moviesService.deleteOne(movieId);
    }

    //@Put() // : 모든 리소스를 업데이트
    @Patch('/:id') // : 리소스의 일부분만 업데이트
    path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        //return `This will patch a movie with the id: ${movieId}`
        // return {
        //     updatedMovie:movieId,
        //     ...updateData //데이터의 오브젝트
        // }

        return this.moviesService.update(movieId, updateData);
    }

    
}
