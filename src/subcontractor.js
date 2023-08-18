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
            eventListener.init();
            dataTableFunctions.initialize();
            attachmentFunctions.initialize();
            console.log("If you experience any problems with these forms... Blame the MTA. Not Us.");
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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        //This should always be in the URL parameters
        fd.field("t.GI.primeContractorRepresentativeEmail").value = urlParams.get('primeContact');
        //If this is already autofilled, then do nothing. If it is blank, then the name should be in the URL as this is a fresh subcontractor form.
        if (fd.field("t.GI.subcontractorName").value === null) {
            fd.field("t.GI.subcontractorName").value = urlParams.get('name');
        }
        
        

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
                        case "is":
                            if(fd.field(el.internalName).value !== null) {
                                fd.field(el.internalName).disabled = true;
                            }
                            break;
                        //When the following has not been edited by the user, its length is 0
                        case "mc":
                        case "a.":
                            if (fd.field(el.internalName).value.length !== 0) {
                                fd.field(el.internalName).disabled = true;
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

        //Correct the heading, if it exists
        if (fd.field("t.GI.generalContractorName").value === null) {
            document.getElementById("docTitle").innerHTML = "Subcontractor Forms";
        } else {
            document.getElementById("docTitle").innerHTML = fd.field("t.GI.generalContractorName").value + " Subcontractor Forms";   
        }
    })
}

