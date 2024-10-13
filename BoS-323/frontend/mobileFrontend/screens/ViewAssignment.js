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
import {
  fetchAssignments,
  fetchSubmissions,
  createSubmission,
  updateSubmission,
} from "../services/api"; // Ensure correct import path

// Updated AssignmentTile component
const AssignmentTile = ({ assignment, navigation, onAssignmentClick }) => (
  <TouchableOpacity
    style={styles.assignmentTile}
    onPress={() => onAssignmentClick(assignment)}
  >
    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
  </TouchableOpacity>
);

const ViewAssignmentScreen = ({ navigation, route }) => {
  const { user } = route.params; // Destructure user details from route params

  const [userDetails, setUserDetails] = useState({
    name: user.name || "Name",
    email: user.email || "Email",
  });

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [viewType, setViewType] = useState("Assignments");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAssignments = await fetchAssignments();
        setAssignments(fetchedAssignments);

        const fetchedSubmissions = await fetchSubmissions();
        setSubmissions(fetchedSubmissions);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [user._id]);

  const toggleViewType = () => {
    setViewType((prevType) => {
      if (prevType === "Assignments") {
        return "In Progress";
      } else if (prevType === "In Progress") {
        return "Completed";
      } else {
        return "Assignments";
      }
    });
  };

  const handleAssignmentClick = async (assignment) => {
    try {
      let submision = submissions.find((s) => s.assignmetId === assignment._id);

      if (!submision) {
        submission = await createSubmission({
          userId: user._id,
          assignmentId: assignment._id,
          status: "In Progress",
        });
        setSubmissions([...submissions, submission]);
      }

      navigation.navigate("AssignmentScreen", {
        assignment,
        submission,
        onComplete: () => handleSubmissionComplete(submission._id),
      });
    } catch (error) {
      console.error("Failed to navigate to assignment screen:", error);
    }
  };

  const handleSubmissionComplete = async (submissionId) => {
    try {
      const updatedSubmission = await updateSubmission(submissionId, {
        status: "Completed",
      });
      setSubmissions(
        submissions.map((s) => (s._id === submissionId ? updatedSubmission : s))
      );
    } catch (error) {
      console.error("Failed to update submission status:", error);
    }
  };

  const fileteredAssignments = () => {
    switch (viewType) {
      case "Assignments":
        return assignments.filter(
          (a) => !submissions.some((s) => s.assignmentId === a._id)
        );
      case "In Progress":
        return assignments.filter((a) =>
          submissions.some(
            (s) => s.assignmentId === a._id && s.status === "In Progress"
          )
        );
      case "Completed":
        return assignments.filter((a) =>
          submissions.some(
            (s) => s.assignmentId === a._id && s.status === "Completed"
          )
        );
      default:
        return [];
    }
  };

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
      <TouchableOpacity onPress={toggleViewType}>
        <Text style={styles.tapableTextAssignment}>{viewType}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {fileteredAssignments().map((assignment) => (
          <AssignmentTile
            key={assignment._id}
            assignment={assignment}
            navigation={navigation}
            onAssignmentClick={handleAssignmentClick}
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
    left: 0,
    top: 1,
  },
  emailText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#636363",
    marginLeft: 18,
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
