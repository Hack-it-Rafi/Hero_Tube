const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();
    // console.log(data.data);
    const cateContainer = document.getElementById('categoryId');
    data.data.forEach((category) => {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab Rafi" onclick="cateClicked(this); handleList(${category.category_id})">${category.category}</a>
        `;
        cateContainer.appendChild(div);
    })
}

const cateClicked = async (click, id) => {
    const Raf = document.getElementsByClassName("Rafi");
    for (let i = 0; i < Raf.length; i++) {
        Raf[i].classList.remove("tab-active");
    }
    click.classList.add("tab-active")
    console.log(click.classList);
}
// function compareNumericParts(a, b) {
//     const numericPartA = parseFloat(a.match(/[\d.]+/)[0]);
//     const numericPartB = parseFloat(b.match(/[\d.]+/)[0]);
//     return numericPartA - numericPartB;
// }

function sortHTMLArray(array, childSelector) {
    return array.sort(function (a, b) {
      // Convert the HTML strings to DOM elements
      const parser = new DOMParser();
      const docA = parser.parseFromString(a, 'text/html');
      const docB = parser.parseFromString(b, 'text/html');
  
      // Extract child elements with the given selector and their text content
      const textA = docA.querySelector(childSelector).textContent.trim();
      const textB = docB.querySelector(childSelector).textContent.trim();
  
      const numericA = parseFloat(textA.match(/\d+/));
    const numericB = parseFloat(textB.match(/\d+/));

    // Compare the numeric values for sorting
    return numericB - numericA;
    });
  }

const handleList = async (id = 1000) => {
    let htmlArray = [];
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    console.log(data.data);
    let arr = data.data.map((it) => it.others.views);
    // arr.sort(compareNumericParts);
    console.log(arr);
    const uniqueArr = arr.filter((value, index, self) => {
        // Keep the first occurrence of each element
        return self.indexOf(value) === index;
    });
    // console.log(uniqueArr);
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = '';

    data.data.forEach((content) => {
        const card = document.createElement('div');
        let secTime = parseFloat(content.others.posted_date);
        let minute = secTime / 60;
        let intMin = parseInt(minute);
        let intSec = parseInt((minute - intMin) * 60);
        let hour = intMin / 60;
        let intHour = parseInt(hour);
        intMin = parseInt((hour - intHour) * 60);
        const time = intHour + "hr " + intMin + "min " + intSec + "sec";
        card.innerHTML = `
        <div class="card bg-base-100 rounded-md">
        <figure class="h-[200px]"><img class="contain rounded-md h-[200px] w-full" src="${content.thumbnail}" alt="Shoes" class="rounded-md relative" />
        <div class="absolute top-44 right-[10px] bg-slate-500 rounded-lg px-2 ">
            <p class="text-[12px] text-white">${content.others.posted_date ? time : ""}</p>
        </div>
        </figure>
        <div class="flex gap-3 p-3 mt-5">
            <div class="w-10">
                <img src="${content.authors[0].profile_picture}" alt="" class="contain h-10 w-10 rounded-full">
            </div>
            <div class="text-justify w-[75%]">
                <h2 class="font-bold text-[16px]">${content.title}</h2>
                <div class="flex gap-2">
                    <p class="text-[14px] text-slate-500 my-2">${content.authors[0].profile_name}</p>
                    <img src="${content.authors[0].verified ? "./images/fi_10629607.svg" : ""}" alt="">
                </div>
                <p class="text-[14px] text-slate-500"><span class = "viewGula">${content.others.views}</span> views</p>

            </div>
        </div>
        </div>

        `;
        htmlArray.push(`${card.innerHTML}`);
        cardContainer.appendChild(card);
    });
    // console.log(htmlArray);

    sortHTMLArray(htmlArray, '.viewGula');
    console.log(htmlArray);
    const cardContainer2 = document.getElementById("cardContainer");
    document.getElementById("sortButton").addEventListener("click", function(){
        cardContainer2.innerHTML = '';
        // const card2 = document.createElement('div');
        
        for(let i=0; i<htmlArray.length; i++){
            const card2 = document.createElement('div');
            card2.innerHTML = htmlArray[i];
            cardContainer2.appendChild(card2);
        }
        
        
    })

    // document.getElementById("sortButton").addEventListener("click", function async() {
    //     cardContainer.innerHTML = '';
    //     let cardArray = [];
        
    //     for (let i = 0; i < uniqueArr.length; i++) {
    //         // console.log(uniqueArr[i]+"Heloooooooooo");
    //         cardArray = data.data.map(function(str){
    //             // console.log(str.others.views);
    //             let counter = 0;
    //             let obj = {};
    //             if (uniqueArr[i] == str.others.views) {
    //                 // console.log("Milseeeeeee"+ str.others.views);
    //                 obj = {
    //                     thumbnail: str.thumbnail,
    //                     time: str.others.posted_date,
    //                     pp: str.authors[0].profile_picture,
    //                     title: str.title,
    //                     name: str.authors[0].profile_name,
    //                     verify: str.authors[0].verified,
    //                     view: str.others.views
    //                 }
    //                 // console.log(obj);
    //                 counter = 1;
    //             }
    //             if(counter==1){
    //                 console.log(obj);
    //                 return obj;
    //             }
                
    //         })
    //     }
    //     console.log(cardArray);

    //     cardArray.forEach((content) => {
    //         // console.log(content);
    //         // console.log(content.title);
    //         const card = document.createElement('div');
    //         let secTime = parseFloat(content.time);
    //         let minute = secTime / 60;
    //         let intMin = parseInt(minute);
    //         let intSec = parseInt((minute - intMin) * 60);
    //         let hour = intMin / 60;
    //         let intHour = parseInt(hour);
    //         intMin = parseInt((hour - intHour) * 60);
    //         const time = intHour + "hr " + intMin + "min " + intSec + "sec";
    //         card.innerHTML = `
    //     <div class="card bg-base-100 rounded-md">
    //     <figure class="h-[200px]"><img class="contain rounded-md h-[200px] w-full" src="${content.thumbnail}" alt="Shoes" class="rounded-md relative" />
    //     <div class="absolute top-44 right-[10px] bg-slate-500 rounded-lg px-2 ">
    //         <p class="text-[12px] text-white">${content.time ? time : ""}</p>
    //     </div>
    //     </figure>
    //     <div class="flex gap-3 p-3 mt-5">
    //         <div class="w-10">
    //             <img src="${content.pp}" alt="" class="contain h-10 w-10 rounded-full">
    //         </div>
    //         <div class="text-justify w-[75%]">
    //             <h2 class="font-bold text-[16px]">${content.title}</h2>
    //             <div class="flex gap-2">
    //                 <p class="text-[14px] text-slate-500 my-2">${content.name}</p>
    //                 <img src="${content.verify ? "./images/fi_10629607.svg" : ""}" alt="">
    //             </div>
    //             <p class="text-[14px] text-slate-500">${content.view} views</p>

    //         </div>
    //     </div>
    //     </div>

    //     `;
    //         cardContainer.appendChild(card);
    //     })
    // })

}
handleCategory();
handleList();
