import { User } from './user';

//LOAD DACEBOOK CONFIG
import {  FBConfig } from './configs/fb.config';
FBConfig();

declare var module:any;

module.exports = {
    User: User
}
