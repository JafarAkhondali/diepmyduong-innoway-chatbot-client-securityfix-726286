//Import Config
import { DefaultConfig } from './configs/default.config';
import { URL } from './utils/helper';

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

}