(function() {
  'use strict';

  angular
    .module('tradingsite')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
