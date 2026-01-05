const uploadForm = document.querySelector(".upload-form")
const filesInput = document.querySelector("#files")

filesInput.onchange = () => {
    //append file names to the label
    uploadForm.querySelector("label").innerHTML = ""
    for(let i = 0; i < filesInput.files.length; i++) {
        uploadForm.querySelector("label").innerHTML += "<span>" + filesInput.files[i].name + "</span>"
    }
}

uploadForm.onsubmit = event => {
    event.preventDefault();

    //make sure files are selected
    if(!filesInput.files.length) {
        uploadForm.querySelector(".result").innerHTML = "Please select a file!"
    }
    else {
        let uploadFormData = new FormData(uploadForm)

        //initialize AJAX
        let request = new XMLHttpRequest()

        //ensure request method is post
        request.open("POST", uploadForm.action)

        //attach progress event handler to AJAX request
        request.upload.addEventListener("progress", event => {
            //add current progress to the button
            uploadForm.querySelector("button").innerHTML = "Uploading... " + "(" + ((event.loaded/event.total)*100).toFixed(2) + "%)"

            //update progress bar
            uploadForm.querySelector(".progress").style.background = "linear-gradient(to right, #25b350, #25b350 " + Math.round((event.loaded/event.total)*100) + "%, #e6e8ec " + Math.round((event.loaded/event.total)*100) + "%)"
            
            //disable submit button
            uploadForm.querySelector("button").disabled = true
        })

        //following code will execute when the request is complete
        request.onreadystatechange = () => {
            if(request.readyState == 4 && request.status == 200) {
                //output response message
                uploadForm.querySelector(".result").innerHTML = request.responseText
                // ✅ Reset UI back to original state
                uploadForm.querySelector("button").disabled = false;
                uploadForm.querySelector("button").innerHTML = "Upload";
                uploadForm.querySelector(".progress").style.background = "";
                uploadForm.querySelector("label").innerHTML = "Select files ..."
                uploadForm.reset();
            }
        }

        //execute request
        request.send(uploadFormData)
    }
}
