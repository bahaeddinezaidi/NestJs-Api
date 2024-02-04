import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/shemas/Post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { User, userShema } from 'src/shemas/user.schema';

@Module({
    imports: [

MongooseModule.forFeature([{ name: 'Post', schema: PostSchema },
    {
        name:User.name,
        schema:userShema
    }]),
    ],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
