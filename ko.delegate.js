define([
  'jquery',
  'knockout'
],function(
  $,
  ko
){
  function apply_delegate ( el, modelVal ) {
    $(el).on(modelVal.type, modelVal.selector, function(e) {
      var $data = ko.dataFor( this );
      modelVal.handle.call( $data, $data, e );
    });
  }
  ko.bindingHandlers.delegate = {
    'init' : function( el, valueAccessor ) {
      var modelVal = valueAccessor();
      if( $.isArray(modelVal) ){
        $.each(modelVal,function(idx, modelVal) {
          apply_delegate( el, modelVal );
        })
      } else {
        apply_delegate( el, modelVal );
      }
    }
  }
});