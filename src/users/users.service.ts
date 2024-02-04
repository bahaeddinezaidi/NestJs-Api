import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/shemas/user.schema";
import { createUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSettings } from "src/shemas/UserSettings.schema";

@Injectable()
export class UsersService{
    constructor(
        @InjectModel(User.name ) private userModel:Model<User>,@InjectModel(UserSettings.name) private userSettingsModel:Model<UserSettings>
    ){
    }
    async createUser({settings,...createUserDto}:createUserDto){
        if(settings){
            const  newsettings = new  this.userSettingsModel(settings);
            const  savednewsettings= await newsettings.save();
            const newuser=new this.userModel({
                ...createUserDto ,settings:savednewsettings._id,
            })
            return newuser.save();
        }

        const newuser = new this.userModel(createUserDto);
        return newuser.save();
        
    }
    getUsers(){
        return this.userModel.find();
    }
    getUserById(id:string){
        return this.userModel.findById(id).populate(['settings','posts']);

    }
    UpsateUser(id:string,updateuserdto:UpdateUserDto){
        return  this.userModel.findByIdAndUpdate(id,updateuserdto,{new:true});

    }
    DeleteUser(id:string){
        return this.userModel.findByIdAndDelete(id);
    }

}