import admin from 'firebase-admin';

const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
    })
  : admin;

export default firebaseAdmin;
