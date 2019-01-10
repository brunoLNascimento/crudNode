const funcionario = require("../models/funcionario")
var moment = require('moment');

exports.consulta = function(req, res){
    var nome = req.params.descricao;
    
    if(nome != null && nome != undefined){
        funcionario.findAll({
            where: {
                nome: {$like:'%' +nome + '%' }, 
                fl_ativo: true
            },
            order:['nome']
        }).then(function(resultadoEncontrado){
                if(resultadoEncontrado.length){
                    res.send(resultadoEncontrado)
                }else{
                    res.send("funcionario '" + nome + "' não foi encontrado!")
                }
            })
    }else{
        funcionario.findAll({
            where: {fl_ativo: true}
        }).then(function(resultadoEncontrado){
                if(resultadoEncontrado.length){
                    res.send(resultadoEncontrado)
                }else{
                    res.send("Nenhum funcionário foi encontrado!")
                }
            })
            .catch(function(err){
                res.send("Tente novamente mais tarde");
            })
    }
}

exports.incluir = function(req, res){
    
    validarCampos(req, res);
    
    if(!req.body.dt_demissao){
        req.body.dt_demissao = null
    }
    
    var salvar = funcionario.build({
        "nome": req.body.nome,
        "cargo": req.body.cargo,
        "salario": req.body.salario,
        "descricao": req.body.descricao,
        "dt_admissao": req.body.dt_admissao,
        "dt_demissao": req.body.dt_demissao,
        "dt_nascimento": req.body.dt_nascimento,
        "cpf": req.body.cpf,
        "email": req.body.email,
        "cep": req.body.cep,
        "uf": req.body.uf,
        "cidade": req.body.cidade,
        "bairro": req.body.bairro,
        "ativo": true
    });

    //consulta CPF
    funcionario.findOne({
        where: {cpf: req.body.cpf}
    }).then(function(resultadoEncontrado){
       
       if(resultadoEncontrado){
        var idfuncionario = resultadoEncontrado.dataValues.idfuncionario
       }else{
        var idfuncionario = null
       } 
    
    //Incluir funcionário
        if(!idfuncionario){
            salvar.save().complete(function (err){
                if(err){
                    res.send("Não foi possível salvar, tente mais tarde.");
                }else{
                    res.send(req.body.nome+ " salvo com sucesso!");
                }
            })
        }

    //Editar funcionário
       if(idfuncionario){
       
        if(!req.body.dt_demissao){
            req.body.dt_demissao = null
        }
            resultadoEncontrado.updateAttributes({
                'nome': req.body.nome,
                "cargo": req.body.cargo,
                "salario": req.body.salario,
                "descricao": req.body.descricao,
                "dt_admissao": req.body.dt_admissao,
                "dt_demissao": req.body.dt_demissao,
                'dt_nascimento': req.body.dt_nascimento,
                "cpf": req.body.cpf,
                "email": req.body.email,
                "cep": req.body.cep,
                "uf": req.body.uf,
                "cidade": req.body.cidade,
                "bairro": req.body.bairro,
                "ativo": true
            }).complete(function (err){
                if(err){
                    res.send("Erro ao tentar atualizar '" +req.body.nome+ "', tente mais tarde!");
                }else{
                    res.send("Funcionário '" +req.body.nome+ " Atualizado com sucesso!");
                }
            })
        }
    }) 
}
    
exports.remove = function(req,res){
    var idfuncionario = req.params.idFuncionario;
    var nome = req.params.nome;

    if(nome == undefined || nome == null){
        res.send( "Campo nome é obrigatório!")
    }

    funcionario.findOne({
        where: {id_funcionario: idfuncionario, fl_ativo: true}
    }).then(function(resultadoEncontrado){

    // funcionario.findOne({
    //     where: {nome: nome, fl_ativo: 1}
    // }).then(function(resultadoEncontrado){
        if(resultadoEncontrado){
            resultadoEncontrado.update({
                'ativo': '0'
            }).complete(function (err){
                if(err){
                    res.send("Erro ao excluir '" +nome+ "', tente mais tarde!");
                };
                res.send("Funcionário '" +nome+ "' excluído com sucesso!");
            })
        }else{
            res.send("funcionário '" + nome + "' não foi encontrado!")
        }
    })
}

function validarCampos(req, res){
  
    if(!req.body.nome){
        res.send("Favor preencha o campo nome")
    }
    if(!req.body.cargo){
        res.send("Favor preencha o campo cargo")
    }
    if(!req.body.salario){
        res.send("Favor preencha o campo Salário")
    }
    if(!req.body.descricao){
        res.send("Favor preencha o campo descrição")
    }
    if(!req.body.dt_admissao){
        res.send("Favor preencha o campo admissao")
    }
    if(!req.body.dt_nascimento){
        res.send("Favor preencha o campo Nascimento")
    }
    if(!req.body.cpf){
        res.send("Favor preencha o campo CPF")
    }
    if(!req.body.email){
        res.send("Favor preencha o campo e-mail")
    }
    if(!req.body.cep){
        res.send("Favor preencha o campo CEP")
    }
    if(!req.body.uf){
        res.send("Favor preencha o campo UF")
    }
    if(!req.body.cidade){
        res.send("Favor preencha o campo Cidade")
    }
    if(!req.body.bairro){
        res.send("Favor preencha o campo Bairro")
    }
    
}