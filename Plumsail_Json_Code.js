/*******************************************************************************************************
* The code from this section is executed once the form is loaded.                                      *
*                                                                                                      *
* Depending on the stage of the form lifecycle when a particular action should be performed,           *
* you can use on the following hooks:                                                                  *
*                                                                                                      *
* fd.rendered()     the code is executed once the form is rendered                                     *
*                                                                                                      *
* fd.beforeSave()   the code is executed right before saving the form. If returns Promise, the saving  *
*                   does not proceed until the Promise is resoved. If the Promise is rejected,         * 
*                   the saving interrupts. This is the appropriate place for adding custom validation. *
*                                                                                                      *
* fd.saved()        the code is executed once the form is submitted                                    *
*                                                                                                      *
*
*   The following events are possible:
*       fd.beforeCreate()
*       fd.created()
*       fd.beforeRender()
*       fd.rendered()
*       fd.beforeSave()
*       fd.saved()
*
*
* The following predefined variables can be utilized in the code:                                      *
*                                                                                                      *
* fd    an instance of the current form                                                                *
* $     jQuery object                                                                                  *
*                                                                                                      *
*******************************************************************************************************/

// ================================================================
//  EXAMPLE 1: The code is executed right after rendering the form 
// ================================================================
fd.rendered(function () {
    
    //Functions that run initially
    autoPopulateGenInfo();
    toggleFields();
    genSummary();

    //Items that change on action
    onActionItems = ['CorpOrCoPartner', 
    'B1Question',
    'ScheduleF3Q3',
    'ScheduleBQuestion',
    'F3NA',
    'RMSAQuestion'];
    onActionItems.forEach(field => fd.field(field).$on('change',toggleFields));

    /*

    fd.control('InsurancePremium').$on('change', function(value) {
        //Autopopulates the premium row in OCIP B Section II
        if (value) { //If there are records in the table
            for (var i = 0; i < value.length; i++) {
                value[i].set('Premium', value[i].payroll * value[i].wCRate / 100);
            }
        }

        var workHours = 0;
        var estPayroll = 0;
        var premium = 0;
        //Autopopulates the totals below the data table
        if (value) {
            for (var i = 0; i < value.length; i++) {
                workHours += value[i].workHours;
                estPayroll += value[i].payroll;
                premium += value[i].premium;
            }

            fd.field("WorkHoursTotal").value = workHours;
            fd.field("EstimatedLimitedPayrollTotal").value = estPayroll;
            fd.field("PremiumTotal").value = premium;
        }
    });

    */
    //This item ontrols the summary tab at the very end.
    //fd.fields().forEach(field => field.$on('change', genSummary));
});

function dataTableCalculator() {

}

/*
// ========================================================
//  EXAMPLE 2: The code is executed before saving the form
// ========================================================
fd.beforeSave(function () {

    // Prevent saving if StartDate is greater than EndDate
    if (fd.field('StartDate').value > fd.field('EndDate').value) {
        throw Error('Start Date must not be greater than End Date.');
    }
});


// =============================================================
//  EXAMPLE 3: The code is executed right after saving the form
// =============================================================
fd.saved(function (result) {

    // Forward users to a custom Thank You page with a parameter
    window.location = 'https://mysite.com/thank-you?email=' + fd.field('Email').value;
});
*/



/*
    The following are user defined functions - functions that help with the functionality of the page
*/

/*
    This function will call a specific JSON file if specified in the URL. If none is specified, it will rely on the
    default one to produce the functionality this form.
*/
async function externalFile() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    jsonFileName = urlParams.get('loc')
    console.log(urlParams);
    if (jsonFileName === null) {
    urlOfJSON = "https://kyleh2420.github.io/default.json";
    } else {
        urlOfJSON = "https://kyleh2420.github.io/" + jsonFileName + ".json";
    }
    const data = $.get(urlOfJSON);
    return data;
}

function autoPopulateGenInfo() {
    externalFile().then(function(data){
        /*
            The following shows two ways of object deconstruction of multiple objects and subarrays
            Say we are given the following JSON file in "data"
                        {
                            "GeneralInformation": {
                                "GeneralContractor": "JTTC",
                                "GCAddress": "1010 Northern Blvd, Great Neck, NY 11021",
                                "ContractNo": "A-37139",
                                "FederallyFunded": "Yes"
                            },
                            "SQS": {
                                "ProposedSub": "IEEE Inc.",
                                "Business Address": "600 Circle Road, Stony Brook, NY 11790",
                                "CorpOrCoPartner": "Corporation"
                            }
                        }
            We can extract the objects "GeneralInformation" and "SQS" as its own objects like below. 
            It will then be available for reference as "GeneralInformation" and "SQS"
                        const {GeneralInformation, SQS} = data;
                            Use: GeneralInformation.GeneralContractor
            
            You can do the same, but rename the variables that would be referenced.
            The following will now be available for reference as "GI" or "Form1"
                        const {GeneralInformation: GI, SQS: Form1} = data;
                            Use: GI.GeneralContractor
            
            Alternatively, you could deconstruct a specific object in the code, such as by isolating "GeneralInformation".
            Thus, you will be able to use the variables "GC", "GCAddy", "CNo" in your code
                        const{
                            GeneralInformation: {
                                GeneralContractor: GC,
                                GCAddress: GCAddy,
                                ContractNo:CNo,
                            },
                        } = data;
        */

/*
This bit of code controls the autofill behavior. First, we will look for an arry in the JSON
called "EditableItems". This indicates the autofilled items that should be editable. Otherwise, autofilled items
are not editable. Anything not mentioned is not named".
*/
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
    })
}
/*
    This function will toggle all the disappearing/conditional fields and update every them every time 
    it is called. When called, it will attempt to hide/show fields that correspond to the css class.

*/

