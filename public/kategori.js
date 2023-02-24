function tambahKategori(form) {
    console.log(form);
    kategoriProduk.inputKategori(form);
    kategoriProduk.menampilkanHistoryPenjualan();
}

const databaseDaftarKategori = {
    save(daftarKategori) {
        localStorage.setItem('daftarKategori', JSON.stringify(daftarKategori));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarKategori'));
    }
}

const kategoriProduk = {
    kategori: {
        index: -1,
        namaKategori: null,
    },
    daftarKategori: [],
    inputKategori: function (form) {
        this.kategori.index = form.index.value;
        this.kategori.namaKategori = form.namaKategori.value;

        if(!this.kategori.namaKategori) {
            alert('Nama kategori tidak boleh kosong!');
            return false;
        }

        if(this.kategori.index == -1) {
            this.daftarKategori = this.daftarKategori || [];
            this.daftarKategori.push(copy(this.kategori));
        } else {
            this.daftarKategori[this.kategori.index] = copy(this.kategori)
        }

        databaseDaftarKategori.save(this.daftarKategori);
        this.resetFormKategori(form);
    },
    
    resetFormKategori: function (form) {
        this.kategori.index = -1;
        this.kategori.namaKategori = null;

        form.index.value = this.kategori.index;
        form.namaKategori.value = this.kategori.namaKategori;

        document.getElementById('btn-save-kategori').innerHTML = 'Simpan';
    },
    menampilkanHistoryPenjualan: function () {
        this.daftarKategori = databaseDaftarKategori.get();
        const componentDaftarKategori = document.getElementById('daftar-kategori');
        componentDaftarKategori.innerHTML = '';
        if (this.daftarKategori === null) {
            this.daftarKategori = [];
        } else {
            this.daftarKategori.forEach((kategori, index) => {
                componentDaftarKategori.innerHTML += 
                    `${kategori.namaKategori} 
                    <button onclick="kategoriProduk.editKategori(${index})" class="btn btn-primary btn-xs">Edit</button> 
                    <button onclick="kategoriProduk.hapusKategori(${index})" class="btn btn-error btn-xs">Hapus</button> <br>`;
            });
        }
    },
    hapusKategori: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus kategori produk ini?')) {
            this.daftarKategori.splice(index, 1);
            databaseDaftarKategori.save(this.daftarKategori);
            this.menampilkanHistoryPenjualan();
        }
    },
    editKategori: function(index) {
        const kategori= this.daftarKategori[index];
        const form = document.getElementById('form-kategori');
        form.index.value = index;
        form.namaKategori.value = kategori.namaKategori;

        document.getElementById('btn-save-kategori').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

kategoriProduk.menampilkanHistoryPenjualan();