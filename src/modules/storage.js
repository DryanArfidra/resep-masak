// Storage.js - Module for handling localStorage and sessionStorage

class Storage {
    // Favorites management
    static getFavorites() {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites) : [];
    }
    
    static addFavorite(recipe) {
        const favorites = this.getFavorites();
        
        // Check if already in favorites
        const exists = favorites.some(fav => fav.idMeal === recipe.idMeal);
        if (!exists) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            return true;
        }
        
        return false;
    }
    
    static removeFavorite(recipeId) {
        const favorites = this.getFavorites();
        const updatedFavorites = favorites.filter(fav => fav.idMeal !== recipeId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return true;
    }
    
    static isFavorite(recipeId) {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.idMeal === recipeId);
    }
    
    // Theme management
    static getTheme() {
        return sessionStorage.getItem('theme') || 'light';
    }
    
    static setTheme(theme) {
        sessionStorage.setItem('theme', theme);
        return true;
    }
    
    // Clear all storage
    static clearAll() {
        localStorage.clear();
        sessionStorage.clear();
        return true;
    }
}