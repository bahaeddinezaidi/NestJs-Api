import { HttpException, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/shemas/Post.schema";
import { CreatePostDto } from "./dtos/CreatePost.Dto";
import { User } from "src/shemas/user.schema";

@Injectable()
export class PostService{
    constructor(
        @InjectModel(Post.name) private PostModel:Model<Post>,@InjectModel(User.name) private UserModel :Model<User>
    ){

    }
     async createPost({userId,...createpostdto}:CreatePostDto){
        const finduser= await this.UserModel.findById(userId); 
        if(!finduser) throw new HttpException("User NotFound",404);
        const newpost= new  this.PostModel(createpostdto);
     const savedpost= await newpost.save();
     await this.UserModel.updateOne({ _id: userId }, { $push: { posts: savedpost._id } });

     return savedpost;
     }

    }
