# CompassionConnect – Disaster Management App

Jenkins CI test trigger 2nd time after env

Next.js app for disaster response coordination with:

- Live disaster map (Leaflet)
- Community incident reporting
- Contact messages stored in MongoDB

## Requirements

- Node.js 18+ (recommended)
- npm
- MongoDB connection (MongoDB Atlas is fine)

## Setup (after cloning)

1. Install dependencies

```bash
npm install
```

2. Create local env file

Copy `.env.example` to `.env.local` and fill in values:

```bash
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=disasterApp
```

3. Run the dev server

```bash
npm run dev
```

Then open the URL printed in the terminal (Next may use 3001 if 3000 is busy).

## Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run start`: start production server
- `npm run lint`: lint the project

## Notes

- Do **not** commit `.env.local` (it contains secrets). Use `.env.example` instead.
- `node_modules/` and `.next/` are build artifacts and should never be committed.
