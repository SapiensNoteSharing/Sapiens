var coll = document.getElementsByClassName("show_resources");

for (var i = 0; i < coll.length; i++) {
    console.log(coll);
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}