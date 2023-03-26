var ModifiQAppController = angular.module('ModifiQApp.controllers', []);

ModifiQAppController.controller('indexController', function($scope, $location, webRequest, alerta, localService, sessionService, $timeout, $rootScope, $interval){
    $scope.logout = function(){
        alerta.show('warning', 'Atenção', 'Deseja realmente efetuar o logout?', true, function(){
            sessionService.destroy("usuario");
            localService.destroy("usuario");
            $location.path("/");
        });
    }
    $rootScope.collapse = function(){
    	var vw = $(window)[0].innerWidth;
        $(".pcoded-main-container").toggleClass("pcoded-main-container-collapsed");
    	if (vw < 991) {
            console.log('menor');
            $(".pcoded-navbar").toggleClass("navbar-collapsed mob-open");
        }else{
            console.log('maior');
            $(".pcoded-navbar").toggleClass("navbar-collapsed");
        }
    }
    $rootScope.usuario = {};
     $rootScope.$on("login",function(){
        $rootScope.usuario = sessionService.get("usuario");
        $rootScope.loginToken = $scope.usuario.token;
    });
     
    var localData = localService.get("usuario");
    var sessionData = sessionService.get("usuario");
    if(localData || sessionData){
        if(localData && !sessionData){
            sessionService.set("usuario", localData);
        }
        $rootScope.$broadcast("login");
        if($location.url() == ""){
            $location.path("/dashboard");
        }
    }
    $rootScope.acessarAula = function(){
        var usuario = sessionService.get("usuario");
        var url = ModifiqAulaUrl + '/#!/home/1/'+usuario.id;
        window.open(url, '_blank');
    }
});

ModifiQAppController.controller('menuController', function($scope, $location, webRequest, localService, sessionService, $timeout, $rootScope, $interval){
    $rootScope.usuario = {};
    $scope.$watch("login",function(){
        $rootScope.usuario = sessionService.get("usuario");
    });
});