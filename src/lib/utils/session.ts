export function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return null;
  }

  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const colorDepth = window.screen.colorDepth;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const touchSupport = 'ontouchstart' in window;

  // Parse browser and OS info from user agent
  const browserInfo = getBrowserInfo(userAgent);
  const osInfo = getOSInfo(userAgent);

  return {
    browser: browserInfo.browser,
    browserVersion: browserInfo.version,
    os: osInfo.os,
    osVersion: osInfo.version,
    platform,
    language,
    screenResolution,
    colorDepth,
    timeZone,
    touchSupport,
    isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent),
  };
}

function getBrowserInfo(userAgent: string) {
  const ua = userAgent.toLowerCase();
  let browser = 'unknown';
  let version = 'unknown';

  if (ua.includes('firefox')) {
    browser = 'Firefox';
    version = ua.match(/firefox\/([\d.]+)/)?.[1] || version;
  } else if (ua.includes('edg')) {
    browser = 'Edge';
    version = ua.match(/edg\/([\d.]+)/)?.[1] || version;
  } else if (ua.includes('chrome')) {
    browser = 'Chrome';
    version = ua.match(/chrome\/([\d.]+)/)?.[1] || version;
  } else if (ua.includes('safari')) {
    browser = 'Safari';
    version = ua.match(/version\/([\d.]+)/)?.[1] || version;
  }

  return { browser, version };
}

function getOSInfo(userAgent: string) {
  const ua = userAgent.toLowerCase();
  let os = 'unknown';
  let version = 'unknown';

  if (ua.includes('win')) {
    os = 'Windows';
    version = ua.match(/windows nt ([\d.]+)/)?.[1] || version;
  } else if (ua.includes('mac')) {
    os = 'macOS';
    version = ua.match(/mac os x ([\d._]+)/)?.[1]?.replace(/_/g, '.') || version;
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
    version = ua.match(/android ([\d.]+)/)?.[1] || version;
  } else if (ua.includes('ios')) {
    os = 'iOS';
    version = ua.match(/os ([\d_]+)/)?.[1]?.replace(/_/g, '.') || version;
  }

  return { os, version };
}

export function getClientIP() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  // For development/localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '127.0.0.1';
  }
  
  return window.location.hostname;
  
  // For production, you might want to use a service like:
  // const response = await fetch('https://api.ipify.org?format=json');
  // const data = await response.json();
  // return data.ip;
} 