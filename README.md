# 🏋️‍♂️ Nutrition and Fitness Tracker

A full-stack web application designed to help users track daily meals, log workouts and monitor health goals.

---

## 🎯 Current Scope

The application is centered around manual activity and nutrition logging:
* **Meal & Nutrition Logging:** Manually record daily meals, ingredients and nutritional intake.
* **Fitness Logs:** Log individual workouts and exercise sessions to maintain a consistent tracking history.
* **Local Data Management:** Fast local data handling powered by FastAPI and SQLite.

---

## 🛠️ Tech Stack

* **Frontend:** React, HTML5, CSS3, JavaScript
* **Backend:** Python, FastAPI, SQLite
* **Tooling:** Git, Visual Studio Code

---

## 🏁 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* [Python](https://www.python.org/) (v3.10 or higher)
* [Git](https://git-scm.com/)

Markdown

### 📈 Cleaned Dataset Overview

| Metric | Sample Values |
| :-- | :-- |
| **Total Cleaned Records** | 396 rows |
| **Average Daily Steps** | ~7,637 |
| **Active Tracking Days** | April 12 - May 12 |

#### Sample Data Preview
| ActivityDate | TotalSteps | Calories |
| :--- | :--- | :--- |
| 2016-04-12 | 13,162 | 1,985 |
| 2016-04-13 | 10,735 | 1,797 |
| 2016-04-14 | 10,460 | 1,776 |
[View Cleaned Fitbit Data Set](backend/data/cleaned/daily_activity_cleaned.csv)

---

### 📥 Local Setup Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/Eude06/Nutrition-and-Fitness-tracker.git
cd Nutrition-and-Fitness-tracker