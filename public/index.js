let cFinalID;
let cID;
document.querySelectorAll("#sQbutton").forEach((l)=>{
    console.log("test", l);
    (l).addEventListener("click", (e) =>{
        console.log(e.parentElement);
        let id = e.target.parentElement.id.split('-')
        let finalId = 'q' + id[0] + id[1]
        console.log(finalId);
        showQAModal(finalId, id)
        
    })
})
function setQA(element, question, answer){
    element.value = question + '#151516611#' + answer
    console.log("Test");
    console.log(element);
}
let answer = document.querySelector('.answer')
function showQAModal(finalId, id){
    console.log(id);
    cFinalID = finalId;
    cID = id;
    answer.style.visibility = "visible"
    console.log("col" + id[1]);
    document.querySelector("#answerhgcol").innerHTML = document.getElementsByName("col" + id[1])[0].value
    document.querySelector('#answerhgscore').innerHTML = id[0]
}
document.querySelector('#setQandA').addEventListener("click", () =>{
    setQA(document.getElementsByName(cFinalID)[0], document.querySelector("#answermodalQuestion").value, document.querySelector("#answermodalAnswer").value)
    answer.style.visibility = "hidden"
    document.querySelector("#answermodalQuestion").value = ""
    document.querySelector("#answermodalAnswer").value = ""
})
