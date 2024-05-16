document.getElementById('stockForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const availableQuantity = parseFloat(document.getElementById('availableQuantity').value.replace(',', '.'));
    const finalQuantity = parseFloat(document.getElementById('finalQuantity').value.replace(',', '.'));
    
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = '';

    if (finalQuantity > availableQuantity) {
        feedback.innerHTML = 'Erro: A quantidade final não pode ser maior que a quantidade disponível.';
        return;
    }
    
    const usedQuantity = availableQuantity - finalQuantity;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({
        productName,
        availableQuantity,
        finalQuantity,
        usedQuantity
    });

    localStorage.setItem('products', JSON.stringify(products));
    
    displayProducts();
    
    feedback.innerHTML = 'Produto adicionado com sucesso!';
    document.getElementById('stockForm').reset();
});

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
    displayProducts();
};

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const output = document.getElementById('output');
    output.innerHTML = '';

    products.forEach((product, index) => {
        output.innerHTML += `<div class="product">
                                <p><strong>Produto:</strong> ${product.productName}</p>
                                <p><strong>Quantidade Disponível:</strong> ${product.availableQuantity.toFixed(3)} kg</p>
                                <p><strong>Quantidade Final:</strong> ${product.finalQuantity.toFixed(3)} kg</p>
                                <p><strong>Quantidade Utilizada:</strong> ${product.usedQuantity.toFixed(3)} kg</p>
                                <button onclick="removeProduct(${index})">Remover</button>
                             </div>`;
    });
}

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}
