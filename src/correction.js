GI = {"Name of Proposed Subcontractor": "t.GI.subcontractorName",
           "Street Address of Subcontractor": "t.GI.streetAddrOfSubContractor",
            "City of Subcontractor": "t.GI.cityOfSubcontractor",
            "State of Subcontractor": "dd.GI.stateOfSubcontractor",
            "Zip Code of Subcontractor": "zipCodeOfSubcontractor",
            "Subcontractor Telephone Number": "subcontractorTelephoneNumber",
            "Subcontractor Fax Number": "t.GI.subcontractorFaxNumber",
            "Subcontractor EIN": "mt.GI.subcontractorEIN",
            "Description of Work": "n.GI.descriptionOfWork",
            "Total Amount of Proposed Subcontract": "num.GI.totalAmountOfProposedSubcontract"
    };
SQS = {
            "2a: Local Home Address": "2a.streetAddr",
            "2a: Local Home City": "2a.city",
            "2a: Local Home State": "2a.state",
            "2a: Local Zip Code": "t.SQS.2a.zipCode",
            "3: Are you a corporation or a co-partnership": "sc.SQS.3.corpOrCoPartner",
            "3 (Corporation) - Incorporation Date": "d.SQS.3.incorporationDate",
            "3 (Corporation) - Presidents Name": "t.SQS.3.president'sName",
            "3 (Corporation) - VP's Name": "t.SQS.3.vicePresident'sName",
            "3 (Corporation) - Treasurer's Name": "t.SQS.3.treasurer'sName", 
            "3 (Corporation) - Secretary's Name": "t.SQS.3.secretary'sName",
            "3 (Co-Partnership) - Date of Organization": "d.SQS.3.dateOfOrg",
            "3 (Co-Partnership) - County Papers are filed in": "t.SQS.3.county",
            "3 (Co-Partnership) - Names and Address of Partners": "dt.SQS.3.namesAndAddrsOfPartners",
            "6: D/M/WBE requirements of contract": "sc.isProposedSupplierDMWBE",
            "7: How many years as a contractor?": "num.SQS.7.yrsExpAsContractor",
            "7: How many years as a subcontractor?": "num.SQS.7.yrsExpAsSubcontractor",
            "8: Previous expereince of directing officers": "dt.SQS.8.prevExp",
            "9: Principal contracts completed": "dt.SQS.9.principalContracts",
            "10: Contracts that the present organization has on hand": "dt.SQS.10.contractsOnHand",
            "11: References": "dt.SQS.11.refs",
            "12: Labor Employed Through": "dt.SQS.11.refs",
            "12: Union Name": "t.SQS.12.unionName",
            "12: Union Address": "t.SQS.12.addr",
            "12: Union Local No": "t.SQS.12.localNo",
            "12: Union Tele": "t.SQS.12.telephone"

};

SF = {
    "Is Schedule F3 applicable?": "sc.SF.FF3.FF3Applicable",
    "1: Type of Federal Action": "sc.SF.FF3.1.typeOfFederalAction",
    "2: Status of Federal Action": "sc.SF.FF3.2.statusOfFederalAction",
    "3: Report Type": "sc.SF.FF3.3.reportType",
    "3b: Material Change Year": "t.SF.FF3.3.yr",
    "3b: Material Change Quarter": "t.SF.FF3.3.quarter",
    "3b: Material Change Date of Last Report": "t.SF.FF3.3.date",
    "4: Name and Address of Reporting Entity": "sc.SF.FF3.4.primeOrSubawardee",
    "4: Subawardee Tier": "t.SF.FF3.4.tier",
    "4: Name of Reporting Entity": "t.SF.FF3.4.nameOfReportingEntity",
    "4: Address of Reporting Entity": ""
};

SF1 = {
    "6: List active contracts that are running concurrently": "dt.SF1.6.activeContracts"
};

