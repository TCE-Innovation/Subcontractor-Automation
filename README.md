
# TCIG Subcontractor Automation Forms

The MTA requires all subcontractors to fill out some permutation of the following forms, to be formatted as two packets: Statement of Qualification of Subcontractor (SQS) and Owner Controlled Insurance Program (OCIP). These two packets are to be submitted on different occasions. For simplicitys sake, TCE will ask subcontractors to complete the forms all at once.

|SQS|OCIP|
|:-:|:-:|
|Schedule A: Federal Certification of Restrictions on Lobbyuing|OCIP Form A: Enrollment Form|
|Schedule B: Contractor Responsibility Form|OCIP Form B: Insurance Cost Worksheet|
|Schedule F (Containing F1, F2, and F3)| Certificate of Insurance (COI)|
|Schedule B1: Contract Specific Responsibility Form|
|Schedule F1: Contract-Specific Subcontractor Questionaire|
|SQS Form: Statement of Qualification of Subcontractor/RMSA: Request for Material Supplier Approval|
|Form B - Intent to Perform|

TCE has had problems with these forms in the past - mainly subcontractors leaving required items uncompleted or misspelling information unknown to them, such as General Contractor information. The goal of this project is to minimize these mistakes as much as possible. This project will guide subcontractors through completing these forms, checking for correct formatting and mandating sections be filled where required. 
## Authors

- [Kyle Han (@Kyleh2420)](https://www.github.com/Kyleh2420)
- [Rachel Leong (@RLL24187)](https://github.com/RLL24187)


## Tech Stack

**Client:** [Plumsail Forms](https://plumsail.com/forms/), JavaScript

**Server:** [Microsoft Power Automate](https://powerautomate.microsoft.com/en-us/), Adobe API, Github Pages


## Lessons Learned

Consider a custom implementation, such as through a native web application, as opposed to building off existing "productivity" apps. These productivity apps were not designed with such a scale in mind, and therefore is unsuitable for a project like this.


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Documentation

[Documentation](https://linktodocumentation)

