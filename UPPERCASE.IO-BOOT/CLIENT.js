FOR_BOX(function(n){"use strict";n.R=METHOD({run:function(r,t){var u=n.boxName+"/"+r+"?version="+CONFIG.version;return void 0!==t&&GET(u,t),"/"+u}})}),FOR_BOX(function(n){"use strict";n.RF=METHOD({run:function(r){return"/__RF/"+n.boxName+"/"+r}})});