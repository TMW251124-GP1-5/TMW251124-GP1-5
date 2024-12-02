import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file 

const serviceAccountPath = resolve(process.env.FIREBASE_SERVICE_ACCOUNT); // Path to service account key file
// console.log("Service Account Path:", serviceAccountPath); // Log the path to the service account key file



// Initialize Firebase 
function initializeFirebase() {
  if (!admin.apps.length) {
    try {
      console.log("Initializing Firebase...");
      const serviceAccount = JSON.parse(
        readFileSync(serviceAccountPath, "utf-8")
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });

      console.log("Firebase initialized successfully.");
    } catch (error) {
      console.error("Error initializing Firebase:", error.message);
      throw error; // Stop the app if initialization fails
      process.exit(1);
    }
  } else {
    console.log("Firebase already initialized.");
  }
}

// Initialize Firebase once
initializeFirebase();

// Export Firestore
export const db = admin.firestore();
