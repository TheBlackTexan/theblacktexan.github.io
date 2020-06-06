var appConfig = {
    "hostname": "mak.ink",
    "behavior": {
        "internalLinks": true
    },
    "chromeAppWindow": {
        "id": "embed",
        "frame": {
            "type": "chrome",
            "color": "#202020"
        },
        "innerBounds": {
            "width": 780,
            "height": 420
        }
    }
};

chrome.app.runtime.onLaunched.addListener(function() {
    runApp();
});

chrome.app.runtime.onRestarted.addListener(function() {
    runApp();
});

function runApp() {
    chrome.app.window.create('html/embed.html', appConfig.chromeAppWindow, onWindowLoaded());
}

function onWindowLoaded(popup) {
    return function(win) {
        win.contentWindow.onload = function() {
            var webview = win.contentWindow.document.getElementById('webview');

            if (appConfig.userAgent) {
                webview.setUserAgentOverride(appConfig.userAgent);
            }

            webview.addEventListener('permissionrequest', function(e) {
                e.request.allow();
            });

            webview.addEventListener('newwindow', function(e) {
                var parsedUrl = document.createElement('a');
                parsedUrl.href = e.targetUrl;

                if (e.initialWidth > 0 && e.initialHeight > 0) {
                    return chrome.app.window.create('html/embed.html', {
                        frame: {
                            type: 'chrome'
                        },
                        innerBounds: {
                            width: e.initialWidth,
                            height: e.initialHeight
                        }
                    }, onWindowLoaded(e));
                } else if (appConfig.behavior.internalLinks && parsedUrl.hostname.includes(appConfig.hostname)) {
                    return chrome.app.window.create('html/embed.html', {
                        frame: {
                            type: 'chrome'
                        },
                        innerBounds: appConfig.chromeAppWindow.innerBounds
                    }, onWindowLoaded(e));
                }

                win.contentWindow.open(e.targetUrl);
            });

            if (popup) {
                webview.src = popup.targetUrl;

                popup.window.attach(webview);
            }
        };
    };
}