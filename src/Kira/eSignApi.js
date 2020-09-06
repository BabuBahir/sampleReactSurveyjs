import $ from "jquery";
export var signApiComponent= ({
            name:"SigInComponent",
            title:"Sign In Compoent",
            iconName: "icon-text",
            category: "Kiora",
            elementsJSON: [ 
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
                "type": "multipletext",
                  "name": "SIGNATORY", 
                  "visibleIf": "{MODE} <> 'manual'",
                  "title": "SIGNATORY",
                  "items": [
                    {
                    "name": "NOM",
                    "title": "First Name"
                    },
                    {
                    "name": "PRENOM",
                    "title": "Last Name"
                    },
                    {
                    "name": "TELEPHONE",
                    "title": "Phone"
                    },
                    {
                    "name": "EMAIL",
                    "title": "Email"
                    }
                  ],
                  "colCount": 4 
              },
              {
                "type": "html",
                "name": "downloadBtn", 
                "html": "<button>Download</button>"
              },
              {
                "type": "file",
                "name": "Upload",        
                "startWithNewLine": false,
                "showPreview": false,
                "maxSize": 0
              },
              {
                "type": "html",
                "name": "SEND",
                "html": "<button class='my-button'>Send</button>"
              } 
            ],
              onInit() {
                  //Create a new class derived from Survey.ItemValue
                  //It hides text, visibleIf and enableIf properties
                  //and it adds a new price number property.              
                  //Add orderItems properties. It is an array of ordertableitem elements 

              },
              onCreated(question) { 
                 /**
                 * You can use this function to setup some properties of your content question/elements based on properties of the component/root question.
                 * SurveyJS calls this function after the question is loaded from survey json.
                 */        
                // console.log(question.contentPanel.getQuestionByName("SigInComponent"));        
               console.log("collection question created"); 
                console.log(question.name);
                question.customQuestion.json.elementsJSON[1].visibleIf= "{"+question.name+".MODE} <> 'manual'";
                 question.customQuestion.json.elementsJSON[3].visibleIf= "{"+question.name+".MODE} = 'manual'"; 
                // console.log(question.customQuestion.json.elementsJSON);
              },
              onLoaded(question) {
                  //Create rows and default values on first loading    
                  //console.log(question.name);                
                   console.log("I am loaded"); 
              },
              //Calls on property changed in component/root question
              onPropertyChanged(question, propertyName, newValue) { 
                //console.log("Property changed");                 
                question.customQuestion.json.elementsJSON[1].visibleIf= "{"+question.name+".MODE} <> 'manual'";
                question.customQuestion.json.elementsJSON[3].visibleIf= "{"+question.name+".MODE} = 'manual'";                
                console.log(question.customQuestion.json.elementsJSON); 
              },
              //Calls when a property of ItemValue element is changed.
              onItemValuePropertyChanged(question, options) {
                  //If the propertyName of the array is "orderItems"
                  //console.log(question.name);                  
                  //console.log("I am value changed");
              },
              onAfterRenderContentElement(question, element, htmlElement) {
                //For example, add new elements to htmlElement based on some logic
                //question is the component question and element is a content element (question or panel)
                console.log(question.name);
                //console.log("I am onAfterRenderContentElement"); 
                let self=this;
                if($(htmlElement).attr('name')=="SEND"){ 
                  $(htmlElement).bind("click", function(){
                    self.updateRowsAndValues(question);
                  });
                };
              },
              onAfterRender(question, htmlElement) { 
                /**
                 * SurveyJS calls this function after rendering the component.
                 * This function is similar to onAfterRenderContentElement.
                 * The main difference, htmlElement is a root html element for a component. 
                 * You can get change the rendering of component title, errors and so on
                 */  
                //console.log(question.name);
                //console.log("I am onAfterRender");
              },
              updateRowsAndValues(question) {
                //this.buildRows(question);
                 console.log("raja ji");
                 console.log(question);
              },
      }); 