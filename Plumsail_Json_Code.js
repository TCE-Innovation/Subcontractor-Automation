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

/*
+--------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                          |
|This function is executed after the form is rendered and sets up the event listeners for various form fields and controls.|
|                               It is the primary base point for where things are run from.                                |
|                                                                                                                          |
+--------------------------------------------------------------------------------------------------------------------------+
*/
fd.rendered(function () {
    
    //Functions that run initially
    executeOnce();
});


/*
+-----------------------------------------------------------------------------------------------------+
|                                                                                                     |
|This function, fd.beforeSave(), is a pre-save hook that gets executed before the form data is saved. |
|                                                                                                     |
|    It is set up to perform an API interaction to send the form data to a specified URL endpoint.    |
|                                                                                                     |
|The API interaction is achieved by invoking a Power Automate Flow, which listens for an HTTP request.|
|                                                                                                     |
|                      @returns {void} This function does not return any value.                       |
|                                                                                                     |
+-----------------------------------------------------------------------------------------------------+
*/
fd.beforeSave(function () {
    url = "https://prod-102.westus.logic.azure.com:443/workflows/1128de5c7a7e488e9e88a34f00eb974b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B_VCWVNlWNAnOJfI9ytYCVZGVLNLkvYBq2iMluENAI0";
    data = fd.data();
    apiInteraction(data, url)
});


/*
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                                          |
|This variable, executeOnce, is assigned an immediately-invoked function expression (IIFE) to ensure that its inner code block runs only once. This is done to handle initialization tasks.|
|                                                                      If it hasn’t executed, it does the following:                                                                       |
|                             autopopulate(): This function is called to auto-populate certain fields with predefined values during the form's initialization.                             |
|                             disableFields(): This function is called to disable specific form fields to prevent user input or editing during initialization.                             |
|                             calculateOCIPBValues(): This function is called to perform calculations and auto-populate certain fields related to the OCIP B section.                      |
|                             @returns {void} This function does not return any value.                                                                                                     |
|                                                                                                                                                                                          |
|                                                                                                                                                                                          |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
var executeOnce = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            autopopulate();
            dataTableFunctions.initialize();
            attachmentFunctions.initialize();
        }
    };
})();


/*
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                         |
|            This function, getKnownInfo(), is designed to parse the query in the URL to extract specific parameters (contract number and subcontractor name).            |
|It then constructs an object ('infoToSend') with these parameters and passes it to another function named 'apiInteraction' to retrieve JSON data from an external source.|
|                                                                                                                                                                         |
|                              @returns {Promise} A promise that resolves with the contents of the JSON file fetched from the specified URL.                              |
|                                                                                                                                                                         |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
/*
    This function will parse the query in the URL, then pass this information into a function that returns a promise
    to the contents of some JSON file.
*/
function getKnownInfo() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    contractNumber = urlParams.get('contract');
    subcontractorName = urlParams.get('subName');
    let infoToSend = {
        "Contract": contractNumber,
        "subName": subcontractorName
    }
    
    const url = "https://prod-73.westus.logic.azure.com:443/workflows/9f7be33c84d844ecadd0baaef7cd1a7e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=faXNcybrgh-3IH3KD7V7wloZaKsSEshlye4N9siJdNw";
    return apiInteraction(infoToSend, url)
    .then(json => {
        //console.log(json);
        return json
    });
}

/*
+--------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                            |
|This function, apiInteraction, is a helper function used to interact with an API endpoint and retrieve JSON data that should be auto-filled.|
|             It performs an HTTP POST request to the specified 'url' with the provided 'contract' data as the request payload.              |
|                                                                                                                                            |
|                        @param {Object} contract - An object containing the required parameters for the API request.                        |
|                        @param {string} url - The URL of the API endpoint to interact with.                                                 |
|                        @returns {Promise} A promise that resolves with the JSON data fetched from the API.                                 |
|                                                                                                                                            |
+--------------------------------------------------------------------------------------------------------------------------------------------+
*/
/*
    This function will call upon our makeshift API to retrieve a promise of data that should be autofilled.
*/
function apiInteraction(contract, url) {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(contract)
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
}

