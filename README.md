# NOIRCRAFT 🌑
### Where Elegance Meets Darkness

NOIRCRAFT is a minimalist luxury e-commerce platform. It combines a high-fashion "Noir" aesthetic with a modern technical stack, featuring fluid SVG animations, centralized API management, and a configuration-driven UI.



## ✨ Key Features
- **Dynamic Calligraphy:** Responsive SVG stroke animations that mimic hand-written luxury branding.
- **Config-Driven Architecture:** Category logic, titles, and filtering rules are centralized in `categories.js` for easy scaling.
- **Global State Management:** Redux Toolkit handles the Shopping Cart, UI states (Drawers/Modals), and Product data.
- **Immersive UX:** Monochromatic design system with hidden scrollbars and backdrop-blur navigation for a "native app" feel.

## 🛠️ Technical Stack
- **Frontend:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** Native Fetch API with centralized asynchronous thunks.
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

src/
├── api/          # Centralized API logic and Fetch wrappers
├── assets/       # Brand images and logo files
├── components/   # Reusable UI (Navbar, RevealOnScroll, Buttons)
├── config/       # Category configurations and brand constants
├── redux/        # Store configuration and Slices (Cart, UI, Products)
└── pages/        # Main views (Home, CategoryPage, ProductDetails)