const Sequelize = require('sequelize')
, sequelize = require('../../config/sequelize');

const pessoa = sequelize.define('pessoa',{

	idPessoa: {type: Sequelize.INTEGER, field: 'id_pessoa', allowNull: false, autoIncrement: true, primaryKey: true},
	nome: {type: Sequelize.STRING(50), field: 'nome',  required: true, allowNull: false},
	ativo: {type: Sequelize.BOOLEAN, field: 'fl_ativo', allowNull: false}
	
}, {freezeTableName:true, timestamps:false});

module.exports = pessoa;