fd.rendered(function () {
    autoPopulateGenInfo();
});

async function externalFile() {
    const queryString = window.location.search;
    urlOfJSON = "https://kyleh2420.github.io/initialization.json";
    const data = $.get(urlOfJSON);
    return data;
}

function autoPopulateGenInfo() {
    externalFile().then(function(data){
    let editable = [];
        try{const {EditableItems: editableItems} = data;
            editable = editableItems;
            //console.log("Theres editible content!");
        }
        catch(err) {
            //console.log("There is nothing editable in this document");
        }
        
//Any un-autofilled code should be editable. Thus, we reset before disabling.
        fd.fields().forEach(el => {
            fd.field(el.internalName).disabled = false;
        });

        //Finally, we will fill each key in
        Object.entries(data).forEach(el => {
            const [elKey, elValue] = el;

            try{
                fd.field(elKey).value = elValue;
                if (!editable.includes(elKey) && elKey !== "EditableItems") {
                    fd.field(elKey).disabled = true;
                }
            }
            catch(err) {
                console.log("Failed Autofill Key: " + elKey + ". Value: "+ elValue);
                console.log("Does editable include elKey?: " + editable.includes(elKey));
            }
         
        });
    });
}