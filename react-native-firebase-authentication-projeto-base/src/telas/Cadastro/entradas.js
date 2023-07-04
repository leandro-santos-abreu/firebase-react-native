export const entradas = [
    {
      id: "1",
      name: "email",
      label: "E-mail",
      messageError: "Digite um e-mail válido",
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
      secureTextEntry: false
    },
    {
      id: "2",
      name: "senha",
      label: "Senha",
      messageError: "Digite uma senha válida",
      pattern: '.{6,}',
      secureTextEntry: true
    },
    {
      id: "3",
      name: "confirmaSenha",
      label: "Confirmar senha",
      messageError: "As senhas não conferem!",
      secureTextEntry: true
    }
  ]