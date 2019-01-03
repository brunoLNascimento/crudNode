const pessoa = require("../models/pessoa")

exports.getAll = function(req, res){
    pessoa.findAll()
        .then(function(result){
            res.send(result)
        })
        .catch(function(err){
            res.status(500).send(err);
        })    
}