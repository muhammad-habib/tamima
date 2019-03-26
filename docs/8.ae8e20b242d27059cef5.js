(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{dB9c:function(e,t,n){"use strict";n.r(t);var r,i,o,s=n("wj3C"),a=n.n(s),c=n("mrSG"),u=n("zVF4"),_={AVAILABLE_IN_WINDOW:"only-available-in-window",AVAILABLE_IN_SW:"only-available-in-sw",SHOULD_BE_INHERITED:"should-be-overriden",BAD_SENDER_ID:"bad-sender-id",INCORRECT_GCM_SENDER_ID:"incorrect-gcm-sender-id",PERMISSION_DEFAULT:"permission-default",PERMISSION_BLOCKED:"permission-blocked",UNSUPPORTED_BROWSER:"unsupported-browser",NOTIFICATIONS_BLOCKED:"notifications-blocked",FAILED_DEFAULT_REGISTRATION:"failed-serviceworker-registration",SW_REGISTRATION_EXPECTED:"sw-registration-expected",GET_SUBSCRIPTION_FAILED:"get-subscription-failed",INVALID_SAVED_TOKEN:"invalid-saved-token",SW_REG_REDUNDANT:"sw-reg-redundant",TOKEN_SUBSCRIBE_FAILED:"token-subscribe-failed",TOKEN_SUBSCRIBE_NO_TOKEN:"token-subscribe-no-token",TOKEN_SUBSCRIBE_NO_PUSH_SET:"token-subscribe-no-push-set",TOKEN_UNSUBSCRIBE_FAILED:"token-unsubscribe-failed",TOKEN_UPDATE_FAILED:"token-update-failed",TOKEN_UPDATE_NO_TOKEN:"token-update-no-token",USE_SW_BEFORE_GET_TOKEN:"use-sw-before-get-token",INVALID_DELETE_TOKEN:"invalid-delete-token",DELETE_TOKEN_NOT_FOUND:"delete-token-not-found",DELETE_SCOPE_NOT_FOUND:"delete-scope-not-found",BG_HANDLER_FUNCTION_EXPECTED:"bg-handler-function-expected",NO_WINDOW_CLIENT_TO_MSG:"no-window-client-to-msg",UNABLE_TO_RESUBSCRIBE:"unable-to-resubscribe",NO_FCM_TOKEN_FOR_RESUBSCRIBE:"no-fcm-token-for-resubscribe",FAILED_TO_DELETE_TOKEN:"failed-to-delete-token",NO_SW_IN_REG:"no-sw-in-reg",BAD_SCOPE:"bad-scope",BAD_VAPID_KEY:"bad-vapid-key",BAD_SUBSCRIPTION:"bad-subscription",BAD_TOKEN:"bad-token",BAD_PUSH_SET:"bad-push-set",FAILED_DELETE_VAPID_KEY:"failed-delete-vapid-key",INVALID_PUBLIC_VAPID_KEY:"invalid-public-vapid-key",USE_PUBLIC_KEY_BEFORE_GET_TOKEN:"use-public-key-before-get-token",PUBLIC_KEY_DECRYPTION_FAILED:"public-vapid-key-decryption-failed"},d=((r={})[_.AVAILABLE_IN_WINDOW]="This method is available in a Window context.",r[_.AVAILABLE_IN_SW]="This method is available in a service worker context.",r[_.SHOULD_BE_INHERITED]="This method should be overriden by extended classes.",r[_.BAD_SENDER_ID]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",r[_.PERMISSION_DEFAULT]="The required permissions were not granted and dismissed instead.",r[_.PERMISSION_BLOCKED]="The required permissions were not granted and blocked instead.",r[_.UNSUPPORTED_BROWSER]="This browser doesn't support the API's required to use the firebase SDK.",r[_.NOTIFICATIONS_BLOCKED]="Notifications have been blocked.",r[_.FAILED_DEFAULT_REGISTRATION]="We are unable to register the default service worker. {$browserErrorMessage}",r[_.SW_REGISTRATION_EXPECTED]="A service worker registration was the expected input.",r[_.GET_SUBSCRIPTION_FAILED]="There was an error when trying to get any existing Push Subscriptions.",r[_.INVALID_SAVED_TOKEN]="Unable to access details of the saved token.",r[_.SW_REG_REDUNDANT]="The service worker being used for push was made redundant.",r[_.TOKEN_SUBSCRIBE_FAILED]="A problem occured while subscribing the user to FCM: {$message}",r[_.TOKEN_SUBSCRIBE_NO_TOKEN]="FCM returned no token when subscribing the user to push.",r[_.TOKEN_SUBSCRIBE_NO_PUSH_SET]="FCM returned an invalid response when getting an FCM token.",r[_.TOKEN_UNSUBSCRIBE_FAILED]="A problem occured while unsubscribing the user from FCM: {$message}",r[_.TOKEN_UPDATE_FAILED]="A problem occured while updating the user from FCM: {$message}",r[_.TOKEN_UPDATE_NO_TOKEN]="FCM returned no token when updating the user to push.",r[_.USE_SW_BEFORE_GET_TOKEN]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",r[_.INVALID_DELETE_TOKEN]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",r[_.DELETE_TOKEN_NOT_FOUND]="The deletion attempt for token could not be performed as the token was not found.",r[_.DELETE_SCOPE_NOT_FOUND]="The deletion attempt for service worker scope could not be performed as the scope was not found.",r[_.BG_HANDLER_FUNCTION_EXPECTED]="The input to setBackgroundMessageHandler() must be a function.",r[_.NO_WINDOW_CLIENT_TO_MSG]="An attempt was made to message a non-existant window client.",r[_.UNABLE_TO_RESUBSCRIBE]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",r[_.NO_FCM_TOKEN_FOR_RESUBSCRIBE]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",r[_.FAILED_TO_DELETE_TOKEN]="Unable to delete the currently saved token.",r[_.NO_SW_IN_REG]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",r[_.INCORRECT_GCM_SENDER_ID]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",r[_.BAD_SCOPE]="The service worker scope must be a string with at least one character.",r[_.BAD_VAPID_KEY]="The public VAPID key is not a Uint8Array with 65 bytes.",r[_.BAD_SUBSCRIPTION]="The subscription must be a valid PushSubscription.",r[_.BAD_TOKEN]="The FCM Token used for storage / lookup was not a valid token string.",r[_.BAD_PUSH_SET]="The FCM push set used for storage / lookup was not not a valid push set string.",r[_.FAILED_DELETE_VAPID_KEY]="The VAPID key could not be deleted.",r[_.INVALID_PUBLIC_VAPID_KEY]="The public VAPID key must be a string.",r[_.PUBLIC_KEY_DECRYPTION_FAILED]="The public VAPID key did not equal 65 bytes when decrypted.",r),h=new u.ErrorFactory("messaging","Messaging",d),f=new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110]),p="https://fcm.googleapis.com";function l(e,t){if(null==e||null==t)return!1;if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;for(var n=new DataView(e),r=new DataView(t),i=0;i<e.byteLength;i++)if(n.getUint8(i)!==r.getUint8(i))return!1;return!0}function E(e){return function(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,Object(c.__spread)(t)))}(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}!function(e){e.TYPE_OF_MSG="firebase-messaging-msg-type",e.DATA="firebase-messaging-msg-data"}(i||(i={})),function(e){e.PUSH_MSG_RECEIVED="push-msg-received",e.NOTIFICATION_CLICKED="notification-clicked"}(o||(o={}));var g=function(){function e(){}return e.prototype.getToken=function(e,t,n){return Object(c.__awaiter)(this,void 0,void 0,function(){var r,i,o,s,a,u,d;return Object(c.__generator)(this,function(c){switch(c.label){case 0:r=E(t.getKey("p256dh")),i=E(t.getKey("auth")),o="authorized_entity="+e+"&endpoint="+t.endpoint+"&encryption_key="+r+"&encryption_auth="+i,l(n.buffer,f.buffer)||(s=E(n),o+="&application_pub_key="+s),(a=new Headers).append("Content-Type","application/x-www-form-urlencoded"),u={method:"POST",headers:a,body:o},c.label=1;case 1:return c.trys.push([1,4,,5]),[4,fetch(p+"/fcm/connect/subscribe",u)];case 2:return[4,c.sent().json()];case 3:return d=c.sent(),[3,5];case 4:throw c.sent(),h.create(_.TOKEN_SUBSCRIBE_FAILED);case 5:if(d.error)throw h.create(_.TOKEN_SUBSCRIBE_FAILED,{message:d.error.message});if(!d.token)throw h.create(_.TOKEN_SUBSCRIBE_NO_TOKEN);if(!d.pushSet)throw h.create(_.TOKEN_SUBSCRIBE_NO_PUSH_SET);return[2,{token:d.token,pushSet:d.pushSet}]}})})},e.prototype.updateToken=function(e,t,n,r,i){return Object(c.__awaiter)(this,void 0,void 0,function(){var o,s,a,u,d,g,b;return Object(c.__generator)(this,function(c){switch(c.label){case 0:o=E(r.getKey("p256dh")),s=E(r.getKey("auth")),a="push_set="+n+"&token="+t+"&authorized_entity="+e+"&endpoint="+r.endpoint+"&encryption_key="+o+"&encryption_auth="+s,l(i.buffer,f.buffer)||(u=E(i),a+="&application_pub_key="+u),(d=new Headers).append("Content-Type","application/x-www-form-urlencoded"),g={method:"POST",headers:d,body:a},c.label=1;case 1:return c.trys.push([1,4,,5]),[4,fetch(p+"/fcm/connect/subscribe",g)];case 2:return[4,c.sent().json()];case 3:return b=c.sent(),[3,5];case 4:throw c.sent(),h.create(_.TOKEN_UPDATE_FAILED);case 5:if(b.error)throw h.create(_.TOKEN_UPDATE_FAILED,{message:b.error.message});if(!b.token)throw h.create(_.TOKEN_UPDATE_NO_TOKEN);return[2,b.token]}})})},e.prototype.deleteToken=function(e,t,n){return Object(c.__awaiter)(this,void 0,void 0,function(){var r,i,o,s;return Object(c.__generator)(this,function(a){switch(a.label){case 0:r="authorized_entity="+e+"&token="+t+"&pushSet="+n,(i=new Headers).append("Content-Type","application/x-www-form-urlencoded"),o={method:"POST",headers:i,body:r},a.label=1;case 1:return a.trys.push([1,4,,5]),[4,fetch(p+"/fcm/connect/unsubscribe",o)];case 2:return[4,a.sent().json()];case 3:if((s=a.sent()).error)throw h.create(_.TOKEN_UNSUBSCRIBE_FAILED,{message:s.error.message});return[3,5];case 4:throw a.sent(),h.create(_.TOKEN_UNSUBSCRIBE_FAILED);case 5:return[2]}})})},e}();function b(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}var T=function(){function e(){this.dbPromise=null}return e.prototype.get=function(e){return this.createTransaction(function(t){return t.get(e)})},e.prototype.getIndex=function(e,t){return this.createTransaction(function(n){return n.index(e).get(t)})},e.prototype.put=function(e){return this.createTransaction(function(t){return t.put(e)},"readwrite")},e.prototype.delete=function(e){return this.createTransaction(function(t){return t.delete(e)},"readwrite")},e.prototype.closeDatabase=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(e){switch(e.label){case 0:return this.dbPromise?[4,this.dbPromise]:[3,2];case 1:e.sent().close(),this.dbPromise=null,e.label=2;case 2:return[2]}})})},e.prototype.createTransaction=function(e,t){return void 0===t&&(t="readonly"),Object(c.__awaiter)(this,void 0,void 0,function(){var n,r,i,o;return Object(c.__generator)(this,function(s){switch(s.label){case 0:return[4,this.getDb()];case 1:return n=s.sent(),r=n.transaction(this.objectStoreName,t),i=r.objectStore(this.objectStoreName),[4,function(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}(e(i))];case 2:return o=s.sent(),[2,new Promise(function(e,t){r.oncomplete=function(){e(o)},r.onerror=function(){t(r.error)}})]}})})},e.prototype.getDb=function(){var e=this;return this.dbPromise||(this.dbPromise=new Promise(function(t,n){var r=indexedDB.open(e.dbName,e.dbVersion);r.onsuccess=function(){t(r.result)},r.onerror=function(){e.dbPromise=null,n(r.error)},r.onupgradeneeded=function(t){return e.onDbUpgrade(r,t)}})),this.dbPromise},e}(),S=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dbName="fcm_token_details_db",t.dbVersion=3,t.objectStoreName="fcm_token_object_Store",t}return Object(c.__extends)(t,e),t.prototype.onDbUpgrade=function(e,t){var n=e.result;switch(t.oldVersion){case 0:(r=n.createObjectStore(this.objectStoreName,{keyPath:"swScope"})).createIndex("fcmSenderId","fcmSenderId",{unique:!1}),r.createIndex("fcmToken","fcmToken",{unique:!0});case 1:!function(){var e=indexedDB.open("undefined");e.onerror=function(e){},e.onsuccess=function(t){!function(e){if(e.objectStoreNames.contains("fcm_token_object_Store")){var t=e.transaction("fcm_token_object_Store").objectStore("fcm_token_object_Store"),n=new g,r=t.openCursor();r.onerror=function(e){console.warn("Unable to cleanup old IDB.",e)},r.onsuccess=function(){var t=r.result;if(t){var i=t.value;n.deleteToken(i.fcmSenderId,i.fcmToken,i.fcmPushSet),t.continue()}else e.close(),indexedDB.deleteDatabase("undefined")}}}(e.result)}}();case 2:var r,i=(r=e.transaction.objectStore(this.objectStoreName)).openCursor();i.onsuccess=function(){var e=i.result;if(e){var t=e.value,n=Object(c.__assign)({},t);t.createTime||(n.createTime=Date.now()),"string"==typeof t.vapidKey&&(n.vapidKey=b(t.vapidKey)),"string"==typeof t.auth&&(n.auth=b(t.auth).buffer),"string"==typeof t.auth&&(n.p256dh=b(t.p256dh).buffer),e.update(n),e.continue()}}}},t.prototype.getTokenDetailsFromToken=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(t){if(!e)throw h.create(_.BAD_TOKEN);return O({fcmToken:e}),[2,this.getIndex("fcmToken",e)]})})},t.prototype.getTokenDetailsFromSWScope=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(t){if(!e)throw h.create(_.BAD_SCOPE);return O({swScope:e}),[2,this.get(e)]})})},t.prototype.saveTokenDetails=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(t){if(!e.swScope)throw h.create(_.BAD_SCOPE);if(!e.vapidKey)throw h.create(_.BAD_VAPID_KEY);if(!e.endpoint||!e.auth||!e.p256dh)throw h.create(_.BAD_SUBSCRIPTION);if(!e.fcmSenderId)throw h.create(_.BAD_SENDER_ID);if(!e.fcmToken)throw h.create(_.BAD_TOKEN);if(!e.fcmPushSet)throw h.create(_.BAD_PUSH_SET);return O(e),[2,this.put(e)]})})},t.prototype.deleteToken=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:return"string"!=typeof e||0===e.length?[2,Promise.reject(h.create(_.INVALID_DELETE_TOKEN))]:[4,this.getTokenDetailsFromToken(e)];case 1:if(!(t=n.sent()))throw h.create(_.DELETE_TOKEN_NOT_FOUND);return[4,this.delete(t.swScope)];case 2:return n.sent(),[2,t]}})})},t}(T);function O(e){if(e.fcmToken&&("string"!=typeof e.fcmToken||0===e.fcmToken.length))throw h.create(_.BAD_TOKEN);if(e.swScope&&("string"!=typeof e.swScope||0===e.swScope.length))throw h.create(_.BAD_SCOPE);if(e.vapidKey&&(!(e.vapidKey instanceof Uint8Array)||65!==e.vapidKey.length))throw h.create(_.BAD_VAPID_KEY);if(e.endpoint&&("string"!=typeof e.endpoint||0===e.endpoint.length))throw h.create(_.BAD_SUBSCRIPTION);if(e.auth&&!(e.auth instanceof ArrayBuffer))throw h.create(_.BAD_SUBSCRIPTION);if(e.p256dh&&!(e.p256dh instanceof ArrayBuffer))throw h.create(_.BAD_SUBSCRIPTION);if(e.fcmSenderId&&("string"!=typeof e.fcmSenderId||0===e.fcmSenderId.length))throw h.create(_.BAD_SENDER_ID);if(e.fcmPushSet&&("string"!=typeof e.fcmPushSet||0===e.fcmPushSet.length))throw h.create(_.BAD_PUSH_SET)}var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dbName="fcm_vapid_details_db",t.dbVersion=1,t.objectStoreName="fcm_vapid_object_Store",t}return Object(c.__extends)(t,e),t.prototype.onDbUpgrade=function(e){e.result.createObjectStore(this.objectStoreName,{keyPath:"swScope"})},t.prototype.getVapidFromSWScope=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:if("string"!=typeof e||0===e.length)throw h.create(_.BAD_SCOPE);return[4,this.get(e)];case 1:return[2,(t=n.sent())?t.vapidKey:void 0]}})})},t.prototype.saveVapidDetails=function(e,t){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(n){if("string"!=typeof e||0===e.length)throw h.create(_.BAD_SCOPE);if(null===t||65!==t.length)throw h.create(_.BAD_VAPID_KEY);return[2,this.put({swScope:e,vapidKey:t})]})})},t.prototype.deleteVapidDetails=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:return[4,this.getVapidFromSWScope(e)];case 1:if(!(t=n.sent()))throw h.create(_.DELETE_SCOPE_NOT_FOUND);return[4,this.delete(e)];case 2:return n.sent(),[2,t]}})})},t}(T),I="messagingSenderId",D=function(){function e(e){var t=this;if(!e.options[I]||"string"!=typeof e.options[I])throw h.create(_.BAD_SENDER_ID);this.messagingSenderId=e.options[I],this.tokenDetailsModel=new S,this.vapidDetailsModel=new w,this.iidModel=new g,this.app=e,this.INTERNAL={delete:function(){return t.delete()}}}return e.prototype.getToken=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){var e,t,n,r,i;return Object(c.__generator)(this,function(o){switch(o.label){case 0:if("denied"===(e=this.getNotificationPermission_()))throw h.create(_.NOTIFICATIONS_BLOCKED);return"granted"!==e?[2,null]:[4,this.getSWRegistration_()];case 1:return t=o.sent(),[4,this.getPublicVapidKey_()];case 2:return n=o.sent(),[4,this.getPushSubscription(t,n)];case 3:return r=o.sent(),[4,this.tokenDetailsModel.getTokenDetailsFromSWScope(t.scope)];case 4:return(i=o.sent())?[2,this.manageExistingToken(t,r,n,i)]:[2,this.getNewToken(t,r,n)]}})})},e.prototype.manageExistingToken=function(e,t,n,r){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(i){switch(i.label){case 0:return function(e,t,n){if(!n.vapidKey||!l(t.buffer,n.vapidKey.buffer))return!1;var r=e.endpoint===n.endpoint,i=l(e.getKey("auth"),n.auth),o=l(e.getKey("p256dh"),n.p256dh);return r&&i&&o}(t,n,r)?Date.now()<r.createTime+6048e5?[2,r.fcmToken]:[2,this.updateToken(e,t,n,r)]:[4,this.deleteTokenFromDB(r.fcmToken)];case 1:return i.sent(),[2,this.getNewToken(e,t,n)]}})})},e.prototype.updateToken=function(e,t,n,r){return Object(c.__awaiter)(this,void 0,void 0,function(){var i,o,s;return Object(c.__generator)(this,function(a){switch(a.label){case 0:return a.trys.push([0,4,,6]),[4,this.iidModel.updateToken(this.messagingSenderId,r.fcmToken,r.fcmPushSet,t,n)];case 1:return i=a.sent(),o={swScope:e.scope,vapidKey:n,fcmSenderId:this.messagingSenderId,fcmToken:i,fcmPushSet:r.fcmPushSet,createTime:Date.now(),endpoint:t.endpoint,auth:t.getKey("auth"),p256dh:t.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(o)];case 2:return a.sent(),[4,this.vapidDetailsModel.saveVapidDetails(e.scope,n)];case 3:return a.sent(),[2,i];case 4:return s=a.sent(),[4,this.deleteToken(r.fcmToken)];case 5:throw a.sent(),s;case 6:return[2]}})})},e.prototype.getNewToken=function(e,t,n){return Object(c.__awaiter)(this,void 0,void 0,function(){var r,i;return Object(c.__generator)(this,function(o){switch(o.label){case 0:return[4,this.iidModel.getToken(this.messagingSenderId,t,n)];case 1:return r=o.sent(),i={swScope:e.scope,vapidKey:n,fcmSenderId:this.messagingSenderId,fcmToken:r.token,fcmPushSet:r.pushSet,createTime:Date.now(),endpoint:t.endpoint,auth:t.getKey("auth"),p256dh:t.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(i)];case 2:return o.sent(),[4,this.vapidDetailsModel.saveVapidDetails(e.scope,n)];case 3:return o.sent(),[2,r.token]}})})},e.prototype.deleteToken=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t,n;return Object(c.__generator)(this,function(r){switch(r.label){case 0:return[4,this.deleteTokenFromDB(e)];case 1:return r.sent(),[4,this.getSWRegistration_()];case 2:return(t=r.sent())?[4,t.pushManager.getSubscription()]:[3,4];case 3:if(n=r.sent())return[2,n.unsubscribe()];r.label=4;case 4:return[2,!0]}})})},e.prototype.deleteTokenFromDB=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:return[4,this.tokenDetailsModel.deleteToken(e)];case 1:return t=n.sent(),[4,this.iidModel.deleteToken(t.fcmSenderId,t.fcmToken,t.fcmPushSet)];case 2:return n.sent(),[2]}})})},e.prototype.getPushSubscription=function(e,t){return e.pushManager.getSubscription().then(function(n){return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t})})},e.prototype.requestPermission=function(){throw h.create(_.AVAILABLE_IN_WINDOW)},e.prototype.useServiceWorker=function(e){throw h.create(_.AVAILABLE_IN_WINDOW)},e.prototype.usePublicVapidKey=function(e){throw h.create(_.AVAILABLE_IN_WINDOW)},e.prototype.onMessage=function(e,t,n){throw h.create(_.AVAILABLE_IN_WINDOW)},e.prototype.onTokenRefresh=function(e,t,n){throw h.create(_.AVAILABLE_IN_WINDOW)},e.prototype.setBackgroundMessageHandler=function(e){throw h.create(_.AVAILABLE_IN_SW)},e.prototype.delete=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(e){switch(e.label){case 0:return[4,Promise.all([this.tokenDetailsModel.closeDatabase(),this.vapidDetailsModel.closeDatabase()])];case 1:return e.sent(),[2]}})})},e.prototype.getNotificationPermission_=function(){return Notification.permission},e.prototype.getTokenDetailsModel=function(){return this.tokenDetailsModel},e.prototype.getVapidDetailsModel=function(){return this.vapidDetailsModel},e.prototype.getIidModel=function(){return this.iidModel},e}(),v=function(e){function t(t){var n=e.call(this,t)||this;return n.bgMessageHandler=null,self.addEventListener("push",function(e){n.onPush(e)}),self.addEventListener("pushsubscriptionchange",function(e){n.onSubChange(e)}),self.addEventListener("notificationclick",function(e){n.onNotificationClick(e)}),n}return Object(c.__extends)(t,e),t.prototype.onPush=function(e){e.waitUntil(this.onPush_(e))},t.prototype.onSubChange=function(e){e.waitUntil(this.onSubChange_(e))},t.prototype.onNotificationClick=function(e){e.waitUntil(this.onNotificationClick_(e))},t.prototype.onPush_=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t,n,r,i,o,s;return Object(c.__generator)(this,function(a){switch(a.label){case 0:if(!e.data)return[2];try{t=e.data.json()}catch(e){return[2]}return[4,this.hasVisibleClients_()];case 1:return a.sent()?[2,this.sendMessageToWindowClients_(t)]:(n=this.getNotificationData_(t))?(r=n.title||"",[4,this.getSWRegistration_()]):[3,3];case 2:return i=a.sent(),o=n.actions,s=Notification.maxActions,o&&s&&o.length>s&&console.warn("This browser only supports "+s+" actions.The remaining actions will not be displayed."),[2,i.showNotification(r,n)];case 3:return this.bgMessageHandler?[4,this.bgMessageHandler(t)]:[3,5];case 4:return a.sent(),[2];case 5:return[2]}})})},t.prototype.onSubChange_=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var e,t,n,r;return Object(c.__generator)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,this.getSWRegistration_()];case 1:return e=i.sent(),[3,3];case 2:throw t=i.sent(),h.create(_.UNABLE_TO_RESUBSCRIBE,{message:t});case 3:return i.trys.push([3,5,,8]),[4,e.pushManager.getSubscription()];case 4:return i.sent(),[3,8];case 5:return n=i.sent(),[4,this.getTokenDetailsModel().getTokenDetailsFromSWScope(e.scope)];case 6:if(!(r=i.sent()))throw n;return[4,this.deleteToken(r.fcmToken)];case 7:throw i.sent(),n;case 8:return[2]}})})},t.prototype.onNotificationClick_=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t,n,r,i;return Object(c.__generator)(this,function(s){switch(s.label){case 0:return e.notification&&e.notification.data&&e.notification.data.FCM_MSG?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(t=e.notification.data.FCM_MSG).notification&&(n=t.fcmOptions&&t.fcmOptions.link||t.notification.click_action)?[4,this.getWindowClient_(n)]:[2]):[2];case 1:return(r=s.sent())?[3,3]:[4,self.clients.openWindow(n)];case 2:return r=s.sent(),[3,5];case 3:return[4,r.focus()];case 4:r=s.sent(),s.label=5;case 5:return r?(delete t.notification,delete t.fcmOptions,i=m(o.NOTIFICATION_CLICKED,t),[2,this.attemptToMessageClient_(r,i)]):[2]}})})},t.prototype.getNotificationData_=function(e){var t;if(e&&"object"==typeof e.notification){var n=Object(c.__assign)({},e.notification);return n.data=Object(c.__assign)({},e.notification.data,((t={}).FCM_MSG=e,t)),n}},t.prototype.setBackgroundMessageHandler=function(e){if(!e||"function"!=typeof e)throw h.create(_.BG_HANDLER_FUNCTION_EXPECTED);this.bgMessageHandler=e},t.prototype.getWindowClient_=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t,n,r,i;return Object(c.__generator)(this,function(o){switch(o.label){case 0:return t=new URL(e,self.location.href).href,[4,N()];case 1:for(n=o.sent(),r=null,i=0;i<n.length;i++)if(new URL(n[i].url,self.location.href).href===t){r=n[i];break}return[2,r]}})})},t.prototype.attemptToMessageClient_=function(e,t){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(n){if(!e)throw h.create(_.NO_WINDOW_CLIENT_TO_MSG);return e.postMessage(t),[2]})})},t.prototype.hasVisibleClients_=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(e){switch(e.label){case 0:return[4,N()];case 1:return[2,e.sent().some(function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")})]}})})},t.prototype.sendMessageToWindowClients_=function(e){return Object(c.__awaiter)(this,void 0,void 0,function(){var t,n,r=this;return Object(c.__generator)(this,function(i){switch(i.label){case 0:return[4,N()];case 1:return t=i.sent(),n=m(o.PUSH_MSG_RECEIVED,e),[4,Promise.all(t.map(function(e){return r.attemptToMessageClient_(e,n)}))];case 2:return i.sent(),[2]}})})},t.prototype.getSWRegistration_=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(e){return[2,self.registration]})})},t.prototype.getPublicVapidKey_=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){var e,t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:return[4,this.getSWRegistration_()];case 1:if(!(e=n.sent()))throw h.create(_.SW_REGISTRATION_EXPECTED);return[4,this.getVapidDetailsModel().getVapidFromSWScope(e.scope)];case 2:return null==(t=n.sent())?[2,f]:[2,t]}})})},t}(D);function N(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function m(e,t){var n;return(n={})[i.TYPE_OF_MSG]=e,n[i.DATA]=t,n}var y=function(e){function t(t){var n=e.call(this,t)||this;return n.registrationToUse=null,n.publicVapidKeyToUse=null,n.manifestCheckPromise=null,n.messageObserver=null,n.tokenRefreshObserver=null,n.onMessageInternal=Object(u.createSubscribe)(function(e){n.messageObserver=e}),n.onTokenRefreshInternal=Object(u.createSubscribe)(function(e){n.tokenRefreshObserver=e}),n.setupSWMessageListener_(),n}return Object(c.__extends)(t,e),t.prototype.getToken=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(t){switch(t.label){case 0:return this.manifestCheckPromise||(this.manifestCheckPromise=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){var e,t;return Object(c.__generator)(this,function(n){switch(n.label){case 0:if(!(e=document.querySelector('link[rel="manifest"]')))return[2];n.label=1;case 1:return n.trys.push([1,4,,5]),[4,fetch(e.href)];case 2:return[4,n.sent().json()];case 3:return t=n.sent(),[3,5];case 4:return n.sent(),[2];case 5:if(!t||!t.gcm_sender_id)return[2];if("103953800507"!==t.gcm_sender_id)throw h.create(_.INCORRECT_GCM_SENDER_ID);return[2]}})})}()),[4,this.manifestCheckPromise];case 1:return t.sent(),[2,e.prototype.getToken.call(this)]}})})},t.prototype.requestPermission=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){var e;return Object(c.__generator)(this,function(t){switch(t.label){case 0:return"granted"===this.getNotificationPermission_()?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(e=t.sent()))return[2];throw h.create("denied"===e?_.PERMISSION_BLOCKED:_.PERMISSION_DEFAULT)}})})},t.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw h.create(_.SW_REGISTRATION_EXPECTED);if(null!=this.registrationToUse)throw h.create(_.USE_SW_BEFORE_GET_TOKEN);this.registrationToUse=e},t.prototype.usePublicVapidKey=function(e){if("string"!=typeof e)throw h.create(_.INVALID_PUBLIC_VAPID_KEY);if(null!=this.publicVapidKeyToUse)throw h.create(_.USE_PUBLIC_KEY_BEFORE_GET_TOKEN);var t=b(e);if(65!==t.length)throw h.create(_.PUBLIC_KEY_DECRYPTION_FAILED);this.publicVapidKeyToUse=t},t.prototype.onMessage=function(e,t,n){return"function"==typeof e?this.onMessageInternal(e,t,n):this.onMessageInternal(e)},t.prototype.onTokenRefresh=function(e,t,n){return"function"==typeof e?this.onTokenRefreshInternal(e,t,n):this.onTokenRefreshInternal(e)},t.prototype.waitForRegistrationToActivate_=function(e){var t=e.installing||e.waiting||e.active;return new Promise(function(n,r){if(t)if("activated"!==t.state)if("redundant"!==t.state){var i=function(){if("activated"===t.state)n(e);else{if("redundant"!==t.state)return;r(h.create(_.SW_REG_REDUNDANT))}t.removeEventListener("statechange",i)};t.addEventListener("statechange",i)}else r(h.create(_.SW_REG_REDUNDANT));else n(e);else r(h.create(_.NO_SW_IN_REG))})},t.prototype.getSWRegistration_=function(){var e=this;return this.registrationToUse?this.waitForRegistrationToActivate_(this.registrationToUse):(this.registrationToUse=null,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(e){throw h.create(_.FAILED_DEFAULT_REGISTRATION,{browserErrorMessage:e.message})}).then(function(t){return e.waitForRegistrationToActivate_(t).then(function(){return e.registrationToUse=t,t.update(),t})}))},t.prototype.getPublicVapidKey_=function(){return Object(c.__awaiter)(this,void 0,void 0,function(){return Object(c.__generator)(this,function(e){return this.publicVapidKeyToUse?[2,this.publicVapidKeyToUse]:[2,f]})})},t.prototype.setupSWMessageListener_=function(){var e=this;navigator.serviceWorker.addEventListener("message",function(t){if(t.data&&t.data[i.TYPE_OF_MSG]){var n=t.data;switch(n[i.TYPE_OF_MSG]){case o.PUSH_MSG_RECEIVED:case o.NOTIFICATION_CLICKED:e.messageObserver&&e.messageObserver.next(n[i.DATA])}}},!1)},t}(D);function k(){return self&&"ServiceWorkerGlobalScope"in self?"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}a.a.INTERNAL.registerService("messaging",function(e){if(!k())throw h.create(_.UNSUPPORTED_BROWSER);return self&&"ServiceWorkerGlobalScope"in self?new v(e):new y(e)},{isSupported:k})}}]);