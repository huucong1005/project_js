// get list item
function getListItem() {
    $(".product").empty();

    var cate =JSON.parse(localStorage.getItem('listCate'))
    
    $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/product', function (listItemProduct, status) {
        for (let i = 0; i < listItemProduct.length; i++) {
            var item = listItemProduct[i];
            var getNameCate = cate.find(a => a.id === item.category)

            $(".product").append(`<tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td><img class="image-content" src="${item.image}"/></td>
          <td>${item.price}</td>
          <td>${item.qty}</td>
          <td>${item.manufacturer}</td> 
          <td>${getNameCate ? getNameCate.name : 'undefined' }</td> 

          <td>
            <button onclick="openEditModal(${item.id})" type="button" class="btn btn-info open-modal">Edit</button>
            <button onclick="removeItem(${item.id})" type="button" class="btn btn-info open-modal">Remove</button>
          </td>
        </tr>`);
        }
    });
};

//get list category
function AddgetListCate() {
    $(".add-cate").empty();
    $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/category', function (listItemCategory, status) {
        
    localStorage.setItem('listCate', JSON.stringify(listItemCategory));
    var print =""
    print+="<td>Category</td><td><select class=\"form-select add-cate-option\" aria-label=\"Default select example\"><option selected>Open this select menu</option>"
    for (let i = 0; i < listItemCategory.length; i++) {
        var itemCate = listItemCategory[i]

        print+="<option value=\""+itemCate.id+"\">"+itemCate.name+"</option>"
    }
    print+="</select></td>"
    $(".add-cate").append(print);
        
    });
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

        var cate_edit =JSON.parse(localStorage.getItem('listCate'))
        
        $(".edit-cate").empty();
        var print =""
        print+="<td>Category</td><td><select class=\"form-select update-cate-option\" aria-label=\"Default select example\">"

        for (let i = 0; i < cate_edit.length; i++) {
            let itemCate = cate_edit[i]
            if(itemChoice.category === itemCate.id) {
                print+="<option selected value=\""+itemCate.id+"\">"+itemCate.name+"</option>"
            }else {
                print+="<option value=\""+itemCate.id+"\">"+itemCate.name+"</option>"
            }
        }
        print+="</select></td>"
        $(".edit-cate").append(print);
        
        localStorage.setItem('idEditing', id);

        $('.modal-edit').show();
    });
};
function sum(){
    a = [1,2,3,4]
    sum=0;
    for(i=0; i<a.length; i++){
        sum+= a[i]
    }
    console.log(sum)
}


// ===============================================================================================================
$(document).ready(function(){
    sum()

    AddgetListCate()
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
    var category     =$('.add-cate-option').val();
    
    var itemData = {
        name,
        price,
        qty,
        manufacturer,
        category
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
    var category   =$('.update-cate-option').val();

            var itemData = {
            name,
            price,
            qty,
            manufacturer,
            category 
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
        var cate =JSON.parse(localStorage.getItem('listCate'))

        $.get('https://641c59c91a68dc9e46074003.mockapi.io/v1/product', function (listItemSearch, status) {
            $(".product").empty();
            for (let i = 0; i < listItemSearch.length; i++) {
                var item = listItemSearch[i];
                var getNameCate = cate.find(a => a.id === item.category)
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
                        <td>${getNameCate ? getNameCate.name : 'undefined' }</td> 
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
