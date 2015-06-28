FOR_BOX(function(o){"use strict";o.MODEL=CLASS(function(e){var t,i={},n=0;return e.getOnNewInfos=t=function(){return i},{init:function(e,t,r){var a,c,d,v,u,s,E,m,O,f,A,C,l,N,R,T,g,S,h,D,I,x,M,P,H,U,L,_,p=r.roomServerName,b=r.name,k=r.initData,B=r.methodConfig,V=(r.isNotUsingObjectId,o.ROOM({roomServerName:p,name:b}));void 0!==B&&(a=B.create,c=B.get,d=B.update,v=B.remove,u=B.find,s=B.count,E=B.checkIsExists,void 0!==a&&(m=a.valid),void 0!==d&&(O=d.valid)),t.getName=f=function(){return b},t.getInitData=A=function(){return k},t.getCreateValid=C=function(){return m},t.getUpdateValid=l=function(){return O},t.getRoom=N=function(){return V},a!==!1&&(t.create=R=function(e,t){var i,n,r,a,c;void 0!==t&&(CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notValid,r=t.notAuthed,a=t.error)),void 0!==k&&EACH(k,function(o,t){e[t]=o}),void 0!==m&&(c=m.check(e)),void 0!==c&&c.checkHasError()===!0?void 0!==n?n(c.getErrors()):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/create` NOT VALID!: ",c.getErrors()):V.send({methodName:"create",data:e},function(e){var t,c,d,v;void 0!==e?(t=e.errorMsg,c=e.validErrors,d=e.isNotAuthed,v=e.savedData,void 0!==t?void 0!==a?a(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/create` ERROR: "+t):void 0!==c?void 0!==n?n(c):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/create` NOT VALID!: ",c):d===!0?void 0!==r?r():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/create` NOT AUTHED!"):void 0!==i&&i(v)):void 0!==i&&i()})}),c!==!1&&(t.get=T=function(e,t){var i,n,r,a;CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notExists,r=t.notAuthed,a=t.error),V.send({methodName:"get",data:e},function(e){var t,c,d;void 0!==e&&(t=e.errorMsg,c=e.isNotAuthed,d=e.savedData),void 0!==t?void 0!==a?a(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/get` ERROR: "+t):c===!0?void 0!==r?r():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/get` NOT AUTHED!"):void 0===d?void 0!==n?n():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/get` NOT EXISTS!"):void 0!==i&&i(d)})},t.getWatching=g=function(e,i){var n,r,a,c,d,v;return CHECK_IS_DATA(i)!==!0?n=i:(n=i.success,r=i.notExists,a=i.notAuthed,c=i.error),t.get(e,{success:function(e){var t;d!==!0&&void 0!==n&&(v=o.ROOM({roomServerName:p,name:b+"/"+e.id}),n(e,function(o){v.on("update",o)},function(o){v.on("remove",function(e){o(e),t()})},t=function(){void 0!==v&&(v.exit(),v=void 0)}))},notExists:r,notAuthed:a,error:c}),OBJECT({init:function(o,e){var t;e.exit=t=function(){void 0!==v&&v.exit(),d=!0}}})}),d!==!1&&(t.update=S=function(e,t){var i,n,r,a,c,d,v,u,s,E,m=e.id,f=e.$inc,A=e.$push,C=e.$pull;void 0!==t&&(CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notValid,r=t.notExists,a=t.notAuthed,c=t.error)),void 0!==O&&(d=O.checkForUpdate(e),void 0!==f&&(v=O.checkForUpdate(f)),void 0!==A&&(u=O.checkForUpdate(RUN(function(){var o={};return EACH(A,function(e,t){o[t]=[e]}),o}))),void 0!==C&&(s=O.checkForUpdate(RUN(function(){var o={};return EACH(C,function(e,t){o[t]=[e]}),o})))),e.id=m,e.$inc=f,e.$push=A,e.$pull=C,void 0!==O&&(d.checkHasError()===!0||void 0!==v&&v.checkHasError()===!0||void 0!==u&&u.checkHasError()===!0||void 0!==s&&s.checkHasError()===!0)?(E=COMBINE([d.getErrors(),void 0===v?{}:v.getErrors(),void 0===u?{}:u.getErrors(),void 0===s?{}:s.getErrors()]),void 0!==n?n(E):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/update` NOT VALID!: ",E)):V.send({methodName:"update",data:e},function(e){var t,d,v,u,s;void 0!==e&&(t=e.errorMsg,d=e.validErrors,v=e.isNotAuthed,u=e.savedData,s=e.originData),void 0!==t?void 0!==c?c(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/update` ERROR: "+t):void 0!==d?void 0!==n?n(d):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/update` NOT VALID!: ",d):v===!0?void 0!==a?a():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/update` NOT AUTHED!"):void 0===u?void 0!==r?r():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/update` NOT EXISTS!"):void 0!==i&&i(u,s)})}),v!==!1&&(t.remove=h=function(e,t){var i,n,r,a;void 0!==t&&(CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notExists,r=t.notAuthed,a=t.error)),V.send({methodName:"remove",data:e},function(e){var t,c,d;void 0!==e&&(t=e.errorMsg,c=e.isNotAuthed,d=e.originData),void 0!==t?void 0!==a?a(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/remove` ERROR: "+t):c===!0?void 0!==r?r():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/remove` NOT AUTHED!"):void 0===d?void 0!==n?n():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/remove` NOT EXISTS!"):void 0!==i&&i(d)})}),u!==!1&&(t.find=D=function(e,t){var i,n,r;void 0===t&&(t=e,e=void 0),CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notAuthed,r=t.error),V.send({methodName:"find",data:e},function(e){var t=e.errorMsg,a=e.isNotAuthed,c=e.savedDataSet;void 0!==t?void 0!==r?r(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/find` ERROR: "+t):a===!0?void 0!==n?n():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/find` NOT AUTHED!"):void 0!==i&&i(c)})},t.findWatching=I=function(e,i){var n,r,a,c,d={};return void 0===i&&(i=e,e=void 0),CHECK_IS_DATA(i)!==!0?n=i:(n=i.success,r=i.notAuthed,a=i.error),t.find(e,{success:function(e){var t;c!==!0&&void 0!==n&&(EACH(e,function(e){var t=e.id;d[t]=o.ROOM({roomServerName:p,name:b+"/"+t})}),n(e,function(o,e){d[o].on("update",e)},function(o,e){d[o].on("remove",function(i){e(i),t(o)})},t=function(o){void 0!==d[o]&&(d[o].exit(),delete d[o])}))},notAuthed:r,error:a}),OBJECT({init:function(o,e){var t;e.exit=t=function(){EACH(d,function(o){o.exit()}),c=!0}}})}),s!==!1&&(t.count=x=function(e,t){var i,n,r;void 0===t&&(t=e,e=void 0),CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notAuthed,r=t.error),V.send({methodName:"count",data:e},function(e){var t=e.errorMsg,a=e.isNotAuthed,c=e.count;void 0!==t?void 0!==r?r(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/count` ERROR: "+t):a===!0?void 0!==n?n():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/count` NOT AUTHED!"):void 0!==i&&i(c)})}),E!==!1&&(t.checkIsExists=M=function(e,t){var i,n,r;void 0===t&&(t=e,e=void 0),CHECK_IS_DATA(t)!==!0?i=t:(i=t.success,n=t.notAuthed,r=t.error),V.send({methodName:"checkIsExists",data:e},function(e){var t=e.errorMsg,a=e.isNotAuthed,c=e.isExists;void 0!==t?void 0!==r?r(t):console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/checkIsExists` ERROR: "+t):a===!0?void 0!==n?n():console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+b+"/checkIsExists` NOT AUTHED!"):void 0!==i&&i(c)})}),t.onNew=P=function(e,t){var r,a=n;return n+=1,void 0===t?(t=e,e=void 0,(r=o.ROOM({roomServerName:p,name:b+"/create"})).on("create",function(o){i[a].lastCreateTime=o.createTime,t(o)})):void 0===e?(r=o.ROOM({roomServerName:p,name:b+"/create"})).on("create",function(o){i[a].lastCreateTime=o.createTime,t(o)}):EACH(e,function(n,c){return(r=o.ROOM({roomServerName:p,name:b+"/"+c+"/"+n+"/create"})).on("create",function(o){EACH(e,function(e,t){return o[t]!==e?!1:void 0})===!0&&(i[a].lastCreateTime=o.createTime,t(o))}),!1}),i[a]={findMissingDataSet:function(){void 0!==i[a].lastCreateTime&&void 0!==D&&D({filter:void 0!==e?COMBINE([e,{createTime:{$gt:i[a].lastCreateTime}}]):{createTime:{$gt:i[a].lastCreateTime}}},REVERSE_EACH(t))}},OBJECT({init:function(o,e){var t;e.exit=t=function(){delete i[a],void 0!==r&&r.exit()}}})},t.onNewWatching=H=function(e,t){var r,a=n,c=[],d=function(e){var i,n,r=e.id;c.push(i=o.ROOM({roomServerName:p,name:b+"/"+r})),t(e,function(o){i.on("update",o)},function(o){i.on("remove",function(e){o(e),n()})},n=function(){i.exit(),REMOVE({array:c,value:i})})};return n+=1,void 0===t?(t=e,e=void 0,(r=o.ROOM({roomServerName:p,name:b+"/create"})).on("create",function(o){i[a].lastCreateTime=o.createTime,d(o)})):void 0===e?(r=o.ROOM({roomServerName:p,name:b+"/create"})).on("create",function(o){i[a].lastCreateTime=o.createTime,d(o)}):EACH(e,function(t,n){return(r=o.ROOM({roomServerName:p,name:b+"/"+n+"/"+t+"/create"})).on("create",function(o){EACH(e,function(e,t){return o[t]!==e?!1:void 0})===!0&&(i[a].lastCreateTime=o.createTime,d(o))}),!1}),i[a]={findMissingDataSet:function(){void 0!==i[a].lastCreateTime&&void 0!==D&&D({filter:void 0!==e?COMBINE([e,{createTime:{$gt:i[a].lastCreateTime}}]):{createTime:{$gt:i[a].lastCreateTime}}},REVERSE_EACH(d))}},OBJECT({init:function(o,e){var t;e.exit=t=function(){delete i[a],void 0!==r&&r.exit(),EACH(c,function(o){o.exit()})}}})},u!==!1&&(t.onNewAndFind=U=function(o,e){var t,i,n,r,a,c,d,v,u,s;return void 0===e&&(e=o,o=void 0),void 0!==o&&(t=o.properties,i=o.filter,n=o.sort,r=o.start,a=o.count),CHECK_IS_DATA(e)!==!0?d=e:(d=e.handler,v=e.success,u=e.notAuthed,s=e.error),void 0!==i||void 0!==n||void 0!==r&&0!==r||(c=P(t,d)),D({filter:COMBINE([t,i]),sort:n,start:r,count:a},{success:function(o){void 0!==v&&v(o),REVERSE_EACH(o,d)},notAuthed:u,error:s}),OBJECT({init:function(o,e){var t;e.exit=t=function(){void 0!==c&&c.exit()}}})},t.onNewAndFindWatching=L=function(o,e){var t,i,n,r,a,c,d,v,u,s,E;return void 0===e&&(e=o,o=void 0),void 0!==o&&(t=o.properties,i=o.filter,n=o.sort,r=o.start,a=o.count),CHECK_IS_DATA(e)!==!0?v=e:(v=e.handler,u=e.success,s=e.notAuthed,E=e.error),void 0!==i||void 0!==n||void 0!==r&&0!==r||(c=H(t,v)),d=I({filter:COMBINE([t,i]),sort:n,start:r,count:a},{success:function(o,e,t){void 0!==u&&u(o,e,t),REVERSE_EACH(o,function(o){v(o,function(t){e(o.id,t)},function(e){t(o.id,e)})})},notAuthed:s,error:E}),OBJECT({init:function(o,e){var t;e.exit=t=function(){void 0!==c&&c.exit(),d.exit()}}})}),t.onRemove=_=function(e,t){var i;return void 0===t?(t=e,(i=o.ROOM({roomServerName:p,name:b+"/remove"})).on("remove",t)):EACH(e,function(n,r){return(i=o.ROOM({roomServerName:p,name:b+"/"+r+"/"+n+"/remove"})).on("remove",function(o){EACH(e,function(e,t){return o[t]!==e?!1:void 0})===!0&&t(o)}),!1}),OBJECT({init:function(o,e){var t;e.exit=t=function(){void 0!==i&&i.exit()}}})}}}})});