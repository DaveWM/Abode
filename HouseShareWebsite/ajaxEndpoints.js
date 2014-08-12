(function(namespace){
	var fn = window,
		  spaces = namespace.split("."),
		  ns, 
		  index,
		  segmentLength;
		
	for (index = 0, segmentLength = spaces.length; index < segmentLength; index++) {
		ns = spaces[index];
		if (typeof fn[ns] === "undefined") {
			fn[ns] = {};
		}
		
		fn = fn[ns];
	}
	
	fn.endpoint = {
		query: function(endpoint, parameters){
			var url = "";
				
			if(parameters){
				if(this._isArray(parameters)){
					url += this.buildArray(endpoint, parameters);
				}
				else if(this._isObject(parameters)){
					url += this.buildObject(parameters);
				}
				else{
					url += this.buildValue(endpoint, parameters);
				}
			}
			
			return url ? endpoint.url + "?" + url : endpoint.url;
		},
		
		buildArray: function(endpoint, parameters){
			var url = "", i;
			
			if(!endpoint.query.length){
				return url;
			}
			
			for(i = 0; i < parameters.length; i++){
				url += endpoint.query[i] + "=" + parameters[i];
						
				if(i < parameters.length - 1){
					url += "&";
				}
			}
			return url;
		},
		buildObject: function(parameters){
			var url = "", param;

			for(param in parameters){
				if(parameters.hasOwnProperty(param)){
					url += param + "=" + parameters[param] + "&";
				}
			}
			
			url = url.substring(0, url.length - 1);
			return url;
		},
		buildValue: function(endpoint, parameters){		
			return endpoint.query.length ? endpoint.query[0] + "=" + parameters : "";
		},
		
		_isNumeric:function(val) {
			return typeof val === "number" && isFinite(val);
		},
		_isFunction: function(val) {
			return typeof val === "function";
		},
		_isArray: function(val) {
			return val ? this._isNumeric(val.length) && this._isFunction(val.splice) : false;
		},
		_isObject: function(val){
			return typeof val === 'object';
		},
	
		Url: function(url, method, query){
			return {
					build: function(param){
						return server.endpoint.query({url: this.uri, method: this.method, query: this.query}, param);
					},
					uri: globalConfig.apiUrl + url,
					method: method,
					query: query
			};
		}
	};
	
}("server"));



server.endpoints = (function(prefix){
	return {



		account: {
		
			"getuserinfo": new server.endpoint.Url(
					prefix + "account/getuserinfo",
					"GET",
					[]),	
			"ping": new server.endpoint.Url(
					prefix + "account/ping",
					"GET",
					[]),	
			"logout": new server.endpoint.Url(
					prefix + "account/logout",
					"GET",
					[]),	
			"getmanageinfo": new server.endpoint.Url(
					prefix + "account/getmanageinfo",
					"GET",
					["returnUrl","generateState"]),	
			"changepassword": new server.endpoint.Url(
					prefix + "account/changepassword",
					"GET",
					["model"]),	
			"setpassword": new server.endpoint.Url(
					prefix + "account/setpassword",
					"GET",
					["model"]),	
			"addexternallogin": new server.endpoint.Url(
					prefix + "account/addexternallogin",
					"GET",
					["model"]),	
			"removelogin": new server.endpoint.Url(
					prefix + "account/removelogin",
					"GET",
					["model"]),	
			"getexternallogin": new server.endpoint.Url(
					prefix + "account/getexternallogin",
					"GET",
					["provider","error"]),	
			"getexternallogins": new server.endpoint.Url(
					prefix + "account/getexternallogins",
					"GET",
					["returnUrl","generateState"]),	
			"register": new server.endpoint.Url(
					prefix + "account/register",
					"GET",
					["model"]),	
			"registerexternal": new server.endpoint.Url(
					prefix + "account/registerexternal",
					"GET",
					["model"]),	
			"executeasync": new server.endpoint.Url(
					prefix + "account/executeasync",
					"GET",
					["controllerContext","cancellationToken"])	
		},	
		app: {
		
			"index": new server.endpoint.Url(
					prefix + "app/index",
					"GET",
					[])	
		},	
		comments: {
		
			"getitemcomments": new server.endpoint.Url(
					prefix + "comments/getitemcomments",
					"GET",
					["tileItemId"]),	
			"postcomment": new server.endpoint.Url(
					prefix + "comments/postcomment",
					"GET",
					["toPost"]),	
			"executeasync": new server.endpoint.Url(
					prefix + "comments/executeasync",
					"GET",
					["controllerContext","cancellationToken"])	
		},	
		house: {
		
			"createhouse": new server.endpoint.Url(
					prefix + "house/createhouse",
					"GET",
					["house"]),	
			"getcurrenthouse": new server.endpoint.Url(
					prefix + "house/getcurrenthouse",
					"GET",
					[]),	
			"joinhouse": new server.endpoint.Url(
					prefix + "house/joinhouse",
					"GET",
					["toJoin"]),	
			"search": new server.endpoint.Url(
					prefix + "house/search",
					"GET",
					["searchString"]),	
			"executeasync": new server.endpoint.Url(
					prefix + "house/executeasync",
					"GET",
					["controllerContext","cancellationToken"])	
		},	
		notes: {
		
			"createnote": new server.endpoint.Url(
					prefix + "notes/createnote",
					"GET",
					["note"]),	
			"executeasync": new server.endpoint.Url(
					prefix + "notes/executeasync",
					"GET",
					["controllerContext","cancellationToken"])	
		},	
		tileitems: {
		
			"getwhiteboardtileitems": new server.endpoint.Url(
					prefix + "tileitems/getwhiteboardtileitems",
					"GET",
					[]),	
			"gettileitem": new server.endpoint.Url(
					prefix + "tileitems/gettileitem",
					"GET",
					["tileItemId"]),	
			"executeasync": new server.endpoint.Url(
					prefix + "tileitems/executeasync",
					"GET",
					["controllerContext","cancellationToken"])	
		}	
	}	
}("/api/"));


