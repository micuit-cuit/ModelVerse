let activeDebug = false;
const log = (() => {
  function getStackInfo() {
    const stack = new Error().stack.split('\n')[4];
    const match = stack.match(/at (.+) \((.+):(\d+):\d+\)/);
    return match ? { func: match[1], file: match[2].split('/').pop(), line: match[3] } : { func: '', file: 'unknown', line: '0' };
  }

  function formatLog(level, ...args) {
    const { file, line } = getStackInfo();
    const time = new Date().toLocaleTimeString();
    
    let emoji, color;
    switch (level) {
      case 'INFO':
        emoji = 'ℹ️'; color = 'dodgerblue'; break;
      case 'WARN':
        emoji = '⚠️'; color = 'orange'; break;
      case 'ERROR':
        emoji = '🚫'; color = 'red'; break;
      case 'DEBUG':
        emoji = '🐛'; color = 'purple'; break;
      default:
        emoji = '✅'; color = 'green';
    }

    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');

    const baseStyle = 'background-color: black; padding: 2px 4px;';
    console.log(
      '%c%s%c%s%c%s%c%s',
      `color: skyblue; font-weight: bold; ${baseStyle}`, `[${time}] `,
      `color: green; font-style: italic; ${baseStyle}`, `{${file}:${line}} `,
      `color: ${color}; font-weight: bold; ${baseStyle}`, `(${emoji} ${level}): `,
      `color: white; ${baseStyle}`, `|${message}|`
    );
  }

  function createPopup(level, message) {
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background-color: #333;
      color: white;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;

    let emoji, backgroundColor;
    switch (level) {
      case 'INFO':
        emoji = 'ℹ️'; backgroundColor = 'dodgerblue'; break;
      case 'WARN':
        emoji = '⚠️'; backgroundColor = 'orange'; break;
      case 'ERROR':
        emoji = '🚫'; backgroundColor = 'red'; break;
      case 'DEBUG':
        emoji = '🐛'; backgroundColor = 'purple'; break;
      case 'SUCCESS':
        emoji = '✅'; backgroundColor = 'green'; break;
      default:
        emoji = '✅'; backgroundColor = 'green';
    }

    popup.style.backgroundColor = backgroundColor;
    popup.innerHTML = `${emoji} ${level}: ${message}`;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.transition = 'opacity 0.5s ease-out';
      popup.style.opacity = '0';
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 3000);
  }

  function showPopupLog(level, message) {
    formatLog(level, message);
    createPopup(level, message);
  }


  return {
    l: (...args) => formatLog('INFO', ...args),
    w: (...args) => formatLog('WARN', ...args),
    e: (...args) => formatLog('ERROR', ...args),
    d: (...args) => {if (activeDebug) formatLog('DEBUG', ...args)},
    s: (...args) => formatLog('SUCCESS', ...args),
    i: (...args) => formatLog('INFO', ...args),
    c: (...args) => console.log(...args),
    enableDebug: () => activeDebug = true,
    show: {
        l: (message) => showPopupLog('INFO', message),
        i: (message) => showPopupLog('INFO', message),
        w: (message) => showPopupLog('WARN', message),
        e: (message) => showPopupLog('ERROR', message),
        d: (message) => { if (activeDebug) showPopupLog('DEBUG', message) },
        s: (message) => showPopupLog('SUCCESS', message),
    },
  
  };
})();
window.log = log;
