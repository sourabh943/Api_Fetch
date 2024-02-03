document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  async function fetchData() {
    try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = await response.json();
      displayProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function displayProducts(data) {
    const menTab = document.getElementById('men');
    const womenTab = document.getElementById('women');
    const kidsTab = document.getElementById('kids');
  
    data.categories.forEach(category => {
      category.category_products.forEach(product => {
        const card = createProductCard(product);
  
        if (category.category_name === 'Men') {
          menTab.appendChild(card);
        } else if (category.category_name === 'Women') {
          womenTab.appendChild(card);
        } else if (category.category_name === 'Kids') {
          kidsTab.appendChild(card);
        }
      });
    });
  }
  
  function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    const truncatedTitle = product.title.length > 11 ? product.title.substring(0, 11) + "..." : product.title
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
        <div class="product_info">
            ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
            <div class="T_V"><h2 class="product-title">${truncatedTitle}</h2>
              <p class="vendor-name">&bull; ${product.vendor} </p>
            </div>
            <div class="second">
             <h2 class="price">RS.${product.price}</h2>
             <h2 class="compare" >$${product.compare_at_price}</h2>
             <h2 class="discount">${calculateDiscount(product.price, product.compare_at_price)}% OFF</h2>
            </div>
        </div>
        <div class="cart-btn">
            <button>Add to cart</button>
        </div>
            `;
  
    return card;
  }
  
  function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
  }
  
  function showTab(tabName) {
  
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      if (tab.id === tabName) {
        tab.classList.add('active-tab');
      } else {
        tab.classList.remove('active-tab');
      }
    });
  }
  async function fetchData() {
    try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = await response.json();
      console.log(data); // Log the fetched data
      displayProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }  
 