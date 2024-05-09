const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let funcionarios = [
    { id: 1, 
      nome: "João", 
      email: "joao@example.com", 
      telefone: "123456789", 
      cargo: "Desenvolvedor", 
      salario: 5000 
    },

    { id: 2, 
      nome: "Maria", 
      email: "maria@example.com", 
      telefone: "987654321", 
      cargo: "Gerente", 
      salario: 7000 
    }
];

app.get('/funcionarios', (req, res) => {
    res.json(funcionarios);
});

app.get('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = funcionarios.find(funcionario => funcionario.id === id);
    if (funcionario) {
        res.json(funcionario);
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.post('/funcionarios', (req, res) => {
    const novoFuncionario = req.body;
    novoFuncionario.id = funcionarios.length + 1;
    funcionarios.push(novoFuncionario);
    res.status(201).json(novoFuncionario);
});

app.put('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const funcionarioIndex = funcionarios.findIndex(funcionario => funcionario.id === id);
    if (funcionarioIndex !== -1) {
        funcionarios[funcionarioIndex] = { ...funcionarios[funcionarioIndex], ...req.body };
        res.json(funcionarios[funcionarioIndex]);
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.delete('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    res.send('Funcionário deletado com sucesso');
});

app.get('/funcionarios/cargo/:cargo', (req, res) => {
    const cargo = req.params.cargo;
    const funcionariosPorCargo = funcionarios.filter(funcionario => funcionario.cargo === cargo);
    res.json(funcionariosPorCargo);
});

app.get('/funcionarios/salarios/media', (req, res) => {
    const totalSalarios = funcionarios.reduce((acc, funcionario) => acc + funcionario.salario, 0);
    const mediaSalarial = totalSalarios / funcionarios.length;
    res.send(`A média salarial dos funcionários é: ${mediaSalarial}`);
});







const port = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 