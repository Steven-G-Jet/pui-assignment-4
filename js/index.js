/***Global Variables ***/
var img=null;
var flavor=null;
var flavor_one=null;
var flavor_two=null;
var batch_size=null;
var quantity=null;
var price=null;
var flavor_add=null;
var cart_counter=0;
var saved_shopping_cart=null;
var cart_button_enabled=false;
var original_price=null;

// put img paths in variables
var maple_a="../pui-assignment-4/imgs/1%20-%20Maple%20Apple%20Pecan.jpg";
var bacon="../pui-assignment-4/imgs/2%20-%20Bacon.jpg";
var walnut="../pui-assignment-4/imgs/3%20-%20Walnut.jpg";
var original_gf="../pui-assignment-4/imgs/4%20-%20Original%20(Gluten%20Free).jpg";
var original_v="../pui-assignment-4/imgs/5%20-%20Original%20(Vegan).jpg";
var original="../pui-assignment-4/imgs/6%20-%20Original.jpg";
var pumpkin_s="../pui-assignment-4/imgs/7%20-%20Pumpkin%20Spice.jpg";
var caramel_p="../pui-assignment-4/imgs/8%20-%20Caramel%20Pecan.jpg";
var carrot_c="../pui-assignment-4/imgs/9%20-%20Carrot%20Cake.jpg";
var buttermilk="../pui-assignment-4/imgs/10%20-%20Old%20Fashioned%20Buttermilk.jpg";
var strawberry_r="../pui-assignment-4/imgs/11%20-%20Strawberry%20Rhubarb.jpg";
var birthday_c="../pui-assignment-4/imgs/12%20-%20Birthday%20Cake.jpg";
var lemon_l="../pui-assignment-4/imgs/13%20-%20Lemon%20Lavendar.jpg";
var cranberry="../pui-assignment-4/imgs/14%20-%20cranberry.jpg";
var blackberry="../pui-assignment-4/imgs/15%20-%20Blackberry.jpg";
var birthday_c_bg="../pui-assignment-4/imgs/PI%20-%202%20-%20Birthday Cake.jpg";
var pack_12="../pui-assignment-4/imgs/BG-12buns.png";
var pack_6="../pui-assignment-4/imgs/BG-6buns.png";

var bun_img={ 
  "Birthday Cake": birthday_c,
  "Original": original,
  "Original (Vegan)": original_v,
  "Original (Gluten Free)": original_gf,
  "Maple Apple Pecan": maple_a,
  "Strawberry Rhubarb": strawberry_r,
  "Pumpkin Spice": pumpkin_s,
  "Caramel Pecan": caramel_p,
  "Carrot Cake": carrot_c,
  "Cranberry": cranberry,
  "Lemon Lavender": lemon_l,
  "Walnut": walnut,
  "Blackberry": blackberry,
  "Old Fashioned Buttermilk": buttermilk,
  "Bacon": bacon
}

/*** ***/

// create a cart object
function Cart(img,flavor,flavor_one,flavor_two,batch_size,quantity,price){
  this.img=img;
  this.flavor=flavor;
  this.flavor_one=flavor_one;
  this.flavor_two=flavor_two;
  this.batch_size=batch_size;
  this.quantity=quantity;
  this.price=price;
}

/*** html to be injected ***/


