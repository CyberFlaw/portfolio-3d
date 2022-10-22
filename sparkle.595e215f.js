// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/javascript/sparkle.js":[function(require,module,exports) {
var colour = "random"; // "random" can be replaced with any valid colour ie: "red"...

var sparkles = 100; // increase of decrease for number of sparkles falling

var x = ox = 400;
var y = oy = 300;
var swide = 800;
var shigh = 600;
var sleft = sdown = 0;
var tiny = new Array();
var star = new Array();
var starv = new Array();
var starx = new Array();
var stary = new Array();
var tinyx = new Array();
var tinyy = new Array();
var tinyv = new Array();
colours = new Array("#ff0000", "#00ff00", "#ffffff", "#ff00ff", "#ffa500", "#ffff00", "#00ff00", "#ffffff", "ff00ff");
n = 10;
y = 0;
x = 0;
n6 = document.getElementById && !document.all;
ns = document.layers;
ie = document.all;
d = ns || ie ? "document." : 'document.getElementById("';
a = ns || n6 ? "" : "all.";
n6r = n6 ? '")' : "";
s = ns ? "" : ".style";

if (ns) {
  for (i = 0; i < n; i++) {
    document.write('<layer name="dots' + i + '" top=0 left=0 width=' + i / 2 + " height=" + i / 2 + " bgcolor=#ff0000></layer>");
  }
}

if (ie) document.write('<div id="con" style="position:absolute;top:0px;left:0px"><div style="position:relative">');

if (ie || n6) {
  for (i = 0; i < n; i++) {
    document.write('<div id="dots' + i + '" style="position:absolute;top:0px;left:0px;width:' + i / 2 + "px;height:" + i / 2 + "px;background:#ff0000;font-size:" + i / 2 + '"></div>');
  }
}

if (ie) document.write("</div></div>");
ns || n6 ? window.captureEvents(Event.MOUSEMOVE) : 0;

function Mouse(evnt) {
  y = ns || n6 ? evnt.pageY + 4 - window.pageYOffset : event.y + 4;
  x = ns || n6 ? evnt.pageX + 1 : event.x + 1;
}

ns ? window.onMouseMove = Mouse : document.onmousemove = Mouse;

function animate() {
  o = ns || n6 ? window.pageYOffset : 0;
  if (ie) con.style.top = document.body.scrollTop + "px";

  for (i = 0; i < n; i++) {
    var temp1 = eval(d + a + "dots" + i + n6r + s);
    randcolours = colours[Math.floor(Math.random() * colours.length)];
    ns ? temp1.bgColor = randcolours : temp1.background = randcolours;

    if (i < n - 1) {
      var temp2 = eval(d + a + "dots" + (i + 1) + n6r + s);
      temp1.top = parseInt(temp2.top) + "px";
      temp1.left = parseInt(temp2.left) + "px";
    } else {
      temp1.top = y + o + "px";
      temp1.left = x + "px";
    }
  }

  setTimeout("animate()", 10);
}

animate();

window.onload = function () {
  if (document.getElementById) {
    var i, rats, rlef, rdow;

    for (var i = 0; i < sparkles; i++) {
      var rats = createDiv(3, 3);
      rats.style.visibility = "hidden";
      rats.style.zIndex = "999";
      document.body.appendChild(tiny[i] = rats);
      starv[i] = 0;
      tinyv[i] = 0;
      var rats = createDiv(5, 5);
      rats.style.backgroundColor = "transparent";
      rats.style.visibility = "hidden";
      rats.style.zIndex = "999";
      var rlef = createDiv(1, 5);
      var rdow = createDiv(5, 1);
      rats.appendChild(rlef);
      rats.appendChild(rdow);
      rlef.style.top = "2px";
      rlef.style.left = "0px";
      rdow.style.top = "0px";
      rdow.style.left = "2px";
      document.body.appendChild(star[i] = rats);
    }

    set_width();
    sparkle();
  }
};

function sparkle() {
  var c;

  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;

    for (c = 0; c < sparkles; c++) {
      if (!starv[c]) {
        star[c].style.left = (starx[c] = x) + "px";
        star[c].style.top = (stary[c] = y + 1) + "px";
        star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
        star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = colour == "random" ? newColour() : colour;
        star[c].style.visibility = "visible";
        starv[c] = 50;
        break;
      }
    }
  }

  for (c = 0; c < sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }

  setTimeout("sparkle()", 40);
}

function update_star(i) {
  if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";

  if (starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    starx[i] += (i % 5 - 2) / 5;

    if (stary[i] < shigh + sdown) {
      star[i].style.top = stary[i] + "px";
      star[i].style.left = starx[i] + "px";
    } else {
      star[i].style.visibility = "hidden";
      starv[i] = 0;
      return;
    }
  } else {
    tinyv[i] = 50;
    tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
    tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
    tiny[i].style.width = "2px";
    tiny[i].style.height = "2px";
    tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility = "hidden";
    tiny[i].style.visibility = "visible";
  }
}

function update_tiny(i) {
  if (--tinyv[i] == 25) {
    tiny[i].style.width = "1px";
    tiny[i].style.height = "1px";
  }

  if (tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    tinyx[i] += (i % 5 - 2) / 5;

    if (tinyy[i] < shigh + sdown) {
      tiny[i].style.top = tinyy[i] + "px";
      tiny[i].style.left = tinyx[i] + "px";
    } else {
      tiny[i].style.visibility = "hidden";
      tinyv[i] = 0;
      return;
    }
  } else tiny[i].style.visibility = "hidden";
}

document.onmousemove = mouse;

function mouse(e) {
  if (e) {
    y = e.pageY;
    x = e.pageX;
  } else {
    set_scroll();
    y = event.y + sdown;
    x = event.x + sleft;
  }
}

window.onscroll = set_scroll;

function set_scroll() {
  if (typeof self.pageYOffset == "number") {
    sdown = self.pageYOffset;
    sleft = self.pageXOffset;
  } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown = document.body.scrollTop;
    sleft = document.body.scrollLeft;
  } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft = document.documentElement.scrollLeft;
    sdown = document.documentElement.scrollTop;
  } else {
    sdown = 0;
    sleft = 0;
  }
}

window.onresize = set_width;

function set_width() {
  var sw_min = 999999;
  var sh_min = 999999;

  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
    if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
  }

  if (typeof self.innerWidth == "number" && self.innerWidth) {
    if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
    if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
  }

  if (document.body.clientWidth) {
    if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
    if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
  }

  if (sw_min == 999999 || sh_min == 999999) {
    sw_min = 800;
    sh_min = 600;
  }

  swide = sw_min;
  shigh = sh_min;
}

function createDiv(height, width) {
  var div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = height + "px";
  div.style.width = width + "px";
  div.style.overflow = "hidden";
  return div;
}

function newColour() {
  var c = new Array();
  c[0] = 255;
  c[1] = Math.floor(Math.random() * 256);
  c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
  c.sort(function () {
    return 0.5 - Math.random();
  });
  return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
} // ]]>
},{}],"C:/Users/kanna/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51344" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/kanna/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","utils/javascript/sparkle.js"], null)
//# sourceMappingURL=/sparkle.595e215f.js.map