import { StyleSheet, Text, View } from "react-native";
import colors from "../global/colors";

const styles = StyleSheet.create({
    topBanner: {
        width: "100vw",
        backgroundColor: colors.bannerBg,
        padding: 10,
    },
    topTitle: {
        color: colors.lightGray,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
});

export default function TopBanner({ text }) {
    return (
        <View style={styles.topBanner}>
            <Text style={styles.topTitle}>{text || "Meu App de Listas"}</Text>
        </View>
    );
}
