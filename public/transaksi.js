function tambahTransaksi(form) {
    console.log(form);
    transaksiPenjualan.inputTransaksi(form);
    transaksiPenjualan.menampilkanHistoryPenjualan();
}

function hargaTotal() {
    var hargaValue = document.getElementById('harga').value;
    var jumlahValue = document.getElementById('jumlah').value;
    var result = parseInt(hargaValue) * parseInt(jumlahValue);
    if (!isNaN(result)) {
       document.getElementById('total').value = result;
    }
}

function jumlahKembalian() {
    var tunaiValue = document.getElementById('tunai').value;
    var totalvalue = document.getElementById('total').value;
    var result = parseInt(tunaiValue) - parseInt(totalvalue);
    if (!isNaN(result)) {
       document.getElementById('kembalian').value = result;
    }
}

const databaseDaftarTransaksi = {
    save(daftarTransaksi) {
        localStorage.setItem('daftarTransaksi', JSON.stringify(daftarTransaksi));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarTransaksi'));
    }
}

const databaseDaftarKonsumen = {
    save(daftarKonsumen) {
        localStorage.setItem('daftarKonsumen', JSON.stringify(daftarKonsumen));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarKonsumen'));
    }
}

const databaseDaftarProduk = {
    save(daftarProduk) {
        localStorage.setItem('daftarProduk', JSON.stringify(daftarProduk));
    },

    get() {
        return JSON.parse(localStorage.getItem('daftarProduk'));
    }
}

$('#produk').on('change', function(){
    const nama = $('#produk option:selected').data('nama');
    const harga = $('#produk option:selected').data('harga');
    const stok = $('#produk option:selected').data('stok');
    const gambar = $('#produk option:selected').data('gambar');
    
    $('[name=nama]').val(nama);
    $('[name=harga]').val(harga);
    $('[name=stok]').val(stok);
    $('[name=gambar]').val(gambar);
  });


const pilihProduk = {
    produk: {
        produk: null,
    },
    daftarProduk: [],
    inputProduk: function (form) {
        this.produk.produk = form.produk.value;

        if(!this.produk.produk) {
            alert('Produk tidak boleh kosong!');
            return false;
        }
        this.resetFormProduk(form);
    },
    resetFormProduk: function (form) {
        this.produk.produk = null;

        form.produk.value = this.produk.produk;
    },
    menampilkanDaftarProduk: function () {
        this.daftarProduk = databaseDaftarProduk.get();
        const listOption = document.getElementById('produk');
        this.daftarProduk.forEach((item) => {
            listOption.innerHTML += `<option data-nama="${item.nama}" data-harga="${item.harga}" data-stok="${item.stok}" data-gambar="${item.gambar}">${item.nama}</option>`
        })
    },
}

const pilihKonsumen = {
    konsumen: {
        konsumen: null
    },
    daftarKonsumen: [],
    inputKonsumen: function (form) {
        this.konsumen.konsumen = form.konsumen.value;

        if(!this.konsumen.konsumen) {
            alert('Konsumen tidak boleh kosong!');
            return false;
        }
        this.resetFormKonsumen(form);
    },
    resetFormKonsumen: function (form) {
        this.konsumen.konsumen = null;

        form.konsumen.value = this.konsumen.konsumen;
    },
    menampilkanDaftarKonsumen: function () {
        this.daftarKonsumen = databaseDaftarKonsumen.get();
        const listOption = document.getElementById('konsumen');
        this.daftarKonsumen.forEach((item) => {
            listOption.innerHTML += `<option>${item.namaKonsumen}</option>`
        })
    }
}


const transaksiPenjualan = {
    transaksi: {
        index: -1,
        konsumen: null,
        produk: null,
        nama: null,
        harga: null,
        stok: null,
        gambar: null,
        jumlah: null,
        total: null,
        tunai: null,
        kembalian: null
    },
    daftarTransaksi: [],
    inputTransaksi: function (form) {
        this.transaksi.index = form.index.value;
        this.transaksi.konsumen = form.konsumen.value;
        this.transaksi.produk = form.produk.value;
        this.transaksi.nama = form.nama.value;
        this.transaksi.harga = form.harga.value;
        this.transaksi.stok = form.stok.value;
        this.transaksi.gambar = form.gambar.value;
        this.transaksi.jumlah = form.jumlah.value;
        this.transaksi.total = form.total.value;
        this.transaksi.tunai = form.tunai.value;
        this.transaksi.kembalian = form.kembalian.value;


        if(!this.transaksi.konsumen) {
            alert('Konsumen tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.produk) {
            alert('Produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.nama) {
            alert('Nama produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.harga) {
            alert('harga produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.stok) {
            alert('Stok produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.gambar) {
            alert('Link gambar produk tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.jumlah) {
            alert('Jumlah tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.total) {
            alert('Total harga tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.tunai) {
            alert('Tunai tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.kembalian) {
            alert('Kembalian tidak boleh kosong!');
            return false;
        }
        if(this.transaksi.index == -1) {
            this.daftarTransaksi = this.daftarTransaksi || [];
            this.daftarTransaksi.push(copy(this.transaksi));
        } else {
            this.daftarTransaksi[this.transaksi.index] = copy(this.transaksi)
        }

        databaseDaftarTransaksi.save(this.daftarTransaksi);
        this.resetFormTransaksi(form);
    },
    resetFormTransaksi (form) {
        this.transaksi.index = -1;
        this.transaksi.konsumen = null;
        this.transaksi.produk = null;
        this.transaksi.nama = null;
        this.transaksi.harga = null;
        this.transaksi.stok = null;
        this.transaksi.gambar = null;
        this.transaksi.jumlah = null;
        this.transaksi.total = null;
        this.transaksi.tunai = null;
        this.transaksi.kembalian = null;

        form.index.value = this.transaksi.index;
        form.konsumen.value = this.transaksi.konsumen;
        form.produk.value = this.transaksi.produk;
        form.nama.value = this.transaksi.nama;
        form.harga.value = this.transaksi.harga
        form.stok.value = this.transaksi.stok;
        form.gambar.value = this.transaksi.gambar;
        form.jumlah.value = this.transaksi.jumlah;
        form.total.value = this.transaksi.total;
        form.tunai.value = this.transaksi.tunai;
        form.kembalian.value = this.transaksi.kembalian;
    },
    menampilkanHistoryPenjualan: function () {
        this.daftarTransaksi = databaseDaftarTransaksi.get();
        const componentDaftarTransaksi = document.getElementById('daftar-transaksi');
        componentDaftarTransaksi.innerHTML = '';
        if (this.daftarTransaksi === null) {
            this.daftarTransaksi = [];
        } else {
            this.daftarTransaksi.forEach((transaksi, index) => {
                componentDaftarTransaksi.innerHTML += 
                    `<div class="flex justify-between">
                        <div>
                            ${transaksi.konsumen} <br>
                            ${transaksi.nama} <br> 
                            ${transaksi.harga} <br> 
                            Stok: ${transaksi.stok} <br> 
                            Jumlah: ${transaksi.jumlah} <br> 
                            Total Harga: ${transaksi.total} <br> 
                            Tunai: ${transaksi.tunai} <br> 
                            Kembalian: ${transaksi.kembalian} <br> 
                            ------------------ <br>
                        </div>
                        <div>
                            <img src="${transaksi.gambar}" width="110px" height="110px"> <br>
                        </div>
                    </div>`;
            });
        }
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

transaksiPenjualan.menampilkanHistoryPenjualan();
pilihKonsumen.menampilkanDaftarKonsumen();
pilihProduk.menampilkanDaftarProduk();