RMSA = {
    "Is RMSA required?": "sc.RMSA.isRequired",
    "Material Description": "n.RMSA.materialDescription",
    "Supplier Name": "t.RMSA.Supplier.name",
    "Supplier Street Address": "t.RMSA.Supplier.streetAddr",
    "Supplier City": "t.RMSA.Supplier.city",
    "Supplier State": "dd.RMSA.Supplier.state",
    "Supplier Zip Code": "t.RMSA.Supplier.zipCode",
    "Supplier Phone Number": "t.RMSA.Supplier.phoneNumber",
    "Local Manufacturing Facility Street Address": "t.RMSA.localManufacturingFacility.streetAddr",
    "Local Manufacturing Facility City": "t.RMSA.localManufacturingFacility.city",
    "Local Manufacturing Facility State": "ddi.RMSA.localManufacturingFacility.state",
    "Local Manufacturing Facility Zip Code": "t.RMSA.localManufacturingFacility.zipCode",
    "D/M/WBE requirements of contract": "sc.isProposedSupplierDMWBE",
    "Cost of Materials": "num.RMSA.costOfMaterials",
    "References": "dt.RMSA.refs"
};

SBP1 = {"A. Contractor's Full Legal Name": "t.SB.P1.A.contractorsFullLegalName",
        "B. Contractor's Mailing Address": "t.SB.P1.B.contractorsMailingAddress",
        "C. Contractor's Street Address": "t.SB.P1.C.streetAddress",
        "D. Prior Addresses": "n.SB.P1.D.changedAddress",
        "E. Primary Point of Contact Name": "t.SB.P1.E.primaryContactName",
        "E. Primary Point of Contact Email": "t.SB.P1.E.primaryContactEmail",
        "E. Primary Point of Contact Tele": "t.SB.P1.E.primaryContactTelephoneNumber",
        "F. Contractor's EIN": "mt.SB.P1.F.contractorEIN",
        "G. Type of Legal Entity": "t.SB.P1.G.typeOfLegalEntity",
        "G. Name of Partner 1": "t.SB.P1.G.1.partnerPartyName",
        "G. TIN/EIN/SSN of Partner 1": "t.SB.P1.G.1.TINEINSSN",
        "G. % ownership of Partner 1": "num.SB.P1.G.1.percentageOfOwnership",
        "G. Name of Partner 2": "t.SB.P1.G2.partnerPartyName",
        "G. TIN/EIN/SSN of Partner 2": "t.SB.P1.G.2.TINEINSSN",
        "G. % ownership of Partner 2": "num.SB.P1.G.2.percentageOfOwnership",
        "G. Name of Partner 3": "t.SB.P1.G.3.partnerPartyName",
        "G. TIN/EIN/SSN of Partner 3": "t.SB.P1.G.3.TINEINSSN",
        "G. % ownership of Partner 3": "num.SB.P1.G.3.percentageOfOwnership",
        "H. Year contractor was organzied": "num.SB.P1.H.yearOfOrganization",
        "H. State contractor was organized": "t.SB.P1.H.stateOfOrganization",
        "H. If organized under foreign country": "t.SB.P1.H.country",
        "I. DBA Names": "t.SB.P1.I.DBA"
    };
SBP2 = {"A. Name of Person Completing Form": "t.SB.P2.A.name",
        "B. Employer/Title": "t.P2.B.employerTitle",
        "C. Office Number": "t.SB.P2.C.officeNumber",
        "C. Mobile Number": "t.SB.P2.C.mobileNumber",
        "D. Email Address": "t.SB.P2.D.email"};
SBP3 = {"A. Has contractor been declared not responsible?": "sc.SB.P3.A.notResponsible",
        "B. Has the contractor been debarred, suspended, or disqualified?": "sc.SB.P3.B.debarred",
        "C. Is there a proceeding pending against the contractor?": "sc.SB.P3.C.pendingDebarment",
        "D. Has contractor defaulted or terminated on a contract?": "sc.SB.P3.D.terminated",
        "E. Entity requested enforcement of its rights under a surety agreement?": "sc.SB.P3.E.suretyAgreement",
        "F. Has Contractor been required to engage the services of a monitor?": "sc.SB.P3.F.monitor",
        "G. Has Contractor's safety practices been evaluated as less than satisfactory?": "sc.SB.P3.G.safety",
        "H. Compensation Experience rating of 1.2 or greater?": "sc.SB.P3.H.compensationRating",
        "Please Explain why you have answered YES": "sc.SB.P3.seperateSheet",
        "Any seperate PDF Attachments": "a.SB.P3.attachments"};
