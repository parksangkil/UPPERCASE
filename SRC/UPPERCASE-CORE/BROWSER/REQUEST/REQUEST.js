/*
 * HTTP 요청을 보냅니다.
 */
global.REQUEST = METHOD({

	run : (params, responseListenerOrListeners) => {
		//REQUIRED: params
		//REQUIRED: params.method	요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
		//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.uri
		//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
		//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
		//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
		//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
		//OPTIONAL: params.headers	요청 헤더
		//OPTIONAL: responseListenerOrListeners
		//OPTIONAL: responseListenerOrListeners.error
		//OPTIONAL: responseListenerOrListeners.success

		let method = params.method;
		let isSecure = params.isSecure === undefined ? BROWSER_CONFIG.isSecure : params.isSecure;
		let host = params.host === undefined ? BROWSER_CONFIG.host : params.host;
		let port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : 80) : params.port;
		let uri = params.uri;
		let url = params.url;
		let paramStr = params.paramStr;
		let _params = params.params;
		let data = params.data;
		let headers = params.headers;
		
		let responseListener;
		let errorListener;

		method = method.toUpperCase();
		
		if (url !== undefined) {
			
			if (url.indexOf('?') !== -1) {
				paramStr = url.substring(url.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				url = url.substring(0, url.indexOf('?'));
			}
			
		} else {
			
			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
		}
		
		if (_params !== undefined) {
			
			EACH(_params, (value, name) => {
				
				if (paramStr === undefined) {
					paramStr = '';
				} else {
					paramStr += '&';
				}
				
				paramStr += encodeURIComponent(name) + '=' + encodeURIComponent(value);
			});
		}
		
		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
		
		if (url === undefined) {
			url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));
		}
		
		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}
		
		(method === 'GET' || method === 'DELETE' ? fetch(url + '?' + paramStr, {
			method : method,
			credentials : host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : headers === undefined ? undefined : new Headers(headers)
		}) : fetch(url, {
			method : method,
			body : paramStr,
			credentials : host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
			headers : headers === undefined ? undefined : new Headers(headers)
		})).then((response) => {
			return response.text();
		}).then((responseText) => {
			responseListener(responseText);
		}).catch((error) => {
			
			let errorMsg = error.toString();

			if (errorListener !== undefined) {
				errorListener(errorMsg);
			} else {
				SHOW_ERROR('REQUEST', errorMsg, params);
			}
		});
	}
});