// main.js - Main application logic

// Import modules
const api = new MealAPI();
const ui = new UI();

// Main app object
const app = {
    // Initialize app
    init() {
        // Setup event listeners
        ui.setupEventListeners();
        
        // Apply saved theme
        const savedTheme = Storage.getTheme();
        Utils.applyTheme(savedTheme);
        
        // Check current page
        if (window.location.pathname.includes('detail.html')) {
            this.loadRecipeDetail();
        } else {
            this.loadCategories();
            this.loadDefaultRecipes();
        }
    },
    
    // Load categories
    async loadCategories() {
        try {
            ui.showLoading();
            const categories = await api.getCategories();
            ui.renderCategories(categories);
        } catch (error) {
            ui.showError('Gagal memuat kategori. Silakan coba lagi.');
            console.error('Error loading categories:', error);
        } finally {
            ui.hideLoading();
        }
    },
    
    // Load default recipes (Dessert category)
    async loadDefaultRecipes() {
        try {
            ui.showLoading();
            const recipes = await api.getMealsByCategory('Dessert');
            ui.renderRecipes(recipes);
        } catch (error) {
            ui.showError('Gagal memuat resep. Silakan coba lagi.');
            console.error('Error loading default recipes:', error);
        } finally {
            ui.hideLoading();
        }
    },
    
    // Load recipes by category
    async loadRecipesByCategory(category) {
        try {
            ui.showLoading();
            const recipes = await api.getMealsByCategory(category);
            ui.renderRecipes(recipes);
        } catch (error) {
            ui.showError(`Gagal memuat resep kategori ${category}. Silakan coba lagi.`);
            console.error(`Error loading recipes for category ${category}:`, error);
        } finally {
            ui.hideLoading();
        }
    },
    
    // Search recipes
    async searchRecipes(query) {
        try {
            ui.showLoading();
            const recipes = await api.searchMeals(query);
            ui.renderRecipes(recipes);
        } catch (error) {
            ui.showError('Gagal mencari resep. Silakan coba lagi.');
            console.error(`Error searching recipes with query ${query}:`, error);
        } finally {
            ui.hideLoading();
        }
    },
    
    // Load recipe detail
    async loadRecipeDetail() {
        const params = Utils.getUrlParams();
        const recipeId = params.id;
        
        if (!recipeId) {
            ui.showError('ID resep tidak ditemukan.');
            return;
        }
        
        try {
            ui.showLoading();
            const recipe = await api.getMealDetails(recipeId);
            ui.renderRecipeDetails(recipe);
        } catch (error) {
            ui.showError('Gagal memuat detail resep. Silakan coba lagi.');
            console.error(`Error loading recipe details for ID ${recipeId}:`, error);
        } finally {
            ui.hideLoading();
        }
    },
    
    // Toggle favorite
    async toggleFavorite(recipeId) {
        try {
            const recipe = await api.getMealDetails(recipeId);
            
            if (Storage.isFavorite(recipeId)) {
                Storage.removeFavorite(recipeId);
                Utils.showNotification('Resep dihapus dari favorit', 'success');
            } else {
                Storage.addFavorite(recipe);
                Utils.showNotification('Resep ditambahkan ke favorit', 'success');
            }
        } catch (error) {
            Utils.showNotification('Gagal mengubah status favorit', 'error');
            console.error(`Error toggling favorite for recipe ID ${recipeId}:`, error);
        }
    },
    
    // Toggle theme
    toggleTheme() {
        const currentTheme = Storage.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        Storage.setTheme(newTheme);
        Utils.applyTheme(newTheme);
        
        Utils.showNotification(`Tema diubah ke ${newTheme === 'dark' ? 'gelap' : 'terang'}`, 'info');
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', app.init());