import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { logar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { auth } from '../../config/firebase';
import loading from "../../../assets/loading.gif"
import { alteraDados, verificarEntradaVazia } from '../../utils/comum';
import { entradas } from './entradas';

export default function Login({ navigation }) {
  const [carregando, setCarregando] = useState(true)
  

  const [statusError, setStatusError] = useState("")
  const [mensagemError, setMensagemError] = useState("")

  const [dados, setDados] = useState({
    email: "",
    senha: ""
  })

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if (usuario){
        navigation.replace("Principal");
      }
      setCarregando(false)
    });

    return () => estadoUsuario();
  },[])

  

  async function realizarLogin(){
    //funcao para verificar se email ou senha são vazios

    if (verificarEntradaVazia(dados, setDados)) return;

    const resultado = await logar(dados.email, dados.senha)

    if (resultado == "erro"){
      setStatusError(true);
      setMensagemError("Email ou senha não conferem");
      return;
    }else{
      navigation.replace("Principal");
    }
  }

  if (carregando){
    return (
      <View style={estilos.containerAnimacao}>
        <Image style={estilos.imagem} source={loading}></Image>
      </View>
    )
  }

  return (
    <View style={estilos.container}>
      {
        entradas.map((entrada) => {
          return <EntradaTexto
                  key={entrada.id}
                  {...entrada}
                  value={dados[entrada.name]}
                  onChangeText={valor => alteraDados(entrada.name, valor, dados, setDados)}>
            
          </EntradaTexto>
        })
      }
      
      <Alerta mensagem={mensagemError} error={statusError} setError={setStatusError}/>

      <Botao onPress={realizarLogin}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
