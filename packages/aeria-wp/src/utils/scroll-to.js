
  var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

  var easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  };

  var animatedScrollTo = function (element, offset, duration, callback) {

      var to = window.pageYOffset + element.getBoundingClientRect().top - offset
      var start = window.pageYOffset,
      change = to - start,
      animationStart = Date.now();
      var animating = true;
      var lastpos = null;

      var animateScroll = function() {
          if (!animating) {
              return;
          }
          requestAnimFrame(animateScroll);
          var now = Date.now();
          var val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
          if (lastpos) {
              if (lastpos === window.pageYOffset) {
                  lastpos = val;
                  window.scrollTo(0,val);
              } else {
                  animating = false;
                  if (callback) { callback(); }
              }
          } else {
              lastpos = val;
              window.scrollTo(0,val);
          }
          if (now > animationStart + duration) {
              window.scrollTo(0,to);
              animating = false;
              if (callback) { callback(); }
          }
      };
      requestAnimFrame(animateScroll);
  };

  export default animatedScrollTo