/*** Document Load ****/
$(document).ready(function(){
  $("button.checkout").click(function(){
    window.location.href="../pui-assignment-4/checkout.html";
  });

  var flavor_selected=[];
  var cart_num=Object.keys(localStorage).length;
  
  // save all of the storages in the cart 
  // console.log("how many cart objects are there"+cart_num);
  // console.log("localStorage");
  // console.log(localStorage);

  if (cart_num>0){
      var key=Object.keys(localStorage);
      for(var i=0;i<cart_num;i++){
        var hello=localStorage.getItem(key[i])
        var saved_shopping_cart=JSON.parse(hello);
        console.log("saved_shopping_cart "+saved_shopping_cart.flavor);
        if(saved_shopping_cart.flavor_one==null){saved_shopping_cart.flavor_one="no flavor"};
        if(saved_shopping_cart.flavor_two==null){saved_shopping_cart.flavor_two="no flavor"};
        $("#cart_list").append("<div class='sc-card' id='"+"Cart_"+i+"'> <div class='sm-img' id='img"+i+"'> </div> <div class='sc-card-content'> <div class='flavor'> <h3>FLAVOR</h3> <p>"+saved_shopping_cart.flavor+"</p> <p>"+saved_shopping_cart.flavor_one+"</p><p>"+saved_shopping_cart.flavor_two+"</p> </div> <div class='size'> <h3 >BATCH SIZE</h3> <p>"+saved_shopping_cart.batch_size+"</p> </div> <div class='quantity'> <h3 >QUANTITY</h3> <p>"+saved_shopping_cart.quantity+"</p> </div> <div class='price'> <h3 >PRICE</h3> <p>$ "+saved_shopping_cart.price+"</p> </div> <button id='"+key[i]+"'>DELETE THE ORDER</button> </div> </div> </div>");
        $("#img"+i).css({"background":"url('"+saved_shopping_cart.img+"')","background-size":"cover","z-index":"1"});
      }
      cart_counter=cart_num;
      // console.log("saved_shopping_cart "+saved_shopping_cart[i]);
      $("#shopping-cart-number").remove();
      $("button.checkout").append("<span id='shopping-cart-number'><p>"+Object.keys(localStorage).length+"</p></span>");
    }

  $("#add-to-cart").css({"color":"#ccc","background":"#eaeaea"});

  // look at what batch size the person chose
  $("#12-pack").click(function(){
    original_price=12;
    // magic!
    wowSpoof();
    batch_size="12-pack";
    $("#12-pack").css({"outline":"1px solid #e47814","background":"#fefaf7"});
    $("#pd-d-price").html("12");

    //the menu bar pops up
    $(".amp").css("background","url('"+pack_12+"')");
    $(".pd-d-title").append("<div id='label'> <h3>Pack of 12</h3> </div> <p>for a pack of 12 buns.You can select two more flavors</p> <p id='flavor-one'></p> <p id='flavor-two'></p>");
    popUpMenu();
    // console.log("flavor_selected"+flavor_selected);
    cartButtonHighlight();
  });

  $("#6-pack").click(function(){
    original_price=6;
    // 
    wowSpoof();
    $("#6-pack").css({"outline":"1px solid #e47814","background":"#fefaf7"});
    $(".amp").css("background","url('"+pack_6+"')");
    batch_size="6-pack";
    $("#pd-d-price").html("6");
    popUpMenu();

    $(".pd-d-title").append("<div id='label'> <h3>Pack of 6</h3> </div> <p>for a pack of 6 buns.You can select two more flavors</p> <p id='flavor-one'></p> <p id='flavor-two'></p>")
    console.log("flavor_selected"+flavor_selected);
    cartButtonHighlight();
  });

  $("#individual-roll").click(function(){
    original_price=1;
    individualSpoof();
    batch_size="individual-roll";
    $("#individual-roll").css({"outline":"1px solid #e47814","background":"#fefaf7"});
    $(".pd-d-title").append("<h3>INGREDIENTS</h3> <p>sugar, vegetable oil, egg, salt, all purpose flour, butter, brown sugar, cinnamon, apples, pecans</p>")
    console.log("added");
    cartButtonHighlight();
  });

  $('select').change(function() {
      $("#pd-d-price").html(original_price*$("select").val());
      console.log("yep");
      console.log($("select").val());
  });
    

  /***  Add to the shopping cart ***/
  $("#add-to-cart").click(function(){
    if(cart_button_enabled){
      flavor=$(".pd-d-title h1").text();
      // flavor one and two are defined in popUpMenu
      img=bun_img[flavor];
      quantity=$("select").val();
      console.log("$('#pd-d-price').text()"+$("#pd-d-price").text())
      price=$("#pd-d-price").text();
      new_cart=new Cart(img,flavor,flavor_one,flavor_two,batch_size,quantity,price);
      console.log(new_cart);
      localStorage.setItem("savedCart_"+cart_counter, JSON.stringify(new_cart));
      // increase cart counter
      console.log("cart_counter"+cart_counter);
      cart_counter++;  
    }else{
        alert("Did you select batch size or quantity?");
      };
  });

  /***  Shopping Cart ***/
  $(".sc-card button").click(function(){
    console.log($("#"+this.id).parent().parent());
    $("#"+this.id).parent().parent().remove();
    localStorage.removeItem(this.id);
    console.log("delete the order");
    if (Object.keys(localStorage).length==0){
      $("#shopping-cart-number").remove();
    }else{
    $("#shopping-cart-number").remove();
    $("button.checkout").append("<span id='shopping-cart-number'><p>"+Object.keys(localStorage).length+"</p></span>");
    };
  });

});



