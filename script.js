// Cake data with detailed information
const cakes = [
    {
        id: 1,
        name: "Chocolate Delight",
        description: "Rich chocolate cake with creamy chocolate frosting and chocolate chips",
        detailedDescription: "Indulge in our signature chocolate cake featuring layers of moist chocolate sponge, rich chocolate ganache, and topped with premium chocolate chips. Perfect for chocolate lovers!",
        ingredients: ["Premium cocoa powder", "Dark chocolate chips", "Fresh eggs", "Butter", "Sugar", "Flour", "Vanilla extract", "Heavy cream"],
        price: "₹1,999",
        image: "https://github.com/Satbali/red-velvet-bakery/blob/main/img/1.jpg"
    },
    {
        id: 2,
        name: "Vanilla Dream",
        description: "Classic vanilla sponge cake with buttercream frosting and fresh berries",
        detailedDescription: "A timeless classic featuring fluffy vanilla sponge layers with smooth buttercream frosting, decorated with fresh seasonal berries for that perfect sweet finish.",
        ingredients: ["Vanilla beans", "Fresh berries", "Butter", "Sugar", "Eggs", "Flour", "Milk", "Baking powder"],
        price: "₹1,799",
        image: "img/2.jpg"
    },
    {
        id: 3,
        name: "Red Velvet Romance",
        description: "Moist red velvet cake with cream cheese frosting and elegant decoration",
        detailedDescription: "Our romantic red velvet cake with its distinctive color and subtle cocoa flavor, layered with tangy cream cheese frosting and elegant decorative touches.",
        ingredients: ["Red food coloring", "Cocoa powder", "Cream cheese", "Buttermilk", "Eggs", "Sugar", "Flour", "Vanilla"],
        price: "₹2,299",
        image: "img/3.jpg"
    },
    {
        id: 4,
        name: "Strawberry Bliss",
        description: "Fresh strawberry cake with whipped cream and strawberry compote",
        detailedDescription: "Light and airy strawberry cake made with fresh strawberry puree, layered with fluffy whipped cream and homemade strawberry compote.",
        ingredients: ["Fresh strawberries", "Strawberry puree", "Heavy cream", "Sugar", "Eggs", "Flour", "Gelatin", "Lemon juice"],
        price: "₹2,099",
        image: "img/4.png"
    },
    {
        id: 5,
        name: "Lemon Sunshine",
        description: "Zesty lemon cake with lemon curd filling and citrus glaze",
        detailedDescription: "Bright and refreshing lemon cake with tangy lemon curd filling between layers and finished with a glossy citrus glaze that adds the perfect zing.",
        ingredients: ["Fresh lemons", "Lemon zest", "Lemon curd", "Butter", "Sugar", "Eggs", "Flour", "Powdered sugar"],
        price: "₹1,949",
        image: "img/5.png"
    },
    {
        id: 6,
        name: "Carrot Garden",
        description: "Spiced carrot cake with cream cheese frosting and walnut pieces",
        detailedDescription: "Moist and flavorful carrot cake spiced with cinnamon and nutmeg, topped with rich cream cheese frosting and crunchy walnut pieces.",
        ingredients: ["Fresh carrots", "Walnuts", "Cinnamon", "Nutmeg", "Cream cheese", "Eggs", "Brown sugar", "Vegetable oil"],
        price: "₹1,899",
        image: "img/6.png"
    }
];

// Sample user reviews
const recentReviews = [
    { user: "Priya S.", rating: 5, comment: "Amazing chocolate cake! Perfect for my birthday celebration.", cake: "Chocolate Delight" },
    { user: "Rahul M.", rating: 4, comment: "Fresh and delicious. The strawberries were so sweet!", cake: "Strawberry Bliss" },
    { user: "Anjali K.", rating: 5, comment: "Best red velvet I've ever had. Will order again!", cake: "Red Velvet Romance" },
    { user: "Vikram P.", rating: 4, comment: "Great lemon flavor, not too sweet. Perfect balance.", cake: "Lemon Sunshine" },
    { user: "Meera J.", rating: 5, comment: "Loved the vanilla cake. So moist and fluffy!", cake: "Vanilla Dream" }
];

// Cart functionality
let cart = [];
let cartCount = 0;
let appliedPromo = null;
const promoCodes = {
    'SWEET10': { discount: 10, description: '10% off your order' },
    'CAKE10': { discount: 10, description: '10% discount' }
};

// User authentication
let currentUser = null;
let users = JSON.parse(localStorage.getItem('bakeryUsers')) || [];

