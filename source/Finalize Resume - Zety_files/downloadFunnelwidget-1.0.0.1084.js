var dfBuildVersion = '1.0.0.118';
window.DFW = window.DFW || {};
window.RTN = window.RTN || {};
window.RDL=window.RDL||{};
DFW.renderCount = 0;
DFW.showPreDownloadPopup = false;
DFW.isDFBoldProAdExp = false;
DFW.isRemoveDOCXExp=false;
DFW.isLetterConfig = false;
DFW.DF_Exp_AdSlot = '';
DFW.isFRROneClickExp = false;
DFW.isFRROneClickMobExp = false;
DFW.resumeReasonOption = localStorage.getItem('resumereason') || 'jobs';
DFW.sessionStorageData = JSON.parse(sessionStorage.getItem("userinfo"));
DFW.FunnelType = {
  Download: 'Download'
}

DFW.DocType = {
  Resume: 'RSME',
  Letter: 'LETR'
}
DFW.FileExtension = {
  "PDF": "PDF",
  "TXT": "TXT",
  "DOCX": "DOCX",
  "SVG": "SVG",
  "JPG": "JPEG"
}

window.isIPAD = function () {
  var _isIPAD = false;
  if (navigator.userAgent.match(/iPad/i)) {
    _isIPAD = true;
  }
  else {
    _isIPAD = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)
  }
  return !!_isIPAD;
}

