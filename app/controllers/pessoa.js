const pessoa = require("../models/pessoa")

exports.consulta = function(req, res){
    var nome = req.params.descricao;
    
    if(nome != null && nome != undefined){
        pessoa.findAll({
            where: {nome: {$like:'%' +nome + '%' }, fl_ativo: true},
            order:['nome']
        })
            .then(function(result){
                if(result.length){
                    res.send(result)
                }else{
                    res.send("Pessoa com nome '" + nome + "' não foi encontrado!")
                }
            })
    }else{
        pessoa.findAll({
            where: {fl_ativo: true}
        })
            .then(function(result){
                if(result.length){
                    res.send(result)
                }else{
                    res.send("Nenhum nome foi encontrado!")
                }
            })
            .catch(function(err){
                res.status(500).send(err);
            })
    }
}

exports.incluir = function(req, res){
    var salvar = pessoa.build({
        'nome': req.body.nome
    });

    salvar.save().complete(function (err){
        if(err){
            res.send("Não foi possível salvar, tente mais tarde.");
        };
        res.send("salvo com sucesso!");
    })
}

exports.remove = function(req,res){
    var nome = req.params.nome;

    if(nome == undefined || nome == null){
        res.send( "Campo nome é obrigatório!")
    }

    pessoa.findOne({
        where: {nome: nome, fl_ativo: 1}
    })
        .then(function(result){
            if(result){
                result.update({'ativo': '0'})
                .complete(function (err){
                    if(err){
                        emitter.emit('error', err, req, res);
                    };
                    res.send(nome+ " excluído com sucesso!");

                })
            }else{
                res.send("Pessoa com nome '" + nome + "' não foi encontrado!")
            }
        })
}
