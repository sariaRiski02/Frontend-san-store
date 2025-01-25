import * as Sales from '../model/sale.mjs';
import * as Data from '../app/data.mjs';
import * as Display from '../model/displayComponent.mjs';

const buttonScan = document.querySelector('#button-scan');
const video = document.querySelector('#video'); // Tambahkan ini
buttonScan.addEventListener('click', function () {
    if (!('BarcodeDetector' in window)) {
        alert('Deteksi  barcode tidak tersedia di browser ini.');
        return;
    }

    video.style.display = 'flex';
    // Akses kamera
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
    }).then((stream) => {
        video.srcObject = stream;
        video.play();
    }).catch((error) => {
        console.error('Error accessing camera: ', error);
        alert('Tidak dapat mengakses kamera.');
    });

    const barcodeDetector = new BarcodeDetector({
        formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'qr_code']
    });

    let barcodeProcessed = false;

    // Deteksi barcode
    video.addEventListener('play', async () => {
        async function detectBarcode() { 
            if(barcodeProcessed){
                return;
            }
            try {
                const barcodes = await barcodeDetector.detect(video);
                if (barcodes.length < 0) {
                   alert('Kode tidak terdeteksi');
                }
                // alert(barcodes.length);
                const barcode = barcodes[0];
                if(barcode.rawValue){
                    barcodeProcessed = true;
                    Sales.check(barcode.rawValue)
                        .then(response => {
                            let items = localStorage.getItem('items');
                            if(!items){
                                const product = [];
                                product.push(response.data);
                                const productJson = {
                                    'data' : product
                                }
                                localStorage.setItem('items', JSON.stringify(productJson));
                                loadProduct();
                                result();
                            }else{
                                const productExist = JSON.parse(items);
                                const isProductExist = productExist.data.some(item => item.code_item === response.data.code_item);
                                if (!isProductExist) {
                                    barcodeProcessed = true;
                                    productExist.data.push(response.data);
                                    localStorage.setItem('items', JSON.stringify(productExist));
                                    loadProduct();
                                } else {
                                    alert('Produk sudah ada di keranjang.');
                                }
                            }
                        })
                        .catch(error => {
                            alert(error);
                        }).finally(()=>{
                            const stream = video.srcObject;
                            const tracks = stream.getTracks();
                            tracks.forEach(track => track.stop());
                            video.srcObject = null;
                            // Sembunyikan tag video
                            video.style.display = 'none';
                        });

                    
                }
               
            } catch (error) {
                console.error("Barcode detector error: ", error);
            } 
            if (!barcodeProcessed) { 
                requestAnimationFrame(detectBarcode); // Loop efisien
            }
            
        }
        detectBarcode();
    });
});




