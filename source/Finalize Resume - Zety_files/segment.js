"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),i=1;i<arguments.length;i++){var o=arguments[i];if(null!=o)for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(n[a]=o[a])}return n},writable:!0,configurable:!0});var APP=APP||{},jsUtility=(APP.segmentConfig={cookieDomain:"zety.com",cookiePath:"/"},{call_Ajax:function(e,t,n,i,o,a,r,s,l){var c=new XMLHttpRequest;c.onload=function(){4!=c.readyState||201!=c.status&&200!=c.status?l&&o&&o():o&&(a?o(c.responseText,a):o(c.responseText))},"GET"!=t||s||(e=-1==e.indexOf("?")?e+"?v="+(new Date).getTime():e+"&v="+(new Date).getTime()),c.open(t,e,n),i&&(c.withCredentials=!0),c.setRequestHeader("Content-Type","application/json;charset=UTF-8"),r?c.send(r):c.send(),c.onerror=function(e){l&&o&&o()},c.ontimeout=function(e){l&&o&&o()}},getHostURL:function(){var e,t;return true?"https://builder.zety.com/":(e=document.domain.substring(0,document.domain.indexOf(".")),t=true,"https://"+(e=-1==e.indexOf("iso")&&-1<e.indexOf("-")&&!t?e.split("-")[0]:e)+document.domain.slice(document.domain.indexOf(".")).replace(/\//g,"")+"/")},set_Cookie:function(e,t,n,i=!1){var o=new Date,i=(o.setDate(o.getDate()+n),(i?encodeURIComponent:escape)(t)+(null==n?"":"; expires="+o.toUTCString())),t=document.domain.substring(document.domain.indexOf(".")),n=(true&&(t="."+APP.segmentConfig.cookieDomain),";SameSite=None; Secure");document.cookie=t?e+"="+i+n+";domain="+t+";path=/":e+"="+i+n+";path=/"},get_Cookie:function(e){var t=document.cookie,n=t.indexOf(" "+e+"=");return t=-1==(n=-1==n?t.indexOf(e+"="):n)?null:(n=t.indexOf("=",n)+1,-1==(e=t.indexOf(";",n))&&(e=t.length),unescape(t.substring(n,e)))},htmlEscape:function(e){if(e)return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},htmlUnescape:function(e){if(e)return e.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"and")},getParameterByName:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");e=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))},getCookieKeyValPair:function(e,t,n){var i="",e=jsUtility.get_Cookie(e);if(null!=e&&0<e.length){var o=e.split(n);if(0<o.length&&-1!=o[0].indexOf(":"))for(var a in o)if(-1!=o[a].split(":")[0].trim().indexOf(t)){i=o[a].split(":")[1].trim();break}}return i},getDeviceType:function(){var e,t=jsUtility.get_Cookie("visitinfo");return t&&-1!==t.indexOf("DeviceType")&&(e=t.indexOf("DeviceType"),e=t.substring(e).split("]&[")[0].split(",")[1].trim()),e=e||(navigator.userAgent.match(/iPad|Tablet|PlayBook/i)?"tablet":navigator.userAgent.match(/Mobile|Android|webOS|iPhone|iPod|Blackberry/i)?"mobile":"desktop")},loadJs:function(e,t){var n=document.createElement("script");n.type="text/javascript",n.src=e,n.async=null==t||t,(e=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,e)}}),_segmentFirePageLoadEvent="undefined"!=typeof FIRE_PAGELOAD_EVENT&&FIRE_PAGELOAD_EVENT;true&&jsUtility.loadJs(jsUtility.getHostURL()+"blob/common/consent-manager/cookie-consent.min.js",!0);var ManageFS=function(n){function t(){var e=jsUtility.get_Cookie("fs_user"),t=new Date((new Date).toUTCString()).getTime();e&&0!=e&&(e=function(e,t){var n=[1e3,60,60,24],o=[e-t];for(i=0;i<n.length;i++)o.push(parseInt(o[i]/n[i])),o[i]=o[i]%n[i];return 30<o[1]&&(o[2]=o[2]+1),o.reverse()}(t,e))&&2<e.length&&(0<e[0]||0<e[1]||30<e[2])&&n.updateSessionCount(),jsUtility.set_Cookie("fs_user",t,3)}n.updateSessionCount=function(){jsUtility.call_Ajax(jsUtility.getHostURL()+"c/fs/api/v1/fullstory/sessions/counter?update=true","POST",!0,!0,null,null,null,!0,!0)};return n.ManageInactivityTime=function(){t();["mousedown","mousemove","keypress","scroll","touchstart"].forEach(function(e){document.addEventListener(e,t,!0)})},n.loadFullStory=function(){var e=0==integrations.All,t=(window.segment&&(e=(t=window.segment).DisableFullStory||e&&!(t.Integrations&&t.Integrations.FullStory),t.ConsentIntegrations)&&t.ConsentIntegrations.hasOwnProperty("FullStory")&&(e=e||!t.ConsentIntegrations.FullStory),jsUtility.get_Cookie("fs_user"));return!e&&"0"!=t&&null!=t&&!0},n}((ManageFS=ManageFS||{})||{}),writeKey="EJHukFoLQvB8MNznslTyEA853wa4IkT4",segment_portal_name="Zety",segment_portal_locale=null,integrations={"All":false,"Mixpanel":true,"Segment.io":true,"Webhooks":true,"Webhook":true};function PageCall(e,t){"undefined"!=typeof analytics&&(null!=t?analytics.page(e,t):analytics.page(e))}function TrackCall(e,t){"undefined"!=typeof analytics&&(null!=t?analytics.track(e,t):analytics.track(e))}"undefined"!=typeof SEGMENT_EVENTS_TO_ALL&&SEGMENT_EVENTS_TO_ALL&&(integrations={"Google Analytics":false, "FullStory":false}),APP.segment=function(d){return d.getGAId=function(){var e=null;try{var t,n=jsUtility.get_Cookie("_ga");n&&0<n.trim().length&&(e=(t=n.split("."))[t.length-2]+"."+t[t.length-1])}catch(e){console.log(e)}return e},d.clearUserTraits=function(){"undefined"!=typeof analytics&&void 0!==analytics.user&&analytics.user().traits({})},d.setMixpanelPropsCookie=function(e){var t,n,i,o,a,r,s,l,c,g,u="";try{"undefined"!=typeof mixpanel&&void 0!==mixpanel.get_distinct_id?(t="desktop","function"==typeof jsUtility.getDeviceType&&(t=jsUtility.getDeviceType().toLowerCase()),mixpanel.register({"device type":t}),(n=mixpanel._.info.properties()).hasOwnProperty("$browser_version")&&(n.$browser_version=Math.floor(n.$browser_version)),n.hasOwnProperty("time")&&(n.time=Math.floor(n.time)),i=mixpanel.persistence.properties(),(u=JSON.stringify(Object.assign(n,i))).$current_url=location.href,l=u,c={},g=JSON.parse(l),Object.keys(g).forEach(function(e,t){-1==e.indexOf("Experiment:")&&(c[e]=g[e])}),u=JSON.stringify(c),o=u,a={},r=["id","distinct_id","userId","Platform","device type","time"],s=JSON.parse(o),Object.keys(s).forEach(function(e,t){(0==e.indexOf("$")||0==e.indexOf("mp_")||0==e.indexOf("utm")||-1<r.indexOf(e))&&(a[e]=s[e])}),u=JSON.stringify(a),jsUtility.set_Cookie("mixpanelprops",u,null,"flexjobs.com"==APP.segmentConfig.cookieDomain)):++e<20&&setTimeout(function(){d.setMixpanelPropsCookie(e)},100)}catch(e){console.log("error in mixpanel properties fetching")}},d.load=function(){var e=0==integrations.All,t=(window.segment&&(e=(t=window.segment).DisableFullStory||e&&!(t.Integrations&&t.Integrations.FullStory),t.ConsentIntegrations)&&t.ConsentIntegrations.hasOwnProperty("FullStory")&&(e=e||!t.ConsentIntegrations.FullStory),jsUtility.get_Cookie("fs_user"));e||"0"==t?APP.segment.loadAnalytics(!1):null!=t?APP.segment.loadAnalytics(!0):null==t&&(0==Math.floor(100*Math.random()+1)%parseFloat(20)?jsUtility.call_Ajax(jsUtility.getHostURL()+"c/fs/api/v1/fullstory/sessions/counter","POST",!0,!0,function(e){try{var t=JSON.parse(e).isNewSessionAllowed;t||jsUtility.set_Cookie("fs_user",0,1),APP.segment.loadAnalytics(t)}catch(e){jsUtility.set_Cookie("fs_user",0,1),APP.segment.loadAnalytics(!1)}},null,null,!0,!0):(jsUtility.set_Cookie("fs_user",0,1),APP.segment.loadAnalytics(!1)))},d.loadAnalytics=function(e){var i=window.analytics=window.analytics||[];if(!i.initialize)if(i.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{i.invoked=!0,i.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],i.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),i.push(e),i}};for(var t=0;t<i.methods.length;t++){var n=i.methods[t];i[n]=i.factory(n)}i.load=function(e,t){var n=document.createElement("script"),e=(n.type="text/javascript",n.defer=!0,n.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js",document.getElementsByTagName("script")[0]);e.parentNode.insertBefore(n,e),i._loadOptions=t},i.SNIPPET_VERSION="4.1.0",1==e&&ManageFS.ManageInactivityTime();e=APP.segment.getIntegrationObject(!0),e=(e?i.load(writeKey,{integrations:e}):i.load(writeKey),!1);if("function"==typeof segmentReady)try{segmentReady(),e=!0}catch(n){console.log(n)}i.ready(function(e){if(d.setMixpanelPropsCookie(0),"function"==typeof segmentReady&&!e)try{segmentReady()}catch(e){console.log(e)}_segmentFirePageLoadEvent&&TrackEvents("page")}(e))}},d.getIntegrationObject=function(e){var t=Object.assign({},integrations);if(window.segment&&window.segment.Integrations)if(t&&0!=t.All)for(var n in segment.Integrations)segment.Integrations[n]&&"all"!=n.toLowerCase()?t.hasOwnProperty(n)&&delete t[n]:0<n.length&&"all"!=n.toLowerCase()&&(t[n]=segment.Integrations[n]);else for(var n in segment.Integrations)segment.Integrations[n]||"all"==n.toLowerCase()?0<n.length&&"all"!=n.toLowerCase()&&(t[n]=segment.Integrations[n]):t.hasOwnProperty(n)&&delete t[n];if(!e&&window.segment&&window.segment.ConsentIntegrations){var i=window.segment.ConsentIntegrations;if(t)if(0!=t.All)for(var n in i)i[n]&&t.hasOwnProperty(n)?t[n]=!0:0==i[n]&&(t[n]=i[n]);else for(var n in t)i.hasOwnProperty(n)&&(t[n]=i[n])}e=ManageFS.loadFullStory();return t&&(t.hasOwnProperty("FullStory")&&delete t.FullStory,t.hasOwnProperty("Fullstory")&&delete t.Fullstory,0!=t.All?0==e&&(t.FullStory=!1,t.Fullstory=!1):1==e&&(t.FullStory=!0,t.Fullstory=!0)),jsUtility.get_Cookie("isproteus")&&(t.Mixpanel=!1),t},d.getSegmentContext=function(e,t){return segment_portal_locale||(e&&void 0!==t&&void 0!==t.locale&&"undefined"!=typeof Storage&&localStorage.setItem("segment_context_locale",t.locale),localStorage.getItem("segment_context_locale"))},d.getSegmentLocaleByUrl=function(){var e,t=window.location.pathname.split("/"),n=window.location.host.split("."),i=["lp","eb"],n=n[n.length-1];return"com"==(n="ar"==n?"sa":n)?(t[1]&&2==t[1].length&&!i.includes(t[1])&&(n=t[1]),t[2]&&2==t[2].length&&!i.includes(t[2])&&(e=t[2])):t[1]&&"en"==t[1]&&(e="en"),n&&e?e.toLowerCase()+"-"+n.toUpperCase():n&&!e?("nl"==n.toLowerCase()?e="nl":"dk"==n.toLowerCase()?e="da":"se"==n.toLowerCase()?e="sv":"br"==n.toLowerCase()?e="pt":"mx"==n.toLowerCase()?e="es":"pt"==n.toLowerCase()?e="pt":"sa"==n.toLowerCase()?e="ar":"fi"==n.toLowerCase()?e="fi":"no"==n.toLowerCase()?e="nb":"gr"==n.toLowerCase()?e="el":"ro"==n.toLowerCase()&&(e="ro"),e.toLowerCase()+"-"+n.toUpperCase()):""},d}(APP.segment||{}),false&&localStorage.setItem("segment_context_locale",APP.segment.getSegmentLocaleByUrl()),window.TrackEvents=function(e,t,n,i,o,a,r){var s=window.segment&&window.segment.CommonProps?JSON.parse(JSON.stringify(window.segment.CommonProps)):{},l=(i=i||jsUtility.getCookieKeyValPair("UserStatus","IsUserLoggedIn",","),s["Login Status"]=i&&"true"==i.toString().toLowerCase()?"TRUE":"FALSE",s.path=window.location.pathname,s.url=window.location.href,{});if(t)for(var c in t)t[c]&&(s[c]=t[c],l[c]=t[c]);s.visitId=jsUtility.get_Cookie("vsuid"),s.Platform="Web",s.$screen_height=screen.height,s.$screen_width=screen.width,"function"==typeof jsUtility.getDeviceType&&(s["device type"]=jsUtility.getDeviceType().toLowerCase()),segment_portal_name&&(s.Portal=segment_portal_name);i=APP.segment.getSegmentContext(n,a);switch(void 0!==i&&null!=i&&(s.locale=i),e){case"identify":FireSegmentIOIdentify(n,l,o,a);break;case"page":var g=jsUtility.get_Cookie("vstrType"),g=(s["Visitor Type"]=g?"Returning":"New",g||jsUtility.set_Cookie("vstrType",1,1825),APP.segment.getGAId());g&&s&&0<g.length&&(s.GA_Id=g),FireSegmentIOPage("",s);break;default:FireSegmentIOTrack(e,s,r)}APP.segment.setMixpanelPropsCookie(0)},window.TrackAlias=function(e){FireSegmentIOAlias(e)},window.FireSegmentIOIdentify=function(e,t,n,i){var o,a={},i=(null==(t=t||null)&&(t={}),APP.segment.getSegmentContext(e,i));"undefined"!=typeof analytics&&(o=APP.segment.getIntegrationObject(),e&&void 0!==i&&null!=i&&(t.locale=i),n&&(o.Iterable=!1),a.integrations=o,e?analytics.identify(e,t,a,APP.segment.clearUserTraits()):analytics.identify(t,a),analytics.ready(function(){void 0!==analytics.user&&analytics.user().traits({})}))},window.FireSegmentIOPage=function(e,t){try{var n;t=t||null,"undefined"!=typeof analytics&&(n=APP.segment.getIntegrationObject(),null!=t?analytics.page(e,t,{integrations:n}):analytics.page(e,{IsPropsNull:!0},{integrations:n}))}catch(e){console.log(e)}},window.FireSegmentIOTrack=function(e,t,n){try{var i;t=t||null,"undefined"!=typeof analytics?(i=APP.segment.getIntegrationObject(),null!=t?analytics.track(e,t,{integrations:i},n):analytics.track(e,{},{integrations:i},n),Array.isArray(analytics)&&n&&"function"==typeof n&&n()):n&&n()}catch(e){console.log(e)}},window.FireSegmentIOAlias=function(e){try{"undefined"!=typeof analytics&&analytics.alias(e,{integrations:APP.segment.getIntegrationObject()})}catch(e){console.log(e)}},window.TrackUTMEvents=function(e){var t,n={"UTM Source first touch":jsUtility.getParameterByName("utm_source"),"UTM Medium first touch":jsUtility.getParameterByName("utm_medium"),"UTM Term first touch":jsUtility.getParameterByName("utm_term"),"UTM Content first touch":jsUtility.getParameterByName("utm_content"),"UTM Campaign first touch":jsUtility.getParameterByName("utm_campaign")},i={};for(t in n)n[t]&&(i[t]=n[t]);i||FireSegmentIOIdentify(e,i,!1,!0)},window.TrackPageEvents=function(e,t){TrackPageEventsFinal(e,t)},window.TrackPageEventsFinal=function(e,t){"undefined"!=typeof mixpanel&&void 0!==mixpanel.get_distinct_id&&jsUtility.set_Cookie("screenWidth",window.innerWidth);var n,i={};for(n in e)e[n]&&(i[n]=e[n]);TrackEvents("page",i,null,t)},!true&&/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&APP.segment.load();