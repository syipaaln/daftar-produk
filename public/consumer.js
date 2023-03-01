function addConsumer(form) {
    console.log(form);
    consumerPage.inputConsumer(form);
    consumerPage.showConsumerList();
}

const databaseConsumerList = {
    save(consumerList) {
        localStorage.setItem('consumerList', JSON.stringify(consumerList));
    },
    get() {
        return JSON.parse(localStorage.getItem('consumerList'));
    }
}

const consumerPage = {
    consumer: {
        index: -1,
        consumerName: null,
        consumerAddress: null,
        numberHandphone: null,
        email: null
    },
    consumerList: [],
    inputConsumer: function (form) {
        this.consumer.index = form.index.value;
        this.consumer.consumerName = form.consumerName.value;
        this.consumer.consumerAddress = form.consumerAddress.value;
        this.consumer.numberHandphone = form.numberHandphone.value;
        this.consumer.email = form.email.value;

        if(!this.consumer.consumerName) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(!this.consumer.consumerAddress) {
            alert('Alamat tidak boleh kosong!');
            return false;
        }

        if(!this.consumer.numberHandphone) {
            alert('No HP tidak boleh kosong!');
            return false;
        }

        if(!this.consumer.email) {
            alert('Email produk tidak boleh kosong!');
            return false;
        }

        if(this.consumer.index == -1) {
            this.consumerList = this.consumerList || [];
            this.consumerList.push(copy(this.consumer));
        } else {
            this.consumerList[this.consumer.index] = copy(this.consumer)
        }

        databaseConsumerList.save(this.consumerList);
        this.resetFormConsumer(form);
    },
    
    resetFormConsumer: function (form) {
        this.consumer.index = -1;
        this.consumer.consumerName = null;
        this.consumer.consumerAddress = null;
        this.consumer.numberHandphone = null;
        this.consumer.email = null;

        form.index.value = this.consumer.index;
        form.consumerName.value = this.consumer.consumerName;
        form.consumerAddress.value = this.consumer.consumerAddress;
        form.numberHandphone.value = this.consumer.numberHandphone;
        form.email.value = this.consumer.email;

        document.getElementById('btn-save-consumer').innerHTML = 'Simpan';
    },
    showConsumerList: function () {
        this.consumerList = databaseConsumerList.get();
        const componentconsumerList = document.getElementById('consumer-list');
        componentconsumerList.innerHTML = '';
        if (this.consumerList === null) {
            this.consumerList = [];
        } else {
            this.consumerList.forEach((consumer, index) => {
                componentconsumerList.innerHTML += 
                `Nama: ${consumer.consumerName} <br> 
                Alamat: ${consumer.consumerAddress} <br> 
                No HP: ${consumer.numberHandphone} <br> 
                Email: ${consumer.email} <br> 
                <button onclick="consumerPage.editConsumer(${index})" class="btn btn-primary btn-xs">Edit</button> 
                <button onclick="consumerPage.deleteConsumer(${index})" class="btn btn-error btn-xs">Hapus</button> <br>`;
            });
        }
    },
    deleteConsumer: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus ini?')) {
            this.consumerList.splice(index, 1);
            databaseConsumerList.save(this.consumerList);
            this.showConsumerList();
        }
    },
    editConsumer: function(index) {
        const consumer = this.consumerList[index];
        const form = document.getElementById('form-consumer');
        form.index.value = index;
        form.consumerName.value = consumer.consumerName;
        form.consumerAddress.value = consumer.consumerAddress;
        form.numberHandphone.value = consumer.numberHandphone;
        form.email.value = consumer.email;

        document.getElementById('btn-save-consumer').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

consumerPage.showConsumerList();