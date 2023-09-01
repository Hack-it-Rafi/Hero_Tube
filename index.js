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

const handleList = async (id = 1000) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    console.log(data.data);
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML='';

    data.data.forEach((content) => {
        const card = document.createElement('div');
        let secTime = parseFloat(content.others.posted_date);
        card.innerHTML = `
        <div class="card bg-base-100 rounded-md">
        <figure class="h-[200px]"><img class="contain rounded-md h-[200px]" src="${content.thumbnail}" alt="Shoes" class="rounded-md relative" />
        <div class="absolute top-44 right-[20px] bg-slate-500 rounded-lg px-2 ">
            <p class="text-[12px] text-white">${content.others.posted_date}</p>
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
                    <img src="${content.authors[0].verified?"./images/fi_10629607.svg":""}" alt="">
                </div>
                <p class="text-[14px] text-slate-500">${content.others.views} views</p>

            </div>
        </div>
        </div>

        `;
        cardContainer.appendChild(card);
    })

}
handleCategory();
handleList();
