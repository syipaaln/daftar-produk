function tambahProduk(form) {
    console.log(form);
    aplikasiDaftarProduk.inputProduk(form);
    aplikasiDaftarProduk.menampilkanDaftarProduk();
}

const databaseDaftarProduk = {
    save(daftarProduk) {
        localStorage.setItem('daftarProduk', JSON.stringify(daftarProduk));
    },

    get() {
        return JSON.parse(localStorage.getItem('daftarProduk'));
    }
}

const databaseDaftarKategori = {
    save(daftarKategori) {
        localStorage.setItem('daftarKategori', JSON.stringify(daftarKategori));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarKategori'));
    }
}

const produkKategori = {
    kategori: {
        kategori: null
    },
    daftarKategori: [],
    inputKategori: function (form) {
        this.kategori.kategori = form.kategori.value;

        if(!this.kategori.kategori) {
            alert('Daftar kategori tidak boleh kosong!');
            return false;
        }
        this.resetFormKategori(form);
    },
    resetFormKategori: function (form) {
        this.kategori.kategori = null;

        form.kategori.value = this.kategori.kategori;
    },
    menampilkanDaftarkategori: function () {
        this.daftarKategori = databaseDaftarKategori.get();
        const listOption = document.getElementById('kategori');
        this.daftarKategori.forEach((item) => {
            listOption.innerHTML += `<option>${item.namaKategori}</option>`
        })
    }
}

const aplikasiDaftarProduk = {
    produk: {
        index: -1,
        kategori: null,
        nama: null,
        harga: null,
        stok: null,
        gambar: null
    },
    daftarProduk: [],
    inputProduk: function (form) {
        this.produk.index = form.index.value;
        this.produk.kategori = form.kategori.value;
        this.produk.nama = form.nama.value;
        this.produk.harga = form.harga.value;
        this.produk.stok = form.stok.value;
        this.produk.gambar = form.gambar.value;

        if(!this.produk.kategori) {
            alert('Daftar kategori tidak boleh kosong!');
            return false;
        }

        if(!this.produk.nama) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(!this.produk.harga) {
            alert('Harga tidak boleh kosong!');
            return false;
        }

        if(!this.produk.stok) {
            alert('Stok tidak boleh kosong!');
            return false;
        }

        if(!this.produk.gambar) {
            alert('Gambar tidak boleh kosong!');
            return false;
        }

        if(this.produk.index == -1) {
            this.daftarProduk = this.daftarProduk || [];
            this.daftarProduk.push(copy(this.produk));
        } else {
            this.daftarProduk[this.produk.index] = copy(this.produk)
        }
        databaseDaftarProduk.save(this.daftarProduk);
        this.resetFormProduk(form);
    },
    resetFormProduk: function (form) {
        this.produk.kategori = null;
        this.produk.nama = null;
        this.produk.harga = null;
        this.produk.stok = null;
        this.produk.gambar = null;
        this.produk.index = -1;

        form.kategori.value = this.produk.kategori;
        form.nama.value = this.produk.nama;
        form.harga.value = this.produk.harga;
        form.stok.value = this.produk.stok;
        form.gambar.value = this.produk.gambar;
        form.index.value = this.produk.index;

        document.getElementById('btn-save-produk').innerHTML = 'Tambah';
    },
    menampilkanDaftarProduk: function () {
        this.daftarProduk = databaseDaftarProduk.get();
        const componentDaftarProduk = document.getElementById('daftar-produk');
        componentDaftarProduk.innerHTML = '';
        if (this.daftarProduk === null) {
            this.daftarProduk = [];
        } else {
            this.daftarProduk.forEach((produk, index) => {
                componentDaftarProduk.innerHTML += `
                <div class="flex justify-between">
                    <div>
                        Kategori Produk: ${produk.kategori} <br>
                        ${produk.nama} <br> 
                        Rp.  ${produk.harga} <br> 
                        Stok: ${produk.stok} <br>
                        <button onclick="aplikasiDaftarProduk.editProduk(${index})" class="btn btn-primary btn-xs">Edit</button> 
                        <button onclick="aplikasiDaftarProduk.hapusProduk(${index})" class="btn btn-error btn-xs">Hapus</button> <br>
                    </div>
                    <div>
                        <img src="${produk.gambar}" width="80px" height="80px"> <br> 
                    </div>   
                </div>`;
            });
        }
    },
    hapusProduk: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.daftarProduk.splice(index, 1);
            databaseDaftarProduk.save(this.daftarProduk);
            this.menampilkanDaftarProduk();
        }
    },
    editProduk: function (index) {
        const produk = this.daftarProduk[index];
        const form = document.getElementById('form-produk');
        form.kategori.value = produk.kategori;
        form.nama.value = produk.nama;
        form.harga.value = produk.harga;
        form.stok.value = produk.stok;
        form.gambar.value = produk.gambar;
        form.index.value = index;

        document.getElementById('btn-save-produk').innerHTML = 'Edit';
    }
}
 
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

aplikasiDaftarProduk.menampilkanDaftarProduk();
produkKategori.menampilkanDaftarkategori();