function addCategory(form) {
    console.log(form);
    categoryProduct.inputCategory(form);
    categoryProduct.displaySaleHistory();
}

const databaseCategoryList = {
    save(categoryList) {
        localStorage.setItem('categoryList', JSON.stringify(categoryList));
    },
    get() {
        return JSON.parse(localStorage.getItem('categoryList'));
    }
}

const categoryProduct = {
    category: {
        index: -1,
        categoryName: null,
    },
    categoryList: [],
    inputCategory: function (form) {
        this.category.index = form.index.value;
        this.category.categoryName = form.categoryName.value;

        if(!this.category.categoryName) {
            alert('Nama kategori tidak boleh kosong!');
            return false;
        }

        if(this.category.index == -1) {
            this.categoryList = this.categoryList || [];
            this.categoryList.push(copy(this.category));
        } else {
            this.categoryList[this.category.index] = copy(this.category)
        }

        databaseCategoryList.save(this.categoryList);
        this.resetFormCategory(form);
    },
    
    resetFormCategory: function (form) {
        this.category.index = -1;
        this.category.categoryName = null;

        form.index.value = this.category.index;
        form.categoryName.value = this.category.categoryName;

        document.getElementById('btn-save-category').innerHTML = 'Simpan';
    },
    displaySaleHistory: function () {
        this.categoryList = databaseCategoryList.get();
        const componentcategoryList = document.getElementById('category-list');
        componentcategoryList.innerHTML = '';
        if (this.categoryList === null) {
            this.categoryList = [];
        } else {
            this.categoryList.forEach((category, index) => {
                componentcategoryList.innerHTML += 
                    `${category.categoryName} 
                    <button onclick="categoryProduct.editCategory(${index})" class="btn btn-primary btn-xs">Edit</button> 
                    <button onclick="categoryProduct.deleteCategory(${index})" class="btn btn-error btn-xs">Hapus</button> <br>`;
            });
        }
    },
    deleteCategory: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus kategori produk ini?')) {
            this.categoryList.splice(index, 1);
            databaseCategoryList.save(this.categoryList);
            this.displaySaleHistory();
        }
    },
    editCategory: function(index) {
        const category= this.categoryList[index];
        const form = document.getElementById('form-category');
        form.index.value = index;
        form.categoryName.value = category.categoryName;

        document.getElementById('btn-save-category').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

categoryProduct.displaySaleHistory();