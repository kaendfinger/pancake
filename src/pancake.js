(function (toApplyTo, name) {
    "use strict";
    if (!("jQuery" in window)) {
        throw new Error("pancakejs requires jQuery.");
    }
    var pancake = toApplyTo[name] = {};

    pancake.Effects = function (element) {
        this.fadeIn = function (time) {
            element.fadeIn(time);
        };
        this.fadeOut = function (time) {
            element.fadeOut(time);
        };
        this.fadeToggle = function (time) {
            element.fadeToggle(time);
        };
        this.show = function () {
            element.show();
        };
        this.hide = function () {
            element.hide();
        };
        this.toggle = function () {
            element.toggle();
        };
        this.slideUp = function (time) {
            element.slideUp(time);
        };
        this.slideDown = function (time) {
            element.slideDown(time);
        };
        this.slideToggle = function (time) {
            element.slideToggle(time);
        };
        this.rotate = function (degrees) {
            element.css("transition", "all 1s");
            element.css("transform", "rotateY(" + degrees + "deg)");
            setTimeout(function() {
                element.css("transform", "");
            }, 1000);
        };
    };

    pancake.speak = function (text, options) {
        if (!("speechSynthesis" in window)) {
            throw new Error("Speech Syntehesis not Supported");
        }
        options = options ? options : {
            lang: navigator.language
        };
        var utterance = new window.SpeechSynthesisUtterance(text);
        var keys = Object.keys(options);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            utterance[key] = options[key];
        }
        window.speechSynthesis.speak(utterance);
    };

    pancake.time = function () {
        return new Date().getTime();
    };

    pancake.userAgent = function () {
        var agent = navigator.userAgent;
        return {
            agent: agent,
            vendor: navigator.vendor,
            platform: navigator.platform
        };
    };

    /**
     * Different Browsers have different ways to detect information.
     */
    pancake.browser = function () {
        if (navigator.userAgent.indexOf("Chrome/") !== -1 && navigator.vendor.indexOf("Google") !== -1) {
            return "Chrome";
        } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            return "Firefox";
        } else if (navigator.userAgent.indexOf("MSIE") !== -1) {
            return "IE";
        } else {
            return "Unknown";
        }
    };

    /**
     * Find all objects in an array that are considered true.
     */
    pancake.findAll = function (a) {
        var all = [];
        for (var i = 0; i < a.length; i++) {
            if (a[i]) {
                all.push(a[i]);
            }
        }
    };

    /* jQuery Integration */
    window.jQuery.fn.effects = function () {
        return new pancake.Effects(this);
    };
})(window, "pancake");