import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Nutrition States
  const [logs, setLogs] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  // Fitness States
  const [fitnessLogs, setFitnessLogs] = useState([]);
  const [walks, setWalks] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bp, setBp] = useState("");

  const NUTRITION_API = "http://127.0.0.1:8000/api/logs";
  const FITNESS_API = "http://127.0.0.1:8000/api/fitness";

  // Fetch all data from cloud database
  const fetchData = async () => {
    try {
      const nutritionRes = await axios.get(NUTRITION_API);
      setLogs(nutritionRes.data);
      
      const fitnessRes = await axios.get(FITNESS_API);
      setFitnessLogs(fitnessRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Nutrition Submit
  const handleNutritionSubmit = async (e) => {
    e.preventDefault();
    if (!foodName || !calories) return alert("Food name and calories are required!");

    const newFood = {
      food_name: foodName,
      calories: parseInt(calories),
      protein: protein ? parseFloat(protein) : 0.0,
      carbs: carbs ? parseFloat(carbs) : 0.0,
      fats: fats ? parseFloat(fats) : 0.0,
    };

    try {
      await axios.post(NUTRITION_API, newFood);
      setFoodName(""); setCalories(""); setProtein(""); setCarbs(""); setFats("");
      fetchData();
    } catch (error) {
      console.error("Error saving nutrition log:", error);
    }
  };

  // Handle Fitness Submit
  const handleFitnessSubmit = async (e) => {
    e.preventDefault();
    if (!walks || !heartRate || !bp) return alert("All fitness fields are required!");

    const newFitness = {
      walks_count: parseInt(walks),
      avg_heart_rate: parseInt(heartRate),
      blood_pressure: bp,
    };

    try {
      await axios.post(FITNESS_API, newFitness);
      setWalks(""); setHeartRate(""); setBp("");
      fetchData();
    } catch (error) {
      console.error("Error saving fitness log:", error);
    }
  };

  // Delete Handlers
  const handleDeleteNutrition = async (id) => {
    try {
      await axios.delete(`${NUTRITION_API}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting nutrition entry:", error);
    }
  };

  const handleDeleteFitness = async (id) => {
    try {
      await axios.delete(`${FITNESS_API}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting fitness entry:", error);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Personal Health Dashboard</h1>
      
      {/* TWO COLUMN GRID FOR FORMS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        
        {/* Nutrition Input Form */}
        <form onSubmit={handleNutritionSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#f5f5f5", padding: "20px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <h3 style={{ margin: "0 0 10px 0" }}>Log New Meal</h3>
          <input type="text" placeholder="Food Name (e.g., Rice & Chicken)" value={foodName} onChange={(e) => setFoodName(e.target.value)} style={{ padding: "8px" }} />
          <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} style={{ padding: "8px" }} />
          <input type="number" step="0.1" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} style={{ padding: "8px" }} />
          <input type="number" step="0.1" placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} style={{ padding: "8px" }} />
          <input type="number" step="0.1" placeholder="Fats (g)" value={fats} onChange={(e) => setFats(e.target.value)} style={{ padding: "8px" }} />
          <button type="submit" style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Add Food Entry</button>
        </form>

        {/* Fitness Input Form */}
        <form onSubmit={handleFitnessSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#eef7ff", padding: "20px", borderRadius: "8px", border: "1px solid #cfe2fe" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#004085" }}>Log Daily Vitals & Activity</h3>
          <input type="number" placeholder="Number of Walks / Sessions" value={walks} onChange={(e) => setWalks(e.target.value)} style={{ padding: "8px" }} />
          <input type="number" placeholder="Avg Heart Rate (BPM)" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} style={{ padding: "8px" }} />
          <input type="text" placeholder="Blood Pressure (e.g., 120/80)" value={bp} onChange={(e) => setBp(e.target.value)} style={{ padding: "8px" }} />
          <button type="submit" style={{ padding: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Add Fitness Entry</button>
        </form>

      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "4px 0 30px 0" }} />

      {/* TWO COLUMN GRID FOR OUTPUT LOGS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        
        {/* Nutrition History */}
        <div>
          <h3>Today's Food Log</h3>
          {logs.length === 0 ? <p style={{ color: "#666" }}>No food logged yet.</p> : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {logs.map((log) => (
                <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ddd", padding: "12px", borderRadius: "6px" }}>
                  <div>
                    <strong>{log.food_name}</strong> — {log.calories} kcal
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      P: {log.protein}g | C: {log.carbs}g | F: {log.fats}g
                    </div>
                  </div>
                  <button onClick={() => handleDeleteNutrition(log.id)} style={{ background: "#ff4d4d", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fitness History */}
        <div>
          <h3>Activity & Vitals Log</h3>
          {fitnessLogs.length === 0 ? <p style={{ color: "#666" }}>No fitness metrics logged yet.</p> : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {fitnessLogs.map((fLog) => (
                <div key={fLog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #bbeebe", background: "#fafdfa", padding: "12px", borderRadius: "6px" }}>
                  <div>
                    <strong>🚶 Walks Count:</strong> {fLog.walks_count} <br />
                    <span style={{ fontSize: "13px", color: "#333" }}>
                      ❤️ <strong>Avg HR:</strong> {fLog.avg_heart_rate} BPM | 🩺 <strong>BP:</strong> {fLog.blood_pressure}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteFitness(fLog.id)} style={{ background: "#ff4d4d", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;