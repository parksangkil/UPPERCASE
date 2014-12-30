global.NODE_CONFIG={},global.CPU_CLUSTERING=METHOD(function(o){"use strict";var E,n,t=require("cluster");return o.getWorkerId=n=function(){return E},{run:function(n){RUN(t.isMaster?function(){var o=function(){var o=t.fork();o.on("message",function(E){EACH(t.workers,function(n){n!==o&&n.send(E)})})};REPEAT(require("os").cpus().length,function(){o()}),t.on("exit",function(E,n,t){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+E.id+" died. ("+(void 0!==t?t:n)+"). restarting...")),o()})}:function(){var e,i,r,S={},a=function(o,E){var n=S[o];void 0!==n&&EACH(n,function(o){o(E)})};E=t.worker.id,process.on("message",function(o){var E=PARSE_STR(o);void 0!==E&&a(E.methodName,E.data)}),o.on=e=function(o,E){var n=S[o];void 0===n&&(n=S[o]=[]),n.push(E)},e("__SHARED_STORE_SAVE",SHARED_STORE.save),e("__SHARED_STORE_REMOVE",SHARED_STORE.remove),e("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),e("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),o.off=i=function(o){delete S[o]},o.broadcast=r=function(o){process.send(STRINGIFY(o))},n(),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+E+")"))})}}}),global.CPU_SHARED_STORE=CLASS(function(o){"use strict";var E,n,t,e={},i={};return o.save=E=function(o,E){var n=o.fullName,t=o.value,r=o.removeAfterSeconds,S=o.isWaitingRemove;e[n]=t,S===!0&&void 0!==i[n]&&(i[n].remove(),delete i[n]),void 0!==r&&(i[n]=DELAY(r,E))},o.get=n=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(E,n,t){var e,i,r,S;E.getFullName=e=function(o){return t+"."+o},n.save=i=function(E){var n=E.name,t=e(n),i=E.value,r=E.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){S(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitingRemove:void 0!==r}})},n.get=r=function(E){return o.get(e(E))},n.remove=S=function(E){var n=e(E);o.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:n})}}}}),global.SERVER_CLUSTERING=METHOD(function(o){"use strict";return{run:function(E,n){var t,e,i,r,S=E.servers,a=E.thisServerName,c=E.port,s={},u={},R={},_=[];t=function(o){u[o]!==!0&&(u[o]=!0,CONNECT_TO_SOCKET_SERVER({host:S[o],port:c},{error:function(){delete u[o]},success:function(E,n,t){t({methodName:"__BOOTED",data:a}),R[o]=function(o){var E=o.methodName,n=o.data;t({methodName:"SERVER_CLUSTERING."+E,data:n})},E("__DISCONNECTED",function(){delete R[o],delete u[o]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (SERVER NAME:"+o+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:o})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",t),EACH(S,function(o,E){E!==a&&t(E)}),SOCKET_SERVER(c,function(o,E){_.push(E),E("__BOOTED",function(o){t(o)}),EACH(s,function(o,n){EACH(o,function(o){E("SERVER_CLUSTERING."+n,o)})}),E("__DISCONNECTED",function(){REMOVE({array:_,value:E})})}),o.on=e=function(o,E){var n=s[o];void 0===n&&(n=s[o]=[]),n.push(E),EACH(_,function(n){n("SERVER_CLUSTERING."+o,E)})},e("__SHARED_STORE_SAVE",function(o){SHARED_STORE.save(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:o})}),e("__SHARED_STORE_REMOVE",function(o){SHARED_STORE.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}),o.off=i=function(o){delete s[o]},o.broadcast=r=function(o){EACH(R,function(E){E(o)})},void 0!==n&&n(),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER NAME:"+a+", PORT:"+c+")"))}}}),global.SHARED_STORE=CLASS(function(o){"use strict";var E,n,t,e={},i={};return o.save=E=function(o,E){var n=o.fullName,t=o.value,r=o.removeAfterSeconds,S=o.isWaitingRemove;e[n]=t,S===!0&&void 0!==i[n]&&(i[n].remove(),delete i[n]),void 0!==r&&(i[n]=DELAY(r,E))},o.get=n=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(E,n,t){var e,i,r,S;e=function(o){return t+"."+o},n.save=i=function(E){var n=E.name,t=e(n),i=E.value,r=E.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){S(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitingRemove:void 0!==r}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitingRemove:void 0!==r}})},n.get=r=function(E){return o.get(e(E))},n.remove=S=function(E){var n=e(E);o.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n})}}}}),global.CONNECT_TO_SOCKET_SERVER=METHOD({run:function(o,E){"use strict";var n,t,e,i,r,S,a,c,s=o.host,u=o.port,R=require("net"),_={},d=0,C="";CHECK_IS_DATA(E)!==!0?n=E:(n=E.success,t=E.error),c=function(o,E,n){var t=_[o];void 0!==t&&EACH(t,function(o){o(E,function(o){void 0!==a&&void 0!==n&&a({methodName:"__CALLBACK_"+n,data:o})})})},e=R.connect({host:s,port:u},function(){i=!0,n(r=function(o,E){var n=_[o];void 0===n&&(n=_[o]=[]),n.push(E)},S=function(o,E){var n=_[o];void 0!==n&&(void 0!==E?REMOVE({array:n,value:E}):delete _[o])},a=function(o,E){var n="__CALLBACK_"+d;o.sendKey=d,d+=1,e.write(STRINGIFY(o)+"\r\n"),void 0!==E&&r(n,function(o){E(o),S(n)})},function(){e.end()})}),e.on("data",function(o){var E,n,t;for(C+=o.toString();-1!==(n=C.indexOf("\r\n"));)E=C.substring(0,n),t=PARSE_STR(E),void 0!==t&&c(t.methodName,t.data,t.sendKey),C=C.substring(n+1)}),e.on("close",function(){c("__DISCONNECTED")}),e.on("error",function(o){var E=o.toString();i!==!0?void 0!==t?t(E):console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+E)):c("__ERROR",E)})}}),global.CONSOLE_BLUE=METHOD({run:function(o){"use strict";return"[36m"+o+"[0m"}}),global.CONSOLE_GREEN=METHOD({run:function(o){"use strict";return"[32m"+o+"[0m"}}),global.CONSOLE_RED=METHOD({run:function(o){"use strict";return"[31m"+o+"[0m"}}),global.CONSOLE_YELLOW=METHOD({run:function(o){"use strict";return"[33m"+o+"[0m"}}),global.SHA1=METHOD({run:function(o){"use strict";var E=o.key,n=o.password,t=require("crypto");return t.createHmac("sha1",E).update(n).digest("hex")}}),global.CHECK_IS_EXISTS_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(E,n){var t,e;return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),e===!0?o.existsSync(t):void o.exists(t,n)}}}),global.COPY_FILE=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r,S=n.from,a=n.to,c=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.notExists,r=t.error)),CREATE_FOLDER({path:E.dirname(a),isSync:c},{error:r,success:function(){c!==!0?CHECK_IS_EXISTS_FILE(S,function(E){var n;E===!0?(n=o.createReadStream(S),n.pipe(o.createWriteStream(a)),n.on("error",function(o){var E=o.toString();void 0!==r?r(E):console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR:"+E))}),n.on("end",function(){void 0!==e&&e()})):void 0!==i?i(S):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-COPY_FILE] NOT EXISTS! <"+S+">"))}):RUN(function(){var E;try{if(CHECK_IS_EXISTS_FILE({path:S,isSync:!0})!==!0)return void(void 0!==i?i(S):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-COPY_FILE] NOT EXISTS! <"+S+">")));o.writeFileSync(a,o.readFileSync(S))}catch(n){n!==TO_DELETE&&(E=n.toString(),void 0!==r?r(E):console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR: "+E)))}void 0!==e&&e()})}})}}}),global.CREATE_FOLDER=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r,S,a;CHECK_IS_DATA(n)!==!0?e=n:(e=n.path,i=n.isSync),void 0!==t&&(CHECK_IS_DATA(t)!==!0?S=t:(S=t.success,a=t.error)),i!==!0?CHECK_IS_EXISTS_FILE(e,function(n){n===!0?void 0!==S&&S():(r=E.dirname(e),CHECK_IS_EXISTS_FILE(r,function(E){E===!0?o.mkdir(e,function(o){var E;o!==TO_DELETE?(E=o.toString(),void 0!==a?a(E):console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+E))):S()}):CREATE_FOLDER(r,function(){CREATE_FOLDER(e,S)})}))}):RUN(function(){var n;try{CHECK_IS_EXISTS_FILE({path:e,isSync:!0})!==!0&&(r=E.dirname(e),CHECK_IS_EXISTS_FILE({path:r,isSync:!0})===!0?o.mkdirSync(e):(CREATE_FOLDER({path:r,isSync:!0}),CREATE_FOLDER({path:e,isSync:!0})))}catch(t){t!==TO_DELETE&&(n=t.toString(),void 0!==a?a(n):console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+n)))}void 0!==S&&S()})}}}),global.FIND_FILE_NAMES=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(E,n){var t,e,i,r,S,a=[];return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,S=n.error)),e===!0?RUN(function(){var E,n;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-FIND_FILE_NAMES] NOT EXISTS! <"+t+">")));E=o.readdirSync(t),EACH(E,function(E){"."!==E[0]&&o.statSync(t+"/"+E).isDirectory()!==!0&&a.push(E)})}catch(e){e!==TO_DELETE&&(n=e.toString(),void 0!==S?S(n):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR: "+n)))}return void 0!==i&&i(a),a}):void CHECK_IS_EXISTS_FILE(t,function(E){E===!0?o.readdir(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:"+e))):void 0!==i&&PARALLEL(n,[function(E,n){"."!==E[0]?o.stat(t+"/"+E,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE_NAMES] ERROR:"+e))):(t.isDirectory()!==!0&&a.push(E),n())}):n()},function(){void 0!==i&&i(a)}])}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-FIND_FOLDER_NAMES] NOT EXISTS! <"+t+">"))})}}}),global.FIND_FOLDER_NAMES=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(E,n){var t,e,i,r,S,a=[];return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,S=n.error)),e===!0?RUN(function(){var E,n;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-FIND_FOLDER_NAMES] NOT EXISTS! <"+t+">")));E=o.readdirSync(t),EACH(E,function(E){"."!==E[0]&&o.statSync(t+"/"+E).isDirectory()===!0&&a.push(E)})}catch(e){e!==TO_DELETE&&(n=e.toString(),void 0!==S?S(n):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR: "+n)))}return void 0!==i&&i(a),a}):void CHECK_IS_EXISTS_FILE(t,function(E){E===!0?o.readdir(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR:"+e))):void 0!==i&&PARALLEL(n,[function(E,n){"."!==E[0]?o.stat(t+"/"+E,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER_NAMES] ERROR:"+e))):(t.isDirectory()===!0&&a.push(E),n())}):n()},function(){void 0!==i&&i(a)}])}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-FIND_FOLDER_NAMES] NOT EXISTS! <"+t+">"))})}}}),global.MOVE_FILE=METHOD({run:function(o,E){"use strict";var n,t,e,i=o.from,r=o.isSync;CHECK_IS_DATA(E)!==!0?n=E:(n=E.success,t=E.notExists,e=E.error),COPY_FILE(o,{error:e,notExists:t,success:function(){REMOVE_FILE({path:i,isSync:r},{error:e,notExists:t,success:n})}})}}),global.READ_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(E,n){var t,e,i,r,S;return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,S=n.error)),e===!0?RUN(function(){var E,n;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")));if(o.statSync(t).isDirectory()===!0)return void(void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")))}catch(e){e!==TO_DELETE&&(E=e.toString(),void 0!==S?S(E):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+E)))}return n=o.readFileSync(t),void 0!==i&&i(n),n}):void CHECK_IS_EXISTS_FILE(t,function(E){E===!0?o.stat(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),void 0!==S?S(e):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+e))):n.isDirectory()===!0?void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")):o.readFile(t,function(o,E){var n;o!==TO_DELETE?(n=o.toString(),void 0!==S?S(n):console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+n))):void 0!==i&&i(E)})}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))})}}}),global.REMOVE_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(E,n){var t,e,i,r,S;CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,S=n.error),e!==!0?CHECK_IS_EXISTS_FILE(t,function(E){E===!0?o.unlink(t,function(o){var E;o!==TO_DELETE?(E=o.toString(),void 0!==S?S(E):console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+E))):void 0!==i&&i()}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}):RUN(function(){var E;try{if(CHECK_IS_EXISTS_FILE({path:t,isSync:!0})!==!0)return void(void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">")));o.unlinkSync(t)}catch(n){n!==TO_DELETE&&(E=n.toString(),void 0!==S?S(E):console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+E)))}void 0!==i&&i()})}}}),global.WRITE_FILE=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r=n.path,S=n.content,a=n.buffer,c=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error)),CREATE_FOLDER({path:E.dirname(r),isSync:c},function(){c!==!0?o.writeFile(r,void 0!==a?a:S,function(o){var E;o!==TO_DELETE?(E=o.toString(),void 0!==i?i(E):console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+E))):void 0!==e&&e()}):RUN(function(){var E;try{o.writeFileSync(r,void 0!==a?a:S)}catch(n){n!==TO_DELETE&&(E=n.toString(),void 0!==i?i(E):console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR: "+E)))}void 0!==e&&e()})})}}}),global.DELETE=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"DELETE"}]),E)}}),global.GET=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"GET"}]),E)}}),global.POST=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"POST"}]),E)}}),global.PUT=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"PUT"}]),E)}}),global.REQUEST=METHOD(function(){"use strict";var o=require("http"),E=require("https");return{run:function(n,t){var e,i,r,S=n.host,a=n.isSecure,c=void 0===n.port?a!==!0?80:443:n.port,s=n.method,u=n.uri,R=n.paramStr,_=n.data;s=s.toUpperCase(),void 0!==u&&-1!==u.indexOf("?")&&(R=u.substring(u.indexOf("?")+1)+(void 0===R?"":"&"+R),u=u.substring(0,u.indexOf("?"))),void 0!==_&&(R=(void 0===R?"":R+"&")+"data="+encodeURIComponent(STRINGIFY(_))),R=(void 0===R?"":R+"&")+Date.now(),CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error),"GET"===s?r=(a!==!0?o:E).get({hostname:S,port:c,path:"/"+(void 0===u?"":u)+"?"+R},function(o){var E="";o.setEncoding("utf-8"),o.on("data",function(o){E+=o}),o.on("end",function(){e(E,o.headers)})}):(r=(a!==!0?o:E).request({hostname:S,port:c,path:"/"+(void 0===u?"":u),method:s},function(o){var E="";o.setEncoding("utf-8"),o.on("data",function(o){E+=o}),o.on("end",function(){e(E,o.headers)})}),r.write(R),r.end()),r.on("error",function(o){var E=o.toString();void 0!==i?i(E):console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+E),n)})}}}),global.RESOURCE_SERVER=CLASS(function(o){"use strict";var E,n=require("path"),t=require("querystring");return o.getContentTypeFromURI=E=function(o){var E=n.extname(o);return".png"===E?"image/png":".jpeg"===E||".jpg"===E?"image/jpeg":".gif"===E?"image/gif":".svg"===E?"image/svg+xml":".js"===E?"application/javascript":".json"===E?"application/json":".css"===E?"text/css":".text"===E||".txt"===E?"text/plain":".html"===E?"text/html":".swf"===E?"application/x-shockwave-flash":".mp3"===E?"audio/mpeg":"application/octet-stream"},{init:function(o,n,e,i){var r,S,a,c,s,u,R,_,d,C=(require("path"),{});CHECK_IS_DATA(e)!==!0?r=e:(r=e.port,S=e.securedPort,a=e.rootPath,c=e.version),void 0!==i&&(CHECK_IS_DATA(i)!==!0?s=i:(s=i.requestListener,u=i.error,R=i.notExistsResource)),_=WEB_SERVER(e,function(o,n,e){var i,r,S,_=a,d=o.uri,v=o.uri,O=o.method,T=o.params,f=o.headers,l={};NEXT([function(E){void 0!==s&&(i=s(o,n,e,function(o){_=o},function(o){void 0!==o&&(l=o),DELAY(E)}),v=o.uri,O=o.method,T=o.params,f=o.headers),i!==!1&&o.isResponsed!==!0&&E()},function(){return function(){CONFIG.isDevMode!==!0&&(l.isFinal!==!0?void 0!==c&&f["if-none-match"]===c:void 0!==f["if-none-match"])?n(EXTEND({origin:{statusCode:304},extend:l})):CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0!==c&&""!==d&&T.version!==c?n(EXTEND({origin:{statusCode:302,headers:{Location:"/"+d+"?"+t.stringify(COMBINE([T,{version:c}]))}},extend:l})):void 0!==_&&"GET"===O?(r=function(E){void 0!==R&&R(E,o,n),o.isResponsed!==!0&&n(EXTEND({origin:{statusCode:404},extend:l}))},S=function(E){void 0!==u?u(E,o,n):console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+E)),o.isResponsed!==!0&&n(EXTEND({origin:{statusCode:500},extend:l}))},NEXT([function(o){var E=C[d];void 0!==E?o(E.buffer,E.contentType):READ_FILE(_+"/"+v,{notExists:function(){READ_FILE(_+(""===v?"":"/"+v)+"/index.html",{notExists:r,error:S,success:function(E){o(E,"text/html")}})},error:S,success:o})},function(){return function(o,t){void 0===t&&(t=E(v)),CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0===C[d]&&(C[d]={buffer:o,contentType:t}),n(EXTEND({origin:{buffer:o,contentType:t,version:c},extend:l}))}}])):n(EXTEND({origin:{statusCode:404},extend:l}))}}])}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===r?"":" (PORT:"+r+")")+(void 0===S?"":" (SECURED PORT:"+S+")")),n.getNativeHTTPServer=d=function(){return _.getNativeHTTPServer()}}}}),global.SOCKET_SERVER=METHOD({run:function(o,E){"use strict";var n=require("net"),t=n.createServer(function(o){var n,t,e,i={},r=0,S="",a=function(o,E,n){var t=i[o];void 0!==t&&EACH(t,function(o){o(E,function(o){void 0!==n&&e({methodName:"__CALLBACK_"+n,data:o})})})};o.on("data",function(o){var E,n,t;for(S+=o.toString();-1!==(n=S.indexOf("\r\n"));)E=S.substring(0,n),t=PARSE_STR(E),void 0!==t&&a(t.methodName,t.data,t.sendKey),S=S.substring(n+1)}),o.on("close",function(){a("__DISCONNECTED"),i=void 0}),o.on("error",function(o){var E=o.toString();console.log("[UPPERCASE.JS-SOCEKT_SERVER] ERROR:",E),a("__ERROR",E)}),E({ip:o.remoteAddress},n=function(o,E){var n=i[o];void 0===n&&(n=i[o]=[]),n.push(E)},t=function(o,E){var n=i[o];void 0!==n&&(void 0!==E?REMOVE({array:n,value:E}):delete i[o])},e=function(E,e){var i="__CALLBACK_"+r;E.sendKey=r,r+=1,o.write(STRINGIFY(E)+"\r\n"),void 0!==e&&n(i,function(o){e(o),t(i)})},function(){o.end()})});t.listen(o),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+o+")")}}),global.WEB_SERVER=CLASS(function(o){"use strict";var E,n=require("http"),t=require("querystring"),e=require("zlib");return o.getEncodingFromContentType=E=function(o){return"application/javascript"===o?"utf-8":"application/json"===o?"utf-8":"text/css"===o?"utf-8":"text/plain"===o?"utf-8":"text/html"===o?"utf-8":"image/png"===o?"binary":"image/jpeg"===o?"binary":"image/gif"===o?"binary":"image/svg+xml"===o?"utf-8":"application/x-shockwave-flash"===o?"binary":"audio/mpeg"===o?"binary":"binary"},{init:function(o,i,r,S){var a,c,s,u,R,_,d,C;CHECK_IS_DATA(r)!==!0?a=r:(a=r.port,c=r.securedPort,s=r.securedKeyFilePath,u=r.securedCertFilePath,R=r.noParsingParamsURI),d=function(o,n){var i,r,a=o.headers,c=o.url,s=o.method.toUpperCase(),u=a["x-forwarded-for"],_=a["accept-encoding"],d=[];void 0===u&&(u=o.connection.remoteAddress),void 0===_&&(_=""),-1!=c.indexOf("?")&&(i=c.substring(c.indexOf("?")+1),c=c.substring(0,c.indexOf("?"))),c=c.substring(1),NEXT([function(E){"GET"===s||R===c||CHECK_IS_IN({array:R,value:c})===!0?E():(o.on("data",function(o){void 0===i&&(i=""),i+=o}),o.on("end",function(){E()}))},function(){return function(){S(r={headers:a,uri:c,method:s,params:t.parse(i),ip:u,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:o},function(o){var t,i,S,a,c,s,u,R;r.isResponsed!==!0&&(CHECK_IS_DATA(o)!==!0?a=o:(t=o.statusCode,i=o.headers,S=o.contentType,a=o.content,c=o.buffer,s=o.encoding,u=o.version,R=o.isFinal),void 0===t&&(t=200),void 0===i&&(i={}),void 0!==S&&(void 0===s&&(s=E(S)),i["Content-Type"]=S+"; charset="+s),CONFIG.isDevMode!==!0&&(R===!0?i.ETag="FINAL":void 0!==u&&(i.ETag=u)),_.match(/\bgzip\b/)!==TO_DELETE?(i["Content-Encoding"]="gzip",e.gzip(void 0!==c?c:String(a),function(o,E){n.writeHead(t,i),n.end(E,s)})):(n.writeHead(t,i),n.end(void 0!==c?c:String(a),s)),r.isResponsed=!0)},function(o){d.push(o)})}}]),R!==c&&CHECK_IS_IN({array:R,value:c})!==!0&&o.on("close",function(){EACH(d,function(o){o()})})},void 0!==a&&(_=n.createServer(d).listen(a)),void 0!==c&&(_=https.createServer({key:fs.readFileSync(s),cert:fs.readFileSync(u)},d).listen(c)),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===c?"":" (SECURED PORT:"+c+")")),i.getNativeHTTPServer=C=function(){return _}}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(o){"use strict";var E,n={};return void 0!==o&&(E=o.split(";"),EACH(E,function(o){var E=o.split("=");n[E[0].trim()]=decodeURIComponent(E[1])})),n}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(o){"use strict";var E=[];return EACH(o,function(o,n){E.push(n+"="+encodeURIComponent(o))}),E}});