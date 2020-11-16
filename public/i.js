let data = {
    "answer": "example",
    "element": 'test',
    "e": "E"
}
document.querySelectorAll('.column-a').forEach(c =>{
    (c).addEventListener('click', (e) =>{
        if(e.target.tagName == "H2") {
            return getDB(e.target.parentElement)        
        }else if(e.target.tagName == "DIV"){
            getDB(e.target)
        }else{
            throw new Error("Invalid TagName Type")
        }
    })
})
function copyId(){
    var copyText = document.getElementById("jeopardy-board-id");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}
async function openQandA(e, element){
    document.querySelector('.answer').style.visibility = "visible"
    document.querySelector('h1', '.answer-score').innerHTML = e[0]
    data.answer = e[1]
    data.element = element
    data.e = e
}
document.querySelector('h5', 'button', '.answer-score').addEventListener('click', () =>{
    data.element.style.visibility = 'hidden'
    document.querySelector('h1', '.answer-score').innerHTML = data.answer
    console.log('test')
})
async function getDB(element){
    const question = 'q' + element.id.split('-')[0] + element.id.split('-')[1]
    const answer = 'a' + element.id.split('-')[0] + element.id.split('-')[1]
    var urlencoded = new URLSearchParams();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    urlencoded.append("id", document.getElementById("jeopardy-board-id").value);
    urlencoded.append("question", question);
    urlencoded.append("answer", answer);
    console.log(question)
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://aridanus.com/self/jeopardy/post/api/getAnswers", requestOptions)
    .then(response => response.text())
    .then(result => openQandA(result.split('#####'), element))
    .catch(error => console.log('error', error));
    
}