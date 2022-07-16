
//banner
var slides = document.querySelectorAll('.changeSlide img');
var length = document.getElementsByClassName("slide")[0].clientWidth;
var changeSlide = document.getElementsByClassName("changeSlide")[0];
var img = changeSlide.getElementsByTagName("img");
var dots = document.querySelectorAll('.dot');
var max = length * img.length;
var currentSlide = 0;
max = max - length;
var change = 0;
function next(){
	// đổi slide 
	if(change < max) change = change + length;
	else
		change =0;
	changeSlide.style.marginLeft='-' + change + 'px';

	// đổi nút hiển thị slide
	if (currentSlide == slides.length - 1) {
    currentSlide = 0;
  	} else {
    currentSlide++;
  	}
	document.querySelector('.dot.current').classList.remove('current');
	dots[currentSlide].classList.add('current');
}
function back(){
	if(change == 0)
		change = max;
	else 
		change = change - length;
	changeSlide.style.marginLeft='-' + change +'px';
	
	if (currentSlide == 0) {
    currentSlide = slide.length - 1;
  	} else {
    currentSlide--;
  	}
	document.querySelector('.dot.current').classList.remove('current');
	dots[currentSlide].classList.add('current');
}
setInterval(function(){
	next();
}, 3000);
//tìm kiếm
function timkiem(){
	var input=document.getElementById("search");
	var filter = input.value.toUpperCase();
	var goiy=document.getElementById("goiy");
	var li = goiy.getElementsByTagName("li");
	document.getElementById("goiy").style.display="block";
	for(var i=0;i<li.length;i++){
		var a = li[i].getElementsByTagName("a")[0];
		var txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
	}
	if(filter==""){
		document.getElementById("goiy").style.display="none";
	}
}

function timkiemnangcao(){
	var cate= document.getElementById("cate");
	var priceStart= document.getElementById("priceStart");
	var priceFinal= document.getElementById("priceFinal");
	
	switch(cate.value){
		case "NINJA GO":
			if(parseInt(priceStart.value)>=0 && parseInt(priceFinal.value)>0){
				getPrice();
				window.location.href = "ninjago/ninjago.html";

			}
			break;
		case "START WAR":
			if(parseInt(priceStart.value)>=0 && parseInt(priceFinal.value)>0){
				getPrice();
				window.location.href = "startwar/startwar.html";
			}
			break;
		case "CITY":
			if(parseInt(priceStart.value)>=0 && parseInt(priceFinal.value)>0){
				getPrice();
				window.location.href = "city/city.html";
			}
			break;
		case "MARVEL":
			if(parseInt(priceStart.value)>=0 && parseInt(priceFinal.value)>0){
				getPrice();
				window.location.href = "mavel/mavel.html";
			}
			break;
		case "FRIENDS":
			if(parseInt(priceStart.value)>=0 && parseInt(priceFinal.value)>0){
				getPrice();
				window.location.href = "friends/friends.html";
			}
			break;
	}
	
	
}

function getPrice(){
	var priceFinal=document.getElementById("priceFinal");
	var priceStart=document.getElementById("priceStart");
	var cate=document.getElementById("cate");
	var arr=[
		priceStart.value,
		priceFinal.value,
		cate.value
	];
	
	return sessionStorage.setItem("price", arr);
}
function getPrice1(){
	var priceFinal=document.getElementById("priceFinal");
	var priceStart=document.getElementById("priceStart");
	var cate=document.getElementById("cate");
	var arr=[
		priceStart.value,
		priceFinal.value,
		cate.value
	];
	sessionStorage.setItem("price", arr);
	search();
}
//Chuyển dữ li sesion thành mảng
function changeArray(nameSession){
	var arr1=sessionStorage.getItem(nameSession);
	return arr1.split(",");
}
//Load các session lên trang html
function search(){
	var price=changeArray("price");
	document.getElementById("priceStart").value=price[0];
	document.getElementById("priceFinal").value=price[1];
	document.getElementById("cate").value=price[2];
	var ninja=document.getElementById("product");
	var product=ninja.children;
	for(var i=1;i<=product.length;i++){
		var a= document.getElementById("price"+i);
		if((parseInt(price[0])<=parseInt(a.innerHTML))&& (parseInt(price[1])>=parseInt(a.innerHTML))){	
				product[i-1].style.display="";
		}else{
			product[i-1].style.display="none";
		}
	}
}
//Hàm xóa session
function removeSession(nameSession){
	sessionStorage.removeItem(nameSession);
}

function loadHeader(){
	var check=sessionStorage.getItem("login");
	if(check==1){
		document.getElementById("login").style.display="none";
		document.getElementById("login1").style.display="block";
	}
	else{
		document.getElementById("login").style.display="block";
		document.getElementById("login1").style.display="none";
	}
}

//Tao session khi login: session= 1
function sessionLogin(){
	sessionStorage.setItem("login",1);
	return sessionStorage.getItem("login");
}
//Đăng nhập.
function Login(){
	sessionLogin();
	var userName= document.getElementById("username").value;
	var password= document.getElementById("password").value;
	var userNameArr= changeArray("name");
	var passArr=changeArray("pass");
	var i = userNameArr.indexOf(userName);

	if(i == -1){
		if (userName = ""){
			alert("Nhập vào tên tài khoản!");
			return ;
		}
		alert("Tài khoản không tồn tại");
		return ;
	}
	else if(passArr[i] != password){
		if (password == ""){
			alert("Nhập vào mật khẩu!");
			return ;
		}
		alert("Mật khẩu không đúng!");
		return ;
	}
	else {
		alert("Đăng nhập thành công");
		document.getElementById("dangnhap").href="javascript: history.go(-1)"
		return ;
	}
}
//Đăng xuất: session=0
function logout(){
	sessionStorage.setItem("login",0);
	location.reload();
	return sessionStorage.getItem("login");

}
//Kiểm tra đăng nhập rồi mới thêm vào giỏ hàng.
function addToCart(){
	if(sessionStorage.getItem("login")==1){
		alert("Đã thêm vào giỏ hàng");
	}else{
		alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
	}
}
//Xóa sản phẩm trong giỏ hàng:
function deleteCart(el) {
    while (el.parentNode && el.tagName.toLowerCase() != 'tr') {
        el = el.parentNode;
    }
    if (el.parentNode && el.parentNode.rows.length > 0) {
        el.parentNode.removeChild(el);
    }
}