var conexao = require ("./conexaoBanco");
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('view engine', 'ejs');

//conexão ao banco de dados somente no inicio

conexao.connect(function(error){
   if(error){
    console.error("Erro ao conectar no bano de dados:", error);
    process.exit(); //encerrar o servidor caso a conexão falhe
   }
});

app.use(bodyParser.urlencoded({ extended: true}));


app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;

    


    //previnindo SQL Injection

    var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
   conexao.query(sql, [nomecompleto, email, senha], function(error, result){
    if(error) throw error;

    //res.send("Estudante cadastrado com sucesso! " + result.insertId);
    
    res.redirect('/estudantes');
   })
    
});



app.get('/', function(req,res){
    res.sendFile(__dirname+ '/cadastro.html');
})

app.get('/estudantes', function(req,res){
    
        var sql = "select * from estudante";
        conexao.query(sql, function(error, result){
            if(error) console.log(error);
            //console.log(result);
            res.render(__dirname+"/estudantes", {estudante:result});
        });
    });


    app.get('/delete-estudante', function(req, res){
        var sql = "DELETE FROM estudante where id=?"
        var id = req.query.id

        conexao.query(sql, [id], function(error, result){
            if(error) console.log(error)

            res.redirect('/estudantes');
        })
    })


    //Rota update

    app.get('/update-estudante', function(req,res){

        var sql = "select * from estudante where id=?";

        var id = req.query.id;

        conexao.query(sql, [id], function(error, result){
            if(error) console.log(error);

            res.render(__dirname+'/alterarEstudantes', {estudante:result});
        });
    });

    app.post('/update-estudante', function(req, res){
        var nomecompleto = req.body.nomecompleto;
        var email = req.body.email;
        var senha = req.body.senha;
        var id = req.body.id;

        var sql = "UPDATE estudante set nomecompleto=?, email=?, senha=? where id=?"
        var id = req.query.id;

        conexao.query(sql, [nomecompleto,email, senha, id], function(error, result){
            if(error) console.log(error);
            res.render(__dirname+'/alterarEstudantes, {estudante:result}');
            res.redirect('/estudantes');
        });
    });

app.listen(7000);
/*

  conexao.connect(function(error){
        if (error) throw error;
       // console.log("O banco de dados foi conectado");

       conexao.query("select * from estudante", function(error,result) {
        if(error) throw error;
        //console.log(result);
        console.log(result[0].nomecompleto);
        console.log(result[0]);
       });
    });
*/

    