FOR_BOX(function(o){"use strict";o.MODEL=CLASS({init:function(i,e,t){var n,d,r,v,a,c,u,s,f,E,A,O,h,m,C,l,g,M,R,N,H,x,D,_,I,S,T,p,V,K,P,k=t.name,L=t.config,U=o.ROOM(k),y={},b={},w=[],W=[],X={},B=function(i){console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+k+"` ERROR: "+i)},F=function(){console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+k+"` NOT EXISTS!")},j=function(i){console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+k+"` NOT VALID!: ",i)},q=function(){console.log("[UPPERCASE.IO-MODEL] `"+o.boxName+"."+k+"` NOT AUTHED!")};e.getName=h=function(){return k},void 0!==L&&(n=L.create,d=L.get,r=L.update,v=L.remove,a=L.find,c=L.count,u=L.checkIsExists,void 0!==n&&(s=n.valid,E=n.initData),void 0!==r&&(f=r.valid)),i.getCreateValid=m=function(){return s},i.getUpdateValid=C=function(){return f},i.initData=l=function(o){return void 0!==E&&E(o),o},e.getRoom=g=function(){return U},n!==!1&&(e.create=M=function(o,i){var e,t,n,d,r;void 0!==l&&l(o),void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notValid,n=i.notAuthed,d=i.error)),void 0!==s&&(r=s.check(o)),void 0!==r&&r.checkHasError()===!0?void 0!==t?t(r.getErrors()):j(r.getErrors()):U.send({methodName:"create",data:o},function(o){var i,r,v,a;void 0!==o?(i=o.errorMsg,r=o.validErrors,v=o.isNotAuthed,a=o.savedData,void 0!==i?(B(i),void 0!==d&&d(i)):void 0!==r?void 0!==t?t(r):j(r):v===!0?void 0!==n?n():q():void 0!==e&&e(a)):e()})}),d!==!1&&(e.get=R=function(o,i){var e,t,n,d;CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notExists,n=i.notAuthed,d=i.error),U.send({methodName:"get",data:o},function(o){var i,r,v;void 0!==o&&(i=o.errorMsg,r=o.isNotAuthed,v=o.savedData),void 0!==i?(B(i),void 0!==d&&d(i)):r===!0?void 0!==n?n():q():void 0===v?void 0!==t?t():F():void 0!==e&&e(v)})},e.getWatching=N=function(i,e){var t,n,d,r;CHECK_IS_DATA(e)!==!0?t=e:(t=e.success,n=e.notExists,d=e.notAuthed,r=e.error),R(i,{success:function(i){var e,n;void 0!==t&&(w.push(e=o.ROOM(k+"/"+i.id)),t(i,function(o){e.on("update",o)},function(o){e.on("remove",function(i){o(i),n()})},n=function(){REMOVE({array:w,value:e}),e.exit()}))},notExists:n,notAuthedHandler:d,errorHandler:r})}),r!==!1&&(e.update=H=function(o,i){var e,t,n,d,r,v;void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notValid,n=i.notExists,d=i.notAuthed,r=i.error)),void 0!==f&&(v=f.checkExceptUndefined(o)),void 0!==f&&v.checkHasError()===!0?void 0!==t?t(v.getErrors()):j(v.getErrors()):U.send({methodName:"update",data:o},function(o){var i,v,a,c;void 0!==o&&(i=o.errorMsg,v=o.validErrors,a=o.isNotAuthed,c=o.savedData),void 0!==i?(B(i),void 0!==r&&r(i)):void 0!==v?void 0!==t?t(v):j(v):a===!0?void 0!==d?d():q():void 0===c?void 0!==n?n():F():void 0!==e&&e(c)})}),v!==!1&&(e.remove=x=function(o,i){var e,t,n,d;void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notExists,n=i.notAuthed,d=i.error)),U.send({methodName:"remove",data:o},function(o){var i,r,v;void 0!==o&&(i=o.errorMsg,r=o.isNotAuthed,v=o.savedData),void 0!==i?(B(i),void 0!==d&&d(i)):r===!0?void 0!==n?n():q():void 0===v?void 0!==t?t():F():void 0!==e&&e(v)})}),a!==!1&&(e.find=D=function(o,i){var e,t,n;void 0===i&&(i=o,o=void 0),void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notAuthed,n=i.error)),U.send({methodName:"find",data:o},function(o){var i=o.errorMsg,d=o.isNotAuthed,r=o.savedDataSet;void 0!==i?(B(i),void 0!==n&&n(i)):d===!0?void 0!==t?t():q():void 0!==e&&e(r)})},e.findWatching=_=function(i,e){var t,n,d;void 0===e&&(e=i,i=void 0),void 0!==e&&(CHECK_IS_DATA(e)!==!0?t=e:(t=e.success,n=e.notAuthed,d=e.error)),D(i,{success:function(i){var e,n={};void 0!==t&&(EACH(i,function(i){var e=i.id;w.push(n[e]=o.ROOM(k+"/"+e))}),t(i,function(o,i){n[o].on("update",i)},function(o,i){n[o].on("remove",function(t){i(t),e(o)})},e=function(o){void 0!==n[o]&&(REMOVE({array:w,value:n[o]}),n[o].exit(),delete n[o])}))},notAuthedHandler:n,errorHandler:d})}),c!==!1&&(e.count=I=function(o,i){var e,t,n;void 0===i&&(i=o,o=void 0),void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notAuthed,n=i.error)),U.send({methodName:"count",data:o},function(o){var i=o.errorMsg,d=o.isNotAuthed,r=o.count;void 0!==i?(B(i),void 0!==n&&n(i)):d===!0?void 0!==t?t():q():void 0!==e&&e(r)})}),u!==!1&&(e.checkIsExists=S=function(o,i){var e,t,n;void 0===i&&(i=o,o=void 0),void 0!==i&&(CHECK_IS_DATA(i)!==!0?e=i:(e=i.success,t=i.notAuthed,n=i.error)),U.send({methodName:"checkIsExists",data:o},function(o){var i=o.errorMsg,d=o.isNotAuthed,r=o.isExists;void 0!==i?(B(i),void 0!==n&&n(i)):d===!0?void 0!==t?t():q():void 0!==e&&e(r)})}),e.onNew=T=function(i,e){var t=function(o){o.id;e(o)};void 0===e?(e=i,void 0===A&&(A=o.ROOM(k+"/create")),A.on("create",t)):EACH(i,function(i,e){var n=y[e+"/"+i];void 0===n&&(n=y[e+"/"+i]=o.ROOM(k+"/"+e+"/"+i+"/create")),n.on("create",t)})},e.onNewWatching=p=function(i,e){var t=function(i,t){var n,d,r=i.id;w.push(n=o.ROOM(k+"/"+r)),t.push(n),e(i,function(o){n.on("update",o)},function(o){n.on("remove",function(i){o(i),d()})},d=function(){n.exit(),REMOVE({array:w,value:n})})};void 0===e?(e=i,void 0===A&&(A=o.ROOM(k+"/create")),A.on("create",function(o){t(o,W)})):EACH(i,function(i,e){var n=y[e+"/"+i],d=X[e+"/"+i];void 0===n&&(n=y[e+"/"+i]=o.ROOM(k+"/"+e+"/"+i+"/create")),void 0===d&&(d=X[e+"/"+i]=[]),n.on("create",function(o){t(o,d)})})},e.closeOnNew=V=function(o){void 0===o?(void 0!==A&&(A.exit(),A=void 0),EACH(W,function(o){o.exit(),REMOVE({array:w,value:o})}),W=[]):EACH(o,function(o,i){void 0!==y[i+"/"+o]&&(y[i+"/"+o].exit(),delete y[i+"/"+o]),EACH(X[i+"/"+o],function(o){o.exit(),REMOVE({array:w,value:o})}),delete X[i+"/"+o]})},e.onRemove=K=function(i,e){var t=function(o){o.id;e(o)};void 0===e?(e=i,void 0===O&&(O=o.ROOM(k+"/remove")),O.on("remove",t)):EACH(i,function(i,e){var n=b[e+"/"+i];void 0===n&&(n=b[e+"/"+i]=o.ROOM(k+"/"+e+"/"+i+"/remove")),n.on("remove",t)})},e.closeOnRemove=P=function(o){void 0===o?void 0!==O&&(O.exit(),O=void 0):EACH(o,function(o,i){void 0!==b[i+"/"+o]&&(b[i+"/"+o].exit(),delete b[i+"/"+o])})}}})});