/*
This bit of code controls the autofill behavior. First, we will look for an arry in the JSON
called "EditableItems". This indicates the autofilled items that should be editable. Otherwise, autofilled items
are not editable. Anything not mentioned is not named".
*/
function autopopulate() {
    //3 step process
    //Clear all items: nothing can be saved in memory
    //Read the external JSON file and autofill all items
    //Extract editable fields
    //Loop through each field and control in the form. If the item has a value or is not on the "editable items" list, disable
    fd.clear();
    //Any un-autofilled code should be editable. Thus, we reset before disabling.
    fd.fields().forEach(el => {
        fd.field(el.internalName).disabled = false;
    });

    //Extract the items that should be editable
    getKnownInfo().then(function(data){
        fd.data(data);

        let editable = [];
        try{const {editableItems: editableItems} = data;
            if (editableItems !== undefined) {
                editable = editableItems;
            }
        }
        catch(err) {
            console.log("There is nothing editable in this document");
        }

        //There are fields with different elements. If a text or note is unfilled, it is simply null
        //When a single choiceis empty, it is "" or null - I've seen it both ways. 
        //When a multiple choice is empty, it's array is length 0.
        //Due to the different ways to check if a field is empty, we must isolate these by internal name first, then check for their respective emptyness indicators
        //Text internal name: t.
        //Note: n.
        //Radial Internal Name: sc
        //Drop Down: dd
        //masked text: mt
        //date: d.
        //num: nu
        //Multiple Choice: mc
        //If the respective values are filled, and they don't need to be edited, then they're set to disabled

        fd.fields().forEach(el => {
            try {
                let internalName = el.internalName;
                if (!editable.includes(el.internalName)) {
                    switch(internalName.substr(0, 2)) {
                        //When a single choice has not been selected, its value is ""
                        //I have also seen it as null
                        //To cover all possible scenerios, it has its own case statement that checks for both
                        case "sc":
                            if(fd.field(el.internalName).value === "") {
                                fd.field(el.internalName).disabled = false;
                            } else if(fd.field(el.internalName).value === null) {
                                    fd.field(el.internalName).disabled = false;
                            } else {
                                fd.field(el.internalName).disabled = true;
                            }
                            break;
                        //When the following has not been edited by the user, its value is null
                        case "t.":
                        case "dd":
                        case "mt":
                        case "d.":
                        case "nu":
                        case "n.":
                            if(fd.field(el.internalName).value !== null) {
                                fd.field(el.internalName).disabled = true;
                            }
                            break;
                        //When the following has not been edited by the user, its length is 0
                        case "mc":
                            if (fd.field(el.internalName).value.length !== 0) {
                                fd.field()(el.internalName).disabled = true;
                            }
                            break;
                        default:
                            fd.field(el.internalName).disabled = false;
                    }
                }
            } catch (err) {
            }
        });

        //There are controls with no values, such as buttons, text, html elements, etc
        //We have formatted all data tables starting with dt. We must first isolate this.
        //Then, we check if there is anything in the data table. If there is nothing, we should not disable the field.
        //We will also check if it needs to be edited
        fd.controls().forEach(el => {
            try{
                let internalName = el.internalName;
                if(internalName.substr(0, 2) === 'dt' && fd.control(el.internalName).value.length > 0 && !editable.includes(el.internalName)) {
                    fd.control(el.internalName).disabled = true;
                }
            } catch (err) {
                //console.log(err);
            }

        });

        //Once we have recieved all the data and have finished autofilling, then set up the event listeners
        eventListener.setUpEventListeners();
    })

    
}
let elFunctions = {
    /*
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    |                                                                                                                                                 |
    |          eventListenerHelper, is a helper function used to set up event listeners for multiple form fields specified in the 'arrayOfEvents'.    |
    |                     Each field listed in the array will trigger the provided 'callbackFcn' function when its value changes.                     |
    |              @param {Array} arrayOfEvents - An array of field internal names for which event listeners should be set up.                        |
    |              @param {Function} callbackFcn - The callback function to be executed when any of the specified fields' values change.              |
    |              @returns {void} This function does not return any value.                                                                           |
    |                                                                                                                                                 |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    */
    eventListenerHelper: function(arrayOfEvents, callbackFcn) {
        arrayOfEvents.forEach(field => fd.field(field).$on('change', (value) => callbackFcn.call(this, value)));
    },
    /*
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                                                              |
|                   This function, showHideInClass, is designed to toggle the visibility of all fields inside a given class based on a specified condition.                    |
|     It operates on the assumption that the fields to be controlled have a common class, and their visibility should change depending on the value of a particular field.     |
|                     @param {string} fieldName - The field for which the change should be triggered.                                                                          |
|                     @param {any} showValue - The value that the specified 'fieldName' should have to show the fields with the given class ('className').                     |
|                     @param {string} className - The class whose visibility will be changing for the fields.                                                                  |
|                     @param {boolean} changeIfRequired - Optional. Indicates whether the fields inside the                                                                    |
|                         class should also change their 'required' status based on visibility. Default is 'true'.                                                             |
|                     @param {Array} dontChangeRequired - Optional. An array of field internal names whose requirement will not                                                |
|                         be affected by the change. Default is an empty array.                                                                                                |
|                     @returns {void} This function does not return any value.                                                                                                 |
|                                                                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
*/
showHideInClass: function(fieldName, showValue, className, changeIfRequired = true, dontChangeRequired = []) {
    var arrayOfValues = [];
    try{
        if(Array.isArray(showValue)) {
            arrayOfValues = arrayOfValues.concat(showValue);
        } else {
            arrayOfValues.push(showValue);
        }
        
        // Check if the value of the specified 'fieldName' matches the 'showValue'.
            // If it matches, show the fields with the given 'className' class; otherwise, hide them.
            if(arrayOfValues.includes(fd.field(fieldName).value)) {
                $("." + className).show();
                // If 'changeIfRequired' is true, set the fields inside the class as required.
                // The 'dontChangeRequired' array is used to specify optional fields whose requirement status will not be affected.
                if (changeIfRequired) {
                    this.setRequiredInClass(true, className, dontChangeRequired);
                }
            } else {
                $("." + className).hide();
                // If 'changeIfRequired' is true, set the fields inside the class as not required.
                // The 'dontChangeRequired' array is used to specify optional fields whose requirement status will not be affected.
                if (changeIfRequired) {
                    this.setRequiredInClass(false, className, dontChangeRequired);
                }
            }
    } catch (err) {
        //console.log(err)
    }

},
//This function assists in removing the required for all fields inside a given class
setRequiredInClass: function(requiredOrNot, name, arrDontChange = []) {
    var formFields = fd.fields();
    var formControl = fd.controls();

        //https://community.plumsail.com/t/disable-all-fields-in-a-grid-container/10249/2

    formFields.forEach(field => {
        if (field.$el.closest("." + name) != null && !arrDontChange.includes(field.internalName)) {
                field.required = requiredOrNot;
        } else if (arrDontChange.includes(field.internalName)) {
                field.required = false;
        }
    })

    formControl.forEach(field => {
        if (field.$el.closest("." + name) != null && !arrDontChange.includes(field.internalName)) {
            field.required = requiredOrNot;
        } else if (arrDontChange.includes(field.internalName)) {
            field.required = false;
    }
    })
},

//This function assumes if an item is visible, it should be required.
//Depending on parameters, it will either make a field go away or appear
//It will control the fields themselves, as opposed to the class that they're in.
//This function is mostly used in Form B

//Important to note: The way this is hidden is fundamentally different from the way classes are hidden.
//Be sure to note: Hiding/Showing a class will not affect the visibility of a field hidden like this
//If parameter is true, will show and require
individualFieldVisibilityAndRequired: function(fieldName, trueOrFalse, dataTableOrField = "Field") {
    switch (dataTableOrField) {
        case "Field": 
        case "field":
            fd.field(fieldName).hidden = !trueOrFalse;
            fd.field(fieldName).required = trueOrFalse;
            break;
        case "DataTable":
        case "datatable":
            fd.control(fieldName).required = trueOrFalse;
            if (trueOrFalse) {
                $(fd.control(fieldName).$el).show();
                } else {
                    $(fd.control(fieldName).$el).hide();
                }
            break;
    }

}
},
let eventListener = {
    //Setting up the arrays of fields that require event listeners
    generalInfoEvents: ['sc.GI.isMailingAddrDiff',
                        'd.GI.projectedStartDate',
                        'd.GI.projectedCompletionDate'
    ],

    isFormRequired: ['sc.SQS.3.corpOrCoPartner', 
                    'sc.SB1.isSB1Required',
                    'sc.SF.FF3.3.reportType',
                    'sc.SB.isSBRequired',
                    'sc.SF.FF3.FF3Applicable',
                    'sc.RMSA.isRequired',
                    'sc.SQS.12.non-UnionOrUnion',
                    'sc.SG.isFormBApplicable'
    ],
    scheduleF: ['sc.SF.FF3.4.primeOrSubawardee'
    ],
    scheduleBPart1: [
        'dd.SB.P1.G.typeOfLegalEntity',
        'sc.SB.P1.organizedUnderForeignCountry'
        
    ],
    scheduleBPart3YesOrNo: ['sc.SB.P3.A.notResponsible',
                            'sc.SB.P3.B.debarred',
                            'sc.SB.P3.C.pendingDebarment',
                            'sc.SB.P3.D.terminated',
                            'sc.SB.P3.E.suretyAgreement',
                            'sc.SB.P3.F.monitor',
                            'sc.SB.P3.G.safety',
                            'sc.SB.P3.H.compensationRating',
                            'sc.SB.P3.attachments'
    ],
    scheduleBPart4YesOrNo: ['sc.SB.P4.A.noloContendere',
                            'sc.SB.P4.B.unfavorableTerminated',
                            'sc.SB.P4.C.subjectOfCrime',
                            'sc.SB.P4.D.disqualifiedBid',
                            'sc.SB.P4.E.refuseTestimony',
                            'sc.SB.P4.F.refuseTestimonyNYS',
                            'sc.SB.P4.G.civilJudgement',
                            'sc.SB.P4.H.deferredProsecution'
    ],
    scheduleBPart5YesOrNo: ['sc.SB.P5.D.bankruptcy',
                            'sc.SB.P5.E.liensExcess',
                            'sc.SB.P5.F.liensToday',
                            'sc.SB.P5.G.failedTax',
                            'sc.SB.P5.I.conflictOfInterest',
                            'sc.SB.P5.N.haveSubsidiaryOrAffiliate',
                            'sc.SB.P5.O.isContractorSubsidiaryOfGroup',
                            'sc.SB.P5.P.ownershipOfOtherEntity'
    ],
    scheduleBPart5: ['sc.SB.P5.D.bankruptcy',
                    'sc.SB.P5.E.liensExcess',
                    'sc.SB.P5.F.liensToday',
                    'sc.SB.P5.G.failedTax',
                    'sc.SB.P5.I.conflictOfInterest',
                    'sc.SB.P5.N.haveSubsidiaryOrAffiliate',
                    'sc.SB.P5.O.isContractorSubsidiaryOfGroup',
                    'sc.SB.P5.P.ownershipOfOtherEntity',
                    'sc.SB.P5.Q.sameBusinessGroup',
                    'sc.SB.P5.C.subcontractor',
                    'sc.SB.P5.H.officeSpace',
                    'sc.SB.P5.J.sharedOffice',
                    'sc.SB.P5.K.1.none',
                    'sc.SB.P5.K.2.none',
                    'sc.SB.P5.K.3.none',
                    'sc.SB.P5.K.4.none',
                    'sc.SB.P5.K.5.none',
                    'sc.SB.P5.L.none',
                    'sc.SB.P5.M.none'
    ],
    scheduleB1: ['sc.SB1.1.attachment'],
    pdfControls: [],
    OCIPA: ['d.OCIP.FA.S2.workersCompEffective','d.OCIP.FA.S2.workersCompExpiration'],

    //Methods
    setUpEventListeners: function() {
        //Items are added here, where they will be called to add onto the arrays
        this.pdfControls = Object.keys(fd.data()).filter((name) => /hidePDF/.test(name));
        this.pdfControls = this.pdfControls.concat(Object.keys(fd.data()).filter((name) => /readAndUnderstood/.test(name)));

        //Sets up the event listeners for each of the fields.
        elFunctions.eventListenerHelper(this.generalInfoEvents, this.generalInfoCallback);
        elFunctions.eventListenerHelper(this.isFormRequired, this.reqForms);
        elFunctions.eventListenerHelper(this.pdfControls, this.togglePDF);
        elFunctions.eventListenerHelper(this.scheduleF, this.toggleSF);
        elFunctions.eventListenerHelper(this.scheduleBPart1, this.toggleSBP1);
        elFunctions.eventListenerHelper(this.scheduleBPart3YesOrNo, this.toggleSBP3);
        elFunctions.eventListenerHelper(this.scheduleBPart4YesOrNo, this.toggleSBP4);
        elFunctions.eventListenerHelper(this.scheduleBPart5, this.toggleSBP5);
        elFunctions.eventListenerHelper(this.scheduleB1, this.toggleSB1);
        this.OCIPAValidator();
        //This is actually an event listener as well, I jsut couldn't figure out how to get this to fit the same format as the others, since it 
        //requires an input value from the event itself. I coudln't figure out how to do this repeating (Although, technically this isn't repeating)
        dataTableFunctions.calculateOCIPBValues();
    },



    

    /*
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    |                                                                                                                                                 |
    |              The function, generalInfoCallback(), handles various tasks related to the "General Information" section of the form.               |
    |                                                                                                                                                 |
    |                                                       It performs the following actions:                                                        |
    |                                                             Load Moment.js Library:                                                             |
    |                             Used to add a date validator to ensure projected completion is after projected start                                |
    |     If the "Projected Completion Date" is not valid or is earlier than or equal to the "Projected Start Date," the validator returns false,     |
    |                            indicating that the date is invalid, and an error message is displayed on the form field.                            |
    |                                                                                                                                                 |
    |                                                      Show/Hide "Mailing Address" Section:                                                       |
    |   The function calls the 'showHideInClass' function, which toggles the visibility of the "Mailing Address" section based on the value of the    |
    |field with the internal name 'sc.GI.isMailingAddrDiff'. If the value is 'Yes', the section with the class 'GeneralInfoMailingAddr' will be shown;|
    |                                                          otherwise, it will be hidden.                                                          |
    |                                                                                                                                                 |
    |                                            @returns {void} This function does not return any value.                                             |
    |                                                                                                                                                 |
    +-------------------------------------------------------------------------------------------------------------------------------------------------+
    */
    //This function will hide or show the "Mailing address" section, if mailing is different from street address.
    //This function will also check to see that the proposes Project End Date is later than the Project start date
    generalInfoCallback: function() {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js')
        .then(function() {
            fd.field('d.GI.projectedCompletionDate').addValidator({
                name: 'Check Date',
                error: 'Completion Date must be after start date',
                validate: function(value) {
                    var projectEnd = moment(fd.field('d.GI.projectedCompletionDate').value);
                    var projectBegin = moment(fd.field('d.GI.projectedStartDate').value);
                    if (projectEnd.isValid() && projectBegin.isValid()) {
                        if(projectEnd.diff(projectBegin, 'days', false) <= 0) {
                            return false;
                        }
                        return true;
                    }
                } 
            })
        })

        elFunctions.showHideInClass('sc.GI.isMailingAddrDiff', 'Yes', 'GeneralInfoMailingAddr');
    }, 
    reqForms: function() {
        /*
        The following are optional forms: Forms that may or may not be filled out by the subcontractor.
        This includes:
            Schedule B1
            Schedule B
            RMSA/SQS
            Schedule F, F3 (Technically, this is a subform, but on the wizard, we've condensed it into its own form)
            Schedule G
        */

        //Toggles Schedule F, Form F3
        elFunctions.showHideInClass('sc.SF.FF3.FF3Applicable', 'Yes', "ScheduleFFormF3", true, ['t.SF.FF3.4.tier', 't.SF.FF3.4.congressionalDistrict', 't.SF.FF3.5.congressionalDistrict',
                                                                                    't.SF.FF3.7.CFDANumber', 't.SF.FF3.8.federalActionNumber', 'num.SF.FF3.9.awardAmount', 'n.SF.FF3.10.b.addr']);    

        //Toggles Schedule B
        elFunctions.showHideInClass('sc.SB.isSBRequired', 'Yes', "ScheduleBClass", true, ['n.SB.P1.D.changedAddress', 't.SB.P1.H.country']);

        //Toggles Schedule B1
        elFunctions.showHideInClass('sc.SB1.isSB1Required', 'Yes', 'ScheduleB1Class', false);
        elFunctions.showHideInClass('sc.SB1.isSB1Required', 'Yes', 'SB1AttachPDF');

        //Toggles the visibiliy and requirement of the RMSA form
        elFunctions.showHideInClass('sc.RMSA.isRequired', 'SQS', 'SQSQuestions', true, ['t.SQS.2a.streetAddr', 't.SQS.2a.city', 'dd.SQS.2a.state', 't.SQS.2a.zipCode']);
        //'d.SQS.3.dateOfOrg', 't.SQS.3.county', 'dt.SQS.3.namesAndAddrsOfPartners'
        elFunctions.showHideInClass('sc.SQS.12.non-UnionOrUnion', 'Union', 'SQSLabor');
        elFunctions.showHideInClass('sc.RMSA.isRequired', 'RMSA', 'RMSAQuestions', true, ['t.RMSA.localManufacturingFacility.streetAddr', 't.RMSA.localManufacturingFacility.city', 'dd.RMSA.localManufacturingFacility.state', 't.RMSA.localManufacturingFacility.zipCode',
                                                                                    //These fields are in SQS, which should be made not required if the user switches over to RMSA. Otherwise, it will softlock them.
                                                                                    'd.SQS.3.incorporationDate', "t.SQS.3.president'sName", "t.SQS.3.vicePresident'sName", "t.SQS.3.treasurer'sName", "t.SQS.3.secretary'sName", "d.SQS.3.dateOfOrg", "t.SQS.3.county", "dt.SQS.3.namesAndAddrsOfPartners",
                                                                                    't.SQS.12.unionName', 't.SQS.12.addr', 't.SQS.12.localNo', 't.SQS.12.telephone']);

            /*
            The following are optional fields inside forms.
            These forms include: 
                Schedule F, F3
                SQS
                Schedule B
        */
        //Toggles the SQS Form
        elFunctions.showHideInClass('sc.SQS.3.corpOrCoPartner', 'Corporation', "SQSCorporation");
        elFunctions.showHideInClass('sc.SQS.3.corpOrCoPartner', 'Co-partnership', "SQSCoPartnership");

        //Toggles F3 Materials List
        elFunctions.showHideInClass('sc.SF.FF3.3.reportType', 'b. Material Change', 'ScheduleF3MaterialChange');

        //Toggles the Schedule G requirement
        elFunctions.showHideInClass('sc.SG.isFormBApplicable', 'Yes', 'SGInfo');
    },

    togglePDF: function() {
        /*
            The following toggles the PDFs and ensures that the reader has viewed the PDF before moving onto the questions.
            Every form except OCIP COI, Sunnary, and General Information applies here.
        */
        //SQS
        elFunctions.showHideInClass('sc.SQS.readAndUnderstood', 'Yes', 'SQSorRMSA', false);
        elFunctions.showHideInClass('tog.SQS.hidePDF', false, 'SQSPDF', false);

        //RMSA
        elFunctions.showHideInClass('tog.RMSA.hidePDF', false, 'RMSAPDF', false);

        //Schedule F
        elFunctions.showHideInClass('sc.SF.readAndUnderstood', 'Yes', 'SFQuestions', false);
        elFunctions.showHideInClass('tog.SF.hidePDF', false, 'SFPDF', false);

        //Schedule F1
        elFunctions.showHideInClass('sc.SF1.readAndUnderstood', 'Yes', 'SF1Questions', false);
        elFunctions.showHideInClass('tog.SF1.hidePDF', false, 'SF1PDF', false);

        //Schedule A
        elFunctions.showHideInClass('tog.SA.hidePDF', false, 'SAPDF', false);
        
        //Schedule B
        elFunctions.showHideInClass('sc.SB.readAndUnderstood', 'Yes', 'SBQuestions', false);
        elFunctions.showHideInClass('tog.SB.hidePDF', false, 'SBPDF', false);

        //Schedule B1
        elFunctions.showHideInClass('sc.SB1.readAndUnderstood', 'Yes', 'SB1Questions', false);
        elFunctions.showHideInClass('tog.SB1.hidePDF', false, 'SB1PDF', false);

        //Schedule G
        elFunctions.showHideInClass('sc.SG.readAndUnderstood', 'Yes', 'SGQuestions', false);
        elFunctions.showHideInClass('tog.SG.hidePDF', false, 'SGPDF', false);

        //OCIP A
        elFunctions.showHideInClass('sc.OCIPA.readAndUnderstood', 'Yes', 'OCIPAQuestions', false);
        elFunctions.showHideInClass('tog.OCIPA.hidePDF', false, 'OCIPAPDF', false);

        //OCIP B
        elFunctions.showHideInClass('sc.OCIPB.readAndUnderstood', 'Yes', 'OCIPBQuestions', false);
        elFunctions.showHideInClass('tog.OCIPB.hidePDF', false, 'OCIPBPDF', false);


    },
    toggleSF: function() {
        elFunctions.showHideInClass('sc.SF.FF3.4.primeOrSubawardee', 'Subawardee', 'SFF3Q5');
    },
    toggleSBP1: function() {
        elFunctions.showHideInClass('sc.SB.P1.organizedUnderForeignCountry', 'Yes', 'sbP1DiffCountryClass', true);
        elFunctions.showHideInClass('dd.SB.P1.G.typeOfLegalEntity', ['Joint Venture', 'Partnership'], 'sbP1PartnersPartiesClass', true);
        elFunctions.showHideInClass('dd.SB.P1.G.typeOfLegalEntity', 'Other', 'sbp1TypeOfEntityClass', true);
    },
    toggleSBP3: function() {
        //Schedule B, Part 3: Contractor Representations
        //If any of the questions on the page has been answered yes, require the text box.
        anyYes = false;
        this.scheduleBPart3YesOrNo.forEach(field => {
            if (fd.field(field).value === "Yes") {
                anyYes = true;
            }
        });
        elFunctions.individualFieldVisibilityAndRequired('n.SB.P3.explanation', anyYes);
        elFunctions.individualFieldVisibilityAndRequired('a.SB.P3.attachments', anyYes);

        elFunctions.showHideInClass('sc.SB.P3.attachments', 'yes', 'SBP3attachment', false);
    },

    toggleSBP4: function() {
        //Schedule B, Part 4: Yes or No Questions
        //If any of the questions on the page has been answered yes, require the text box.
        anyYes = false;
        this.scheduleBPart4YesOrNo.forEach(field => {
            if (fd.field(field).value === "Yes") {
                anyYes = true;
            }
        });
        elFunctions.individualFieldVisibilityAndRequired('n.SB.P4.explanation', anyYes)
    },

    toggleSBP5: function() {
        //Schedule B Part 5: Additional Questions
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.C.pastThreeYrs', fd.field('sc.SB.P5.C.subcontractor').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('n.SB.P5.H.officeSpaceDetails', fd.field('sc.SB.P5.H.officeSpace').value === "Yes");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.K.2.last3YrsPenalities', fd.field('sc.SB.P5.K.2.none').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.K.3.MTAContractsWorkNotCompleted', fd.field('sc.SB.P5.K.3.none').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.K.4.activeGovtEntityContracts', fd.field('sc.SB.P5.K.4.none').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.K.5.contractsNotCompleted', fd.field('sc.SB.P5.K.5.none').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.L.contractSituations', fd.field('sc.SB.P5.L.none').value === "Yes", "DataTable");
        elFunctions.individualFieldVisibilityAndRequired('dt.SB.P5.M.employeesOfMTA', fd.field('sc.SB.P5.M.none').value === "Yes", "DataTable");
        elFunctions.showHideInClass('sc.SB.P5.K.1.none', 'Yes', 'ScheduleBPart5K', true);
        anyYes = false;
        this.scheduleBPart5YesOrNo.forEach(field => {
            if (fd.field(field).value === "Yes") {
                anyYes = true;
            }
            //Schedule B Part 5 Q actually gets an explanation filled out if it is a 'No'
            if (fd.field('sc.SB.P5.Q.sameBusinessGroup').value === 'No') {
                anyYes = true;
            }
        });
        elFunctions.individualFieldVisibilityAndRequired('n.SB.P5.Q.explanation', anyYes);

        elFunctions.showHideInClass('sc.SB.P5.J.sharedOffice', 'Yes', 'SBP5Jexplanation');
    },
    toggleSB1: function() {
        elFunctions.showHideInClass('sc.SB1.1.attachment', 'Yes', 'SB1Q1attachment', true);
    },
    OCIPAValidator: function () {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js')
        .then(function() {
            fd.field('d.OCIP.FA.S2.workersCompExpiration').addValidator({
                name: 'Check Date',
                error: 'Expiration date must be after start date.',
                validate: function(value) {
                    var projectEnd = moment(fd.field('d.OCIP.FA.S2.workersCompExpiration').value);
                    var projectBegin = moment(fd.field('d.OCIP.FA.S2.workersCompEffective').value);
                    if (projectEnd.isValid() && projectBegin.isValid()) {
                        if(projectEnd.diff(projectBegin, 'days', false) <= 0) {
                            return false;
                        }
                        return true;
                    }
                } 
            })
        })
    }
};

