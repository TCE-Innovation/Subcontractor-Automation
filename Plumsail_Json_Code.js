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
* The following predefined variables can be utilized in the code:                                      *
*                                                                                                      *
* fd    an instance of the current form                                                                *
* $     jQuery object                                                                                  *
*                                                                                                      *
*******************************************************************************************************/

var script = document.createElement('script'); 
 
script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
document.getElementsByTagName('head')[0].appendChild(script);
// Uncomment the code below to start using it in the form.

// ================================================================
//  EXAMPLE 1: The code is executed right after rendering the form 
// ================================================================


//Populate Data Table from a public file



fd.rendered(function () {
    async function externalFile() {
    const data = $.get('https://kyleh2420.github.io/test.json');
    return data;
}

    // The function populates FullName with values from FirstName and LastName
    function autoPopulateGenContractor() {

        /*
        fd.field('NameOfGeneralContractor').value = "JTTC";
        fd.field('AddressOfGeneralContractor').value = "1010 Northern Blvd, Great Neck, NY 11021";
        fd.field('GeneralContractNum').value = "A-37139";
        
        */
        externalFile().then(function(data){
        console.log("Running Code");
        /*fd.field('NameOfGeneralContractor').value = data.NameOfGeneralContractor;
        fd.field('AddressOfGeneralContractor').value = data.AddressOfGeneralContractor;
        fd.field('GeneralContractNum').value = data.GeneralContractNum;
        fd.field('ContractIsFederallyFunded').value = data.ContractIsFederallyFunded; */

        //const {GeneralInformation, AddressOfGeneralContractor, GeneralContractNum, ContractIsFederallyFunded} = data
        const {GCName, GCAddress} = {GCName: data.map(a => a.GeneralContracotr), GCAddress: data.map(a => a.GCAddress)}
        fd.field('NameOfGeneralContractor').value = GCName;
        fd.field('AddressOfGeneralContractor').value = GCAddress;
})
    }
    
    function showHideQ3() {
        if (fd.field('CorpOrCoPartner').value === 'Corporation'){
            fd.field('IncorporationDate').hidden = true;
            fd.field('PresidentsName').hidden = true;
            fd.field('VicePresidentsName').hidden = true;
            fd.field('SecretarysName').hidden = true;
            fd.field('TreasurersName').hidden = true;
            
            fd.field('DateOfOrganization').hidden = false;
            fd.field('CountyClerk').hidden = false;
            fd.field('Partners').hidden = false;
        } else /*if (fd.field('CorpOrCoPartner').value === 'Co-partnership')*/ {
            fd.field('IncorporationDate').hidden = false;
            fd.field('PresidentsName').hidden = false;
            fd.field('VicePresidentsName').hidden = false;
            fd.field('SecretarysName').hidden = false;
            fd.field('TreasurersName').hidden = false;
            
            fd.field('DateOfOrganization').hidden = true;
            fd.field('CountyClerk').hidden = true;
            fd.field('Partners').hidden = true;
        } 
    }
    

    // Populate FullName when the form is rendered
    autoPopulateGenContractor();
    //showHideQ3();
    
    //On Field change
    fd.field('CorpOrCoPartner').$on('change',showHideQ3);
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

