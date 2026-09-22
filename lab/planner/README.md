# X Planner - private, password-protected, cross-device sync

A single-page planner. Without signing in, visitors only see the empty planner
structure — they can never see your plans or edit anything. Sign in with your
password and your plans load, stay editable, and sync across all your devices.

## A. Put it online (GitHub Pages)

This planner already lives at https://xinyuan-wei-xw.github.io/lab/planner/
(lab/planner/index.html in the xinyuan-wei-xw.github.io repo).

## B. Turn on the password lock + cross-device sync (Firebase - free)

1. Go to https://console.firebase.google.com and click "Add project". Name it, finish.
2. Click the web icon (</>) to add a web app. Register a nickname (e.g. planner-web).
   Firebase shows a firebaseConfig object — paste its values into the
   `firebaseConfig` block near the bottom of index.html (already done for
   project x-planner-99dd3).
3. Enable password login: Firebase console > Build > Authentication > Get started >
   Sign-in method > Email/Password > Enable > Save.
4. Add your domain: Authentication > Settings > Authorized domains > Add domain >
   xinyuan-wei-xw.github.io
5. Create the database: Build > Firestore Database > Create database > Production mode.
6. Set security so each person only sees their own data: Firestore > Rules, paste and Publish:

       rules_version = '2';
       service cloud.firestore {
         match /databases/{database}/documents {
           match /planners/{uid} {
             allow read, write: if request.auth != null && request.auth.uid == uid;
           }
         }
       }

## C. Use it

- Open your planner on any device, enter your email + password in the toolbar, click Unlock.
- First time: click "new account" to create your login (password must be 6+ characters).
- Your plans load from the cloud and stay in sync across laptop, iPad, phone.
- Click "Sign out" when done on a shared device — it wipes the local copy too.
- The Backup / Restore buttons export and re-import a .json file (available while signed in).

## Notes

- The Firebase apiKey is safe to expose publicly; your data is protected by the
  Firestore rules above and by the password gate in the page.
- The page shows only the empty structure until you sign in. All editing controls
  are disabled and nothing is saved while locked.
- Live sync does not run inside the Dia preview (external scripts are blocked there).
  It works once the page is hosted on GitHub Pages.
