import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AssignmentScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.assignmentName}>Assignment Name</Text>
        <View style={styles.gradeDisplay}></View>
      </View>
      <Text style={styles.assignmentDescription}>Assignment Description</Text>
      <Text style={styles.feedback}>Feedback</Text>
      <Text style={styles.uploadVideo}>Upload Video</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cameraButton}></TouchableOpacity>
        <TouchableOpacity style={styles.addFromPhotosButton}></TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}></TouchableOpacity>
      </View>
      <Text style={styles.fileUploaded}>File Uploaded</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 31,
    width: 91,
    height: 25,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  assignmentName: {
    position: "absolute",
    top: "15%",
    left: "20%",
    fontSize: 23,
    fontWeight: "700",
    color: "#000",
  },
  gradeDisplay: {
    position: "absolute",
    width: 60,
    height: 60,
    left: 295,
    top: 19,
    backgroundColor: "#99E1D9",
  },
  assignmentDescription: {
    position: "absolute",
    left: 21,
    top: 166,
    width: 175,
    fontSize: 18,
    color: "#000",
  },
  feedback: {
    position: "absolute",
    left: 25,
    top: 348,
    width: 71,
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
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 670,
    width: "100%",
    paddingHorizontal: 60,
  },
  cameraButton: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
  },
  addFromPhotosButton: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
  },
  submitButton: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
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
