# GitHub CDN Image Setup Guide

To use the **GitHub + jsDelivr** mode for your images, follow these steps:

## 1. Create the Assets Repository
1.  Go to GitHub and create a **Public** repository named `gesp-assets`.
2.  Clone it to your local machine (outside of your current project).
3.  Add your images following this suggested structure:
    ```bash
    images/
    ├── hardware/
    │   ├── components/  # HS-KEY1L.png, etc.
    │   ├── diagrams/    # lesson1_wiring.png, etc.
    │   └── scenarios/   # lesson1_hero.webp, etc.
    ```
4.  `git add .`, `git commit -m "add initial images"`, and `git push origin main`.

## 2. Generate the URL Pattern
Your images will be accessible at:
`https://cdn.jsdelivr.net/gh/[YourUsername]/gesp-assets/[path/to/image]`

**Example**:
If your username is `Dora321` and the file is `images/hardware/scenarios/lesson1_hero.webp`:
URL: `https://cdn.jsdelivr.net/gh/Dora321/gesp-assets/images/hardware/scenarios/lesson1_hero.webp`

## 3. Integration Plan

### [MODIFY] [lessons.js](file:///Users/xinzaier/Library/CloudStorage/OneDrive-个人/附件/c++课件/kejian/gesp-app/src/hardware/data/lessons.js)
We will add `heroImage` and `wiringDiagram` fields to the lesson data.
```javascript
{
    id: 1,
    // ...
    heroImage: "https://cdn.jsdelivr.net/gh/Dora321/gesp-assets/images/hardware/scenarios/l1_hero.webp",
    wiringDiagram: "https://cdn.jsdelivr.net/gh/Dora321/gesp-assets/images/hardware/diagrams/l1_wiring.png",
}
```

### [MODIFY] [HardwareLessonDetail.jsx](file:///Users/xinzaier/Library/CloudStorage/OneDrive-个人/附件/c++课件/kejian/gesp-app/src/hardware/pages/HardwareLessonDetail.jsx)
We will add a placeholder for these images in the UI:
- A hero image at the top of the detail page.
- A wiring diagram in the "接线指南" (Wiring Guide) section.

## Verification
- Once you push your first image and provide the URL, I will verify the rendering in the browser.
