import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// NOTE: In a real production app you should move these values into environment
// variables (NEXT_PUBLIC_*) instead of hard-coding them.
const firebaseConfig = {
  apiKey: "AIzaSyAW6Vjf7TSK4c9_DcEzLfalcZg_Q6Rr_iQ",
  authDomain: "fusion-9af41.firebaseapp.com",
  projectId: "fusion-9af41",
  storageBucket: "fusion-9af41.firebasestorage.app",
  messagingSenderId: "136923310560",
  appId: "1:136923310560:web:158a4ad9027f84d6de2385",
  measurementId: "G-GN58V492LF",
};

// Ensure we only create the Firebase app once (Next.js can render modules multiple times)
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Analytics is only available in the browser; guard against SSR/Node usage.
let analyticsInstance: Analytics | null = null;

if (typeof window !== "undefined") {
  // `isSupported` avoids runtime errors in environments where analytics isn't available.
  isSupported()
    .then((supported) => {
      if (supported) {
        analyticsInstance = getAnalytics(firebaseApp);
      }
    })
    .catch(() => {
      // Ignore analytics errors in dev; app will still work without it.
      analyticsInstance = null;
    });
}

export const analytics = analyticsInstance;

// Export `auth` for use in client-side authentication flows
export const auth = typeof window !== "undefined" ? getAuth(firebaseApp) : null;


