import react from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({mensagem, error=false, setError, duration}){
    return (
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={duration}
            action={{
                label: "OK",
                onPress: () => setError(false)
            }}>
                {mensagem}
        </Snackbar>
    )
}