SBP4 = {"Please attach a complete organizational chart": "a.SB.P4.completeOrganizationChart",
        "A. Has contractor been convicted or pleaded nolo contendere?": "sc.SB.P4.A.noloContendere",
        "B. Contractor has pending the commission of a crime (Unfavorable termination)?": "sc.SB.P4.B.unfavorableTerminated",
        "C. Subject of investigation in connection to commision of a crime": "sc.SB.P4.C.subjectOfCrime",
        "D. Disqualified from bidding for any government entity": "sc.SB.P4.D.disqualifiedBid",
        "E. Has Contractor refused testimony": "sc.SB.P4.E.refuseTestimony",
        "F. Has contractor refused testimony in NYS?": "sc.SB.P4.F.refuseTestimonyNYS",
        "G. Has contractor been convicted of a civil judgement?": "sc.SB.P4.G.civilJudgement",
        "H. Has contractor entered into a deferred prosecution agreement?": "sc.SB.P4.H.deferredProsecution",
        "Explain any YES in Part 4": "t.SB.P4.yesToAnyAnswerExplain",
        "Attach any required documents": "a.SB.P4.relevantInformation"
};
SBP5 = {"A. Name, Title, Home, and Business Address of entities that hold more than 10%": "dt.SB.P5.A.10orMoreOwnership",
        "B. Name, Title, Home, and Business Address of directors and principal officers": "dt.SB.P5.B.directorsAndPrincipalOfficersOfContractor",
        "C. Has contractor been a subcontractor on any conctractor with the MTA": "sc.SB.P5.C.subcontractor",
        "C. If yes, provide contracto number and description": "dt.SB.P5.C.pastThreeYrs",
        "D. Has the contractor filed for bankruptcy protection?": "sc.SB.P5.D.bankruptcy",
        "E. Are there any judgements, injuctions, or liens against contractor by a government entity": "sc.SB.P5.E.liensExcess",
        "F. Are there any judgements against contractor that are unsatisfactory?": "sc.SB.P5.F.liensToday",
        "G. Has contractor failed to file or been delinquent on any tax return?": "sc.SB.P5.G.failedTax",
        "H. Does Contractor rent or own office space?": "sc.SB.P5.H.officeSpace",
        "H. Provide details": "n.SB.P5.H.officeSpaceDetails",
        "I. Is there any conflict of interest in real estate?": "sc.SB.P5.I.conflictOfInterest",
        "J. Does contactor share office space eith any entities?": "sc.SB.P5.J.sharedOffice",
        "J. Please Explain your shared office space": "n.SB.P5.J.sharedOfficeExplanation",
        "K1. If the answer is none": "sc.SB.P5.K.1.none",
        "K1a. Brief description of work": "n.SB.P5.K.1.a.descOfWork",
        "K1a. Contract Number": "t.SB.P5.K.1.a.contractNumber",
        "K1a. Dollar amount of award": "num.SB.P5.K.1.a.dollarAmtOfAward",
        "K1a. Date Completed": "d.SB.P5.K.1.a.dateCompleted",
        "K1a. Dollar amount at completion": "num.SB.P5.K.1.a.dollarAmtAtCompletion",
        "K1a. Name of Company and Owners Representative": "t.SB.P5.K.1.a.name",
        "K1a. Telephone of Company and Owner's Representative": "t.SB.P5.K.1.a.telephone",
        "K1b. Brief description of work": "n.SB.P5.K.1.b.descOfWork",
        "K1b. Contract Number": "t.SB.P5.K.1.bcontractNumber",
        "K1b. Dollar amount of award": "num.SB.P5.K.1.bdollarAmtOfAward",
        "K1b. Date Completed": "d.SB.P5.K.1.bdateCompleted",
        "K1b. Dollar amount at completion": "num.SB.P5.K.1.bdollarAmtAtCompletion",
        "K1b. Name of Company and Owners Representative": "t.SB.P5.K.1.bname",
        "K1b. Telephone of Company and Owner's Representative": "t.SB.P5.K.1.btelephone",
        "K1c. Brief description of work": "n.SB.P5.K.1.c.descOfWork",
        "K1c. Contract Number": "t.SB.P5.K.1.c.contractNumber",
        "K1c. Dollar amount of award": "num.SB.P5.K.1.c.dollarAmtOfAward",
        "K1c. Date Completed": "d.SB.P5.K.1.c.dateCompleted",
        "K1c. Dollar amount at completion": "num.SB.P5.K.1.c.dollarAmtAtCompletion",
        "K1c. Name of Company and Owners Representative": "t.SB.P5.K.1.c.name",
        "K1c. Telephone of Company and Owner's Representative": "t.SB.P5.K.1.c.telephone",
        "K2. If the answer is None": "sc.SB.P5.K.2.none",
        "K2. Each contract for which liquidated damages or penalties were asserted": "dt.SB.P5.K.2.last3YrsPenalities",
        "K3. If Answer is none": "sc.SB.P5.K.3.none",
        "K3. Has contractor been awarded any MTA contracts where work has not reached substantial completion": "dt.SB.P5.K.2.last3YrsPenalities",
        "K4. If answer is none": "sc.SB.P5.K.4.none",
        "K4. Any active contracts where work is managed by the same office that manages its contracts with MTA": "sc.SB.P5.K.4.none",
        "K5. If answer is none": "sc.SB.P5.K.5.none",
        "K5. Subcontractor on MTA contracts that have not reached substantial completion": "sc.SB.P5.K.5.none",
        "L. If none of the sitations have occurred": "sc.SB.P5.L.none",
        "L. Furnish the following info for each contract for which the contractor was": "dt.SB.P5.L.contractSituations",
        "M. If none, click none": "sc.SB.P5.M.none",
        "M. List all employees who are currently employees of the MTA": "dt.SB.P5.M.employeesOfMTA",
        "N. Affiliate companies in a direct line of report": "sc.SB.P5.N.haveSubsidiaryOrAffiliate",
        "O. Is contractor a subsidiary of another entity": "sc.SB.P5.O.isContractorSubsidiaryOfGroup",
        "P. Does any entity with more than 10%+ interest have 10%+ interest in any other entity?": "sc.SB.P5.P.ownershipOfOtherEntity",
        "Q. If the answer to N, O, or P is yes, would the answer also be yes for other subsidiary?": "sc.SB.P5.Q.sameBusinessGroup",
        "Q. Please attach your explanation": "n.SB.P5.Q.explanation"
    };
