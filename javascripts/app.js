(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fullpage = require('fullpage.js');

var _fullpage2 = _interopRequireDefault(_fullpage);

var _slickCarousel = require('slick-carousel');

var _slickCarousel2 = _interopRequireDefault(_slickCarousel);

var _fancybox = require('fancybox');

var _fancybox2 = _interopRequireDefault(_fancybox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainNavLinks = (0, _jquery2.default)('.main-nav li a');

(0, _jquery2.default)(document).ready(function ($) {
  $('#fullpage').fullpage({
    anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5', 'page-6', 'page-7', 'page-8', 'page-9', 'page-10'],
    menu: ' #menu',
    navigation: true,
    navigationPosition: 'left',
    responsiveWidth: 961,
    onLeave: function onLeave(link, index) {
      if (index === 1 || index === 3 || index === 5 || index === 7 || index === 9) {
        $('.page-header').css('color', '#ffffff');
        $('.page-header__mail a').css('color', '#ffffff');
        $('.page-header__tel-btn').css('color', '#ffffff');
        $('.page-header__logo').css('background', 'url("../images/logo-white.png")');
        $('.page-header__logo').css('background-repeat', 'no-repeat');
        $('.burger').css('background', 'url("../images/burger-white.png")');
        $('.page-header__logo').css('background-size', 'contain');
        $('.main-nav li a').css('color', '#ffffff');
        $('.main-nav__btn-close').css('background', 'url("../images/main-nav-close-white.png")');
        $('.main-nav__blur').css('background', 'rgba(0,0,0,0.8)');

        for (var i = 0; mainNavLinks.length > i; i++) {
          mainNavLinks[i].addEventListener('mouseenter', function (evt) {
            evt.target.style.color = '#accc3d';
          });
          mainNavLinks[i].addEventListener('mouseout', function (evt) {
            evt.target.style.color = '#ffffff';
          });
        };
      } else {
        $('.page-header').css('color', '#000000');
        $('.page-header__mail a').css('color', '#000000');
        $('.page-header__tel-btn').css('color', '#000000');
        $('.page-header__logo').css('background', 'url("../images/logo-black.png")');
        $('.page-header__logo').css('background-size', 'contain');
        $('.page-header__logo').css('background-repeat', 'no-repeat');
        $('.burger').css('background', 'url("../images/burger-black.png")');
        $('.main-nav li a').css('color', '#000000');
        $('.main-nav__btn-close').css('background', 'url("../images/main-nav-close-black.png")');
        $('.main-nav__blur').css('background', 'rgba(255,255,255,0.8)');

        for (var i = 0; mainNavLinks.length > i; i++) {
          mainNavLinks[i].addEventListener('mouseenter', function (evt) {
            evt.target.style.color = '#accc3d';
          });
          mainNavLinks[i].addEventListener('mouseout', function (evt) {
            evt.target.style.color = '#000000';
          });
        };
      }
    }
  });
});

(0, _jquery2.default)('.main-nav__btn-close').click(function () {
  (0, _jquery2.default)('.main-nav').addClass('hidden');
  (0, _jquery2.default)('.main-nav__blur').addClass('hidden');
});

(0, _jquery2.default)('.burger').click(function () {
  (0, _jquery2.default)('.main-nav').removeClass('hidden');
  (0, _jquery2.default)('.main-nav__blur').removeClass('hidden');
});

(0, _jquery2.default)('.page-header__tel-btn').click(function () {
  (0, _jquery2.default)('.popup__phone').removeClass('hidden');
});

(0, _jquery2.default)('.section2__form-btn').click(function () {
  (0, _jquery2.default)('.popup__phone').removeClass('hidden');
});

(0, _jquery2.default)('.section5__btn').click(function () {
  (0, _jquery2.default)('.popup__phone').removeClass('hidden');
});

(0, _jquery2.default)('.section7__btn').click(function () {
  (0, _jquery2.default)('.popup__phone').removeClass('hidden');
});

(0, _jquery2.default)('.section8__btn').click(function () {
  (0, _jquery2.default)('.popup__ask').removeClass('hidden');
});

(0, _jquery2.default)('.section9__btn').click(function () {
  (0, _jquery2.default)('.popup__review').removeClass('hidden');
});

(0, _jquery2.default)('.section10__btn').click(function () {
  (0, _jquery2.default)('.popup__phone').removeClass('hidden');
});

(0, _jquery2.default)('.popup__btn-close').click(function () {
  (0, _jquery2.default)('.popup__phone').addClass('hidden');
  (0, _jquery2.default)('.popup__ask').addClass('hidden');
  (0, _jquery2.default)('.popup__review').addClass('hidden');
  (0, _jquery2.default)('.popup__success-phone').addClass('hidden');
  (0, _jquery2.default)('.popup__success-ask').addClass('hidden');
  (0, _jquery2.default)('.popup__success-review').addClass('hidden');
  (0, _jquery2.default)('.popup__slider').addClass('hidden');
});

(0, _jquery2.default)('.section3__big-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
  asNavFor: '.section3__min-slider',
  focusOnSelect: false
});

(0, _jquery2.default)('.section3__min-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  appendArrows: (0, _jquery2.default)('.section3-slider__arrows'),
  prevArrow: '<button id="prev" type="button" class="btn section3-btn-prev"><span class = "section3-btn-prev-text">Назад</span><div class="section3-btn-prev-arrow"></div></button>',
  nextArrow: '<button id="next" type="button" class="btn section3-btn-next"><span class = "section3-btn-next-text">Вперед</span><div class="section3-btn-next-arrow"></div></button>',
  autoplay: true,
  autoplaySpeed: 3000,
  asNavFor: '.section3__big-slider'
});

