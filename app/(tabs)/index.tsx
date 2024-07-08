import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { clear, getItem, setItem } from "@/helpers/AsyncHelpers";

export default function TabOneScreen() {
  const [taskList, setTaskList] = useState([]);
  const [taskChange, setTaskChange] = useState("");

  useEffect(() => {
    onFetchTasksList();
  }, []);

  interface ItaskList {
    index: number;
    value: string;
    dateTime: string;
  }

  // MARK: Events
  async function onFetchTasksList() {
    const res = await getItem("tasksList");
    setTaskList(res);
  }

  async function onSubmitTaskPress() {
    let newTaskList;

    if (taskList) {
      newTaskList = [
        ...taskList,
        {
          id: Math.random(),
          value: taskChange,
          isChecked: false,
          dateTime: "20/5/2222",
        },
      ];
    } else {
      newTaskList = [
        {
          id: Math.random(),
          value: taskChange,
          isChecked: false,
          dateTime: "20/5/2222",
        },
      ];
    }

    setTaskChange("");
    setTaskList(newTaskList);
    setItem("tasksList", newTaskList);
  }

  async function onClearButtonPress() {
    setTaskList([]);
    clear();
  }

  async function onCompleteButton(id) {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isChecked: true } : task
    );

    setTaskList(newTaskList);
    setItem("tasksList", newTaskList);
  }

  async function onUnCompleteButton(id) {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isChecked: false } : task
    );

    setTaskList(newTaskList);
    setItem("tasksList", newTaskList);
  }

  // MARK: Render Methods
  function renderTaskRow({ item }) {
    return (
      <View style={styles.taskRow}>
        {!item?.isChecked ? (
          <FontAwesome
            name={"square-o"}
            color={"#0a7efe"}
            size={20}
            onPress={() => onCompleteButton(item.id)}
          />
        ) : (
          <FontAwesome
            name={"check-square-o"}
            color={"#0a7efe"}
            size={20}
            onPress={() => onUnCompleteButton(item.id)}
          />
        )}
        <Text style={styles.taskText}>{item?.value}</Text>
      </View>
    );
  }

  function renderFloatingInput() {
    return (
      <View style={styles.floatingInputWrapper}>
        <TextInput
          style={styles.floatingTextInput}
          onChangeText={setTaskChange}
          value={taskChange}
          placeholder="What's your task?"
        />
        <View style={styles.actionButtonRow}>
          <Button title="Clear Task" onPress={onClearButtonPress} />
          <Button title="Submit Task" onPress={onSubmitTaskPress} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <FlatList data={taskList} renderItem={renderTaskRow} />
      </View>
      {renderFloatingInput()}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  taskText: {
    fontSize: 15,
    marginLeft: 5,
  },
  taskRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  actionButtonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  floatingInputWrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 0.3,
    width: "100%",
    padding: 10,
  },
  floatingTextInput: {
    height: 40,
    margin: 12,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 20,
  },
});
