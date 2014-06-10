zepto.ajax.lscache
===================

A ZeptoJS plugin for automatically caching, using, and expiring JSON AJAX responses using localStorage.  This is a port of [jQuery.ajax.lscache](https://github.com/brophdawg11/jquery.ajax.lscache), so check there for gory details.

[Unit Tests](https://rawgithub.com/brophdawg11/zepto.ajax.lscache/master/test/index.html)

#### Dependencies

 * [Zepto](http://www.zeptojs.com) - Tested in v1.1.3, but in theory should work with anything supporting the ajaxBeforeSend event.
 * [lscache](https://github.com/brophdawg11/lscache) - Right now this points to a forked version in which some functionality was added to the library.  If a pull request is eventually created/accepted, it can rely on the main library, which is located [here](https://github.com/pamelafox/lscache).  This library is awesome.  If you're not already using it, you should be.

#### Usage

Simply tack on the following options to $.ajax():

  * localCache: Boolean - Specify true to enable the plugin
  * cacheKey: String - What key to use in localStorage
  * cacheTTL: Number - Minutes before the cache should be considered expired
  * isCacheValid: Function - If you want to do some fancy cache invalidation, implement this and return a Boolean and we won't bother checking against cacheTTL.  However, cache invalidation is hard, so cacheTTL is recommended :)

Here's a quick sample call, but take a look at the [Unit Tests](https://rawgithub.com/brophdawg11/zepto.ajax.lscache/master/test/index.html) for a complete examples

    $.ajax({ url: endpoint,
             dataType: 'json',
             localCache: true,
             cacheKey: 'cache-me',
             cacheTTL: 1 })


#### Future Enhancements

 - Add support for the ZeptoJS $.Deferred plugin and interface returned from $.ajax, if the plugin is included
