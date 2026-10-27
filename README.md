# 🏋️‍♂️ Nutrition and Fitness Tracker

A full-stack web application designed to help users track daily meals, log workouts, and monitor health goals through interactive analytics.

🚀 **Live App:** [https://nutrition-and-fitness-tracker-kappa.vercel.app](https://nutrition-and-fitness-tracker-kappa.vercel.app)  
⚡ **API Docs:** [https://nutrition-and-fitness-tracker-0jo4.onrender.com](https://nutrition-and-fitness-tracker-0jo4.onrender.com)

---

## 📸 Dashboard Preview

![NutriFit Dashboard](frontend/src/assets/dashboard-preview.png)

---

## 🎯 Current Scope & Features

* **Meal & Nutrition Logging:** Manually record daily meals, ingredients, and macronutrient intake.
* **Fitness & Activity Metrics:** Log workouts and track step metrics, active energy expenditure, and sleep trends.
* **Interactive Data Visualization:** Dynamic charts powered by Recharts for weekly calories, steps, and macronutrient distributions.
* **Data Pipelines & Storage:** Cleaned dataset ingestion and local data handling powered by FastAPI and SQLite.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Recharts, JavaScript (ES6+), HTML5, CSS3
* **Backend:** Python, FastAPI, SQLite, Pandas (Data Cleaning)
* **Deployment & Hosting:** Vercel (Frontend), Render (Backend)
* **Tooling:** Git, GitHub, Visual Studio Code

---

## 📊 Cleaned Dataset Overview

The backend integrates cleaned Fitbit activity data to provide benchmark health metrics:

| Metric | Sample Values |
| :--- | :--- |
| **Total Cleaned Records** | 396 rows |
| **Average Daily Steps** | ~7,637 |
| **Active Tracking Days** | April 12 – May 12 |

### Sample Data Preview

| ActivityDate | TotalSteps | Calories |
| :--- | :--- | :--- |
| 2016-04-12 | 13,162 | 1,985 |
| 2016-04-13 | 10,735 | 1,797 |
| 2016-04-14 | 10,460 | 1,776 |

🔗 [View Cleaned Fitbit Data Set File](./backend/data/cleaned/daily_activity_cleaned.csv)

---

## 🏁 Getting Started

### Prerequisites
* **Node.js** (v16 or higher)
* **Python** (v3.10 or higher)
* **Git**

---

## 📦 Local Setup Guide

### 1. Clone the Repository
```bash
git clone [https://github.com/Eude06/Nutrition-and-Fitness-tracker.git](https://github.com/Eude06/Nutrition-and-Fitness-tracker.git)
cd Nutrition-and-Fitness-tracker