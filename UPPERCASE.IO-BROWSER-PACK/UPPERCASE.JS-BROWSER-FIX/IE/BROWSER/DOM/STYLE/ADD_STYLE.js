OVERRIDE(ADD_STYLE,function(e){"use strict";global.ADD_STYLE=METHOD({run:function(r){var i=r.node,l=r.style,n=i.getWrapperEl();EACH(l,function(r,l){var o;if("onDisplayResize"===l)o={},o[l]=r,e({node:i,style:o});else try{if("flt"===l)n.style.styleFloat=r;else if(("backgroundImage"===l||"background"===l&&r.length>=7&&"url("===r.substring(0,4))&&IE.version<=6)DELAY(function(){"none"===n.style.display?i.__IS_KEEPED_PNG_FIX=!0:n.style.behavior="url("+BROWSER_CONFIG.fixScriptsFolderPath+"/IE/BROWSER/LIB/iepngfix/iepngfix.htc?"+(void 0!==CONFIG.version?CONFIG.version:Date.now())+");"});else if("display"===l&&"none"!==r)i.__IS_KEEPED_PNG_FIX===!0&&(n.style.behavior="url("+BROWSER_CONFIG.fixScriptsFolderPath+"/IE/BROWSER/LIB/iepngfix/iepngfix.htc?"+(void 0!==CONFIG.version?CONFIG.version:Date.now())+");",delete i.__IS_KEEPED_PNG_FIX);else if("backgroundSize"===l&&IE.version<=8)n.style.filter+=' progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+n.style.backgroundImage.replace('url("',"").replace('")',"").replace("url(","").replace(")","")+'",sizingMethod="scale");',n.style.backgroundImage="none";else if("cursor"===l&&"pointer"===r)n.style.cursor="hand";else if("filter"===l)return void(n.style.filter+=" "+r);o={},o[l]=r,e({node:i,style:o})}catch(s){}})}})});