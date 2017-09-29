!function() {
    "use strict";
    function a() {
        var a = window.hp.getDevice().device;
        a !== window.hp.currentDevice && ($(document).trigger("device-change", {
            oldDevice: window.hp.currentDevice,
            newDevice: a
        }),
        window.hp.currentDevice = a)
    }
    window.hp = {
        getScrollSize: function() {
            var a, b, c = $("body");
            return c.css("overflow", "hidden"),
            a = c.width(),
            c.css({
                overflow: "auto",
                height: "101%"
            }),
            b = c.width() - a,
            c.removeAttr("style"),
            Math.abs(b)
        },
        clearForm: function(a) {
            return a.trigger("reset"),
            a.find("input, textarea").each(function() {
                $(this).parent().parent().removeClass("child-input-focused")
            }),
            a
        },
        scrollDebounceStop: function() {
            var a = 600;
            $(document).on("mousewheel.scrollDebounceStop", function(a) {
                return !1
            }),
            setTimeout(function() {
                $(document).off("mousewheel.scrollDebounceStop")
            }, a)
        },
        debounce: function(a, b, c) {
            var d;
            return function() {
                var e = this
                  , f = arguments
                  , g = function() {
                    d = null,
                    c || a.apply(e, f)
                }
                  , h = c && !d;
                clearTimeout(d),
                d = setTimeout(g, b),
                h && a.apply(e, f)
            }
        },
        getRandomInt: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a
        },
        scrollTo: function(a, b) {
            var c, d = 300, b = b || function() {}
            ;
            c = "number" == typeof a ? a : $(a).offset().top,
            $("html, body").animate({
                scrollTop: c
            }, d, b)
        },
        getDevice: function() {
            var a = [{
                device: "phone",
                size: 768
            }, {
                device: "tablet",
                size: 1024
            }, {
                device: "desktop",
                size: !1
            }]
              , b = a[a.length - 1];
            return a.some(function(a, c) {
                if (window.matchMedia("only screen and (max-width: " + a.size + "px)").matches)
                    return b = a
            }),
            b
        },
        responsive: function(a, b) {
            b[window.hp.currentDevice] ? b[window.hp.currentDevice].run() : b.other.run(),
            $(document).on("device-change", function(a, c) {
                var d = b[c.oldDevice] ? c.oldDevice : "other"
                  , e = b[c.newDevice] ? c.newDevice : "other";
                c.oldDevice ? d !== e && (b[d].destroy && b[d].destroy(),
                b[e].run()) : b[e].run()
            })
        }
    },
    $(window).bind("resize", a),
    a()
}(),
function() {
    "use strict";
    function a() {
        "expertise" !== window.location.hash && b() ? "desktop" === window.hp.getDevice().device ? g() : h() : $(document.body).removeClass("load")
    }
    function b() {
        if (i = document.getElementById("home-canvas"),
        !i)
            return !1;
        j = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,1e4),
        j.position.z = 800,
        j.position.y = 600,
        k = new THREE.Scene,
        m = new Array;
        for (var a = 2 * Math.PI, b = new THREE.SpriteCanvasMaterial({
            color: 12632256,
            program: function(b) {
                b.beginPath(),
                b.arc(0, 0, .5, 0, a, !0),
                b.fill()
            }
        }), g = 0, h = 0; h < p; h++)
            for (var r = 0; r < q; r++)
                n = m[g++] = new THREE.Sprite(b),
                n.position.x = h * o - p * o / 2,
                n.position.z = r * o - q * o / 2,
                k.add(n);
        return l = new THREE.CanvasRenderer,
        l.setPixelRatio(window.devicePixelRatio),
        l.setSize(window.innerWidth, window.innerHeight),
        l.setClearColor(0xFFFFFF, 0.1),
        i.appendChild(l.domElement),
        $(document.body).removeClass("load"),
        document.addEventListener("mousemove", d, !1),
        document.addEventListener("touchstart", e, !1),
        document.addEventListener("touchmove", f, !1),
        window.addEventListener("resize", c, !1),
        l
    }
    function c() {
        u = window.innerWidth / 2,
        v = window.innerHeight / 2,
        j.aspect = window.innerWidth / window.innerHeight,
        j.updateProjectionMatrix(),
        l.setSize(window.innerWidth, window.innerHeight)
    }
    function d(a) {
        s = a.clientX - u,
        t = a.clientY - v
    }
    function e(a) {
        1 === a.touches.length && (a.preventDefault(),
        s = a.touches[0].pageX - u,
        t = a.touches[0].pageY - v)
    }
    function f(a) {
        1 === a.touches.length && (a.preventDefault(),
        s = a.touches[0].pageX - u,
        t = a.touches[0].pageY - v)
    }
    function g() {
        return !!i && (requestAnimationFrame(g),
        void h())
    }
    function h() {
        j.position.x += .01 * (-s - j.position.x),
        j.position.y += .01 * (-t + 600 - j.position.y),
        j.lookAt(k.position);
        for (var a = 0, b = 0; b < p; b++)
            for (var c = 0; c < q; c++)
                n = m[a++],
                n.position.y = 50 * Math.sin(.3 * (b + r)) + 50 * Math.sin(.5 * (c + r)),
                n.scale.x = n.scale.y = 4 * (Math.sin(.3 * (b + r)) + 1) + 4 * (Math.sin(.5 * (c + r)) + 1);
        l.render(k, j),
        r += .1
    }
    var i, j, k, l, m, n, o = 100, p = 40, q = 40, r = 0, s = 0, t = 0, u = window.innerWidth / 2, v = window.innerHeight / 2;
    window.startMainCanvas = a,
    window.destroyMainCanvas = function() {
        i = !1
    }
}(),
function() {
    function a() {
        v.init()
    }
    function b() {
        /CriOS/i.test(navigator.userAgent) && /iphone|ipod|ipad/i.test(navigator.userAgent) && $("body").addClass("ios-chrome-active")
    }
    function c() {
        function a() {
            $("body").addClass("ios-active")
        }
        function b() {
            var a = $("body");
            a.hasClass("nav-active") ? setTimeout(function() {
                $(window).scrollTop(d),
                $("#main").removeAttr("style")
            }, 0) : (d = $(window).scrollTop(),
            $("#main").css("top", -d))
        }
        var c = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
        if (c) {
            var d;
            a(),
            $(".nav-opener").bind("click", b)
        }
    }
    function d() {
        function a() {
            setTimeout(function() {
                var a = $(window).height();
                $(".entry-text").css("height", a)
            }, 300)
        }
        var b = navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/);
        b && $(window).bind("load orientationchange", a)
    }
    function e() {
        function a() {
            f.length && (g.on("scroll", b),
            b())
        }
        function b() {
            i.removeClass(j),
            d(f) ? c(function() {
                i.addClass(j)
            }) : clearTimeout(e)
        }
        function c(a) {
            clearTimeout(e),
            e = setTimeout(a, k)
        }
        function d(a) {
            var b = g.scrollTop()
              , c = h.height()
              , d = a.offset().top
              , e = a.height();
            return b < d + e - c
        }
        var e, f = $(".graff-box"), g = $(document), h = $(window), i = $("body"), j = "show-the-arrow", k = 3e3;
        return {
            init: a,
            check: b
        }
    }
    function f() {
        jQuery("a.lightbox-link").fancybox({
            helpers: {
                overlay: {
                    locked: !1,
                    css: {
                        background: "rgba(0, 0, 0, 0.65)"
                    }
                }
            }
        })
    }
    function g(a, b) {
        function c(a, b) {
            a.addClass("animated " + i) && b.addClass("animated " + i).delay(g).queue(function(c) {
                a.addClass(j),
                b.addClass(j),
                c()
            }).delay(f).queue(function(c) {
                a.removeClass("animated " + i + " " + j),
                b.removeClass("animated " + i + " " + j),
                c()
            }).delay(f).queue(function(a) {
                h++,
                h === d.length && (h = 0),
                a(),
                c(d.eq(h), e)
            })
        }
        var d = $(a)
          , e = $(b)
          , f = 1e3
          , g = 3e3
          , h = 0
          , i = "fadeInUp"
          , j = "fadeOutUp";
        d.length && c(d.eq(0), e)
    }
    function h() {
        Modernizr.touchevents ? i() : window.startMainCanvas()
    }
    function i() {
        function a() {
            for (var a = 10, b = 10, c = a * b, d = '<div class="entry-cells">', e = 0; e < c; e++)
                d += '<div class="cell cell-' + e + '"></div>';
            return d += "</div>"
        }
        var b = $("#home-canvas")
          , c = $(a());
        b.html(c),
        $("body").removeClass("load")
    }
    function j() {
        var a = $("[data-animate-it]");
        a.addClass("hidden"),
        setTimeout(function() {
            a.each(function() {
                var a = $(this);
                a.removeClass("hidden").addClass(a.data("animate-it") + " animated")
            })
        }, 100)
    }
    function k(a) {
        $.fancybox({
            href: a,
            helpers: {
                overlay: {
                    locked: !1,
                    css: {
                        background: "rgba(255, 255, 255, 0.9)"
                    }
                }
            },
            padding: 0
        })
    }
    function l() {
        function a(a) {
            f.html(a.success),
            hp.clearForm(d),
            d.removeClass("error"),
            k("#msg-box"),
            $.post(e)
        }
        function b() {
            d.removeClass("error"),
            k("#msg-box-error")
        }
        function c(a) {
            var b = {};
            $.each(a, function(a, c) {
                b["enquiry[" + a + "]"] = c
            }),
            d.addClass("error"),
            h.showErrors(b)
        }
        var d = $("form.contact-form");
        if (d.length) {
            var e = d.attr("action")
              , f = $(".msg-lightbox")
              , g = null
              , h = d.validate({
                errorPlacement: function() {},
                highlight: function(a) {
                    $(a).parent().addClass("error")
                },
                unhighlight: function(a) {
                    $(a).parent().removeClass("error")
                },
                invalidHandler: function(a, b) {
                    var c = b.numberOfInvalids();
                    c > 0 && (d.addClass("error"),
                    b.showErrors())
                },
                submitHandler: function() {
                    d.addClass("loading"),
                    g = null,
                    $.post(e, d.serialize()).done(function(a) {
                        g = a
                    }).always(function(d) {
                        g && "object" != typeof g && (g = $.parseJSON(g)),
                        g ? g.success ? a(g) : c(g) : b()
                    })
                }
            });
            return d
        }
    }
    function m(a) {
        function b(a) {
            a.addClass(e)
        }
        function c(a) {
            d(this) && a.removeClass("child-input-focused"),
            a.removeClass("just-focus")
        }
        function d(a) {
            return 0 === $.trim(a.val()).length
        }
        var e = "child-input-focused just-focus";
        a = $(a),
        a.each(function() {
            var a = $(this)
              , d = a.parent().parent();
            a.bind("focus", b.bind(a, d)),
            a.bind("blur", c.bind(a, d))
        })
    }
    function n() {
        function a() {
            var a = d.scrollTop()
              , f = c.height()
              , g = b.height();
            e.toggleClass("header-white-active", a < f - g),
            e.toggleClass("entry-text-active", a < f - g && 0 !== a)
        }
        var b = $("header")
          , c = $(".entry-text")
          , d = $(document)
          , e = $("body");
        d.on("scroll.homeHeaderObserve", a)
    }
    function o() {
        $carousels = $(".gallery-photos .holder, .gallery-clients .holder"),
        $carousels.each(function() {
            var a = $(this)
              , b = a.data("autoplay");
            a.imagesLoaded(function() {
                a.owlCarousel({
                    loop: !0,
                    autoWidth: !0,
                    center: !0,
                    autoplay: b,
                    autoplaySpeed: 800,
                    autoplayHoverPause: !0,
                    slideBy: 1
                })
            })
        })
    }
    function p() {
        $("body").mobileNav({
            hideOnClickOutside: !0,
            menuActiveClass: "nav-active",
            menuOpener: ".nav-opener",
            menuDrop: ".nav-box"
        })
    }
    function q() {
        return new WOW({
            offset: 200,
            mobile: !1
        }).init()
    }
    function r() {
        var a = window
          , b = a.Intercom;
        if ("function" == typeof b)
            b("reattach_activator"),
            b("update", intercomSettings);
        else {
            var c = document
              , d = function() {
                d.c(arguments)
            };
            d.q = [],
            d.c = function(a) {
                d.q.push(a)
            }
            ,
            a.Intercom = d,
            function() {
                var a = c.createElement("script");
                a.type = "text/javascript",
                a.async = !0,
                a.src = "https://widget.intercom.io/widget/dg9qfwj1";
                var b = c.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b)
            }()
        }
    }
    function s() {
        function a(a) {
            function b(b) {
                b && b.preventDefault(),
                $bdy.removeClass("hide-main-section"),
                $bdy.addClass("slide-entry-section"),
                r(),
                v.elementsInit(),
                clearTimeout(c),
                c = setTimeout(function() {
                    a.afterCb && a.afterCb($bdy, d)
                }, e)
            }
            var c, d = $(a.cnt), e = 300;
            if (d.length) {
                var f = $(a.arrow);
                $nextEl = d.next(),
                $bdy = $("body"),
                debouncedHandler = hp.debounce(b, 1e3, !0),
                a.beforeCb && a.beforeCb($bdy, d),
                "#expertise" !== window.location.hash ? (f.on("click", debouncedHandler),
                d.on("mousewheel", function(a) {
                    a.deltaY < 0 && debouncedHandler()
                }),
                d.on("swipeup", debouncedHandler)) : (e = 0,
                b(),
                $bdy.addClass("prevent-main-section"))
            }
        }
        a({
            cnt: ".entry-section",
            arrow: ".entry-section .btn-scroll",
            cookie: "main-section",
            afterCb: function(a, b) {
                hp.scrollDebounceStop(),
                b.remove(),
                a.removeClass("overflow").addClass("header-active header-white-active"),
                r(),
                v.elementsInit(),
                window.destroyMainCanvas(),
                q(),
                o(),
                n()
            }
        }),
        a({
            cnt: ".how-we-work-page .title-box",
            arrow: ".how-we-work-page .title-box .btn-scroll",
            beforeCb: function(a, b) {
                $("header").css("margin-right", hp.getScrollSize())
            },
            afterCb: function(a, b) {
                hp.scrollDebounceStop(),
                a.removeClass("overflow").addClass("show-main"),
                b.remove(),
                $("header").css("margin-right", 0),
                q(),
                u.check()
            }
        })
    }
    function t() {
        function a() {
            function a() {
                return hp.scrollTo(0),
                !1
            }
            var b = $("#footer")
              , c = b.find(".arrow-up");
            c.bind("click", a)
        }
        a()
    }
    var u = e();
    $(function() {
        u.init(),
        h(),
        s(),
        t(),
        b(),
        c(),
        d(),
        p(),
        m(".contact-form input, .contact-form textarea"),
        l(),
        j(),
        f(),
        g(".gallery-text > div", ".entry-section .btn-enter"),
        v.init()
    }),
    window.addEventListener ? window.addEventListener("load", a, !1) : window.attachEvent && window.attachEvent("onload", a),
    window.initMap = function() {
        var a, b, c, d = $(".map-box .map");
        if (d.length)
            return c = {
                position: {
                    lat: 49.98423,
                    lng: 36.21712
                },
                markerUrl: "images/marker.png"
            },
            a = new google.maps.Map(d.get(0),{
                scrollwheel: !1,
                mapTypeControl: !1,
                zoom: 14,
                center: c.position,
                draggable: !0,
                styles: [{
                    elementType: "geometry",
                    stylers: [{
                        saturation: -100
                    }]
                }]
            }),
            b = new google.maps.Marker({
                position: c.position,
                icon: c.markerUrl,
                map: a
            }),
            a
    }
    ;
    var v = {
        elementsInit: function() {
            this.footer = document.getElementById("footer"),
            this.footer && (this.footerPosition = this.footer.offsetTop,
            this.body = document.body,
            this.windowHeight = window.innerHeight,
            this.documentHeight = document.documentElement.scrollHeight)
        },
        calcSizes: function() {
            var a = this;
            window.clearTimeout(b);
            var b = setTimeout(function() {
                a.footerPosition = this.footer.offsetTop,
                a.windowHeight = window.innerHeight,
                a.documentHeight = document.documentElement.scrollHeight
            }, 400)
        },
        addRemoveClass: function(a) {
            a ? this.body.classList.add("hide-btn") : this.body.classList.remove("hide-btn")
        },
        checkOffset: function() {
            window.pageYOffset + this.windowHeight >= this.footerPosition ? this.addRemoveClass(!0) : this.addRemoveClass(!1)
        },
        resize: function() {
            var a = this;
            window.addEventListener("resize", function() {
                a.calcSizes()
            })
        },
        scroll: function() {
            var a = this;
            document.addEventListener("scroll", function() {
                a.checkOffset(),
                a.calcSizes()
            })
        },
        init: function() {
            this.elementsInit(),
            this.scroll(),
            this.resize()
        }
    }
}();