function wowSpoof(){
    window.flavor_selected=[];
    $(".amp").css("background","url('"+birthday_c_bg+"')");
    $("select").val("1");
    $("#pd-d-price").html("1");
    $("#pd-d-new-menu").empty();
    $("#pd-d-new-menu").removeClass("pop-up-menu");
    $(".pd-d-title div,.pd-d-title p,.pd-d-title h3").remove();
    // 
    $("#pd-d-new-menu").addClass("pop-up-menu");
    $("#pd-d-new-menu").append("<!-- --> <h4>The special</h4> <p id='birthday-c' selected=''>Birthday Cake</p> <!-- --> <h4>You can't beat the original</h4> <p id='original' selected='' name>Original</p> <p id='original-v' selected=''>Original(Vegan)</p> <p id='original-gf' selected=''>Original (Gluten Free)</p> <!-- --> <h4>Fruits, Nuts and Veggies</h4> <p id='strawberry-r' selected=''>Strawberry Rhubarb</p> <p id='pumpkin-s' selected=''>Pumpkin Spice</p> <p id='caramel-p' selected=''>Caramel Pecan</p> <p id='carrot-c' selected=''>Carrot Cake</p> <p id='cranberry' selected=''>Cranberry</p> <p id='lemon-l' selected=''>Lemon Lavendar</p> <p id='walnut' selected=''>Walnut</p> <p id='blackberry' selected=''>Blackberry</p> <!-- --> <h4>The destroyers</h4> <p id='buttermilk' selected=''>Old Fashioned Buttermilk</p> <p id='bacon' selected=''>Bacon</p>");
    //
    $("#pd-d-title h3").css({"outline":"1px solid #333","width":"90px","height":"21px"});
    // change all the buttons to be transparent
    $(".pd-d-batch button").css({"outline":"1px solid #ccc","background":"transparent"});
    //the ingredients page changes
};

function individualSpoof(){
    $("select").val("1");
    $("#pd-d-price").html("1");
    $("#pd-d-new-menu").empty();
    $("#pd-d-new-menu").removeClass("pop-up-menu");
    $(".pd-d-title div,.pd-d-title p,.pd-d-title h3").remove();
    $(".pd-d-batch button").css({"outline":"1px solid #ccc","background":"transparent"});
};

function popUpMenu(){
    $("#pd-d-new-menu p").click(function(){
      if(window.flavor_selected.length<2){
      $(this).css({"font-family":"Produkt","font-weight":"bold","color":"#333"});
      window.flavor_selected.push(this);
    }else if(window.flavor_selected.length==2){
      $(window.flavor_selected[0]).css({"font-family":"Produkt","font-weight":"normal","color":"#adadad"});
      var temp=window.flavor_selected[1];
      window.flavor_selected[0]=temp;
      window.flavor_selected[1]=this;
      $(window.flavor_selected[1]).css({"font-family":"Produkt","font-weight":"bold","color":"#333"});
    }
     console.log("the text is :"+$(window.flavor_selected[0]).text())
    $("#flavor-one").html($(window.flavor_selected[0]).text());
    $("#flavor-two").html($(window.flavor_selected[1]).text());
    flavor_one=$(window.flavor_selected[0]).text();
    flavor_two=$(window.flavor_selected[1]).text();
  });
};

function cartButtonHighlight(){
  $("#add-to-cart").css({"color":"#333","background":"#fdd7a7"});
  cart_button_enabled=true;
}
