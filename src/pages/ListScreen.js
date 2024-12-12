import { View } from "react-native";

import TopBanner from "../components/TopBanner";
import { containerStyle } from "../global/styles";
import DefaultForm from "../components/DefaultForm";
import CardContainer from "../components/CardContainer";
import { useState } from "react";
import { addItemToList } from "../../database/database";

export default function ListScreen({ navigation, route }) {
    const [list, setList] = useState(route.params.list);

    function onCardPress(item) {
        // marca como done/undone
    }

    function onDeletePress(itemId) {}

    async function addItem(text) {
        const {
            success,
            list: _list,
            error,
        } = await addItemToList(list.id, text);
        if (success) return setList(_list);
        console.error(error);
    }

    return (
        <View style={containerStyle}>
            <TopBanner text={list.name} />
            <CardContainer
                objects={list.items}
                getContent={(item) => item.text}
                onCardPress={onCardPress}
                onDeletePress={onDeletePress}
            />
            <DefaultForm onSubmit={addItem} placeholder={"Novo item"} />
        </View>
    );
}
