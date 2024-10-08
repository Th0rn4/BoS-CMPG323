import axios from "axios";

const API_URL =
  "https://bos-cmpg323-submissionsdeploy.onrender.com/api/submissions";

export const streamVideo = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/stream/${videoId}`, {
      responseType: "blob",
      // If you need to add authentication, uncomment and modify the following line:
      // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    console.log("Response headers:", response.headers);
    console.log("Response status:", response.status);
    console.log("Response data type:", response.data.type);

    // Check if the response is actually a video
    if (!response.data.type.startsWith("video/")) {
      throw new Error(`Unexpected content type: ${response.data.type}`);
    }

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Video streaming failed:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    }
    throw error;
  }
};
