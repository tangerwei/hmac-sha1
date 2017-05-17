(function (w) {
    w.b64_hmac_sha1 = function (k, d, _p, _z) {
        if (!_p) { _p = '='; } if (!_z) { _z = 8; } function _f(t, b, c, d) { if (t < 20) { return (b & c) | ((~b) & d); } if (t < 40) { return b ^ c ^ d; } if (t < 60) { return (b & c) | (b & d) | (c & d); } return b ^ c ^ d; } function _k(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; } function _s(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); } function _r(n, c) { return (n << c) | (n >>> (32 - c)); } function _c(x, l) { x[l >> 5] |= 0x80 << (24 - l % 32); x[((l + 64 >> 9) << 4) + 15] = l; var w = [80], a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776; for (var i = 0; i < x.length; i += 16) { var o = a, p = b, q = c, r = d, s = e; for (var j = 0; j < 80; j++) { if (j < 16) { w[j] = x[i + j]; } else { w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1); } var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j))); e = d; d = c; c = _r(b, 30); b = a; a = t; } a = _s(a, o); b = _s(b, p); c = _s(c, q); d = _s(d, r); e = _s(e, s); } return [a, b, c, d, e]; } function _b(s) { var b = [], m = (1 << _z) - 1; for (var i = 0; i < s.length * _z; i += _z) { b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - i % 32); } return b; } function _h(k, d) { var b = _b(k); if (b.length > 16) { b = _c(b, k.length * _z); } var p = [16], o = [16]; for (var i = 0; i < 16; i++) { p[i] = b[i] ^ 0x36363636; o[i] = b[i] ^ 0x5C5C5C5C; } var h = _c(p.concat(_b(d)), 512 + d.length * _z); return _c(o.concat(h), 512 + 160); } function _n(b) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = ''; for (var i = 0; i < b.length * 4; i += 3) { var r = (((b[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > b.length * 32) { s += _p; } else { s += t.charAt((r >> 6 * (3 - j)) & 0x3F); } } } return s; } function _x(k, d) { return _n(_h(k, d)); } return _x(k, d);
    }
    // if a<b return true,else return false
    var compare = function (a, b) {
        var aArray = a.split(""), bArray = b.split("");
        var minLength = aArray.length < b.length ? aArray.length : b.length;
        for (var i = 0; i < minLength; i++) {
            if (aArray[i].charCodeAt(0) < bArray[i].charCodeAt(0)) {
                return true;
            } else if (aArray[i].charCodeAt(0) > bArray[i].charCodeAt(0)) {
                return false;
            }
        }
        return false;
    }
    //数组排序
    var sortArray = function (array) {
        if (!array) {
            return [];
        } else {
            var t, _array = [];
            for (var k = 0; k < array.length; k++) {
                t = array[k];
                for (var i = k; i < array.length; i++) {
                    if (compare(array[i].key, t.key)) {
                        //get min
                        t = array[i];
                        //exchange i & k
                        var tmp = array[i];
                        array[i] = array[k];
                        array[k] = tmp;
                    }
                }
                _array.push(t);
            }
            return _array;
        }
    }
    var createXHR = function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "underfined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object avilable");
        }
    }
    w.QueryHengQian = function (obj) {
        this.url = obj.url || null;
        if (!obj.secretKey) {
            throw new Error("请设置secretKey");
        } else {
            this.secretKey = obj.secretKey;
        }
    }
    QueryHengQian.prototype = {
        init: function () {
            var u = this.url.split("?"), queryList = [];
            if (u.length > 1) {
                queryList = u[1].split("&").map(function (v) {
                    return {
                        key: v.split("=")[0],
                        value: v.split("=")[1]
                    }
                });
                queryList.push({
                    key: "timeTamp",
                    value: parseInt((new Date()).getTime() / 1000)
                })
            }
            this.baseurl = u[0];
            this.queryList = sortArray(queryList);
        },
        //可以添加调用queryData的时候添加function设置对应的xhr
        queryData: function (func) {
            this.init();
            var xhr = createXHR();
            var wholeUrl = this.baseurl + "?" + this.queryList.map(function (v) {
                return v.key + "=" + v.value;
            }).join("&") + "&sign=" + encodeURIComponent(this.getSign());
            xhr.open("GET", wholeUrl, true);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        if (typeof func == "function") {
                            func(xhr);
                        }
                    }
                }
            }
            xhr.send();
            //used to open window
            return wholeUrl;
        },
        getSign: function () {
            var signMap = encodeURIComponent(this.baseurl) + "&" + this.queryList.map(function (v) {
                return v.key + "%3D" + v.value;
            }).join("%26");
            return b64_hmac_sha1(this.secretKey, signMap);
        }
    }
})(window);