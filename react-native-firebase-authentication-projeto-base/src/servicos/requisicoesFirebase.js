import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth/react-native";

function errosFirebase(error){
    let mensagem = "";

    switch(error.code){
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = "Esse email já está em uso";
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido";
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de, no mínimo, 6 caracteres";
            break;
        default:
            mensagem = "Erro desconhecido";
    }

    return mensagem;
}

export async function cadastrar(email, senha){
    const resultado = createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosUsuario) => {
      console.log(dadosUsuario)
      return "sucesso"
    })
    .catch((error) => {
        console.log(error)
        return errosFirebase(error)
    });

    return resultado;
}

export async function logar(email, senha){
    const resultado = signInWithEmailAndPassword(auth, email, senha)
    .then((dadosUsuario) => {
      console.log(dadosUsuario)
      return "sucesso"
    })
    .catch((error) => {
        console.log(error)
        //return errosFirebase(error)
        return "erro"
    });

    return resultado;
}