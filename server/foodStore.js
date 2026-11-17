// Liviu Radu, 041-290-873
// Assignment 3 - Mock database (singleton)
//
// This file is our fake database. It keeps five food items in memory.
// "Singleton" means only ONE copy of the store ever exists. Every file
// that requires this module gets the same object, so the data is shared.

class FoodStore {
  constructor() {
    // If an instance already exists, hand back that same one
    if (FoodStore.instance) {
      console.log('[FoodStore] Returning the existing instance');
      return FoodStore.instance;
    }

    // The mock data: five food items, each with a price
    this.foods = [
      { id: 1, name: 'Apple', price: 1.25 },
      { id: 2, name: 'Bread', price: 3.5 },
      { id: 3, name: 'Cheese', price: 5.99 },
      { id: 4, name: 'Milk', price: 4.25 },
      { id: 5, name: 'Eggs', price: 3.99 }
    ];

    FoodStore.instance = this;
    console.log('[FoodStore] Created the singleton with', this.foods.length, 'items');
  }

  // Returns every food item in the store
  getAll() {
    console.log('[FoodStore] getAll() called');
    return this.foods;
  }
}

// Export one shared instance (not the class) so everyone uses the same store
module.exports = new FoodStore();