(0, _jquery2.default)('.section3__counter-min').text('0' + (0, _jquery2.default)('.section3__big-slider .big-slider__slide').length);

(0, _jquery2.default)('.section3__big-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  (0, _jquery2.default)('.section3__counter-big').text('0' + (nextSlide + 1));
});

(0, _jquery2.default)('.section9__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  appendArrows: (0, _jquery2.default)('.section9-slider__arrows'),
  prevArrow: '<button id="prev" type="button" class="btn section3-btn-prev"><span class = "section3-btn-prev-text">Назад</span><div class="section3-btn-prev-arrow"></div></button>',
  nextArrow: '<button id="next" type="button" class="btn section3-btn-next"><span class = "section3-btn-next-text">Вперед</span><div class="section3-btn-next-arrow"></div></button>',
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true
});

(0, _jquery2.default)('.section9__counter-min').text('0' + (0, _jquery2.default)('.section9__slide').length);

(0, _jquery2.default)('.section9__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  (0, _jquery2.default)('.section9__counter-big').text('0' + (nextSlide + 1));
});

(0, _jquery2.default)('.popup__slids').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  pauseOnHover: true,
  appendArrows: (0, _jquery2.default)('.popup-slider__arrows'),
  prevArrow: '<button id="prev" type="button" class="btn section3-btn-prev popup-slider-prev"><span class = "section3-btn-prev-text popup__slider-prev-text">Назад</span><div class="section3-btn-prev-arrow"></div></button>',
  nextArrow: '<button id="next" type="button" class="btn section3-btn-next popup-slider-next"><span class = "section3-btn-next-text popup__slider-next-text">Вперед</span><div class="section3-btn-next-arrow"></div></button>'
});

(0, _jquery2.default)('.popup__slider__counter-min').text((0, _jquery2.default)('.popup__slid').length);

(0, _jquery2.default)('.popup__slids').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  if (nextSlide + 1 < 10) {
    (0, _jquery2.default)('.popup__slider__counter-big').text('0' + (nextSlide + 1));
  } else {
    (0, _jquery2.default)('.popup__slider__counter-big').text(nextSlide + 1);
  }
});

var checkBox1 = (0, _jquery2.default)('.section1__form-checkbox');
checkBox1.change(function () {
  if (checkBox1.prop('checked')) {
    (0, _jquery2.default)('.checkbox__circle').animate({ "left": "23px" }, "fast");
    (0, _jquery2.default)('.checkbox__yes').css("display", "block");
  } else {
    (0, _jquery2.default)('.checkbox__circle').animate({ "left": "0" }, "fast");
    (0, _jquery2.default)('.checkbox__yes').css("display", "none");
  }
});

var checkBox2 = (0, _jquery2.default)('.popup__phone .section1__form-checkbox');
checkBox2.change(function () {
  if (checkBox2.prop('checked')) {
    (0, _jquery2.default)('.popup__phone .checkbox__circle').animate({ "left": "23px" }, "fast");
    (0, _jquery2.default)('.popup__phone .checkbox__yes').css("display", "block");
  } else {
    (0, _jquery2.default)('.popup__phone .checkbox__circle').animate({ "left": "0" }, "fast");
    (0, _jquery2.default)('.popup__phone .checkbox__yes').css("display", "none");
  }
});

var checkBox3 = (0, _jquery2.default)('.popup__ask .section1__form-checkbox');
checkBox3.change(function () {
  if (checkBox3.prop('checked')) {
    (0, _jquery2.default)('.popup__ask .checkbox__circle').animate({ "left": "23px" }, "fast");
    (0, _jquery2.default)('.popup__ask .checkbox__yes').css("display", "block");
  } else {
    (0, _jquery2.default)('.popup__ask .checkbox__circle').animate({ "left": "0" }, "fast");
    (0, _jquery2.default)('.popup__ask .checkbox__yes').css("display", "none");
  }
});

var checkBox4 = (0, _jquery2.default)('.popup__review .section1__form-checkbox');
checkBox4.change(function () {
  if (checkBox4.prop('checked')) {
    (0, _jquery2.default)('.popup__review .checkbox__circle').animate({ "left": "23px" }, "fast");
    (0, _jquery2.default)('.popup__review .checkbox__yes').css("display", "block");
  } else {
    (0, _jquery2.default)('.popup__review .checkbox__circle').animate({ "left": "0" }, "fast");
    (0, _jquery2.default)('.popup__review .checkbox__yes').css("display", "none");
  }
});

var askElements = (0, _jquery2.default)('.section8__ask');

askElements.each(function (i, element) {
  (0, _jquery2.default)(element).click(function (evt) {
    evt.preventDefault();

    var slideNumber = (0, _jquery2.default)(evt.target).attr('data-slide');

    (0, _jquery2.default)('.popup__slider').removeClass('hidden');

    (0, _jquery2.default)('.popup__slids').slick('slickGoTo', slideNumber);
  });
});

(0, _fancybox2.default)(_jquery2.default);

(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)("a[rel=lightbox-group]").fancybox({
    helpers: {
      overlay: {
        css: {
          'background': 'rgba(255,255,255,0.5)'
        }
      }
    }
  });
});

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map