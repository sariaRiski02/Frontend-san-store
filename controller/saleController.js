import * as Sales from '../model/sale.mjs';


const buttonScan = document.querySelector('#button-scan');

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





document.addEventListener('DOMContentLoaded', function(){
    const items = {
        "status": true,
        "message": "Get all product is successfully",
        "data": [
          {
            "id": 3,
            "name": "ab",
            "code_item": "873278",
            "description": "Sint sed asperiores rem saepe corporis.",
            "category": {
              "id": 1,
              "name": "sed",
              "deleted_at": null,
              "created_at": "2024-12-30T07:02:17.000000Z",
              "updated_at": "2024-12-30T07:02:17.000000Z"
            },
            "detail_product": {
              "id": 1,
              "product_id": 3,
              "base_unit": "kg",
              "factor_base_unit": 137,
              "unit_price": "746.21",
              "base_price": "163.04",
              "discount": "84.04",
              "deleted_at": null,
              "created_at": "2024-12-30T07:02:19.000000Z",
              "updated_at": "2024-12-30T07:02:19.000000Z"
            },
            "stock": {
              "id": 43,
              "product_id": 3,
              "quantity_base_unit": 745,
              "quantity": 22,
              "created_at": "2024-12-30T07:02:20.000000Z",
              "updated_at": "2024-12-30T07:02:20.000000Z"
            },
            "crated_at": "2024-12-30T07:02:18.000000Z",
            "updated_at": "2024-12-30T07:02:18.000000Z"
          },
          {
            "id": 4,
            "name": "delectus",
            "code_item": "192",
            "description": "Praesentium eaque ut unde provident.",
            "category": {
              "id": 2,
              "name": "sint",
              "deleted_at": null,
              "created_at": "2024-12-30T07:02:17.000000Z",
              "updated_at": "2024-12-30T07:02:17.000000Z"
            },
            "detail_product": {
              "id": 36,
              "product_id": 4,
              "base_unit": "liter",
              "factor_base_unit": 642,
              "unit_price": "84.71",
              "base_price": "456.11",
              "discount": "54.26",
              "deleted_at": null,
              "created_at": "2024-12-30T07:02:19.000000Z",
              "updated_at": "2024-12-30T07:02:19.000000Z"
            },
            "stock": {
              "id": 5,
              "product_id": 4,
              "quantity_base_unit": 16,
              "quantity": 56,
              "created_at": "2024-12-30T07:02:19.000000Z",
              "updated_at": "2024-12-30T07:02:19.000000Z"
            },
            "crated_at": "2024-12-30T07:02:18.000000Z",
            "updated_at": "2024-12-30T07:02:18.000000Z"
          },
          {
            "id": 5,
            "name": "non",
            "code_item": "66",
            "description": "Molestiae animi doloremque sed deleniti est et officiis harum.",
            "category": {
              "id": 9,
              "name": "vero",
              "deleted_at": null,
              "created_at": "2024-12-30T07:02:17.000000Z",
              "updated_at": "2024-12-30T07:02:17.000000Z"
            },
            "detail_product": {
                "id": 36,
                "product_id": 4,
                "base_unit": "liter",
                "factor_base_unit": 642,
                "unit_price": "84.71",
                "base_price": "456.11",
                "discount": "54.26",
                "deleted_at": null,
                "created_at": "2024-12-30T07:02:19.000000Z",
                "updated_at": "2024-12-30T07:02:19.000000Z"
              },
            "stock": {
              "id": 96,
              "product_id": 5,
              "quantity_base_unit": 399,
              "quantity": 91,
              "created_at": "2024-12-30T07:02:20.000000Z",
              "updated_at": "2024-12-30T07:02:20.000000Z"
            },
            "crated_at": "2024-12-30T07:02:18.000000Z",
            "updated_at": "2024-12-30T07:02:18.000000Z"
          },
        ]
    }

    localStorage.setItem('item', JSON.stringify(items));

    const localStorageItem = JSON.parse(localStorage.getItem('item'));

    localStorageItem.data.forEach(item => {
        // cart
        const cart = document.querySelector('#cart');
        
        // cart-container
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart', 'bg-white', 'rounded-2xl', 'shadow-md', 'p-4', 'flex', 'flex-col', 'gap-3');
        cartContainer.id = 'cart-container-'+item.id;

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
        
        const count = document.createElement('input');
        count.type = 'input';
        count.min = 1;
        count.value = 1;
        count.classList.add('w-12', 'text-center', 'bg-white', 'text-black' ,'pl-4');
        count.id = 'count-'+ item.id;

        // button add
        const buttonAdd = document.createElement('button');
        buttonAdd.id = 'button-add';
        buttonAdd.textContent = '+';
        buttonAdd.classList.add('btn', 'btn-ghost', 'btn-sm');
        
        // button delete
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn', 'btn-error', 'btn-sm')
        buttonDelete.id = 'button-delete-' + item.id;
        
        // icon trash
        const trash = document.createElement('i');
        trash.id = 'trash-'+item.id;
        trash.classList.add('fas','fa-trash-alt', 'mr-2');

        
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
        actionProduct.appendChild(buttonDelete);




    })


    
});