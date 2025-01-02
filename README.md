# Little Lens Web 📷

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://little-lens-web.vercel.app/)
[![Built with Firebase](https://img.shields.io/badge/Built%20with-Firebase-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

## Overview
Photography platform built with Next.js and Firebase, featuring cloud functions for serverless operations.

## Tech Stack
- Frontend: Next.js, React
- Backend: Firebase Cloud Functions
- Database: Firestore
- Authentication: Firebase Auth
- Storage: Firebase Storage
- Deployment: Vercel

## Setup
1. Clone repository:
```bash
git clone https://github.com/linzele/little-lens-web.git
cd little-lens-web
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init
```

4. Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

5. Run development server:
```bash
npm run dev
```

6. Deploy functions:
```bash
cd functions
npm install
firebase deploy --only functions
```

## Features
- User authentication
- Image upload/management
- Real-time data sync
- Cloud function processing
- Responsive design

## Structure
```
little-lens-web/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── functions/
├── public/
└── firebase.json
```

## Live Demo
[Little Lens Web](https://little-lens-web.vercel.app/)

## License
MIT

## Author
[@linzele](https://github.com/linzele)
