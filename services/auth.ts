import { Account, Client, ID } from "react-native-appwrite";

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Create Account instance
export const account = new Account(client);

// Register (Signup)
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    console.log("User registered:", response);
    return response;
  } catch (error: any) {
    console.error("Register error:", error);
    throw error;
  }
};

// Login
export const loginUser = async (email: string, password: string) => {
  try {
    try {
      await account.deleteSession("current"); 
    } catch (err) {
      console.log("No existing session, skipping logout.");
    }
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Login successful:", session);
    return session;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.log("No user logged in");
    return null;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    console.log("User logged out successfully");
  } catch (error: any) {
    if (error.code === 401) {
      console.log("No active session to log out from");
    } else {
      console.error("Logout error:", error);
    }
  }
};
