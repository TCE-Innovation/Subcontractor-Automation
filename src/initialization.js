preconfigured = {
	"sc.GI.federallyFunded": "Yes"
};

fd.rendered(function () {
    autoPopulateGenInfo();
    validation.init();
    $('.autoInfo').hide();
});

fd.beforeSave(function() {
    sendData.init();
    //throw new Error("Preventing you from submitting");
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
    url: "https://prod-97.westus.logic.azure.com:443/workflows/79624e3979234007ac16711c3885e1d1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mvPb8uflUl-q1IfGlGahKamYT0UBPRQm4MUMOlTczrA",

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
        //delete formData.listOfEmails;

       // formData.emailList = this.extractData("listOfEmails", "email");
        //formData.companyList = this.extractData("listOfEmails", "company");

        return formData;
    },
    init: function() {
        this.interactWithAPI(this.getFormData(), this.url);
    },
    /*
    +-----------------------------------------------------------------------------------------------+
    |                                                                                               |
    |This function will extract all the values in a column in a data table and return it as an array|
    |        Both parameters are strings                                                            |
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

let validation = {
    namesOfDataTables: [],

    getDataTables: function () {
        return Object.keys(fd.data()).filter((name) => /dt./.test(name));
    },
    init: (function() {
        var executed = false;
        return function() {
            if (!executed) {
                executed = true;
                this.namesOfDataTables = this.getDataTables();
                this.completeTableValidator.add(this.namesOfDataTables);
                this.columnValidators();
            }
        };
    })(),
    completeTableValidator: {
        //Checks that the table has 
        add: function (dtArray) {
            dtArray.forEach(el => {
                fd.control(el).addValidator({
                    name: 'DataTable' + el,
                    error: 'Please fill out the data table completely',
                    validate: (value) => {
                        return this.isDTFilled(el);
                    } 
                })
            })
        },
        isDTFilled: function (dtName) {
            let returnValue = true;
            fd.control(dtName).value.forEach(row => {
                row.forEach(el => {
                    //Here we have the actual values of the items themselves. If the value is "", null, or undefined, the user has left it blank
                    //Thus, we should throw an error
                    if (el === "" || el === null || el === undefined || el == []) {
                        //return false to indicate an error
                        returnValue = false;
                    }
                })
            })
            //If we loop through everything and it hasn't triggered the false condition, then the whole table is true
            return returnValue;
        },
    },
    columnValidators: function() {
        //For each data table, search through all columns
        this.namesOfDataTables.forEach(el => {
            let dtColumns = [];
            let emailFormat = [];
            //Obtain all the internal column names of the given data table
            fd.control(el).columns.forEach(column => {
                if(column.field !== undefined) {
                    dtColumns.push(column.field);
                }
            })
            //Isolate all the columns within the data table that may require proper formatting.
            emailFormat = dtColumns.filter((item) => /email/i.test(item));

            //Phone Formatting
            emailFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Please correct the formatting.',
                    validate: (value) => {
                        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
                    } 
                })
            })
        })
    },
    //I'm shoehorning this in last minute, I didn't realize this was a problem
    //This function will validate all masked text so that you cannot submit while there is an underscore
    //An underscore is used to indicate an unfilled character in a masked text
    validateMT: function() {

        //Filter for all items containing masked text: return an array
        var condition = new RegExp("^mt.");
        var mtFields = [];
        fd.fields().filter(function (el) {
            if(condition.test(el.internalName)) {
                mtFields.push(el.internalName);
            }
        });

        //Validator: If there is still an _, then it isn't complete
        mtFields.forEach(el => {
            fd.field(el).addValidator({
                name: fd.field(el).title,
                error: "Please fill out this field",
                validate: function(value) {
                    return !/_/i.test(value);
                }
            })
        })
    }

};
