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
        $scope.url="About/getAciveAbout"
        NavigationService.callApi($scope.url, function (data) {     
            $scope.about = data.data[0];
            // $scope.describe.push($scope.description);
            console.log("data of about:",$scope.about);
        });
    })

    .controller('servicesCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("services"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
        $scope.url="Services/getService"
        NavigationService.callApi($scope.url, function (data) {     
            $scope.service = data.data[0];
            // $scope.describe.push($scope.description);
            console.log("data of service:",$scope.service);
        });
    })

    .controller('teamCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("team"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

    .controller('subServicesCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("single-services"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

        .controller('singleTeamCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("single-team"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

     .controller('portfolioCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("portfolio1"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })

    .controller('contactCtrl', function ($state, $scope, $rootScope, TemplateService, NavigationService, $timeout, $location, anchorSmoothScroll, $uibModal) {
        $scope.template = TemplateService.changecontent("contact"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Weding Destination"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.locString = [];
        $scope.navigation = NavigationService.getnav(); 
    })






    