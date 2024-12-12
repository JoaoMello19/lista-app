import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import TopBanner from "../components/TopBanner";
import { containerStyle } from "../global/styles";
import DefaultForm from "../components/DefaultForm";
import CardContainer from "../components/CardContainer";
import { createList, deleteList, getLists } from "../../database/database";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
    const [lists, setLists] = useState([]);

    useFocusEffect(() => {
        getLists().then(({ success, lists, error }) => {
            if (success) return setLists(lists);
            console.error(error);
        });
    });

    function onCardPress(list) {
        navigation.push("List", { list });
    }

    async function onDeletePress(listId) {
        const { success, lists: _lists, error } = await deleteList(listId);
        if (success) return setLists(_lists);
        console.error(error);
    }

    async function __createList(name) {
        if (!name) return;

        const { success, lists: _lists, error } = await createList(name);
        if (success) return setLists(_lists);
        console.error(error);
    }

    return (
        <View style={containerStyle}>
            <TopBanner />
            <CardContainer
                objects={lists}
                getContent={(list) => {
                    const length = list.items.length;
                    const text = length !== 1 ? "itens" : "item";
                    return (
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            {`${list.name} (${length} ${text})`}
                        </Text>
                    );
                }}
                onCardPress={onCardPress}
                onDeletePress={onDeletePress}
            />
            <DefaultForm onSubmit={__createList} placeholder={"Nova lista"} />
        </View>
    );
}
