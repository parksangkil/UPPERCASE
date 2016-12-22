global.CONFIG={isDevMode:!1};global.METHOD=function(n){"use strict";var t,i,o=function(n,t){if(void 0!==i)return i(n,t)};return o.type=METHOD,t="function"==typeof n?n(o):n,void 0!==t&&(i=t.run),o};global.TO_DELETE=null;global.BOX=METHOD(function(n){"use strict";var t,o={};return n.getAllBoxes=t=function(){return o},{run:function(n){var t=function(n){var o,r=n.split(".");return EACH(r,function(n){void 0===o?(void 0===t[n]&&(t[n]={}),o=t[n]):(void 0===o[n]&&(o[n]={}),o=o[n])}),o};return t.type=BOX,t.boxName=n,global[n]=o[n]=t,void 0===CONFIG[n]&&(CONFIG[n]={}),FOR_BOX.inject(t),t}}});global.FOR_BOX=METHOD(function(n){"use strict";var t,u=[];return n.inject=t=function(n){EACH(u,function(t){t(n)})},{run:function(n){EACH(BOX.getAllBoxes(),function(t){n(t)}),u.push(n)}}});global.CLASS=METHOD(function(n){"use strict";var t,i=0;return n.getNextInstanceId=t=function(){return i+=1,i-1},{run:function(n){var i,r,e,o,u,f,v,c;return f=function(n,i){var r={},e={type:f,id:t(),checkIsInstanceOf:function(n){for(var t=f;void 0!==t;){if(t===n)return!0;t=t.mom}return!1}};return n=v(r,e,n,i),c(r,e,n,i),e},i="function"==typeof n?n(f):n,void 0!==i&&(r=i.preset,e=i.init,o=i.params,u=i.afterInit),f.type=CLASS,f.innerInit=v=function(n,t,i,u){var v,c,d,A=function(n,t){EACH(t,function(t,i){void 0===n[i]?n[i]=t:CHECK_IS_DATA(n[i])===!0&&CHECK_IS_DATA(t)===!0&&A(n[i],t)})};return void 0!==o&&(void 0===i?i=o(f):CHECK_IS_DATA(i)===!0?(c=o(f),void 0!==c&&A(i,c)):(d=i,i=o(f))),void 0!==r&&(v=r(i,u),void 0!==v&&(f.mom=v,v.type===CLASS?v.innerInit(n,t,i,u):v.type.innerInit(n,t,i,u))),void 0!==e&&e(n,t,void 0===d?i:d,u),i},f.innerAfterInit=c=function(n,t,i,r){var e=f.mom;void 0!==e&&(e.type===CLASS?e.innerAfterInit(n,t,i,r):e.type.innerAfterInit(n,t,i,r)),void 0!==u&&u(n,t,i,r)},f}}});global.INIT_OBJECTS=METHOD({run:function(){"use strict";OBJECT.initObjects()}});global.OBJECT=METHOD(function(n){"use strict";var t,e,r,i,u=[],c=!1;return t=function(n){var t=n.type,e={},r={};n.id=CLASS.getNextInstanceId(),t.innerInit(e,n,r),t.innerAfterInit(e,n,r)},e=function(n){c===!0?t(n):u.push(n)},n.removeReadyObject=r=function(n){REMOVE({array:u,value:n})},n.initObjects=i=function(){EACH(u,function(n){t(n)}),c=!0},{run:function(n){var t=CLASS(n),r={type:t,checkIsInstanceOf:function(n){for(var e=t;void 0!==e;){if(e===n)return!0;e=e.mom}return!1}};return e(r),r}}});global.CHECK_IS_ARGUMENTS=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&"object"==typeof t&&("[object Arguments]"===Object.prototype.toString.call(t)||void 0!==t.callee&&"function"==typeof t.callee)}});global.NEXT=METHOD({run:function(n,i){"use strict";var o,t,v;void 0===i&&(i=n,n=void 0),void 0!==n&&(CHECK_IS_ARRAY(n)!==!0?o=n:t=n),REPEAT({start:i.length-1,end:0},function(n){var u;0!==n&&void 0===v?v=i[n]():n>0?(u=v,v=i[n](u),v.next=u):(u=v,void 0===u&&(u=function(){}),v=i[n],void 0!==o?RUN(function(){var n=-1;RUN(function(i){n+=1,n+1<o?v(n,i):v(n,u)})}):void 0!==t?RUN(function(){var n=t.length,i=-1;0===n?u():RUN(function(o){i+=1,i+1<n?(t.length===n-1&&(i-=1,n-=1),v(t[i],o,i)):v(t[i],u,i)})}):v(u))})}});global.OVERRIDE=METHOD({run:function(e,t){"use strict";void 0!==e.type&&e.type.type===CLASS&&OBJECT.removeReadyObject(e),t(e)}});global.PARALLEL=METHOD({run:function(n,t){"use strict";var i,o=0;void 0===t?(t=n,RUN(function(){var n=t.length-1;EACH(t,function(i,u){u<n&&i(function(){o+=1,o===n&&t[n]()})})})):void 0===n?t[1]():CHECK_IS_DATA(n)===!0?(i=COUNT_PROPERTIES(n),0===i?t[1]():EACH(n,function(n,u){t[0](n,function(){o+=1,o===i&&t[1]()},u)})):CHECK_IS_ARRAY(n)===!0?0===n.length?t[1]():EACH(n,function(i,u){t[0](i,function(){o+=1,o===n.length&&t[1]()},u)}):0===n?t[1]():REPEAT(n,function(i){t[0](i,function(){o+=1,o===n&&t[1]()})})}});global.PARSE_STR=METHOD({run:function(r){"use strict";var t;try{return t=JSON.parse(r),CHECK_IS_DATA(t)===!0?UNPACK_DATA(t):t}catch(r){return}}});global.RANDOM_STR=METHOD({run:function(t){"use strict";var n="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return REPEAT(t,function(){n+=r.charAt(RANDOM({limit:r.length}))}),n}});global.STRINGIFY=METHOD({run:function(n){"use strict";return JSON.stringify(CHECK_IS_DATA(n)===!0?PACK_DATA(n):n)}});global.TEST=METHOD(function(n){"use strict";var t=0;return{run:function(n,r){r(function(r){var o,R={};r===!0?console.log("["+n+" 테스트] 테스트를 통과하였습니다. 총 "+t+"개의 오류가 있습니다."):(R.__THROW_ERROR_$$$=function(){try{throw Error()}catch(n){return n}},o=R.__THROW_ERROR_$$$().stack,void 0!==o&&(o=o.substring(o.indexOf("__THROW_ERROR_$$$")),o=o.split("\n")[2],o=o.substring(o.indexOf("at "))),t+=1,console.log("["+n+" 테스트] "+o+"에서 오류가 발견되었습니다. 총 "+t+"개의 오류가 있습니다."))})}}});global.URI_MATCHER=CLASS({init:function(n,t,r){"use strict";var i,e=CLASS({init:function(n,t,i){var e,u,c,f=i.split("/"),o={},a=function(n){var t=n.split("/");return EACH(f,function(n,r){var i=t[r];if("**"===i)return e=!0,!1;if(void 0===i)return!1;if(""!==n&&"{"===i.charAt(0)&&"}"===i.charAt(i.length-1))o[i.substring(1,i.length-1)]=n;else if("*"!==i&&i!==n)return!1;return!(r===f.length-1&&r<t.length-1&&""!==t[t.length-1])&&void 0})===!0||e===!0};e=CHECK_IS_ARRAY(r)===!0?EACH(r,function(n){return a(n)!==!0})!==!0:a(r),t.checkIsMatched=u=function(){return e},t.getURIParams=c=function(){return o}}});t.check=i=function(n){return e(n)}}});global.VALID=CLASS(function(a){"use strict";var t,r,e,n,i,u,o,f,c,l,v,d,s,E,m,h,A,g,p,T,y;return a.notEmpty=t=function(a){var t=void 0===a||a===TO_DELETE?"":String(a);return CHECK_IS_ARRAY(a)===!0||""!==t.trim()},a.regex=r=function(a){var t=String(a.value),r=a.pattern;return t===t.match(r)[0]},a.size=e=function(a){var t=String(a.value),r=a.min,e=a.max;return void 0===r&&(r=0),r<=t.trim().length&&(void 0===e||t.length<=e)},a.integer=n=function(a){var r=String(a);return t(r)===!0&&r.match(/^(?:-?(?:0|[1-9][0-9]*))$/)!==TO_DELETE},a.real=i=function(a){var r=String(a);return t(r)===!0&&r.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)!==TO_DELETE},a.bool=u=function(a){var t=String(a);return"true"===t||"false"===t},a.date=o=function(a){var t=String(a),r=Date.parse(t);return isNaN(r)===!1},a.min=f=function(a){var t=a.value,r=a.min;return i(t)===!0&&r<=t},a.max=c=function(a){var t=a.value,r=a.max;return i(t)===!0&&r>=t},a.email=l=function(a){return"string"==typeof a&&t(a)===!0&&a.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)!==TO_DELETE},a.png=v=function(a){return"string"==typeof a&&t(a)===!0&&a.match(/^data:image\/png;base64,/)!==TO_DELETE},a.url=d=function(a){return"string"==typeof a&&t(a)===!0&&a.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i)!==TO_DELETE&&a.length<=2083},a.username=s=function(a){return"string"==typeof a&&t(a)===!0&&a.match(/^[_a-zA-Z0-9\-]+$/)!==TO_DELETE},a.id=E=function(a){return"string"==typeof a&&t(a)===!0&&a.match(/[0-9a-f]{24}/)!==TO_DELETE&&24===a.length},a.one=m=function(a){var t=a.value,r=a.array;return EACH(r,function(a){if(t===a)return!1})===!1},a.array=h=function(a){return CHECK_IS_ARRAY(a)===!0},a.data=A=function(a){return CHECK_IS_DATA(a)===!0},a.element=g=function(a){var t=a.array,r=VALID({_:a.validData}),e=a.isToWash;return EACH(t,function(a){if((e===!0?r.checkAndWash:r.check)({_:a}).checkHasError()===!0)return!1})===!0},a.property=p=function(a){var t=a.data,r=VALID({_:a.validData}),e=a.isToWash;return EACH(t,function(a){if((e===!0?r.checkAndWash:r.check)({_:a}).checkHasError()===!0)return!1})===!0},a.detail=T=function(a){var t=a.data,r=VALID(a.validDataSet),e=a.isToWash;return(e===!0?r.checkAndWash:r.check)(t).checkHasError()!==!0},a.equal=y=function(a){var t=a.value,r=String(t),e=a.validValue,n=String(e);return r===n},{init:function(r,e,n){var i,u,o,f,c=CLASS({init:function(r,e,i){var u,o,f=i.data,c=i.isToWash,l=i.isForUpdate,v=!1,d={};EACH(n,function(r,e){r!==!0&&EACH(r,function(r,n){var i=f[e];if(l===!0&&void 0===i)return!1;if(c===!0&&"notEmpty"!==n&&t(i)!==!0)return f[e]=l===!0?TO_DELETE:void 0,!0;if("one"===n){if(m({array:r,value:i})===!1)return v=!0,d[e]={type:n,array:r,value:i},!1}else if("element"===n){if(g({validData:r,array:i,isToWash:c})===!1)return v=!0,d[e]={type:n,validData:r,array:i},!1}else if("property"===n){if(p({validData:r,data:i,isToWash:c})===!1)return v=!0,d[e]={type:n,validData:r,data:i},!1}else if("detail"===n){if(T({validDataSet:r,data:i,isToWash:c})===!1)return v=!0,d[e]={type:n,validDataSet:r,data:i},!1}else if("size"===n){if(a[n](CHECK_IS_DATA(r)===!0?COMBINE([r,{value:i}]):COMBINE([{min:r,max:r},{value:i}]))===!1)return v=!0,d[e]={type:n,validParams:r,value:i},!1}else if("regex"===n){if(a[n]({pattern:r,value:i})===!1)return v=!0,d[e]={type:n,validParam:r,value:i},!1}else if("min"===n){if(a[n]({min:r,value:i})===!1)return v=!0,d[e]={type:n,validParam:r,value:i},!1}else if("max"===n){if(a[n]({max:r,value:i})===!1)return v=!0,d[e]={type:n,validParam:r,value:i},!1}else if("equal"===n){if(a[n]({value:i,validValue:r})===!1)return v=!0,d[e]={type:n,validParam:r,value:i},!1}else if(r===!0&&a[n](i)===!1)return v=!0,d[e]={type:n,value:i},!1;t(i)===!0&&"string"==typeof i&&("integer"===n?f[e]=INTEGER(i):"real"===n?f[e]=REAL(i):"bool"===n?f[e]="true"===i:"date"===n?f[e]=new Date(i):"username"===n&&(f[e]=i.toLowerCase()))})}),c===!0&&EACH(f,function(a,t){void 0===n[t]&&delete f[t]}),e.checkHasError=u=function(){return v},e.getErrors=o=function(){return d}}});e.check=i=function(a){return c({data:a})},e.checkAndWash=u=function(a){return c({data:a,isToWash:!0})},e.checkForUpdate=o=function(a){return c({data:a,isToWash:!0,isForUpdate:!0})},e.getValidDataSet=f=function(){return n}}}});global.CHECK_ARE_SAME=METHOD({run:function(n){"use strict";var t=!1,e=function(n,t){return n instanceof Date==!0&&t instanceof Date==!0?n.getTime()===t.getTime():n instanceof RegExp==!0&&t instanceof RegExp==!0?n.toString()===t.toString():CHECK_IS_DATA(n)===!0&&CHECK_IS_DATA(t)===!0?EACH(n,function(n,r){return e(n,t[r])}):CHECK_IS_ARRAY(n)===!0&&CHECK_IS_ARRAY(t)===!0?EACH(n,function(n,r){return e(n,t[r])}):n===t};return n.length>1&&(t=REPEAT(n.length,function(t){return t<n.length-1?e(n[t],n[t+1]):e(n[t],n[0])})),t}});global.CHECK_IS_ARRAY=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&"object"==typeof t&&"[object Array]"===Object.prototype.toString.call(t)}});global.CHECK_IS_DATA=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&CHECK_IS_ARGUMENTS(t)!==!0&&CHECK_IS_ARRAY(t)!==!0&&t instanceof Date!=!0&&t instanceof RegExp!=!0&&"object"==typeof t}});global.CHECK_IS_EMPTY_DATA=METHOD({run:function(E){"use strict";return CHECK_ARE_SAME([E,{}])}});global.COUNT_PROPERTIES=METHOD({run:function(n){"use strict";var r=0;return EACH(n,function(){r+=1}),r}});global.PACK_DATA=METHOD({run:function(A){"use strict";var n=COPY(A),_=[],t=[];return EACH(n,function(A,C){A instanceof Date==!0?(n[C]=INTEGER(A.getTime()),_.push(C)):A instanceof RegExp==!0?(n[C]=A.toString(),t.push(C)):CHECK_IS_DATA(A)===!0?n[C]=PACK_DATA(A):CHECK_IS_ARRAY(A)===!0&&EACH(A,function(n,_){CHECK_IS_DATA(n)===!0&&(A[_]=PACK_DATA(n))})}),n.__D=_,n.__R=t,n}});global.UNPACK_DATA=METHOD({run:function(_){"use strict";var A=COPY(_);return void 0!==A.__D&&(EACH(A.__D,function(_,n){A[_]=new Date(A[_])}),delete A.__D),void 0!==A.__R&&(EACH(A.__R,function(_,n){var e,t,C=A[_];for(t=C.length-1;t>=0;t-=1)if("/"===C[t]){e=C.substring(t+1),C=C.substring(1,t);break}A[_]=new RegExp(C,e)}),delete A.__R),EACH(A,function(_,n){CHECK_IS_DATA(_)===!0?A[n]=UNPACK_DATA(_):CHECK_IS_ARRAY(_)===!0&&EACH(_,function(A,n){CHECK_IS_DATA(A)===!0&&(_[n]=UNPACK_DATA(A))})}),A}});global.CHECK_IS_IN=METHOD({run:function(r){"use strict";var n=r.data,E=r.array,i=r.value;return void 0!==n?EACH(n,function(r,n){if(CHECK_ARE_SAME([r,i])===!0)return!1})!==!0:void 0!==E?EACH(E,function(r,n){if(CHECK_ARE_SAME([r,i])===!0)return!1})!==!0:void 0}});global.COMBINE=METHOD({run:function(n){"use strict";var E,t;return n.length>0&&(E=n[0],CHECK_IS_DATA(E)===!0?(t={},EACH(n,function(n){EXTEND({origin:t,extend:n})})):CHECK_IS_ARRAY(E)===!0&&(t=[],EACH(n,function(n){EXTEND({origin:t,extend:n})}))),t}});global.COPY=METHOD({run:function(n){"use strict";var r;return CHECK_IS_DATA(n)===!0?(r={},EXTEND({origin:r,extend:n})):CHECK_IS_ARRAY(n)===!0&&(r=[],EXTEND({origin:r,extend:n})),r}});global.EXTEND=METHOD({run:function(e){"use strict";var n=e.origin,t=e.extend;return CHECK_IS_DATA(n)===!0?EACH(t,function(e,t){var i,s,r;if(e instanceof Date==!0)n[t]=new Date(e.getTime());else if(e instanceof RegExp==!0){for(i=e.toString(),r=i.length-1;r>=0;r-=1)if("/"===i[r]){s=i.substring(r+1),i=i.substring(1,r);break}n[t]=new RegExp(i,s)}else CHECK_IS_DATA(e)===!0||CHECK_IS_ARRAY(e)===!0?n[t]=COPY(e):n[t]=e}):CHECK_IS_ARRAY(n)===!0&&EACH(t,function(e){var t,i,s;if(e instanceof Date==!0)n.push(new Date(e.getTime()));else if(e instanceof RegExp==!0){for(t=e.toString(),s=t.length-1;s>=0;s-=1)if("/"===t[s]){i=t.substring(s+1),t=t.substring(1,s);break}n.push(new RegExp(t,i))}else CHECK_IS_DATA(e)===!0||CHECK_IS_ARRAY(e)===!0?n.push(COPY(e)):n.push(e)}),n}});global.FIND=METHOD({run:function(n,r){"use strict";var i,t,u,f;return void 0!==r?CHECK_IS_DATA(n)===!0?EACH(n,function(n,i){if(r(n,i)===!0)return f=n,!1}):CHECK_IS_ARRAY(n)===!0&&EACH(n,function(n,i){if(r(n,i)===!0)return f=n,!1}):(i=n.data,t=n.array,u=n.value,void 0!==i&&EACH(i,function(n,r){if(n===u)return f=r,!1}),void 0!==t&&EACH(t,function(n,r){if(n===u)return f=r,!1})),f}});global.REMOVE=METHOD({run:function(E,a){"use strict";var n,i,e,o,A;void 0!==a?CHECK_IS_DATA(E)===!0?EACH(E,function(n,i){a(n,i)===!0&&REMOVE({data:E,name:i})}):CHECK_IS_ARRAY(E)===!0&&EACH(E,function(n,i){a(n,i)===!0&&REMOVE({array:E,key:i})}):(n=E.data,i=E.array,e=E.name,o=E.key,A=E.value,void 0!==e&&delete n[e],void 0!==o&&i.splice(o,1),void 0!==A&&(void 0!==n&&EACH(n,function(E,a){CHECK_ARE_SAME([E,A])===!0&&REMOVE({data:n,name:a})}),void 0!==i&&EACH(i,function(E,a){CHECK_ARE_SAME([E,A])===!0&&REMOVE({array:i,key:a})})))}});global.CALENDAR=CLASS({init:function(t,e,n){"use strict";var r,u,o,g,a,i,c;void 0===n&&(n=new Date),e.getYear=r=function(){return n.getFullYear()},e.getMonth=u=function(t){var e=n.getMonth()+1;return t===!0?e<10?"0"+e:""+e:e},e.getDate=o=function(t){var e=n.getDate();return t===!0?e<10?"0"+e:""+e:e},e.getDay=g=function(){return n.getDay()},e.getHour=a=function(t){var e=n.getHours();return t===!0?e<10?"0"+e:""+e:e},e.getMinute=i=function(t){var e=n.getMinutes();return t===!0?e<10?"0"+e:""+e:e},e.getSecond=c=function(t){var e=n.getSeconds();return t===!0?e<10?"0"+e:""+e:e}}});global.CREATE_DATE=METHOD({run:function(e){"use strict";var o=e.year,t=e.month,i=e.date,d=e.hour,n=e.minute,v=e.second,r=CALENDAR(new Date);return void 0===o&&(o=r.getYear()),void 0===t&&(t=void 0===i?0:r.getMonth()),void 0===i&&(i=void 0===d?0:r.getDate()),void 0===d&&(d=void 0===n?0:r.getHour()),void 0===n&&(n=void 0===v?0:r.getMinute()),void 0===v&&(v=0),new Date(o,t-1,i,d,n,v)}});global.DELAY=CLASS({init:function(o,e,i,n){"use strict";var t,u,c,a,f,r,s=Date.now();void 0===n&&(n=i,i=0),u=t=1e3*i,e.resume=a=RAR(function(){void 0===c&&(c=setTimeout(function(){n()},u))}),e.pause=f=function(){u=t-(Date.now()-s),clearTimeout(c),c=void 0},e.remove=r=function(){f()}}});global.INTERVAL=CLASS({init:function(n,e,t,o){"use strict";var i,a,u,c,r,v,f=Date.now();void 0===o&&(o=t,t=0),a=i=0===t?1:1e3*t,e.resume=c=RAR(function(){void 0===u&&(u=setInterval(function(){o(e)===!1&&v(),f=Date.now()},a))}),e.pause=r=function(){a=i-(Date.now()-f),clearInterval(u),u=void 0},e.remove=v=function(){r()}}});global.LOOP=CLASS(function(n){"use strict";var i,t,e=[],a=[],o=function(){void 0===t&&(i=Date.now(),t=INTERVAL(function(){var n,t,o,r,u,f=Date.now(),m=f-i;if(m>0){for(r=0;r<e.length;r+=1)if(n=e[r],void 0!==n.fps&&n.fps>0){for(void 0===n.timeSigma&&(n.timeSigma=0,n.countSigma=0),t=parseInt(n.fps/(1e3/m)*(n.timeSigma/m+1),10)-n.countSigma,void 0!==n.start&&n.start(),o=n.interval,u=0;u<t;u+=1)o(n.fps);void 0!==n.end&&n.end(m),n.countSigma+=t,n.timeSigma+=m,n.timeSigma>1e3&&(n.timeSigma=void 0)}for(r=0;r<a.length;r+=1)a[r](m);i=f}}))},r=function(){e.length<=0&&a.length<=0&&(t.remove(),t=void 0)};return{init:function(n,i,t,u){var f,m,s,v,c,g,S,d,l;void 0!==u?(CHECK_IS_DATA(u)!==!0?s=u:(m=u.start,s=u.interval,v=u.end),i.resume=g=RAR(function(){e.push(c={fps:t,start:m,interval:s,end:v}),o()}),i.pause=S=function(){REMOVE({array:e,value:c}),r()},i.changeFPS=d=function(n){c.fps=n},i.remove=l=function(){S()}):(i.resume=g=RAR(function(){a.push(f=t),o()}),i.pause=S=function(){REMOVE({array:a,value:f}),r()},i.remove=l=function(){S()})}}});global.RAR=METHOD({run:function(i,n){"use strict";return void 0===n&&(n=i,i=void 0),n(i),n}});global.RUN=METHOD({run:function(n){"use strict";var r=function(){return n(r)};return r()}});global.INTEGER=METHOD({run:function(n){"use strict";return void 0===n?void 0:parseInt(n,10)}});global.RANDOM=METHOD({run:function(i){"use strict";var o,r,t;return CHECK_IS_DATA(i)!==!0?t=i:(o=i.min,r=i.max,t=i.limit),void 0===o&&(o=0),void 0!==t&&(r=t-1),Math.floor(Math.random()*(r-o+1)+o)}});global.REAL=METHOD({run:function(o){"use strict";return void 0===o?void 0:parseFloat(o)}});global.EACH=METHOD({run:function(r,n){"use strict";var t,e,i;if(void 0===r)return!1;if(CHECK_IS_DATA(r)===!0){for(e in r)if((void 0===r.hasOwnProperty||r.hasOwnProperty(e)===!0)&&n(r[e],e)===!1)return!1}else{if(void 0===n)return n=r,r=void 0,function(r){return EACH(r,n)};for(t=r.length,i=0;i<t;i+=1){if(n(r[i],i)===!1)return!1;r.length<t?(i-=t-r.length,t-=t-r.length):r.length>t&&(t+=r.length-t)}}return!0}});global.REPEAT=METHOD({run:function(i,r){"use strict";var o,t,e,n,f,d;if(void 0===r&&(r=i,i=void 0),void 0!==i&&(CHECK_IS_DATA(i)!==!0?o=i:(t=i.start,e=i.end,n=i.limit,f=i.step)),void 0===n&&void 0!==e&&(n=e+1),void 0===f&&(f=1),void 0!==o){for(d=0;d<parseInt(o,10);d+=1)if(r(d)===!1)return!1}else if(void 0!==e&&t>e){for(d=t;d>=e;d-=f)if(r(d)===!1)return!1}else{if(void 0===n)return function(i){return REPEAT(i,r)};for(d=t;d<n;d+=f)if(r(d)===!1)return!1}return!0}});global.REVERSE_EACH=METHOD({run:function(r,n){"use strict";var t,e;if(void 0===r)return!1;if(void 0===n)return n=r,r=void 0,function(r){return REVERSE_EACH(r,n)};for(t=r.length,e=t-1;e>=0;e-=1){if(n(r[e],e)===!1)return!1;r.length<t&&(e+=t-r.length)}return!0}});