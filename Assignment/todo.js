function addToDo() {
    var todoText = document.getElementById("todo").value;
    if( '' == todoText ) {
        alert("Please Enter a value");
        return false;
    } else {
        var table = document.getElementById("todolist1");
        let tableLength = document.getElementById("todolist1").rows.length-1;
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var textbox = document.createElement("input");
        var category = document.createElement ("select");
        var checkbox = document.createElement("input");
        var editButton = document.createElement("input");
        var status = document.createElement("input");
        var date = document.createElement("input");
        status.type="textbox";
        status.disabled=true;
        status.value="Not Done";
        status.style="border: 0;";
        date.type="date";
        date.disabled="true";
        date.value = document.getElementById("date").value;
        //Add the options
        category.id=tableLength;
        category.disabled=true;
        category.options[category.options.length] = new Option("Please select category","-1");
        category.options[category.options.length] = new Option("Office","Office");
        category.options[category.options.length] = new Option("Personal","Personal");
        textbox.type="textbox";
        textbox.value=todoText;
        textbox.style="border: 0;";
        textbox.disabled=true;
        checkbox.type="checkbox";
        checkbox.style="float: left;";
        editButton.type="button";
        editButton.style="float: right;";
        editButton.value="Edit To-do list";
        editButton.onclick=function() {
            changeToDo(this);
        }
        td1.appendChild(category);
        td2.appendChild(checkbox);
        td3.appendChild(textbox);
        td4.appendChild(date);
        td5.appendChild(status);
        td.appendChild(editButton);
        tr.appendChild(td2);
        tr.appendChild(td1);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td);
        table.appendChild(tr);
        setSelectedCategory(category.id,document.getElementById("category").value);
    }	
}

function deleteOrDoneMultiple(job) {
    var objTable = document.getElementById("todolist1");
    var counter = 0;
    if (objTable.rows.length >= 1) {
        for (var i = 1; i < objTable.rows.length; i++) {
            var chk = objTable.rows[i].cells[0].childNodes[0];
            if (chk.checked && job =="delete") {
                objTable.deleteRow(i);
                i--;
                counter = counter + 1;
            } else if(chk.checked && job =="done") {
                objTable.rows[i].cells[4].childNodes[0].value='Done';
                counter = counter + 1;
            }
        }
    if (counter == 0) {
        alert("Please select the row that you want to delete.");
    }
    }else{
        alert("There are no rows being added");
    }
}

function changeToDo(editbuttonObject) {
    editbuttonObject.value ="Save";
    for(let i=1;i<=3;i++)
        fieldObject = editbuttonObject.parentNode.parentNode.childNodes[i].firstChild.disabled = false;

    editbuttonObject.onclick=function() {
        for(let i=1;i<=3;i++)
            fieldObject = editbuttonObject.parentNode.parentNode.childNodes[i].firstChild.disabled = true;
        fieldObject.disabled =true;
        editbuttonObject.value ="Edit To-do list";
        editbuttonObject.onclick=function() {
        changeToDo(this);
        }
    }
}

function searchToDoList(text) {
    var objTable = document.getElementById("todolist1");
    for (var i = 1; i < objTable.rows.length; i++) {
        if (document.getElementById("todolist1").rows[i].cells[2].childNodes[0].value == text) {
            document.getElementById("todolist1").rows[i].style.display="";
        } else {
                document.getElementById("todolist1").rows[i].style.display="none";
        }
    }
    if(text==""){
        for (var i = 1; i < objTable.rows.length; i++) 
            document.getElementById("todolist1").rows[i].style.display="";
    }
}

function sortToDoList(field) {
    var objTable = document.getElementById("todolist1");
    for(var j = 1; j < (objTable.rows.length); j++) {
        for (var i = j+1; i < (objTable.rows.length); i++) {
            if(objTable.rows[j].cells[field].childNodes[0].value < objTable.rows[i].cells[field].childNodes[0].value) {
            objTable.rows[i].cells[field].parentNode.parentNode.insertBefore(objTable.rows[i].cells[field].parentNode,objTable.rows[j].cells [field].parentNode);
            }
        }
    }
}

function setSelectedCategory(categoryId,valueToSet) {
    var objSelect = document.getElementById(categoryId);
    for (var i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].text== valueToSet) {
            objSelect.options[i].selected = true;
        }
    }
}

function filterDateByRange(fromDate,toDate){
    if(fromDate === "" || toDate === ""){
        alert("Please select both dates");
        return false;
    } else {
        var objTable = document.getElementById("todolist1");
        for (var i = 1; i < objTable.rows.length; i++) {
            let rowData = document.getElementById("todolist1").rows[i].cells[3].childNodes[0].value;
            if ( rowData >= fromDate && rowData<= toDate) {
                document.getElementById("todolist1").rows[i].style.display="";
            } else {
                document.getElementById("todolist1").rows[i].style.display="none";
            }
        }
    }
}