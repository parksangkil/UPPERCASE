global.BOOT=BOOT=function(params){"use strict";var path=require("path"),cluster=require("cluster"),version,rootPath=process.cwd(),browserScript="global = window;\n",indexPageContent="",boxNamesInBOXFolder=[],loadJSForNode=function(e){require(e)},loadJSForBrowser=function(e){browserScript+=READ_FILE({path:e,isSync:!0}).toString()+"\n"},loadJSForClient=function(e){loadJSForBrowser(e)},loadJSForCommon=function(e){loadJSForNode(e),loadJSForBrowser(e)},loadCoffeeForNode=function(e){RUN_COFFEE(READ_FILE({path:e,isSync:!0}).toString())},loadCoffeeForBrowser=function(e){browserScript+=COMPILE_COFFEE_TO_JS(READ_FILE({path:e,isSync:!0}).toString())+"\n"},loadCoffeeForClient=function(e){loadCoffeeForBrowser(e)},loadCoffeeForCommon=function(e){loadCoffeeForNode(e),loadCoffeeForBrowser(e)},loadLiterateCoffeeForNode=function(e){RUN_LITCOFFEE(READ_FILE({path:e,isSync:!0}).toString())},loadLiterateCoffeeForBrowser=function(e){browserScript+=COMPILE_LITCOFFEE_TO_JS(READ_FILE({path:e,isSync:!0}).toString())+"\n"},loadLiterateCoffeeForClient=function(e){loadLiterateCoffeeForBrowser(e)},loadLiterateCoffeeForCommon=function(e){loadLiterateCoffeeForNode(e),loadLiterateCoffeeForBrowser(e)},checkIsAllowedFolderName=function(e){return"BOX"!==e&&"node_modules"!==e&&"not_load"!==e&&"deprecated"!==e&&"_"!==e[0]},loadUJS,configuration,initBoxes,clustering,initDatabase,initModelSystem,loadAllScripts,generateIndexPage,run;loadUJS=function(){loadJSForNode(__dirname+"/UPPERCASE.JS-COMMON.js"),loadJSForNode(__dirname+"/UPPERCASE.JS-NODE.js"),loadJSForBrowser(__dirname+"/UPPERCASE.JS-COMMON.js"),loadJSForBrowser(__dirname+"/UPPERCASE.JS-BROWSER.js")},configuration=function(){var _CONFIG,_NODE_CONFIG,_BROWSER_CONFIG,stringifyJSONWithFunction=function(data){return JSON.stringify(data,function(e,o){return"function"==typeof o?"__THIS_IS_FUNCTION_START__"+o.toString()+"__THIS_IS_FUNCTION_END__":o},"	").replace(/("__THIS_IS_FUNCTION_START__(.*)__THIS_IS_FUNCTION_END__")/g,function(match,content){return eval("("+eval('"'+content.substring('"__THIS_IS_FUNCTION_START__'.length,content.length-'__THIS_IS_FUNCTION_END__"'.length)+'"')+")").toString()})};NODE_CONFIG.rootPath=rootPath,void 0!==params&&(_CONFIG=params.CONFIG,_NODE_CONFIG=params.NODE_CONFIG,_BROWSER_CONFIG=params.BROWSER_CONFIG),void 0!==_CONFIG&&(EXTEND({origin:CONFIG,extend:_CONFIG}),browserScript+="EXTEND({ origin : CONFIG, extend : "+stringifyJSONWithFunction(_CONFIG)+" });\n"),CONFIG.isDevMode===!0&&cluster.isMaster===!0&&(version="V"+Date.now(),WRITE_FILE({path:rootPath+"/V",content:version,isSync:!0})),READ_FILE({path:rootPath+"/V",isSync:!0},{notExists:function(){console.log(CONSOLE_RED("[UPPERCASE.IO] NOT EXISTS `V` VERSION FILE!")),version="V__NOT_EXISTS"},success:function(e){version=e.toString()}}),CONFIG.version=version,browserScript+="CONFIG.version = '"+version+"'\n",void 0!==_NODE_CONFIG&&EXTEND({origin:NODE_CONFIG,extend:_NODE_CONFIG}),void 0!==_BROWSER_CONFIG&&(browserScript+="EXTEND({ origin : BROWSER_CONFIG, extend : "+stringifyJSONWithFunction(_BROWSER_CONFIG)+" });\n"),browserScript+="BROWSER_CONFIG.fixScriptsFolderPath = '/UPPERCASE.JS-BROWSER-FIX'\n",browserScript+="BROWSER_CONFIG.fixTransportScriptsFolderPath = '/UPPERCASE.IO-TRANSPORT'\n"},initBoxes=function(){loadJSForCommon(__dirname+"/UPPERCASE.IO-BOX/CORE.js"),FIND_FOLDER_NAMES({path:rootPath,isSync:!0},function(e){EACH(e,function(e){checkIsAllowedFolderName(e)===!0&&(BOX(e),browserScript+="BOX('"+e+"');\n")})}),CHECK_IS_EXISTS_FILE({path:rootPath+"/BOX",isSync:!0})===!0&&FIND_FOLDER_NAMES({path:rootPath+"/BOX",isSync:!0},function(e){EACH(e,function(e){checkIsAllowedFolderName(e)===!0&&(BOX(e),browserScript+="BOX('"+e+"');\n",boxNamesInBOXFolder.push(e))})}),loadJSForBrowser(__dirname+"/UPPERCASE.IO-BOX/CLIENT.js"),loadJSForBrowser(__dirname+"/UPPERCASE.IO-BOX/BROWSER.js")},clustering=function(e){CPU_CLUSTERING(function(){void 0!==NODE_CONFIG.clusteringServers&&void 0!==NODE_CONFIG.thisServerName&&void 0!==NODE_CONFIG.clusteringPort?SERVER_CLUSTERING({servers:NODE_CONFIG.clusteringServers,thisServerName:NODE_CONFIG.thisServerName,port:NODE_CONFIG.clusteringPort},e):e()})},initDatabase=function(){loadJSForNode(__dirname+"/UPPERCASE.IO-DB/NODE.js"),void 0!==NODE_CONFIG.dbName&&CONNECT_TO_DB_SERVER({name:NODE_CONFIG.dbName,host:NODE_CONFIG.dbHost,port:NODE_CONFIG.dbPort,username:NODE_CONFIG.dbUsername,password:NODE_CONFIG.dbPassword})},initModelSystem=function(){loadJSForNode(__dirname+"/UPPERCASE.IO-TRANSPORT/NODE.js"),loadJSForBrowser(__dirname+"/UPPERCASE.IO-TRANSPORT/BROWSER.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-ROOM/NODE.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-ROOM/CLIENT.js"),loadJSForBrowser(__dirname+"/UPPERCASE.IO-ROOM/BROWSER.js"),loadJSForCommon(__dirname+"/UPPERCASE.IO-MODEL/COMMON.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-MODEL/NODE.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-MODEL/CLIENT.js")},loadAllScripts=function(){var e=function(e,o,t,n){var r=function(e){FIND_FILE_NAMES({path:e,isSync:!0},{error:function(){},success:function(r){EACH(r,function(r){var i=e+"/"+r,a=path.extname(r).toLowerCase();".js"===a?o(i):".coffee"===a?t(i):".litcoffee"===a&&n(i)})}}),FIND_FOLDER_NAMES({path:e,isSync:!0},{error:function(){},success:function(o){EACH(o,function(o){checkIsAllowedFolderName(o)===!0&&r(e+"/"+o)})}})};FOR_BOX(function(i){var a=CHECK_IS_IN({array:boxNamesInBOXFolder,value:i.boxName})===!0?rootPath+"/BOX":rootPath;r(a+"/"+i.boxName+"/"+e),FIND_FILE_NAMES({path:a+"/"+i.boxName,isSync:!0},{error:function(){},success:function(r){EACH(r,function(r){var s=a+"/"+i.boxName+"/"+r,O=path.extname(r).toLowerCase();r===e+O&&(".js"===O?o(s):".coffee"===O?t(s):".litcoffee"===O&&n(s))})}})})};e("COMMON",loadJSForCommon,loadCoffeeForCommon,loadLiterateCoffeeForCommon),e("NODE",loadJSForNode,loadCoffeeForNode,loadLiterateCoffeeForNode),e("BROWSER",loadJSForBrowser,loadCoffeeForBrowser,loadLiterateCoffeeForBrowser),e("CLIENT",loadJSForClient,loadCoffeeForClient,loadLiterateCoffeeForClient)},generateIndexPage=function(){indexPageContent+="<!DOCTYPE html>",indexPageContent+="<html>",indexPageContent+="<head>",indexPageContent+='<meta charset="utf-8">',indexPageContent+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'+(CONFIG.isMobileFullScreen===!0?", minimal-ui":"")+'">',indexPageContent+='<meta name="google" value="notranslate">',void 0!==CONFIG.googleSiteVerificationKey&&(indexPageContent+='<meta name="google-site-verification" content="'+CONFIG.googleSiteVerificationKey+'" />'),indexPageContent+='<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">',void 0!==CONFIG.description&&(indexPageContent+='<meta name="description" content="'+CONFIG.description+'">'),indexPageContent+='<link href="/favicon.ico" rel="shortcut icon">',indexPageContent+="<title>"+CONFIG.defaultTitle+"</title>",indexPageContent+='<link rel="stylesheet" type="text/css" href="/__CSS?'+CONFIG.version+'" />',indexPageContent+="</head>",indexPageContent+="<body>",indexPageContent+="<noscript>",indexPageContent+='<p style="padding:15px;">',indexPageContent+="JavaScript is disabled. Please enable JavaScript in your browser.",indexPageContent+="</p>",indexPageContent+="</noscript>",indexPageContent+='<script type="text/javascript" src="/__SCRIPT?'+CONFIG.version+'"></script>',indexPageContent+="</body>",indexPageContent+="</html>"},run=function(){var e,o,t,n,r,i,a,s,O=CALENDAR();void 0!==NODE_CONFIG.uploadServers&&(e=[],n=0,EACH(NODE_CONFIG.uploadServers,function(o){e.push(o)})),void 0!==NODE_CONFIG.socketServers&&(o=[],r=0,EACH(NODE_CONFIG.socketServers,function(e){o.push(e)})),void 0!==NODE_CONFIG.webSocketServers&&(t=[],i=0,EACH(NODE_CONFIG.webSocketServers,function(e){t.push(e)})),INIT_OBJECTS(),FOR_BOX(function(e){void 0!==e.MAIN&&e.MAIN()}),(void 0!==CONFIG.webServerPort||void 0!==CONFIG.sercuredWebServerPort)&&(loadJSForNode(__dirname+"/UPPERCASE.IO-UPLOAD/NODE.js"),a=RESOURCE_SERVER({port:CONFIG.webServerPort,securedPort:CONFIG.sercuredWebServerPort,securedKeyFilePath:rootPath+"/"+NODE_CONFIG.securedKeyFilePath,securedCertFilePath:rootPath+"/"+NODE_CONFIG.securedCertFilePath,noParsingNativeReqURIs:["__UPLOAD"],rootPath:rootPath,version:version},{requestListener:function(a,O,d,C,S){var _,c,E,N=a.uri,l=(a.method,a.headers),F=a.params,I=function(e){return void 0!==F.callback?F.callback+"('"+e+"')":e};if("__SCRIPT"===N)return O(CONFIG.isDevMode!==!0&&l["if-none-match"]===version?{statusCode:304}:CONFIG.isDevMode!==!0&&F.version!==version?{statusCode:302,headers:{Location:"/__SCRIPT?version="+version}}:{contentType:"text/javascript",content:browserScript,version:version}),!1;if("__CSS"===N)C(__dirname),a.uri="INIT_STYLE.css";else{if("__UPLOAD_SERVER_HOST"===N)return void 0===e?O({content:I(F.defaultHost)}):(O({content:I(e[n])}),n+=1,n===e.length&&(n=0)),!1;if("__UPLOAD"===N)return UPLOAD_REQUEST({requestInfo:a,uploadPath:rootPath+"/__RF/__TEMP"},{overFileSize:function(){O({statusCode:302,headers:{Location:F.callbackURL+"?maxUploadFileMB="+NODE_CONFIG.maxUploadFileMB}})},success:function(e){var o,t=F.boxName,n=BOX.getBoxes()[void 0===t?CONFIG.defaultBoxName:t];void 0!==n&&(o=n.DB("__UPLOAD_FILE"),NEXT(e,[function(e,n){var r=e.path;delete e.path,e.serverName=NODE_CONFIG.thisServerName,e.downloadCount=0,o.create(e,function(e){MOVE_FILE({from:r,to:rootPath+"/__RF/"+t+"/"+e.id},n)})},function(){return function(){O({statusCode:302,headers:{Location:F.callbackURL+"?fileDataSetStr="+encodeURIComponent(STRINGIFY(e))}})}}]))}}),!1;if("__RF/"===N.substring(0,5))return N=N.substring(5),E=N.indexOf("/"),-1!==E&&(_=N.substring(0,E),"UPPERCASE.IO"===_||void 0!==BOX.getBoxes()[_]?N=N.substring(E+1):_=CONFIG.defaultBoxName,c=BOX.getBoxes()[_].DB("__UPLOAD_FILE"),c.get(-1===N.lastIndexOf("/")?N:N.substring(N.lastIndexOf("/")+1),{error:function(){S({isFinal:!0})},notExists:function(){S({isFinal:!0})},success:function(e){e.serverName===NODE_CONFIG.thisServerName?(S({contentType:e.type,headers:{"Content-Disposition":'attachment; filename="'+e.name+'"',"Access-Control-Allow-Origin":"*"},isFinal:!0}),c.update({id:e.id,$inc:{downloadCount:1}})):O({statusCode:302,headers:{Location:"http://"+NODE_CONFIG.uploadServers[e.serverName]+":"+CONFIG.webServerPort+"/__RF/"+_+"/"+N}})}})),!1;if("__UPLOAD_CALLBACK"===N)return O(void 0!==F.maxUploadFileMB?{content:"<script>maxUploadFileMB="+F.maxUploadFileMB+"</script>"}:{content:"<script>fileDataSetStr='"+F.fileDataSetStr+"'</script>"}),!1;if("__SOCKET_SERVER_HOST"===N)return void 0===o?O({content:I(F.defaultHost)}):(O({content:I(o[r])}),r+=1,r===o.length&&(r=0)),!1;if("__WEB_SOCKET_SERVER_HOST"===N)return void 0===t?O({content:I(F.defaultHost)}):(O({content:I(t[i])}),i+=1,i===t.length&&(i=0)),!1;if("__WEB_SOCKET_FIX"===N)return s(a,{response:O,onDisconnected:d}),!1;E=N.indexOf("/"),-1===E?_=CONFIG.defaultBoxName:(_=N.substring(0,E),void 0!==BOX.getBoxes()[_]||"UPPERCASE.IO-TRANSPORT"===_||"UPPERCASE.JS-BROWSER-FIX"===_?N=N.substring(E+1):_=CONFIG.defaultBoxName),"UPPERCASE.IO-TRANSPORT"===_?(C(__dirname+"/UPPERCASE.IO-TRANSPORT/R"),a.uri=N):"UPPERCASE.JS-BROWSER-FIX"===_?(C(__dirname+"/UPPERCASE.JS-BROWSER-FIX"),a.uri=N):a.uri=CHECK_IS_IN({array:boxNamesInBOXFolder,value:_})===!0?"BOX/"+_+"/R"+(""===N?"":"/"+N):_+"/R"+(""===N?"":"/"+N)}},notExistsResource:function(e,o,t){(o.uri===CONFIG.defaultBoxName+"/R"||o.uri==="BOX/"+CONFIG.defaultBoxName+"/R")&&t({contentType:"text/html",content:indexPageContent})}}),s=LAUNCH_ROOM_SERVER({socketServerPort:CONFIG.socketServerPort,webServer:a,isCreateWebSocketFixRequestManager:!0}).getWebSocketFixRequest()),console.log("[UPPERCASE.IO] <"+O.getYear()+"-"+O.getMonth()+"-"+O.getDate()+" "+O.getHour()+":"+O.getMinute()+":"+O.getSecond()+"> `"+CONFIG.defaultTitle+"` WORKER #"+CPU_CLUSTERING.getWorkerId()+" BOOTed!"+(void 0===CONFIG.webServerPort?"":" => http://localhost:"+CONFIG.webServerPort)+(void 0===CONFIG.securedWebServerPort?"":" => https://localhost:"+CONFIG.securedWebServerPort))},loadUJS(),configuration(),initBoxes(),loadJSForCommon(__dirname+"/UPPERCASE.IO-BOOT/COMMON.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-BOOT/CLIENT.js"),loadJSForClient(__dirname+"/UPPERCASE.IO-BOOT/BROWSER.js"),loadJSForNode(__dirname+"/UPPERCASE.IO-UTIL/NODE.js"),clustering(function(){initDatabase(),initModelSystem(),loadAllScripts(),CONFIG.isDevMode!==!0&&(browserScript=MINIFY_JS(browserScript)),generateIndexPage(),run()})};