fd.rendered(function () {
    autoPopulateGenInfo();
    $('.autoInfo').hide();
});

async function externalFile() {
    const queryString = window.location.search;
    urlOfJSON = "https://kyleh2420.github.io/initialization.json";
    const data = $.get(urlOfJSON);
    return data;
}

function autoPopulateGenInfo() {
    externalFile().then(function(data){
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
            }
         
        });
    });
}