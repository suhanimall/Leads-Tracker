let myLead= []
const inputText= document.getElementById("input-el")
const inputBtn= document.getElementById("input-btn")
const unList= document.getElementById("ul-el")
const deleteBtn= document.getElementById("delete-btn")
const saveBtn= document.getElementById("save-btn")
const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLead"))

if(leadsFromLocalStorage){
    myLead= leadsFromLocalStorage
    render(myLead)
}


saveBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead",JSON.stringify(myLead))
        render(myLead)
    })
})

function render(leads){
    let listItems= ""

    for(let i=0; i<leads.length; i++){
    listItems+=
    `<li>
        <a href="${leads[i]}" target="_blank">
        ${leads[i]}
        </a>
    </li>`
    }
    unList.innerHTML= listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLead= []
    render(myLead)
})

inputBtn.addEventListener("click",function(){
    myLead.push(inputText.value)
    inputText.value=''
    localStorage.setItem("myLead",JSON.stringify(myLead))
    render(myLead)
})