SBP6 = {"Owners or Partners of contractor": "dt.SB.P6.ownerAndPartners"};

SB1 = {
    "Do you require Schedule B1?": "sc.SB1.isSB1Required",
    "1. Technical Explanation": "n.SB1.1.explanation",
    "1a. See Section": "t.SB1.1.seeSection",
    "2. Licenses": "dt.SB1.2.licenses",
    "3. License revoked in the past 3 years?": "n.SB1.3.explanationOfSuspendedLicensesPermitsOrCertifications",
    "4. Performance Bond Information": "dt.SB1.4.performanceBondInfo",
    "5. Subcontracts": "dt.SB1.5.subcontracts",
    "6. Prior MTA Employees": "dt.SB1.6.priorMTAEmployees"
};

OCIPA = {
    "Section 1 - Contact Name": "t.OCIP.FA.S1.contact",
    "Section 1 - Contact Email": "t.OCIP.FA.S1.email",
    "Section 1 - EMR": "num.OCIP.FA.S1.EMR",
    "Section 1 - Contract/Bid type": "mc.OCIP.FA.S1.contractBid",
    "Section 1 - Estimated Start Date": "d.OCIP.FA.S1.estimatedStartDate",
    "Section 1 - Estimated Completion Date": "d.OCIP.FA.S1.estimatedCompletionDate",
    "Section 1 - Who are you contracted with?": "t.OCIP.FA.S1.whoAreYouContractedWith",
    "Section 1 - Are you subcontracting any work?": "sc.OCIP.FA.S1.areYouSubcontractingOutAnyWork",
    "Section 2 - Worker's Comp Carrier": "t.OCIP.FA.S2.workersCompCarrier",
    "Section 2 - Worker's Comp Policy Number": "t.OCIP.FA.S2.workersCompPolicyNumber",
    "Section 2 - Worker's Comp Effective": "mt.OCIP.FA.S2.workersCompEffective",
    "Section 2 - Worker's Comp Expiration": "mt.OCIP.FA.S2.workersCompExpiration",
    "Section 2 - Rating Board File Num": "t.OCIP.FA.S2.ratingBoardFileNumber",
    "Section 2 - Rating Date": "d.OCIP.FA.S2.ratingDate",
    "Section 2 - General Liability Carrier": "t.OCIP.FA.S2.yourGeneralLiabilityCarrier",
    "Section 2 - Auto Liability Carrier": "t.OCIP.FA.S2.yourAutomobileLiabilityCarrier",
    "Section 2 - Excess Liability Carrier": "t.OCIP.FA.S2.yourExcessLiabilityCarrier",
    "Section 2 - Broker Name": "t.OCIP.FA.S2.insuranceAgentBrokerName",
    "Section 2 - Broker Address": "t.OCIP.FA.S2.insuranceAgentBrokerAddr",
    "Section 2 - Broker Contact": "t.OCIP.FA.S2.insuranceAgentBrokerContact",
    "Section 2 - Broker Phone": "t.OCIP.FA.S2.insuranceAgentBrokerPhone",
    "Section 2 - Date Prepared": "d.OCIP.FA.S2.datePrepared",
    "Section 2 - Fax": "t.OCIP.FA.S2.insuranceAgentBrokerFax",
    "Section 2 - Print": "t.OCIP.FA.S2.printName",
    "Section 2 - Date": "d.OCIP.FA.S2.date",
    "Section 2 - Title": "t.OCIP.FA.S2.title"
};

