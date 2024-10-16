import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import {
  uploadSubmissionVideo,
  updateSubmission,
  fetchSingleSubmission,
} from "../services/api";
import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const AssignmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { assignment, onComplete, submission } = route.params;
  const [video, setVideo] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        const submissionId = route.params.submission._id;
        if (submissionId) {
          await fetchFeedback(submissionId);
        } else {
          Alert.alert("No submission ID available in route params");
        }

        // Request camera and media permissions
        const { status: cameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== "granted" || mediaStatus !== "granted") {
          Alert.alert(
            "Permission Required",
            "Sorry, we need camera and media permissions to make this work!"
          );
        }

        // Check if there's already a file for this assignment
        const existingFile = await getExistingFile(assignment._id);
        if (existingFile) {
          setUploadedFileName(existingFile.name);
          setVideo(existingFile.uri);
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "An error occurred while setting up the assignment screen. Please try again."
        );
      }
    };

    setup();
  }, [route.params, assignment._id]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchFeedback = async (submissionId) => {
    setIsLoadingFeedback(true);
    try {
      const submissionData = await fetchSingleSubmission(submissionId);

      if (
        submissionData &&
        submissionData.submission &&
        submissionData.submission.feedback &&
        submissionData.submission.feedback.length > 0
      ) {
        setFeedback(submissionData.submission.feedback[0]);
      } else {
        setFeedback(null);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load feedback. Please try again later.");
      setFeedback(null);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const getExistingFile = async (assignmentId) => {
    try {
      const directory = FileSystem.documentDirectory + "assignments/";
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        return null; // No existing file in a newly created directory
      }
      const files = await FileSystem.readDirectoryAsync(directory);
      const assignmentFile = files.find((file) =>
        file.startsWith(`assignment_${assignmentId}`)
      );

      if (assignmentFile) {
        const filePath = directory + assignmentFile;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          return { name: assignmentFile, uri: filePath };
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const saveVideoLocally = async (uri, assignmentId) => {
    const directory = FileSystem.documentDirectory + "assignments/";

    // Extract the original file name from the URI
    const originalFileName = uri.split("/").pop();

    // Construct the new file name using assignment ID and original file name
    const fileName = `assignment_${assignmentId}_${originalFileName}`;
    const newPath = directory + fileName;

    try {
      // Ensure the directory exists
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      // Copy the file
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return { name: fileName, uri: newPath };
    } catch (error) {
      throw error;
    }
  };

  const removeExistingFile = async (assignmentId) => {
    try {
      const existingFile = await getExistingFile(assignmentId);
      if (existingFile) {
        const fileInfo = await FileSystem.getInfoAsync(existingFile.uri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(existingFile.uri, { idempotent: true });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleVideoCapture = async (result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        setIsReplacing(true);
        await removeExistingFile(assignment._id);
        const savedFile = await saveVideoLocally(
          result.assets[0].uri,
          assignment._id
        );
        setVideo(savedFile.uri);
        setUploadedFileName(savedFile.name);
        setIsReplacing(false);
        Alert.alert(
          "Video Updated",
          "The new video has been saved successfully."
        );
      } catch (error) {
        setIsReplacing(false);
        Alert.alert("Error", "Failed to save the video. Please try again.");
      }
    } else {
      Alert.alert("Video capture cancelled or no asset received");
    }
  };

  const recordVideo = async () => {
    if (video) {
      Alert.alert(
        "Replace Video",
        "This will replace the existing video. Do you want to continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => launchCamera() },
        ]
      );
    } else {
      launchCamera();
    }
  };

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await handleVideoCapture(result);
  };

  const pickVideo = async () => {
    if (video) {
      Alert.alert(
        "Replace Video",
        "This will replace the existing video. Do you want to continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => launchImageLibrary() },
        ]
      );
    } else {
      launchImageLibrary();
    }
  };

  const launchImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await handleVideoCapture(result);
  };

  const handleSubmit = async () => {
    if (video) {
      try {
        setIsSubmitting(true);

        // Upload the video
        const videoFile = {
          uri: video,
          type: `video/${video.split(".").pop()}`,
          name: uploadedFileName,
        };

        await uploadSubmissionVideo(submission._id, videoFile);
        // Update the submission status
        await updateSubmission(submission._id, { status: "Submitted" });
        // Call the onComplete callback
        onComplete();

        setIsSubmitting(false);
        Alert.alert("Success", "Assignment submitted successfully!");
        navigation.goBack();
      } catch (error) {
        setIsSubmitting(false);
        Alert.alert("Error", "Failed to submit assignment. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please upload a video before submitting.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonVector}></Text>
        <Text style={styles.backButtonText}>←Back</Text>
      </TouchableOpacity>

      <Text style={styles.headingDescription}>Description</Text>
      <Text style={styles.headingFeedback}>Feedback</Text>
      <Text style={styles.headingUploads}>Uploads</Text>

      <View style={styles.assignmentNameContainer}>
        <Text style={styles.assignmentName}>{assignment.title}</Text>
      </View>
      <Text style={styles.assignmentDescription}>{assignment.description}</Text>

      <View style={styles.feedbackContainer}>
        {isLoadingFeedback ? (
          <ActivityIndicator size="small" color="#705D56" />
        ) : feedback ? (
          <>
            <Text style={styles.feedbackGrade}>Grade: {feedback.grade}</Text>
            <Text style={styles.feedbackComment}>{feedback.comment}</Text>
          </>
        ) : (
          <Text style={styles.noFeedback}>No feedback available</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={recordVideo}>
          <Image
            source={require("../assets/Cameras.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addFromPhotosButton}
          onPress={pickVideo}
        >
          <Image
            source={require("../assets/Add.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Image
            source={require("../assets/Submit.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {isReplacing && <Text style={styles.statusText}>Adding video...</Text>}
      {isSubmitting && (
        <Text style={styles.statusText}>Submitting assignment...</Text>
      )}

      {uploadedFileName && (
        <TouchableOpacity onPress={() => setShowPreview(true)}>
          <Text style={styles.fileUploaded}>
            Current video: {uploadedFileName} (Tap to preview)
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={showPreview}
        transparent={true}
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalContainer}>
          <Video
            source={{ uri: video }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.videoPreview}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowPreview(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    lineHeight: 19,
    textAlignVertical: "center",
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FFFFFF",
    fontFamily: "Inter", //Font family error
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
  headingDescription: {
    position: "absolute",
    left: 21,
    top: 166,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headingFeedback: {
    position: "absolute",
    left: 25,
    top: 348,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headingUploads: {
    position: "absolute",
    left: 25,
    top: 588,
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  assignmentDescription: {
    position: "absolute",
    left: 21,
    top: 200,
    width: 400,
    fontSize: 18,
    fontWeight: "200",
    color: "#000",
  },
  feedbackContainer: {
    position: "absolute",
    left: 25,
    top: 380,
    right: 25,
  },
  feedbackGrade: {
    fontSize: 18,
    color: "#000",
    fontWeight: "200",
    marginBottom: 5,
  },
  feedbackComment: {
    fontSize: 18,
    fontWeight: "200",
    color: "#000",
  },
  noFeedback: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
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
  statusText: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    fontSize: 16,
    color: "#705D56",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  fileUploaded: {
    position: "absolute",
    left: 24,
    top: 631,
    width: 331,
    fontSize: 15,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  videoPreview: {
    width: width * 0.9,
    height: height * 0.5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#705D56",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default AssignmentScreen;
