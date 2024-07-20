import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function ProfileSettings() {

  function RenderBottomInfoWrapper(title: string, number: number, iconName: string){
    return(
        <View style={styles.userTypeWrapper}>
        <MaterialCommunityIcons name={iconName} color={"white"} size={50} />
        <View style={styles.userTextWrapper}>
          <Text style={styles.titleWhite}>{title}</Text>
          <Text style={styles.locationWhite}>{number} Tasks</Text>
        </View>
      </View>   
    );
}

  return (
    <View style={styles.container}>
      <View style={styles.userInfoWrapper}>
        <View style={styles.userIconWrapper}>
          <Fontisto name={"user-secret"} color={"white"} size={90} />
        </View>
        <View>
          <Text style={styles.title}>Noah Yek Baby</Text>
          <Text style={styles.location}>Malaysia</Text>
        </View>
      </View>

      <View style={styles.tasksRow}>
        <View>
          <Text style={styles.title}>105</Text>
          <Text style={styles.location}>Created Tasks</Text>
        </View>

        <View>
          <Text style={styles.title}>105</Text>
          <Text style={styles.location}>Completed Tasks</Text>
        </View>
      </View>

    {RenderBottomInfoWrapper("Personal", 10, "format-list-checks")}
    {RenderBottomInfoWrapper("Work", 23, "briefcase")}
    {RenderBottomInfoWrapper("Event", 30, "car-traction-control")}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userTypeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 15,
    backgroundColor: Colors.theme.background
  },
  userTextWrapper: {
    backgroundColor: "transparent"
  },
  userIconWrapper: {
    backgroundColor: Colors.theme.background,
    borderRadius: 100,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  location: {
    fontSize: 17,
    marginLeft: 10,
  },
  tasksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    borderWidth: 0.5,
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  },
  titleWhite: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white"
  },
  locationWhite: {
    fontSize: 17,
    marginLeft: 10,
    color:"white"
  },
});