// DOM elements
const cakeGrid = document.getElementById('cake-grid');
const cartCountElement = document.getElementById('cart-count');

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
    loadCakes();
    updateCartDisplay();
});

// Get Unsplash fallback image
function getUnsplashFallback(cakeId) {
    const unsplashImages = {
        1: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        2: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
        3: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
        4: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
        5: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
        6: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop"
    };
    return unsplashImages[cakeId] || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop";
}

// Load cakes into the grid
function loadCakes() {
    cakeGrid.innerHTML = '';

    cakes.forEach((cake, index) => {
        const cakeCard = document.createElement('div');
        cakeCard.className = 'cake-card';
        cakeCard.style.animationDelay = `${index * 0.1}s`;

        // Fallback to Unsplash if local image fails
        const imageUrl = cake.image.startsWith('img/') ? cake.image : cake.image;
        const fallbackUrl = cake.image.startsWith('img/') ? getUnsplashFallback(cake.id) : cake.image;

        cakeCard.innerHTML = `
            <div class="cake-image" style="background-image: url('${imageUrl}')" onclick="showCakeDetails(${cake.id})" onerror="this.style.backgroundImage='url(${fallbackUrl})';"></div>
            <div class="cake-info">
                <div class="cake-name">${cake.name}</div>
                <div class="cake-description">${cake.description}</div>
                <div class="cake-price">${cake.price}</div>
                <button class="add-to-cart" onclick="addToCart(${cake.id})">Add to Cart</button>
            </div>
        `;

        cakeGrid.appendChild(cakeCard);
    });
}

// Add cake to cart
function addToCart(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (cake) {
        const existingItem = cart.find(item => item.id === cakeId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...cake, quantity: 1 });
        }
        cartCount++;
        updateCartDisplay();
        showNotification(`${cake.name} added to cart!`);
    }
}

// Update cart display
function updateCartDisplay() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Order Now button functionality
function orderNow() {
    scrollToSection('cakes');

    // Add visual highlight to cakes section
    setTimeout(() => {
        const cakesSection = document.getElementById('cakes');
        if (cakesSection) {
            cakesSection.style.animation = 'highlight 2s ease';

            // Add highlight animation if not exists
            if (!document.querySelector('#highlight-styles')) {
                const style = document.createElement('style');
                style.id = 'highlight-styles';
                style.textContent = `
                    @keyframes highlight {
                        0% { background-color: transparent; }
                        50% { background-color: rgba(233, 30, 99, 0.1); }
                        100% { background-color: transparent; }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        // Show quick order notification
        showNotification('Browse our delicious cakes below and add to cart!');
    }, 800);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Navigation click handlers
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Cart click handler
document.querySelector('.cart').addEventListener('click', function () {
    if (cartCount > 0) {
        showCartModal();
    } else {
        showNotification('Your cart is empty!');
    }
});

// Show cart modal
function showCartModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    let cartHTML = '<h3 style="margin-bottom: 1rem; color: #e91e63;">Your Cart</h3>';
    let subtotal = 0;

    if (cart.length === 0) {
        cartHTML += '<p style="text-align: center; color: #666; margin: 2rem 0;">Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;

            cartHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #eee;">
                    <div style="flex: 1;">
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="color: #666; font-size: 0.9rem;">${item.price} each</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button onclick="updateQuantity(${index}, -1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">-</button>
                        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${index})" style="margin-left: 0.5rem; padding: 0.3rem 0.6rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
                    </div>
                </div>
            `;
        });

        // Promo code section
        cartHTML += `
            <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <input type="text" id="promoInput" placeholder="Enter promo code" style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
                    <button onclick="applyPromo()" style="padding: 0.5rem 1rem; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer;">Apply</button>
                </div>
                <div id="promoStatus" style="font-size: 0.9rem; color: #666;"></div>
            </div>
        `;

        // Calculate totals
        let discount = 0;
        if (appliedPromo) {
            discount = (subtotal * appliedPromo.discount) / 100;
        }
        const total = subtotal - discount;

        cartHTML += `
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e91e63;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toLocaleString('en-IN')}</span>
                </div>
                ${appliedPromo ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #4CAF50;">
                        <span>Discount (${appliedPromo.discount}%):</span>
                        <span>-₹${discount.toLocaleString('en-IN')}</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; border-top: 1px solid #eee; padding-top: 0.5rem;">
                    <span>Total:</span>
                    <span style="color: #e91e63;">₹${total.toLocaleString('en-IN')}</span>
                </div>
            </div>
        `;
    }

    cartHTML += `
        <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <button onclick="clearCart()" style="flex: 1; padding: 0.8rem; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer;">Clear Cart</button>
            <button onclick="proceedToCheckout()" ${cart.length === 0 ? 'disabled' : ''} style="flex: 2; padding: 0.8rem; background: ${cart.length === 0 ? '#ccc' : '#4CAF50'}; color: white; border: none; border-radius: 8px; cursor: ${cart.length === 0 ? 'not-allowed' : 'pointer'};">Proceed to Checkout</button>
        </div>
        <button onclick="closeModal()" style="width: 100%; margin-top: 1rem; padding: 0.8rem; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer;">Close</button>
    `;

    modalContent.innerHTML = cartHTML;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Update promo status if applied
    if (appliedPromo) {
        setTimeout(() => {
            const promoStatus = document.getElementById('promoStatus');
            if (promoStatus) {
                promoStatus.innerHTML = `<span style="color: #4CAF50;">✓ Promo code applied: ${appliedPromo.description}</span>`;
            }
        }, 100);
    }

    // Store modal reference for closing
    window.currentModal = modal;
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        updateCartDisplay();
        closeModal();
        if (cartCount > 0) {
            showCartModal();
        }
    }
}

