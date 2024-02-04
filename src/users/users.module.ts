import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userShema } from "src/shemas/user.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserSettingSchema, UserSettings } from "src/shemas/UserSettings.schema";

@Module({
    imports: [ MongooseModule.forFeature([{
        name: User.name,
        schema:userShema
    },
    {
        name:UserSettings.name,
        schema:UserSettingSchema
    }
])],
    providers:[UsersService],
    controllers:[UsersController]
})
export class usersModel{

}