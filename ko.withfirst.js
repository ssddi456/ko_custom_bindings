define([
  'knockout'
],function(
  ko
){
  ko.bindingHandlers.withfirst = {
    'init' : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var savedNodes;
      ko.computed(function() {
        var dataValue = ko.utils.unwrapObservable(valueAccessor());
        var shouldDisplay = typeof dataValue.length == "number" && dataValue.length;
        var isFirstRender = !savedNodes;

        // Save a copy of the inner nodes on the initial update, 
        // but only if we have dependencies.
        if (isFirstRender && ko.computedContext.getDependenciesCount()) {
          savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
        }

        if (shouldDisplay) {
          if (!isFirstRender) {
            ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(savedNodes));
          }
          ko.applyBindingsToDescendants(  bindingContext['createChildContext'](dataValue && dataValue[0]), element);
        } else {
          ko.virtualElements.emptyNode(element);
        }

      }, null).extend({ rateLimit: 50 });
      return { 'controlsDescendantBindings': true };
    }
  }
});