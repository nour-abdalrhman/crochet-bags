const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const closeBanner = document.getElementById('closeBanner');
const promoBanner = document.getElementById('promoBanner');


menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


closeBanner.addEventListener('click', () => {
    promoBanner.classList.add('hidden');
});


function getCart() {
    const cart = localStorage.getItem('crochetCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('crochetCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPriceElement = productCard.querySelector('.product-price .new');
        const productPriceText = productPriceElement.textContent;
        const productPrice = parseInt(productPriceText.replace(/[^0-9]/g, ''));
        const productImage = productCard.querySelector('.product-img img').src;
        
    
        let cart = getCart();
        
      
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        
        saveCart(cart);
        updateCartCount();
        
       
        this.textContent = '✓ Added';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
            this.textContent = 'Add to cart 🛒';
            this.style.background = 'linear-gradient(135deg, #e91e63, #ff6b9d)';
        }, 2000);
    });
});

updateCartCount();