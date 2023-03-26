ModifiQAppController.controller('alunoDetalheController', function($scope, $routeParams, webRequest, localService, sessionService, alerta, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'alunos';
    $scope.usuario = sessionService.get("usuario");
    $scope.aluno = $routeParams.id;
    $scope.simnao = {
        0: 'Não',
        1: 'Sim'
    }
    $scope.showButton = true;
    loading.show();
    webRequest.get("professor/aluno/"+$scope.aluno, {}, function(ok){
    	loading.hide();
    	$scope.perfil = ok.data.data;
    	$scope.perfil.dtnascimento = $scope.perfil.dtnascimento.split("-");
    	$scope.perfil.dtnascimento = $scope.perfil.dtnascimento[2]+'/'+$scope.perfil.dtnascimento[1]+'/'+$scope.perfil.dtnascimento[0];
    	console.log($scope.perfil);
    }, function(err){
    	//$location.path("/logout");
    });
});