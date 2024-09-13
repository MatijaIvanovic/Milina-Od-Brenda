import {Request, Response, NextFunction} from 'express';
import { CartItems, Products } from '../dto';

// Utility to get the cart from localStorage
function getCart(): CartItems[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) as CartItems[] : [];
}

// Utility to save the cart back to localStorage
function saveCart(cart: CartItems[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to the cart
function addToCart(product: Products): void {
    const cart = getCart();
    
    // Check if the product is already in the cart
    const existingProduct = cart.find(product => product.id === product.id);
    
    if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);  // Save the updated cart back to localStorage
}

// Remove product from the cart
function removeFromCart(productId: number): void {
    let cart = getCart();
    
    // Filter out the product with the given ID
    cart = cart.filter(product => product.id !== productId);
    
    saveCart(cart);  // Save the updated cart back to localStorage
}

// Update the quantity of a product in the cart
function updateCartQuantity(productId: number, quantity: number): void {
    const cart = getCart();
    
    const product = cart.find(item => item.id === productId);
    
    if (product && quantity > 0) {
        product.quantity = quantity;
    } else if (product && quantity === 0) {
        // If quantity is 0, remove the product from the cart
        removeFromCart(productId);
    }
    
    saveCart(cart);  // Save the updated cart back to localStorage
}

// Clear the entire cart
function clearCart(): void {
    localStorage.removeItem('cart');
}