OCIPB = {
    "Section 1 - Gross Contract Value (Including Insurance)": "num.OCIP.FB.S1.grossContractValue",
    "Section 1 - New Contract Value (Excluding Insurance)": "num.OCIP.FB.S1.netContractValue",
    "Section 1 - Estimate Limited Payroll": "num.OCIP.FB.S1.estimatedLimitedPayroll",
    "Section 1 - Estimated Unlimited Payroll": "num.OCIP.FB.S1.estimatedUnlimitedPayroll",
    "Section 1 - Workers Compensation Deductible": "num.OCIP.FB.S1.workersCompensationDeductibleAmount",
    "Section 1 - General Liability Deductible": "num.OCIP.FB.S1.generalLiabilityDeductibleAmount",
    "Section 2 - Calculate your insurance premium": "dt.OCIP.FB.S2.insurancePremium",
    "Section 2 - Total Manual Premium": "num.OCIP.FB.S2.totalManualPremium",
    "Section 2 - Experience Mod": "num.OCIP.FB.S2.experienceMod",
    "Section 2 - Modified Premium": "num.OCIP.FB.S2.modifiedPremium",
    "Section 2 - Description 1": "t.OCIP.FB.S2.description1",
    "Section 2 - Description 2": "t.OCIP.FB.S2.description2",
    "Section 2 - Description 3": "t.OCIP.FB.S2.description3",
    "Section 2 - Description 4": "t.OCIP.FB.S2.description4",
    "Section 2 - +/- 1": "dd.OCIP.FB.S2.plusOrMinus1",
    "Section 2 - +/- 2": "dd.OCIP.FB.S2.plusOrMinus2",
    "Section 2 - +/- 3": "dd.OCIP.FB.S2.plusOrMinus3",
    "Section 2 - +/- 4": "dd.OCIP.FB.S2.plusOrMinus4",
    "Section 2 - Rate 1": "num.OCIP.FB.S2.rate1",
    "Section 2 - Rate 2": "num.OCIP.FB.S2.rate2",
    "Section 2 - Rate 3": "num.OCIP.FB.S2.rate3",
    "Section 2 - Rate 4": "num.OCIP.FB.S2.rate4",
    "Section 2 - Modified $1": "num.OCIP.FB.S2.modified1",
    "Section 2 - Modified $2": "num.OCIP.FB.S2.modified2",
    "Section 2 - Modified $3": "num.OCIP.FB.S2.modified3",
    "Section 2 - Modified $4": "num.OCIP.FB.S2.modified4",
    "Section 2 - Running Total 1": "num.OCIP.FB.S2.runningTotal1",
    "Section 2 - Running Total 2": "num.OCIP.FB.S2.runningTotal2",
    "Section 2 - Running Total 3": "num.OCIP.FB.S2.runningTotal3",
    "Section 2 - Running Total 4": "num.OCIP.FB.S2.runningTotal4",
    "Section 2 - Total WC Premium": "num.OCIP.FB.S2.totalWCPremium",
    "Section 2 - General Liability Rate": "num.OCIP.FB.S2.generalLiability.currentRate",
    "Section 2 - General Liability Factor": "num.OCIP.FB.S2.generalLiability.factor",
    "Section 2 - General Liability Unlimited Payroll":"num.OCIP.FB.S2.generalLiability.unlimitedPayrollOrReceipts",
    "Section 2 - General Liability Premium": "num.OCIP.FB.S2.generalLiability.premium",
    "Section 2 - Excess Liability Rate": "num.OCIP.FB.S2.excessLiability.currentRate",
    "Section 2 - Excess Liability Factor": "num.OCIP.FB.S2.excessLiability.factor",
    "Section 2 - Excess Liability Unlimited Payroll":"num.OCIP.FB.S2.excessLiability.unlimitedPayrollOrReceipts",
    "Section 2 - Excess Liability Premium": "num.OCIP.FB.S2.excessLiability.premium",
    "Section 2 - Overhead and Profit": "num.OCIP.FB.S2.overheadAndProfit",
    "Section 2 - Total Estimated Insurance": "num.OCIP.FB.S2.totalEstimatedInsuranceCost",
    "Section 2 - Date": "d.OCIP.FB.S2.date",
    "Section 2 - Print": "t.OCIP.FB.S2.printName",
    "Section 2 - Title": "t.OCIP.FB.S2.title"

};
OCIPCOI = {
    "Certificate Upload": "a.OCIP.COI.upload"
}
column1MTAForms = {"General Information": GI,
                        "SQS": SQS,
                        "Schedule F": SF,
                        "Schedule F1": SF1,
                        "Request for Material Supplier Approval": RMSA,
                        "Schedule B Part 1": SBP1,
                        "Schedule B Part 2": SBP2,
                        "Schedule B Part 3": SBP3,
                        "Schedule B Part 4": SBP4,
                        "Schedule B Part 5": SBP5,
                        "Schedule B Part 6": SBP6,
                        "Schedule B1": SB1,
                        "OCIP Form A": OCIPA,
                        "OCIP Form B": OCIPB,
                        "OCIP COI": OCIPCOI
};