// Remove item from cart
function removeFromCart(index) {
    if (cart[index]) {
        cartCount -= cart[index].quantity;
        cart.splice(index, 1);
        updateCartDisplay();
        closeModal();
        if (cartCount > 0) {
            showCartModal();
        }
    }
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const promoStatus = document.getElementById('promoStatus');
    const code = promoInput.value.toUpperCase().trim();

    if (promoCodes[code]) {
        appliedPromo = promoCodes[code];
        promoStatus.innerHTML = `<span style="color: #4CAF50;">✓ Promo code applied: ${appliedPromo.description}</span>`;
        promoInput.value = '';
        closeModal();
        showCartModal();
    } else {
        promoStatus.innerHTML = `<span style="color: #f44336;">✗ Invalid promo code</span>`;
    }
}

// Clear cart
function clearCart() {
    cart = [];
    cartCount = 0;
    appliedPromo = null;
    updateCartDisplay();
    closeModal();
    showNotification('Cart cleared!');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) return;

    closeModal();
    showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    // Calculate totals
    let subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        return total + (price * item.quantity);
    }, 0);

    let discount = 0;
    if (appliedPromo) {
        discount = (subtotal * appliedPromo.discount) / 100;
    }
    const total = subtotal - discount;

    let checkoutHTML = `
        <h3 style="margin-bottom: 1rem; color: #e91e63;">Checkout</h3>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Order Summary</h4>
            ${cart.map(item => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>₹${(price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                `;
    }).join('')}
            
            <div style="border-top: 1px solid #eee; padding-top: 0.5rem; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toLocaleString('en-IN')}</span>
                </div>
                ${appliedPromo ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #4CAF50;">
                        <span>Discount:</span>
                        <span>-₹${discount.toLocaleString('en-IN')}</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: #e91e63;">
                    <span>Total:</span>
                    <span>₹${total.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
        
        <form id="checkoutForm" style="margin-bottom: 1rem;">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Name:</label>
                <input type="text" id="customerName" required style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Phone:</label>
                <input type="tel" id="customerPhone" required style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            
            <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Address:</label>
                <textarea id="customerAddress" required rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"></textarea>
            </div>
        </form>
        
        <div style="display: flex; gap: 1rem;">
            <button onclick="closeModal()" style="flex: 1; padding: 0.8rem; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer;">Back</button>
            <button onclick="completeOrder()" style="flex: 2; padding: 0.8rem; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer;">Place Order</button>
        </div>
    `;

    modalContent.innerHTML = checkoutHTML;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    window.currentModal = modal;
}

// Complete order
function completeOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !phone || !address) {
        showNotification('Please fill in all required fields!');
        return;
    }

    // Calculate final total
    let subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        return total + (price * item.quantity);
    }, 0);

    let discount = 0;
    if (appliedPromo) {
        discount = (subtotal * appliedPromo.discount) / 100;
    }
    const total = subtotal - discount;

    showNotification(`Order placed successfully! Total: ₹${total.toLocaleString('en-IN')}. We'll contact you soon.`);
    clearCart();
    closeModal();
}

// Close modal
function closeModal() {
    if (window.currentModal) {
        document.body.removeChild(window.currentModal);
        window.currentModal = null;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    if (window.currentModal && e.target === window.currentModal) {
        closeModal();
    }
});

// Show Sign In Modal
function showSignInModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: #e91e63; text-align: center;">Sign In</h3>
        <form id="signinForm">
            <div style="margin-bottom: 1rem;">
                <input type="email" id="signinEmail" placeholder="Email" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <input type="password" id="signinPassword" placeholder="Password" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <button type="submit" style="width: 100%; padding: 0.8rem; background: #e91e63; color: white; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 1rem;">Sign In</button>
        </form>
        <button onclick="closeModal()" style="width: 100%; padding: 0.8rem; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer;">Cancel</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    window.currentModal = modal;

    document.getElementById('signinForm').addEventListener('submit', handleSignIn);
}

