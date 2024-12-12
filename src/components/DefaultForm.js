import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import colors from "../global/colors";
import { useState } from "react";

export default function DefaultForm({ onSubmit, placeholder }) {
    const [value, setValue] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                type="text"
                value={value}
                style={styles.textInput}
                placeholder={placeholder}
                onChangeText={(value) => setValue(value)}
            />
            <TouchableOpacity
                type="submit"
                onPress={() => {
                    onSubmit(value);
                    setValue("");
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>CRIAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "60vh",
        minWidth: "25vw",
        maxWidth: "90vw",
        marginLeft: "auto",
        marginRight: "auto",
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.lightGray,
    },
    button: {
        padding: 10,
        minWidth: "fit-content",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.green,
    },
    buttonText: {
        margin: "auto",
        color: colors.lightGray,
        fontWeight: "bold",
    },
});
