const express=require("express");
const cors=require("cors");
const db=require("./db");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/agendamentos",async(req,res)=>{
  try{
    const [rows]=await db.query(
      `SELECT a1.nome AS aluno,a2.nome AS monitor,m.nome AS materia,ag.data_hora,ag.status
       FROM agendamentos ag
       JOIN alunos a1 ON ag.id_aluno=a1.id
       JOIN alunos a2 ON ag.id_monitor=a2.id
       JOIN materias m ON ag.id_materia=m.id
       ORDER BY ag.data_hora`
    );
    res.json(rows);
  }catch(err){
    res.status(500).json({erro:err.message});
  }
});

app.post("/agendamentos",async(req,res)=>{
  try{
    const {id_aluno,id_monitor,id_materia,data,hora}=req.body;
    const dataHora=`${data} ${hora}`;
    await db.query(
      "INSERT INTO agendamentos (id_monitor,id_aluno,id_materia,data_hora) VALUES (?,?,?,?)",
      [id_monitor,id_aluno,id_materia,dataHora]
    );
    res.json({mensagem:"Agendamento criado com sucesso!"});
  }catch(err){
    res.status(500).json({erro:err.message});
  }
});

app.listen(3000,()=>console.log("Servidor rodando em http://localhost:3000"));