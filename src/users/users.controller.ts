import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { createUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UsersController{
    constructor(private usersservice:UsersService){}
    @Post('create')
    @UsePipes(new ValidationPipe())
    createuser(@Body() createuserdto :createUserDto){
        return this.usersservice.createUser(createuserdto);

    }
    @Get('allusers')
    getAllUsers(){
       return  this.usersservice.getUsers();

    }
    @Get(':id')
    async   getUserById(@Param('id') id:string) {
        const isValid= mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('User_NtFound!',404);
      const findUser=  await this.usersservice.getUserById(id);

      if(!findUser){
        throw new HttpException('User_NtFound!',404);
      }
      else{
        return findUser;
      }


    }
    @Patch('update/:id')
    @UsePipes(new ValidationPipe())
    UPdateUser(@Param('id') id:string,@Body() updateuserdto:UpdateUserDto){
        const isValid= mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('User_NtFound!',404);
        return this.usersservice.UpsateUser(id,updateuserdto);




    }
    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
         const isValid = mongoose.Types.ObjectId.isValid(id);
         if(!isValid) throw new HttpException('User_NtFound!',404);
         else
         return this.usersservice.DeleteUser(id);
        }
}