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

let sendData = {
    url: "https://prod-76.westus.logic.azure.com:443/workflows/34545c436ff04f18a535e11258c53ad7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QaY6UKMxwRLFyre2HKECVA9N8c_3k2WYfX5ZuYYngrg",

    /*
    +-------------------------------------------------------------------------------------------+
    |                                                                                           |
    |      This function will send the data provided to the url provided as POST request.       |
    |I chose POST over GET since a body with information could be included at all times in POST.|
    |                                                                                           |
    +-------------------------------------------------------------------------------------------+
    */
    interactWithAPI: function (data, url) {
        const headers = {
          'Content-Type': 'application/json'
        };
      
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
      
        return fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    },
    getFormData: function() {
        var formData = fd.data();
        var dtEmail = this.extractData(listOfEmails, "email");
        var dtCompany = this.extractData(listOfEmails, "company");
        delete formData.listOfEmails;

        formData.emailList = dtEmail;
        formData.companyList = dtCompany;

        return formData;
    },
    init: function() {
        this.interactWithAPI(getFormData(), url);
    },
    /*
    +-----------------------------------------------------------------------------------------------+
    |                                                                                               |
    |This function will extract all the values in a column in a data table and return it as an array|
    |                                                                                               |
    +-----------------------------------------------------------------------------------------------+
    */
    extractData: function(dt, col) {
        returnArray = [];
        
        fd.control(dt).value.forEach(row => {
            returnArray.push(row[col]);
        });
        return returnArray;
    }
};

fd.beforeSave(function() {
    sendData.init();
    throw new Error("Preventing you from submitting");
});
