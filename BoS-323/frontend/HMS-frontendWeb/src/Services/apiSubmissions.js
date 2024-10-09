import axios from "axios";

const API_URL =
  "https://bos-cmpg323-submissionsdeploy.onrender.com/api/submissions";

export const streamVideo = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/stream/${videoId}`, {
      responseType: "blob",
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

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getDownloadUrl = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/${videoId}/download`);
    return response.data.downloadUrl;
  } catch (error) {
    console.error("Failed to get download URL:", error);
    throw error;
  }
};

export const downloadVideo = async (videoId) => {
  try {
    const downloadUrl = await getDownloadUrl(videoId);
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `video_${videoId}.mp4`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download video:", error);
    throw error;
  }
};
