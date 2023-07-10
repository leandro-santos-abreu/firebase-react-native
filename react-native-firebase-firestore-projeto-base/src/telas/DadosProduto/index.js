import { View, TouchableOpacity, Alert } from "react-native"
import { EntradaTexto } from "../../componentes/EntradaTexto"
import Botao from "../../componentes/Botao"
import estilos from "./estilos"
import React, {useState} from "react"
import { salvarProduto, atualizarProduto, deletarProduto } from "../../servicos/firestore"
import {Alerta} from "../../componentes/Alerta"
import Icon from "react-native-vector-icons/Feather"

export default function DadosProduto({navigation, route}){
    const [nome, setNome] = useState(route?.params?.nome || "");
    const [preco, setPreco] = useState(route?.params?.preco || "");
    const [mensagem, setMensagem] = useState();
    const [mostrarMensagem, setMostrarMensagem] = useState(false);


    async function salvar(){
        if (nome == "" || preco == ""){
            setMensagem("Por favor preencha todos os campos");
            setMostrarMensagem(true);
            return;
        }

        let resultado = "";
        if (route?.params){
            resultado = await atualizarProduto( route?.params?.id, {nome,
                preco}
            )
        }else{
            resultado = await salvarProduto({
                nome,
                preco
            })
        }
        
        if (resultado == "erro"){
            setMensagem("Erro ao salvar produto");
            setMostrarMensagem(true);
        }else{
            navigation.goBack();
        }
    }

    async function deletar(){
        Alert.alert(
            "Deletar Produto",
            "Tem certeza que quer deletar?",
            [
                {
                    text: "Não",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        deletarProduto(route?.params?.id);
                        navigation.goBack();
                    }
                }
            ]
        )
    }

    return (
        <View style={estilos.container}>
            {route?.params && 
                <TouchableOpacity onPress={() => deletar(navigation?.params?.id)}>
                    <Icon name="trash-2" size={20} color="#000"></Icon>
                </TouchableOpacity>
            }

            <EntradaTexto label={"Nome do Produto"} value={nome} onChangeText={setNome}/>
            <EntradaTexto label={"Preço do Produto"} value={preco} onChangeText={setPreco}/>

            <Botao onPress={salvar}>Salvar</Botao>

            <Alerta mensagem={mensagem} error={mostrarMensagem} setError={setMostrarMensagem}/>
        </View>
    )
}