
let myLeads=[]
let oldLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",function(){
    //grap the url for current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].URL)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
     });

})

function render(Leads){
    let listItems=""
for(let i=0;i<Leads.length;i++){
    listItems +=`
    <li>
    <a target='_blank' href='${Leads[i]}'>
     ${Leads[i]}
    </a>
    </li>
    `
}
ulEl.innerHTML=listItems
}

//delete
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

})


