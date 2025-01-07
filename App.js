import React, { useState } from "react";
import "./App.css";
import { generateDietPlan } from "./dietRecommender"; // Import the updated generateDietPlan function

function App() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("Sedentary");
  const [preferences, setPreferences] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [calories, setCalories] = useState(null);
  const [dietPlan, setDietPlan] = useState([]);
  const [bmi, setBmi] = useState(null);

  const calculateBmi = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const calculateCalories = (age, gender, weight, height, activityLevel) => {
    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);
    const baseCalories =
      gender === "Male"
        ? 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age
        : 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.330 * age;

    const activityMultiplier =
      activityLevel === "Sedentary"
        ? 1.2
        : activityLevel === "Moderate"
        ? 1.55
        : 1.725;

    return Math.round(baseCalories * activityMultiplier);
  };

  const handleSubmit = () => {
    const calculatedBmi = calculateBmi(weight, height);
    const calculatedCalories = calculateCalories(age, gender, weight, height, activityLevel);
    const generatedDietPlan = generateDietPlan(calculatedCalories, preferences);

    setBmi(calculatedBmi);
    setCalories(calculatedCalories);
    setDietPlan(generatedDietPlan);
  };

  return (
    
    <div className="App">
      <div className="container">
        <h1 className="title">Personalized Diet Recommendation System</h1>

        <div className="form">
      
          <div className="input-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
              placeholder="Enter your age"
            />
          </div>

          <div className="input-group">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label>Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-field"
              placeholder="Enter your weight"
            />
          </div>

          <div className="input-group">
            <label>Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-field"
              placeholder="Enter your height"
            />
          </div>

          <div className="input-group">
            <label>Activity Level:</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="input-field"
            >
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <div className="input-group">
            <label>Dietary Preferences:</label>
            <select
              multiple
              value={preferences}
              onChange={(e) => setPreferences([...e.target.selectedOptions].map((opt) => opt.value))}
              className="input-field"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Generate Diet Plan
          </button>
        </div>

        {/* Results */}
        {bmi && (
          <div className="result">
            <h3>Your BMI: <span>{bmi}</span></h3>
            <h3>Your Daily Caloric Needs: <span>{calories} kcal</span></h3>
          </div>
        )}

        {dietPlan.length > 0 && (
          <div className="diet-plan">
            <h3>Recommended Diet Plan:</h3>
            <ul>
              {dietPlan.map((item, index) => (
                <li key={index}>
                  <strong>{item.foodItem}</strong> - {item.calories} kcal
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
