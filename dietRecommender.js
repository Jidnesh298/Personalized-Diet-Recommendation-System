export const generateDietPlan = (calories, preferences) => {
    const nutritionData = [
      // Breakfast Items
      { foodItem: "Idli with Sambar", calories: 150, category: "Breakfast", dietType: "Vegetarian" },
      { foodItem: "Poha with Peanuts", calories: 200, category: "Breakfast", dietType: "Vegetarian" },
      { foodItem: "Paratha with Yogurt", calories: 300, category: "Breakfast", dietType: "Vegetarian" },
      { foodItem: "Upma with Vegetables", calories: 180, category: "Breakfast", dietType: "Vegetarian" },
      { foodItem: "Masala Dosa", calories: 250, category: "Breakfast", dietType: "Vegetarian" },

      // Lunch Items
      { foodItem: "Rajma Chawal", calories: 350, category: "Lunch", dietType: "Vegetarian" },
      { foodItem: "Vegetable Pulao", calories: 300, category: "Lunch", dietType: "Vegetarian" },
      { foodItem: "Dal Tadka with Rice", calories: 400, category: "Lunch", dietType: "Vegetarian" },
      { foodItem: "Paneer Butter Masala with Naan", calories: 450, category: "Lunch", dietType: "Vegetarian" },
      { foodItem: "Bhindi Masala with Roti", calories: 250, category: "Lunch", dietType: "Vegetarian" },

      // Dinner Items
      { foodItem: "Palak Paneer with Roti", calories: 350, category: "Dinner", dietType: "Vegetarian" },
      { foodItem: "Mixed Vegetable Curry with Rice", calories: 300, category: "Dinner", dietType: "Vegetarian" },
      { foodItem: "Stuffed Capsicum with Roti", calories: 280, category: "Dinner", dietType: "Vegetarian" },
      { foodItem: "Chana Masala with Paratha", calories: 400, category: "Dinner", dietType: "Vegetarian" },
      { foodItem: "Kadhi Pakora with Rice", calories: 350, category: "Dinner", dietType: "Vegetarian" },

      // Snack Items
      { foodItem: "Bhel Puri", calories: 150, category: "Snack", dietType: "Vegetarian" },
      { foodItem: "Chana Chaat", calories: 200, category: "Snack", dietType: "Vegetarian" },
      { foodItem: "Masala Corn", calories: 100, category: "Snack", dietType: "Vegetarian" },
      { foodItem: "Paneer Tikka", calories: 250, category: "Snack", dietType: "Vegetarian" },
      { foodItem: "Vegetable Sandwich", calories: 180, category: "Snack", dietType: "Vegetarian" }
    ];
  
    // Filter items based on user preferences
    const filteredData = nutritionData.filter(item => preferences.includes(item.category));
  
    // Generate diet plan within calorie limits
    let remainingCalories = calories;
    let dietPlan = [];
  
    for (const item of filteredData) {
      if (remainingCalories <= 0) break;
      if (item.calories <= remainingCalories) {
        dietPlan.push(item);
        remainingCalories -= item.calories;
      }
    }
  
    return dietPlan;
  };
  