preconfigured = {
	"sc.GI.federallyFunded": "Yes"
};

fd.rendered(function () {
    autoPopulateGenInfo();
    $('.autoInfo').hide();
});

/*
async function externalFile() {
    const queryString = window.location.search;
    urlOfJSON = "https://kyleh2420.github.io/Submissions/initialization.json";
    const data = $.get(urlOfJSON);
    return data;
}

*/
function autoPopulateGenInfo() {
    Object.entries(preconfigured).forEach(el => {
        const [elKey, elValue] = el;
        try{
            fd.field(elKey).value = elValue;
            fd.field(elKey).disabled = true;
        }
        catch(err) {
            console.log("Failed Autofill Key: " + elKey + ". Value: "+ elValue);
        }
     
    });

    /*
        This code was used previously to extract data from an outside JSON file.
        We've determined this to be unnecessary, and that the code would be simpler without this.

    */
    /*
    externalFile().then(function(data){
        //Finally, we will fill each key in
        Object.entries(data).forEach(el => {
            const [elKey, elValue] = el;
            try{
                fd.field(elKey).value = elValue;
                fd.field(elKey).disabled = true;
            }
            catch(err) {
                console.log("Failed Autofill Key: " + elKey + ". Value: "+ elValue);
            }
         
        });
    });
    */
}