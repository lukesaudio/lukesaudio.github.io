let isNavBarMobileOpen = false;

function toggleNavBarMobile()
{
    if(!isNavBarMobileOpen && window.innerWidth < 600)
    {
        document.getElementById("idNavBar").style.display = "flex";
        document.getElementById("idNavBarButton").style.color = "#F8F8FF";
        document.getElementById("idNavBarButton").style.backgroundColor = "#111317";
        document.getElementById("idNavBarIcon").innerHTML = "menu_open";


        isNavBarMobileOpen = true;


    }
    else
    {
        document.getElementById("idNavBar").style.display = "none";
        document.getElementById("idNavBarButton").style.color = "#111317";
        document.getElementById("idNavBarButton").style.backgroundColor = "#F8F8FF";
        document.getElementById("idNavBarIcon").innerHTML = "menu";



        isNavBarMobileOpen = false;

    }
}

