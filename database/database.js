import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "@lists2";

async function __saveLists(lists) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
        return { success: true };
    } catch (error) {
        console.error("Erro ao salvar listas:", error);
        return { success: false, error };
    }
}

// FUNÇÕES QUE RETORNAM TODAS AS LISTAS

async function __changeLists(updaterFunction) {
    let { success, error, lists } = await getLists();
    if (!success) return { success, error };

    const updatedLists = updaterFunction(lists);

    ({ success, error } = await __saveLists(updatedLists));
    if (!success) return { success, error };
    return { success, lists: updatedLists };
}

export async function getLists() {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const lists =
            typeof jsonValue !== "undefined" && jsonValue !== null
                ? JSON.parse(jsonValue)
                : [];
        return { success: true, lists };
    } catch (error) {
        console.error("Erro ao recuperar listas:", error);
        return { success: false, error };
    }
}

export async function createList(name) {
    const response = await __changeLists((lists) => [
        ...lists,
        { id: uuidv4(), name, items: [] },
    ]);
    return response;
}

export async function deleteList(listId) {
    const response = await __changeLists((lists) =>
        lists.filter((list) => list.id !== listId)
    );
    return response;
}

// FUNÇÕES QUE RETORNAM APENAS *UMA* LISTA

async function __changeOneList(listId, updaterFunction) {
    console.log(`__changeOneList(${listId}, ${updaterFunction})`);
    const { success, error, lists } = await __changeLists(updaterFunction);
    console.log("Retornou ", JSON.stringify({ success, error, lists }));
    if (!success) return { success, error };

    const list = lists.find((list) => list.id === listId);
    if (!list) return { success: false, error: "Lista não encontrada" };

    return { success: true, list };
}

export async function editListName(listId, name) {
    const response = await __changeOneList(listId, (lists) =>
        lists.map((list) => (list.id === listId ? { ...list, name } : list))
    );
    return response;
}

export async function addItemToList(listId, text) {
    const response = await __changeOneList(listId, (lists) => {
        const newItem = { id: uuidv4(), text, done: false };
        return lists.map((list) =>
            list.id === listId
                ? { ...list, items: [...list.items, newItem] }
                : list
        );
    });
    return response;
}

export async function deleteItemFromList(listId, itemId) {
    const response = await __changeOneList(listId, (lists) =>
        lists.map((list) => {
            if (list.id === listId) {
                const filteredItems = list.items.filter(
                    (item) => item.id !== itemId
                );
                return { ...list, items: filteredItems };
            }
            return list;
        })
    );
    return response;
}

export async function toggleItemDone(listId, itemId) {
    const response = await __changeOneList(listId, (lists) =>
        lists.map((list) => {
            if (list.id === listId) {
                const updatedItems = list.items.map((item) =>
                    item.id === itemId ? { ...item, done: !item.done } : item
                );
                return { ...list, items: updatedItems };
            }
            return list;
        })
    );
    return response;
}
