class slider{
    constructor(root){
this.root= root;
this.cookies= root.querySelectorAll(".cookie");
 this.previews= root.querySelectorAll(".preview");
 this.nameLeft= root.querySelectorAll(".name-left");
 this.nameRight= root.querySelectorAll(".name-right");
 this.btnRight= root.querySelector(".btn-right");
 this.btnLeft= root.querySelector(".btn-left");
 this.index= 0;
 this.cookieContainer = document.querySelector(".cookie-principal")
 this.init();
}

init(){
   let startX;
   let endX;
this.btnLeft.addEventListener("click", ()=>{this.prev()});
this.btnRight.addEventListener("click", ()=>{this.next()});
this.previews.forEach((element, index) => {
    element.addEventListener("click",()=>{
        this.index= index;
        this.update();
    })
});

this.root.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  this.root.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  this.root.addEventListener("touchend", () => {
    let diff = startX - endX;
     if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next(); // swipe izquierda
      } else {
        this.prev(); // swipe derecha
      }
    }})



}

next(){
    this.index= (this.index + 1) % this.cookies.length
    this.update()

}
prev(){
    this.index= (this.index - 1+ this.cookies.length) % this.cookies.length
    this.update()

}
setActive(element){
     element.forEach(el => el.classList.remove("active"));

    if (element[this.index]) {
      element[this.index].classList.add("active");
    }
    }
    
update(){
     this.setActive(this.cookies)
     this.setActive(this.previews)
     this.setActive(this.nameRight)
     this.setActive(this.nameLeft)

}



}
const cookieSlider = document.querySelector(".cookie-slider")
const sliderClass= new slider(cookieSlider);






const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show"); // ← esto permite que se repita
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach(el => observer.observe(el));