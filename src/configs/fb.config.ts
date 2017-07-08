import { DefaultConfig } from './default.config';
declare var $:any,window:any,FB:any;

//Facebook Config


export const FBConfig= (callback:any = ()=>{}) => {
    $(document).ready(() =>{
        var d = document;
        var s = 'script';
        var id = 'facebook-jssdk';
        window.fbAsyncInit = function() {
            console.log("INIT FACEBOOK SDK");
            FB.init({
                appId      : DefaultConfig.facebook.app_id,
                xfbml      : true,
                version    : 'v2.9',
                cookie     : true,
                status     : true
            });
            FB.AppEvents.logPageView();
            callback();
        };
        var js:any, fjs:any = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        d.getElementsByTagName('head')[0].appendChild(js)
        console.log("ADD FACEBOOK SDK");
    })
};