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
    toggleSQS();
    

    //Items that change on action
    fd.field('CorpOrCoPartner').$on('change',toggleSQS);
    fd.field('B1Question').$on('change', toggleScheduleB1);
    fd.field('ScheduleF3Q3').$on('change', toggleF3Material);
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
    const data = $.get('https://kyleh2420.github.io/test.json');
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
        console.log("Running Code");
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
        const {GeneralInformation: GI} = data;
        console.log(GI);
        console.log(GI.GeneralContractor);
        fd.fields().forEach( el => function(el) {
            // access data -> title and value
            console.log(el.title);
            console.log(el.value);
        });
        
        fd.field('GCName').value = GI.GeneralContractor;
        fd.field('GCAddress').value = GI.GCAddress;
        fd.field('ContractNo').value = GI.ContractNo;
        fd.field('FederallyFunded').value = GI.FederallyFunded;
    })
}

function toggleSQS() {
    if (fd.field('CorpOrCoPartner').value === 'Corporation'){
        $('.SQSCorporation').attr('style', 'display:block;');
        $('.SQSCoPartnership').attr('style', 'display:none;');
    } else if (fd.field('CorpOrCoPartner').value === 'Co-partnership') {
        $('.SQSCorporation').attr('style', 'display:none;');
        $('.SQSCoPartnership').attr('style', 'display:block;');
    } else {
        $('.SQSCorporation').attr('style', 'display:none;');
        $('.SQSCoPartnership').attr('style', 'display:none;');
    }
}

function toggleScheduleB1() {
    if(fd.field('B1Question').value === 'I need to fill out Schedule B1'){
        $('.ScheduleB1Class').attr('style', 'display:block;');
    } else{
        $('.ScheduleB1Class').attr('style','display:none;');
    }
}

function toggleF3Material() {
    console.log("F3 toggle");
    if(fd.field('ScheduleF3Q3').value === 'b. Material Change') {
        $('.ScheduleF3MaterialChange').attr('style', 'display:block;');
        console.log("F3 shown (Attempt)");
    } else{
        $('.ScheduleF3MaterialChange').attr('style','display:none;');
        console.log("F3 Hidden (Attempt)");
    }
}