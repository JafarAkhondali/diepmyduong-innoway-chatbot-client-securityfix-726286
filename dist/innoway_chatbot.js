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
	//LOAD DACEBOOK CONFIG
	var fb_config_1 = __webpack_require__(4);
	fb_config_1.FBConfig();
	module.exports = {
	    User: user_1.User
	};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	//Import Config
	var default_config_1 = __webpack_require__(3);
	var User = (function () {
	    //Hàm khởi tạo với tham số token là Optional
	    function User(token) {
	        if (token === void 0) { token = null; }
	        this.authenticated = false;
	    }
	    //Khai báo hàm private 
	    //Tham số là 1 hàm callback Optional
	    User.prototype.requiedAuthenticate = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        if (!this.authenticated) {
	            callback('PERMISSION ERROR', "You don't have permission to access");
	        }
	        return this.authenticated;
	    };
	    //Khai báo hàm cho 1 đối tượng User
	    User.prototype.login = function (phone, password, callback) {
	        var _this = this;
	        if (callback === void 0) { callback = function () { }; }
	        //Sử dụng ajax để access API
	        $.ajax({
	            type: 'POST',
	            url: default_config_1.DefaultConfig.host + 'api/me',
	            dataType: 'json',
	            data: {
	                Phone: phone,
	                Password: password
	            }
	        })
	            .done(function (res) {
	            //Kết quả trả về
	            if (res.StatusCode === 200) {
	                _this.user = res.Data;
	                _this._token = res.Data.Token;
	                _this.authenticated = true;
	                //Tạo event trigger
	                //Dùng để client biêt khi có event
	                //Ví dụ $(this).on("EVENT_KEY",callback);
	                $(_this).trigger("EVENT_KEY", _this.authenticated);
	                //Sử dụng localStorage cho 1 số biến cần cache lại
	                localStorage.setItem("STORE_KEY", res.Data.Token);
	                //Gọi callback đẻ trả về kết quả cho client 
	                callback(null, res.Data);
	            }
	            else {
	                _this.authenticated = false;
	                $(_this).trigger("EVENT_KEY", _this.authenticated);
	                callback(res.StatusCode, res.StatusMessage);
	            }
	        })
	            .fail(function (request, err, status) {
	            //Kết quả trả về lỗi 
	            _this.authenticated = false;
	            $(_this).trigger("EVENT_KEY", _this.authenticated);
	            callback(err, status);
	        });
	    };
	    //LOGIN WITH FACEBOOK
	    User.prototype.loginWithFacebook = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        FB.login(function (response) {
	            if (response.authResponse) {
	            }
	            else {
	                callback('User cancelled login or did not fully authorize.', null);
	            }
	        });
	    };
	    //LOGOUT
	    User.prototype.logout = function () {
	        //Facebook logout 
	        FB.logout();
	        //Xoá cache 
	        localStorage.removeItem("STORE_KEY");
	        this._token = null;
	        this.user = null;
	        this.authenticated = false;
	    };
	    //Khai báo hàm Static 
	    //Sử dụng:  innoway-chatbot.User.getAllProducts(callback)
	    User.getAllProducts = function (callback) {
	        callback(null, "data");
	    };
	    //Khai báo biến static
	    User.cards = [];
	    return User;
	}());
	exports.User = User;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	exports.DefaultConfig = {
	    host: "https://jerry-chatbot.herokuapp.com/",
	    facebook: {
	        app_id: "276104969472219" //Innoway
	    }
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var default_config_1 = __webpack_require__(3);
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
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=innoway_chatbot.js.map