// Show Sign Up Modal
function showSignUpModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: #e91e63; text-align: center;">Sign Up</h3>
        <form id="signupForm">
            <div style="margin-bottom: 1rem;">
                <input type="text" id="signupName" placeholder="Full Name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <input type="email" id="signupEmail" placeholder="Email" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <input type="tel" id="signupPhone" placeholder="Phone Number" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <input type="password" id="signupPassword" placeholder="Password" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px;">
            </div>
            <button type="submit" style="width: 100%; padding: 0.8rem; background: #e91e63; color: white; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 1rem;">Sign Up</button>
        </form>
        <button onclick="closeModal()" style="width: 100%; padding: 0.8rem; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer;">Cancel</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    window.currentModal = modal;

    document.getElementById('signupForm').addEventListener('submit', handleSignUp);
}

// Handle Sign In
function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        updateAuthUI();
        closeModal();
        showNotification(`Welcome back, ${user.name}!`);
    } else {
        showNotification('Invalid email or password!');
    }
}

// Handle Sign Up
function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;

    if (users.find(u => u.email === email)) {
        showNotification('Email already exists!');
        return;
    }

    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('bakeryUsers', JSON.stringify(users));

    currentUser = newUser;
    updateAuthUI();
    closeModal();
    showNotification(`Welcome to Sweet Dreams, ${name}!`);
}

// Update Auth UI
function updateAuthUI() {
    const authSection = document.querySelector('.auth-section');

    if (currentUser) {
        authSection.innerHTML = `
            <span style="color: #e91e63; font-weight: bold; margin-right: 1rem;">Hi, ${currentUser.name}</span>
            <button class="auth-btn" onclick="signOut()">Sign Out</button>
        `;
    } else {
        authSection.innerHTML = `
            <button class="auth-btn" onclick="showSignInModal()">Sign In</button>
            <button class="auth-btn signup" onclick="showSignUpModal()">Sign Up</button>
        `;
    }
}

// Sign Out
function signOut() {
    currentUser = null;
    updateAuthUI();
    showNotification('Signed out successfully!');
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function () {
    updateAuthUI();
});

// Show cake details modal
function showCakeDetails(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (!cake) return;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 0;
        border-radius: 15px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    `;

    const generateStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${cake.image}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px 15px 0 0;">
            <button onclick="closeModal()" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">&times;</button>
        </div>
        
        <div style="padding: 2rem;">
            <h2 style="color: #e91e63; margin-bottom: 1rem; font-size: 2rem;">${cake.name}</h2>
            <div style="font-size: 1.5rem; color: #e91e63; font-weight: bold; margin-bottom: 1.5rem;">${cake.price}</div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #333; margin-bottom: 0.5rem;">Description</h3>
                <p style="color: #666; line-height: 1.6;">${cake.detailedDescription}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #333; margin-bottom: 0.5rem;">Ingredients</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${cake.ingredients.map(ingredient =>
        `<span style="background: #f8f9fa; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; color: #666;">${ingredient}</span>`
    ).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #333; margin-bottom: 1rem;">Recent Customer Reviews</h3>
                ${recentReviews.slice(0, 5).map(review => `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <div>
                                <strong style="color: #333;">${review.user}</strong>
                                <span style="color: #999; font-size: 0.9rem; margin-left: 0.5rem;">• ${review.cake}</span>
                            </div>
                            <span style="color: #ffc107; font-size: 1rem;">${generateStars(review.rating)}</span>
                        </div>
                        <p style="color: #666;">"${review.comment}"</p>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="addToCart(${cake.id}); closeModal();" style="flex: 1; padding: 1rem; background: #e91e63; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem;">Add to Cart</button>
                <button onclick="closeModal()" style="flex: 1; padding: 1rem; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem;">Close</button>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    window.currentModal = modal;
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