let eventListener = {
    //Setting up the arrays of fields that require event listeners
    generalInfoEvents: ['sc.GI.isMailingAddrDiff',
                        'd.GI.projectedStartDate',
                        'd.GI.projectedCompletionDate',
                        'num.GI.totalAmtOfProposedSubcontract',
                        'sc.GI.descOfWorkAddAttachment'
    ],

    miscActions: [
                    'sc.SF.FF3.3.reportType',
                    'sc.SB.isSBRequired',
                    'sc.SF.FF3.FF3Applicable',
                    'sc.SG.isFormBApplicable',
                    'sc.SF1.6.activeContracts'
    ],
    scheduleF: ['sc.SF.readAndUnderstood', 'tog.SF.hidePDF', 'sc.SF.FF3.4.primeOrSubawardee'],
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
    SQS: ['sc.SQS.readAndUnderstood', 'tog.SQS.hidePDF', 'tog.RMSA.hidePDF', 'sc.SQS.3.corpOrCoPartner', 'sc.SQS.8.applicable', 'sc.SQS.9.applicable', 'sc.SQS.10.applicable', 'sc.SQS.12.non-UnionOrUnion','sc.RMSA.isRequired'],
    scheduleB1: ['sc.SB1.readAndUnderstood', 'tog.SB1.hidePDF', 'sc.SB1.isSB1Required', 'sc.SB1.1.attachment'],
    pdfControls: ['sc.SF1.readAndUnderstood', 
    'tog.SF1.hidePDF',
    'tog.SA.hidePDF',
    'sc.SB.readAndUnderstood',
    'tog.SB.hidePDF',
    'sc.SG.readAndUnderstood',
    'tog.SG.hidePDF',
    'sc.OCIPA.readAndUnderstood',
    'tog.OCIPA.hidePDF'],
    OCIPB: ['sc.OCIPB.readAndUnderstood', 'tog.OCIPB.hidePDF', 'num.OCIP.FB.S2.experienceMod', 'sc.OCIP.FB.S2.WCPremium', 'sc.OCIP.FB.S2.insurancePremium'],

    //Methods
    init: function() {
        //Items are added here, where they will be called to add onto the arrays
        //For some reason this sorting algorithm didn't end up working that well. So we scrap it.
        //I think it might have been better to use fd.fields instead of fd.data, but I already hard coded it, so whats the point lol
        //this.pdfControls = Object.keys(fd.data()).filter((name) => /hidePDF/.test(name));
        //this.pdfControls = this.pdfControls.concat(Object.keys(fd.data()).filter((name) => /readAndUnderstood/.test(name)));

        //Sets up the event listeners for each of the fields.
        this.eventListenerHelper(this.generalInfoEvents, this.generalInfoCallback);
        this.eventListenerHelper(this.miscActions, this.toggleMisc);
        this.eventListenerHelper(this.pdfControls, this.togglePDF);
        this.eventListenerHelper(this.scheduleF, this.toggleSF);
        this.eventListenerHelper(this.scheduleBPart1, this.toggleSBP1);
        this.eventListenerHelper(this.scheduleBPart3YesOrNo, this.toggleSBP3);
        this.eventListenerHelper(this.scheduleBPart4YesOrNo, this.toggleSBP4);
        this.eventListenerHelper(this.scheduleBPart5, this.toggleSBP5);
        this.eventListenerHelper(this.scheduleB1, this.toggleSB1);
        this.eventListenerHelper(this.SQS, this.toggleSQS);
        this.eventListenerHelper(this.OCIPB, this.toggleOCIPB);

        //Set up validators: this only happens one time.
        this.OCIPAValidator();
        this.genInfoValidator();
        this.validateMT();

        //Then, we call the functions once such that all the values update to their default configuration
        this.generalInfoCallback();
        this.toggleMisc();
        this.togglePDF();
        this.toggleSF();
        this.toggleSBP1();
        this.toggleSBP3();
        this.toggleSBP4();
        this.toggleSBP5();
        this.toggleSB1();
        this.toggleSQS();
        //This is actually an event listener as well, I jsut couldn't figure out how to get this to fit the same format as the others, since it 
        //requires an input value from the event itself. I coudln't figure out how to do this repeating (Although, technically this isn't repeating)
        dataTableFunctions.calculateOCIPBValues();
        dataTableFunctions.rmsaRefNum();

        dataTableFunctions.calculateOCIPBInsurance(fd.control("dt.OCIP.FB.S2.insurancePremium").value);

        //this field should also get disabled, since the user should not interact with it (It should be filled automatically)
        this.fieldVisAndReq('num.GI.percentOfTotalContractPrice', false);
    },


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
    //Additionally, function will calcualte the percentage of the contract based on the subcontractor's value
    generalInfoCallback: function() {
        this.showHideInClass('sc.GI.isMailingAddrDiff', 'Yes', 'GeneralInfoMailingAddr');
        fd.field('num.GI.percentOfTotalContractPrice').value = fd.field('num.GI.contractValue').value/fd.field('num.GI.totalAmtOfProposedSubcontract').value;
        this.fieldVisAndReq('a.GI.descOfWorkAttachment', fd.field('sc.GI.descOfWorkAddAttachment').value === "Yes");
    }, 
    toggleMisc: function() {
        //Toggle Scheduel F1
        this.fieldVisAndReq('dt.SF1.6.activeContracts', fd.field('sc.SF1.6.activeContracts').value === "Yes", "DataTable");
        /*
        The following are optional forms: Forms that may or may not be filled out by the subcontractor.
        This includes:
            Schedule B1
            Schedule B
            Schedule F, F3 (Technically, this is a subform, but on the wizard, we've condensed it into its own form)
            Schedule G
        */

        //Toggles Schedule F, Form F3
        this.showHideInClass('sc.SF.FF3.FF3Applicable', 'Yes', "ScheduleFFormF3", true, ['t.SF.FF3.4.tier', 't.SF.FF3.4.congressionalDistrict', "t.SF.FF3.5.nameOfPrime", "n.SF.FF3.5.addrOfPrime", 't.SF.FF3.5.congressionalDistrict',
                                                                                    't.SF.FF3.7.CFDANumber', 't.SF.FF3.8.federalActionNumber', 'num.SF.FF3.9.awardAmount', 'n.SF.FF3.10.b.addr']);    

        //Toggles Schedule B
        this.showHideInClass('sc.SB.isSBRequired', 'Yes', "ScheduleBClass", true, ['n.SB.P1.D.changedAddress', 't.SB.P1.H.country', 'n.SB.P1.I.DBA', 't.SB.P1.G.typeOfLegalEntity', 'dt.SB.P1.G.partnersAndParties', 'dt.SB.P5.K.5.contractsNotCompleted',
                                                                                    'n.SB.P3.explanation',]);
        //Call these afterwards to ensure correct values are required
        this.toggleSBP1();
        this.toggleSBP3();
        this.toggleSBP4();
        this.toggleSBP5();
            /*
            The following are optional fields inside forms.
            These forms include: 
                Schedule F, F3
                Schedule B
        */

        //Toggles F3 Materials List
        this.showHideInClass('sc.SF.FF3.3.reportType', 'b. Material Change', 'ScheduleF3MaterialChange');

        //Toggles the Schedule G requirement
        this.showHideInClass('sc.SG.isFormBApplicable', 'Yes', 'SGInfo');
    },
    toggleSQS: function() {
        //SQS
        this.showHideInClass('sc.SQS.readAndUnderstood', 'Yes', 'SQSorRMSA', false);
        this.showHideInClass('tog.SQS.hidePDF', false, 'SQSPDF', false);

        //RMSA
        this.showHideInClass('tog.RMSA.hidePDF', false, 'RMSAPDF', false);

        //Toggles the visibiliy and requirement of the RMSA form
        this.showHideInClass('sc.RMSA.isRequired', 'SQS', 'SQSQuestions', true, ['t.SQS.2a.streetAddr', 't.SQS.2a.city', 'dd.SQS.2a.state', 't.SQS.2a.zipCode', 'dt.SQS.8.prevExp', 
        'dt.SQS.9.principalContracts', 'dt.SQS.10.contractsOnHand']);
        //'d.SQS.3.dateOfOrg', 't.SQS.3.county', 'dt.SQS.3.namesAndAddrsOfPartners'
        this.showHideInClass('sc.RMSA.isRequired', 'RMSA', 'RMSAQuestions', true, ['d.SQS.3.incorporationDate', "t.SQS.3.president'sName", "t.SQS.3.vicePresident'sName", "t.SQS.3.treasurer'sName", "t.SQS.3.secretary'sName", "d.SQS.3.dateOfOrg", "t.SQS.3.county", "dt.SQS.3.namesAndAddrsOfPartners",
        't.SQS.12.unionName', 't.SQS.12.addr', 't.SQS.12.localNo', 't.SQS.12.telephone', 'dt.SQS.8.prevExp', 'dt.SQS.9.principalContracts', 'dt.SQS.10.contractsOnHand']);
        //These fields are in SQS, which should be made not required if the user switches over to RMSA. Otherwise, it will softlock them.
                    

        

        this.showHideInClass('sc.SQS.3.corpOrCoPartner', 'Corporation', "SQSCorporation");
        this.showHideInClass('sc.SQS.3.corpOrCoPartner', 'Co-partnership', "SQSCoPartnership"); 
        
        if (fd.field("sc.RMSA.isRequired").value === "RMSA") {
            this.setRequiredInClass(false, 'SQSCorporation');
            this.setRequiredInClass(false, 'SQSCoPartnership');
        }
              
        this.showHideInClass('sc.SQS.12.non-UnionOrUnion', 'Union', 'SQSLabor');

        this.fieldVisAndReq('dt.SQS.8.prevExp', fd.field('sc.SQS.8.applicable').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SQS.9.principalContracts', fd.field('sc.SQS.9.applicable').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SQS.10.contractsOnHand', fd.field('sc.SQS.10.applicable').value === "Yes", "DataTable");
    },
    togglePDF: function() {
        /*
            The following toggles the PDFs and ensures that the reader has viewed the PDF before moving onto the questions.
            Every form except OCIP COI, Sunnary, and General Information applies here.
        */

        //Schedule F1
        this.showHideInClass('sc.SF1.readAndUnderstood', 'Yes', 'SF1Questions', false);
        this.showHideInClass('tog.SF1.hidePDF', false, 'SF1PDF', false);

        //Schedule A
        this.showHideInClass('tog.SA.hidePDF', false, 'SAPDF', false);
        
        //Schedule B
        this.showHideInClass('sc.SB.readAndUnderstood', 'Yes', 'SBQuestions', false);
        this.showHideInClass('tog.SB.hidePDF', false, 'SBPDF', false);

        //Schedule G
        this.showHideInClass('sc.SG.readAndUnderstood', 'Yes', 'SGQuestions', false);
        this.showHideInClass('tog.SG.hidePDF', false, 'SGPDF', false);

        //OCIP A
        this.showHideInClass('sc.OCIPA.readAndUnderstood', 'Yes', 'OCIPAQuestions', false);
        this.showHideInClass('tog.OCIPA.hidePDF', false, 'OCIPAPDF', false);
    },
    toggleSF: function() {
        //Schedule F
        this.showHideInClass('sc.SF.readAndUnderstood', 'Yes', 'SFQuestions', false);
        this.showHideInClass('tog.SF.hidePDF', false, 'SFPDF', false);

        this.showHideInClass('sc.SF.FF3.4.primeOrSubawardee', 'Subawardee', 'SFF3Q5', true, ['t.SF.FF3.5.congressionalDistrict']);
    },
    toggleSBP1: function() {
        this.showHideInClass('sc.SB.P1.organizedUnderForeignCountry', 'Yes', 'sbP1DiffCountryClass', true);
        this.showHideInClass('dd.SB.P1.G.typeOfLegalEntity', ['Joint Venture', 'Partnership'], 'sbP1PartnersPartiesClass', true);
        this.showHideInClass('dd.SB.P1.G.typeOfLegalEntity', 'Other', 'sbp1TypeOfEntityClass', true);
    },
    toggleSBP3: function() {
        //Schedule B, Part 3: Contractor Representations
        //If any of the questions on the page has been answered yes, require the text box.
        anyYes = false;
        this.scheduleBPart3YesOrNo.forEach(field => {
            //Attachments don't count in the yes/no triggers
            if (field !== "sc.SB.P3.attachments") {
                if (fd.field(field).value === "Yes") {
                    anyYes = true;
                }
            }
        });
        this.fieldVisAndReq('n.SB.P3.explanation', anyYes);
        //Technically this is not a data table, but it still gets treated the same way
        this.fieldVisAndReq('html.SBP3.explain', anyYes, 'dataTable');
        this.fieldVisAndReq('a.SB.P3.attachments', fd.field('sc.SB.P3.attachments').value === "Yes");
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
        this.fieldVisAndReq('n.SB.P4.explanation', anyYes);
        //Technically this is not a data table, but it still gets treated the same way
        this.fieldVisAndReq('html.SBP4.explain', anyYes, 'dataTable');
    },

    toggleSBP5: function() {
        //Schedule B Part 5: Additional Questions
        this.fieldVisAndReq('dt.SB.P5.C.pastThreeYrs', fd.field('sc.SB.P5.C.subcontractor').value === "Yes", "DataTable");
        this.fieldVisAndReq('html.SBP5.C', fd.field('sc.SB.P5.C.subcontractor').value === "Yes", "DataTable");
        this.fieldVisAndReq('n.SB.P5.H.officeSpaceDetails', fd.field('sc.SB.P5.H.officeSpace').value === "Yes");
        this.fieldVisAndReq('dt.SB.P5.K.2.last3YrsPenalities', fd.field('sc.SB.P5.K.2.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SB.P5.K.3.MTAContractsWorkNotCompleted', fd.field('sc.SB.P5.K.3.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SB.P5.K.4.activeGovtEntityContracts', fd.field('sc.SB.P5.K.4.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('html.SBP4.K4', fd.field('sc.SB.P5.K.4.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SB.P5.K.5.contractsNotCompleted', fd.field('sc.SB.P5.K.5.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SB.P5.L.contractSituations', fd.field('sc.SB.P5.L.none').value === "Yes", "DataTable");
        this.fieldVisAndReq('dt.SB.P5.M.employeesOfMTA', fd.field('sc.SB.P5.M.none').value === "Yes", "DataTable");
        this.showHideInClass('sc.SB.P5.K.1.none', 'Yes', 'ScheduleBPart5K', true);
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
        this.fieldVisAndReq('n.SB.P5.Q.explanation', anyYes);

        this.showHideInClass('sc.SB.P5.J.sharedOffice', 'Yes', 'SBP5Jexplanation');
    },
    toggleSB1: function() {

        //Schedule B1
        this.showHideInClass('sc.SB1.readAndUnderstood', 'Yes', 'SB1Questions', false);
        this.showHideInClass('tog.SB1.hidePDF', false, 'SB1PDF', false);
        
        //Toggles Schedule B1
        this.showHideInClass('sc.SB1.isSB1Required', 'Yes', 'ScheduleB1Class', false, ["a.SB1.1.attachment"]);
        //Change whats required in schedule B1
        this.showHideInClass('sc.SB1.isSB1Required', 'Yes', 'SB1Required', true, ['dt.SB1.4.performanceBondInfo', 'dt.SB1.5.subcontracts']);

        this.fieldVisAndReq('a.SB1.1.attachment', (fd.field('sc.SB1.1.attachment').value === "Yes" && fd.field('sc.SB1.isSB1Required').value === "Yes"));
    },
    toggleOCIPB: function() {
        //OCIP B
        this.showHideInClass('sc.OCIPB.readAndUnderstood', 'Yes', 'OCIPBQuestions', false);
        this.showHideInClass('tog.OCIPB.hidePDF', false, 'OCIPBPDF', false);


        fd.field("num.OCIP.FB.S2.modifiedPremium").value = fd.field("num.OCIP.FB.S2.experienceMod").value * fd.field("num.OCIP.FB.S2.premiumTotal").value;
        //If the experience modifier was changed, so would the modieief premium. Therefore, this should also trigger the table.
        dataTableFunctions.calculateOCIPBWCPremium(fd.control("dt.OCIP.FB.S2.WCPremium").value);

        //If the button is set, show/require the data table. If not, hide
        this.showHideInClass('sc.OCIP.FB.S2.WCPremium', 'Yes', 'OCIPFBS2WCPremium');
        //If the button is set, show/require the data table. If not, hide
        this.showHideInClass('sc.OCIP.FB.S2.insurancePremium', 'Yes', 'OCIPFBS2InsurancePremiumDataTable');
        //If the button is set, we will unrequire the values here, but still show them. They can then be left blank.
        if (fd.field('sc.OCIP.FB.S2.insurancePremium').value === 'Yes') {
            this.setRequiredInClass(true, 'OCIPFBS2InsurancePremium');
        } else {
            this.setRequiredInClass(false, 'OCIPFBS2InsurancePremium');
        }
        

    },
    OCIPAValidator: function () {
        //This validor ensures that the expiration date is after the insurance start date
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
    },
    genInfoValidator: function () {
        //This validor ensures that the completion date is after the project start date
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
        });

        //This validor ensures that amount of proposed subcontract is less than the contract value
        fd.field("num.GI.totalAmtOfProposedSubcontract").addValidator({
            name: "Amount of Subcontract",
            error: "Amount of subcontract must be less than the total contract value",
            validate: function(value) {
                contractVal = fd.field("num.GI.contractValue").value;
                subcontractVal = fd.field("num.GI.totalAmtOfProposedSubcontract").value;
                if (contractVal < subcontractVal) {
                    return false;
                }
                return true;
            }
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

        mtFields.forEach(el => {
            fd.field(el).addValidator({
                name: fd.field(el).title,
                error: "Please fill out this field",
                validate: function(value) {
                    return !/_/i.test(value);
                }
            })
        })
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
    fieldVisAndReq: function(fieldName, requiredOrNot, dataTableOrField = "Field") {
        dataTableOrField = dataTableOrField.toLowerCase();
        switch (dataTableOrField) {
            case "field":
                fd.field(fieldName).hidden = !requiredOrNot;
                fd.field(fieldName).required = requiredOrNot;
                break;
            case "datatable":
                fd.control(fieldName).required = requiredOrNot;
                if (requiredOrNot) {
                    $(fd.control(fieldName).$el).show();
                    } else {
                        $(fd.control(fieldName).$el).hide();
                    }
                break;
        }

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
                if ((el === "" || el === null || el === undefined || el === []) && el !== 0) {
                    //return false to indicate an error
                    returnValue = false;
                }
            })
        })
        //If we loop through everything and it hasn't triggered the false condition, then the whole table is true
        return returnValue;
    },
    rowValidators: function () {
        this.setNamesOfDT();
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

        //This validator should make sure this doesn't exceed 3 entries
        fd.control("dt.SB.P5.K.4.activeGovtEntityContracts").addValidator({
            name: 'SBP5K4Validator',
            error: 'Do not add more than 3 entries',
            validate: (value) => {
                if(value.length > 3) {
                    return false;
                }
                return true;
            } 
        })

        //This validator should make sure this has at least 2 entries
        fd.control("dt.SQS.11.refs").addValidator({
            name: 'SQS11Validator',
            error: 'You must have at least 2 engineers',
            validate: (value) => {
                if (fd.field("sc.RMSA.isRequired").value === "RMSA") {
                    return true;
                } else {
                    if(value.length < 2) {
                        return false;
                    }
                    return true;
                }
            } 
        })

        //This validator have less than 4 entries
        fd.control("dt.OCIP.FB.S2.WCPremium").addValidator({
            name: 'Less than 4 Entries on WC Premium',
            error: 'You can only have less than 4 entries',
            validate: (value) => {
                if (fd.field("sc.RMSA.isRequired").value === "RMSA") {
                    return true;
                } else {
                    if(value.length > 4) {
                        return false;
                    }
                    return true;
                }
            } 
        })
    },
    validateFormattingDT: function() {
        
        //For each data table, search through all columns
        this.namesOfDataTables.forEach(el => {
            let dtColumns = [];
            let phoneFormat = [];
            let emailFormat = [];
            let contractNumFormat = [];
            //Should extract all SSN/TIN numbers
            let SSN = [];
            //Obtain all the internal column names of the given data table
            fd.control(el).columns.forEach(column => {
                if(column.field !== undefined) {
                    dtColumns.push(column.field);
                }
            })
            //Isolate all the columns within the data table that may require proper formatting.
            phoneFormat = dtColumns.filter((item) => /phone/i.test(item));
            emailFormat = dtColumns.filter((item) => /email/i.test(item));
            contractNumFormat = dtColumns.filter((item) => /contractnumber|contractno/i.test(item));
            SSN = dtColumns.filter((item) => /EIN/i.test(item));
            
            //Phone Formatting
            phoneFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Phone formatting is not correct. (123) 123-1233',
                    validate: (value) => {
                        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?: *x(\d+))?$|^\d{10}(?: *x(\d+))?$|^n\/a$/i.test(value);
                    } 
                })
            })

            //Phone Formatting
            emailFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Email formatting is not correct. example@example.com',
                    validate: (value) => {
                        return /^[^@\s]+@[^@\s]+\.[^@\s]+$|^n\/a$/i.test(value);
                    } 
                })
            })

            //Phone Formatting
            contractNumFormat.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'Contract formatting is not correct. A-12345',
                    validate: (value) => {
                        return /^[A-Za-z]-\d{5}$|^n\/a$/i.test(value);
                    } 
                })
            })

            //EIN/TIN/SSN formatting
            SSN.forEach(column => {
                fd.control(el).addColumnValidator(column, {
                    error: 'EIN/TIN/SSN formatting is not correct. 123-45-6789 or 12-3456789',
                    validate: (value) => {
                        return /^\d{3}-\d{2}-\d{4}$|^\d{2}-\d{7}$|^n\/a$/i.test(value);
                    } 
                })
            })
        })
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
        var self = this;
        //For Insurance Premiums
        fd.control("dt.OCIP.FB.S2.insurancePremium").$on('change', function(value){
            self.calculateOCIPBInsurance(value);
            self.calculateOCIPBWCPremium(fd.control("dt.OCIP.FB.S2.WCPremium").value);
        });

        //For WC Premiums
        fd.control("dt.OCIP.FB.S2.WCPremium").$on('change', function(value) {
            self.calculateOCIPBWCPremium(value);
        });
    },
    calculateOCIPBInsurance: function(value) {
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
        eventListener.toggleOCIPB();
    },
    calculateOCIPBWCPremium: function(value) {
        if (value) { //If there are records in the table
            var initial = fd.field("num.OCIP.FB.S2.modifiedPremium").value;
            var operand = 0;
            var newTotal = 0;
            for (var i = 0; i < value.length; i++) {
                operand = value[i].colnumOCIPFBS2WCPremiumModified;
                if (value[i].colddOCIPFBS2WCPremiumPlusOrMinus === "+") {
                    newTotal = initial+ operand;
                } else if (value[i].colddOCIPFBS2WCPremiumPlusOrMinus === "-") {
                    newTotal = initial - operand;
                }
                value[i].set('colnumOCIPFBS2WCPremiumRunningTotal', newTotal);
                initial = newTotal;
            }
            fd.field("num.OCIP.FB.S2.totalWCPremium").value = newTotal;
        }
    },

    //Calculate the Ref Number in the RMSA data table upon change
    rmsaRefNum: function () {
        fd.control("dt.RMSA.refs").$on('change', function(value){
            var data = fd.control('dt.RMSA.refs').value;
            for (var i = 0; i < data.length; i++) {
                value[i].set('colnumRMSARefsRefNum', i+1);
            }
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

        //OCIP B WC Premium
        const runningTotal = fd.control("dt.OCIP.FB.S2.WCPremium").columns.find(c => c.field === 'colnumOCIPFBS2WCPremiumRunningTotal');
        runningTotal.editable = () => false;
        fd.field("num.OCIP.FB.S2.modifiedPremium").disabled = true;

        fd.field("num.OCIP.FB.S2.totalWCPremium").disabled = true;

        //This affects RMSA
        //Makes Ref# Column read only
        const refColumn = fd.control("dt.RMSA.refs").columns.find(c => c.field === 'colnumRMSARefsRefNum');
        refColumn.editable = () => false;


        
    },
    setNamesOfDT: function () {
        this.namesOfDataTables = Object.keys(fd.data()).filter((name) => /dt./.test(name));
    },
    //Will loop through all the values in the array to add a validator to all of them
    addValidators: function () {
        this.rowValidators();
        this.validateFormattingDT();
    },
    initialize: function() {
        this.disableFields();
        this.addValidators();
        this.rmsaRefNum();
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