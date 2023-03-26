ModifiQAppController.controller('loginController', function($scope, webRequest, localService, sessionService, $timeout, $rootScope, $interval, $location, loading){
    $scope.form = {
        email: '',
        senha: '',
        lembrar: false
    }
    $scope.alertaTexto = '';
    $scope.showButton = true;
    $scope.submit = function(){
        if($scope.form.email == ''){
            $scope.alertaTexto = 'Preencha o campo E-mail corretamente!';
        }else if($scope.form.senha == ''){
            $scope.alertaTexto = 'Preencha o campo Senha corretamente!';
        }else{
            $scope.alertaTexto = '';
            $scope.showButton = false;
            loading.show();
            webRequest.post("professor/login", $scope.form, function(res){
                loading.hide();
                res.data.data.arquivo = $rootScope.urlApi+'/api/geral/arquivo/'+res.data.data.arquivo+'/ver';
                sessionService.set("usuario", res.data.data);
                if($scope.form.lembrar){
                    localService.set("usuario", res.data.data);
                }
                $rootScope.$broadcast("login");
                $location.path("/dashboard");
            }, function(err){
                loading.hide();
                $scope.alertaTexto = err.data.mensagem;
                $scope.showButton = true;
            });
        }
    }
});