---
exclude: true
---
"use strict";

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function hasClass(e, t) {
    return e.classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)".concat(t, "(\\s|$)")))
}

function addClass(e, t) {
    e.classlist ? e.classList.add(t) : hasClass(e, t) || (e.className += " ".concat(t))
}

function removeClass(e, t) {
    if (e.classlist) e.classList.remove(t);
    else if (hasClass(e, t)) {
        var n = new RegExp("(\\s|^)".concat(t, "(\\s|$)"));
        e.className = e.className.replace(n, " ")
    }
}

function getPosition(e) {
    for (var t = 0; e;) {
        if ("BODY" === e.tagName) {
            var n = e.scrollTop || document.documentElement.scrollTop;
            t += e.offsetTop - n + e.clientTop
        } else t += e.offsetTop - e.scrollTop + e.clientTop;
        e = e.offsetParent
    }
    return {
        y: t
    }
}

function scrollImage(e) {
    if (!(e.length <= 0)) {
        var t = document.documentElement.clientHeight,
            n = e[0],
            o = e[e.length - 1];
        e.forEach(function(e) {
            var a = getPosition(e).y,
                i = e.offsetHeight,
                r = a + i - t;
            a <= 0 && r >= 0 || r >= 0 && a >= 0 && e === n ? (addClass(e, "-fixed"), removeClass(e, "-absolute-bottom"), removeClass(e, "-absolute-top")) : r <= 0 && a <= 0 && e !== o || a >= 0 && r <= 0 ? (addClass(e, "-absolute-bottom"), removeClass(e, "-fixed")) : r >= 0 && a >= 0 && e !== n && (addClass(e, "-absolute-top"), removeClass(e, "-fixed"))
        })
    }
}

