(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("innoway_chatbot", [], factory);
	else if(typeof exports === 'object')
		exports["innoway_chatbot"] = factory();
	else
		root["innoway_chatbot"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var user_1 = __webpack_require__(2);
	var page_1 = __webpack_require__(5);
	//LOAD DACEBOOK CONFIG
	var fb_config_1 = __webpack_require__(6);
	fb_config_1.FBConfig();
	module.exports = {
	    User: user_1.User,
	    Page: page_1.Page
	};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var helper_1 = __webpack_require__(3);
	var User = (function () {
	    //Hàm khởi tạo với tham số token là Optional
	    function User(token) {
	        if (token === void 0) { token = null; }
	        this.authenticated = false;
	        var self = this;
	        FB.getLoginStatus(function (res) {
	            console.log("LOGIN STATUS ", res);
	            if (res.status === "connected") {
	                self._token = res.authResponse.accessToken;
	                self.authenticated = true;
	                $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE, self.authenticated);
	            }
	            else {
	                self.loginWithFacebook();
	            }
	        });
	    }
	    //Khai báo hàm private 
	    //Tham số là 1 hàm callback Optional
	    User.prototype.isAuthenticated = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        if (!this.authenticated) {
	            callback('PERMISSION ERROR', "You don't have permission to access");
	        }
	        return this.authenticated;
	    };
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
	    User.prototype.loginWithFacebook = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        FB.login(function (response) {
	            if (response.authResponse) {
	                self._token = response.authResponse.accessToken;
	                self.authenticated = true;
	                callback(null, response.authResponse);
	            }
	            else {
	                self._token = null;
	                self.authenticated = false;
	                callback('User cancelled login or did not fully authorize.', null);
	            }
	            $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE, self.authenticated);
	        });
	    };
	    //LOGOUT
	    User.prototype.logout = function () {
	        //Facebook logout 
	        FB.logout();
	        //Xoá cache 
	        // localStorage.removeItem("STORE_KEY");
	        this._token = null;
	        this.user = null;
	        this.authenticated = false;
	    };
	    //GET LIST FAN PAGE
	    User.prototype.getPages = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        if (!self.isAuthenticated(callback))
	            return;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/me/pages"),
	            "method": "GET",
	            "headers": {
	                "access_token": this._token
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Subscribe page
	    User.prototype.subscribePage = function (page_token, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/me/pages/subscribe", { page_token: page_token }),
	            "method": "POST",
	            "headers": {
	                "access_token": this._token,
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(User.EventTypes.PAGE_STATECHANGE, true);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Unsubscribe page
	    User.prototype.unSubscribePage = function (page_token, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/me/pages/subscribe", { page_token: page_token }),
	            "method": "DELETE",
	            "headers": {
	                "access_token": this._token,
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(User.EventTypes.PAGE_STATECHANGE, false);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Khai báo biến static
	    User.cards = [];
	    User.EventTypes = {
	        AUTHENTICATE_STATECHANGE: "innoway_chatbot.user.authenticate",
	        PAGE_STATECHANGE: "innoway_chatbot.user.page_state"
	    };
	    return User;
	}());
	exports.User = User;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var default_config_1 = __webpack_require__(4);
	var URL = (function () {
	    function URL() {
	    }
	    URL.apiUrl = function (path, query, params) {
	        if (query === void 0) { query = null; }
	        if (params === void 0) { params = null; }
	        var url = default_config_1.DefaultConfig.host;
	        if (params) {
	            Object.keys(params).map(function (key) {
	                path.replace("/\{\{" + key + "\}\}/g", params[key]);
	            });
	        }
	        if (query) {
	            path += "?";
	            Object.keys(query).map(function (key) {
	                path += key + "=" + query[key] + "&";
	            });
	            path = path.slice(0, -1);
	        }
	        return url + path;
	    };
	    return URL;
	}());
	exports.URL = URL;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	exports.DefaultConfig = {
	    host: "https://jerry-chatbot.herokuapp.com/",
	    facebook: {
	        app_id: "143366482876596" //Innoway
	    }
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var helper_1 = __webpack_require__(3);
	var Page = (function () {
	    function Page(token) {
	        this._token = token;
	    }
	    //GET SETTINGS
	    Page.prototype.getSettings = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/settings"),
	            "method": "GET",
	            "headers": {
	                "access_token": self._token
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Active Settings
	    Page.prototype.activeSetting = function (data, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/settings/active"),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	            "data": JSON.stringify(data)
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    Page.prototype.deActiveSetting = function (types, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/settings/deactive"),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	            "data": JSON.stringify({
	                types: types
	            })
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    Page.SettingTypes = {
	        GREETING: "greeting",
	        PRESISTENT_MENU: "persistent_menu",
	        GET_STARTED: "get_started",
	    };
	    return Page;
	}());
	exports.Page = Page;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var default_config_1 = __webpack_require__(4);
	//Facebook Config
	exports.FBConfig = function () {
	    var d = document;
	    var s = 'script';
	    var id = 'facebook-jssdk';
	    window.fbAsyncInit = function () {
	        FB.init({
	            appId: default_config_1.DefaultConfig.facebook.app_id,
	            xfbml: true,
	            version: 'v2.9'
	        });
	        FB.AppEvents.logPageView();
	    };
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) {
	        return;
	    }
	    js = d.createElement(s);
	    js.id = id;
	    js.src = "https://connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=innoway_chatbot.js.map