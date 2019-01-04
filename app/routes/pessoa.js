const pessoa = require('../controllers/pessoa')

module.exports = function(server) {	
	server.get('/pessoa/:descricao?', pessoa.consulta)
	server.post('/pessoa/incluir', pessoa.incluir)
	server.delete('/pessoa/:nome?', pessoa.remove)
}