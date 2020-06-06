var serviceWorkerOption = {
    "assets": ["/KaTeX_AMS-Regular.eot", "/KaTeX_Caligraphic-Bold.eot", "/KaTeX_Caligraphic-Regular.eot", "/KaTeX_Fraktur-Bold.eot", "/KaTeX_Fraktur-Regular.eot", "/KaTeX_Main-Bold.eot", "/KaTeX_Main-Italic.eot", "/KaTeX_Main-Regular.eot", "/KaTeX_Math-Italic.eot", "/KaTeX_SansSerif-Regular.eot", "/KaTeX_Script-Regular.eot", "/KaTeX_Size1-Regular.eot", "/KaTeX_Size2-Regular.eot", "/KaTeX_Size3-Regular.eot", "/KaTeX_Size4-Regular.eot", "/KaTeX_Typewriter-Regular.eot", "/KaTeX_AMS-Regular.ttf", "/KaTeX_AMS-Regular.woff", "/KaTeX_AMS-Regular.woff2", "/KaTeX_Caligraphic-Bold.ttf", "/KaTeX_Caligraphic-Bold.woff", "/KaTeX_Caligraphic-Bold.woff2", "/KaTeX_Caligraphic-Regular.ttf", "/KaTeX_Caligraphic-Regular.woff", "/KaTeX_Caligraphic-Regular.woff2", "/KaTeX_Fraktur-Bold.ttf", "/KaTeX_Fraktur-Bold.woff", "/KaTeX_Fraktur-Bold.woff2", "/KaTeX_Fraktur-Regular.ttf", "/KaTeX_Fraktur-Regular.woff", "/KaTeX_Fraktur-Regular.woff2", "/KaTeX_Main-Bold.ttf", "/KaTeX_Main-Bold.woff", "/KaTeX_Main-Bold.woff2", "/KaTeX_Main-Italic.ttf", "/KaTeX_Main-Italic.woff", "/KaTeX_Main-Italic.woff2", "/KaTeX_Main-Regular.ttf", "/KaTeX_Main-Regular.woff", "/KaTeX_Main-Regular.woff2", "/KaTeX_Math-Italic.ttf", "/KaTeX_Math-Italic.woff", "/KaTeX_Math-Italic.woff2", "/KaTeX_SansSerif-Regular.ttf", "/KaTeX_SansSerif-Regular.woff", "/KaTeX_SansSerif-Regular.woff2", "/KaTeX_Script-Regular.ttf", "/KaTeX_Script-Regular.woff", "/KaTeX_Script-Regular.woff2", "/KaTeX_Size1-Regular.ttf", "/KaTeX_Size1-Regular.woff", "/KaTeX_Size1-Regular.woff2", "/KaTeX_Size2-Regular.ttf", "/KaTeX_Size2-Regular.woff", "/KaTeX_Size2-Regular.woff2", "/KaTeX_Size3-Regular.ttf", "/KaTeX_Size3-Regular.woff", "/KaTeX_Size3-Regular.woff2", "/KaTeX_Size4-Regular.ttf", "/KaTeX_Size4-Regular.woff", "/KaTeX_Size4-Regular.woff2", "/KaTeX_Typewriter-Regular.ttf", "/KaTeX_Typewriter-Regular.woff", "/KaTeX_Typewriter-Regular.woff2", "/PTMono.woff2", "/bundle.d678c707bf907ca55456.js", "/vendor.bundle.js", "/s.d5933eb2fc1dc49e2a6286e592064581.css", "/index.html"]
};

! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.i = function(e) {
        return e
    }, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 0)
}([function(e, t, n) {
    "use strict";
    var r = serviceWorkerOption.assets.filter(function(e) {
        return e.endsWith(".js") || e.endsWith(".css") || e.endsWith(".woff2") || e.endsWith(".png")
    });
    self.addEventListener("install", function(e) {
        e.waitUntil(caches.open("mak-cache-v0.4.4-1").then(function(e) {
            return e.addAll(r)
        }).then(function() {
            return self.skipWaiting()
        }))
    }), self.addEventListener("fetch", function(e) {
        e.respondWith(caches.match(e.request).then(function(t) {
            if (t) return t;
            var n = e.request.clone();
            return fetch(n).then(function(t) {
                if (!t || 200 !== t.status || "basic" !== t.type) return t;
                var n = t.clone();
                return caches.open("mak-cache-v0.4.4-1").then(function(t) {
                    t.put(e.request, n)
                }), t
            })
        }))
    }), self.addEventListener("activate", function(e) {
        var t = ["mak-cache-v0.4.4-1"];
        e.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(function(e) {
            return Promise.all(e.map(function(e) {
                if (-1 === t.indexOf(e)) return caches.delete(e)
            }))
        })]))
    })
}]);