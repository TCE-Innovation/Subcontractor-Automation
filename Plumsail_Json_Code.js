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
    I've included the following code due to my use of the $ for JQuery. Plumsail natively supports 
    JQuery and it can be used externally, but this file is apparently loaded before Plumsail calls JQuery.
    Thus, this is a hacky workaround - I call for JQuery myself.

    The ideal solution would be to figure out how to reference this document after JQuery has loaded, but
    still retain the fd.rendered() function in this script. Alternatively, load the JSON file another way.
*/
var script = document.createElement('script'); 
 
script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
document.getElementsByTagName('head')[0].appendChild(script);

// ================================================================
//  EXAMPLE 1: The code is executed right after rendering the form 
// ================================================================
fd.rendered(function () {
    
    //Functions that run initially
    autoPopulateGenInfo();
    toggleFields();
    

    //Items that change on action
    fd.field('CorpOrCoPartner').$on('change',toggleFields);
    fd.field('B1Question').$on('change', toggleFields);
    fd.field('ScheduleF3Q3').$on('change', toggleFields);
    fd.field('ScheduleBQuestion').$on('change', toggleFields);
    fd.field('F3NA').$on('change', toggleFields);
});

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
async function externalFile() {
    const data = $.get('https://kyleh2420.github.io/default.json');
    return data;
}

function autoPopulateGenInfo() {

    //A Manual approach to populating fields
    /*
    fd.field('NameOfGeneralContractor').value = "JTTC";
    fd.field('AddressOfGeneralContractor').value = "1010 Northern Blvd, Great Neck, NY 11021";
    fd.field('GeneralContractNum').value = "A-37139";
    */

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
        try{const {EditableItems: editable} = data;}
        catch(err) {
            console.log("There is nothing editable in this document");
            EditableItems = [];
        }
//Any un-autofilled code should be editable. Thus, we reset before disabling.
        fd.fields().forEach(el => {
            fd.field(el.internalName).disabled = false;
        });

        Object.entries(data).forEach(el => {
            const [elKey, elValue] = el;

            try{
                fd.field(elKey).value = elValue;
                if (!editable.includes(elKey)) {
                    fd.field(elKey).disabled = true;
                }
            }
            catch(err) {
                console.log("Failed Autofill Key: " + elKey + ". Value: "+ elValue);
                console.log(!editable.includes(elKey));
            }
            
        });
    })
}
/*
    This function will toggle all the disappearing/conditional fields and update every them every time 
    it is called. When called, it will attempt to hide/show fields that correspond to the css class.

*/

function toggleFields() {
    console.log("Toggling Fields");

    //Toggles the SQS Form
    if (fd.field('CorpOrCoPartner').value === 'Corporation'){
        $('.SQSCorporation').show();
        $('.SQSCoPartnership').hide();
    } else if (fd.field('CorpOrCoPartner').value === 'Co-partnership') {
        $('.SQSCorporation').hide();
        $('.SQSCoPartnership').show();
    } else {
        $('.SQSCorporation').hide();
        $('.SQSCoPartnership').hide();
    }

    //Toggles Schedule F, Form F
    if (fd.field('F3NA').value === 'Not Applicable'){
        $('.ScheduleFFormF3').hide();
    } else {
        $('.ScheduleFFormF3').show();
    }

    //Toggles Schedule B
    if(fd.field('ScheduleBQuestion').value === 'I need to fill out schedule B'){
        $('.ScheduleBClass').show();
    } else{
        $('.ScheduleBClass').hide();
    }

    //Toggles Schedule B1
    if(fd.field('B1Question').value === 'I need to fill out Schedule B1'){
        $('.ScheduleB1Class').show();
    } else{
        $('.ScheduleB1Class').hide();
    }

    //Toggles F3 Materials List
    if(fd.field('ScheduleF3Q3').value === 'b. Material Change') {
        $('.ScheduleF3MaterialChange').show();
    } else{
        $('.ScheduleF3MaterialChange').hide();
    }

}
