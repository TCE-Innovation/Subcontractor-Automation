---
title: Future Considerations
layout: default
parent: Technical Specifications
nav_order: 7
#has_children: true
permalink: /docs/future
---

## Known Issues
* Subcontractor can submit multiple times with the same link.
* Need to update the final file path. Right now, all the submissions are existing in the Summer Intern 2023 project.
* Currently, Rachel's account is being used for the connection to Adobe PDF Services API. 
* Currently, the Adobe Acrobat Pro account is under Annalisa.
* Consider standardizing error messages for formatting things like zip-codes and phone numbers. This can help subcontractors better find where the errors are. 
* Consider changing 10b on Schedule F to a data table and match a variable that parses the arguments of the data table
* Consider changing the order of "No"s and "Yes"s in Schedule B Parts 3, 4, and 5
* In OCIP Form B, the running total is correct unless the user filters the responses, in which case the running total does not get recalculated with the different order
* When refilling the form for corrections, this does not check that the field is different than what was submitted
* Fields that were not required and not filled out are able to be edited with the corrections link
* Emails still look spammy
* When Schedule A and Schedule F are populated with a very long description, the signature may get pushed off the page. Consider adding a text box with the content control inside first.
* If there is too much content to fit in a text box, when the text box is populated the extra content will be cropped out (applies to text and images)
* We aren't sure exactly how strict formatting is for certain documents. This may become an issue if a form doesn't look exactly like the template, but we never found out for sure on a form by form basis and instead used our best judgment. We assume that the forms originally provided to us as PDFs should have the same exact format, but the forms originally provided in .xlsx and .docx format are less strict (e.g. can have more lines). The original forms can be found at this link: [https://judlauent.sharepoint.com/:f:/r/sites/A37139/Shared%20Documents/General/11-Legal%20%26%20Subcontractor%20and%20Suppliers/05-Subcontractors%20%26%20Suppliers/01-Subcontractor%20Approval%20Forms/MTA%20Specified%20Forms?csf=1&web=1&e=x5o39y](https://judlauent.sharepoint.com/:f:/r/sites/A37139/Shared%20Documents/General/11-Legal%20%26%20Subcontractor%20and%20Suppliers/05-Subcontractors%20%26%20Suppliers/01-Subcontractor%20Approval%20Forms/MTA%20Specified%20Forms?csf=1&web=1&e=x5o39y)
* .py file needs to be fixed to finish the rollout of the corrections form: it doesn't pump out OCIP A/B/COI correctly.

## Tips
* If a flow fails to run, debug the flow and rerun the flow by clicking on the failed run and clicking "Resubmit" as this will not use up another Plumsail submission. 
* This documentation was created in the last two weeks of our internship. The original documentation Word Document that we were working on throughout the internship can be found here (it may be outdated): [https://judlauent.sharepoint.com/:w:/s/TCEInnovation/EbuxTeRDPmxGoOcbfOaEysEB4_idfI3x9IEexufmbTFBqQ?e=wQ9qzX](https://judlauent.sharepoint.com/:w:/s/TCEInnovation/EbuxTeRDPmxGoOcbfOaEysEB4_idfI3x9IEexufmbTFBqQ?e=wQ9qzX)

## In the Future

* If I were to do this again, I would build an application from the ground up with the key difference of using a relational database. That way, all data is under our control instead of being sent between Plumsail, Power Automate, and SharePoint. A relational database would allow for more control over the data and how it is manipulated.

## Lessons Learned

* Definitely plan before coding
* Understand the full scope of the project to effectively plan and program
* Go in with the Object-Oriented Programming (OOP) mindset: it will help clean up the code.
    Each page gets its own object, in a separate ``.js` file. That way, each object would have "Events that can occur".

Class Form has attributes: 
- PDF link
- Events that can occur
- Handle events
- Fields in the events

Each schedule would extend class form to contain schedule specific information.

Future considerations:
Forms to update