let dataTableFunctions = {
    
    namesOfDataTables: [],


    //Methods
    //This function will check the data tables to ensure there are no empty spots
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
    checkTele: function (dtName) {
        

        fd.control(dtName).value.forEach(row => {

        })
    },
    rowValidators: function () {
        this.getDataTables();
        this.namesOfDataTables.forEach(el => {
            fd.control(el).addValidator({
                name: 'DataTable' + el,
                error: 'Please fill out the data table completely',
                validate: (value) => {
                    return this.isDTFilled(el);
                } 
            })
        })
//This validator should make sure this doesn't exceed 3 entries
        fd.control("dt.SB.P5.K.1.contractsCompletedLast3Yrs").addValidator({
            name: 'SBP5K1Validator',
            error: 'Do not add more than 3 entries',
            validate: (value) => {
                if(value.length > 3) {
                    return false;
                }
                return true;
            } 
        })
    },
    columnValidators: function() {
        
        //For each data table, search through all columns
        this.namesOfDataTables.forEach(el => {
            let dtColumns = [];
            let phoneFormat = [];
            let emailFormat = [];
            let contractNumFormat = [];
            //Obtain all the internal column names of the given data table
            fd.control(el).columns.forEach(column => {
                if(column.field !== undefined) {
                    dtColumns.push(column.field);
                }
            })
            //Isolate all the columns within the data table that may require proper formatting.
            phoneFormat = dtColumns.filter((item) => /phone/i.test(item));
            emailFormat = dtColumns.filter((item) => /email/i.test(item));
            contractNumFormat = dtColumns.filter((item) => /contractnumber/i.test(item));
            
            //Phone Formatting
            phoneFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Please correct the formatting.',
                    validate: (value) => {
                        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?: *x(\d+))?$|^\d{10}(?: *x(\d+))?$/.test(value);
                    } 
                })
            })

            //Phone Formatting
            emailFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Please correct the formatting.',
                    validate: (value) => {
                        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
                    } 
                })
            })

            //Phone Formatting
            contractNumFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Please correct the formatting.',
                    validate: (value) => {
                        return /^[A-Za-z]-\d{5}$/.test(value);
                    } 
                })
            })
        })
    },
    //Will loop through all the values in the array to add a validator to all of them
    addValidators: function () {
        this.rowValidators();
        this.columnValidators();
    },
    getDataTables: function () {
        this.namesOfDataTables = Object.keys(fd.data()).filter((name) => /dt./.test(name));
    },

    /*
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    |                                                                                                                                                                    |
    |This function, calculateOCIPBValues(), is designed to perform calculations and autopopulate specific fields in the form related to the OCIP B Section II data table.|
    |                                                                                                                                                                    |
    |       It sets up an event listener on the "dt.OCIP.FB.S2.insurancePremium" control to trigger the calculations whenever the value in the data table changes.       |
    |                                                                                                                                                                    |
    |   The function contains two main parts:   1. Autopopulate Premium Row in OCIP B Section II Data Table:                                                             |
    |                              When the data in the "dt.OCIP.FB.S2.insurancePremium" control changes (i.e., a new record is added or modified in the data table),    |
    |                              this part of the function calculates the "colnumOCIPFB2insurancePremiumPremium" field value for each row in the data table.           |
    |                                                                                                                                                                    |
    |                                           2. Autopopulate Totals Below the Data Table:                                                                             |
    |                              After calculating the premium for each row, this part of the function calculates the totals for "workHours,"                          |
    |                              "estPayroll,"and "premium" by summing up the corresponding values from all rows in the data table.                                    |
    |                                                                                                                                                                    |
    |                                             It then sets the values of the corresponding fields below the data table:                                              |
    |                                                                                                                                                                    |
    |                                                      "num.OCIP.FB.S2.workHoursTotal" to the total work hours,                                                      |
    |                                              "num.OCIP.FB.S2.limitedPayrollTotal" to the total estimated payroll, and                                              |
    |                                                        "num.OCIP.FB.S2.premiumTotal" to the total premium.                                                         |
    |                The function uses the 'value' parameter, which represents the data in the "dt.OCIP.FB.S2.insurancePremium" control (the data table).                |
    |                                                                                                                                                                    |
    |                        It loops through the rows in the data table to perform the calculations and updates the relevant fields accordingly.                        |
    |              Note: The exact field names used for calculations are based on the structure of the data table and the form's field naming conventions.               |
    |                               The function assumes that the required fields and controls exist with the specified names in the form.                               |
    |                                                                                                                                                                    |
    |                                                      @returns {void} This function does not return any value.                                                      |
    |                                                                                                                                                                    |
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    */
    calculateOCIPBValues: function() {
        fd.control("dt.OCIP.FB.S2.insurancePremium").$on('change', function(value){
        //Autopopulates the premium row in OCIP B Section II
        if (value) { //If there are records in the table
            for (var i = 0; i < value.length; i++) {
                value[i].set('colnumOCIPFB2insurancePremiumPremium', value[i].colnumOCIPFB2insurancePremiumPayroll * value[i].colnumOCIPFB2insurancePremiumWCRate / 100);
            }
        }
        var workHours = 0;
        var estPayroll = 0;
        var premium = 0;
        //Autopopulates the totals below the data table
        if (value) {
            for (var i = 0; i < value.length; i++) {
                workHours += value[i].colnumOCIPFB2insurancePremiumWorkHours;
                estPayroll += value[i].colnumOCIPFB2insurancePremiumPayroll;
                premium += value[i].colnumOCIPFB2insurancePremiumPremium;
            }
        }

        fd.field("num.OCIP.FB.S2.workHoursTotal").value = workHours;
        fd.field("num.OCIP.FB.S2.limitedPayrollTotal").value = estPayroll;
        fd.field("num.OCIP.FB.S2.premiumTotal").value = premium;
    });
    },
    /*
    +------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    |                                                                                                                                                                        |
    | This function, disableFields(), is designed to disable specific fields in the OCIP B section, which are automatically calculated and should not be editable by users.  |
    |                                                                                                                                                                        |
    |It affects the "dt.OCIP.FB.S2.insurancePremium" data table and disables the "colnumOCIPFB2insurancePremiumPremium" column, as well as three fields below the data table:|
    |                                                                    "num.OCIP.FB.S2.workHoursTotal",                                                                    |
    |                                                               "num.OCIP.FB.S2.limitedPayrollTotal", and                                                                |
    |                                                                     "num.OCIP.FB.S2.premiumTotal".                                                                     |
    |                                                                                                                                                                        |
    |                       By setting these fields to read-only (disabled), users won't be able to modify their values directly through the form UI,                        |
    |                                                   ensuring that the calculations are protected and remain accurate.                                                    |
    |                                                                                                                                                                        |
    |                                                        @returns {void} This function does not return any value.                                                        |
    |                                                                                                                                                                        |
    +------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    */
    disableFields: function () {
        //This affects OCIP B
        // make Unit Price column read-only
        const premiumColumn = fd.control("dt.OCIP.FB.S2.insurancePremium").columns.find(c => c.field === 'colnumOCIPFB2insurancePremiumPremium');
        premiumColumn.editable = () => false;
        fd.field("num.OCIP.FB.S2.workHoursTotal").disabled = true;
        fd.field("num.OCIP.FB.S2.limitedPayrollTotal").disabled = true;
        fd.field("num.OCIP.FB.S2.premiumTotal").disabled = true;
    },
    initialize: function() {
        this.disableFields();
        this.addValidators();
    }


};

let attachmentFunctions = {
    attachmentFields: [],

    findFields: function () {
        this.attachmentFields = Object.keys(fd.data()).filter((name) => /^a\..*/.test(name));
    },
    validator: function () {
        this.attachmentFields.forEach(el => {
            fd.field(el).addValidator({
                name: 'Attachment' + el,
                error: 'Only add one attachment',
                validate: (value) => {
                    if(value.length > 1) {
                        return false;
                    }
                    return true;
                } 
            })
        })
    },
    initialize: function () {
        this.findFields();
        this.validator();
    }

};