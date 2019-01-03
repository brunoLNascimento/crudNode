const pessoa = require('../controllers/pessoa')

module.exports = function(server) {	
	server.get('/pessoa', pessoa.getAll)
}