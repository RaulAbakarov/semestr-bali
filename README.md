# Semestr Balı Hesablama (Semester Grade Calculator)

A modern React web application for calculating semester grades in Azerbaijani universities.

## Features

- 📊 **Dynamic Seminar & Kollokvium Input** - Select 1-10 seminars or kollokiums with individual scoring
- ⏰ **Attendance Tracking** - Calculate points based on class attendance
- 📝 **Independent Work** - Add scores for independent work (0-10)
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on mobile and desktop devices
- ♻️ **Reset Function** - Clear all inputs and start over

## Calculation Formula

```
Seminar Average × 0.4
Kollokvium Average × 0.6
Base Points = (Seminar + Kollokvium) × 3
Attendance = 10 - (10 × Absent Hours / Total Hours)
Total = Base Points + Attendance + Independent Work
```

## Tech Stack

- React 18
- Vite
- Pure CSS (no frameworks)
- Modern ES6+ JavaScript

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## Local Development

The app runs on `http://localhost:5173/` by default.

## Screenshots

### Desktop View
The calculator features a clean, gradient purple design with organized sections for seminars, kollokiums, and attendance.

### Mobile View
Fully responsive design that adapts perfectly to mobile devices.

## License

MIT

## Author

Built with ❤️ for students
