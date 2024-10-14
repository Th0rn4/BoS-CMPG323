import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import {
  fetchAssignments,
  fetchSubmissions,
  createSubmission,
  fetchNotifications,
} from "../services/api";

const AssignmentTile = ({ assignment, onAssignmentClick }) => (
  <TouchableOpacity
    style={styles.assignmentTile}
    onPress={() => onAssignmentClick(assignment)}
  >
    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
  </TouchableOpacity>
);

const NotificationItem = ({ notification }) => (
  <TouchableOpacity style={styles.notificationItem}>
    <View style={styles.notificationIcon}>
      <Image
        source={require("../assets/notificationItemIcon.png")}
        style={styles.smallIcon}
      />
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>
        {notification.NotificationHeader}
      </Text>
      <Text style={styles.notificationSource}>System</Text>
      <Text style={styles.notificationTime}>1h ago</Text>
    </View>
  </TouchableOpacity>
);

const ViewAssignmentScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [userDetails, setUserDetails] = useState({
    name: user.name || "Name",
    email: user.email || "Email",
  });
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [viewType, setViewType] = useState("Assignments");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationPanelHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedAssignments, fetchedSubmissions, fetchedNotifications] =
          await Promise.all([
            fetchAssignments(),
            fetchSubmissions(),
            fetchNotifications(),
          ]);
        setAssignments(fetchedAssignments);
        setSubmissions(fetchedSubmissions);
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [user._id]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    Animated.timing(notificationPanelHeight, {
      toValue: showNotifications ? 0 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeNotifications = () => {
    setShowNotifications(false);
    Animated.timing(notificationPanelHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // ... (keep other existing functions like toggleViewType, handleAssignmentClick, etc.)

  return (
    <TouchableWithoutFeedback onPress={closeNotifications}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.nameText}>{userDetails.name}</Text>
            <View style={styles.emailContainer}>
              <Image
                source={require("../assets/aticon.png")}
                style={styles.emailIcon}
              />
              <Text style={styles.emailText}>{userDetails.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={toggleNotifications}
          >
            <Image
              source={require("../assets/NotificationIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.notificationPanel,
            { maxHeight: notificationPanelHeight },
          ]}
        >
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationHeaderText}>Notifications</Text>
            <TouchableOpacity>
              <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationItem notification={item} />}
            keyExtractor={(item) => item._id}
          />
        </Animated.View>

        <TouchableOpacity onPress={toggleViewType}>
          <Text style={styles.tapableTextAssignment}>{viewType}</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          {assignments.map((assignment) => (
            <AssignmentTile
              key={assignment._id}
              assignment={assignment}
              onAssignmentClick={handleAssignmentClick}
            />
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: "center",
    alignItems: "flex-start",
  },
  nameText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 23,
    lineHeight: 28,
    color: "#000",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  emailIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  emailText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 14,
    color: "#636363",
  },
  notificationIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationPanel: {
    position: "absolute",
    top: 130,
    right: 10,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  notificationHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  settingsText: {
    color: "#70ABAF",
    fontSize: 14,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  notificationIcon: {
    marginRight: 10,
  },
  smallIcon: {
    width: 20,
    height: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  notificationSource: {
    fontSize: 12,
    color: "#636363",
  },
  notificationTime: {
    fontSize: 12,
    color: "#636363",
  },
  tapableTextAssignment: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
    color: "#fff",
  },
});

export default ViewAssignmentScreen;
