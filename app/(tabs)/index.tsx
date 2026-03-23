import React, { useState } from "react";
import { styles } from "./styles";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type ShoppingItem = {
  id: string;
  text: string;
  done: boolean;
};

export default function Index() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = () => {
    if (itemText.trim() === "") return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      text: itemText,
      done: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setItemText("");
  };

  const toggleItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="new item"
          value={itemText}
          onChangeText={setItemText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>ADD ITEM</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>SHOPPING LIST</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={styles.itemTextContainer}
              onPress={() => toggleItem(item.id)}
            >
              <Text style={[styles.itemText, item.done && styles.doneText]}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.checkButton, item.done && styles.checkedButton]}
              onPress={() => toggleItem(item.id)}
            >
              <Text style={styles.checkMark}>{item.done ? "✓" : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items added yet.</Text>
        }
      />
    </View>
  );
}
