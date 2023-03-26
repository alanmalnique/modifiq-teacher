ModifiQAppController.controller('registroEvolutivoController', function($scope, alerta, $routeParams, webRequest, sessionService, localService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'alunos';
    $scope.usuario = sessionService.get("usuario");
    $scope.paginacao = {
        per_page: 10,
        page: 1,
        id: $routeParams.id
    }
    $scope.upload = {
        titulo: '',
        descricao: ''
    }
    $scope.registros = [];
    $scope.total = 0;
    $scope.carregaRegistros = function(page){
        loading.show();
        webRequest.get("aluno/registroevolutivo", $scope.paginacao, function(ok){
            for(var i = 0; i < ok.data.data.length; i++){
                $scope.registros.push(ok.data.data[i]);
            }
            $scope.total = ok.data.total;
            loading.hide();
        })
    }
    $scope.carregaRegistros(1);
    $scope.verMais = function(){
        $scope.paginacao.page += 1;
        $scope.carregaRegistros($scope.paginacao.page);
    }
});