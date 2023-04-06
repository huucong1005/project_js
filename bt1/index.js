$(document).ready(function(){
    $(".header").load("/b6_ajax/bt1/header.html");
    $(".banner").load("/b6_ajax/bt1/banner.html");
    $(".footer").load("/b6_ajax/bt1/footer.html");
});

function getListItem() {
    $(".product").empty();
    $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/product', function (listItemStorage, status) {
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            $(".product").append(`
            <div class="product-item">
                <img class="image-content" src="${item.image}"/>
                <p>Product id: ${item.id} </p>
                <p>name: ${item.name} </p>
                <p>gia: ${item.price} VND </p>
                <p>nsx: ${item.manufacturer}</p>
                <p>so luong: ${item.qty} VND </p>
                
            `);
        }
    })
};



$(document).ready(function () {
//grt list item
    getListItem();
});