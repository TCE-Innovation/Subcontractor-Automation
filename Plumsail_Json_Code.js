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
//CHANGE HERE

//OIFHW(EUFHWEOFKNFWE)

// ================================================================
//  EXAMPLE 1: The code is executed right after rendering the form 
// ================================================================
fd.rendered(function () {
    
    //Functions that run initially
    executeOnce();

    //Items that change on action
    onActionFields = ['sc.SQS.3.corpOrCoPartner', 
    'sc.SB1.isSB1Required',
    'sc.SF.FF3.3.reportType',
    'sc.SB.isSBRequired',
    'sc.SF.FF3.FF3Applicable',
    'sc.RMSA.isRequired'
    ]
    onActionControl = ['dt.OCIP.FB.S2.insurancePremium'];

    pdfControls = ['sc.SQS.readAndUnderstood',
    'tog.SQS.hidePDF',
    'sc.SF.readAndUnderstood',
    'tog.SF.hidePDF',
    'sc.SF1.readAndUnderstood',
    'tog.SF1.hidePDF',
    'tog.RMSA.hidePDF',
    'sc.SB.readAndUnderstood',
    'tog.SB.hidePDF',
    'sc.SB1.readAndUnderstood',
    'tog.SB1.hidePDF',
    'sc.OCIPA.readAndUnderstood',
    'tog.OCIPA.hidePDF',
    'sc.OCIPB.readAndUnderstood',
    'tog.OCIPB.hidePDF'
    ];

    scheduleBPart3YesOrNo = ['sc.SB.P3.A.notResponsible',
                            'sc.SB.P3.B.debarred',
                            'sc.SB.P3.C.pendingDebarment',
                            'sc.SB.P3.D.terminated',
                            'sc.SB.P3.E.suretyAgreement',
                            'sc.SB.P3.F.monitor',
                            'sc.SB.P3.G.safety',
                            'sc.SB.P3.H.compensationRating'];

    scheduleBPart4YesOrNo = ['sc.SB.P4.A.noloContendere',
                            'sc.SB.P4.B.unfavorableTerminated',
                            'sc.SB.P4.C.subjectOfCrime',
                            'sc.SB.P4.D.disqualifiedBid',
                            'sc.SB.P4.E.refuseTestimony',
                            'sc.SB.P4.F.refuseTestimonyNYS',
                            'sc.SB.P4.G.civilJudgement',
                            'sc.SB.P4.H.deferredProsecution'];
    scheduleBPart5 = ['sc.SB.P5.D.bankruptcy',
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
                        'sc.SB.P5.M.none'];


    onActionFields.forEach(field => fd.field(field).$on('change',toggleClass));
    pdfControls.forEach(field => fd.field(field).$on('change',toggleClass));
    scheduleBPart3YesOrNo.forEach(field => fd.field(field).$on('change',toggleClass));
    scheduleBPart4YesOrNo.forEach(field => fd.field(field).$on('change',toggleClass));
    scheduleBPart5.forEach(field => fd.field(field).$on('change',toggleClass));
    onActionControl.forEach(control => fd.control(control).$on('change', updateControls));
});

fd.beforeSave(function () {
    url = "https://prod-102.westus.logic.azure.com:443/workflows/1128de5c7a7e488e9e88a34f00eb974b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B_VCWVNlWNAnOJfI9ytYCVZGVLNLkvYBq2iMluENAI0";
    data = fd.data();
    apiInteraction(data, url)
});

var executeOnce = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            autoPopulateGenInfo();
            //toggleClass();
            disableFields();
            updateControls();
        }
    };
})();
 


