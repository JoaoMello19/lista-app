import { useEffect, useState } from "react";
import { View } from "react-native";

import TopBanner from "../components/TopBanner";
import { containerStyle } from "../global/styles";
import DefaultForm from "../components/DefaultForm";
import CardContainer from "../components/CardContainer";
import { createList, deleteList, getLists } from "../../database/database";

export default function HomeScreen({ navigation }) {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getLists().then(({ success, lists, error }) => {
            if (success) return setLists(lists);
            console.error(error);
        });
    }, []);

    function onCardPress(list) {
        console.log(`Banner clicked: ${JSON.stringify(list)}`);
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
                getContent={(list) => list.name}
                onCardPress={onCardPress}
                onDeletePress={onDeletePress}
            />
            <DefaultForm onSubmit={__createList} placeholder={"Nova lista"} />
        </View>
    );
}
