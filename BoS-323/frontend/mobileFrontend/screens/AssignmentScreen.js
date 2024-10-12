import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const AssignmentScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonVector}>←</Text>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.assignmentNameContainer}>
        <Text style={styles.assignmentName}>Assignment Name</Text>
      </View>
      <View style={styles.currentGrade}>
        <Text style={styles.gradeText}>A+</Text>
      </View>
      <Text style={styles.assignmentDescription}>Assignment Description</Text>
      <Text style={styles.feedback}>Feedback</Text>
      <Text style={styles.uploadVideo}>Upload Video</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cameraButton}>
          <Image
            source={require("../assets/Cameras.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addFromPhotosButton}>
          <Image
            source={require("../assets/Add.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Image
            source={require("../assets/Submit.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.fileUploaded}>File Uploaded</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7F4",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 70,
    width: 91,
    height: 25,
    backgroundColor: "#705D56",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backButtonVector: {
    color: "#F0F7F4",
    fontSize: 18,
    marginRight: 5,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFFFFF",
    fontFamily: "Inter",
  },
  assignmentNameContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  assignmentName: {
    fontSize: 23,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    top: 20,
  },
  currentGrade: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 15,
    top: 50,
    backgroundColor: "#99E1D9",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  gradeText: {
    fontSize: 16,
    color: "#000",
  },
  assignmentDescription: {
    position: "absolute",
    left: 21,
    top: 166,
    width: 400,
    fontSize: 18,
    color: "#000",
  },
  feedback: {
    position: "absolute",
    left: 25,
    top: 348,
    width: 100,
    fontSize: 18,
    color: "#000",
  },
  uploadVideo: {
    position: "absolute",
    left: 25,
    top: 588,
    width: 330,
    fontSize: 20,
    color: "#000",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 66,
  },
  cameraButton: {
    width: 70,
    height: 70,
    backgroundColor: "#705D56",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  addFromPhotosButton: {
    width: 70,
    height: 70,
    backgroundColor: "#705D56",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  submitButton: {
    width: 70,
    height: 70,
    backgroundColor: "#705D56",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  buttonIcon: {
    width: 35,
    height: 35,
  },
  fileUploaded: {
    position: "absolute",
    left: 24,
    top: 631,
    width: 331,
    fontSize: 15,
    color: "#000",
  },
});

export default AssignmentScreen;
