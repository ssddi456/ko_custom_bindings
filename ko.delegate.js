define([
  'jquery',
  'knockout'
],function(
  $,
  ko
){
  ko.bindingHandlers.delegate = {
    'init' : function( el, valueAccessor ) {
      var modelVal = valueAccessor();
      $(el).on(modelVal.type, modelVal.selector, function(e) {
        var $data = ko.dataFor( this );
        modelVal.handle.call( $data, $data, e );
      })
    }
  }
});