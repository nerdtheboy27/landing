# Website Color System

This document outlines the custom colors used across the landing page for both Light and Dark themes.

## Color Reference Tables

### Light Mode (Default)

| Variable | Color Code | Color Preview | Purpose |
| :--- | :--- | :---: | :--- |
| `--base-100` | `#eff6ff` | ![#eff6ff](https://via.placeholder.com/15/eff6ff/eff6ff?text=+) | **Main Background** (Lightest shade, equivalent to `blue-50`) |
| `--base-200` | `#bfdbfe` | ![#bfdbfe](https://via.placeholder.com/15/bfdbfe/bfdbfe?text=+) | **Secondary Background / Accent Fill** (Light border/card bg, equivalent to `blue-200`) |
| `--base-300` | `#3b82f6` | ![#3b82f6](https://via.placeholder.com/15/3b82f6/3b82f6?text=+) | **Primary Accent Color** (Decorative background circle, equivalent to `blue-500`) |
| `--base-400` | `#1d4ed8` | ![#1d4ed8](https://via.placeholder.com/15/1d4ed8/1d4ed8?text=+) | **Secondary Accent / Border** (Dashed borders, equivalent to `blue-700`) |
| `--base-500` | `#172554` | ![#172554](https://via.placeholder.com/15/172554/172554?text=+) | **Primary Text / Dark Buttons** (Darkest shade, equivalent to `blue-950`) |

---

### Dark Mode

| Variable | Color Code | Color Preview | Purpose |
| :--- | :--- | :---: | :--- |
| `--base-100` | `#172554` | ![#172554](https://via.placeholder.com/15/172554/172554?text=+) | **Main Background** (Darkest shade, equivalent to `blue-950`) |
| `--base-200` | `#1e3a8a` | ![#1e3a8a](https://via.placeholder.com/15/1e3a8a/1e3a8a?text=+) | **Secondary Background / Accent Fill** (Dark border/card bg, equivalent to `blue-900`) |
| `--base-300` | `#3b82f6` | ![#3b82f6](https://via.placeholder.com/15/3b82f6/3b82f6?text=+) | **Primary Accent Color** (Decorative background circle, equivalent to `blue-500`) |
| `--base-400` | `#60a5fa` | ![#60a5fa](https://via.placeholder.com/15/60a5fa/60a5fa?text=+) | **Secondary Accent / Border** (Light border accents, equivalent to `blue-400`) |
| `--base-500` | `#eff6ff` | ![#eff6ff](https://via.placeholder.com/15/eff6ff/eff6ff?text=+) | **Primary Text / Light Buttons** (Lightest shade, equivalent to `blue-50`) |

## Tailwind CSS Configuration

In your `tailwind.config.js`, these custom colors are registered under the `base` namespace:

```javascript
theme: {
  extend: {
    colors: {
      base: {
        100: 'var(--base-100)',
        200: 'var(--base-200)',
        300: 'var(--base-300)',
        400: 'var(--base-400)',
        500: 'var(--base-500)',
      },
    },
  },
}
```
