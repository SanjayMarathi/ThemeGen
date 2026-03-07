# 🎨 ThemeGen – Color Harmony & Design System Generator

ThemeGen is a modern frontend tool that helps designers and developers generate **color palettes and starter design-system tokens** using color harmony rules.
It allows users to interact with a **color wheel**, select harmony modes, and instantly preview palettes that can be used in web projects.

The tool is designed to help build **consistent UI themes** quickly and export colors that can be used in **CSS, Tailwind, or design systems**.

---

# ✨ Features

### 🎡 Interactive Color Wheel

* Click anywhere on the wheel to select a base hue
* Automatically updates the generated palette

### 🎨 Color Harmony Modes

ThemeGen generates palettes using classic color theory rules:

* **Complementary**
* **Triadic**
* **Tetradic**
* **Monochromatic**

### 🎛 Dynamic Palette Generation

* Automatically generates **multiple swatches**
* Displays **HEX values**
* Click any swatch to copy the color

### 🌓 Dark / Light Workspace

* Toggle between dark and light UI modes
* Preview how themes behave in different environments

### 📊 Live Theme Preview

* Landing page preview
* Dashboard UI preview
* Settings interface preview

### 📦 Design System Export

Export palette and tokens as JSON for use in:

* Tailwind themes
* CSS variables
* design systems
* frontend projects

---

# 🛠 Tech Stack

ThemeGen is built using modern frontend technologies.

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| **React**            | UI framework                |
| **Vite**             | Fast development build tool |
| **Tailwind CSS**     | Utility-first styling       |
| **JavaScript (ES6)** | Application logic           |

---

# 📂 Project Structure

```
ThemeGen
│
├── public
│
├── src
│   ├── App.jsx          # Main application logic
│   ├── main.jsx         # React entry point
│   ├── index.css        # Tailwind styles
│   │
│   ├── components
│   │   ├── ColorWheel.jsx
│   │   ├── PalettePreview.jsx
│   │   └── Dashboard.jsx
│   │
│   └── utils
│       ├── colorUtils.js
│       └── paletteGenerator.js
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# 🚀 Getting Started

Follow these steps to run the project locally.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/themegen.git
cd themegen
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

Open the local development URL shown in the terminal:

```
http://localhost:5173
```

---

# 🏗 Build for Production

To create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🎯 Usage

1. Select a **hue** using the color wheel
2. Choose a **color harmony mode**
3. View automatically generated **color palettes**
4. Copy individual colors or **export the full theme**
5. Preview the colors applied to a **mock website interface**

---

# 🎨 Example Generated Palette

```
Primary: #3B82F6
Secondary: #EF4444
Accent: #22C55E
Background: #0F172A
Surface: #1E293B
```

These colors can be used in:

* UI themes
* dashboards
* web applications
* Tailwind config
* CSS variables

---

# 🧠 Color Harmony Explained

### Complementary

Two colors opposite on the color wheel.

Example:

```
Blue ↔ Orange
```

### Triadic

Three evenly spaced colors.

Example:

```
Red → Yellow → Blue
```

### Tetradic

Four colors forming two complementary pairs.

### Monochromatic

Different lightness levels of the same hue.

---

# 📌 Roadmap (Upcoming Features)

ThemeGen is still under development. Planned improvements include:

### 🎨 Advanced Color Tools

* Gradient generator
* Palette locking
* Saturation/lightness sliders
* Drag-based color wheel

### ♿ Accessibility Tools

* WCAG contrast checker
* readable color suggestions

### 🧩 Design System Integration

* Tailwind theme export
* CSS variable export
* Figma tokens export

### 📊 Advanced UI

* Theme editor dashboard
* component preview system
* design token manager

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature-name
```

3. Commit changes

```
git commit -m "Add new feature"
```

4. Push branch

```
git push origin feature-name
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute the project.

---

# 👨‍💻 Author

**Sanjay Marathi**

Frontend developer exploring:

* UI systems
* design tools
* developer productivity applications

---

# ⭐ Support

If you like this project, please consider **starring the repository** on GitHub.

It helps the project grow and supports further development.
