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
	var fb_config_1 = __webpack_require__(7);
	fb_config_1.FBConfig();
	module.exports = {
	    User: user_1.User,
	    Page: page_1.Page
	};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	//Import Config
	var default_config_1 = __webpack_require__(3);
	var helper_1 = __webpack_require__(4);
	var User = (function () {
	    //Hàm khởi tạo với tham số token là Optional
	    function User(token) {
	        if (token === void 0) { token = null; }
	        this.authenticated = false;
	        var self = this;
	        console.log("Init User Object");
	        if (!window.fbLoaded) {
	            $(window).on("innoway-chatbot.fbLoaded", function () {
	                console.log("FACEBOOK LOADED");
	                FB.getLoginStatus(function (res) {
	                    console.log("LOGIN STATUS ", res);
	                    if (res.status === "connected") {
	                        self._token = res.authResponse.accessToken;
	                        self.authenticated = true;
	                        $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE, self.authenticated);
	                    }
	                    else {
	                        console.log("not connected");
	                    }
	                });
	            });
	        }
	        else {
	            FB.init({
	                appId: default_config_1.DefaultConfig.facebook.app_id,
	                xfbml: true,
	                version: 'v2.9',
	                cookie: true,
	                status: true
	            });
	            FB.AppEvents.logPageView();
	            FB.getLoginStatus(function (res) {
	                console.log("LOGIN STATUS ", res);
	                if (res.status === "connected") {
	                    self._token = res.authResponse.accessToken;
	                    self.authenticated = true;
	                    $(self).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE, self.authenticated);
	                }
	                else {
	                    console.log("not connected");
	                }
	            });
	        }
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
	        $(this).trigger(User.EventTypes.AUTHENTICATE_STATECHANGE, this.authenticated);
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
	    User.prototype.getInfo = function (callback, fields, size) {
	        if (callback === void 0) { callback = function () { }; }
	        if (fields === void 0) { fields = "email,id,birthday,name"; }
	        if (size === void 0) { size = "large"; }
	        var self = this;
	        if (!self.isAuthenticated(callback))
	            return;
	        FB.api('/me', 'GET', { "fields": fields, "type": size }, function (res) {
	            callback(null, res);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Get page info
	    User.prototype.getPageInfo = function (page_token, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/me/pages/info", { page_token: page_token }),
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
	    //Author: Dương Jerry
	    //Description: Get page info with ID
	    User.prototype.getPageInfoWithId = function (pid, callback, fields) {
	        if (callback === void 0) { callback = function () { }; }
	        if (fields === void 0) { fields = "access_token,picture,name,is_webhooks_subscribed"; }
	        var self = this;
	        FB.api('/' + pid, 'GET', { "fields": fields }, function (response) {
	            callback(null, response);
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
/***/ (function(module, exports) {

	"use strict";
	exports.DefaultConfig = {
	    host: "https://jerry-chatbot.herokuapp.com/",
	    facebook: {
	        app_id: "143366482876596" //Innoway
	    }
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var default_config_1 = __webpack_require__(3);
	var URL = (function () {
	    function URL() {
	    }
	    //Author: Dương Jerry
	    //Description: get API full url
	    URL.apiUrl = function (path, query, params) {
	        if (query === void 0) { query = null; }
	        if (params === void 0) { params = null; }
	        var url = default_config_1.DefaultConfig.host;
	        if (params) {
	            Object.keys(params).map(function (key) {
	                path = path.replace(new RegExp("\{\{" + key + "\}\}", 'g'), params[key]);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var helper_1 = __webpack_require__(4);
	var story_1 = __webpack_require__(6);
	var Page = (function () {
	    function Page(token) {
	        this._token = token;
	    }
	    //Author: Dương Jerry
	    //Description: Get page settings
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
	    //Author: Dương Jerry
	    //Description: Active page settings
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
	            $(self).trigger(Page.EventTypes.SETTING_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Deative page settings
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
	            $(self).trigger(Page.EventTypes.SETTING_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Get all Stories
	    Page.prototype.getStories = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories"),
	            "method": "GET",
	            "headers": {
	                "access_token": this._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Return Story Object
	    Page.prototype.buildStory = function (story) {
	        return new story_1.Story(this, story);
	    };
	    //Author: Dương Jerry
	    //Description: Return Story Object
	    Page.prototype.getStory = function (story_id, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}", null, { story_id: story_id }),
	            "method": "GET",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            if (response != null) {
	                callback(null, self.buildStory(response));
	            }
	            else {
	                callback("Not found", null);
	            }
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: New Story
	    Page.prototype.newStory = function (title, callback) {
	        if (title === void 0) { title = "My Story"; }
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories"),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	            "data": JSON.stringify({ title: title })
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Page.EventTypes.STORY_CHANGE, response);
	            callback(null, self.buildStory(response));
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Remove Story
	    Page.prototype.removeStory = function (story_id, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}", null, { story_id: story_id }),
	            "method": "DELETE",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Page.EventTypes.SETTING_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Remove Story
	    Page.prototype.getStartedStory = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/settings/getStartedStory"),
	            "method": "GET",
	            "headers": {
	                "access_token": self._token
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            if (response != null) {
	                response = self.buildStory(response);
	            }
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
	    Page.EventTypes = {
	        SETTING_CHANGE: "innoway_chatbot.page.setting_change",
	        STORY_CHANGE: "innoway_chatbot.page.story_change",
	    };
	    return Page;
	}());
	exports.Page = Page;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var helper_1 = __webpack_require__(4);
	var page_1 = __webpack_require__(5);
	var Story = (function () {
	    function Story(page, story) {
	        this._page = page;
	        this._token = page._token;
	        this._story = story;
	    }
	    //Author: Dương Jerry
	    //Description: Get story cards
	    Story.prototype.getCards = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/cards", null, { story_id: self._story._id }),
	            "method": "GET",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Add Card
	    Story.prototype.addCard = function (card, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/cards", null, {
	                story_id: self._story._id
	            }),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	            "data": JSON.stringify(card)
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.CARDS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Remove Card
	    Story.prototype.removeCard = function (card_id, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/cards/{{card_id}}", null, {
	                story_id: self._story._id, card_id: card_id
	            }),
	            "method": "DELETE",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.CARDS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Update Card
	    Story.prototype.updateCard = function (card, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/cards/{{card_id}}", null, {
	                story_id: self._story._id, card_id: card._id
	            }),
	            "method": "PUT",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "data": JSON.stringify(card)
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.CARDS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Get Story Keys
	    Story.prototype.getKeys = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/keys", null, { story_id: self._story._id }),
	            "method": "GET",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Add Key
	    Story.prototype.addKey = function (key, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/keys", null, {
	                story_id: self._story._id
	            }),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "processData": false,
	            "data": JSON.stringify({ key: key })
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.KEYS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Remove Key
	    Story.prototype.removeKey = function (key_id, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/keys/{{key_id}}", null, {
	                story_id: self._story._id, key_id: key_id
	            }),
	            "method": "DELETE",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.KEYS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Update Key
	    Story.prototype.updateKey = function (key, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/keys/{{key_id}}", null, {
	                story_id: self._story._id, key_id: key._id
	            }),
	            "method": "PUT",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "data": JSON.stringify(key)
	        };
	        $.ajax(settings).done(function (response) {
	            $(self).trigger(Story.EventTypes.KEYS_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Remove Story
	    Story.prototype.destroy = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}", null, { story_id: self._story._id }),
	            "method": "DELETE",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            $(self._page).trigger(page_1.Page.EventTypes.STORY_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Update Story
	    Story.prototype.update = function (title, callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}", null, { story_id: self._story._id }),
	            "method": "PUT",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            },
	            "data": JSON.stringify({ title: title })
	        };
	        $.ajax(settings).done(function (response) {
	            $(self._page).trigger(page_1.Page.EventTypes.STORY_CHANGE, response);
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    //Author: Dương Jerry
	    //Description: Add Key
	    Story.prototype.setAsGetStarted = function (callback) {
	        if (callback === void 0) { callback = function () { }; }
	        var self = this;
	        var settings = {
	            "async": true,
	            "crossDomain": true,
	            "url": helper_1.URL.apiUrl("api/page/stories/{{story_id}}/setStarted", null, { story_id: self._story._id }),
	            "method": "POST",
	            "headers": {
	                "access_token": self._token,
	                "content-type": "application/json",
	            }
	        };
	        $.ajax(settings).done(function (response) {
	            callback(null, response);
	        }).fail(function (request, err, status) {
	            callback(err, status);
	        });
	    };
	    Story.EventTypes = {
	        CARDS_CHANGE: "innoway_chatbot.story.card_change",
	        KEYS_CHANGE: "innoway_chatbot.story.key_change",
	    };
	    return Story;
	}());
	exports.Story = Story;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var default_config_1 = __webpack_require__(3);
	//Facebook Config
	exports.FBConfig = function () {
	    var d = document;
	    var s = 'script';
	    var id = 'facebook-jssdk';
	    window.fbAsyncInit = function () {
	        console.log("INIT FACEBOOK SDK");
	        FB.init({
	            appId: default_config_1.DefaultConfig.facebook.app_id,
	            xfbml: true,
	            version: 'v2.9',
	            cookie: true,
	            status: true
	        });
	        FB.AppEvents.logPageView();
	        window.fbLoaded = true;
	        $(window).trigger("innoway-chatbot.fbLoaded", window.fbLoaded);
	    };
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) {
	        return;
	    }
	    js = d.createElement(s);
	    js.id = id;
	    js.async = true;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	    console.log("ADD FACEBOOK SDK", fjs.parentNode);
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=innoway_chatbot.js.map