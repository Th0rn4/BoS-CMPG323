import axios from 'axios';

const API_URL =
  'https://bos-cmpg323-submissionsdeploy.onrender.com/api/submissions';

export const streamVideo = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/stream/${videoId}`, {
      responseType: 'blob',
    });

    console.log('Response headers:', response.headers);
    console.log('Response status:', response.status);
    console.log('Response data type:', response.data.type);

    // Check if the response is actually a video
    if (!response.data.type.startsWith('video/')) {
      throw new Error(`Unexpected content type: ${response.data.type}`);
    }

    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Video streaming failed:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
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
    console.error('Failed to get download URL:', error);
    throw error;
  }
};

export const downloadVideo = async (videoId) => {
  try {
    const downloadUrl = await getDownloadUrl(videoId);
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `video_${videoId}.mp4`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download video:', error);
    throw error;
  }
};

export const updateFeedback = async (submissionId, feedbackData) => {
  try {
    const response = await axiosInstance.put(`/${submissionId}`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Failed to update feedback:', error);
    throw error;
  }
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    console.log(`Fetching submissions for assignment: ${assignmentId}`);

    // Only fetch the submissions directly
    const submissionsResponse = await axiosInstance.get(
      `/assignments/${assignmentId}/submissions`
    );

    const submissions = submissionsResponse.data.data.submissions || []; // List of submissions

    console.log('Submissions:', submissions);

    // No need to merge with students, as submission data already contains the necessary info
    const mergedData = submissions.map((submission) => ({
      studentId: submission.studentId,
      studentName: submission.studentName, // Assuming submission has studentName
      status: submission.status || 'Not Started', // Handle status from submission
      submissionId: submission.submissionId, // Submission ID if it exists
      ...submission, // Any additional submission data
    }));

    console.log('Merged Data:', mergedData);
    return mergedData;
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    throw error;
  }
};
