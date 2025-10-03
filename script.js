document.getElementById("agendamentoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = document.getElementById("nome").value;
  const materia = document.getElementById("materia").value;
  const monitor = document.getElementById("monitor").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const body = {
    id_aluno: 3,
    id_monitor: 1,
    id_materia: 1,
    data,
    hora
  };

  await fetch("/agendamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  carregarAgendamentos();
});

async function carregarAgendamentos() {
  const res = await fetch("/agendamentos");
  const lista = await res.json();
  const ul = document.getElementById("listaAgendamentos");
  ul.innerHTML = "";

  lista.forEach(ag => {
    const li = document.createElement("li");
    li.textContent = `${ag.aluno} com ${ag.monitor} em ${ag.materia} - ${ag.data_hora}`;
    ul.appendChild(li);
  });
}

carregarAgendamentos();