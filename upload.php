<?php
//make sure captured data exists
if(isset($_FILES['files']) && !empty($_FILES["files"])) {
    //upload destination directory(folder)
    $upload_destination = "uploads/";

    //move the temporary files to the new directory
    for($i = 0; $i < count($_FILES["files"]["tmp_name"]); $i++) {
        $file = $upload_destination.$_FILES['files']['name'][$i];
        move_uploaded_file($_FILES["files"]["tmp_name"][$i], $file);
    }

    echo "Upload Complete";
}