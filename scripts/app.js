angular
.module("ngClassifieds",["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider) {
  $mdThemingProvider.theme('green')
    .primaryPalette('teal')
    .accentPalette('orange');

    $stateProvider
        .state('classifieds', {
          url: '/classifieds',
          templateUrl: 'components/classifieds/classifieds.tpl.html',
          controller: 'classifiedsCtrl as vm'
        })
        .state('classifiedsNew', {
          url: '/new',
          templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
          controller: 'newClassifiedsCtrl as vm'
        });
});
	