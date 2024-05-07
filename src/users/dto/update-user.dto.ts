import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types"; //npm i @nestjs/mapped-types -D

export class UpdateUserDto extends PartialType(CreateUserDto) { } //PartialType is a utility function that creates a new class that extends the original class with all properties set to optional. This means that all properties of the new class can be undefined. This is useful when you want to allow partial updates to an object. In this case, the UpdateUserDto class extends the