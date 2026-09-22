# Zoomable Planner - deploy + cross-device sync

A single-page planner. It works offline in your browser (localStorage) and, once you add
your free Firebase keys, syncs your plans across all your devices when you sign in with Google.

## A. Put it online (GitHub Pages)

1. Create a new GitHub repo, e.g. "planner" (Public).
2. Upload index.html (and this README) to the repo.
3. Repo Settings > Pages > Source: Deploy from a branch > main > / (root) > Save.
4. Your site: https://YOUR-USERNAME.github.io/planner/

At this point the planner already works for everyone. Each visitor's data stays private in
their own browser. The Backup / Restore buttons export and re-import a .json file.

## B. Turn on cross-device sync (Firebase - free)

1. Go to https://console.firebase.google.com and click "Add project". Name it, finish.
2. Click the web icon (</>) to add a web app. Register a nickname (e.g. planner-web).
   Firebase shows a firebaseConfig object like:

       const firebaseConfig = {
         apiKey: "AIza...",
         authDomain: "yourproj.firebaseapp.com",
         projectId: "yourproj",
         appId: "1:...:web:..."
       };

3. In index.html, search for PASTE_YOUR_API_KEY and replace the four PASTE... values with
   yours. Save and re-upload index.html to GitHub.
4. Enable Google login: Firebase console > Build > Authentication > Get started >
   Sign-in method > Google > Enable > Save.
5. Add your domain: Authentication > Settings > Authorized domains > Add domain >
   YOUR-USERNAME.github.io
6. Create the database: Build > Firestore Database > Create database > Production mode.
7. Set security so each person only sees their own data: Firestore > Rules, paste and Publish:

       rules_version = '2';
       service cloud.firestore {
         match /databases/{database}/documents {
           match /planners/{uid} {
             allow read, write: if request.auth != null && request.auth.uid == uid;
           }
         }
       }

## C. Use it

- Open your site on any device, click "Sign in to sync", pick your Google account.
- Your plans now load and save to the cloud and stay in sync across laptop, iPad, phone.
- Public visitors who do not sign in just use their own local copy - they never see yours.

## Notes

- The Firebase apiKey is safe to expose publicly; your data is protected by the rules above.
- Live sync does not run inside the Dia preview (external scripts are blocked there).
  It works once the page is hosted on GitHub Pages.
