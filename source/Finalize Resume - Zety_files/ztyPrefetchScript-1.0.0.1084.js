var hostParts = window.location.host.split('.');
var env = 'local';
var blobFolder = 'qa/';
var contentPath = 'https://@@env.' + hostParts[1] + '.com/payment/contents/';
var baseUrl = 'https://@@env.' + hostParts[1] + '.com/payment';

var vendorBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/vendor.bundle-1.0.0.564.js';
var developerBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/app.bundle-1.0.0.564.js';
var plansBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/plans-1.0.0.564.bundle.js';
var appJsSrc = 'https://@@env.' + hostParts[1] + '.com/payment/scripts/app-1.0.0.564.js';
var bootstrapSrc = 'styles/bootstrap/bootstrap.min.css';
var fontAwesomeSrc = 'fonts/fontawesome5-subset/css/all.min.css';
var jQuerySrc = 'https://@@env.' + hostParts[1] + '.com/blob/common/scripts/jquery-3.5.1.min.js';
var googleFontsSrc = 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700|Source+Sans+Pro:200,300,400,600,700|Open+Sans:300,400,600,700,800|Roboto+Slab:100,300,400,700|Work+Sans:300,400,500,600,700|Merriweather:300,400,600,700';

var mainCssSrc = 'https://@@env.' + hostParts[1] + '.com/payment/stylesheets/zty/main-1.0.0.564.css';
var resFileName = 'dev.json';

var esShimSrc = 'scripts/es6/es6-shim.min.js';
var hkgrostekfont = 'styles/HKGrotesk/css/hkgrostekfont-1.0.0.564.css';
switch (hostParts[0]) {
case 'reg-builder':
    env = 'reg-assets';
    resFileName = 'reg-1.0.0.564.json';
    blobFolder = 'reg/';
    break;
case 'stg-builder':
    env = 'stg-assets';
    blobFolder = 'stg/';
    resFileName = 'stg-1.0.0.564.json';
    break;
case 'qa-builder':
    env = 'qa-assets';
    blobFolder = 'qa/';
    break;
case 'perf-builder':
    env = 'perf-assets';
    blobFolder = 'reg-1.0.0.564/';
    break;
case 'builder':
    env = 'assets';
    blobFolder = 'prod/';
    resFileName = 'prod-1.0.0.564.json';
    break;
}
var ecomJsonPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder +
    'zety.com/' + resFileName ;
var nrJsPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder + 'zety.com/nr.js';
var localizedTextJsonPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder +
    'zety.com/localizedText-1.0.0.564.json';
contentPath = contentPath.replace('@@env', env);

function prefetchFiles(src, callback) {
    var s, r, t;
    r = false;
    s = document.createElement('link');
    s.rel = 'prefetch';
    s.href = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete' || this.readyState == 'loaded')) {
            r = true;
            callback && callback();
        }
    };
    t = document.getElementsByTagName('link')[0];
    t.parentNode.insertBefore(s, t);
}

function loadImageFiles() {
    var imagBaseUrl = 'https://@@env.' + hostParts[1] + '.com';
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/zty/images/logo.svg');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/zty/images/loading.gif');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/bold-logo.png');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/hubert_baker.png');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/Heather_spielmaker.png');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/breadcrum-check-two.png');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/lc-sell-sprite.jpg');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/lc-sell-sprite.jpg');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/exe-girl.png');
    prefetchFiles(imagBaseUrl.replace('@@env', env) + '/blobimages/ecom/wlb/images/grey-arrow.png');
}

prefetchFiles(vendorBundleSrc.replace('@@env', env));		//prefetch vendor bundle
prefetchFiles(developerBundleSrc.replace('@@env', env));	//prefetch developer bundle
prefetchFiles(plansBundleSrc.replace('@@env', env));	//prefetch plans bundle
prefetchFiles(appJsSrc.replace('@@env', env));	//prefetch app JS 
prefetchFiles(contentPath + bootstrapSrc);						//prefetch bootstrap CSS
prefetchFiles(contentPath + fontAwesomeSrc);						//prefetch fontawesome CSS
prefetchFiles(jQuerySrc.replace('@@env', env));						//prefetch jQuery
prefetchFiles(contentPath + esShimSrc);
prefetchFiles(contentPath + hkgrostekfont);
prefetchFiles(googleFontsSrc);					//prefetch googleFonts CSS
prefetchFiles(mainCssSrc.replace('@@env', env));			//prefetch main CSS 
prefetchFiles(baseUrl.replace('@@env',env)+ '/stylesheets/zty/userTestimonial.css'); 
prefetchFiles(ecomJsonPath);            //prefetch ecom JSON
prefetchFiles(localizedTextJsonPath);
prefetchFiles(nrJsPath);
prefetchFiles(contentPath + 'styles/HKGrotesk/fonts/HKGrotesk-Regular.woff2');
prefetchFiles(contentPath + 'styles/HKGrotesk/fonts/HKGrotesk-SemiBold.woff2');
prefetchFiles(contentPath + 'styles/HKGrotesk/fonts/HKGrotesk-Light.woff2');
prefetchFiles(contentPath + 'styles/HKGrotesk/fonts/HKGrotesk-Bold.woff2');
prefetchFiles(contentPath + 'styles/font-awesome-5/webfonts/fa-solid-900.woff2');

var commonLocalizedTextJsonPath = baseUrl.replace('@@env', env) + '/contents/' + blobFolder +
    'common/localizedText-1.0.0.564.json';
prefetchFiles(commonLocalizedTextJsonPath);

loadImageFiles();										//prefect image files