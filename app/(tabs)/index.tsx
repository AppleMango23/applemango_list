import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "@/components/Themed";
import { removeItem, getItem, setItem } from "@/helpers/AsyncHelpers";
import { ITaskList } from "@/helpers/types";
import Colors from "@/constants/Colors";
import { BlockButton } from "@/components/buttons";
import { EmptyStatesSvg } from "@/components/others";

export default function TabOneScreen() {
  const [taskList, setTaskList] = useState<ITaskList[]>([]);
  const [taskChange, setTaskChange] = useState("");

  useEffect(() => {
    onFetchTasksList();
  }, []);

  // MARK: Events
  async function onFetchTasksList() {
    const res = await getItem("testTasks");
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
    setItem("testTasks", newTaskList);
  }

  async function onClearButtonPress() {
    setTaskList([]);
    removeItem("testTasks");
  }

  async function onCompleteButton(id: number) {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isChecked: true } : task
    );

    setTaskList(newTaskList);
    setItem("testTasks", newTaskList);
  }

  async function onUnCompleteButton(id: number) {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isChecked: false } : task
    );

    setTaskList(newTaskList);
    setItem("testTasks", newTaskList);
  }

  function onConfirmationClear() {
    Alert.alert("Clear All Confirmation", "Are you sure clear all?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => onClearButtonPress(),
      },
    ]);
  }

  // MARK: Render Methods
  function renderTaskRow({ item }: { item: ITaskList }) {
    return (
      <TouchableOpacity
        onPress={() =>
          !item?.isChecked
            ? onCompleteButton(item.id)
            : onUnCompleteButton(item.id)
        }
        style={styles.taskRow}
      >
        {!item?.isChecked ? (
          <FontAwesome
            name={"square-o"}
            color={Colors.theme.background}
            size={22}
          />
        ) : (
          <FontAwesome
            name={"check-square-o"}
            color={Colors.theme.background}
            size={22}
          />
        )}
        <Text
          style={!item?.isChecked ? styles.taskText : styles.taskTextStrike}
        >
          {item?.value}
        </Text>
      </TouchableOpacity>
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
          <BlockButton
            title="Clear All"
            onPress={onConfirmationClear}
            iconName="playlist-remove"
          />
          <BlockButton
            title="Add Task"
            onPress={onSubmitTaskPress}
            iconName="playlist-add"
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={taskList}
          renderItem={renderTaskRow}
          ListEmptyComponent={
            <EmptyStatesSvg
              width="100%"
              height="100%"
              viewBox="0 0 900 900"
              title="No Tasks Yet"
            />
          }
        />
      </View>
      {renderFloatingInput()}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  taskText: {
    fontSize: 16,
    marginLeft: 5,
  },
  taskTextStrike: {
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
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
  actionButton: {
    backgroundColor: Colors.theme.background,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
});
