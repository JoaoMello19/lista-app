import { TrashIcon } from "lucide-react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../global/colors";

function DefaultCard({ object, getContent, onCardPress, onDeletePress }) {
    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.cardTouch}
                onPress={() => {
                    onCardPress(object);
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {getContent(object)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                    onDeletePress(object.id);
                }}
            >
                <TrashIcon style={styles.trashIcon} />
            </TouchableOpacity>
        </View>
    );
}

export default function CardContainer({
    objects,
    getContent,
    onCardPress,
    onDeletePress,
}) {
    return (
        <>
            {objects && (
                <View style={styles.container}>
                    {objects?.map((obj) => (
                        <DefaultCard
                            key={obj.id}
                            object={obj}
                            getContent={getContent}
                            onCardPress={onCardPress}
                            onDeletePress={onDeletePress}
                        />
                    ))}
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "60vh",
        minWidth: "25vw",
        maxWidth: "90vw",
        marginVertical: 25,
        marginHorizontal: "auto",
        gap: 10,
    },
    card: {
        display: "flex",
        flexDirection: "row",
    },
    cardTouch: {
        flex: 1,
        height: "100%",
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.lightGray,
    },
    iconContainer: {
        minWidth: "fit-content",
        aspectRatio: 1,
        backgroundColor: colors.red,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    trashIcon: {
        height: "65%",
        width: "65%",
        margin: "auto",
        color: colors.lightGray,
    },
});
