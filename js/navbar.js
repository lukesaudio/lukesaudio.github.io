var isToggled = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() 
{

  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  console.log("hello");


  
}





/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  console.log("hello");


} 


function toggleNavBar()
{
 
  console.log('hello');
  
  switch(isToggled)
  {
    case true:
      closeNav();
      isToggled = false;
      break;
    
    case false:
      openNav()
      isToggled = true;
      break;
  }
  

  

 
}

function menuButton(x) {
  x.classList.toggle("change");
  
}

function changeImageDisplayType()
{
  
  if(window.innerWidth < 601)
  {
    document.getElementById("picture").classList.remove("w3-display-middle");
  }

  if(window.innerWidth > 601)
  {
    document.getElementById("picture").classList.add("w3-display-middle");
  }

  

  
}


