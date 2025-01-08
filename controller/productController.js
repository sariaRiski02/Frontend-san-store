import * as Product from '../model/product.mjs';

const buttonScan = document.querySelector('#button-scan');
const nameProduct = document.querySelector('#name');
const codeItem = document.querySelector('#code_item');
const category = document.querySelector('#category_id');
const unitPrice = document.querySelector('#unit_price');
const quantity = document.querySelector('#quantity');
const submit = document.querySelector('#submit');
const video = document.querySelector('#video');

const selectComponent = document.querySelector('#category_id');


// component error
const nameEr = document.querySelector('#name-error');
const codeEr = document.querySelector('#code-error');
const categoryEr = document.querySelector('#category-error');
const unitPriceEr = document.querySelector('#price-error');
const quantityEr = document.querySelector('#quantity-error');

// load category 
document.addEventListener('DOMContentLoaded', function() {
    Product.listCategory()
        .then(data => {
            const response = JSON.parse(data);
            if(!response.status){
                console.log(response);
            }
            
            response.data.forEach(item => {
                const newOption = document.createElement('option');
                newOption.value = item.id;
                newOption.textContent = item.name;
                selectComponent.appendChild(newOption);
            });
            
        }).catch(error => {
            console.log(error);
        });
});

// scan code 
buttonScan.addEventListener('click', function () {
    if (!('BarcodeDetector' in window)) {
        alert('Deteksi barcode tidak tersedia di browser ini.');
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

    // Deteksi barcode
    video.addEventListener('play', async () => {
        const detectedCodes = new Set(); // Untuk menyimpan hasil deteksi unik
        async function detectBarcode() {
            try {
                const barcodes = await barcodeDetector.detect(video);
                if (barcodes.length > 0) {
                    barcodes.forEach(barcode => {
                        if (!detectedCodes.has(barcode.rawValue)) {
                            detectedCodes.add(barcode.rawValue);
                            codeItem.value = barcode.rawValue; // Tampilkan hasil di input

                            // Matikan kamera
                            const stream = video.srcObject;
                            const tracks = stream.getTracks();
                            tracks.forEach(track => track.stop());
                            video.srcObject = null;

                            // Sembunyikan tag video
                            video.style.display = 'none';
                        }
                    });
                }
            } catch (error) {
                console.error("Barcode detector error: ", error);
            }
            requestAnimationFrame(detectBarcode); // Loop efisien
        }
        detectBarcode();
    });
});

// send data
submit.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the page from reloading
    
    Product.addProduct({
        'name': nameProduct.value,
        'code_item': codeItem.value,
        'category_id': category.value,
        'unit_price': unitPrice.value,
        'quantity': quantity.value,
    }).then(response => {
        console.log(response.status);
        if (!response.status) {
            const error = response.errors;
            nameEr.textContent = error.name ? error.name[0] : '';
            codeEr.textContent = error.code_item ? error.code_item[0] : '';
            categoryEr.textContent = error.category_id ? error.category_id[0] : '';
            unitPriceEr.textContent = error.unit_price ? error.unit_price[0] : '';
            quantityEr.textContent = error.quantity ? error.quantity[0] : '';
        } else {
            // Handle success case, e.g., show a success message or redirect
            alert("Data berhasil ditambahkan");
            location.reload();
            
        }
    }).catch(error => {
        console.log('Product gagal di tambahkan: ', error);
    });
});
