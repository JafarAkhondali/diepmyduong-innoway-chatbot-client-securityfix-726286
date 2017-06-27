//Import Config
import { DefaultConfig } from './configs/default.config';
import { URL } from './utils/helper';
import { Story } from './story';

declare var $:any,FB:any;

export class Page {

    _token:string; //page token
    
    public static SettingTypes = {
        GREETING: "greeting",
        PRESISTENT_MENU: "persistent_menu",
        GET_STARTED: "get_started",
    }

    constructor(token:string){
        this._token = token;
    }

    //Author: Dương Jerry
    //Description: Get page settings
    public getSettings(callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/settings"),
            "method": "GET",
            "headers": {
                "access_token": self._token
            }
        }
        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Author: Dương Jerry
    //Description: Active page settings
    public activeSetting(data:any,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/settings/active"),
            "method": "POST",
            "headers": {
                "access_token": self._token,
                "content-type": "application/json",
            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Author: Dương Jerry
    //Description: Deative page settings
    public deActiveSetting(types:any,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/settings/deactive"),
            "method": "POST",
            "headers": {
                "access_token": self._token,
                "content-type": "application/json",
            },
            "processData": false,
            "data": JSON.stringify({
                types: types
            })
        }

        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        }); 
    }

    //Author: Dương Jerry
    //Description: Get all Stories
    public getStories(callback:any = ()=>{}){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/stories"),
            "method": "GET",
            "headers": {
                "access_token": this._token,
                "content-type": "application/json",
            },
            "processData": false,
        }

        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        }); 
    }

    //Author: Dương Jerry
    //Description: Return Story Object
    public buildStory(story:any){
        return new Story(this._token,story);
    }

    //Author: Dương Jerry
    //Description: Return Story Object
    public getStory(story_id:string,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/stories/{{story_id}}",null,{story_id:story_id}),
            "method": "GET",
            "headers": {
                "access_token": self._token,
                "content-type": "application/json",
            }
        }

        $.ajax(settings).done((response:any) => {
            if(response != null){
                callback(null,self.buildStory(response));
            }else{
                callback("Not found",null);
            }
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Author: Dương Jerry
    //Description: New Story
    public newStory(title:string = "My Story",callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/stories"),
            "method": "POST",
            "headers": {
                "access_token": self._token,
                "content-type": "application/json",
            },
            "processData": false,
            "data": JSON.stringify({ title: title })
        }

        $.ajax(settings).done((response:any) => {
            callback(null,self.buildStory(response));
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Author: Dương Jerry
    //Description: Remove Story
    public removeStory(story_id:string,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/page/stories/{{story_id}}",null,{story_id:story_id}),
            "method": "DELETE",
            "headers": {
                "access_token": self._token,
                "content-type": "application/json",
            }
        }

        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }
}