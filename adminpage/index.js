// get list item
function getListItem() {
    $(".product").empty();
    $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/product', function (listItemStorage, status) {
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            $(".product").append(`<tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td><img class="image-content" src="${item.image}"/></td>
          <td>${item.price}</td>
          <td>${item.qty}</td>
          <td>${item.manufacturer}</td>
          <td>
            <button onclick="openEditModal(${item.id})" type="button" class="btn btn-info open-modal">Edit</button>
            <button onclick="removeItem(${item.id})" type="button" class="btn btn-info open-modal">Remove</button>
          </td>
        </tr>`);
        }
    })
};

//remove item
function removeItem(id) {
    $.ajax({
        url: `https://641c59c91a68dc9e46074003.mockapi.io/v1/product/${id}`, 
        method: 'DELETE', 
        success: function (res) {
            getListItem();
        }
    });
}


//get item edit
function openEditModal(id) {
    $.get(`https://641c59c91a68dc9e46074003.mockapi.io/v1/product/${id}`, function (itemChoice, status) {
        $('#updatename').val(itemChoice.name);
        $('#updateprice').val(itemChoice.price);
        $('#updateqty').val(itemChoice.qty);
        $('#updatensx').val(itemChoice.manufacturer);

        localStorage.setItem('idEditing', id);
        $('.modal-edit').show();
    });
}


// ===============================================================================================================
$(document).ready(function(){
//load js HTMLcomponent
    $(".header").load("/project/adminpage/header.html");
    $(".footer").load("/project/adminpage/footer.html");
    $(".left-content").load("/project/adminpage/left-content.html");

// reset form
    function resetForm() {
        $('#addname').val('');
        $('#addprice').val('');
        $('#addqty').val('');
    }

//show - hide modal add
    $('.addNew').click(function () {
        $('.modal-add').show();
    });
    $('.closeadd').click(function () {
        $('.modal-add').hide();
    });
    $('.canceladd').click(function () {
        $('.modal-add').hide();
    });
    $(window).on('click', function (e) {
    if ($(e.target).is('.modal-add')) {
        $('.modal-add').hide();
    }
    
//show - hide modal edit
    });
    $('.closeedit').click(function () {
        $('.modal-edit').hide();
    });
    $('.canceledit').click(function () {
        $('.modal-edit').hide();
    });
    $(window).on('click', function (e) {
    if ($(e.target).is('.modal-edit')) {
        $('.modal-edit').hide();
    }
    });

// get list item
    getListItem();

//add new item
$('.store').click(function () {
    var name    =$('#addname').val();
    var price   =$('#addprice').val();
    var qty     =$('#addqty').val();
    var manufacturer     =$('#addnsx').val();
    
    var itemData = {
        name,
        price,
        qty,
        manufacturer
    }

    $.ajax({
        url: `https://641c59c91a68dc9e46074003.mockapi.io/v1/product`, 
        method: 'POST', 
        data: itemData,
        success: function (res) {
            $('.modal-add').hide();
            getListItem();
            resetForm(); 
        }
    });
});

//update item
$('.update').click(function () {
    var idEditing = localStorage.getItem('idEditing');

    var name = $('#updatename').val();
    var price = $('#updateprice').val();
    var qty = $('#updateqty').val();
    var manufacturer = $('#updatensx').val();

            var itemData = {
            name,
            price,
            qty,
            manufacturer
        }

    if (idEditing) {
        // logic update
        $.ajax({
            url: `https://641c59c91a68dc9e46074003.mockapi.io/v1/product/${idEditing}`,
            method: 'PUT',
            data: itemData,
            success: function (res) {
                getListItem();
                localStorage.removeItem('idEditing');
                console.log(res)
            }
        })
    } else {
        $.ajax({
            url : `https://641c59c91a68dc9e46074003.mockapi.io/v1/product`,
            method: 'POST',
            data: itemData,
            success: function (res) {
                getListItem();
                console.log(res)
            }
        })
    }
    $('.modal-edit').hide();
    getListItem();
})


    
//search
    $(".search-button").click(function() {
        var value_search = $(".search-input").val().trim().toLowerCase();
        var count =0

        $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/product', function (listItem, status) {
            $(".product").empty();
            for (let i = 0; i < listItem.length; i++) {
                var item = listItem[i]
                var search = item.name.toLowerCase().search(value_search)
                if (search !== -1) {
                    count+=1;
                    $(".product").append(`<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td><img class="image-content" src="${item.image}"/></td>
                        <td>${item.price}</td>
                        <td>${item.qty}</td>
                        <td>${item.manufacturer}</td>
                        <td>
                            <button onclick="openEditModal(${item.id})" type="button" class="btn btn-info open-modal">Edit</button>
                            <button onclick="removeItem(${item.id})" type="button" class="btn btn-info open-modal">Remove</button>
                        </td>
                    </tr>`);
                }
            }
            if (count === 0 || value_search =="") {
                alert("no result");
                getListItem();
            }
        });
    });

});



// paginate
// $(document).ready (function () {  
//     $('#data').after ('<div id="nav"></div>');  
//     var rowsShown = 3;  
//     var rowsTotal = $('#data tbody tr').length;  
//     var numPages = rowsTotal/rowsShown;  
//     for (i = 0;i < numPages;i++) {  
//         var pageNum = i + 1;  
//         $('#nav').append ('<a href="#" rel="'+i+'">'+pageNum+'</a> ');  
//     }  
//     $('#data tbody tr').hide();  
//     $('#data tbody tr').slice (0, rowsShown).show();  
//     $('#nav a:first').addClass('active');  
//     $('#nav a').bind('click', function() {  
//     $('#nav a').removeClass('active');  
//    $(this).addClass('active');  
//         var currPage = $(this).attr('rel');  
//         var startItem = currPage * rowsShown;  
//         var endItem = startItem + rowsShown;  
//         $('#data tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).  
//         css('display','table-row').animate({opacity:1}, 300);  
//     });  
// });   
