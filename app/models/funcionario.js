const Sequelize = require('sequelize')
, sequelize = require('../../config/sequelize');

const funcionario = sequelize.define('funcionario',{
	
    	idfuncionario: {type: Sequelize.INTEGER, field: 'id_funcionario', allowNull: false, autoIncrement: true, primaryKey: true},
        nome: {type: Sequelize.STRING(100), field: 'nome',  required: true, allowNull: false},
        cargo: {type: Sequelize.STRING(100), field: 'cargo',  required: true, allowNull: false},
        salario: {type: Sequelize.INTEGER, field: 'salario',  required: true, allowNull: false},
        descricao: {type: Sequelize.STRING(200), field: 'descricao',  required: true, allowNull: false},
        dt_admissao:{type: Sequelize.DATE, field: 'dt_admissao', allowNull: false}, 
        dt_demissao:{type: Sequelize.DATE, field: 'dt_demissao', allowNull: true}, 
        dt_nascimento: {type: Sequelize.DATE, field: 'dt_nascimento', allowNull: false}, 
        cpf: {type: Sequelize.STRING(11), field: 'cpf', allowNull: false}, 
        email: {type: Sequelize.STRING(50),  field: 'email', allowNull: true},
        cep: {type: Sequelize.INTEGER, field: 'cep', allowNull: false}, 
        uf: {type: Sequelize.STRING(2), field: 'uf', allowNull: false},
        cidade: {type: Sequelize.STRING(50), field: 'cidade', allowNull: false},
        bairro: {type: Sequelize.STRING(50), field: 'bairro', allowNull: false},
        dt_atualizacao: {type: Sequelize.DATE, field: 'dt_atualizacao', defaultValue: new Date()},
        ativo: {type: Sequelize.BOOLEAN, field: 'fl_ativo' , allowNull: false},
	
}, {freezeTableName:true, timestamps:false});

module.exports = funcionario;

//formart no model