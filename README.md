# Visitor Management System

A modern React application for creating and managing digital business cards. Create professional visiting cards with a beautiful UI and download them as PDF or PNG.

## Features

- 📝 **Visitor Information Form** - Capture all visitor details including:
  - Company name
  - Employee name and title
  - Contact information (phone, email, website)
  - Address
  - Profile picture upload

- 👁️ **Preview Card** - View a detailed preview of the visitor information in a clean, professional format

- 🎴 **Visiting Card** - Generate a stylish business card with:
  - Modern red and white design
  - Company logo placeholder
  - QR code for easy contact sharing
  - All contact information

- 💾 **Download Options** - Download both preview and visiting card as:
  - PDF format
  - PNG image format

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Fill out the visitor information form with all required details
2. Upload a profile picture (optional)
3. Click "Generate Preview & Card"
4. Switch between "Preview Card" and "Visiting Card" tabs to view different formats
5. Use the download buttons to save as PDF or PNG

## Technologies Used

- React 18
- HTML2Canvas - For converting components to images
- jsPDF - For PDF generation
- qrcode.react - For QR code generation
- CSS3 - For styling and animations

## Project Structure

```
visitor-management/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── VisitorForm.js
│   │   ├── VisitorForm.css
│   │   ├── PreviewCard.js
│   │   ├── PreviewCard.css
│   │   ├── VisitingCard.js
│   │   └── VisitingCard.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

