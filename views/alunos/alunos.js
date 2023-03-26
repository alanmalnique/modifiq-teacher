ModifiQAppController.controller('alunosController', function($scope, webRequest, localService, sessionService, $timeout, $rootScope, $interval, $location, loading){
    $rootScope.pagina = 'alunos';
    $scope.usuario = sessionService.get("usuario");
    $scope.paginacao = {
    	page: 1,
    	per_page: 20,
    	total: 0,
        last_page: 1,
        current_page: 1
    }
    $scope.alunos = {};
    $scope.carregaAlunos = function(){
    	loading.show();
    	webRequest.get("professor/aluno", $scope.paginacao, function(ok){
    		loading.hide();
    		$scope.alunos = ok.data;
            $scope.paginacao = ok.data;
    	});
    }
    $scope.carregaAlunos();
    $scope.visualizar = function(id){
        $location.path("/alunos/detalhe/"+id);
    }
    $scope.registro = function(id){
        $location.path("/alunos/registroevolutivo/"+id);
    }
    $scope.getSubArray = function () {
        var paginas = ($scope.paginacao.total > $scope.paginacao.per_page ? parseInt($scope.paginacao.total / $scope.paginacao.per_page) : 1);
        var array = [];
        for(var i = 0; i < paginas; i++){
            array.push(i+1);
        }
        return array;
    }
    $scope.pagina = function(pagina){
        $scope.paginacao.page = pagina;
        $scope.carregaAlunos();
    }
    $scope.proximaPagina = function(){
        $scope.pagina($scope.paginacao.current_page + 1);
    }
    $scope.paginaAnterior = function(){
        $scope.pagina($scope.paginacao.current_page - 1);
    }
});