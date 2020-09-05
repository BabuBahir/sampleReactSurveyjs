export var json = {
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question1",
      "title": "Mode",
      "choices": [
       {
        "value": "universign-face",
        "text": "e-sign face-to-face"
       },
       {
        "value": "universign",
        "text": "e-sign"
       },
       {
        "value": "manual",
        "text": "manual"
       }
      ],
      "colCount": 3
     },
     {
      "type": "text",
      "name": "question2",
      "title": "Village Name"
     },
     {
      "type": "text",
      "name": "question3",
      "title": "First Name"
     },
     {
      "type": "radiogroup",
      "name": "question4",
      "choices": [
       "item1",
       "item2",
       "item3"
      ]
     },
     {
      "type": "html",
      "name": "question9",
      "html": "<button class='my-button'>Call Bank Services</button>"
     }
    ]
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "text",
      "name": "question5",
      "title": "website"
     },
     {
      "type": "text",
      "name": "question6",
      "title": "Last Name"
     },
     {
      "type": "radiogroup",
      "name": "question7",
      "choices": [
       "item1",
       "item2",
       "item3"
      ]
     },
     {
      "type": "fileuploader",
      "name": "question8"
     }
    ]
   }
  ],
  "signmode": "question1",
  "nom": "question3",
  "prenom": "question6",
  "upload": "question8"
 }