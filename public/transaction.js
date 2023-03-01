function addTransaction(form) {
    console.log(form);
    saleTransaction.inputTransaction(form);
    saleTransaction.showSaleHistory();
}


function countTotalPrice() {
    saleTransaction.totalPrice();
    saleTransaction.changeSum();
}



const databaseTransactionList = {
    save(transactionList) {
        localStorage.setItem('transactionList', JSON.stringify(transactionList));
    },
    get() {
        return JSON.parse(localStorage.getItem('transactionList'));
    }
}

const databaseConsumerList = {
    save(consumerList) {
        localStorage.setItem('consumerList', JSON.stringify(consumerList));
    },
    get() {
        return JSON.parse(localStorage.getItem('consumerList'));
    }
}

const databaseProductList = {
    save(productList) {
        localStorage.setItem('productList', JSON.stringify(productList));
    },

    get() {
        return JSON.parse(localStorage.getItem('productList'));
    }
}

$('#product').on('change', function(){
    const name = $('#product option:selected').data('name');
    const price = $('#product option:selected').data('price');
    const stock = $('#product option:selected').data('stock');
    const image = $('#product option:selected').data('image');
    
    $('[name=name]').val(name);
    $('[name=price]').val(price);
    $('[name=stock]').val(stock);
    $('[name=image]').val(image);
  });


const chooseProduct = {
    showProductList: function () {
        this.productList = databaseProductList.get();
        const listOption = document.getElementById('product');
        this.productList.forEach((item) => {
            listOption.innerHTML += `<option data-name="${item.name}" data-price="${item.price}" data-stock="${item.stock}" data-image="${item.image}">${item.name}</option>`
        })
    },
}

const chooseConsumer = {
    showConsumerList: function () {
        this.consumerList = databaseConsumerList.get();
        const listOption = document.getElementById('consumer');
        this.consumerList.forEach((item) => {
            listOption.innerHTML += `<option>${item.consumerName}</option>`
        })
    }
}


const saleTransaction = {
    transaction: {
        index: -1,
        consumer: null,
        product: null,
        name: null,
        price: null,
        stock: null,
        image: null,
        sum: null,
        total: null,
        cash: null,
        change: null
    },
    transactionList: [],
    inputTransaction: function (form) {
        this.transaction.index = form.index.value;
        this.transaction.consumer = form.consumer.value;
        this.transaction.product = form.product.value;
        this.transaction.name = form.name.value;
        this.transaction.price = form.price.value;
        this.transaction.stock = form.stock.value;
        this.transaction.image = form.image.value;
        this.transaction.sum = form.sum.value;
        this.transaction.total = form.total.value;
        this.transaction.cash = form.cash.value;
        this.transaction.change = form.change.value;


        if(!this.transaction.consumer) {
            alert('Konsumen tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.product) {
            alert('Produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.name) {
            alert('Nama produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.price) {
            alert('harga produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.stock) {
            alert('Stok produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.image) {
            alert('Link gambar produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.sum) {
            alert('Jumlah tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.total) {
            alert('Total harga tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.cash) {
            alert('Tunai tidak boleh kosong!');
            return false;
        }
        if(!this.transaction.change) {
            alert('Kembalian tidak boleh kosong!');
            return false;
        }
        if(this.transaction.index == -1) {
            this.transactionList = this.transactionList || [];
            this.transactionList.push(copy(this.transaction));
        } else {
            this.transactionList[this.transaction.index] = copy(this.transaction)
        }

        databaseTransactionList.save(this.transactionList);
        this.resetFormTransaction(form);
    },
    resetFormTransaction (form) {
        this.transaction.index = -1;
        this.transaction.consumer = null;
        this.transaction.product = null;
        this.transaction.name = null;
        this.transaction.price = null;
        this.transaction.stock = null;
        this.transaction.image = null;
        this.transaction.sum = null;
        this.transaction.total = null;
        this.transaction.cash = null;
        this.transaction.change = null;

        form.index.value = this.transaction.index;
        form.consumer.value = this.transaction.consumer;
        form.product.value = this.transaction.product;
        form.name.value = this.transaction.name;
        form.price.value = this.transaction.price
        form.stock.value = this.transaction.stock;
        form.image.value = this.transaction.image;
        form.sum.value = this.transaction.sum;
        form.total.value = this.transaction.total;
        form.cash.value = this.transaction.cash;
        form.change.value = this.transaction.change;
    },
    showSaleHistory: function () {
        this.transactionList = databaseTransactionList.get();
        const componentTransactionList = document.getElementById('transaction-list');
        componentTransactionList.innerHTML = '';
        if (this.transactionList === null) {
            this.transactionList = [];
        } else {
            this.transactionList.forEach((transaction, index) => {
                componentTransactionList.innerHTML += 
                    `<div class="flex justify-between">
                        <div>
                            ${transaction.consumer} <br>
                            ${transaction.name} <br> 
                            ${transaction.price} <br> 
                            Stok: ${transaction.stock} <br> 
                            Jumlah: ${transaction.sum} <br> 
                            Total Harga: ${transaction.total} <br> 
                            Tunai: ${transaction.cash} <br> 
                            Kembalian: ${transaction.change} <br> 
                            ------------------ <br>
                        </div>
                        <div>
                            <img src="${transaction.image}" width="110px" height="110px"> <br>
                        </div>
                    </div>`;
            });
        }
    },
    totalPrice: function () {
        var priceValue = document.getElementById('price').value;
        var sumValue = document.getElementById('sum').value;
        var result = parseInt(priceValue) * parseInt(sumValue);
        if (!isNaN(result)) {
           document.getElementById('total').value = result;
        }
    },
    changeSum: function () {
        var cashValue = document.getElementById('cash').value;
        var totalvalue = document.getElementById('total').value;
        var result = parseInt(cashValue) - parseInt(totalvalue);
        if (!isNaN(result)) {
           document.getElementById('change').value = result;
        }
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

saleTransaction.showSaleHistory();
chooseConsumer.showConsumerList();
chooseProduct.showProductList();