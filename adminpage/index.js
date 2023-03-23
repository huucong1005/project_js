// get list item
function getListItem() {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    $(".product").empty();
    for (let i = 0; i < listItemStorage.length; i++) {
        var item = listItemStorage[i];
        $(".product").append(`<tr>
          <td>${item.proid}</td>
          <td>${item.proname}</td>
          <td><img class="image-content" src="/project/img/${item.proimage}"/></td>
          <td>${item.proprice}</td>
          <td>${item.proqty}</td>
          <td>
            <button onclick="openEdit(${item.proid})" type="button" class="btn btn-info open-modal ">Edit</button>
            <button onclick="removeItem(${item.proid})" type="button" class="btn btn-info">Remove</button>
          </td>
        </tr>`);
    }
};

//get item edit
function openEdit(id) {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    var itemChoice = listItemStorage.find(item => item.proid == id);
    $('#updatename').val(itemChoice.proname);
    $('#updateprice').val(itemChoice.proprice);
    $('#updateqty').val(itemChoice.proqty);
    $('.modal-edit').show();
    localStorage.setItem('idEditing', id);
}

//remove item
function removeItem(id) {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    var itemChoiceIndex = listItemStorage.findIndex(item => item.proid === id);
    listItemStorage.splice(itemChoiceIndex, 1);
    localStorage.setItem('listItem', JSON.stringify(listItemStorage));
    getListItem();
}

$(document).ready(function(){

//load js HTMLcomponent
    $(".header").load("/project/adminpage/header.html");
    $(".footer").load("/project/adminpage/footer.html");
    $(".left-content").load("/project/adminpage/left-content.html");

// reset form
    function resetForm() {
        $('#inputname').val('');
        $('#inputprice').val('');
        $('#inputqty').val('');
        $('#inputimage').val('');
    }

// get list item
    getListItem();

//add new item
$('.store').click(function () {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];

    var proname = $('#inputname').val();
    var proimage = $('#inputimage').val().replace(/C:\\fakepath\\/i, '');
    var proprice = $('#inputprice').val();
    var proqty = $('#inputqty').val();
    
    var itemData = {
        proname,
        proimage,
        proprice,
        proqty,
        proid: listItemStorage.length + 1
    }
    $('.modal-add').hide();
    listItemStorage.push(itemData);
    localStorage.setItem('listItem', JSON.stringify(listItemStorage));
    getListItem();     
    resetForm();           
});

//search
    $(".search-button").click(function() {
        var value_search = $(".search-input").val().toLowerCase();
        var count =0
        var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
        $(".product").empty()
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            if (item.proname == value_search) {
                count+=1
                $(".product").append(`<tr>
                <td>${item.proid}</td>
                <td>${item.proname}</td>
                <td><img class="image-content" src="/project/img/${item.proimage}"/></td>
                <td>${item.proprice}</td>
                <td>${item.proqty}</td>
                <td>
                    <button onclick="openEdit(${item.proid})" type="button" class="btn btn-info open-modal ">Edit</button>
                    <button onclick="removeItem(${item.proid})" type="button" class="btn btn-info">Remove</button>
                </td>
                </tr>`);
            }
        }
        if (count === 0) {
            alert("no result");
            getListItem();
        }
    });

//show - hide modal
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

//----------------edit
$('.update').click(function () {
    var listItemStorage = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];
    var idEditing = localStorage.getItem('idEditing');

    var proname = $('#updatename').val();
    var proimage = $('#updateimage').val().replace(/C:\\fakepath\\/i, '');
    var proprice = $('#updateprice').val();
    var proqty = $('#updateqty').val();
    if (idEditing) {
        // logic update
        for (let i = 0; i < listItemStorage.length; i++) {
            var item = listItemStorage[i];
            if (item.proid == idEditing) {
                listItemStorage[i] = {
                    proname,
                    proimage,
                    proprice,
                    proqty,
                    proid: idEditing
                };
            }
        }
        localStorage.removeItem('idEditing');
        localStorage.setItem('listItem', JSON.stringify(listItemStorage));
    } else {
        var itemData = {
            proname,
            proimage,
            proprice,
            proqty,
            proid: listItemStorage.length + 1
        }
        listItemStorage.push(itemData);
        localStorage.setItem('listItem', JSON.stringify(listItemStorage));
    }
    $('.modal-edit').hide();
    getListItem();
    resetForm();
})


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

