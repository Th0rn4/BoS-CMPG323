import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const AssignmentTile = ({ title, navigation }) => (
  <TouchableOpacity
    style={styles.assignmentTile}
    onPress={() => navigation.navigate("AssignmentScreen")} // Navigate to AssignmentScreen
  >
    <Text style={styles.assignmentTitle}>{title}</Text>
  </TouchableOpacity>
);

const ViewAssignmentScreen = ({ navigation }) => {
  // Accept the navigation prop
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.nameText}>Name Surname</Text>
          <View style={styles.emailContainer}>
            <Image
              source={require("../assets/aticon.png")}
              style={styles.emailIcon}
            />
            <Text style={styles.emailText}>Email</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Image
            source={require("../assets/NotificationIcon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.tapableTextAssignment}>Assignments</Text>
      <ScrollView style={styles.scrollView}>
        {/* Pass navigation prop to AssignmentTile */}
        <AssignmentTile title="Assignment 1" navigation={navigation} />
        <AssignmentTile title="Assignment 2" navigation={navigation} />
        <AssignmentTile title="Assignment 3" navigation={navigation} />
        <AssignmentTile title="Assignment 4" navigation={navigation} />
        <AssignmentTile title="Assignment 5" navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userInfo: {
    position: "relative",
    justifyContent: "center",
    alignItems: "left",
  },
  nameText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 23,
    lineHeight: 28,
    color: "#000",
    width: 172,
    textAlign: "left",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginTop: 12,
  },
  emailIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
    position: "absolute",
    left: 0, // Adjust for correct positioning
    top: 1,
  },
  emailText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#636363",
    marginLeft: 18, // Adjust to match with icon
  },
  notificationIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  tapableTextAssignment: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  assignmentTile: {
    width: "100%",
    height: 123,
    backgroundColor: "#70ABAF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ViewAssignmentScreen;
