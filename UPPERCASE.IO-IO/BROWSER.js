global.CONNECT_TO_IO_SERVER=METHOD({run:function(_){"use strict";var r,E;CHECK_IS_DATA(_)!==!0?r=_:(r=_.success,E=_.error),GET({host:BROWSER_CONFIG.host,port:BROWSER_CONFIG.port,uri:"__WEB_SOCKET_SERVER_HOST",paramStr:"defaultHost="+BROWSER_CONFIG.host},{error:E,success:function(_){CONNECT_TO_ROOM_SERVER({host:_,port:CONFIG.webServerPort,fixRequestURI:"__WEB_SOCKET_FIX"},r)}})}});