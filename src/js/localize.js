/*global chrome */
var diLocalize = { // eslint-disable-line no-unused-vars
    documentReadyAsPromsied: function (doc) {
        return new Promise(function (resolve, reject) {
            if (doc.readyState !== 'loading') {
                resolve();
            } else {
                doc.addEventListener('DOMContentLoaded', function () {
                    resolve();
                });
            }
        });
    },

    localiseHtml: function (parentEl) {
        var replaceFunc = function (match, p1) {
            return p1 ? chrome.i18n.getMessage(p1) : '';
        };
        Array.prototype.forEach.call(parentEl.getElementsByTagName('*'), function (el) {
            if (el.hasAttribute('data-i18n')) {
                el.innerHTML = el.getAttribute('data-i18n').replace(/__MSG_(\w+)__/g, replaceFunc);
                el.removeAttribute('data-i18n');
            }
            if (el.hasAttribute('data-i18n-tooltip')) {
                el.setAttribute('tooltip', el.getAttribute('data-i18n-tooltip').replace(/__MSG_(\w+)__/g, replaceFunc));
                el.removeAttribute('data-i18n-tooltip');
            }
            if (el.hasAttribute('data-i18n-placeholder')) {
                el.setAttribute('placeholder', el.getAttribute('data-i18n-placeholder').replace(/__MSG_(\w+)__/g, replaceFunc));
                el.removeAttribute('data-i18n-placeholder');
            }
        });
    },

    documentReadyAndLocalisedAsPromsied: function (doc) {
        var self = this;
        return self.documentReadyAsPromsied(doc).then(function () {
            return self.localiseHtml(doc);
        });
    }
};