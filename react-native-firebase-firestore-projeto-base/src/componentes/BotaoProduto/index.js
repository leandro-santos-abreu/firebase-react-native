import { TouchableOpacity, Text } from "react-native";
import estilos from "./estilos";

export function BotaoProduto({onPress}){
    return (
        <TouchableOpacity onPress={onPress} style={estilos.botao}>
            <Text style={estilos.textoBotao}>+</Text>
        </TouchableOpacity>
    )
}