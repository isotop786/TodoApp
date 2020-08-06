







// update and delete frontEnd
document.addEventListener('click', e => {
    
    // delete
    if (e.target.classList.contains('delete-me')) {
        if (confirm("Are you sure?")) {
            axios.post('/delete-item', { id: e.target.getAttribute('data-id') }).then(
                e.target.parentElement.parentElement.remove()

            ).catch()
        }
    }
    
    
    
    //updatde feature
    if (e.target.classList.contains('edit-me')) {
        let input = prompt("Edit your Todo",e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
        if(input){

            axios.post('/update-item', { text: input, id: e.target.getAttribute('data-id') }).then(
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = input
        ).catch(e=>{console.log(e)})
        } 
    }
})