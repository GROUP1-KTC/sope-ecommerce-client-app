# 🛒 Sope E-commerce App

The project is initialized with [Next.js](https://nextjs.org/) using the `app/` directory structure, utilizing the `pnpm` package manager to optimize performance, save disk space, and ensure a consistent development environment across team members.

---

## ⚙️ Environment Requirements

-   Node.js >= 18
-   pnpm >= 10.8.0

> This project **requires** the use of `pnpm`. If you attempt to use `npm` or `yarn`, the installation process will be blocked by the `check-pm.js` script.

---

## 🚀 Setup and Running Instructions

### 1. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

Check the version:

```bash
pnpm -v
```

### 2. Clone the project

```bash
git clone https://github.com/BONANHEMSIEUNHAN/sope-ecommerce-app.git
cd sope-ecommerce-app
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Start the development environment

```bash
pnpm run dev
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## 🛠 During Development

-   You can edit content in `app/page.tsx`. Changes will automatically update (hot reload).
-   To check syntax/linting:

```bash
pnpm lint
```

---

## 📦 Dependency Management

### Install a new package:

```bash
pnpm add <package-name>
```

Example:

```bash
pnpm add axios
```

Install dev dependencies:

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

### Remove a package:

```bash
pnpm remove <package-name>
```

### Check & update:

```bash
pnpm audit               # Check for security vulnerabilities
pnpm update --latest     # Update all dependencies
```

---

## 🧱 Main Directory Structure

| Directory / File | Description                                |
| ---------------- | ------------------------------------------ |
| `app/`           | Next.js directory-based routing            |
| `components/`    | Reusable UI components                     |
| `styles/`        | Contains Tailwind/CSS files                |
| `check-pm.js`    | Script to block installation with npm/yarn |
| `pnpm-lock.yaml` | Lock file for `pnpm`                       |
| `package.json`   | Project scripts and information            |

---

## 📚 Technologies Used

-   [Next.js](https://nextjs.org) – React framework
-   [React 19](https://react.dev)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [PostCSS](https://postcss.org/)
-   [pnpm](https://pnpm.io)

---

## ⚠️ Warning

You **must not use** `npm install` or `yarn install`. Attempting to do so will be blocked to prevent breaking the `node_modules` structure.

---

## 🔗 Reference Documentation

-   [https://pnpm.io](https://pnpm.io)
-   [https://nextjs.org/docs](https://nextjs.org/docs)
-   [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
-   [https://nodejs.org/en/download](https://nodejs.org/en/download)

---

## 📄 License

MIT License © 2025 — Sope E-commerce Team
