export const alteraDados = (variavel, valor, dados, setDados) =>{
    setDados({
      ...dados,
      [variavel]: valor
    })
  };

export const verificarEntradaVazia = (dados, setDados) => {
  for(const [variavel, valor] of Object.entries(dados)){
    if (valor == ""){
      setDados({
        ...dados,
        [variavel]: null
      })
      return true;
    } 
  }
  return false;
}
