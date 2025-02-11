import axios from 'axios';

// Create an Axios instance with the base URL pointing to the Rails backend
const API = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your Rails backend URL
});

// API call to generate an itinerary
export const generateItinerary = async (formData) => {
  try {
    const response = await API.post('/search', {
      destination: formData.destination,
      budget: formData.budget,
      start_date: formData.startDate,
      trip_length: formData.tripLength,
      preferences: Array.isArray(formData.preferences)
        ? formData.preferences.join(", ")
        : formData.preferences,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
};

// API call to allocate budget
export const allocateBudget = async (totalBudget, customAllocation) => {
  try {
    const response = await API.post('/api/allocate-budget', {
      budget: {
        totalBudget,
        customAllocation,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error allocating budget:', error);
    throw error;
  }
};