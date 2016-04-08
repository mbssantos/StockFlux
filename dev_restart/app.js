"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){angular.module("StockFlux",["ngAnimate","stockflux.main","stockflux.showcase","stockflux.toolbar","stockflux.icon","stockflux.search","stockflux.favourites","stockflux.sidebar","stockflux.filters","stockflux.star","stockflux.tearout","stockflux.minichart","stockflux.scroll","stockflux.closedWindows","stockflux.closedCard","stockflux.config","stockflux.version"]),angular.module("stockflux.main",[]),angular.module("stockflux.showcase",["stockflux.selection","stockflux.quandl","stockflux.config"]),angular.module("stockflux.toolbar",["stockflux.currentWindow","stockflux.closedWindows","stockflux.config"]),angular.module("stockflux.icon",[]),angular.module("stockflux.search",["stockflux.quandl","stockflux.selection","stockflux.currentWindow"]),angular.module("stockflux.favourites",["stockflux.quandl","stockflux.selection","stockflux.currentWindow"]),angular.module("stockflux.sidebar",[]),angular.module("stockflux.filters",[]),angular.module("stockflux.star",["stockflux.selection"]),angular.module("stockflux.tearout",["stockflux.geometry","stockflux.hover","stockflux.currentWindow","stockflux.config"]),angular.module("stockflux.minichart",["stockflux.quandl"]),angular.module("stockflux.store",[]),angular.module("stockflux.currentWindow",[]),angular.module("stockflux.scroll",[]),angular.module("stockflux.closedWindows",["stockflux.closedCard"]),angular.module("stockflux.closedCard",[]),angular.module("stockflux.config",[]),angular.module("stockflux.version",["stockflux.currentWindow"])}(),function(){var a=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"openClosedWindow",value:function(a){reportAction("Restore window",a);var b=window.storeService.open(a);window.windowService.createMainWindow(a,b.isCompact())}}]),a}();a.$inject=[],angular.module("stockflux.closedCard").controller("ClosedCardCtrl",a)}(),function(){angular.module("stockflux.closedCard").directive("closedCard",[function(){return{restrict:"E",templateUrl:"closedWindows/closedCard/closedCard.html",scope:{cardWindow:"="},controller:"ClosedCardCtrl",controllerAs:"closedCardCtrl"}}])}(),function(){var a=function(){function a(b,c){_classCallCheck(this,a),this.$scope=b,this.$timeout=c,this.closedWindows=[],this.closedTabsShow=!1,this.overriddenIcon="",this._watch()}return _createClass(a,[{key:"override",value:function(){return this.overriddenIcon}},{key:"refreshClosedWindows",value:function(){this.closedWindows=window.storeService.getPreviousClosedWindows(),this.updateSeen()}},{key:"updateSeen",value:function(){var a=window.windowService.getClosedWindowSeen();this.overriddenIcon=a?"":this.$scope.icon+"_active",!a&&this.closedTabsShow&&document.hasFocus()&&window.windowService.seenClosedWindows()}},{key:"click",value:function(){this.overriddenIcon="",this.refreshClosedWindows(),this.closedTabsShow=this.closedWindows.length>0,window.windowService&&window.windowService.seenClosedWindows()}},{key:"_watch",value:function(){var a=this,b=function(){return a.$timeout(function(){return a.refreshClosedWindows()})},c=function(){window.windowService&&(window.windowService.addClosedWindowListener(b),a.refreshClosedWindows())};window.windowService?c():this.$scope.$watch(function(){return window.windowService},function(){c()}),this.$scope.$on("$destroy",function(){window.windowService.removeClosedWindowListener(b)})}}]),a}();a.$inject=["$scope","$timeout"],angular.module("stockflux.closedWindows").controller("ClosedWindowListCtrl",a)}(),function(){angular.module("stockflux.closedWindows").directive("closedWindowList",[function(){return{restrict:"E",templateUrl:"closedWindows/closedWindowList/closedWindowList.html",controller:"ClosedWindowListCtrl",controllerAs:"closedWindowListCtrl",scope:{icon:"="},link:function(a,b){var c=function(){a.closedWindowListCtrl.closedTabsShow&&window.windowService.seenClosedWindows()};window.addEventListener("focus",c),a.$on("$destroy",function(){window.removeEventListener("focus",c)})}}}])}(),function(){var a=1200,b=112/a,c=50,d=50,e=[c,d],f=[0,34],g=230,h=[g,110],i=[g,500],j=[1280,720],k=!1,l=function(){function c(){_classCallCheck(this,c)}return _createClass(c,[{key:"createName",value:function(){return"window"+Math.floor(1e3*Math.random())+Math.ceil(999*Math.random())}},{key:"_getConfig",value:function(a,b){var c={name:a||this.createName(),contextMenu:k,autoShow:!1,frame:!1,shadow:!1,resizeRegion:{size:7,topLeftCorner:14,topRightCorner:14,bottomRightCorner:14,bottomLeftCorner:14}};return Object.keys(c).forEach(function(a){void 0===b[a]&&(b[a]=c[a])}),b}},{key:"getWindowConfig",value:function(a){return this._getConfig(a,{showTaskbarIcon:!0,saveWindowState:!0,url:"index.html",resizable:!0,maximizable:!0,minWidth:918,minHeight:510,defaultWidth:j[0],defaultHeight:j[1]})}},{key:"getTearoutConfig",value:function(a){return this._getConfig(a,{maximizable:!1,resizable:!1,showTaskbarIcon:!1,saveWindowState:!1,maxWidth:h[0],maxHeight:h[1],url:"tearout.html"})}},{key:"getTearoutCardDimensions",value:function(){return h}},{key:"getCompactWindowDimensions",value:function(){return i}},{key:"getDefaultWindowDimensions",value:function(){return j}},{key:"getTopCardOffset",value:function(a){return a?f:e}},{key:"getInitialBitfluxProportion",value:function(){return b}},{key:"getBitfluxStockAmount",value:function(){return a}}]),c}();l.$inject=[],angular.module("stockflux.config").service("configService",l)}(),function(){var a=function(){function a(b){_classCallCheck(this,a),this.$scope=b,this.active=!1,this.urls={inactive:b.name,active:b.name+"_active"}}return _createClass(a,[{key:"enter",value:function(){this.active=!0}},{key:"leave",value:function(){this.active=!1}},{key:"url",value:function(){var a=this.$scope.override;return a?a:this.active?this.urls.active:this.urls.inactive}},{key:"click",value:function(a){0===a.button&&(this.$scope.iconClick(),this.active=!1,a.stopPropagation())}}]),a}();a.$inject=["$scope"],angular.module("stockflux.icon").controller("IconCtrl",a)}(),function(){angular.module("stockflux.icon").directive("icon",[function(){return{restrict:"E",templateUrl:"icon/icon.html",scope:{name:"@",iconClick:"&",tooltip:"@",override:"@"},controller:"IconCtrl",controllerAs:"iconCtrl"}}])}(),function(){var a=function(){function a(b,c){_classCallCheck(this,a),this.store=null,this.$scope=b,this.$timeout=c,this.tearingOut=!1,this.watch()}return _createClass(a,[{key:"watch",value:function(){var a=this;this.$scope.$on("tearoutStart",function(){a.$timeout(function(){a.tearingOut=!0})}),this.$scope.$on("tearoutEnd",function(){a.$timeout(function(){a.tearingOut=!1})})}},{key:"disablePointer",value:function(){return this.tearingOut}},{key:"isCompact",value:function(){return!this.store&&window.storeService&&(this.store=window.storeService.open(window.name)),this.store&&this.store.isCompact()}}]),a}();a.$inject=["$scope","$timeout"],angular.module("stockflux.main").controller("MainCtrl",a)}(),function(){angular.module("stockflux.main").directive("main",["$timeout",function(a){return{restrict:"E",templateUrl:"main/main.html",controller:"MainCtrl",controllerAs:"mainCtrl",link:function(b,c){b.$on("compactChanging",function(){c.addClass("disable-transitions"),a(function(){c.removeClass("disable-transitions")},100)})}}}])}(),function(){var a=function(){function a(b,c){_classCallCheck(this,a),this.currentWindowService=b,this.version=c}return _createClass(a,[{key:"openGithub",value:function(){this.currentWindowService.openUrlWithBrowser("https://github.com/ScottLogic/stockflux")}}]),a}();a.$inject=["currentWindowService","Version"],angular.module("stockflux.version").controller("VersionCtrl",a)}(),function(){angular.module("stockflux.version").directive("version",[function(){return{restrict:"E",templateUrl:"main/version/version.html",controller:"VersionCtrl",controllerAs:"versionCtrl"}}])}(),function(a){angular.module("stockflux.currentWindow").factory("currentWindowService",["$rootScope",function(b){function c(){return a.desktop.Window.getCurrent()}function d(b){a.desktop.main(b)}function e(b){d(function(){a.desktop.System.openUrlWithBrowser(b)})}return window.addEventListener("updateFavourites",function(a){b.$broadcast("updateFavourites",a.stock)}),{getCurrentWindow:c,openUrlWithBrowser:e,ready:d}}])}(fin),function(){function a(){return moment().subtract(28,"days")}function b(a,b){return{name:a.name,code:a.dataset_code,favourite:!1,query:b}}function c(a){return a&&!a.quandl_error}function d(b){for(var c=b.datasets,d=[],e=0,f=c.length;f>e;e++)moment(c[e].newest_available_date)>a()&&d.push(c[e]);return{datasets:d}}function e(a){var b=a.dataset,c=b.data,d=[],e=0,g=c.length;for(e;g>e;e++)d.push(f(c[e]));a.stockData={success:!0,startDate:b.start_date,endDate:b.end_date,data:d}}function f(a){return{date:a[i],open:a[j],high:a[k],low:a[l],close:a[m],volume:a[n]}}var g="SmMCEZxMRoNizToppows",h="api_key="+g,i=0,j=8,k=9,l=10,m=11,n=12,o="https://www.quandl.com/api/v3/",p="datasets/WIKI/",q=function(){function f(a){_classCallCheck(this,f),this.$resource=a}return _createClass(f,[{key:"search",value:function(a,c,d,e){var f=this,g=arguments.length<=4||void 0===arguments[4]?!1:arguments[4];this.stockSearch(g).get({query:a},function(e){var f=e.datasets.map(function(c){return b(c,a)});f.length>0?c(f):d()},function(b){g?e&&e({success:!1,code:b.status,message:b.statusText}):f.search(a,c,d,e,!0)})}},{key:"getMeta",value:function(a,c){this.stockMetadata().get({stock_code:a},function(d){c(b(d.dataset,a))})}},{key:"stockData",value:function(){var b,d=arguments.length<=0||void 0===arguments[0]?!1:arguments[0],f=a().format("YYYY-MM-DD");return this.$resource(o+p+":code.json?"+(d?"":h)+"&start_date="+f,{},{get:{method:"GET",transformResponse:function(a,d){return b=angular.fromJson(a),c(b)&&e(b),b},cache:!0}})}},{key:"getData",value:function(a,b,c){var d=this,e=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];return this.stockData(e).get({code:a},function(c){b({success:!0,code:a,name:c.dataset.name,data:c.stockData.data})},function(f){e?c&&c({success:!1,code:f.status,message:f.statusText}):d.getData(a,b,c,!0)})}},{key:"stockMetadata",value:function(){return this.$resource(o+p+":stock_code/metadata.json?"+h,{},{get:{method:"GET",cache:!0}})}},{key:"stockSearch",value:function(){var a=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];return this.$resource(o+"datasets.json?"+(a?"":h)+"&query=:query&database_code=WIKI",{},{get:{method:"GET",cache:!0,transformResponse:function(a,b){var e=angular.fromJson(a);return c(e)?d(e):{}}}})}},{key:"apiKey",value:function(){return g}}]),f}();q.$inject=["$resource"],angular.module("stockflux.quandl",["ngResource"]).service("quandlService",q)}(),function(){var a={code:"",name:""},b=function(){function b(){_classCallCheck(this,b),this._stock=a}return _createClass(b,[{key:"select",value:function(a){this._stock=a}},{key:"selectedStock",value:function(){return this._stock}},{key:"deselect",value:function(){this._stock=a}},{key:"hasSelection",value:function(){return this._stock!==a}}]),b}();b.$inject=[],angular.module("stockflux.selection",[]).service("selectionService",b)}(),function(){var a=function(){function a(b){_classCallCheck(this,a),this.selectionService=b}return _createClass(a,[{key:"selectionCode",value:function(){return this.selectionService.selectedStock().code}},{key:"selectionName",value:function(){return this.selectionService.selectedStock().name}},{key:"hasSelection",value:function(){return this.selectionService.hasSelection()}}]),a}();a.$inject=["selectionService"],angular.module("stockflux.showcase",["stockflux.selection","stockflux.quandl"]).controller("ShowcaseCtrl",a)}(),function(a){angular.module("stockflux.showcase").directive("showcase",["quandlService","configService",function(b,c){return{restrict:"E",templateUrl:"showcase/showcase.html",scope:{selection:"&"},link:function(d,e){var f,g=a.app().quandlApiKey(b.apiKey()),h=!0,i=function(){!f&&window.storeService&&(f=window.storeService.open(window.name))};i(),f&&g.indicators(f.indicators()),g.periodsOfDataToFetch(c.getBitfluxStockAmount()),g.proportionOfDataToDisplayByDefault(c.getInitialBitfluxProportion()),d.selection&&d.selection()&&(h=!1,g.run(e[0].children[0]),g.changeQuandlProduct(d.selection())),d.$watch("selection()",function(a,b){""!==a&&(i(),h&&(h=!1,g.run(e[0].children[0])),f&&g.indicators(f.indicators()),a!==b&&g.changeQuandlProduct(a))}),d.$watchCollection(function(){return g.indicators()},function(a){i(),f&&f.indicators(a)})}}}])}(bitflux),function(){var a={up:"arrow_up",down:"arrow_down"},b=function(){function b(a,c,d,e,f){_classCallCheck(this,b),this.currentWindowService=a,this.quandlService=c,this.selectionService=d,this.$scope=e,this.$timeout=f,this.store=null,this.receivedFirstQuandlResponse=!1,this.stocks=[],this.errors=[],this.update(),this._watch()}return _createClass(b,[{key:"icon",value:function(b){return b.delta<0?a.down:a.up}},{key:"selection",value:function(){return this.selectionService.selectedStock().code}},{key:"select",value:function(a){this.selectionService.select(a)}},{key:"singleClick",value:function(a){window.storeService.open(window.name).isCompact()||this.select(a)}},{key:"doubleClick",value:function(a){var b=window.storeService.open(window.name);b.isCompact()&&(this.select(a),b.toggleCompact())}},{key:"noFavourites",value:function(){return 0===this.stocks.length}},{key:"single",value:function(){return 1===this.stocks.length?"single":""}},{key:"update",value:function(a){var b=this;console.log("currentWindowService.ready set");var c=this;this.currentWindowService.ready(function(){if(console.log("currentWindowService.ready fired"),!window.storeService)return console.log("window.storeService does not exist - setting timeout!",(new Date).getTime()),void(c.timeout||(c.timeout=window.setTimeout(function(){console.log("timeout fired !"),c.update(a),console.log("timeout finished !")},50)));console.log("window.storeService exists!",(new Date).getTime()),b.store||(b.store=window.storeService.open(window.name)),b.favourites=b.store.get(),console.log("this.favourites.length ::: ",b.favourites.length),0===b.favourites.length&&b.$timeout(function(){b.receivedFirstQuandlResponse=!0});var d,e,f;for(d=0,e=b.stocks.length;e>d;d++){var g=b.stocks[d];g.index=b.stockSortFunction(g)}var h=[];for(d=0,e=b.stocks.length;e>d;d++)-1===b.favourites.indexOf(b.stocks[d].code)&&h.push(d);for(d=h.length-1,f=0;d>=f;d--)b.stocks.splice(h[d],1);var i=b.selectionService.selectedStock();if(a)if(0===b.stocks.length)a.favourite?b.selectionService.select(a):i.code===a.code&&b.selectionService.deselect();else if(i.code===a.code&&(!a.favourite||-1===b.favourites.indexOf(i.code))&&b.stocks.length>0){var j=b.stocks.filter(function(a){return a.code===b.favourites[0]})[0];b.selectionService.select(j)}b.errors=[],b.favourites.map(function(a){-1===b.stocks.map(function(a){return a.code}).indexOf(a)&&b.quandlService.getData(a,function(c){if(b.receivedFirstQuandlResponse=!0,-1===b.stocks.map(function(a){return a.code}).indexOf(a)){var d=c&&c.data&&c.data[0],e=d.close-d.open;d&&b.stocks.push({favourite:!0,name:c.name,code:c.code,price:d.close,delta:e,percentage:e/d.open*100,index:b.stockSortFunction(c)})}},function(a){b.receivedFirstQuandlResponse=!0,b._addError({code:a&&a.code||"No code received",message:a&&a.message||"No message"})})})})}},{key:"_addError",value:function(a){for(var b=this.errors,c=b.length,d=a.code,e=0;c>e;e++)if(b[e]&&b[e].code===d)return void b[e].occurences++;a.occurences=1,this.errors.push(a)}},{key:"stockSortFunction",value:function(a){return this.favourites.indexOf(a.code)}},{key:"_watch",value:function(){var a=this;this.$scope.$on("updateFavourites",function(b,c){a.$timeout(function(){a.update(c)})})}}]),b}();b.$inject=["currentWindowService","quandlService","selectionService","$scope","$timeout"],angular.module("stockflux.favourites").controller("FavouritesCtrl",b)}(),function(){angular.module("stockflux.favourites").directive("favourite",[function(){return{restrict:"E",templateUrl:"sidebars/favourites/favourite.html",scope:{stock:"=",selection:"&",select:"&",singleClick:"&",doubleClick:"&",icon:"&",single:"&"}}}])}(),function(){function a(a){return{height:a.outerHeight,width:a.outerWidth,top:a.screenY,left:a.screenX}}function b(a,b){var c=b.getBoundingClientRect();return{height:c.height,width:c.width,top:a.top+c.top,left:a.left+c.left}}function c(a,b){return[new e(a),new e(b)]}var d=function g(a,b){_classCallCheck(this,g),this.x=a||0,this.y=b||0},e=function(){function a(b){_classCallCheck(this,a),this.origin=new d(b.left,b.top),this.extent=new d(b.width,b.height)}return _createClass(a,[{key:"top",value:function(){return this.origin.y}},{key:"left",value:function(){return this.origin.x}},{key:"bottom",value:function(){return this.top()+this.extent.y}},{key:"right",value:function(){return this.left()+this.extent.x}},{key:"corner",value:function(){return new d(this.right(),this.bottom())}},{key:"intersects",value:function(a){var b=a.origin,c=a.corner();return c.x>this.origin.x&&c.y>this.origin.y&&b.x<this.corner().x&&b.y<this.corner().y}},{key:"areaOfIntersection",value:function(a){if(this.intersects(a)){var b=Math.max(this.left(),a.left()),c=Math.min(this.right(),a.right()),d=Math.max(this.top(),a.top()),e=Math.min(this.bottom(),a.bottom());return(c-b)*(e-d)}return 0}}]),a}(),f=function(){function d(){_classCallCheck(this,d)}return _createClass(d,[{key:"elementIntersect",value:function(d,e,f){var g=d.getNativeWindow(),h=c(a(g),b(a(e),f));return h[0].intersects(h[1])}},{key:"elementIntersectArea",value:function(d,e,f){var g=d.getNativeWindow(),h=c(a(g),b(a(e),f));return h[0].areaOfIntersection(h[1])}}]),d}();angular.module("stockflux.geometry",[]).service("geometryService",f)}(),function(){var a=function(){function a(b){_classCallCheck(this,a),this.$rootScope=b,this.hoverTargets=[]}return _createClass(a,[{key:"get",value:function(){return this.hoverTargets}},{key:"add",value:function(a,b){var c={hoverArea:a,code:b};-1===this.hoverTargets.indexOf(c)&&this.hoverTargets.push(c)}},{key:"remove",value:function(a){for(var b=0,c=this.hoverTargets.length;c>b;b++)if(this.hoverTargets[b].code===a){this.hoverTargets.splice(b,1);break}}}]),a}();a.$inject=["$rootScope"],angular.module("stockflux.hover",[]).service("hoverService",a)}(),function(){var a=function(){function a(b,c){_classCallCheck(this,a),this.showMinichart=!0,this.quandlService=b,this.$timeout=c}return _createClass(a,[{key:"renderChart",value:function(a){var b=this;this.$timeout(function(){b.quandlService.getData(a.code,function(a){var c=fc.util.innerDimensions(document.getElementById(a.code+"chart")),d=c.width,e=c.height,f=a.data;if(a.success){if(f.length<2)return void(b.showMinichart=!1);f=f.map(function(a){var b=moment(a.date);return a.date=b.toDate(),a});var g=d3.select("#"+a.code+"chart").insert("svg","div").attr("width",d).attr("height",e),h=fc.scale.dateTime().domain(fc.util.extent().fields("date")(f)).discontinuityProvider(fc.scale.discontinuity.skipWeekends()).range([0,d]),i=fc.util.extent().fields(["close"])(f),j=d3.scale.linear().domain(i).range([e,0]).nice(),k=fc.series.area().y0Value(function(a){return i[0]}).y1Value(function(a){return a.close}).decorate(function(b){b.attr("fill","url(#"+a.code+"-minichart-gradient)")}),l=fc.series.line(),m=[].concat(f.slice(0)[0]),n=fc.series.point(),o=fc.series.multi().series([k,l,n]).xScale(h).yScale(j).mapping(function(a){switch(a){case n:return m;default:return f}});g.append("g").datum(f).call(o)}})})}}]),a}();a.$inject=["quandlService","$timeout"],angular.module("stockflux.minichart",["stockflux.quandl"]).controller("MinichartCtrl",a)}(),function(){angular.module("stockflux.minichart").directive("minichart",[function(){return{restrict:"E",templateUrl:"sidebars/favourites/minichart/minichart.html",scope:{stock:"="},controller:"MinichartCtrl",controllerAs:"minichartCtrl"}}])}(),function(a){var b=".favourites";angular.module("stockflux.tearout").directive("tearable",["geometryService","hoverService","currentWindowService","configService","$rootScope","$timeout","$interval",function(c,d,e,f,g,h,i){return{restrict:"C",link:function(j,k,l){function m(){return c.elementIntersect(W,a,document.getElementsByClassName("favourites")[0])}function n(a){$.x=-a.pageX,$.y=-a.pageY}function o(){var a=P,b=0,c=0;if(a.offsetParent)do b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;while(a);_.x=b,_.y=c}function p(a,b,c,d){var e={x:b+$.x+_.x,y:c+$.y+_.y};e.x===aa.x&&e.y===aa.y||(a.setBounds(e.x,e.y,O[0],O[1]),aa=e)}function q(){W.show(),W.setAsForeground()}function r(a,b){b.contentWindow.document.body.appendChild(a)}function s(){reportAction("Tearout","Return to same"),X.appendChild(P),W.hide(),L.destroy()}function t(){var a=W.getNativeWindow().document;a.body=a.createElement("body")}function u(a){g.$broadcast("tearoutStart"),p(W,a.screenX,a.screenY),t(),r(P,W),q(),W.addEventListener("blurred",G),R=P.classList.contains("single"),ba=!0}function v(){x(),J||(J=i(function(){T++,T>100&&L.overAnotherInstance(b,function(a){a||(w(),z())})},10))}function w(){i.cancel(J),J=null,h.cancel(K),K=null,x()}function x(){T=0}function y(){var a=e.getCurrentWindow();S=!0,K=h(function(){w(),a.animate({opacity:{opacity:0,duration:N}}),a.updateOptions({shadow:!1}),K=null,v()},400)}function z(){var b=e.getCurrentWindow(),c=f.getTopCardOffset(I.isCompact());c=[U.x-c[0]+$.x+_.x-2,U.y-c[1]+$.y+_.y-1],b.setBounds(c[0],c[1],a.outerWidth,a.outerHeight),b.animate({opacity:{opacity:1,duration:N}},{interrupt:!0}),S=!1}function A(a){return 0!==a.button?!1:(Q=!0,n(a),o(),L=V.registerDrag(W,e.getCurrentWindow()),M&&h.cancel(M),void(M=h(function(){return M=null,Q?void u(a):!1},250)))}function B(a){Q&&M&&(Math.abs(a.pageX+$.x)>50||Math.abs(a.pageY+$.y)>50)&&(h.cancel(M),M=null,u(a)),ba&&(p(W,a.screenX,a.screenY),U.x=a.screenX,U.y=a.screenY,R&&(x(),m()||S||(y(),v())))}function C(c){return 0!==c.button?!1:(Q=!1,g.$broadcast("tearoutEnd"),W.removeEventListener("blurred",G),void(ba&&(ba=!1,L.overThisInstance(b)?(s(),R&&(w(),z())):(I||(I=a.storeService.open(a.name)),L.overAnotherInstance(b,function(b){if(b){if(reportAction("Tearout","Moved "+j.stock.code),L.moveToOtherInstance(j.stock),L.destroy(),I.remove(j.stock),R)return D(),void e.getCurrentWindow().close();D()}else if(R)s(),w(),z();else{var d=I.isCompact(),g=I.indicators();V.createMainWindow(null,d,function(b,e){reportAction("Tearout","Created "+j.stock.code);var h=f.getTopCardOffset(d);h=[c.screenX-h[0]+$.x+_.x-2,c.screenY-h[1]+$.y+_.y-1],b.setBounds(h[0],h[1],a.outerWidth,a.outerHeight,e);var i=a.storeService.open(b.name);i.indicators(g),i.add(j.stock),I.remove(j.stock),i.toggleCompact(d)}),D()}})))))}function D(){Y.removeChild(X),H(),W.close()}function E(){for(var b=d.get(),e=-1,f=b[0],g=0,h=b.length;h>g;g++){var i=c.elementIntersectArea(W,a,b[g].hoverArea);i>e&&(e=i,f=b[g])}e>0&&f&&(I||(I=a.storeService.open(a.name)),I.reorder(j.stock.code,f.code))}function F(){L.overThisInstance(b)?E():L.updateIntersections(b)}function G(){ba&&(g.$broadcast("tearoutEnd"),s(),ba=!1,W.removeEventListener("blurred",G))}function H(){d.remove(j.stock.code),W.removeEventListener("bounds-changing",F),W.removeEventListener("blurred",G),P.removeEventListener("mousedown",A),document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",C)}var I,J,K,L,M,N=400,O=f.getTearoutCardDimensions(),P=k[0],Q=(P.clientWidth||O[0],P.clientHeight||O[1],!1),R=!1,S=!1,T=0,U={},V=a.windowService,W=V.createTearoutWindow(a.name),X=P.parentNode,Y=X.parentNode,Z=Y.getElementsByClassName("drop-target")[0],$={x:0,y:0},_={x:0,y:0},aa={x:0,y:0},ba=!1;d.add(Z,j.stock.code),W.addEventListener("bounds-changing",F),P.addEventListener("mousedown",A),document.addEventListener("mousemove",B,!0),document.addEventListener("mouseup",C,!0),j.$on("$destroy",function(){H()})}}}])}(window),function(){angular.module("stockflux.filters").filter("truncate",function(){return function(a){if(a){var b=a.indexOf("(");return a.slice(0,b-1)}}})}(),function(){angular.module("stockflux.scroll").directive("customScrollbar",[function(){return{restrict:"C",link:function(a,b){var c="scroll-padding";a.$on("disableScrolling",function(){b.mCustomScrollbar("disable")}),a.$on("enableScrolling",function(){b.mCustomScrollbar("update")}),b.mCustomScrollbar({scrollInertia:0,mouseWheel:{scrollAmount:80},callbacks:{onOverflowY:function(){b.addClass(c)},onOverflowYNone:function(){b.removeClass(c)}}})}}}])}(),function(){var a=function(){function a(b,c,d,e,f){_classCallCheck(this,a),this.$scope=b,this.$timeout=c,this.quandlService=d,this.selectionService=e,this.currentWindowService=f,this.store=null,this.query="",this.noResults=!1,this.stocks=[],this.errors=[],this.isLoading=!1,this._watch()}return _createClass(a,[{key:"getStore",value:function(){return window.storeService?(this.store||(this.store=window.storeService.open(window.name)),this.store):null}},{key:"getFavourites",value:function(){return this.getStore()?this.store.get():null}},{key:"selection",value:function(){return this.selectionService.selectedStock().code}},{key:"select",value:function(a){reportAction("Select search",a.code),this.getStore()&&!this.store.isCompact()&&this.selectionService.select(a)}},{key:"onSearchKeyDown",value:function(a){38===a.keyCode?this.changePointer(-1):40===a.keyCode?this.changePointer(1):13===a.keyCode?this.changePointer(0):27===a.keyCode&&this.$scope.sidebarCtrl.favouritesClick()}},{key:"changePointer",value:function(a){var b=this.stocks.map(function(a){return a.code}).indexOf(this.selection()),c=b+a;c=Math.max(0,Math.min(c,this.stocks.length-1)),this.stocks.length>0&&this.select(this.stocks[c])}},{key:"submit",value:function(){var a=this;""!==this.query&&reportAction("Search",this.query),this.stocks=[],this.noResults=!1,this.currentWindowService.ready(function(){a.getStore()&&(a.query?(a.isLoading=!0,a.errors=[],a.quandlService.search(a.query,function(b){return a.isLoading=!1,a.stocks=a.stocks.filter(function(b){return b.query===a.query}),""===a.query.trim()?void a.displayFavourites():(a.noResults=!1,void b.forEach(function(b){if(b.query===a.query){var c=!1;a.getFavourites().forEach(function(d){b.code===d&&(b.favourite=!0,a.stocks.unshift(b),c=!0)}),c||a.stocks.push(b)}}))},function(){a.noResults=!0,a.isLoading=!1},function(b){a.isLoading=!1,a._addError({code:b&&b.code||"No code received",message:b&&b.message||"No message"})})):a.displayFavourites())})}},{key:"displayFavourites",value:function(){var a=this,b=this.getFavourites();b&&b.map(function(b){a.quandlService.getMeta(b,function(b){b.favourite=!0,a.stocks.push(b)})})}},{key:"_addError",value:function(a){for(var b=this.errors,c=b.length,d=a.code,e=0;c>e;e++)if(b[e]&&b[e].code===d)return void b[e].occurences++;a.occurences=1,this.errors.push(a)}},{key:"_watch",value:function(){var a=this;this.$scope.$watch(function(){return a.query},function(){a.submit()}),this.$scope.$on("updateFavourites",function(b,c){a.$timeout(function(){if(c){var b=a.stocks.map(function(a){return a.code}).indexOf(c.code);b>-1?a.updateFavouriteStates():c.favourite&&!a.query&&a.stocks.push(c)}})})}},{key:"updateFavouriteStates",value:function(){var a=this.getFavourites();this.getFavourites()&&(this.query?this.stocks.forEach(function(b){b.favourite=a.indexOf(b.code)>-1}):this.stocks=this.stocks.filter(function(b){return a.indexOf(b.code)>-1}))}},{key:"darkenClass",value:function(a){return this.selection()===a.code||a.isHovered}},{key:"selectedClass",value:function(a){return this.selection()===a.code}}]),a}();a.$inject=["$scope","$timeout","quandlService","selectionService","currentWindowService"],angular.module("stockflux.search").controller("SearchCtrl",a)}(),function(){angular.module("stockflux.search").directive("search",["$timeout",function(a){return{restrict:"E",templateUrl:"sidebars/search/search.html",controller:"SearchCtrl",controllerAs:"searchCtrl",link:function(b,c){c.on("click",function(){a(function(){c.find("input.sidetab").focus()},100)})}}}])}(),function(){var a={expanded:"expanded",contracted:"contracted"},b=function(){function b(){_classCallCheck(this,b),this._showSearches=!1}return _createClass(b,[{key:"searchClass",value:function(){return this.showSearches()?a.expanded:a.contracted}},{key:"favouritesClass",value:function(){return this.showFavourites()?a.expanded:a.contracted}},{key:"showSearches",value:function(){return this._showSearches}},{key:"showFavourites",value:function(){return!this._showSearches}},{key:"searchClick",value:function(){this._showSearches||reportAction("Show","Search"),this._showSearches=!0}},{key:"favouritesClick",value:function(){this._showSearches&&reportAction("Show","Favourites"),this._showSearches=!1}},{key:"toggleClick",value:function(){reportAction("Toggle","Sidebar"),this._showSearches=!this._showSearches}}]),b}();b.$inject=[],angular.module("stockflux.sidebar").controller("SidebarCtrl",b)}(),function(){angular.module("stockflux.sidebar").directive("sideBar",["$timeout",function(a){return{restrict:"E",templateUrl:"sidebars/sidebar.html",controller:"SidebarCtrl",controllerAs:"sidebarCtrl",link:function(b,c){window.addEventListener("dragout",function(){a(function(){b.sidebarCtrl.isTearoutTarget=!1})}),window.addEventListener("dragin",function(){a(function(){b.sidebarCtrl.isTearoutTarget=!0})})}}}])}(),function(){var a={off:"favourite_off",on:"favourite_on",offHover:"favourite_off_hover",onHover:"favourite_hover"},b=function(){function b(a,c){_classCallCheck(this,b),this.$scope=a,this.store=null,this.selectionService=c,this.starHovered=!1,this.stock=a.stock,this.check=a.confirm,this.confirmationShow=!1,this.mouseY=0,this.viewHeight=720}return _createClass(b,[{key:"favouriteUrl",value:function(){return this.starHovered?a.onHover:this.stock.favourite?a.on:this.stock.isHovered||this.selectionService.selectedStock()===this.stock?a.offHover:a.off}},{key:"tooltip",value:function(){return this.stock.favourite?"Unfavourite Stock":"Favourite Stock"}},{key:"modalFlip",value:function(){var a=84,b=this.mouseY+25;return this.viewHeight<b+a}},{key:"modalTop",value:function c(){var c=this.mouseY+25;return this.modalFlip()&&(c=this.mouseY-95),c}},{key:"modalBubbleTop",value:function(){var a=this.modalTop()-5;return this.modalFlip()&&(a=this.modalTop()+79),a}},{key:"click",value:function(a){return 0!==a.button?!1:(this.mouseY=a.currentTarget.y,this.viewHeight=a.view.innerHeight,void(this.check?(this.confirmationShow=!0,this.$scope.$emit("disableScrolling")):(this.store||(this.store=window.storeService.open(window.name)),this.stock.favourite?this.deselect():(reportAction("Add Favourite",this.stock.code),this.stock.favourite=!0,this.store.add(this.stock)))))}},{key:"deselect",value:function(){this.store||(this.store=window.storeService.open(window.name)),reportAction("Remove Favourite",+this.stock.code),this.stock.favourite=!1,this.store.remove(this.stock),this.hideModal()}},{key:"hideModal",value:function(){this.confirmationShow=!1,this.$scope.$emit("enableScrolling")}},{key:"mouseEnter",value:function(){this.starHovered=!0}},{key:"mouseLeave",value:function(){this.starHovered=!1}}]),b}();b.$inject=["$scope","selectionService"],angular.module("stockflux.star").controller("StarCtrl",b)}(),function(){angular.module("stockflux.star").directive("star",[function(){return{restrict:"E",templateUrl:"sidebars/star/star.html",scope:{stock:"=",confirm:"="},controller:"StarCtrl",controllerAs:"starCtrl"}}])}(),function(){var a,b="windows",c="version",d=["AAPL","MSFT","TITN","SNDK","TSLA"],e=["rsi","movingAverage"],f=5,g=function(){function c(a,b,d){_classCallCheck(this,c),this.$rootScope=a,this.store=b,this.windowName=d}return _createClass(c,[{key:"save",value:function(){
localStorage.setItem(b,angular.toJson(a))}},{key:"update",value:function(a){this.save(),this.$rootScope.$broadcast("updateFavourites",a,this.windowName)}},{key:"get",value:function(){return this.store.stocks}},{key:"indicators",value:function(a){return arguments.length?(this.store.indicators=a,void this.save()):this.store.indicators}},{key:"reorder",value:function(a,b){if(a!==b){var c=this.store.stocks,d=c.indexOf(a),e=c.indexOf(b);c.splice(e,0,c.splice(d,1)[0]),this.update()}}},{key:"add",value:function(a){var b=a.code;-1===this.store.stocks.indexOf(b)&&(this.store.stocks.push(b),this.update(a))}},{key:"remove",value:function(a){var b=a.code,c=this.store.stocks.indexOf(b);c>-1&&this.store.stocks.splice(c,1),this.update(a)}},{key:"toggleCompact",value:function(a){this.store.compact=arguments.length?a:!this.store.compact,this.save()}},{key:"isCompact",value:function(){return this.store.compact}},{key:"openWindow",value:function(){this.store.closed=0,this.save(),this.$rootScope.$broadcast("openWindow")}},{key:"closeWindow",value:function(){this.store.closed=Date.now(),this.save(),this.store.stocks.length>0&&this.$rootScope.$broadcast("closeWindow");var b=[],c=[];if(a.filter(function(a){return 0!==a.closed}).forEach(function(a){a.stocks.length>0?b.push(a):c.push(a)}),c.forEach(function(b){var c=a.indexOf(b);a.splice(c,1)}),b.length>f){b.sort(function(a,b){return b.closed-a.closed});for(var d=f,e=b.length;e>d;d++){var g=a.indexOf(b[d]);a.splice(g,1)}}this.save()}}]),c}(),h=function(){function f(c,d){_classCallCheck(this,f),this.$rootScope=c,this.version=d,a=JSON.parse(localStorage.getItem(b))}return _createClass(f,[{key:"shouldUpgrade",value:function(){if(null==localStorage.getItem(c))return!0;var a=function(a){return a.split(".").map(function(a){return Number(a)})},b=a(this.version),d=a(localStorage.getItem(c));return b[0]!==d[0]}},{key:"upgrade",value:function(){localStorage.removeItem(b),a=null}},{key:"saveVersion",value:function(){localStorage.setItem(c,this.version)}},{key:"getPreviousOpenWindowNames",value:function(){return(a||[]).filter(function(a){return 0===a.closed}).map(function(a){return a.id})}},{key:"getPreviousClosedWindows",value:function(){return(a||[]).filter(function(a){return a.closed>0})}},{key:"open",value:function(b){var c,f=(a||[]).map(function(a){return a.id}).indexOf(b);if(f>-1)c=a[f];else{var h=[],i=e.slice();a||(h=d,a=[]);var j={id:b,stocks:h,indicators:i,closed:0,compact:!1};a.push(j),c=j}return new g(this.$rootScope,c,b)}}]),f}();h.$inject=["$rootScope","Version"],angular.module("stockflux.store").service("storeService",h)}(),function(){var a=function(){function a(b,c,d,e){var f=this;_classCallCheck(this,a),this.$scope=b,this.$timeout=c,this.currentWindowService=d,this.configService=e,this.store=null,this.window=null,this.compactWindowDimensions=null,this.maximised=!1,this.defaultWindowDimensions=this.configService.getDefaultWindowDimensions(),this.oldSize=null,this.oldBounds={width:this.defaultWindowDimensions[0],height:this.defaultWindowDimensions[1],top:100,left:100},this.maximisedEvent=function(){f.$timeout(function(){f.maximised=!0})},this.restoredEvent=function(){f.$timeout(function(){f.maximised=!1})},d.ready(function(){var a=f.onReady.bind(f);a(),f._watch()})}return _createClass(a,[{key:"isCompact",value:function(){return!this.store&&window.storeService&&(this.store=window.storeService.open(window.name)),this.store&&this.store.isCompact()}},{key:"onReady",value:function(){this.window=this.currentWindowService.getCurrentWindow(),this.window.addEventListener("maximized",this.maximisedEvent),this.window.addEventListener("restored",this.restoredEvent),this.compactWindowDimensions=this.configService.getCompactWindowDimensions()}},{key:"minimiseClick",value:function(){reportAction("Window change","Minimised"),this.window.minimize()}},{key:"maximiseClick",value:function(){window.outerWidth!==this.compactWindowDimensions[0]&&(this.oldBounds={height:window.outerHeight,left:window.screenLeft,top:window.screenTop,width:window.outerWidth}),reportAction("Window change","Maximised"),this.window.maximize()}},{key:"normalSizeClick",value:function(){this.window.restore(),this.window.setBounds(this.oldBounds.left,this.oldBounds.top,this.oldBounds.width,this.oldBounds.height)}},{key:"_compactChanged",value:function(){var a=this.isCompact();if(window.outerWidth!==this.compactWindowDimensions[0]&&(this.oldSize=[window.outerWidth,window.outerHeight],this.wasMaximised=this.maximised),window.windowService&&window.windowService.updateOptions(this.window,a),a)reportAction("Window change","Compact"),this.window.resizeTo(this.compactWindowDimensions[0],this.compactWindowDimensions[1],"top-right");else if(this.wasMaximised)reportAction("Window change","Maximised"),this.window.maximize();else{reportAction("Window change","Standard");var b=this.defaultWindowDimensions[0],c=this.defaultWindowDimensions[1];this.oldSize&&(b=this.oldSize[0],c=this.oldSize[1]),this.window.resizeTo(b,c,"top-right")}this.$scope.$broadcast("compactChanging")}},{key:"compactClick",value:function(){this.store||(this.store=window.storeService.open(window.name)),this.store.toggleCompact()}},{key:"closeClick",value:function(){this.window.removeEventListener("maximized",this.maximisedEvent),this.window.removeEventListener("restored",this.restoredEvent),this.window.close()}},{key:"_watch",value:function(){var a=this;this.$scope.$watch(function(){return a.isCompact()},function(){return a._compactChanged()})}}]),a}();a.$inject=["$scope","$timeout","currentWindowService","configService"],angular.module("stockflux.toolbar").controller("ToolbarCtrl",a)}(),function(){angular.module("stockflux.toolbar").directive("toolbar",[function(){return{restrict:"E",templateUrl:"toolbar/toolbar.html",controller:"ToolbarCtrl",controllerAs:"toolbarCtrl"}}])}(),function(){var a={version:"10.1.0"};angular.module("stockflux.version").value("Version",a.version)}();