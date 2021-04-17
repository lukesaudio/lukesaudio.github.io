


var darkMode = true;

var x = window.matchMedia("(prefers-color-scheme: dark)");
checkDarkMode(x); // Call listener function at run time
x.addListener(checkDarkMode); // Attach listener function on state changes

/* Object 
{"Dark Purple":"270722","Dark Orange":"ff8811","Space Cadet":"183059","Mint Cream":"eff9f0","Maroon X 11":"b81365"}
*/


function changeDisplayType() 
{
  if(window.innerWidth < 600)
  {
    var element = document.getElementById("mainContent");
    element.classList.add("w3-container") ;
    element.classList.remove("w3-display-middle");
    console.log("small");
  
  }
  else
  {
    var element = document.getElementById("mainContent");
    element.classList.remove("w3-container");
    element.classList.add("w3-display-middle");
    console.log('big');

  }

}



    
  function checkDarkMode(x) 
  {
    if (x.matches) 
    { // If media query matches
      darkMode = true;
      console.log("We like it dark");

        
     //document.body.style.backgroundColor = "#151E3F";

     document.body.style.backgroundColor = "#070106";
      document.body.style.color = "#FFFFFC";




      

      

    } 
    
    else 
    {
      darkMode = false;
      console.log("We like it light");
      document.body.style.backgroundColor = '#FFFFFC';
      document.body.style.color = "#070106";



  }
}


