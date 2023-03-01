function addProduct(form) {
    console.log(form);
    productListApllication.inputProduct(form);
    productListApllication.displayProductList();
}

const databaseProductList = {
    save(productList) {
        localStorage.setItem('productList', JSON.stringify(productList));
    },

    get() {
        return JSON.parse(localStorage.getItem('productList'));
    }
}

const databasecategoryList = {
    save(categoryList) {
        localStorage.setItem('categoryList', JSON.stringify(categoryList));
    },
    get() {
        return JSON.parse(localStorage.getItem('categoryList'));
    }
}

const categoryProduct = {
    displayCategoryList: function () {
        this.categoryList = databasecategoryList.get();
        const listOption = document.getElementById('category');
        this.categoryList.forEach((item) => {
            listOption.innerHTML += `<option>${item.categoryName}</option>`
        })
    }
}

const productListApllication = {
    product: {
        index: -1,
        category: null,
        name: null,
        price: null,
        stock: null,
        image: null
    },
    productList: [],
    inputProduct: function (form) {
        this.product.index = form.index.value;
        this.product.category = form.category.value;
        this.product.name = form.name.value;
        this.product.price = form.price.value;
        this.product.stock = form.stock.value;
        this.product.image = form.image.value;

        if(!this.product.category) {
            alert('Daftar kategori tidak boleh kosong!');
            return false;
        }

        if(!this.product.name) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(!this.product.price) {
            alert('Harga tidak boleh kosong!');
            return false;
        }

        if(!this.product.stock) {
            alert('Stok tidak boleh kosong!');
            return false;
        }

        if(!this.product.image) {
            alert('Gambar tidak boleh kosong!');
            return false;
        }

        if(this.product.index == -1) {
            this.productList = this.productList || [];
            this.productList.push(copy(this.product));
        } else {
            this.productList[this.product.index] = copy(this.product)
        }
        databaseProductList.save(this.productList);
        this.resetFormProduct(form);
    },
    resetFormProduct: function (form) {
        this.product.category = null;
        this.product.name = null;
        this.product.price = null;
        this.product.stock = null;
        this.product.image = null;
        this.product.index = -1;

        form.category.value = this.product.category;
        form.name.value = this.product.name;
        form.price.value = this.product.price;
        form.stock.value = this.product.stock;
        form.image.value = this.product.image;
        form.index.value = this.product.index;

        document.getElementById('btn-save-product').innerHTML = 'Tambah';
    },
    displayProductList: function () {
        this.productList = databaseProductList.get();
        const componentProductList = document.getElementById('product-list');
        componentProductList.innerHTML = '';
        if (this.productList === null) {
            this.productList = [];
        } else {
            this.productList.forEach((product, index) => {
                componentProductList.innerHTML += `
                <div class="flex justify-between">
                    <div>
                        Kategori Produk: ${product.category} <br>
                        ${product.name} <br> 
                        Rp.  ${product.price} <br> 
                        Stok: ${product.stock} <br>
                        <button onclick="productListApllication.editProduct(${index})" class="btn btn-primary btn-xs">Edit</button> 
                        <button onclick="productListApllication.deleteProduct(${index})" class="btn btn-error btn-xs">Hapus</button> <br>
                    </div>
                    <div>
                        <img src="${product.image}" width="80px" height="80px"> <br> 
                    </div>   
                </div>`;
            });
        }
    },
    deleteProduct: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.productList.splice(index, 1);
            databaseProductList.save(this.productList);
            this.displayProductList();
        }
    },
    editProduct: function (index) {
        const product = this.productList[index];
        const form = document.getElementById('form-product');
        form.category.value = product.category;
        form.name.value = product.name;
        form.price.value = product.price;
        form.stock.value = product.stock;
        form.image.value = product.image;
        form.index.value = index;

        document.getElementById('btn-save-product').innerHTML = 'Edit';
    }
}
 
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

productListApllication.displayProductList();
categoryProduct.displayCategoryList();