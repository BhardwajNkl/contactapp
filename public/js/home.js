const deleteBtns = document.getElementsByClassName("delete-contact-button");
const editBtns = document.getElementsByClassName("edit-contact-button");
const addContactBtn = document.getElementById("add-contact-button");
const searchInput = document.getElementById("search-input-name");


// event binding on add contact button
addContactBtn.addEventListener("click", () => {
    // hide update contact form and show add contact form
    const addContactArea = document.getElementById('add-contact-area');
    const updateContactArea = document.getElementById('update-contact-area');
    updateContactArea.style.display = "none";
    addContactArea.style.display = "block";
})

// event binding on delete buttons
for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener("click", () => {
        // now get the contact id to edit contact
        const contactId = btn.getAttribute("data-contactId");
        console.log(contactId);

        // delete request
        fetch(
            `/delete/${contactId}`,{
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({id:contactId})
            }
        ).then(success=>{
            console.log("deleted");
            window.location.href ="/";
        }).catch(error=>{
            console.log("failed");
            window.location.href="/";
        })
    })
}

// event binding on edit buttons
for (let i = 0; i < editBtns.length; i++) {
    const btn = editBtns[i];
    btn.addEventListener("click", () => {

        // hide add contact form and show update contact form
        const addContactArea = document.getElementById('add-contact-area');
        const updateContactArea = document.getElementById('update-contact-area');
        addContactArea.style.display = "none";
        updateContactArea.style.display = "block";

        // now get the contact id to edit contact
        const contactId = btn.getAttribute("data-contactId");
        console.log(contactId);
        // now, set the data for edit form
        const updateContactForm = document.getElementById("update-contact-form");
        updateContactForm.setAttribute("data-contactId", contactId);

        // also, fill this form with existing data
        const listRow = document.getElementById(contactId);
        var name = listRow.querySelector("strong").textContent;
        var mobileNumber = listRow.querySelector("span").textContent;
        updateContactForm[0].value = name;
        updateContactForm[1].value = mobileNumber;

        // edit the form's action url
        updateContactForm.setAttribute("action","/update/"+contactId)
    })
}

// event binding on search input
searchInput.addEventListener("input",()=>{
    const outputElement = document.getElementById("search-output");
    //outputElement.innerText = searchInput.value;

    // get current name value and send search request to the server
    const searchName = searchInput.value;
    const name = searchName.trim();
    if(name.length > 0){

        fetch(
            "/search",
            {
                method: "post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name})
            }
            ).then(success=>{
                if(success.status === 200){
                    //outputElement.innerText="found";
                    return success.json();
                } else{
                    //outputElement.innerText = "not found"
                    throw new Error("Not found");
                }
            }).then(
                (data)=>{
                    //console.log(data);
                    // using this data show result
                    outputElement.innerHTML = "Result: <strong class='bg-success'>"+data.name+"</strong> : "+data.mobile;
                }
            ).catch(error=>{
                outputElement.innerHTML = "Result: <strong class='bg-danger'>Not found</strong>";
            }).catch(error=>{
                console.log("server error")
            })
        }

        else{
            // clear the search result line
            outputElement.innerHTML = "";
        }

})
