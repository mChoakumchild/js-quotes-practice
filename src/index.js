let quoteInput = document.querySelector("input#new-quote")
let authorInput = document.querySelector("input#author")
let quoteForm = document.querySelector("form#new-quote-form")
let submitButton = document.querySelector("button.btn")
let quoteList = document.querySelector("ul#quote-list")
let dateNum = Math.floor(Date.now() / 1000)
let likeArr;


document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

//when the submit button is pressed we need to take the usr inputs and respond 
//with new dom elements
    quoteForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        
        
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(res =>{
            res.forEach(obj => {
                if (authorInput.value == obj.author){
                    console.log('hello')
                    quoteFunction(obj) 
                }
            })
        })
    })      

  function likedef (nLikes) {
      if (typeof nLikes == undefined){
          nLikes = 0
      }
      else{
        return nLikes
      }
  }




// This function creates new elements
    function quoteFunction(quoteObject) {
        let quoteInfo = document.createElement('form')
            quoteInfo.className = quoteObject.author
        let quoteString = document.createElement('h2')
        let authorString = document.createElement('li')
        let likeString = document.createElement('li')
        let dateTime = document.createElement('li')
        let likeButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        let editButton = document.createElement('button')
        let nLikes = quoteObject.likes.likesquoteId
        console.log(quoteObject.likes.quoteId)
        nLikes = likedef(nLikes)
        quoteString.innerText = quoteObject.quote
        authorString.innerText = quoteObject.author
        authorString.className = "author"
        likeString.innerText = `Likes: ${nLikes}`
        likeString.className = "likes"
        dateTime.innerText = dateNum
        dateTime.className = "date"
        likeButton.innerText = "Like"
        deleteButton.innerText = "Delete"
        deleteButton.innerText = "Edit"

        quoteInfo.append(quoteString, authorString, likeString, dateTime, likeButton, deleteButton, editButton)
        quoteList.append(quoteInfo)
// this makes those elements editable
    quoteInfo.addEventListener("click", (e)=> {
        e.preventDefault();
            if (e.target == likeButton){
                console.log(quoteObject.id)
               
                fetch(`http://localhost:3000/likes?quoteId=${quoteObject.id}`)
                .then(res => res.json())
                .then(res => {
                    likeArr = res.quoteId 
                })
                nLikes = likeArr        
                //let dateNum = Math.floor(Date.now() / 1000)
                fetch(`http://localhost:3000/likes?quoteId=${quoteObject.id}`,
                 {
                     method: "POST",
                     headers: {
             "Content-Type" : "application/json"
                             },
             body: JSON.stringify({
             quoteId: nLikes + 1,
             createdAt: dateNum
                                 })
                 })
                 .then(res => res.json())
                 .then(res =>{
                    nLikes += 1
                     likeString.innerText = `Likes: ${res.quoteId}`
                     dateTime.innerText = res.createdAt
                     quoteObject.likes.quoteId = res.quoteId
                     quoteObject.likes.createdAt = dateNum
                 })
            }
            else if (e.target == editButton) {
                fetch(`http://localhost:3000/quotes/${quoteObject.id}`,
                {
                    method: "PATCH",
                    headers: {
            "Content-Type" : "application/json"
                            },
            body: JSON.stringify({
            quote: quoteInput.value ,
            author: authorInput.value
                                })
                })
            }
            else{
                e.target.parentNode.remove()
                console.log(quoteObject)
                //e.target.innerText = ""
                //console.log(document.querySelector(`form#${quoteObject.author}`))
            }
        })
    } 
//post

 






    


















})


