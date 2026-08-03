import os
import pandas as pd

# This code ensures that the output of the directory ecists
os.makedirs("data/cleaned", exist_ok=True)
# 1. The following code loads the raw data
raw_path = "data/raw/dailyActivity_merged.csv"
df = pd.read_csv(raw_path)

# 2. The following code inspects the raw data
print("Initial shape:", df.shape)

# 3. The following code cleans the names of the columns and converts the names to lowercase and strips whitespace)
df.columns = df.columns.str.strip().str.lower()

# 4. The code handles datatypes (converts ActivityDate string to actual datetime)
df['activitydate'] = pd.to_datetime(df['activitydate'])

# 5. This code removes any duplicates
df = df.drop_duplicates()

# 6. This checks for any missing or null values
print("Missing values per column:\n", df.isnull().sum())

#7. Standardize / Feature Engineering (Example: filter out zero-activity days)
# Days where total steps == 0 usually mean the tracker wasn't worn
df_cleaned =df[df['totalsteps'] > 0].copy()

# 8. Save the Cleaned Data
cleaned_path = "data/cleaned/daily_activity_cleaned.csv"
df_cleaned.to_csv(cleaned_path, index=False)

print("Data successfully cleaned! Saved to:", cleaned_path)
print("Cleaned shape:", df_cleaned.shape)