/*
+-------------------------------------------------------------------------------------------------------------+
|                                                                                                             |
|                         fd.rendered gets run once the form is completely rendered.                          |
|                    The functions inside are responsible for updating what the user sees                     |
|                                          upon something updating.                                           |
|                                                                                                             |
|        $on('edit'...) will change the dropdowns on Column1 and Column2 upon clicking the dropdowns.         |
|                                                                                                             |
|$on('change'...) will update the rightmost column with the internal name once the dropdown has been selected.|
|                                                                                                             |
+-------------------------------------------------------------------------------------------------------------+
*/
fd.rendered(function() {
    disableLastColumn();

    async function externalFile() {
        urlOfJSON = "https://tce-innovation.github.io/Subcontractor-Automation/data/correctionData.json";
        fetch(urlOfJSON).then (response => {
            if (!response.ok) {
                throw new Error (`Network response was not ok: ${response.status}`);
            }
            return response.json();
        }).then(jsonData => {
            //Everytime the datatable is edited, it will update the drop downs with the correct infomration
            fd.control('DataTable1').$on('edit', function(e) {
                //console.log(e);
                if (e.column.field === 'Column1') {
                    populateColumn(e.widget, e.model.Column1, column1MTAForms);
                }
                if (e.column.field === 'Column2') {
                    populateColumn(e.widget, e.model.Column2, column1MTAForms[e.model.Column1]);
                }
            });
            
            //Everytime the datatable is edited, it will update the third dropdwon 
            fd.control('DataTable1').$on('change', function(value) {
                for (var i = 0; i < value.length; i++) {
                    //console.log(value);
                    try{
                    value[i].set('Column3', column1MTAForms[value[i].Column1][value[i].Column2]); 
                    } catch {
                        console.log(column1MTAForms[value[i].Column1]);
                    }
                }
                console.log(checkColumn3Filled());
            });
        })
        .catch(error => {
            console.error("Error fetching the JSON data:", error);
        });
    }
    data = {}
    externalFile().then(function (jsonData) {
        data = jsonData;
    })
    
});
/*
+-------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                         |
|                     Before saving, we need to check to make sure nothing is missing from the form.                      |
|                   That is: there are no "undefined"s in column 3, where the internal name should be.                    |
|                         If that function fails, throw an error and disallow the user to submit.                         |
|                                                                                                                         |
|      Once we know that the form is good to go, we need to compose the JSON to be sent to the Power Automate step.       |
|                                                                                                                         |
|                             Power Automate expects the 5 essential pieces of information.                               |
|                                                  1. Subcontractor Name                                                  |
|                                                   2. Contract Number                                                    |
|3. Body of email (An array of the specified changes, to be added to the email) [It was simpler in JS than Power Automate]|
|      4. editableItems (An array of internal names that should be edited. This will be inserted into the JSON file)      |
|                        5. email (An array of emails addresses whom the email should be sent to)                         |
|                                                                                                                         |
+-------------------------------------------------------------------------------------------------------------------------+
*/
fd.beforeSave(function() {
    if (checkColumn3Filled()) {
        console.log(checkColumn3Filled());
        throw new Error("Your form is not completed - there are still missing components");
    }
    
    url = "https://prod-76.westus.logic.azure.com:443/workflows/34545c436ff04f18a535e11258c53ad7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QaY6UKMxwRLFyre2HKECVA9N8c_3k2WYfX5ZuYYngrg";
    formData = fd.data();
    dataToSend = {};
    dataToSend["t.GI.subcontractorName"] = formData["t.GI.subcontractorName"];
    dataToSend["mt.GI.contractNo"] = formData["mt.GI.contractNo"];
    console.log(dataToSend);
    
    formToCorrect = extractData("DataTable1", "Column1");
    questionsToCorrect = extractData("DataTable1", "Column2");

    bodyOfEmail = [];
    emptyString = "";
    for (var i = 0; i < formToCorrect.length; i++) {
        bodyOfEmail.push(formToCorrect[i].concat(' - ',questionsToCorrect[i]));
        //console.log(bodyOfEmail);
    }
    dataToSend.bodyOfEmail = bodyOfEmail;
    dataToSend.editableItems = extractData("DataTable1", "Column3");
    
    
    dataToSend.email = extractData("dt.email", "Email");
    console.log(dataToSend);
    
    interactWithAPI(dataToSend, url);
    throw new Error("Preventing you from submitting");
});


