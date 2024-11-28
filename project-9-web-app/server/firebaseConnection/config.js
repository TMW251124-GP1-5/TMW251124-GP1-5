import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountPath = resolve(process.env.FIREBASE_SERVICE_ACCOUNT);
console.log("Service Account Path", serviceAccountPath);

export function initializeFirebase() {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
      readFileSync(serviceAccountPath, "utf-8")
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    console.log("Firebase initialized");
  } else {
    console.log("Firebase already initialized");
  }
}

export const db = admin.firestore();
