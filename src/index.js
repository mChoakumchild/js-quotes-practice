let quoteInput = document.querySelector("input#new-quote")
let authorInput = document.querySelector("input#author")
let quoteForm = document.querySelector("form#new-quote-form")
let submitButton = document.querySelector("button.btn")
let quoteList = document.querySelector("ul#quote-list")
let dateNum = Math.floor(Date.now() / 1000)

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

//when the submit button is pressed we need to take the usr inputs and respond 
//with new dom elements
    quoteForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        //console.log('hello')
        
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(res =>{
            res.forEach( obj => {
                if (authorInput.value == obj.author){
                    console.log(obj)
                    quoteFunction(obj) 

                }
            })
        })
    })      
  function likedef (nLikes = 0) {
            return nLikes
  }

    function quoteFunction(quoteObject) {
        let quoteInfo = document.createElement('form')
            quoteInfo.className = quoteObject.author
        let quoteString = document.createElement('h2')
        let authorString = document.createElement('li')
        let likeString = document.createElement('li')
        let dateTime = document.createElement('li')
        let likeButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        let nLikes = quoteObject.likes.quoteId
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

        quoteInfo.append(quoteString, authorString, likeString, dateTime, likeButton, deleteButton)
        quoteList.append(quoteInfo)

    quoteInfo.addEventListener("click", (e)=> {
        e.preventDefault();
            if (e.target == likeButton){
                //console.log("hahaha")
               
                POSTverb(quoteObject, likeString, dateTime, nLikes)
                
            }
            else{
                e.target.parentNode.remove()
                //e.target.parentNode.remove()
                //console.log(document.querySelector(`form#${quoteObject.author}`))
            }
        })
    } 
//post

 function POSTverb(quoteObject, likeString, dateTime, nLikes) { 
    let dateNum = Math.floor(Date.now() / 1000)
       return fetch(`http://localhost:3000/quotes/${quoteObject.id}/likes`,
        {
            method: "POST",
            headers: {
    "Content-Type" : "application/json"
                    },
    body: JSON.stringify({
    "quoteId": nLikes + 1,
    "createdAt": dateNum
                        })
        })
        .then(res => res.json())
        .then(res =>{
            console.log("hahaha")
            // Update the DOM
            likeString.innerText = `Likes: ${res.quoteId}`
            dateTime.innerText = res.createdAt
            //update object in mem
            quoteObject.likes.quoteId += 1
            quoteObject.likes.createdAt = dateNum
        })
}






    


















})


