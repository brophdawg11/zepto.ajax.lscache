$(document).on('ajaxBeforeSend', function (e, xhr, options) {

  // Cache it ?
  if (!options.localCache) { return; }

  // Default 10 minute expiration
  var minstl = options.cacheTTL || 10;

  // Build default key from URL if not specified
  var cacheKey = options.cacheKey ||
                 options.url.replace(/callback=.*/, '') + options.type + (options.data || '');

  // User specified validation function overrides actual expiration status
  var isValid = typeof options.isCacheValid === 'function' ?
                  options.isCacheValid() :
                  !lscache.isExpired(cacheKey);

  // Look for a cached value, accepting an expired one
  var value = lscache.get(cacheKey, true, true);

  // Grab the user specified success/error functions
  var noop = function () {};
  var realerror = (typeof options.error === 'function') ? options.error : noop;
  var realsuccess = (typeof options.success === 'function') ? options.success : noop;

  if (isValid && value) {
    realsuccess(value);
    options.error = noop;  // The request will error out when we cancel
    return false;  // Cancel request
  } else {
    // We're launching the request.  On failure, we accept an expired value
    isValid = true;

    options.success = function (data) {
      var args = Array.prototype.slice.call(arguments);
      lscache.set(cacheKey, data, minstl);
      realsuccess(data);
    };

    // If the request fails, try to use a cached value
    options.error = function () {
      var args = Array.prototype.slice.call(arguments);

      // Do we have a valid cached value we can use?
      if (isValid && value != null) {
        realsuccess(value)
      } else {
        realerror.apply(this, args);
      }
    };

    return true;
  }
});
