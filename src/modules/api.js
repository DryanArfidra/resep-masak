// API.js - Module for handling API requests to TheMealDB

class MealAPI {
    constructor() {
        this.baseURL = 'https://www.themealdb.com/api/json/v1/1';
    }

    // Fetch all categories
    async getCategories() {
        try {
            const response = await fetch(`${this.baseURL}/categories.php`);
            const data = await response.json();
            return data.categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    // Fetch meals by category
    async getMealsByCategory(category) {
        try {
            const response = await fetch(`${this.baseURL}/filter.php?c=${category}`);
            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error(`Error fetching meals for category ${category}:`, error);
            throw error;
        }
    }

    // Fetch meal details by ID
    async getMealDetails(id) {
        try {
            const response = await fetch(`${this.baseURL}/lookup.php?i=${id}`);
            const data = await response.json();
            return data.meals[0];
        } catch (error) {
            console.error(`Error fetching meal details for ID ${id}:`, error);
            throw error;
        }
    }

    // Search meals by name
    async searchMeals(query) {
        try {
            const response = await fetch(`${this.baseURL}/search.php?s=${query}`);
            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error(`Error searching meals with query ${query}:`, error);
            throw error;
        }
    }
}