function updateControls() {
    fd.control("dt.OCIP.FB.S2.insurancePremium").$on('change', function(value){
    //Autopopulates the premium row in OCIP B Section II
    if (value) { //If there are records in the table
        for (var i = 0; i < value.length; i++) {
            value[i].set('colnumOCIPFB2insurancePremiumPremium', value[i].payroll * value[i].wCRate / 100);
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
    }

    fd.field("num.OCIP.FB.S2.workHoursTotal").value = workHours;
    fd.field("num.OCIP.FB.S2.limitedPayrollTotal").value = estPayroll;
    fd.field("num.OCIP.FB.S2.premiumTotal").value = premium;
});
}


/*
    This function will parse the query in the URL, then pass this information into a function that returns a promise
    to the contents of some JSON file.
*/
function externalFile() {
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
function autoPopulateGenInfo() {
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
    externalFile().then(function(data){
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
    })

    
}

//This function disables the fields in OCIP B, which are automatically calculated
function disableFields() {
    //This affects OCIP B
    // make Unit Price column read-only
    const premiumColumn = fd.control("dt.OCIP.FB.S2.insurancePremium").columns.find(c => c.field === 'colnumOCIPFB2insurancePremiumPremium');
    premiumColumn.editable = () => false;
    fd.field("num.OCIP.FB.S2.workHoursTotal").disabled = true;
    fd.field("num.OCIP.FB.S2.limitedPayrollTotal").disabled = true;
    fd.field("num.OCIP.FB.S2.premiumTotal").disabled = true;
}

//To be more efficient (And not run everything all at once) turn this function into an object
//And call upong specific portions in the object
function toggleClass() {
    /*
        The following are optional forms: Forms that may or may not be filled out by the subcontractor.
        This includes:
            Schedule B1
            Schedule B
            Request for Materials Supplier Approval
            Schedule F, F3 (Technically, this is a subform, but on the wizard, we've condensed it into its own form)
    */
    
    //Toggles Schedule F, Form F3
    showHideInClass('sc.SF.FF3.FF3Applicable', 'Yes', "ScheduleFFormF3");    

    //Toggles Schedule B
    showHideInClass('sc.SB.isSBRequired', 'Yes', "ScheduleBClass");

    //Toggles Schedule B1
    showHideInClass('sc.SB1.isSB1Required', 'Yes', 'ScheduleB1Class');
  
    //Toggles the visibiliy and requirement of the RMSA form
    showHideInClass('sc.RMSA.isRequired', 'RMSA', 'RMSAQuestions');




    /*
        The following are optional fields inside forms.
        These forms include: 
            Schedule F, F3
            SQS
            Schedule B
    */
    //Toggles the SQS Form
    showHideInClass('sc.SQS.3.corpOrCoPartner', 'Corporation', "SQSCorporation");
    showHideInClass('sc.SQS.3.corpOrCoPartner', 'Co-partnership', "SQSCoPartnership");

    //Toggles F3 Materials List
    showHideInClass('sc.SF.FF3.3.reportType', 'b. Material Change', 'ScheduleF3MaterialChange');

    //Schedule B, Part 3: Contractor Representations
    //If any of the questions on the page has been answered yes, require the text box.
    scheduleBPart3YesOrNo = ['sc.SB.P3.A.notResponsible',
                            'sc.SB.P3.B.debarred',
                            'sc.SB.P3.C.pendingDebarment',
                            'sc.SB.P3.D.terminated',
                            'sc.SB.P3.E.suretyAgreement',
                            'sc.SB.P3.F.monitor',
                            'sc.SB.P3.G.safety',
                            'sc.SB.P3.H.compensationRating'];
    anyYes = false;
    scheduleBPart3YesOrNo.forEach(field => {
        if (fd.field(field).value === "Yes") {
            anyYes = true;
        }
    });

    //Schedule B, Part 4: Yes or No Questions
    //If any of the questions on the page has been answered yes, require the text box.
    scheduleBPart4YesOrNo = ['sc.SB.P4.A.noloContendere',
                            'sc.SB.P4.B.unfavorableTerminated',
                            'sc.SB.P4.C.subjectOfCrime',
                            'sc.SB.P4.D.disqualifiedBid',
                            'sc.SB.P4.E.refuseTestimony',
                            'sc.SB.P4.F.refuseTestimonyNYS',
                            'sc.SB.P4.G.civilJudgement',
                            'sc.SB.P4.H.deferredProsecution'];
    anyYes = false;
    scheduleBPart4YesOrNo.forEach(field => {
        if (fd.field(field).value === "Yes") {
            anyYes = true;
        }
    });
    individualFieldVisibilityAndRequired('t.SB.P4.yesToAnyAnswerExplain', anyYes)

    //Schedule B Part 5: Additional Questions
    individualFieldVisibilityAndRequired('dt.SB.P5.C.pastThreeYrs', fd.field('sc.SB.P5.C.subcontractor').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('t.SB.P5.H.officeSpaceDetails', fd.field('sc.SB.P5.H.officeSpace').value === "Yes");
    individualFieldVisibilityAndRequired('n.SB.P5.J.sharedOfficeExplanation', fd.field('sc.SB.P5.J.sharedOffice').value === "Yes");
    individualFieldVisibilityAndRequired('dt.SB.P5.K.2.last3YrsPenalities', fd.field('sc.SB.P5.K.2.none').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('dt.SB.P5.K.3.MTAContractsWorkNotCompleted', fd.field('sc.SB.P5.K.3.none').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('dt.SB.P5.K.4.activeGovtEntityContracts', fd.field('sc.SB.P5.K.4.none').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('dt.SB.P5.K.5.contractsNotCompleted', fd.field('sc.SB.P5.K.5.none').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('dt.SB.P5.L.contractSituations', fd.field('sc.SB.P5.L.none').value === "Yes", "DataTable");
    individualFieldVisibilityAndRequired('dt.SB.P5.M.employeesOfMTA', fd.field('sc.SB.P5.M.none').value === "Yes", "DataTable");
    showHideInClass('sc.SB.P5.K.1.none', 'Yes', 'ScheduleBPart5K', true);
    scheduleBPart5YesOrNo = ['sc.SB.P5.D.bankruptcy',
                            'sc.SB.P5.E.liensExcess',
                            'sc.SB.P5.F.liensToday',
                            'sc.SB.P5.G.failedTax',
                            'sc.SB.P5.I.conflictOfInterest',
                            'sc.SB.P5.N.haveSubsidiaryOrAffiliate',
                            'sc.SB.P5.O.isContractorSubsidiaryOfGroup',
                            'sc.SB.P5.P.ownershipOfOtherEntity',
                            'sc.SB.P5.Q.sameBusinessGroup'];
    anyYes = false;
    scheduleBPart5YesOrNo.forEach(field => {
        if (fd.field(field).value === "Yes") {
            anyYes = true;
        }
    });
    individualFieldVisibilityAndRequired('n.SB.P5.Q.explanation', anyYes);
                            

    /*
        The following toggles the PDFs and ensures that the reader has viewed the PDF before moving onto the questions.
        Every form except OCIP COI, Sunnary, and General Information applies here.
    */
    //SQS
    showHideInClass('sc.SQS.readAndUnderstood', 'Yes', 'SQSorRMSA', false);
    showHideInClass('tog.SQS.hidePDF', false, 'SQSPDF', false);
    showHideInClass('sc.RMSA.isRequired', 'SQS', 'SQSQuestions', true, ['d.SQS.3.dateOfOrg', 't.SQS.3.county', 'dt.SQS.3.namesAndAddrsOfPartners']);

    //RMSA
    showHideInClass('tog.RMSA.hidePDF', false, 'RMSAPDF', false);
    showHideInClass('sc.RMSA.isRequired', 'RMSA', 'RMSAQuestions', true);


    //Schedule F
    showHideInClass('sc.SF.readAndUnderstood', 'Yes', 'SFQuestions', false);
    showHideInClass('tog.SF.hidePDF', false, 'SFPDF', false);

    //Schedule F1
    showHideInClass('sc.SF1.readAndUnderstood', 'Yes', 'SF1Questions', false);
    showHideInClass('tog.SF1.hidePDF', false, 'SF1PDF', false);

    //Schedule B
    showHideInClass('sc.SB.readAndUnderstood', 'Yes', 'SBQuestions', false);
    showHideInClass('tog.SB.hidePDF', false, 'SBPDF', false);

    //Schedule B1
    showHideInClass('sc.SB1.readAndUnderstood', 'Yes', 'SB1Questions', false);
    showHideInClass('tog.SB1.hidePDF', false, 'SB1PDF', false);

    //OCIP A
    showHideInClass('sc.OCIPA.readAndUnderstood', 'Yes', 'OCIPAQuestions', false);
    showHideInClass('tog.OCIPA.hidePDF', false, 'OCIPAPDF', false);

    //OCIP B
    showHideInClass('sc.OCIPB.readAndUnderstood', 'Yes', 'OCIPBQuestions', false);
    showHideInClass('tog.OCIPB.hidePDF', false, 'OCIPBPDF', false);
}

//showHideInClass toggles the visibility of all fields inside a given class
function showHideInClass(fieldName, showValue, className, changeIfRequired = true, dontChangeRequired = []) {
    try{
        if(fd.field(fieldName).value === showValue) {
            $("." + className).show();
            if (changeIfRequired) {
                setRequiredInClass(true, className, dontChangeRequired);
            }
        } else {
            $("." + className).hide();
            if (changeIfRequired) {
                setRequiredInClass(false, className, dontChangeRequired);
            }
        }
    } catch (err) {
        console.log(err)
    }
}
//This function assists in removing the required for all fields inside a given class
function setRequiredInClass(requiredOrNot, name, arrDontChange = []) {
    var formFields = fd.fields();
    var formControl = fd.controls();

        //https://community.plumsail.com/t/disable-all-fields-in-a-grid-container/10249/2

    formFields.forEach(field => {
        if (field.$el.closest("." + name) != null && !arrDontChange.includes(field.internalName)) {
                field.required = requiredOrNot;
        }
    })

    formControl.forEach(field => {
        if (field.$el.closest("." + name) != null && !arrDontChange.includes(field.internalName)) {
            field.required = requiredOrNot;
        }
    })
}

//This function assumes if an item is visible, it should be required.
//Depending on parameters, it will either make a field go away or appear
//It will control the fields themselves, as opposed to the class that they're in.
//This function is mostly used in Form B

//Important to note: The way this is hidden is fundamentally different from the way classes are hidden.
//Be sure to note: Hiding/Showing a class will not affect the visibility of a field hidden like this
//If parameter is true, will show and require
function individualFieldVisibilityAndRequired(fieldName, trueOrFalse, dataTableOrField = "Field") {
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