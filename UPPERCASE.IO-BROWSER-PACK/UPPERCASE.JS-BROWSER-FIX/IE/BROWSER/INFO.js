OVERRIDE(INFO,function(n){"use strict";global.INFO=OBJECT({preset:function(){return n},init:function(n,t){var e,r,a;void 0===navigator.language&&(t.getLang=e=function(){var n=STORE("__INFO").get("lang");return void 0===n&&(n=navigator.userLanguage,n.length>2&&(n=n.substring(0,2)),n=n.toLowerCase()),n}),t.checkIsHDDisplay=r=function(){return!1},t.checkIsTouchMode=a=function(){return void 0!==navigator.msPointerEnabled}}})});