//To be more efficient (And not run everything all at once) turn this function into an object
//And call upong specific portions in the object
function toggleFields() {
    var formFields = fd.fields();

    //Toggles the SQS Form
    if (fd.field('CorpOrCoPartner').value === 'Corporation'){
        $('.SQSCorporation').show();
        $('.SQSCoPartnership').hide();

        formFields.forEach(field => {
            if (field.$el.closest('.SQSCorporation') != null) {
                field.required = true;
            }
            if (field.$el.closest('.SQSCoPartnership') != null) {
                field.required = false;
            }
        })

    } else if (fd.field('CorpOrCoPartner').value === 'Co-partnership') {
        $('.SQSCorporation').hide();
        $('.SQSCoPartnership').show();

        formFields.forEach(field => {
            if (field.$el.closest('.SQSCorporation') != null) {
                field.required = false;
            }
            if (field.$el.closest('.SQSCoPartnership') != null) {
                field.required = true;
            }
        })

    } else {
        $('.SQSCorporation').hide();
        $('.SQSCoPartnership').hide();

        formFields.forEach(field => {
            if (field.$el.closest('.SQSCorporation') != null) {
                field.required = false;
            }
            if (field.$el.closest('.SQSCoPartnership') != null) {
                field.required = false;
            }
        })
    }

    //Toggles Schedule F, Form F3
    if (fd.field('F3NA').value === 'Not Applicable'){
        $('.ScheduleFFormF3').hide();
    } else {
        $('.ScheduleFFormF3').show();
    }
    toggleReq(formFields, "ScheduleFFormF3");

    //Toggles Schedule B
    if(fd.field('ScheduleBQuestion').value === 'I need to fill out schedule B'){
        $('.ScheduleBClass').show();
    } else{
        $('.ScheduleBClass').hide();
    }
    toggleReq(formFields, "ScheduleBClass");

    //Toggles Schedule B1
    if(fd.field('B1Question').value === 'I need to fill out Schedule B1'){
        $('.ScheduleB1Class').show();
    } else{
        $('.ScheduleB1Class').hide();
    }
    toggleReq(formFields, "ScheduleB1Class");

    //Toggles F3 Materials List
    if(fd.field('ScheduleF3Q3').value === 'b. Material Change') {
        $('.ScheduleF3MaterialChange').show();
    } else{
        $('.ScheduleF3MaterialChange').hide();
    }

    //Toggles the visibiliy and requirement of the RMSA form
    if(fd.field('RMSAQuestion').value === 'Yes') {
        $('.RMSAControl').show();
    } else {
        $('.RMSAControl').hide();
    }
    toggleReq(formFields, "RMSAControl");
}
//This function assists in removing the required for all fields inside a given list
function toggleReq(list, name) {
    list.forEach(field => {
        if (field.$el.closest("." + name) != null) {
            field.required = !field.required;
        }
    })
}


// this function will generate divs that include the titles of containers and titles and values of fields within each one

function genSummary() {

    // get reference to parent container element

    const summaryContainer = document.getElementById('data-preview');

    summaryContainer.innerHTML = "";

    // create table element

    const table = document.createElement("table");




    // create table header row

    const headerRow = document.createElement("tr");

    const headerTitles = ["Title", "Value"];




    headerTitles.forEach(ht => {

        const th = document.createElement("th");

        th.textContent = ht;

        headerRow.appendChild(th);

    });

    table.append(headerRow);




    // create table rows for JSON data

    fd.fields().forEach(field => {

        const row = document.createElement("tr");




        // create table cells for each property in JSON object

        const cellTitle = document.createElement("td");

       

        //console.log(field.title);

        //console.log(field.value);

        const titleCell = document.createElement("td");

        titleCell.textContent = field.title;

        row.appendChild(titleCell);

        const valueCell = document.createElement("td");

        valueCell.textContent = field.value;

        row.appendChild(valueCell);

        table.appendChild(row);

    })

    summaryContainer.append(table);

}