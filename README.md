
# TCIG Subcontractor Automation Forms

The MTA requires all subcontractors to fill out some permutation of the following forms, to be formatted as two packets: Statement of Qualification of Subcontractor (SQS) and Owner Controlled Insurance Program (OCIP). These two packets are to be submitted on different occasions. For simplicitys sake, TCE will ask subcontractors to complete the forms all at once.

TCE has had problems with these forms in the past - mainly subcontractors leaving required items uncompleted or misspelling information unknown to them, such as General Contractor information. The goal of this project is to minimize these mistakes as much as possible. This project will guide subcontractors through completing these forms, checking for correct formatting and mandating sections be filled where required.

# File management

Website publishing is done using Jekyll and the pages.yml document in .github/workflows. Directories beginning with . or _ are ignored by Jekyll and are not published to the open web. Other directories (and the files within them) are published to the open web and can be accessed directly through the url: https://tce-innovation.github.io/Subcontractor-Automation/...

- .github/workflows: Github actions pages.yml document. Renders and publishes the site to tce-innovation.github.io/Subcontractor-Automation
- assets: Required items to run the documentation site. https://tce-innovation.github.io/Subcontractor-Automation/assets/...
- data: Required data that needs to be pulled when loading up the forms.
- docs: Markdown files necessary for Jekyll site to run. All documentation is run out of here.
- forms: These HTML files contain the embed link to the forms themselves. This is what subcontractors will navigate to.
- Plumsail Forms: Backups of the plumsail forms themselves. The forms are stored in .json format.
- res: resources. Required resources for the forms to pull from.
- src: source. Required .js files for the forms to pull from
- _config.yml: config file required to run the documentation site
- Gemfile: Required file for Jekyll
- Gemfile.lock: required file for Jekyll
- index.md: main landing page for the documentation site

## Documentation

[Documentation](https://tce-innovation.github.io)

Documentation is provided by Just-TheDocs, and is linked in the ##Tech-Stack below. All the documents relating to that can be found in the ./docs folder

## Authors

- [Kyle Han (@Kyleh2420)](https://www.github.com/Kyleh2420)
- [Rachel Leong (@RLL24187)](https://github.com/RLL24187)

## Tech Stack

**Client:** [Plumsail Forms](https://plumsail.com/forms/), JavaScript

**Server:** [Microsoft Power Automate](https://powerautomate.microsoft.com/en-us/), Adobe API, Github Pages

**Documentation:** [Just-The-Docs](https://just-the-docs.com/)

## Lessons Learned

Consider a custom implementation, such as through a native web application, as opposed to building off existing "productivity" apps. These productivity apps were not designed with such a scale in mind, and therefore is unsuitable for a project like this.


