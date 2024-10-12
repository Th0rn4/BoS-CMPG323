import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAssignments } from "../services/api"; // Ensure correct import path

// Updated AssignmentTile component
const AssignmentTile = ({ title, description, navigation }) => (
  <TouchableOpacity
    style={styles.assignmentTile}
    onPress={
      () => navigation.navigate("AssignmentScreen", { title, description }) // Pass title and description
    }
  >
    <Text style={styles.assignmentTitle}>{title}</Text>
  </TouchableOpacity>
);

const ViewAssignmentScreen = ({ navigation, route }) => {
  const { user } = route.params; // Destructure user details from route params

  const [userDetails, setUserDetails] = useState({
    name: user.name || "Name",
    email: user.email || "Email",
  });

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserDetails({
          name: parsedUser.name,
          surname: parsedUser.surname,
          email: parsedUser.email,
        });
      }
    };

    const fetchAssignmentData = async () => {
      try {
        const fetchedAssignments = await fetchAssignments();
        setAssignments(fetchedAssignments);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };

    fetchUserDetails();
    fetchAssignmentData(); // Call the function to fetch assignments
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.nameText}>
            {userDetails.name} {userDetails.surname}
          </Text>
          <View style={styles.emailContainer}>
            <Image
              source={require("../assets/aticon.png")}
              style={styles.emailIcon}
            />
            <Text style={styles.emailText}>{userDetails.email}</Text>
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
        {assignments.map((assignment) => (
          <AssignmentTile
            key={assignment._id} // Use unique ID for each tile
            title={assignment.title}
            description={assignment.description} // Pass description here
            navigation={navigation}
          />
        ))}
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
    alignItems: "flex-start",
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
    alignItems: "flex-start",
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
