export var json = {
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "MODE",
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
      "type": "paneldynamic",
      "name": "SIGNATORY",
      "visibleIf": "{MODE} notempty and {MODE} <> 'manual'",
      "title": "Signatory",
      "templateElements": [
       {
        "type": "text",
        "name": "NOM",
        "title": "First Name"
       },
       {
        "type": "text",
        "name": "PRENOM",
        "startWithNewLine": false,
        "title": "Last Name"
       },
       {
        "type": "text",
        "name": "TELEPHONE",
        "startWithNewLine": false,
        "title": "Phone"
       },
       {
        "type": "text",
        "name": "EMAIL",
        "startWithNewLine": false,
        "title": "Email"
       }
      ],
      "panelCount": 1,
      "minPanelCount": 1
     },
     {
      "type": "html",
      "name": "question8",
      "visibleIf": "{MODE} = 'manual'",
      "html": "<button>Download</button>"
     },
     {
      "type": "file",
      "name": "Upload",
      "visibleIf": "{MODE} = 'manual'",
      "startWithNewLine": false,
      "showPreview": false,
      "maxSize": 0
     },
     {
      "type": "html",
      "name": "SEND",
      "enableIf": "{MODE} notempty",
      "html": "<button class='my-button'>Send</button>"
     }
    ]
   }
  ]
 };