import { Text, View } from "react-native";

import TopBanner from "../components/TopBanner";
import { containerStyle } from "../global/styles";
import DefaultForm from "../components/DefaultForm";
import CardContainer from "../components/CardContainer";
import { useState } from "react";
import {
    addItemToList,
    deleteItemFromList,
    toggleItemDone,
} from "../../database/database";
import { SquareCheckIcon, SquareIcon } from "lucide-react";

export default function ListScreen({ navigation, route }) {
    const [list, setList] = useState(route.params.list);

    async function __execute(func, param1, param2) {
        const { success, error, list: _list } = await func(param1, param2);
        if (success) return setList(_list);
        console.error(error);
    }

    async function onCardPress(item) {
        console.log("Card pressed:", item);
        // const {
        //     success,
        //     error,
        //     list: _list,
        // } = toggleItemDone(list.id, item.id);
        // if (success) return setList(_list);
        // console.error(error);

        await __execute(toggleItemDone, list.id, item.id);
    }

    async function onDeletePress(itemId) {
        console.log("Delete pressed:", itemId);
        // const {
        //     success,
        //     error,
        //     list: _list,
        // } = await deleteItemFromList(list.id, itemId);
        // if (success) return setList(_list);
        // console.error(error);

        await __execute(deleteItemFromList, list.id, itemId);
    }

    async function addItem(text) {
        console.log("Add item:", text);
        // const {
        //     success,
        //     list: _list,
        //     error,
        // } = await addItemToList(list.id, text);
        // if (success) return setList(_list);
        // console.error(error);

        await __execute(addItemToList, list.id, text);
    }

    return (
        <View style={containerStyle}>
            <TopBanner text={list.name} />
            <CardContainer
                objects={list.items}
                getContent={(item) => (
                    <>
                        {item.done ? <SquareCheckIcon /> : <SquareIcon />}
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            {item.text}
                        </Text>
                    </>
                )}
                onCardPress={onCardPress}
                onDeletePress={onDeletePress}
            />
            <DefaultForm onSubmit={addItem} placeholder={"Novo item"} />
        </View>
    );
}