function loadProduct(){
    const localStorageItem = JSON.parse(localStorage.getItem('items'));
    const cart = document.querySelector('#cart');
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    } 
    
        localStorageItem.data.reverse().forEach((item, index) => {
            // cart
            
            // cart-container
            const cartContainer = document.createElement('div');
            cartContainer.classList.add('cart', 'bg-white', 'rounded-2xl', 'shadow-md', 'p-4', 'flex', 'flex-col', 'gap-3');
            cartContainer.id = 'cart-container-'+ item.id ;
    
            // cart-item
            const cartItem = document.createElement('div');
            cartItem.id = 'cart-item-' + item.id;
            cartItem.classList.add('flex','justify-between', 'items-center');
    
            // cart-box detail
            const cartBox = document.createElement('div');
            cartBox.classList.add('flex','items-center','space-x-4');
            cartBox.id = 'cart-box-'+ item.id;
    
            // cart-icon
            const cartIcon = document.createElement('div');
            cartIcon.classList.add('w-12','h-12', 'bg-blue-100', 'rounded-lg', 'flex', 'items-center', 'justify-center');
            cartIcon.id = 'cart-icon-' + item.id;
    
            // cart-logo
            const cartLogo = document.createElement('i');
            cartLogo.classList.add('fas', 'fa-box', 'text-blue-600', 'text-xl');
            cartLogo.id = 'cart-logo-' + item.id;
    
    
            // cartDetail
            const cartDetail = document.createElement('cart-detail');
    
            // cart name
            const cartName = document.createElement('h1');
            cartName.classList.add('text-lg','font-bold','text-gray-800');
            cartName.id = 'cart-name-'+item.id;
            cartName.textContent = item.name;
            
            // cart code
            const cartCode = document.createElement('p');
            cartCode.id = 'cart-code-' + item.id;
            cartCode.classList.add('text-sm', 'text-gray-500');
            cartCode.textContent = item.code_item;
    
    
            // cart price
            const cartPrice = document.createElement('h2');
            cartPrice.classList.add('text-xl', 'font-semibold','text-blue-600');
            cartPrice.textContent = item.detail_product.unit_price;
            cartPrice.id = 'cart-price-' + item.id;
    
    
            // action product
            const actionProduct = document.createElement('div');
            actionProduct.classList.add('flex', 'justify-between', 'items-center');
            actionProduct.id = 'action-product-' + item.id;
            
            // container action
            const containerAction = document.createElement('div');
            containerAction.classList.add('flex', 'items-center', 'border', 'rounded-lg');
            containerAction.id = 'container-action-' + item.id;
    
            // button minus
            const buttonMinus = document.createElement('button');
            buttonMinus.textContent = '-'
            buttonMinus.classList.add('btn' ,'btn-ghost','btn-sm');
            buttonMinus.id = 'button-minus-' + item.id;
    
            buttonMinus.addEventListener('click', () => {
                minus(item.id);
                result();
            });
            
            const count = document.createElement('input');
            count.type = 'number';
            count.min = 1;
            count.value = 1;
            count.classList.add('w-12', 'text-center', 'bg-white', 'text-black');
            count.id = 'count-' + item.id;
    
            // Update total ketika jumlah diubah
            count.addEventListener('input', () => {
                result();
            });
    
    
            // button add
            const buttonAdd = document.createElement('button');
            buttonAdd.id = 'button-add' + item.id;
            buttonAdd.textContent = '+';
            buttonAdd.classList.add('btn', 'btn-ghost', 'btn-sm');
            
            buttonAdd.addEventListener('click', ()=>{
                plus(`${item.id}`);
                result();
            });
    
            // button delete
            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('btn', 'btn-error', 'btn-sm');
            buttonDelete.id = 'button-delete-' + item.id;
    
            // icon trash
            const trash = document.createElement('i');
            trash.id = 'trash-' + item.id;
            trash.classList.add('fas', 'fa-trash-alt', 'mr-2');
    
            // Event listener untuk menghapus item
            buttonDelete.addEventListener('click', () => {
                deleteItem(item.id);
            });
    
        
            // button edit
            const buttonEdit = document.createElement('button');
            buttonEdit.classList.add('btn', 'btn-primary', 'btn-sm', 'ml-2');
            buttonEdit.id = 'button-edit-' + item.id;
    
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit', 'mr-2');
            editIcon.id = 'edit-icon-' + item.id;
    
            const textEdit = document.createElement('span');
            textEdit.textContent = 'Edit';
    
            buttonEdit.appendChild(editIcon);
            buttonEdit.appendChild(textEdit);
    
            buttonEdit.addEventListener('click', () => {
                editItem(item.id);
            });
            
            // merakit cart
           
            cart.appendChild(cartContainer);
            cartContainer.appendChild(cartItem);
            cartItem.appendChild(cartBox);
            cartItem.appendChild(cartPrice);
            cartDetail.appendChild(cartName);
            cartDetail.appendChild(cartCode);
            cartIcon.appendChild(cartLogo);
            cartBox.appendChild(cartIcon);
            cartBox.appendChild(cartDetail);
    
    
            // merakit delete button
            buttonDelete.appendChild(trash);
            const textDelete = document.createElement('p');
            textDelete.textContent = 'Hapus';
            buttonDelete.appendChild(textDelete);
    
    
            // merakit cart action
            cartContainer.appendChild(actionProduct);
            actionProduct.appendChild(containerAction);
            containerAction.appendChild(buttonMinus);
            containerAction.appendChild(count);
            containerAction.appendChild(buttonAdd);
            actionProduct.appendChild(buttonEdit);
            actionProduct.appendChild(buttonDelete);
    
    
    
    
        });
    
}

window.addEventListener('DOMContentLoaded', function(){
    loadProduct();
    result();
})
   


function minus(id){
    const input = document.querySelector('#count-'+id);
    input.value > 1 ? input.value-- : input.value;
}
function plus (id){
    const input = document.querySelector('#count-'+id);
    input.value++;
}

function result() {
    const totalElement = document.querySelector('#result');
    const product = JSON.parse(localStorage.getItem('items'));
    let total = 0;

    product.data.forEach(item => {
        // Ambil jumlah dari input pengguna berdasarkan ID
        const countElement = document.querySelector(`#count-${item.id}`);
        const count = countElement ? parseInt(countElement.value, 10) : 1;

        // Kalikan harga satuan dengan jumlah
        total += count * Number(item.detail_product.unit_price);
    });

    // Tampilkan hasil total
    totalElement.textContent = `Rp. ${total.toLocaleString('id-ID')}`;
}


function deleteItem(id) {
    const items = JSON.parse(localStorage.getItem('items'));

    // Filter data untuk menghapus item dengan id yang diberikan
    const updatedItems = items.data.filter(item => item.id !== id);

    // Simpan kembali data yang telah diperbarui ke localStorage
    localStorage.setItem('items', JSON.stringify({ data: updatedItems }));

    // Perbarui tampilan keranjang
    loadProduct();

    // Perbarui total harga
    result();
}


function editItem(itemId) {
    const localStorageItem = JSON.parse(localStorage.getItem('items'));
    const itemToEdit = localStorageItem.data.find(item => item.id === itemId);
    if (itemToEdit) {
        
        const param = '?id=' + itemToEdit.id;
        window.location.href = Data.routeViewEditProduct + param;
    }
}

Display.displayComponent();

    
