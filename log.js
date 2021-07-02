eventProperties = {};

logitrics = this;

function detectBrowserName(userAgentString) {

  // Detect Chrome
  if (userAgentString.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (userAgentString.indexOf('MSIE') > -1 || userAgentString.indexOf('rv:') > -1) {
    return 'Internet Explorer';
  } else if (userAgentString.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (userAgentString.indexOf('Safari') > -1) {
    return 'Safari';
  } else {
    return 'Others';
  }
}

function getBrowserDetails() {
  let browserProperties = {};
  let userAgentString = navigator.userAgent;

  browserProperties['userAgent'] = userAgentString;
  browserProperties['browserName'] = this.detectBrowserName(userAgentString);
  return browserProperties;
}

function isInitialized() {
  return window.localStorage.getItem('$isInitialized') === 'true';
}

function initialize(payload) {
  if (!this.isInitialized()) {
    window.localStorage.setItem('$isInitialized', 'true');
    window.localStorage.setItem('$siteId', payload && payload.siteId);
  }
}

function getUserContext() {
  let userContextProperties = {}
  userContextProperties['title'] = window.document.title;
  userContextProperties['host'] = window.location.hostname;
  userContextProperties['url'] = window.location.href;
  userContextProperties['location'] = window.location;
  return userContextProperties;
}

function getEmail() {
  return window.localStorage.getItem('$email') ? window.localStorage.getItem('$email') : 'Anonymous';
}

function identifyUser(payload) {
  window.localStorage.setItem('$user', JSON.stringify(payload));
  window.localStorage.setItem('$email', payload && payload.email);
}


function setEventTimeStamp() {
  this.eventProperties['$timestamp'] = new Date();
}

function trackEvent(name, customEventProperties) {
  this.setEventTimeStamp();
  this.eventProperties['$email'] = this.getEmail();
  this.eventProperties['$browser'] = this.getBrowserDetails();
  this.eventProperties['$name'] = name;
  this.eventProperties['$customEventProperties'] = customEventProperties;
  this.eventProperties['$context'] = this.getUserContext();
  console.log(this.eventProperties);
}

function initialize(payload) {
  this.initialize(payload);
}

function identifyUser(payload) {
  if (this.isInitialized()) {
    this.identifyUser(payload);
  } else {
    console.log("Logitrics is not initialized yet.")
  }
}
