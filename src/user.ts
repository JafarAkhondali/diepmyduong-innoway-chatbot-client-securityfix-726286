//Import Config
import { DefaultConfig } from './configs/default.config';


declare var $:any,FB:any,gapi:any,window:any;

export class User {
    //Khai báo biến private
    private _token:string;
    //Khai báo biến public
    public user:any;
    public authenticated: boolean = false;
    //Khai báo biến static
    public static cards:any[] = [];

    //Hàm khởi tạo với tham số token là Optional
    constructor(token:string = null){
    } 

    //Khai báo hàm private 
    //Tham số là 1 hàm callback Optional
    private requiedAuthenticate(callback:any = ()=>{}){
        if(!this.authenticated){
            callback('PERMISSION ERROR',"You don't have permission to access");
        }
        return this.authenticated
    }
    //Khai báo hàm cho 1 đối tượng User
    public login(phone:string,password:string,callback:any = ()=>{}){
        //Sử dụng ajax để access API
        $.ajax({
            type: 'POST',
            url: DefaultConfig.host+'api/me',
            dataType:'json',
            data: { //Dữ liệu json gửi đi
                Phone   : phone,
                Password: password
            }
        })
        .done((res:any) => {
            //Kết quả trả về
            if(res.StatusCode === 200){
                this.user = res.Data;
                this._token = res.Data.Token;
                this.authenticated = true;
                //Tạo event trigger
                //Dùng để client biêt khi có event
                //Ví dụ $(this).on("EVENT_KEY",callback);
                $(this).trigger("EVENT_KEY",this.authenticated); 
                //Sử dụng localStorage cho 1 số biến cần cache lại
                localStorage.setItem("STORE_KEY",res.Data.Token);
                //Gọi callback đẻ trả về kết quả cho client 
                callback(null,res.Data);
            }else{
                this.authenticated = false;
                $(this).trigger("EVENT_KEY",this.authenticated);
                callback(res.StatusCode,res.StatusMessage);
            }
            
        })
        .fail((request:any,err:any,status:any)=>{
            //Kết quả trả về lỗi 
            this.authenticated = false;
            $(this).trigger("EVENT_KEY",this.authenticated);
            callback(err,status);
        });
    }
    //LOGIN WITH FACEBOOK
    public loginWithFacebook(callback:any = ()=>{}){
        var self = this;
        FB.login(function(response:any) {
            if (response.authResponse) {
                // self.getUserWithProvider('facebook',FB.getUserID(),callback);
            } else {
                callback('User cancelled login or did not fully authorize.',null);
            }
        });
    }

    //LOGOUT
    public logout(){
        //Facebook logout 
        FB.logout();
        //Xoá cache 
        localStorage.removeItem("STORE_KEY");
        this._token = null;
        this.user = null;
        this.authenticated = false;
    }
    
    //Khai báo hàm Static 
    //Sử dụng:  innoway-chatbot.User.getAllProducts(callback)
    public static getAllProducts(callback:any){
        callback(null,"data");
    } 

}

