
$(function(){
	$('#loading').fadeOut(1000,function(){
		$('body').css('overflow', 'auto');
		console.log('aaaaaaa')
	})
})



function openSideNavBar(){
	$(".side-nav-bar").animate({left: 0},500)
	$(".open-close-icon").removeClass("fa-align-justify");
	$(".open-close-icon").addClass("fa-x");
	$(".li-1").animate({top : 0} , 500 )
	$(".li-2").animate({top : 0} , 600 )
	$(".li-3").animate({top : 0} , 700 )
	$(".li-4").animate({top : 0} , 800 )
	$(".li-5").animate({top : 0} , 900 )
}
function closeSideNavBar() {
    let boxWidth = $(".side-nav-bar .nav-tab").outerWidth()
    $(".side-nav-bar").animate({
        left: -boxWidth
    }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNavBar()

$(".side-nav-bar i.open-close-icon").click(() => {
    if ($(".side-nav-bar").css("left") == "0px") {
        closeSideNavBar()
    } else {
        openSideNavBar()
    }
})

let Dishes = document.getElementById('dishes');


async function GetRecipes(){
	let data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
	data = await data.json()
	data = data.meals
	DisplayRecipes(data)
}

GetRecipes();

function DisplayRecipes(data){
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	let Carton=``
	console.log(data)
	for (let i = 0; i < Math.min(data.length,20); i++) {
        Carton += `
        <div class="col-md-3">
                <div onclick="DisplayDish('${data[i].idMeal}')" class="dish position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src='${data[i].strMealThumb}' alt="" >
                    <div class="dish-layer position-absolute d-flex align-items-center text-center text-black p-2 w-100 h-100">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
    }
	console.log(data[0].strTags)

    Dishes.innerHTML = Carton;
}

async function DisplayDish(id){
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``

	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
	data = await data.json()
	data = data.meals[0]

	
	let ingredients = ``
	let i = 0
	while(data[`strIngredient${i}`]){
		ingredients+=`<li class="alert alert-info mx-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
	}
	console.log(data)
	console.log(data.strTags)
	if(data.strTags){
		var strTag = data.strTags.split(",")
	}
	console.log(strTag)
	if(!strTag) strTag=[]
	let tags=``
	for (let i = 0; i < strTag.length; i++) {
		tags+=`<li class="alert alert-danger mx-2 p-1">${strTag[i]}</li>`
	}

	let Carton = `
	<div class="col-4 text-white">
						<img class="w-100  rounded-2 rounded" src='${data.strMealThumb}' alt="" >
						<h2 class="fw-bolder">${data.strMeal}</h2>
					</div>
					<div class="col-8 text-white">
						<h2 class="fw-bolder">Instructions</h2>
						<p>${data.strInstructions}</p>
						<h2><span class="fw-bolder">Category  : </span>${data.strArea}</h2>
						<h2><span class="fw-bolder">Recipes : </span>${data.strCategory}</h2>
						<ul class="list-unstyled d-flex flex-wrap ">
						${ingredients}
						</ul>
						<h2><span class="fw-bolder">Tags : </span></h2>
						<ul class="list-unstyled d-flex flex-wrap ">
						${tags}
						</ul>
						<a href="${data.strSource}" target="_blank" class="btn btn-success fs-5"> Source</a>
						<a href="${data.strYoutube}" target="_blank" class="btn btn-danger fs-5"> Youtube</a>
					</div>
	
	`
	Dishes.innerHTML = Carton
}


$(".li-1").click(async function () { 
	closeSideNavBar();
	searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 text-danger">
            <input onkeyup="searchName(this.value)" class="form-control bg-black text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchLetter(this.value)"  maxlength="1" class="form-control bg-black text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
	`
    Dishes.innerHTML = ""
	
	let data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
	data = await data.json()
	data = data.meals
	let Carton=``
	console.log(data)
	for (let i = 0; i < Math.min(data.length,20); i++) {
        Carton += `
        <div class="col-md-3">
                <div onclick="DisplayDish('${data[i].idMeal}')" class="dish position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src='${data[i].strMealThumb}' alt="" >
                    <div class="dish-layer position-absolute d-flex align-items-center text-black p-2 w-100 h-100">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
    }
	Dishes.innerHTML = Carton;
});

async function searchName(name) {
    Dishes.innerHTML = ""

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    data = await data.json()
    data = data.meals
	DisplayRecipes(data)
	if(data){
		DisplayRecipes(data)
	}
}

async function searchLetter(Letter) {
    Dishes.innerHTML = ""
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`)
    data = await data.json()
    data = data.meals
	if(data){
		DisplayRecipes(data)
	}
}

$(".li-2").click(async function () {
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await data.json()
    data = data.categories
	DisplayCategories(data);
	$(".inside-loading").fadeOut(300)
});

function DisplayCategories(data){
	
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	let Carton = ``;

	for(let i = 0 ; i < Math.min(data.length,20);i++){
		let Description = data[i].strCategoryDescription.substring(0,100)
		
		Carton+=`
		<div class="col-md-3">
			<div onclick="DisplayCategory('${data[i].strCategory}')"  class="dish position-relative overflow-hidden rounded-2 cursor-pointer">
				<img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
				<div class="dish-layer position-absolute text-center text-black p-2 w-100 h-100">
				<h3>${data[i].strCategory}</h3>
				<p>${Description}</p>
				</div>
			</div>
		</div>
		`
	}

	Dishes.innerHTML = Carton;
}



async function DisplayCategory (category){
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await data.json()
    data = data.meals
	DisplayRecipes(data);
	$(".inside-loading").fadeOut(300)
}

$(".li-3").click(async function () { 
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	Dishes.innerHTML = "";
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    data = await data.json()
    data = data.meals
	DisplayAreas(data);
	$(".inside-loading").fadeOut(300)
});

function DisplayAreas(data) {
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
    let cartoona = "";

    for (let i = 0; i < Math.min(data.length,20); i++) {
        cartoona += `
        <div class="col-md-3 py-5">
                <div onclick="DisplayArea('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    Dishes.innerHTML = cartoona
}

async function DisplayArea (area){
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await data.json()
    data = data.meals
	DisplayRecipes(data);
	$(".inside-loading").fadeOut(300)
}

$(".li-4").click(async function () { 
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data = await data.json()
    data = data.meals
	DisplayIngredients(data);
	$(".inside-loading").fadeOut(300)
});

function DisplayIngredients(data) {
	
    let cartoona = "";

    for (let i = 0; i < Math.min(data.length,20); i++) {
		let Description = data[i].strDescription.substring(0,100)
        cartoona += `
        <div class="col-md-3">
                <div onclick="DisplayIngredient('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${Description}</p>
                </div>
        </div>
        `
    }

    Dishes.innerHTML = cartoona
}

async function DisplayIngredient (ingredient){
	$(".inside-loading").fadeIn(300,function(){
		$(".inside-loading").css('display' , 'flex')
	})
	Dishes.innerHTML = "";
	let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    data = await data.json()
    data = data.meals
	console.log(data)
	DisplayRecipes(data);
	$(".inside-loading").fadeOut(300)
}



var btn ;

$(".li-5").click(async function () { 
	showContacts()
});
function showContacts() {
	closeSideNavBar();
	searchContainer.innerHTML=''
	Dishes.innerHTML=``
    Dishes.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-5">
            <div class="col-md-6">
                <input id="name" onkeyup="Valid()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="Valid()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="Valid()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="Valid()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="Valid()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup="Valid()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="Btn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    btn = document.getElementById("Btn")
	console.log(btn) 
}

function Valid() {
    var regexName=/^[a-zA-Z1-9]{3,}$/;
    if(!regexName.test(document.getElementById("name").value)){
		$("#name").addClass("is-invalid");
		$("#nameAlert").removeClass("d-none");
	}
	else{
		$("#name").addClass("is-valid");
		$("#name").removeClass("is-invalid");
		$("#nameAlert").addClass("d-none");
	}
	if(document.getElementById("name").value == ""){
		$("#name").removeClass("is-invalid");
		$("#name").removeClass("is-valid");
		$("#nameAlert").addClass("d-none");
	}
    var regexEmail= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if(!regexEmail.test(document.getElementById("email").value)){
		$("#email").addClass("is-invalid");
		$("#emailAlert").removeClass("d-none");
	}
	else{
		$("#email").addClass("is-valid");
		$("#email").removeClass("is-invalid");
		$("#emailAlert").addClass("d-none");
	}
	if(document.getElementById("email").value == ""){
		$("#email").removeClass("is-invalid");
		$("#email").removeClass("is-valid");
		$("#emailAlert").addClass("d-none");
	}

	var regexPhone= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

	if(!regexPhone.test(document.getElementById("phone").value)){
		$("#phone").addClass("is-invalid");
		$("#phoneAlert").removeClass("d-none");
	}
	else{
		$("#phone").addClass("is-valid");
		$("#phone").removeClass("is-invalid");
		$("#phoneAlert").addClass("d-none");
	}
	if(document.getElementById("phone").value == ""){
		$("#phone").removeClass("is-invalid");
		$("#phone").removeClass("is-valid");
		$("#phoneAlert").addClass("d-none");
	}

	var regexAge= /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/

	if(!regexAge.test(document.getElementById("age").value)){
		$("#age").addClass("is-invalid");
		$("#ageAlert").removeClass("d-none");
	}
	else{
		$("#age").addClass("is-valid");
		$("#age").removeClass("is-invalid");
		$("#ageAlert").addClass("d-none");
	}
	if(document.getElementById("age").value == ""){
		$("#age").removeClass("is-invalid");
		$("#age").removeClass("is-valid");
		$("#ageAlert").addClass("d-none");
	}

	var regexPasssword= /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

	if(!regexPasssword.test(document.getElementById("password").value)){
		$("#password").addClass("is-invalid");
		$("#passwordAlert").removeClass("d-none");
	}
	else{
		$("#password").addClass("is-valid");
		$("#password").removeClass("is-invalid");
		$("#passwordAlert").addClass("d-none");
	}
	if(document.getElementById("password").value == ""){
		$("#password").removeClass("is-invalid");
		$("#password").removeClass("is-valid");
		$("#passwordAlert").addClass("d-none");
	}


		if(!document.getElementById("repassword").value == document.getElementById("password").value){
			$("#repassword").addClass("is-invalid");
			$("#repasswordAlert").removeClass("d-none");
		}
		else{
			$("#repassword").addClass("is-valid");
			$("#repassword").removeClass("is-invalid");
			$("#repasswordAlert").addClass("d-none");
		}
		if(document.getElementById("password").value == ""){
			$("#repassword").removeClass("is-invalid");
			$("#repassword").removeClass("is-valid");
			$("#repasswordAlert").addClass("d-none");
		}
		console.log(btn) 	
    if (regexName.test(document.getElementById("name").value) &&
		regexEmail.test(document.getElementById("email").value) &&
		regexPhone.test(document.getElementById("phone").value) &&
        regexAge.test(document.getElementById("age").value) &&
        regexPasssword.test(document.getElementById("password").value) &&
        document.getElementById("repassword").value == document.getElementById("password").value) {
        btn.removeAttribute("disabled")
    } else {
        btn.setAttribute("disabled", true)
    }

}
