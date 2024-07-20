import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { ActionButtonProps } from "@/helpers/types";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function BlockButton({
  title,
  onPress,
  iconName,
}: ActionButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <MaterialIcons name={iconName} color={"white"} size={17} />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.theme.background,
    borderRadius: 25,
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
