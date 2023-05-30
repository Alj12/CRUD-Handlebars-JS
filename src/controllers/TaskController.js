function index(req,res){
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM USUARIOS',(err,usuarios) =>{
            if(err){
                res.jdon(err);
            }
            res.render('tasks/index',{usuarios});
        })
    });
}

function create(req,res){
    res.render('tasks/create');
}

function store(req,res){
    const data=req.body;

    req.getConnection((err,conn) =>{
        conn.query('INSERT INTO USUARIOS SET ?',[data],(err,rows) =>{
            res.redirect('/tasks');
        });
    });

}

function destroy(req,res){
    const id= req.body.id;
    
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM USUARIOS WHERE ID_USUARIO = ?',[id],(err,rows) =>{
            res.redirect('/tasks');
        });
    });
}

function edit(req,res){
    const id = req.params.id;
    req.getConnection((err,conn) =>{
        conn.query('SELECT * FROM USUARIOS WHERE ID_USUARIO = ?',[id],(err,usuario) =>{
            if(err){
                res.json(err);
            }
            res.render('tasks/edit',{usuario});
        });
    });
}

function update(req,res){
    const id = req.params.id;
    const data = req.body;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE USUARIOS SET ? WHERE ID_USUARIO = ?',[data,id],(err,rows)=>{
            res.redirect('/tasks');
        });
    });
}


module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}