function updatePosition() {
    scrollImage(elements)
}
window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
        var t, n = (this.document || this.ownerDocument).querySelectorAll(e),
            o = this;
        do {
            for (t = n.length; --t >= 0 && n.item(t) !== o;);
        } while (t < 0 && (o = o.parentElement));
        return o
    }),
    function() {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        }
        if ("function" == typeof window.CustomEvent) return !1;
        e.prototype = window.Event.prototype, window.CustomEvent = e
    }(),
    function() {
        for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
            var o = (new Date).getTime(),
                a = Math.max(0, 16 - (o - e)),
                i = window.setTimeout(function() {
                    t(o + a)
                }, a);
            return e = o + a, i
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return t(e)
        }) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e)
    }("undefined" != typeof global ? global : "undefined" != typeof window ? window : void 0, function(e) {
        var t = {
                ignore: "[data-scroll-ignore]",
                header: null,
                topOnEmptyHash: !0,
                speed: 500,
                speedAsDuration: !1,
                durationMax: null,
                durationMin: null,
                clip: !0,
                offset: 0,
                easing: "easeInOutCubic",
                customEasing: null,
                updateURL: !0,
                popstate: !0,
                emitEvents: !0
            },
            n = function() {
                return "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype
            },
            o = function() {
                var e = {};
                return Array.prototype.forEach.call(arguments, function(t) {
                    for (var n in t) {
                        if (!t.hasOwnProperty(n)) return;
                        e[n] = t[n]
                    }
                }), e
            },
            a = function(t) {
                return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches)
            },
            i = function(t) {
                return parseInt(e.getComputedStyle(t).height, 10)
            },
            r = function(e) {
                "#" === e.charAt(0) && (e = e.substr(1));
                for (var t, n = String(e), o = n.length, a = -1, i = "", r = n.charCodeAt(0); ++a < o;) {
                    if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                    t >= 1 && t <= 31 || 127 == t || 0 === a && t >= 48 && t <= 57 || 1 === a && t >= 48 && t <= 57 && 45 === r ? i += "\\" + t.toString(16) + " " : i += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a)
                }
                return "#" + i
            },
            s = function(e, t) {
                var n;
                return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t
            },
            c = function() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
            },
            l = function(t, n, o, a) {
                var i = 0;
                if (t.offsetParent)
                    do {
                        i += t.offsetTop, t = t.offsetParent
                    } while (t);
                return i = Math.max(i - n - o, 0), a && (i = Math.min(i, c() - e.innerHeight)), i
            },
            u = function(e) {
                return e ? i(e) + e.offsetTop : 0
            },
            m = function(e, t) {
                var n = t.speedAsDuration ? t.speed : Math.abs(e / 1e3 * t.speed);
                return t.durationMax && n > t.durationMax ? t.durationMax : t.durationMin && n < t.durationMin ? t.durationMin : parseInt(n, 10)
            },
            d = function(t) {
                if (history.replaceState && t.updateURL && !history.state) {
                    var n = e.location.hash;
                    n = n || e.pageYOffset, history.replaceState({
                        smoothScroll: JSON.stringify(t),
                        anchor: n || e.pageYOffset
                    }, document.title, n || e.location.href)
                }
            },
            f = function(e, t, n) {
                t || history.pushState && n.updateURL && history.pushState({
                    smoothScroll: JSON.stringify(n),
                    anchor: e.id
                }, document.title, e === document.documentElement ? "#top" : "#" + e.id)
            },
            p = function(t, n, o) {
                0 === t && document.body.focus(), o || (t.focus(), document.activeElement !== t && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n))
            },
            h = function(t, n, o, a) {
                if (n.emitEvents && "function" == typeof e.CustomEvent) {
                    var i = new CustomEvent(t, {
                        bubbles: !0,
                        detail: {
                            anchor: o,
                            toggle: a
                        }
                    });
                    document.dispatchEvent(i)
                }
            };
        return function(i, g) {
            var y, v, w, b, E, S, C = {};
            C.cancelScroll = function(e) {
                cancelAnimationFrame(S), S = null, e || h("scrollCancel", y)
            }, C.animateScroll = function(n, a, i) {
                C.cancelScroll();
                var r = o(y || t, i || {}),
                    d = "[object Number]" === Object.prototype.toString.call(n),
                    g = d || !n.tagName ? null : n;
                if (d || g) {
                    var v = e.pageYOffset;
                    r.header && !b && (b = document.querySelector(r.header));
                    var w, E, A, O = u(b),
                        I = d ? n : l(g, O, parseInt("function" == typeof r.offset ? r.offset(n, a) : r.offset, 10), r.clip),
                        L = I - v,
                        q = c(),
                        x = 0,
                        M = m(L, r),
                        T = function(t, o) {
                            var i = e.pageYOffset;
                            if (t == o || i == o || (v < o && e.innerHeight + i) >= q) return C.cancelScroll(!0), p(n, o, d), h("scrollStop", r, n, a), w = null, S = null, !0
                        },
                        F = function t(n) {
                            w || (w = n), x += n - w, E = 0 === M ? 0 : x / M, E = E > 1 ? 1 : E, A = v + L * s(r, E), e.scrollTo(0, Math.floor(A)), T(A, I) || (S = e.requestAnimationFrame(t), w = n)
                        };
                    0 === e.pageYOffset && e.scrollTo(0, 0), f(n, d, r), h("scrollStart", r, n, a), C.cancelScroll(!0), e.requestAnimationFrame(F)
                }
            };
            var A = function(t) {
                    if (!a() && 0 === t.button && !t.metaKey && !t.ctrlKey && "closest" in t.target && (w = t.target.closest(i)) && "a" === w.tagName.toLowerCase() && !t.target.closest(y.ignore) && w.hostname === e.location.hostname && w.pathname === e.location.pathname && /#/.test(w.href)) {
                        var n = r(w.hash),
                            o = y.topOnEmptyHash && "#" === n ? document.documentElement : document.querySelector(n);
                        o = o || "#top" !== n ? o : document.documentElement, o && (t.preventDefault(), d(y), C.animateScroll(o, w))
                    }
                },
                O = function(e) {
                    if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(y)) {
                        var t = history.state.anchor;
                        t && 0 !== t && !(t = document.querySelector(r(history.state.anchor))) || C.animateScroll(t, null, {
                            updateURL: !1
                        })
                    }
                };
            return C.destroy = function() {
                y && (document.removeEventListener("click", A, !1), e.removeEventListener("popstate", O, !1), C.cancelScroll(), y = null, v = null, w = null, b = null, E = null, S = null)
            }, C.init = function(a) {
                if (!n()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                C.destroy(), y = o(t, a || {}), b = y.header ? document.querySelector(y.header) : null, document.addEventListener("click", A, !1), y.updateURL && y.popstate && e.addEventListener("popstate", O, !1)
            }, C.init(g), C
        }
    });
var scroll = new SmoothScroll('a[href*="#"]', {
        easing: "easeInOutCubic",
        offset: 80
    }),
    elements = [];
window.onload = function() {
    for (var e = 1; null !== document.getElementById("js-".concat(e));) {
        var t = document.getElementById("js-".concat(e));
        elements.push(t), e += 1
    }
    scrollImage(elements)
}, window.addEventListener("scroll", updatePosition, !1), window.addEventListener("resize", updatePosition, !1);
//# sourceMappingURL=scripts.js.map
