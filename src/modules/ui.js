// UI.js - Module for handling UI rendering and interactions

class UI {
    constructor() {
        this.recipeGrid = document.getElementById('recipe-grid');
        this.categoryButtons = document.getElementById('category-buttons');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('error-message');
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.themeToggle = document.getElementById('theme-toggle');
        this.recipeDetail = document.getElementById('recipe-detail');
    }

    // Show loading indicator
    showLoading() {
        if (this.loading) this.loading.style.display = 'flex';
        if (this.errorMessage) this.errorMessage.style.display = 'none';
    }

    // Hide loading indicator
    hideLoading() {
        if (this.loading) this.loading.style.display = 'none';
    }

    // Show error message
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.style.display = 'flex';
            const errorText = this.errorMessage.querySelector('p');
            if (errorText) errorText.textContent = message || 'Terjadi kesalahan. Silakan coba lagi.';
        }
    }

    // Hide error message
    hideError() {
        if (this.errorMessage) this.errorMessage.style.display = 'none';
    }

    // Render category buttons
    renderCategories(categories) {
        if (!this.categoryButtons) return;
        
        this.categoryButtons.innerHTML = '';
        
        // Add "All" button
        const allButton = document.createElement('button');
        allButton.className = 'category-button active';
        allButton.textContent = 'Semua';
        allButton.dataset.category = 'all';
        this.categoryButtons.appendChild(allButton);
        
        // Add category buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'category-button';
            button.textContent = category.strCategory;
            button.dataset.category = category.strCategory;
            this.categoryButtons.appendChild(button);
        });
    }

    // Render recipe cards
    renderRecipes(recipes) {
        if (!this.recipeGrid) return;
        
        this.recipeGrid.innerHTML = '';
        
        if (!recipes || recipes.length === 0) {
            this.recipeGrid.innerHTML = '<p>Tidak ada resep ditemukan.</p>';
            return;
        }
        
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.dataset.id = recipe.idMeal;
            
            card.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.strMeal}</h3>
                    <p class="recipe-category">${recipe.strCategory || 'Resep'}</p>
                    <div class="recipe-actions">
                        <button class="favorite-button" data-id="${recipe.idMeal}">
                            <i class="far fa-heart"></i>
                        </button>
                        <a href="detail.html?id=${recipe.idMeal}" class="view-details">
                            Lihat Detail <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            
            this.recipeGrid.appendChild(card);
        });
    }

    // Render recipe details
    renderRecipeDetails(recipe) {
        if (!this.recipeDetail) return;
        
        // Get favorite status
        const favorites = Storage.getFavorites();
        const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
        
        // Prepare ingredients
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        
        // Prepare instructions
        const instructions = recipe.strInstructions.split('\r\n').filter(step => step.trim() !== '');
        
        this.recipeDetail.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-detail-image">
            <div class="recipe-detail-content">
                <div class="recipe-detail-header">
                    <div>
                        <h2 class="recipe-detail-title">${recipe.strMeal}</h2>
                        <p class="recipe-detail-category">${recipe.strCategory}</p>
                    </div>
                    <button class="recipe-detail-favorite ${isFavorite ? 'active' : ''}" data-id="${recipe.idMeal}">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Bahan-bahan</h3>
                    <ul class="ingredients-list">
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Cara Memasak</h3>
                    <ol class="instructions-list">
                        ${instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;
    }

    // Setup event listeners
    setupEventListeners() {
        // Category filter
        if (this.categoryButtons) {
            this.categoryButtons.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-button')) {
                    // Update active button
                    document.querySelectorAll('.category-button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    // Filter recipes
                    const category = e.target.dataset.category;
                    if (category === 'all') {
                        app.loadDefaultRecipes();
                    } else {
                        app.loadRecipesByCategory(category);
                    }
                }
            });
        }
        
        // Search functionality
        if (this.searchButton && this.searchInput) {
            this.searchButton.addEventListener('click', () => {
                const query = this.searchInput.value.trim();
                if (query) {
                    app.searchRecipes(query);
                }
            });
            
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = this.searchInput.value.trim();
                    if (query) {
                        app.searchRecipes(query);
                    }
                }
            });
        }
        
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                app.toggleTheme();
            });
        }
        
        // Favorite buttons (event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.favorite-button')) {
                const button = e.target.closest('.favorite-button');
                const id = button.dataset.id;
                app.toggleFavorite(id);
            }
            
            if (e.target.closest('.recipe-detail-favorite')) {
                const button = e.target.closest('.recipe-detail-favorite');
                const id = button.dataset.id;
                app.toggleFavorite(id);
                
                // Update UI
                const icon = button.querySelector('i');
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                } else {
                    button.classList.add('active');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
        });
    }
}