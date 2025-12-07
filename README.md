# Shutter Light Stories - Luxury Wedding Photography Website

A beautiful, professional static website for **Shutter Light Stories**, a premium wedding photography brand serving VIP clients and celebrities. The website features a stunning dark blue and gold color scheme with a highly polished, dynamic look while maintaining a static, multi-page architecture.

## 🌟 Features

- **Premium Design**: Dark navy blue (#050b18) and gold (#f0c86b) color scheme creating a luxury feel
- **Multi-Page Structure**: Home, About, Services, Films, Gallery, and Contact pages
- **Interactive Gallery**: Category-based filtering system for wedding types
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-reveal animations and smooth transitions
- **Fast Loading**: Optimized images with lazy loading
- **Professional Content**: High-quality copy targeting VIP and celebrity clientele

## 📁 Project Structure

```
shutter-light-stories/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── films.html              # Films/portfolio page
├── gallery.html            # Interactive gallery with filters
├── contact.html            # Contact form page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images_optimized/   # Organized image folders
│       ├── christian/      # 40 Christian wedding photos
│       ├── hindu/          # 40 Hindu wedding photos
│       ├── muslim/         # 30 Muslim wedding photos
│       ├── corporate/      # 20 Corporate event photos
│       ├── baby/           # 15 Baby photoshoot images
│       ├── hero/           # Hero section images
│       └── logo.jpg        # Brand logo
├── processed/              # Original processed images (gitignored)
├── resize_images.rb        # Ruby script for image optimization
└── README.md              # This file
```

## 🎨 Gallery Categories

The gallery page features an interactive filtering system with the following categories:

1. **Christian Weddings** - 12 curated images from church ceremonies and Christian celebrations
2. **Hindu Weddings** - 12 images featuring mandap setups, traditional rituals, and vibrant celebrations
3. **Muslim Weddings** - 10 images showcasing nikah ceremonies and elegant Muslim celebrations
4. **Corporate Events** - 8 images from professional corporate gatherings and galas
5. **Baby Photoshoots** - 6 images from baby milestone sessions and family portraits

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended for testing)

### Running Locally

#### Option 1: Python HTTP Server
```bash
# Navigate to project directory
cd shutter-light-stories

# Start server (Python 3)
python3 -m http.server 8000

# Visit http://localhost:8000 in your browser
```

#### Option 2: PHP Built-in Server
```bash
# Navigate to project directory
cd shutter-light-stories

# Start server
php -S localhost:8000

# Visit http://localhost:8000 in your browser
```

#### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🖼️ Image Optimization

The project includes a Ruby script for optimizing images:

### Using the Image Resize Script

```bash
# Ensure ImageMagick is installed
# On macOS:
brew install imagemagick

# On Ubuntu/Debian:
sudo apt-get install imagemagick

# Run the script
ruby resize_images.rb
```

The script:
- Resizes images to a maximum width of 1920px
- Compresses quality to 85% (optimal for web)
- Strips metadata to reduce file size
- Converts all images to lowercase .jpg format
- Outputs to the `processed/` folder

### Manual Organization
After processing, images should be organized into category folders:
```bash
assets/images_optimized/
├── christian/     # christian-01.jpg to christian-40.jpg
├── hindu/         # hindu-01.jpg to hindu-40.jpg
├── muslim/        # muslim-01.jpg to muslim-30.jpg
├── corporate/     # corporate-01.jpg to corporate-20.jpg
├── baby/          # baby-01.jpg to baby-15.jpg
└── hero/          # wedding-hero-01.jpg to wedding-hero-03.jpg
```

## 💻 Technology Stack

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No dependencies, pure ES6+ JavaScript
- **Google Fonts**: Playfair Display (headings) + Poppins (body)
- **Responsive Design**: Mobile-first approach with media queries

## 🎯 Key Features Explained

### Gallery Filtering
The gallery uses a pure JavaScript filtering system:
- Click any category button to show only those images
- Active filter is highlighted with gold gradient
- Smooth transitions between filter states
- "All stories" button shows all images

### Lightbox
Click any gallery image to open a full-screen lightbox:
- Close with the X button, clicking outside, or pressing ESC
- Images are displayed at maximum quality
- Smooth fade-in/fade-out transitions

### Mobile Navigation
On smaller screens (< 768px):
- Navigation converts to a hamburger menu
- Slides in from the top with smooth animation
- Auto-closes when a link is clicked

### Scroll Animations
Elements with `.reveal` class:
- Fade in and slide up when scrolling into view
- Uses IntersectionObserver for performance
- Graceful fallback for older browsers

## 🎨 Color Palette

- **Primary Background**: `#050b18` (Deep navy)
- **Elevated Background**: `#0c1424` (Lighter navy)
- **Accent Color**: `#f0c86b` (Warm gold)
- **Text Primary**: `#f8f8ff` (Soft white)
- **Text Muted**: `#a8b0c6` (Light grey-blue)
- **Borders**: `rgba(255, 255, 255, 0.08)` (Subtle white)

## 📱 Responsive Breakpoints

- **Desktop**: 1180px+ (full navigation, 3-column grids)
- **Tablet**: 768px - 960px (2-column grids, adjusted spacing)
- **Mobile**: < 768px (hamburger menu, single column, stacked layout)

## 🔧 Customization

### Changing Colors
Edit CSS custom properties in `assets/css/style.css`:
```css
:root {
  --color-bg: #050b18;
  --color-accent: #f0c86b;
  --color-text: #f8f8ff;
  /* ... */
}
```

### Adding Images
1. Process images with `resize_images.rb`
2. Copy to appropriate category folder
3. Add `<div class="gallery-item">` in `gallery.html`
4. Set correct `data-category` attribute

### Updating Content
- **Text**: Edit HTML files directly
- **Contact Info**: Update footer in all HTML files
- **Navigation**: Modify the `<nav>` section in each page

## 🚢 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select main branch as source
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Create account at netlify.com
2. Connect your GitHub repository
3. Deploy with default settings
4. Site auto-deploys on git push

### Traditional Hosting
1. Upload all files via FTP/SFTP
2. Ensure directory structure is maintained
3. Point domain to the upload directory
4. No server-side processing required

## 📄 Browser Support

- Chrome/Edge: Latest 2 versions ✅
- Firefox: Latest 2 versions ✅
- Safari: Latest 2 versions ✅
- iOS Safari: iOS 12+ ✅
- Chrome Android: Latest ✅

## 📝 License

This project is created for Shutter Light Stories. All rights reserved.

## 👤 Contact

- **Email**: hello@shutterlightstories.com
- **Phone**: +91-00000-00000
- **Location**: Kochi, Kerala, India

---

**Note**: This is a static website with no backend. All functionality is handled client-side. For form submissions, integrate with a service like Formspree, Netlify Forms, or a custom backend API.
