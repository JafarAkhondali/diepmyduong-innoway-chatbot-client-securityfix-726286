import { User } from './user';
import { Page } from './page';
//LOAD DACEBOOK CONFIG
import {  FBConfig } from './configs/fb.config';
FBConfig();

declare var module:any;

module.exports = {
    User: User,
    Page: Page
}
