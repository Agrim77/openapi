console.log("----animate-----");
const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // console.log(entry);
            if(entry.isIntersecting){
                // console.log('element intersecting');
                entry.target.classList.add('show1');
            }
        });
    });
    
const hiddenElements = document.querySelectorAll('.hidden1');
hiddenElements.forEach((el) => observer.observe(el));