/*
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|This function will extract all the values in a column in a data table and return it as an array|
|                                                                                               |
+-----------------------------------------------------------------------------------------------+
*/
function extractData(dt, col) {
    returnArray = [];
    
    fd.control(dt).value.forEach(row => {
        returnArray.push(row[col]);
    });
    return returnArray;
}
/*
+-------------------------------------------------------------------------------------------+
|                                                                                           |
|      This function will send the data provided to the url provided as POST request.       |
|I chose POST over GET since a body with information could be included at all times in POST.|
|                                                                                           |
+-------------------------------------------------------------------------------------------+
*/
function interactWithAPI(data, url) {
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
}

/*
+--------------------------------------------------------------------------------------------------------+
|                                                                                                        |
|                 This function, checkColumn3Filled(), iterates through the data table                   |
|"DataTable1" and counts the number of rows where the value in "Column3" is undefined (i.e., not filled).|
|                                                                                                        |
|                 returns {number} The count of rows with undefined values in "Column3".                 |
|                                                                                                        |
|                                                                                                        |
+--------------------------------------------------------------------------------------------------------+
*/
function checkColumn3Filled() {
    //This function should loop through the data table and return 1 if the column something is undefined (ie. not filled)
    //Thus, lets count the number of undefineds. If it exceeds 1, then we have an empty row, and we should return the number of undefineds. Otherwise, return 0
    var i = 0;
    fd.control("DataTable1").value.forEach(row => {
        if (row.Column3 === undefined) {
            i++;
        }
    });
    return i;
}

/*
+---------------------------------------------------------------------------------------------------------------+
|                                                                                                               |
|This helper function, populateColumn(), is designed to populate the dropdown of a specific cell in a datatable.|
|                                                                                                               |
|                    @param {any} widget - The widget (dropdown) to be populated with data.                     |
|                                                                                                               |
|           @param {any} value - The value to be selected in the dropdown (if it exists in the data).           |
|                                                                                                               |
|          @param {Array} arrayName - The array containing the data to populate the dropdown options.           |
|                                                                                                               |
|                           @returns {void} This function does not return any value.                            |
|                                                                                                               |
+---------------------------------------------------------------------------------------------------------------+
*/
function populateColumn(widget, value, arrayName) {
    widget.setDataSource({
        data: Object.keys(arrayName)
    });
    widget.value(value);
}

/*
+-------------------------------------------------------------------------------------+
|                                                                                     |
|               This function, disableLastColumn(), is used to disable                |
|the editing capability of the last column ('Column3') in the data table "DataTable1".|
|                                                                                     |
|              @returns {void} This function does not return any value.               |
|                                                                                     |
+-------------------------------------------------------------------------------------+
*/
function disableLastColumn() {
    const premiumColumn = fd.control("DataTable1").columns.find(c => c.field === 'Column3');
    premiumColumn.editable = () => false;
}
