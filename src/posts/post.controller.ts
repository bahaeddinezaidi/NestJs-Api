import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "./dtos/CreatePost.Dto";
import { PostService } from "./post.service";

@Controller('post')
export class PostController{
    constructor( private postservice:PostService){}
    @Post()
    @UsePipes(new ValidationPipe)
    createPost(
        @Body() createpostdto :CreatePostDto
    ){
        return this.postservice.createPost(createpostdto);

    }


}