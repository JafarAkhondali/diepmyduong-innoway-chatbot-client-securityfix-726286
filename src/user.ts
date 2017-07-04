//Import Config
import { DefaultConfig } from './configs/default.config';
import { URL } from './utils/helper';

declare var $:any,FB:any,gapi:any,window:any;

export class User {
    //Khai báo biến private
    _token:string;
    //Khai báo biến public
    public user:any;
    public authenticated: boolean = false;
    //Khai báo biến static
    public static cards:any[] = [];
    public static EventTypes = {
        AUTHENTICATE_STATECHANGE: "innoway_chatbot.user.authenticate",
        PAGE_STATECHANGE: "innoway_chatbot.user.page_state"
    }

    //Hàm khởi tạo với tham số token là Optional
    constructor(token:string = null){
        var self = this;
        if(!window.fbLoaded){
            $(window).on("innoway-chatbot.fbLoaded",()=>{
                console.log("FACEBOOK LOADED");
                FB.getLoginStatus((res:any) =>{
                    console.log("LOGIN STATUS ",res);
                    if(res.status === "connected"){
                        self._token = res.authResponse.accessToken;
                        self.authenticated = true;
                        $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE,self.authenticated);
                    }else{
                        console.log("not connected");
                        // self.loginWithFacebook();
                    }
                })
            })
        }else{
            FB.getLoginStatus((res:any) =>{
                console.log("LOGIN STATUS ",res);
                if(res.status === "connected"){
                    self._token = res.authResponse.accessToken;
                    self.authenticated = true;
                    $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE,self.authenticated);
                }else{
                    console.log("not connected");
                    // self.loginWithFacebook();
                }
            })
        }
        
    } 

    //Khai báo hàm private 
    //Tham số là 1 hàm callback Optional
    private isAuthenticated(callback:any = ()=>{}){
        if(!this.authenticated){
            callback('PERMISSION ERROR',"You don't have permission to access");
        }
        return this.authenticated
    }
    //Khai báo hàm cho 1 đối tượng User
    // public login(phone:string,password:string,callback:any = ()=>{}){
    //     //Sử dụng ajax để access API
    //     $.ajax({
    //         type: 'POST',
    //         url: API.pages.getAllPages,
    //         dataType:'json',
    //         data: { //Dữ liệu json gửi đi
    //             Phone   : phone,
    //             Password: password
    //         }
    //     })
    //     .done((res:any) => {
    //         //Kết quả trả về
    //         if(res.StatusCode === 200){
    //             this.user = res.Data;
    //             this._token = res.Data.Token;
    //             this.authenticated = true;
    //             //Tạo event trigger
    //             //Dùng để client biêt khi có event
    //             //Ví dụ $(this).on("EVENT_KEY",callback);
    //             $(this).trigger("EVENT_KEY",this.authenticated); 
    //             //Sử dụng localStorage cho 1 số biến cần cache lại
    //             localStorage.setItem("STORE_KEY",res.Data.Token);
    //             //Gọi callback đẻ trả về kết quả cho client 
    //             callback(null,res.Data);
    //         }else{
    //             this.authenticated = false;
    //             $(this).trigger("EVENT_KEY",this.authenticated);
    //             callback(res.StatusCode,res.StatusMessage);
    //         }
            
    //     })
    //     .fail((request:any,err:any,status:any)=>{
    //         //Kết quả trả về lỗi 
    //         this.authenticated = false;
    //         $(this).trigger("EVENT_KEY",this.authenticated);
    //         callback(err,status);
    //     });
    // }
    //LOGIN WITH FACEBOOK
    public loginWithFacebook(callback:any = ()=>{}){
        var self = this;
        FB.login(function(response:any) {
            if (response.authResponse) {
                self._token = response.authResponse.accessToken;
                self.authenticated = true;
                callback(null,response.authResponse);
            } else {
                self._token = null
                self.authenticated = false;
                callback('User cancelled login or did not fully authorize.',null);
            }
            $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE,self.authenticated);
        });
    }

    //LOGOUT
    public logout(){
        //Facebook logout 
        FB.logout();
        //Xoá cache 
        // localStorage.removeItem("STORE_KEY");
        this._token = null;
        this.user = null;
        this.authenticated = false;
    }

    //GET LIST FAN PAGE
    public getPages(callback:any = ()=>{}){
        var self = this;
        if(!self.isAuthenticated(callback)) return;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/me/pages"),
            "method": "GET",
            "headers": {
                "access_token": this._token
            }
        }
        $.ajax(settings).done((response:any) => {
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Subscribe page
    public subscribePage(page_token:string,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/me/pages/subscribe",{page_token: page_token}),
            "method": "POST",
            "headers": {
                "access_token": this._token,
            }
        }

        $.ajax(settings).done((response:any) => {
            $(self).trigger(User.EventTypes.PAGE_STATECHANGE,true);
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    //Unsubscribe page
    public unSubscribePage(page_token:string,callback:any = ()=>{}){
        var self = this;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": URL.apiUrl("api/me/pages/subscribe",{page_token: page_token}),
            "method": "DELETE",
            "headers": {
                "access_token": this._token,
            }
        }
        $.ajax(settings).done((response:any) => {
            $(self).trigger(User.EventTypes.PAGE_STATECHANGE,false);
            callback(null,response);
        }).fail((request:any,err:any,status:any) => {
            callback(err,status);
        });
    }

    public getInfo(callback:any = ()=>{},fields = "email,id,birthday,name",size = "large"){
        var self = this;
        if(!self.isAuthenticated(callback)) return;
        FB.api('/me','GET',{ "fields": fields , "type": size},
            (res:any) => {
                callback(null,res);
            }
        )
    }
}