DFW.Widget = (function (scope) {
  function shouldLoadBundleUsingVersion() {
    if(DFW.Environment=="dev"){
      return false;
    }else{
      switch (DFW.PortalCd.toLowerCase()) {
        case "mpr":
        case "rbl":
        case "rna":
        case "cln":
        case "mpc":
        case "zty":
        case "lca":
        case "hlm":
        case "jbh":
		case "muk":
		case "mfr":
		case "mes":
		case "mit":
		case "mbr":
		case "mde":
		case "mnl":
		case "mmx":
		case "luk":
		case "lfr":
		case "lit":
		case "les":
		case "lpl":
		case "lde":
		case "lpt":
		case "lmx":
		case "lbr":
		case "lfi":
		case "lnl":
		case "lsa":
		case "lsw":
		case "ldk":
		case "lno":
		case "lgr":
		case "lro":
          return true;
        default:
          return false;
      }
    }
  }

  function getFileName(filePath) {
    const addVersion = shouldLoadBundleUsingVersion();
    if (addVersion) {
      const filePathArr = filePath.split(".");
      let lastItemIndex=filePathArr.length-1;
      let fileTypeExt =filePathArr[lastItemIndex];
      return filePath.replace(`.${fileTypeExt}`,`-${dfBuildVersion}.${fileTypeExt}`);
    }
    return filePath;
  }
  function wlbSupportFullDFNL () {
    if (DFW.Environment=="dev") {
      if(DFW.PortalCd == "mpr" || DFW.PortalCd == "lca") {
        addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/perfect/wlb/mainFullPage.css"));
      }else if(DFW.PortalCd == "rna") {
        addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/now/wlb/mainFullPage.css"));
      }
      if (window.location.pathname && (window.location.pathname.indexOf('/documenthome') > -1 || (DFW.Config.isNowPortal && window.location.pathname.indexOf('/dashboard') > -1))) {
        addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "/main.css"));
      }
    }else {
      if(DFW.PortalCd == "mpr" || DFW.PortalCd == "lca") {
        addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/perfect/wlb/mainFullPage.css"));
      }else if(DFW.PortalCd == "rna") {
        addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/now/wlb/mainFullPage.css"));
      }
      if (window.location.pathname && (window.location.pathname.indexOf('/documenthome') > -1 || (DFW.Config.isNowPortal && window.location.pathname.indexOf('/dashboard') > -1))) {
        addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "/main.css"));
      }
    }
  }
  function loadCss () {
    if(DFW.isFullPageDFExp || DFW.Config.baselineFullscreenDF || DFW.isFullScreenIntlDfnl || DFW.isCLFullPageFeatureEnabled){
      const modalDiv =  document.getElementById('modal');
      if (modalDiv == 'undefined' || modalDiv == null)
      {
        const elem = document.createElement('div');
        elem.setAttribute('id', 'modal');
        document.getElementsByTagName('body')[0].appendChild(elem);      
      }
    }
    const loadFullpagecss = DFW.isFullScreenIntlDfnl ? DFW.isFullScreenIntlDfnl : (GetDeviceTypeUsingUserAgent() == 'desktop' ? (DFW.isFullPageDFExp || DFW.Config.baselineFullscreenDF || DFW.isCLFullPageFeatureEnabled) : GetDeviceTypeUsingUserAgent() == 'tablet' ? DFW.Config.baselineFullscreenDF : false);
    if (DFW.Environment == "dev") {
      loadScript(getFileName(DFW.LocalBaseurl + "build/downloadfunnelwidget-bundle.js")).then(function () {
        DFW.BundleLoaded = true;
      }); 
      if (loadFullpagecss) {
        if(DFW.isFullScreenIntlDfnl){
          addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "jt/mainFullPage.css"));
        }
        else{
          let urlLinik =  window.location.href;
          let urlLinikSplit = urlLinik.split("?");
          if(urlLinikSplit[1] && urlLinikSplit[1].includes("wlbdemo") && readCookie("wlbdemo") == "wlb") {
            wlbSupportFullDFNL();
          } else {
            addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "/mainFullPage.css"));
            if (window.location.pathname && (window.location.pathname.indexOf('/documenthome') > -1 || (DFW.Config.isNowPortal && window.location.pathname.indexOf('/dashboard') > -1))) {
              addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "/main.css"));
            }
          }
        }
      }
      else {
        addLinkTag("stylesheet", getFileName(DFW.LocalBaseurl + "build/stylesheet/" + DFW.PortalCd + "/main.css"));
      }
    }
    else {
      loadScript(getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/downloadfunnelwidget-bundle.js")).then(function () {
        DFW.BundleLoaded = true;
      });
      //will remove mprjt code support from widget and should derived from DFW object.
  
      if (DFW.isINTLJoshua) {
        if(DFW.isFullScreenIntlDfnl){
          addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "jt/mainFullPage.css"));
        }
        else{
          addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "jt/main.css"));
        }
      }
      else if (loadFullpagecss) {
        if(DFW.isINTLFlow){
          addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "jt/mainFullPage.css"));
        } else {
          let urlLinik =  window.location.href;
          let urlLinikSplit = urlLinik.split("?");
          if(urlLinikSplit[1] && urlLinikSplit[1].includes("wlbdemo") && readCookie("wlbdemo") == "wlb" && (DFW.Environment.toLowerCase() == "qa" || DFW.Environment.toLowerCase() == "reg")) {
            wlbSupportFullDFNL();
          }else {
             addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "/mainFullPage.css"));
            if (window.location.pathname && (window.location.pathname.indexOf('/documenthome') > -1 || (DFW.Config.isNowPortal && window.location.pathname.indexOf('/dashboard') > -1))) {
              addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "/main.css"));
            }
          }
        }
      }
      else {
        addLinkTag("stylesheet", getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/stylesheet/" + DFW.PortalCd + "/main.css"));
      }
    }
  }
  let pseudoLocalFlag = GetQueryString("env") || readCookie("env");
  if (pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "") {
    setPseudoLocalCookie("env", pseudoLocalFlag, 18000);
  }

  var getLocalization = function() {
    if (DFW.loadAllConfigs) {
      let configFileNames = [];
      if (pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "" && pseudoLocalFlag != "loc") {
        configFileNames = [
          `config_${DFW.PortalCd}_${pseudoLocalFlag}.json`,
          `config_${DFW.PortalCd}_letr_${pseudoLocalFlag}.json`,
        ];
      } else {
        configFileNames = [
          `config_${DFW.PortalCd}.json`,
          `config_${DFW.PortalCd}_letr.json`,
        ]
      }
      let outputPromiseArr = [];
      for(let i = 0; i<configFileNames.length ; i++){
        let configFileName = configFileNames[i];
        DFW.isLetterConfig = configFileName.includes('_letr');
        outputPromiseArr.push(loadConfig(configFileName));
      }
      return outputPromiseArr;
    } else {
      let configFileName = "";
      if (DFW.docType == DFW.DocType.Letter || window.location.href.includes("build-letter")) {
        if (pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "" && pseudoLocalFlag != "loc") {
          configFileName = `config_${DFW.PortalCd}_letr_${pseudoLocalFlag}.json`;
        } else {
        configFileName = `config_${DFW.PortalCd}_letr.json`;
        }
      } else if (pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "" && pseudoLocalFlag != "loc") {
        configFileName = `config_${DFW.PortalCd}_${pseudoLocalFlag}.json`;
      } else {
        configFileName = `config_${DFW.PortalCd}.json`;
      }
      return [loadConfig(configFileName)];
    }
  };

  var handleCLAndCVLocalization = function(result, resolve) {
    let localizationFolderName = DFW.Config.localizationFolderName;
    DFW.cultureValue = DFW.Config.localizationFileName ? DFW.Config.localizationFileName : DFW.cultureValue;
    let url = `${(DFW.subDomainUrl || DFW.Baseurl)}blobcontent/dfnl/${DFW.Environment}/resource/${localizationFolderName}/${DFW.cultureValue}.json`;
    callAjax(url,"GET",false,false,handleLiteLocalization,resolve);
    handleLetterLocalization(result, resolve);
  }

  var getCLAndCVLocalization = function (resolve) {
    let configFileName = `config_${DFW.PortalCd}.json`;
    let cvUrl = isPseudoLocalization() ? (DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/pseudo_config_" + DFW.PortalCd + ".json" : getFileName((DFW.subDomainUrl || DFW.Baseurl) + "blobcontent/dfnl/" + DFW.Environment + "/"+configFileName);
    return new Promise(function (resolve, reject) {
        callAjax(cvUrl,"GET", false, false,
          function (result) {
            var cvData = JSON.parse(result);
            if(cvData && cvData.Config?.localizationFolderName) {
              handleConfig(cvData.Config);
              handleCLAndCVLocalization(result, resolve);
            }
            else {
              reject && reject();
            }
          }
        );
    }).then(function(data){
      resolve(data)
    });
  };

  var loadConfig = function(configFileName) { 
    return new Promise(function (resolve, reject) {
      let configUrl = "";
      if (DFW.loadCLAndCVLocalization) {
         getCLAndCVLocalization(resolve)
      } else {
        if (DFW.isTestBed) {
          configUrl = pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "" 
            ? DFW.subDomainUrl + "blobcontent/pwb/locales/common/" +
            configFileName 
            :getFileName(DFW.LocalBaseurl + "blobcontent/config_dev/" + configFileName);
        } else {
          configUrl = pseudoLocalFlag != null && pseudoLocalFlag != "null" && pseudoLocalFlag != "" 
            ? DFW.subDomainUrl + "blobcontent/pwb/locales/common/" +
            configFileName
            : getFileName((DFW.subDomainUrl || DFW.Baseurl) +
              "blobcontent/dfnl/" +
              DFW.Environment +
              "/" +
              configFileName);
        }
        callAjax(
          configUrl,
          "GET",
          false,
          false,
          handleLocalizationConfig,
          resolve
        );
      }
    });
  };

  function checkBrowserCompatibility() {
    DFW.BundleLoaded = false;
    var objAgent = navigator.userAgent;
    var objfullVersion = "" + parseFloat(navigator.appVersion);
    var objOffsetVersion;
    var legacyEditorURL;
    if (window.location.hostname) {
      legacyEditorURL =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/information/unsupportedbrowsers.aspx";
    } else {
      legacyEditorURL =
        window.location.origin + "/information/unsupportedbrowsers.aspx";
    }
    // In Microsoft internet explorer
    if ((objOffsetVersion = objAgent.indexOf("MSIE")) != -1) {
      objfullVersion = objAgent.substring(objOffsetVersion + 5);
      if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 9) {
        window.location = legacyEditorURL;
      }
    }
    // In Safari
    else if ((objOffsetVersion = objAgent.indexOf("Safari")) != -1) {
      objfullVersion = objAgent.substring(objOffsetVersion + 7);
      if ((objOffsetVersion = objAgent.indexOf("Version")) != -1) {
        objfullVersion = objAgent.substring(objOffsetVersion + 8);
        if (objfullVersion.substring(0, objfullVersion.indexOf(".")) <= 8) {
          window.location = legacyEditorURL;
        }
      }
    }
    Promise.all([
      ...getLocalization(), userClaimsPromise, getFeaturesPromise
    ])
      .then(function (claims) {
        return Promise.all([
          getExperimentsPromise(DFW.userId).then(() => {
            loadCss();
          }),
          handleCountryData(DFW.countryCd, DFW.Config.baselineResumeButton, DFW.Config.apiPathV2),
          isFreeRsmReviewAvailable(DFW.Config.ecomapiPathV1, DFW.userId, GetDeviceTypeUsingUserAgent()),
          isWebsiteCreated(DFW.Config.pwApiUrlV1, DFW.userId),
          getCoverLetterCountPromise(DFW.userId),
          getAllFeedbackToolDocComments(DFW.userId),
          getPaymentStatusPromise()
        ])
      })
      .then(function (data) {
        getUserPrefPromise.then(function (data) {
          // any action here
        });
        // isUserPremium(DFW.userId,DFW.Config.portalId,DFW.Config.apiPathV1);
      }).catch(err => {});
  }

  window.onload = checkBrowserCompatibility();

  function callAjax(
    url,
    method,
    async,
    withCredentials,
    callback,
    resolve,
    data
  ) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (callback)
          if (resolve) {
            callback(xmlhttp.responseText, resolve);
          } else {
            callback(xmlhttp.responseText);
          }
      } else if (xmlhttp.readyState == 4 && xmlhttp.status == 500) {
        if (callback) callback("");
      }
    };
    xmlhttp.open(method, url, async);
    if (withCredentials) xmlhttp.withCredentials = true;

    if (data) {
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(data);
    } else {
      xmlhttp.send();
    }
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  function addLinkTag(rel, path) {
    var _linkTag = document.createElement('link');
    _linkTag.rel = rel;
    _linkTag.href = path
    if (!document.head) {
      document.getElementsByTagName('head')[0].appendChild(_linkTag);
    }
    else {
      document.head.appendChild(_linkTag);
    }
  };

  const updateUserPref = (updatedPreference) => {
    if(DFW.UserPreferences){
      const isUserPrefExists = DFW.UserPreferences.find(userpref => userpref.code == updatedPreference.code);
      if(isUserPrefExists){
        let oldPreferences = DFW.UserPreferences.filter(userpref => userpref.code != updatedPreference.code)
        DFW.UserPreferences = [...oldPreferences, updatedPreference];
      } else {
        DFW.UserPreferences = [
          ...DFW.UserPreferences,
          updatedPreference
        ]
      }
      const existingSessionStorage = DFW.sessionStorageData;
      existingSessionStorage.userPreferences = DFW.UserPreferences;
      sessionStorage.setItem('userinfo', JSON.stringify(existingSessionStorage));
    }   
    
  }
  function renderDownloadFunnelWidget(data) {
    //  DFW.isPremium = true;
    DFW.isModalOpen = true;
    //DFW.userID = '36745b4c-3937-4269-b2ec-1c66f856a973';
    DFW.isSpecialUser = IsSVGEnabled(DFW.email, DFW.Config.emailDomain);
    // DFW.funnelMode = DFW.FunnelType.Download;
    if(DFW.Config && DFW.Config.portalCd && DFW.Config.portalCd.toUpperCase() == 'ZTY' && DFW.Config.isDFV2ExpBaselined && GetDeviceTypeUsingUserAgent() != 'desktop') {
      DFW.Config.isDFV2ExpBaselined = false;
    }

    var widgetProps;
    if (DFW.docType == DFW.DocType.Letter && DFW.loadAllConfigs) {
      widgetProps = {
        selector: DFW.Selector,
        localization: DFW.LetterLocalization,
        config: DFW.letterConfig,
        userProps: {
          userId: DFW.userId,
          isPremium: DFW.isPremium,
          funnelMode: DFW.funnelMode ? DFW.funnelMode : DFW.FunnelType.Download,
          email: DFW.emailParam ? DFW.emailParam : DFW.email,
          downloadFunnelV3Variant: DFW.downloadFunnelV3Variant ? DFW.downloadFunnelV3Variant : 1,
          resumeGuid: DFW.ResumeGuid,
          resumeName: DFW.ResumeName,
          isSurveyMandatory: false,
          userName: DFW.userName,
          surveyViewed: DFW.SurveyViewed,
          screenName: DFW.ScreenName,
          templateName: DFW.TemplateName,
          isAgent: DFW.isAgent,
          productCD: DFW.productCD,
          firstName: DFW.firstName,
          lastName: DFW.lastName,
          PortalCd: DFW.PortalCd,
          resumeReason: DFW.resumeReasonOption,
          methodOption: DFW.methodOption,
          countryCd: DFW.countryCd,
          downloadLinkExpVariant: GetDeviceTypeUsingUserAgent() == 'desktop' ? DFW.downloadLinkExpVariant : -1,
          downloadLinkMobExpVariant: GetDeviceTypeUsingUserAgent() == 'mobile' ? DFW.downloadLinkMobExpVariant : -1,
          enableColorProgressV2: DFW.enableColorProgressV2,
          docPreviewUrl: DFW.docPreviewUrl,
          isNowLetter:DFW.PortalCd == "rna" ? true : false,
          loadAllConfigs: DFW.loadAllConfigs,
          isBoldProAddSlotClnExpUser:GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.isBoldProAddSlotClnExpUser,
          isLetrPortal: DFW.Config.isLetrPortal ? true : false,
          openFullScreenDownloadFunnel: GetDeviceTypeUsingUserAgent() == 'desktop' ?  ((DFW.isFullPageDFExp || DFW.isCLFullPageFeatureEnabled) && DFW.docType == DFW.DocType.Letter) : false,
          fullScreenDownloadFunnelExpVariation: (GetDeviceTypeUsingUserAgent() == 'desktop' && DFW.docType == DFW.DocType.Letter) ? DFW.fullPageDFExpVariant : -1,
          isFullPageDFV2Exp: GetDeviceTypeUsingUserAgent() == 'desktop' ? !!DFW.Config.baselineFullPageDFV2Exp && !(DFW.isCLFullPageFeatureEnabled && DFW.docType == DFW.DocType.Letter) : false, 
          letrBoldProfilePublished: DFW.isWebsitePublished && DFW.isCLFullPageFeatureEnabled,
          isCLFullPageFeatureEnabled: DFW.isCLFullPageFeatureEnabled,
          isWebsiteCreated: DFW.isWebsiteCreated || !!DFW.isCLFullPageFeatureEnabled,
          boldProfilePublished: DFW.isWebsitePublished || !!DFW.isCLFullPageFeatureEnabled,    
          disableBoldProWebsite: DFW.isCLFullPageFeatureEnabled
        },
        isModalOpen: DFW.isModalOpen,
        TrackDFWWidgetEvent: TrackDFWWidgetEventCallback,
        SetUserPref: SetUserPreference,
        ErrorCallBack: DFW.ErrorCallBack,
        SuccessCallBack: DFW.SuccessCallBack,
        MobileCloseCallBack: DFW.MobileCloseCallBack,
        MobileOpenCallBack: DFW.MobileOpenCallBack,
        stopDownloadedEvent: DFW.stopDownloadedEvent,
        stopEmailedEvent: DFW.stopEmailedEvent,
        renderCount: DFW.renderCount++,
        resumeId: DFW.ResumeGuid,
        docType: DFW.DocType.Letter,
        selectedFileType: DFW.selectedFileFormat || DFW.FileExtension.PDF,
        colorProps: DFW.colorProps,
        dimensions: DFW.dimensions,
        enableQuickClose: DFW.enableQuickClose || DFW.Config.isQuickCloseEnable,
        isPopupCentered: DFW.isPopupCentered,
        customBackdropColor: DFW.customBackdropColor,
        deviceType: GetDeviceTypeUsingUserAgent(),
      };
    } else {
    widgetProps= {
      selector: DFW.Selector,
      localization: DFW.Localization,
      config: DFW.Config,
      userProps: {
        userId: DFW.userId, isPremium: DFW.isPremium, funnelMode: DFW.funnelMode ? DFW.funnelMode : DFW.FunnelType.Download, email: DFW.emailParam ? DFW.emailParam : DFW.email, resumeGuid: DFW.ResumeGuid, resumeName: DFW.ResumeName, isSurveyMandatory: false
        , userName: DFW.userName, surveyViewed: DFW.SurveyViewed, expVariant: getBoldProAdVariant() || DFW.DF_Exp_Var, screenName: DFW.ScreenName, templateName: DFW.TemplateName, isAgent: DFW.isAgent, productCD: DFW.productCD,
        firstName: DFW.firstName, lastName: DFW.lastName, PortalCd: DFW.PortalCd,
        showResumeTracking: DFW.showResumeTracking, showPreDownloadPopup: DFW.showPreDownloadPopup, resumeReason: DFW.resumeReasonOption, boldProfilePublished: DFW.isWebsitePublished || !!DFW.disableBoldProWebsite, isDFBoldProAdExp: DFW.isDFBoldProAdExp, isBoldProAdV2Baselined: DFW.Config.isBoldProAdV2Baselined, isRsmReviewAdExp: DFW.isFreeReviewAvailable, bigInterviewPref: DFW.BigInterViewPref, isMobileDownloadFunnel: DFW.isMobileDownloadFunnel, methodOption: DFW.methodOption, resumeCheckDFAdExpVariant: DFW.resumeCheckDFAdExpVariant,
        resumeCheckAdSlotMinScoreReq: DFW.Config.resumeCheckAdSlotMinScoreReq, countryCd: DFW.countryCd, resumeScore: DFW.resumeScore, isINTLFlow: DFW.isINTLFlow,
        isBoldProAdBaselined: DFW.Config.isBoldProAdBaselined || false, isDFV2ExpBaselined: DFW.Config.isDFV2ExpBaselined || false, baselineDfnl: DFW.baselineDfnl, downloadFunnelV2ExpVariant: GetDeviceTypeUsingUserAgent() == 'mobile' ? '' : DFW.downloadFunnelV2ExpVariant, isDownloadFunnelMobileV2: GetDeviceTypeUsingUserAgent() == 'mobile' && (DFW.Config.isdownloadFunnelMobileBaselined || DFW.mobileDownloadFunnelV1Exp || DFW.isMobileIntlDownloadFunnel || DFW.Config.baselineBoldProOptMobVar) ? DFW.Config.isdownloadFunnelMobileBaselined || DFW.mobileDownloadFunnelV1Exp || DFW.isMobileIntlDownloadFunnel || DFW.Config.baselineBoldProOptMobVar : '', isMobMtNotRequired: DFW.isMobMtNotRequired,
        downloadFunnelV3Variant: DFW.downloadFunnelV3Variant ? DFW.downloadFunnelV3Variant : 1, letterToCVDict: window.RDL.letterToCVDict,
        boldProfileDFVariant: GetDeviceTypeUsingUserAgent() == 'mobile' || DFW.isWebsiteCreated ? -1 : DFW.boldProfileDFAdExpVariant,
        downloadLinkExpVariant: GetDeviceTypeUsingUserAgent() == 'desktop' ? DFW.downloadLinkExpVariant : -1, 
        downloadLinkMobExpVariant: GetDeviceTypeUsingUserAgent() == 'mobile' ? DFW.downloadLinkMobExpVariant : -1,
        enableColorProgressV2: DFW.enableColorProgressV2, docPreviewUrl: DFW.docPreviewUrl,
        isMobileIntlDownloadFunnel: GetDeviceTypeUsingUserAgent() == 'mobile' && DFW.isMobileIntlDownloadFunnel,
        isFeedbackAdScreenEnable: DFW.isFeedbackAdScreenEnable,
        newRetentionBundle: DFW.newRetentionBundle,
        openFullScreenDownloadFunnel: DFW.isFullScreenIntlDfnl ? DFW.isFullScreenIntlDfnl : GetDeviceTypeUsingUserAgent() == 'desktop' ? (DFW.Config.baselineFullscreenDF || ((DFW.isFullPageDFExp || DFW.isCLFullPageFeatureEnabled) &&  DFW.docType == DFW.DocType.Letter)|| DFW.isFullScreenIntlDfnl) : GetDeviceTypeUsingUserAgent() == 'tablet' ? (DFW.Config.baselineFullscreenDF || DFW.isFullScreenIntlDfnl) : false,
        fullScreenDownloadFunnelExpVariation: (GetDeviceTypeUsingUserAgent() == 'desktop' && DFW.docType == DFW.DocType.Letter) ? DFW.fullPageDFExpVariant : -1,
        baselineFullscreenDF: DFW.Config.baselineFullscreenDF || DFW.isFullScreenIntlDfnl,
        isFullPageDFV2Exp: GetDeviceTypeUsingUserAgent() == 'desktop' ? !!DFW.Config.baselineFullPageDFV2Exp : false,
        isWebsiteCreated: DFW.isWebsiteCreated || !!DFW.disableBoldProWebsite,
        resumeDateModified: DFW.resumeDateModified,
        isResumeInReview: DFW.isResumeInReview,
        baselineBoldProOptMobVar: GetDeviceTypeUsingUserAgent() == 'mobile' && (DFW.isPremium || DFW.paymentStatus == 'Expired' || DFW.Config.isBoldProFree) && DFW.Config.baselineBoldProOptMobVar, 
        isRemoveDOCXExp: DFW.isRemoveDOCXExp && DFW.skinCD && !DFW.Config.skinCD.includes(DFW.skinCD),
        buildLetterUrl: DFW.Config.buildLetterUrl,
        profileUrl: DFW.Config.profileUrl,
        coverLetterCount: (!isNaN(DFW.totalCoverLetters) && DFW.totalCoverLetters > -1) ? DFW.totalCoverLetters : DFW.coverLetterCount,
        isFreeReviewAvailable: DFW.isFreeReviewAvailable,
        isBoldProFree: DFW.Config.isBoldProFree || false,
        profileData: DFW.profileData,
        loadAllConfigs: DFW.loadAllConfigs,
        boldProOptInCopyExpVariant: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.boldProOptInCopyExpVariant,
        feedbackToolShareableUrl: `${DFW.Baseurl}feedback/document/${DFW.ResumeGuid}`,    
        disableBoldProWebsite:DFW.disableBoldProWebsite,
         isINTLCLFunnelFP:DFW.isINTLCLFunnelFP,
         paymentStatus : DFW.paymentStatus,
         isNoFRRAdBaslined: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.Config.isNoFRRAdBaslined,
         isNoRCFeatureExp: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.Config.isNoRCFeatureExp,
         resumeLinkExp : GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.resumeLinkExpVariant > 2 ? DFW.resumeLinkExpVariant : -1,
         fRROneClickExpVariant: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.isFRROneClickExp ? DFW.fRROneClickExpVariant : -1,
         fRROneClickMobExpVariant: GetDeviceTypeUsingUserAgent() == 'mobile' && DFW.isFRROneClickMobExp ? DFW.fRROneClickMobExpVariant : -1,
         multiChoiceFrontExpVariant: GetDeviceTypeUsingUserAgent() == 'desktop' && DFW.multiChoiceFrontExpVariant > 2 ? DFW.multiChoiceFrontExpVariant : -1,
         isBoldProAddSlotExpUser:GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.isBoldProAddSlotExpUser,
         isBoldProAddSlotClnExpUser:GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.docType == DFW.DocType.Letter && DFW.isBoldProAddSlotClnExpUser,
         isRsmShareTaken: DFW.feedbackCommentsData && DFW.feedbackCommentsData[DFW.ResumeGuid] ? true : false,
         rexOrderId: DFW.rexOrderId || 0,
         isLetrPortal: DFW.Config.isLetrPortal || (DFW.isCLFullPageFeatureEnabled && DFW.docType == DFW.DocType.Letter) ? true : false,
         adSlotOptOutExpVariant: GetDeviceTypeUsingUserAgent() != 'mobile' ? DFW.adSlotOptOutExpVariant : -1,
         userPreferences: DFW.UserPreferences,
         updateUserPref: updateUserPref,
         isFreeDownloadExpUser : GetDeviceTypeUsingUserAgent() != 'mobile' ? (DFW.isFreeDownloadExpUser && !DFW.isPremium) : -1, 
         letrBoldProfilePublished: DFW.isCLFullPageFeatureEnabled && DFW.docType == DFW.DocType.Letter ? DFW.isWebsitePublished : true,
         isCLFullPageFeatureEnabled: DFW.isCLFullPageFeatureEnabled && DFW.docType == DFW.DocType.Letter,
         isContextual: DFW.Config.isContextual,
         isMPCLPlainTextFetureEnabled: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.docType == DFW.DocType.Letter ? DFW.isMPCLPlainTextFetureEnabled:false,
         isdownloadLinkFeatureEnabled: GetDeviceTypeUsingUserAgent() == 'desktop'  && DFW.isdownloadLinkFeatureEnabled,
         isBoldProTransitionFeatureEnabled: GetDeviceTypeUsingUserAgent() != 'mobile' && DFW.docType != DFW.DocType.Letter ? DFW.isBoldProTransitionFeatureEnabled : false,
         webinarLandingPageExpVariant: GetDeviceTypeUsingUserAgent() == 'desktop' && DFW.docType != DFW.DocType.Letter && DFW.webinarLandingPageExpVariant ? DFW.webinarLandingPageExpVariant : -1,
      },
      isModalOpen: DFW.isModalOpen,
      TrackDFWWidgetEvent: TrackDFWWidgetEventCallback,
      SetUserPref: SetUserPreference,
      onWebsiteLinkToggle: DFW.onWebsiteLinkToggle,
      onRepublishWebsite: DFW.onRepublishWebsite,
      ErrorCallBack: DFW.ErrorCallBack,
      SuccessCallBack: DFW.SuccessCallBack,
      MobileCloseCallBack: DFW.MobileCloseCallBack,
      MobileOpenCallBack: DFW.MobileOpenCallBack,
      stopDownloadedEvent: DFW.stopDownloadedEvent,
      stopEmailedEvent: DFW.stopEmailedEvent,
      renderCount: DFW.renderCount++,
      resumeId: DFW.ResumeGuid,
      docType: DFW.docType == DFW.DocType.Letter ? DFW.DocType.Letter : DFW.DocType.Resume,
      isEuropeonResume: DFW.isEuropeonResume,
      selectedFileType: DFW.selectedFileFormat || DFW.FileExtension.PDF,
      colorProps: DFW.colorProps,
      dimensions: DFW.dimensions,
      enableQuickClose: DFW.enableQuickClose || DFW.Config.isQuickCloseEnable,
      isPopupCentered: DFW.isPopupCentered,
      customBackdropColor: DFW.customBackdropColor,
      deviceType: GetDeviceTypeUsingUserAgent()
    }
  }
    var downloadFunnelWidget = OBLibDFW.default.DownloadFunnel.new(widgetProps);
    downloadFunnelWidget.render();

    function getBoldProAdVariant() {
      if (DFW.Config.isBoldProAdBaselined && DFW.DF_Exp_AdSlot < 3)
        return '2';
      return DFW.DF_Exp_AdSlot;
    }
  };

  function GetDeviceTypeUsingUserAgent() {
    var device_type = 'desktop';
    if(navigator.userAgent?.match('Macintosh')?.length > 0 && navigator?.maxTouchPoints > 0) {
      device_type = 'tablet';
    } else if (navigator.userAgent.match(/iPad|Tablet|PlayBook/i)) {
      device_type = 'tablet';
    } else if (navigator.userAgent.match(/Mobile|Android|webOS|iPhone|iPod|Blackberry/i)) {
      device_type = 'mobile';
    }
    
    return device_type;
  }

  var getCoverLetterCountPromise = function (userId) {
    return new Promise(function (resolve, reject) {
      if( DFW.Config.isNoRCFeatureExp || DFW.Config.isNoFRRAdBaslined){
        let reqPayload = {
          userId,
          portalId: DFW.Config.portalId,
          documentType: "letr",
          apiUrl: DFW.Baseurl,
        };
        const url = `${reqPayload.apiUrl}eb/api/v1/documents/getdocumentcount?userId=${reqPayload.userId}&portalId=${reqPayload.portalId}&docTypeCd=${reqPayload.documentType}`;
        callAjax(url, "GET", false, true, function (result) {
          if (!isNaN(result)) {
            DFW.coverLetterCount = result;
          }
        });
      }
      
    });
  };

  const getXsiteValue = () => {
    switch (DFW.Config.portalCd) {
      case "mpr":
        return "MPRUS";
    }
  };

  let getAllFeedbackToolDocComments = function (userId) {
    if (getUserExperimentVariant(DFW.Config.multiChoiceFrontExpId) > 2) {
      let feedbackToolDocId = localStorage.getItem("feedbackToolDocId");
      let feedbackToolCommentCount = localStorage.getItem(
        "feedbackToolCommentCount"
      );
      if (feedbackToolDocId && feedbackToolCommentCount) {
        DFW.feedbackCommentsData = {};
        return new Promise((resolve, reject) => {
          DFW.feedbackCommentsData[feedbackToolDocId] = {
            noOfComments: feedbackToolCommentCount,
          };
          resolve();
        });
      }
      return new Promise(function (resolve, reject) {
        const xSite = getXsiteValue();
        const url = DFW.Config.feedbackToolUrl + "/getusercomments"
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-site": xSite,
          },
          body: JSON.stringify({
            query: `{
            feedbackTool_GetDocumentsbyUserId(userId: "${userId}") {
              documentId
              noOfComments
            }
          }`,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (
              res.data &&
              Array.isArray(res.data.feedbackTool_GetDocumentsbyUserId)
            ) {
              DFW.feedbackCommentsData = {};
              res.data.feedbackTool_GetDocumentsbyUserId.forEach((docData) => {
                DFW.feedbackCommentsData[docData.documentId] = {
                  noOfComments: docData.noOfComments,
                };
              });
            }
          });
      });
    }
  };

  function handleConfig(config) {
    if (GetDeviceTypeUsingUserAgent() == "mobile" && config.mobile) {
      DFW.Config = { ...config, ...config.mobile };
    } else if (DFW.loadAllConfigs && DFW.isLetterConfig) {
      DFW.letterConfig = config;
    } else {
      DFW.Config = config;
    }
  }

  function processMobileLocalization(configObj, localizedObj){
    for(var key in configObj) {
        let val = configObj[key];
        if(val) {
          if(localizedObj[val]) {
              localizedObj[key] = localizedObj[val];
          }
        }
    }
  }
  function handleProcessLocalization(data) {
    if( GetDeviceTypeUsingUserAgent() == 'mobile' && data.Config && data.Config.localizedMappingMobile){
      processMobileLocalization(data.Config.localizedMappingMobile, data.Localization)
      DFW.Localization = data.Localization;
    } else if (DFW.loadAllConfigs && DFW.isLetterConfig) {
      DFW.LetterLocalization = data.Localization;
    } 
    else{
      DFW.Localization = data.Localization;
    }
  }

  function handleLocalization(result, resolve) {
    var data = JSON.parse(result);
    if (data && data.Localization) {
	  handleProcessLocalization(data);
	  handleConfig(data.Config);
	  if (DFW.downloadFunnelV2) {
        DFW.Config.moreSurveyOption = true;
        DFW.Config.isAppMessagingView = true;
	  }
	  window.globalCompVars = window.globalCompVars || {};
	  window.globalCompVars.BaseApiUrl = window.globalCompVars.BaseApiUrl || data.Config.apiPathV1;
	  window.globalCompVars.BaseApiUrlV2 = window.globalCompVars.BaseApiUrlV2 || data.Config.apiPathV2;
    }
    if (resolve) resolve(data);
  }

  function handleLiteLocalization(result, resolve) {
    var data = JSON.parse(result);
    if (data) {
		  handleProcessLocalization({Config: DFW.Config, Localization: data});
      if(DFW.loadCLAndCVLocalization) {
        DFW.Localization_rsme = data;
      }
	      for(var key in data) {
	        if(key.indexOf('%') != -1) {
	          let values = key.split('%');
	          if(values.length > 1) {
	            if(DFW.Config[values[0]]) {
	              DFW.Config[values[0]][values[1]] = data[key];
	            }
	            else {
	              DFW.Config[values[0]] = {};
	              DFW.Config[values[0]][values[1]] = data[key];
	            }
	          }
	        }
	      };
		  window.globalCompVars = window.globalCompVars || {};
		  window.globalCompVars.BaseApiUrl = window.globalCompVars.BaseApiUrl || DFW.Config.apiPathV1;
		  window.globalCompVars.BaseApiUrlV2 = window.globalCompVars.BaseApiUrlV2 || DFW.Config.apiPathV2;
    }
    if (resolve) resolve(data);
  }

  function handleLetterLocalization(result, resolve) {
    let localizationFolderName = DFW.Config.localizationFolderName + "_letr";
    DFW.cultureValue = DFW.Config.localizationFileName ? DFW.Config.localizationFileName : DFW.cultureValue;
    var url = `${(DFW.subDomainUrl || DFW.Baseurl)}blobcontent/dfnl/${DFW.Environment}/resource/${localizationFolderName}/${DFW.cultureValue}.json`;
    callAjax(url,"GET",false,false,function(result, resolve) {
      var clData = JSON.parse(result);
      if (clData) {
        DFW.Localization_letr = clData;
        resolve && resolve(clData);
      }
    },resolve);
  }


  function handleLocalizationConfig(result, resolve) {
    let data = JSON.parse(result);
    let containsSeparateConfig = data.Config?.localizationFolderName ? true: false;
    if(DFW.isLitePortal || containsSeparateConfig) {
      let localizationFolderName = containsSeparateConfig ? data.Config.localizationFolderName :"lc";
      DFW.cultureValue = (containsSeparateConfig && !DFW.isLitePortal) ? data.Config.localizationFileName: DFW.cultureValue;
      if(DFW.isLitePortal && DFW.cultureValue == "en") {
        data.Config = {...data.Config, ...data.Config.en};
      }
      var configUrl = `${(DFW.subDomainUrl || DFW.Baseurl)}blobcontent/dfnl/${DFW.Environment}/resource/${localizationFolderName}/${DFW.cultureValue}.json`;
		  handleConfig(data.Config);
		  callAjax(
        configUrl,
        "GET",
        false,
        false,
        handleLiteLocalization,
        resolve
		  );
    }
    else {
		  handleLocalization(result, resolve);
    }
  }
	
  var userClaimsPromise = new Promise(function (resolve, reject) {
    if (DFW.sessionStorageData && DFW.sessionStorageData.userclaims){
      handleClaims(JSON.stringify(DFW.sessionStorageData.userclaims));
      resolve && resolve(true);
    } else {
      callAjax(
        DFW.Baseurl +
        "signin/accounts/v4/getclaims",
        "POST",
        false,
        true,
        handleClaims,
        resolve
      );
    }
  });

  var getUserPrefPromise = new Promise(function (resolve, reject) {
    if (DFW.sessionStorageData && DFW.sessionStorageData.userPreferences){
      handlePreferences(DFW.sessionStorageData.userPreferences, '', true);
      resolve && resolve(true);
    } else {
      callAjax(
        DFW.Baseurl +
        "eb/api/v1/userpreferences/" + DFW.userId + '?' +
        encodeURI(document.referrer) +
        "&cookieEnabled=" +
        navigator.cookieEnabled,
        "GET",
        false,
        true,
        handlePreferences,
        resolve
      );
    }
  });

  var getUserDocument = function (url) {
    return new Promise(function (resolve, reject) {
      callAjax(
        DFW.Baseurl + "eb/api/v1/documents/" + DFW.userId + '/' + DFW.ResumeGuid,
        "GET",
        false,
        true,
        handleDocument,
        resolve
      );
    });
  }

  var getResumeTrackingInfo = function (url) {
    return new Promise(function (resolve, reject) {
      callAjax(
        DFW.Config.resumeBaseUrl + "resumebutton/getresumetracking/resumeid/" + DFW.ResumeGuid,
        "GET",
        false,
        true,
        handleResumeTrackingInfo,
        resolve
      );
    });
  }

  function handleResumeTrackingInfo(result, resolve) {
    var resumeTrackingInfo = JSON.parse(result);
    if (resumeTrackingInfo) {
      const emptyButtonTrackingInfo = Array.isArray(resumeTrackingInfo.buttonTrackingInfo) &&
        resumeTrackingInfo.buttonTrackingInfo.find(x => !x.uniquedId);
      const nonEmptyTrackingCount = Array.isArray(resumeTrackingInfo.buttonTrackingInfo) &&
        resumeTrackingInfo.buttonTrackingInfo.filter(x => x.uniquedId).length;
      resolve({ emptyButtonTrackingInfo, nonEmptyTrackingCount });
    }
  }

  function handleDocument(result, resolve) {
    var document = JSON.parse(result);
    if (document && document.id) {
      const hasButtons = Array.isArray(document.sections) &&
        document.sections.findIndex(x => x.sectionTypeCD === 'BUTN') > -1;
      resolve(hasButtons);
    }
  }


  function handlePreferences(result, resolve, dataFromSessionStorage) {
    var data = [];
    if (dataFromSessionStorage) {
      data = result;
    }
    else {
      data = JSON.parse(result);
    }
    if (data) {
      DFW.UserPreferences = data;
      DFW.BigInterViewPref = data.find(function (item) {
        return DFW.Config && item.code == DFW.Config.bigInterviewUserPref && item.value == "1";
      }) ? true : false;
      if (data.find(function (item) {
        return DFW.Config && item.code == DFW.Config.surveyUserPref && item.value == "1";
      })) {
        DFW.SurveyViewed = true;
      }
      else {
        DFW.SurveyViewed = false;
      }
    }
  }

  var isFreeRsmReviewAvailable = function (apiUrl, userId, deviceType) {
    return new Promise(function (resolve, reject) {
      if (DFW.Config.isNowPortal || DFW.Config.isNoFRRAdBaslined ) {
        if (DFW.sessionStorageData && DFW.sessionStorageData.reviewPurchaseStatus){
          let purchaseStatus = DFW.sessionStorageData.reviewPurchaseStatus;
          const isFRRAvail = purchaseStatus && !purchaseStatus.is_purchased;
          DFW.isFreeReviewAvailable = isFRRAvail;
          resolve && resolve(true);
        } else {
          callAjax(
            apiUrl +
            "payments/" +
            userId +
            "/DRR/purchased-upsell?subscriptionStatus=ACTV&deviceType=" +
            deviceType,
            "GET",
            false,
            true,
            function (result) {
              try {
                var data = JSON.parse(result);
                if (data) {          
                  const isFRRAvail = data && !data.is_purchased;
                  DFW.isFreeReviewAvailable = isFRRAvail;         
                  resolve && resolve(true);
                } else {
                  reject && reject();
                }
              } catch(err) {
                reject && reject();
              }            
            }
          );
        }
      } else {
        DFW.isFreeReviewAvailable = false;
      }
    });
  };

  const getResumeReviewStageByStepCd = (stepCD) => {
    let stepId = 1;
    const RsmReviewSteps = [
      {
        id: 1,
        stepCD: "",
      },
      {
        id: 2,
        stepCD: "NEWDOC",
      },
      {
        id: 3,
        stepCD: "INPROC",
      },
      {
        id: 4,
        stepCD: "SUBMIT",
      },
      {
        id: 5,
        stepCD: "ASSIGN",
      },
      {
        id: 6,
        stepCD: "APPROV",
      },
      {
        id: 7,
        stepCD: "RESEND",
      },
    ];
    if (RsmReviewSteps && RsmReviewSteps.length > 0) {
      let stage = RsmReviewSteps.find((x) => x.stepCD == stepCD);
      if (stage) {
        stepId = stage.id;
      }
    }
    return stepId;
  };

  var isWebsiteCreated = function (apiUrl, userId) {
    return new Promise(function (resolve, reject) {
      if(DFW.Config.isIntl){
        resolve && resolve(true);
      }
      
      else if (DFW.boldProfileDFAdExpVariant > 2 ||  DFW.Config.baselineFullscreenDF || DFW.Config.isNowPortal || DFW.Config.getProfileData || DFW.isFullScreenIntlDfnl|| DFW.isBoldProAddSlotExpUser || DFW.isBoldProAddSlotClnExpUser || (DFW.isCLFullPageFeatureEnabled && DFW.docType == DFW.DocType.Letter)) {
        callAjax(
          apiUrl + 'users/' + userId + '/websites?isDocumentRequired=false',
          "GET",
          false,
          true,
          function (result) {
            var data = JSON.parse(result);
            if (data) {
              if(data && data.length > 0){
                let isDraftMode = data.length == 1 && data.some(el => el.publishStatusCd === "DRFT");
                if (DFW.Config.showOptInDrftMode && isDraftMode) {
                  DFW.isWebsiteCreated = false;
                }
                else {
                  DFW.isWebsiteCreated = true;
                }
                const isPublished = data.some(el => el.publishStatusCd === "PUBS");
                DFW.isWebsitePublished=isPublished
              }else{
                DFW.isWebsiteCreated = false;
              }
              
              DFW.profileData = data;
              resolve && resolve(true);
            } else {
              reject && reject();
            }
          }
        );
      }
      else {
        DFW.isWebsiteCreated = false;
      }
    })
  };
  var handleCountryData = function (country, baselineResumeButton, apiUrl) {
    return new Promise(function (resolve, reject) {
      if (baselineResumeButton) {
        if (!country) {
          callAjax(
            apiUrl +
            'user/claims/3?claimsByUser=true',
            "GET",
            false,
            true,
            function (result) {
              var data = JSON.parse(result);
              if (data) {
                DFW.countryCd = data && data.countryCode;
                DFW.showResumeTracking = DFW.countryCd == 'US' && GetDeviceTypeUsingUserAgent() == 'desktop'
                resolve && resolve(true);
              }
              else {
                reject && reject();
              }
            }
          )
        }
        else {
          DFW.showResumeTracking = country == "US" && GetDeviceTypeUsingUserAgent() == 'desktop';
        }
      }
      else {
        DFW.showResumeTracking = false;
      }
    })
  };

  // function isUserPremium(userUid,productId,baseApi) {
  //     callAjax(
  //     baseApi +
  //     "users/ispremium/" +
  //     userUid +
  //     "/" +
  //     productId,
  //     "GET",
  //     true,
  //     true,
  //     premiumUserDetail
  //     );
  // }
  // function premiumUserDetail(result, resolve) {
  //     var isPremiumUser = false;
  //     isPremiumUser = JSON.parse(result);
  //     DFW.isPremium=isPremiumUser;
  // }
  function getUserExperimentVariant(experimentId) {
    let experimentDetails = {};
    let urlParamDisabletests = getUrlParam('disabletests');
	let cookievalDisbaleTest = readCookie('disabletests');
    let urlParamRunTest = getUrlParam('runtest');
    let cookieValRunTest = readCookie('runtest');
	
    let variant = getDisableRunTestVariant(experimentId);
    if (!(urlParamDisabletests == 1 || cookievalDisbaleTest == 1) && variant < 0 && RTN.UserExperiments && RTN.UserExperiments.length > 0) {
      experimentDetails = RTN.UserExperiments.filter(exp => exp.experiment_uid == experimentId)[0];
      variant = experimentDetails && experimentDetails.variant ? experimentDetails.variant : -1;
    }
	
    if(variant < 0 && (urlParamDisabletests == 1 || cookievalDisbaleTest == 1) && (!urlParamRunTest || !cookieValRunTest)) {
      return -1;
    }
    else {
      return variant;
    }
  }

  function getUrlParam(key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString(),
      domain = "domain=" + window.location.hostname.substring(window.location.hostname.indexOf("."));
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain;
  }

  function setPseudoLocalCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString(),
      domain = "domain=" + window.location.hostname;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + domain;
  }

  function isPseudoLocalization() {
    if (GetQueryString("pseudolocal") == 1 || readCookie("pseudolocal") == 1) {
      if (readCookie("pseudolocal") == null) {
        setCookie("pseudolocal", "1", 18000);
      }
      return true;
    }
    else return false;
  }
  function getDisableRunTestVariant(expId) {
    let caseIndex = -1;
    let disabletests, runtest;
    let urlParamDisabletests = getUrlParam('disabletests');
    let urlParamRunTest = getUrlParam('runtest');

    let cookievalDisbaleTest = readCookie('disabletests');
    let cookieValRunTest = readCookie('runtest');

    if (urlParamDisabletests || urlParamRunTest) {
      disabletests = parseInt(urlParamDisabletests);
      runtest = urlParamRunTest;
      //write cookie 
      setCookie("disabletests", disabletests, 1);
      setCookie("runtest", runtest, 1)
    }
    else if (cookieValRunTest && cookievalDisbaleTest) {
      disabletests = cookievalDisbaleTest;
      runtest = cookieValRunTest;
    }
	
    if (runtest) {
      let tests = runtest.split(',');
      if (disabletests && disabletests == 1) {
        let result = tests.map(test => {
          caseIndex = test.indexOf(expId + "_") > -1 ? test.charAt(test.length - 1) : caseIndex;
          return test;
        });
      }
    }
    return parseInt(caseIndex);
  }

  var getExperimentsPromise = function (userID) {
    const updatedDFWConfig = DFW.loadAllConfigs ? {...DFW.letterConfig, ...DFW.Config} : DFW.Config;
    return new Promise(function (resolve, reject) {
      if (DFW.viewVariation || updatedDFWConfig.disbaleGetExperiment) {
        resolve(true);
      }
      else if (RTN.UserExperiments) {
        DFW.showPreDownloadPopup = updatedDFWConfig.rnaUpdateDFExpId && getUserExperimentVariant(updatedDFWConfig.rnaUpdateDFExpId) > 3;
        DFW.isDFBoldProAdExp = updatedDFWConfig.boldProDFAdExp && getUserExperimentVariant(updatedDFWConfig.boldProDFAdExp) > 2;
        updatedDFWConfig.boldProDFAdExp ? DFW.DF_Exp_AdSlot = getUserExperimentVariant(updatedDFWConfig.boldProDFAdExp) : '';
        DFW.isResumeCheckDFAdExp = updatedDFWConfig.resumeCheckDFAdExp && getUserExperimentVariant(updatedDFWConfig.resumeCheckDFAdExp) > 2;
        DFW.downloadFunnelV2ExpVariant = updatedDFWConfig.downloadFunnelV2Exp && getUserExperimentVariant(updatedDFWConfig.downloadFunnelV2Exp);
        DFW.boldProfileDFAdExpVariant = updatedDFWConfig.boldProfileDFAdExp && getUserExperimentVariant(updatedDFWConfig.boldProfileDFAdExp);
        DFW.downloadLinkExpVariant = updatedDFWConfig.downloadLinkExp && getUserExperimentVariant(updatedDFWConfig.downloadLinkExp);
        DFW.downloadLinkMobExpVariant = updatedDFWConfig.downloadLinkMobExp && getUserExperimentVariant(updatedDFWConfig.downloadLinkMobExp);
        DFW.mobileDownloadFunnelV1ExpVariant=updatedDFWConfig.mobileDownloadFunnelExpV1 && getUserExperimentVariant(updatedDFWConfig.mobileDownloadFunnelExpV1);
        DFW.mobileDownloadFunnelV1Exp=updatedDFWConfig.mobileDownloadFunnelExpV1 && getUserExperimentVariant(updatedDFWConfig.mobileDownloadFunnelExpV1)>2;
        DFW.isFullPageDFExp = updatedDFWConfig.fullPageDFExp && getUserExperimentVariant(updatedDFWConfig.fullPageDFExp) > 2;
        DFW.fullPageDFExpVariant = updatedDFWConfig.fullPageDFExp && getUserExperimentVariant(updatedDFWConfig.fullPageDFExp);
        DFW.isRemoveDOCXExp = updatedDFWConfig.removeDOCXExpId && getUserExperimentVariant(updatedDFWConfig.removeDOCXExpId) > 2;
        DFW.boldProOptInCopyExpVariant = updatedDFWConfig.boldProOptInCopyExp && getUserExperimentVariant(updatedDFWConfig.boldProOptInCopyExp);
        DFW.isFRROneClickExp = updatedDFWConfig.fRROneClickExp && getUserExperimentVariant(updatedDFWConfig.fRROneClickExp) > 2;
        DFW.fRROneClickExpVariant = updatedDFWConfig.fRROneClickExp && getUserExperimentVariant(updatedDFWConfig.fRROneClickExp);
        DFW.isFRROneClickMobExp = updatedDFWConfig.fRROneClickMobileExpId && getUserExperimentVariant(updatedDFWConfig.fRROneClickMobileExpId) > 2;
        DFW.fRROneClickMobExpVariant = updatedDFWConfig.fRROneClickMobileExpId && getUserExperimentVariant(updatedDFWConfig.fRROneClickMobileExpId);
        DFW.resumeLinkExpVariant = updatedDFWConfig.resumeLinkExpId && getUserExperimentVariant(updatedDFWConfig.resumeLinkExpId);
        DFW.multiChoiceFrontExpVariant = updatedDFWConfig.multiChoiceFrontExpId && getUserExperimentVariant(updatedDFWConfig.multiChoiceFrontExpId);
        DFW.isBoldProAddSlotExpUser= updatedDFWConfig.boldProfileAddSlotExpId && getUserExperimentVariant(updatedDFWConfig.boldProfileAddSlotExpId) > 2;
        DFW.isBoldProAddSlotClnExpUser= updatedDFWConfig.boldProfileAddSlotClnExpId && getUserExperimentVariant(updatedDFWConfig.boldProfileAddSlotClnExpId) > 2;
        DFW.adSlotOptOutExpVariant = updatedDFWConfig.adSlotOptOutExpId && getUserExperimentVariant(updatedDFWConfig.adSlotOptOutExpId);
        DFW.isFreeDownloadExpUser = updatedDFWConfig.freeDownloadExp && getUserExperimentVariant(updatedDFWConfig.freeDownloadExp) > 2;
        DFW.webinarLandingPageExpVariant = updatedDFWConfig.webinarLandingPageExpId && getUserExperimentVariant(updatedDFWConfig.webinarLandingPageExpId);
        if (updatedDFWConfig.isResumeCheckDFAdExpBaselined || DFW.isResumeCheckDFAdExp) {
          DFW.resumeCheckDFAdExpVariant = updatedDFWConfig.isResumeCheckDFAdExpBaselined ? 6 : getUserExperimentVariant(updatedDFWConfig.resumeCheckDFAdExp); //baseline variant for MPR Resume Check DF Adslot
          resolve(true);
        }
        else {
          resolve(true);
        }
      }
      else {
        callAjax(
          DFW.Baseurl +
          'eb/api/v1/users/' + userID + '/experiments?status=all',
          "GET",
          false,
          true,
          function (data) {
            if (data) {
              RTN.UserExperiments = typeof data === 'object' ? data : JSON.parse(data);
              DFW.showPreDownloadPopup = updatedDFWConfig.rnaUpdateDFExpId && getUserExperimentVariant(updatedDFWConfig.rnaUpdateDFExpId) > 3;
              DFW.isDFBoldProAdExp = updatedDFWConfig.boldProDFAdExp && getUserExperimentVariant(updatedDFWConfig.boldProDFAdExp) > 2;
              updatedDFWConfig.boldProDFAdExp ? DFW.DF_Exp_AdSlot = getUserExperimentVariant(updatedDFWConfig.boldProDFAdExp) : '';
              DFW.isResumeCheckDFAdExp = updatedDFWConfig.resumeCheckDFAdExp && getUserExperimentVariant(updatedDFWConfig.resumeCheckDFAdExp) > 2;
              DFW.downloadFunnelV2ExpVariant = updatedDFWConfig.downloadFunnelV2Exp && getUserExperimentVariant(updatedDFWConfig.downloadFunnelV2Exp);
              DFW.boldProfileDFAdExpVariant = updatedDFWConfig.boldProfileDFAdExp && getUserExperimentVariant(updatedDFWConfig.boldProfileDFAdExp);
              DFW.downloadLinkExpVariant = updatedDFWConfig.downloadLinkExp && getUserExperimentVariant(updatedDFWConfig.downloadLinkExp);
              DFW.downloadLinkMobExpVariant = updatedDFWConfig.downloadLinkMobExp && getUserExperimentVariant(updatedDFWConfig.downloadLinkMobExp);
              DFW.mobileDownloadFunnelV1ExpVariant=updatedDFWConfig.mobileDownloadFunnelExpV1 && getUserExperimentVariant(updatedDFWConfig.mobileDownloadFunnelExpV1);
              DFW.mobileDownloadFunnelV1Exp=updatedDFWConfig.mobileDownloadFunnelExpV1 && getUserExperimentVariant(updatedDFWConfig.mobileDownloadFunnelExpV1)>2;
              DFW.isFullPageDFExp = updatedDFWConfig.fullPageDFExp && getUserExperimentVariant(updatedDFWConfig.fullPageDFExp) > 2;
              DFW.fullPageDFExpVariant = updatedDFWConfig.fullPageDFExp && getUserExperimentVariant(updatedDFWConfig.fullPageDFExp);
              DFW.isRemoveDOCXExp = updatedDFWConfig.removeDOCXExpId && getUserExperimentVariant(updatedDFWConfig.removeDOCXExpId) > 2;
              DFW.boldProOptInCopyExpVariant = updatedDFWConfig.boldProOptInCopyExp && getUserExperimentVariant(updatedDFWConfig.boldProOptInCopyExp);
              DFW.isFRROneClickExp = updatedDFWConfig.fRROneClickExp && getUserExperimentVariant(updatedDFWConfig.fRROneClickExp) > 2;
              DFW.fRROneClickExpVariant = updatedDFWConfig.fRROneClickExp && getUserExperimentVariant(updatedDFWConfig.fRROneClickExp);
              DFW.isFRROneClickMobExp = updatedDFWConfig.fRROneClickMobileExpId && getUserExperimentVariant(updatedDFWConfig.fRROneClickMobileExpId) > 2;
              DFW.fRROneClickMobExpVariant = updatedDFWConfig.fRROneClickMobileExpId && getUserExperimentVariant(updatedDFWConfig.fRROneClickMobileExpId);
              DFW.resumeLinkExpVariant = updatedDFWConfig.resumeLinkExpId && getUserExperimentVariant(updatedDFWConfig.resumeLinkExpId);
              DFW.multiChoiceFrontExpVariant = updatedDFWConfig.multiChoiceFrontExpId && getUserExperimentVariant(updatedDFWConfig.multiChoiceFrontExpId);
              DFW.isBoldProAddSlotExpUser= updatedDFWConfig.boldProfileAddSlotExpId && getUserExperimentVariant(updatedDFWConfig.boldProfileAddSlotExpId) > 2;
              DFW.isBoldProAddSlotClnExpUser= updatedDFWConfig.boldProfileAddSlotClnExpId && getUserExperimentVariant(updatedDFWConfig.boldProfileAddSlotClnExpId) > 2;
              DFW.adSlotOptOutExpVariant = updatedDFWConfig.adSlotOptOutExpId && getUserExperimentVariant(updatedDFWConfig.adSlotOptOutExpId);
              DFW.isFreeDownloadExpUser = updatedDFWConfig.freeDownloadExp && getUserExperimentVariant(updatedDFWConfig.freeDownloadExp) > 2;
              DFW.webinarLandingPageExpVariant = updatedDFWConfig.webinarLandingPageExpId && getUserExperimentVariant(updatedDFWConfig.webinarLandingPageExpId);

              if (updatedDFWConfig.isResumeCheckDFAdExpBaselined || DFW.isResumeCheckDFAdExp) {
                DFW.resumeCheckDFAdExpVariant = updatedDFWConfig.isResumeCheckDFAdExpBaselined ? 6 : getUserExperimentVariant(updatedDFWConfig.resumeCheckDFAdExp); //baseline variant for MPR Resume Check DF Adslot
                resolve && resolve(true);
              }
              else {
                resolve && resolve(true);
              }
            }
            else {
              resolve && resolve(true);
            }
          }
        );
      }
      if (DFW.fullPageDFExpVariant == 3 && updatedDFWConfig.fullPageDFwithModalpopups) {
        DFW.fullPageDFExpVariant = 4;
      }
    });
  }

  function handleClaims(result, resolve) {
    var data = JSON.parse(result);
    data = data && data.claims ? data.claims : data ? data : "";
    if (data && data.user_uid) {
      DFW.userId = data.user_uid;
      DFW.email = data.email;
      let name = !!data.firstName ? data.firstName + ' ' : '';
      let lastName = !!data.lastName ? data.lastName + ' ' : '';
      DFW.firstName = name.trim();
      DFW.lastName = lastName.trim();
      if (!!data.lastName) {
        name = name + data.lastName;
      }

      DFW.userName = name.trim();
      DFW.isAgent = data.proxy_user == "True" ? true : false;
      DFW.countryCd = data.countryCode;
    }
  }

  function updateSessionStorage(value) {
    const existingSessionStorage = DFW.sessionStorageData;
    if (existingSessionStorage && existingSessionStorage.userPreferences) {
        const existingPref = existingSessionStorage.userPreferences;
        DFW.UserPreferences = [...existingPref, value];
        existingSessionStorage.userPreferences =  DFW.UserPreferences;
        sessionStorage.setItem('userinfo', JSON.stringify(existingSessionStorage));
    }    
  }

  function SetUserPreference() {
    let payload = {
      'code': DFW.Config.surveyUserPref,
      'created_on': new Date().toDateString(),
      'value': "1"
    };
    updateSessionStorage(payload);
    callAjax(
      DFW.Baseurl +
      "eb/api/v1/userpreferences?user_uid=" + DFW.userId + "&portalCd=" + DFW.Config.portalCd +
      "&cookieEnabled=" +
      navigator.cookieEnabled,
      "POST",
      false,
      true,
      setSurveyVisibility,
      true,
      JSON.stringify(payload)
    );
  }

  var getPaymentStatusPromise = function () {
    return new Promise(function (resolve, reject) {
      if (DFW.sessionStorageData && DFW.sessionStorageData.paymentDetails){
        DFW.paymentStatus = DFW.sessionStorageData.paymentDetails.paymentStatus;
      } else {
        const url = DFW.Baseurl + "eb/api/v1/user/ecomflowdata?useruId=" + DFW.userId + "&portalId=" + DFW.Config.portalId;
        callAjax(url, "GET", false, true, function (result) {
          if (result) {
            let res = JSON.parse(result);
            DFW.paymentStatus = res.paymentStatus;
          }
        });
      }
    });
  };

  var getFeaturesPromise = new Promise(function (resolve, reject) {
    if (DFW.sessionStorageData && DFW.sessionStorageData.features){
      setFeatures(DFW.sessionStorageData.features);
      resolve && resolve(true);
    } else {
        const url = DFW.Baseurl + "eb/api/v1/config/features/" + DFW.Config.portalCd;
        callAjax(url, "GET", false, true, function (result) {
          if (result) {
            let res = JSON.parse(result);
            setFeatures(res);
            resolve && resolve(true);
          }
      });
    }
  });

  function setFeatures(features) {
    DFW.features = features;
    let isCLFullPageFeatureEnabled = IsFeatureEnabled('CLFPDFNL');
    DFW.disableBoldProWebsite = DFW.docType == DFW.DocType.Letter && isCLFullPageFeatureEnabled;
    DFW.isCLFullPageFeatureEnabled = isCLFullPageFeatureEnabled;
    DFW.isMPCLPlainTextFetureEnabled = IsFeatureEnabled('BLCLDFAS');
    DFW.isdownloadLinkFeatureEnabled = IsFeatureEnabled('RTDFELNK');
    DFW.isBoldProTransitionFeatureEnabled = IsFeatureEnabled('RTDFTSBP');
  }

  function setSurveyVisibility(response, resolve) {
    if (resolve) {
      DFW.SurveyViewed = true;
    }
  }

  function IsSVGEnabled(emailId, emailDomain) {
    if (emailId != '' && emailId != null) {
      let isBoldUser = emailId.includes(emailDomain);
      if (isBoldUser) {
        return true;
      }
      let svgDownload = GetQueryString('svgDownload');
      if (svgDownload && svgDownload == '1') {
        return true;
      }
    }
    return false;
  }
  function GetQueryString(key) {

    var urlParams = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href);
    let value = urlParams ? decodeURI(urlParams[1]) || 0 : null;
    return (value ? value : null);
  }

  function IsFeatureEnabled(featurCd) {
    return DFW.features && DFW.features.find(feature => feature.featureCD == featurCd && feature.isActive) ? true : false;
  }

  function TrackDFWWidgetEventCallback(eventName, eventProps) {
    eventProps["Platform"] = "Web";
    eventProps["Portal"] = DFW.Config.portal;
    eventProps["Login Status"] = "TRUE";
    if (DFW.isTestBed || (readCookie("isproteus") == "true") || (typeof TrackPageEvents != "undefined" && typeof analytics != "undefined")) {
      TrackEvents(eventName, eventProps, DFW.userId);
    }
    else {
      var analyticsLoaded = setInterval(function () {
        if ((readCookie("isproteus") == "true") || (typeof TrackPageEvents != "undefined" && typeof analytics != "undefined")) {
          TrackEvents(eventName, eventProps, DFW.userId);
          clearInterval(analyticsLoaded);
        }
      }, 100);
    }
  }
  scope.RenderDownloadFunnel = function (data) {
    var packageLoaded = setInterval(function () {
      if (DFW.BundleLoaded) {
        clearInterval(packageLoaded);
        renderDownloadFunnelWidget(data);
      }
    }, 10);
  }
  return scope;
})(DFW.Widget || {});