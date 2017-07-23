angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.swiper', 'imageupload', 'toastr', 'ui.select'])

    .controller('HomeCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("index"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

    .controller('aboutCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("about"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

    