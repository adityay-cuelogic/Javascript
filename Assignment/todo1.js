var addToDo = function () {
    this.todoText = document.getElementById("todo").value;
    if( '' == this.todoText ) {
        alert("Please Enter a value");
        return false;
    } else {
        let table = document.getElementById("todolist1");
        this.init();
        //Add the options to category
        this.category.id=tableLength;
        this.category.disabled=true;
        this.category.options[category.options.length] = new Option("Please select category","-1");
        this.category.options[category.options.length] = new Option("Office","Office");
        this.category.options[category.options.length] = new Option("Personal","Personal");
        this.editButton.onclick=function() {
            changeToDo(this);
        }
        this.tr.appendChild(createAppendElement("td",this.checkbox));
        this.tr.appendChild(createAppendElement("td",this.category));
        this.tr.appendChild(createAppendElement("td",this.textbox));
        this.tr.appendChild(createAppendElement("td",this.date));
        this.tr.appendChild(createAppendElement("td",this.statuses));
        this.tr.appendChild(createAppendElement("td",this.editButton));
        table.appendChild(this.tr);
        setSelectedCategory(this.category.id,document.getElementById("category").value);
    }	
}
var init =  function() {
        this.tableLength = document.getElementById("todolist1").rows.length-1;
        this.tr = document.createElement("tr");       
        this.textbox = document.createElement("input");
        this.category = document.createElement ("select");
        this.checkbox = document.createElement("input");
        this.editButton = document.createElement("input");
        this.statuses = document.createElement("input");
        this.date = document.createElement("input");
        this.statuses = setAttributes(this.statuses,"textbox","Not Done","border: 0;",true);
        this.date = setAttributes(this.date,"date",document.getElementById("date").value,"border: 0;",true);
        this.textbox = setAttributes(this.textbox,"textbox",this.todoText,"border: 0;",true);
        this.checkbox = setAttributes(this.checkbox,"checkbox","","float: left;",false);
        this.editButton = setAttributes(this.editButton,"button","Edit To-do list","float: right;",false);
}
function createAppendElement(element,child) {
    let newElement = document.createElement(element); 
    newElement.appendChild(child);
    return newElement;
};

function setAttributes(element,type,value,style,disabled) {
    element.type = type;
    element.value = value;
    element.style = style;
    element.disabled = disabled;
    return element; 
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