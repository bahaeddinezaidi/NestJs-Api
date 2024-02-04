import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class UsersSettingsDto{
    @IsOptional()
    @IsBoolean()
    receiveNotifiactions?:boolean;
    @IsOptional()
    @IsBoolean()
    receiveEmails?:boolean;
    @IsOptional()
    @IsBoolean()
    receiveSms?:boolean;
}

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsString()
    @IsOptional()
    displayname?:string;
    @IsOptional()
    @ValidateNested()
    @Type(()=>UsersSettingsDto)
    settings:UsersSettingsDto;
   
    
}