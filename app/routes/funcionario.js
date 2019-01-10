const funcionario = require('../controllers/funcionario')

module.exports = function(server) {	
	server.get('/funcionario/:descricao?', funcionario.consulta)
	server.post('/funcionario/incluir', funcionario.incluir)
	server.delete('/funcionario/:idFuncionario?/:nome?', funcionario.remove)
}