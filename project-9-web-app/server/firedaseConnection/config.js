const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

function initializeFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    console.log("Firebase Admin Initialized");
  }
}

module.exports = { initializeFirebase };

