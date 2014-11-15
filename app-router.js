!function(t,e){function a(t,a,i){var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!1,!0,a),i.dispatchEvent(r)}function i(e){var i=p.parseUrl(t.location.href,e.getAttribute("mode")),n={path:i.path};if(a("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&p.testRoute(s.getAttribute("path"),i.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return r(e,s,i),void 0;s=s.nextSibling}a("not-found",n,e)}}function r(t,e,i){if(e.hasAttribute("redirect"))return t.go(e.getAttribute("redirect"),{replace:!0}),void 0;var r={path:i.path,route:e,oldRoute:t.activeRoute};a("activate-route-start",r,t)&&a("activate-route-start",r,e)&&(t.previousRoute&&t.previousRoute.transitionAnimationInProgress&&c(t.previousRoute),t.activeRoute&&t.activeRoute.removeAttribute("active"),t.previousRoute=t.activeRoute,t.activeRoute=e,t.activeRoute.setAttribute("active","active"),e.hasAttribute("import")?s(t,e.getAttribute("import"),e,i,r):e.hasAttribute("element")?u(t,e.getAttribute("element"),e,i,r):e.firstElementChild&&"TEMPLATE"===e.firstElementChild.tagName&&h(t,n(e.firstElementChild),r))}function n(t){return"createInstance"in t?t.createInstance():e.importNode(t.content,!0)}function s(t,a,i,r,n){function s(){o(t,u,a,i,r,n)}var u;d.hasOwnProperty(a)?(u=e.querySelector('link[href="'+a+'"]'),u.import?s():u.addEventListener("load",s)):(d[a]=!0,u=e.createElement("link"),u.setAttribute("rel","import"),u.setAttribute("href",a),u.addEventListener("load",s),e.head.appendChild(u))}function o(t,e,a,i,r,s){i.hasAttribute("active")&&(i.hasAttribute("template")?h(t,n(e.import.querySelector("template")),s):u(t,i.getAttribute("element")||a.split("/").slice(-1)[0].replace(".html",""),i,r,s))}function u(t,a,i,r,n){var s=e.createElement(a),o=p.routeArguments(i.getAttribute("path"),r.path,r.search,i.hasAttribute("regex"));for(var u in o)o.hasOwnProperty(u)&&(s[u]=o[u]);h(t,s,n)}function h(t,e,i){t.hasAttribute("core-animated-pages")||l(t.previousRoute),t.activeRoute.appendChild(e),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path"),t.previousRoute&&(t.previousRoute.transitionAnimationInProgress=!0)),a("activate-route-end",i,t),a("activate-route-end",i,i.route)}function c(t){t&&(t.transitionAnimationInProgress=!1,l(t))}function l(t){if(t)for(var e=t.firstChild;e;){var a=e;e=e.nextSibling,"TEMPLATE"!==a.tagName&&t.removeChild(a)}}var p={},d={},g="ActiveXObject"in t,v=Object.create(HTMLElement.prototype);v.util=p,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),v.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},v.init=function(){var a=this;a.isInitialized||(a.isInitialized=!0,a.hasAttribute("trailingSlash")||a.setAttribute("trailingSlash","strict"),a.hasAttribute("mode")||a.setAttribute("mode","auto"),a.hasAttribute("core-animated-pages")&&(a.createShadowRoot(),a.coreAnimatedPages=e.createElement("core-animated-pages"),a.coreAnimatedPages.appendChild(e.createElement("content")),a.coreAnimatedPages.style.position="static",a.coreAnimatedPages.setAttribute("valueattr","path"),a.coreAnimatedPages.setAttribute("transitions",a.getAttribute("transitions")),a.shadowRoot.appendChild(a.coreAnimatedPages),a.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){c(a.previousRoute)})),a.stateChangeHandler=i.bind(null,a),t.addEventListener("popstate",a.stateChangeHandler,!1),g&&t.addEventListener("hashchange",a.stateChangeHandler,!1),i(a))},v.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),g&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},v.go=function(e,a){"pushstate"!==this.getAttribute("mode")&&(e="#"+e),a&&a.replace!==!0?t.history.pushState(null,null,e):t.history.replaceState(null,null,e),i(this)},p.parseUrl=function(t,a){var i={isHashPath:"hash"===a};if("function"==typeof URL){var r=new URL(t);i.path=r.pathname,i.hash=r.hash,i.search=r.search}else{var n=e.createElement("a");n.href=t,i.path="/"+n.pathname,i.hash=n.hash,i.search=n.search}if("pushstate"!==a&&("#/"===i.hash.substring(0,2)?(i.isHashPath=!0,i.path=i.hash.substring(1)):"#!/"===i.hash.substring(0,3)?(i.isHashPath=!0,i.path=i.hash.substring(2)):i.isHashPath&&(i.path=0===i.hash.length?"/":i.hash.substring(1)),i.isHashPath)){var s=i.path.indexOf("?");-1!==s&&(i.search=i.path.substring(s),i.path=i.path.substring(0,s))}return i},p.testRoute=function(t,e,a,i){if("ignore"===a&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||i||(t=t.slice(0,-1))),i)return p.testRegExString(t,e);if(t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var r=e.split("/"),n=t.split("/");if(r.length!==n.length)return!1;for(var s=0;s<n.length;s++){var o=n[s];if(o!==r[s]&&"*"!==o&&":"!==o.charAt(0))return!1}return!0},p.routeArguments=function(t,e,a,i){var r={};if(!i)for(var n=e.split("/"),s=t.split("/"),o=0;o<s.length;o++){var u=s[o];":"===u.charAt(0)&&(r[u.substring(1)]=n[o])}var h=a.substring(1).split("&");1===h.length&&""===h[0]&&(h=[]);for(var c=0;c<h.length;c++){var l=h[c],d=l.split("=");r[d[0]]=d.splice(1,d.length-1).join("=")}for(var g in r)r[g]=p.typecast(r[g]);return r},p.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},p.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var a="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),a="i"}return new RegExp(t,a).test(e)},e.registerElement("app-router",{prototype:v})}(window,document);