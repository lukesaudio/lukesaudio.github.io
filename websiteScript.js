function bounceThenSize()
{
  window.onload = function()
  {
                setTimeout(function()
                {
                    var x = document.getElementsByClassName("icon");
                    for(var i = 0; i < x.length; i++)
                    {
                      x[i].classList.remove("animate__bounce");
                    }
                    console.log(x);
                }, 1000);

            }
}


function iconNavText()
{
  var x = document.getElementById("iconLabel");
  

}

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

