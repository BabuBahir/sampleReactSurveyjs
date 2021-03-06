import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";

import * as SurveyJSCreator from "survey-creator"; 
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";
import VASSlider from 'react-surveyjs-vas-widget';

import * as widgets from "surveyjs-widgets";
import { MyQuestion } from "./MyQuestion";
import {bootstrapslider} from "./bootstrap-slider.js";

SurveyJSCreator.StylesManager.applyTheme("default");

// widgets.icheck(SurveyKo, $);
// widgets.prettycheckbox(SurveyKo);
// widgets.select2(SurveyKo, $);
// widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo, $);
// widgets.jqueryuidatepicker(SurveyKo, $);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
// widgets.autocomplete(SurveyKo, $);
 //widgets.bootstrapslider(SurveyKo); 

class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    SurveyKo
    .ComponentCollection
    .Instance
    .add({
        name: "FileUploader",
        title: "FileUploader",
        questionJSON: {
            type: "file",   
            name:"raja",    
            maxSize: 0 
        },
        onInit() {
            //Create a new class derived from Survey.ItemValue
            //It hides text, visibleIf and enableIf properties
            //and it adds a new price number property.              
            //Add orderItems properties. It is an array of ordertableitem elements
            SurveyKo
            .Serializer
            .addProperty("FileUploader", {
                name: "restUrl:string",
                default: "/get/callYourapi",
                category: "general"
            });

        },
        onLoaded(question) {
            //Create rows and default values on first loading 
            console.log(question);
            console.log("I am loaded");
        },
        //Calls on property changed in component/root question
        onPropertyChanged(question, propertyName, newValue) {           
          if(propertyName.indexOf("value") !== -1){
                console.log(question);
                var formData = new FormData();
                formData.append(newValue.name, newValue);
                var xhr = new XMLHttpRequest();
                    xhr.responseType = "json";
                    xhr.open("POST", question.restUrl); // https://surveyjs.io/api/MySurveys/uploadFiles
                    xhr.onload = function () {
                        var data = xhr.response;
                        // options.callback("success", options.files.map(file => {
                        //     return {
                        //         file: file,
                        //         content: data[file.name]
                        //     };
                        // }));
                    };
                xhr.send(formData);
            }          
        },
        //Calls when a property of ItemValue element is changed.
        onItemValuePropertyChanged(question, options) {
            //If the propertyName of the array is "orderItems"
            console.log("I am value changed");
        } ,
        onUploadFiles(question, options) {
          //If the propertyName of the array is "orderItems"
          console.log("I am uploaded files changed");
        },
        onUploadFile(question, options) {
          //If the propertyName of the array is "orderItems"
          console.log("I am uploaded files cxxhanged");
        }
    });              


    SurveyKo
      .ComponentCollection
      .Instance
      .add({
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
                "name": "question8", 
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
              onLoaded(question) {
                  //Create rows and default values on first loading 
                  console.log(question);
                  console.log("I am loaded");
              },
              //Calls on property changed in component/root question
              onPropertyChanged(question, propertyName, newValue) {                                    
              },
              //Calls when a property of ItemValue element is changed.
              onItemValuePropertyChanged(question, options) {
                  //If the propertyName of the array is "orderItems"
                  console.log("I am value changed");
              }
      });

      SurveyKo.Serializer.removeProperty("question", "description");
      
    let options = { showEmbededSurveyTab: true , questionTypes: ["text", "checkbox", "dropdown"]  };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );    
 
    console.log(this.surveyCreator.text);
    // let self =this;
    // $(document).on('click', 'button.my-button', function() {       
    //   console.log("delayed binding");// do something 
    //   console.log(self.surveyCreator.text); 
    //   console.log(this); 
    // });

    this.surveyCreator.toolbox
    .addItem({
        name: "KioraWidge",
        isCopied: true,
        iconName: "icon-file",
        title: "Sign In Widget Full",
        category: "Kiora",
        json:
        { 
            "type": "panel", "name": "painel1",
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
                          "visibleIf": "{MODE} <> 'manual'",
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
                          "html": "<button class='my-button'>Send</button>"
                          }
                        ],
            "title": "sign Expeince"
        }
    }); 


    SurveyKo
            .Serializer
            .addProperty("sigincomponent", {
                name: "Mode",
                choices: ["Mode", "red", "green"], 
                default: "Mode",
                category: "Signature"
            });
            SurveyKo
            .Serializer      
            .addProperty("sigincomponent", {
              name: "Name",
              choices: ["Signature[0].Name", "red", "green"], 
              default: "Signature[0].Name",
              category: "Signature"
            });
            SurveyKo
            .Serializer
              .addProperty("sigincomponent", {
                name: "LastName",
                choices: ["Signature[0].LastName", "red", "green"], 
                default: "Signature[0].LastName",
                category: "Signature"
          });
          SurveyKo
            .Serializer
          .addProperty("sigincomponent", {
            name: "Upload",
            choices: ["Upload", "red", "green"], 
            default: "Upload",
            category: "Signature"
           });
 
           SurveyKo
            .Serializer
            .addProperty("panel", {
                name: "Mode",
                choices: ["Mode", "red", "green"], 
                default: "Mode",
                category: "Signature"
            });
            SurveyKo
            .Serializer      
            .addProperty("panel", {
              name: "Name",
              choices: ["Signature[0].Name", "red", "green"], 
              default: "Signature[0].Name",
              category: "Signature"
            });
            SurveyKo
            .Serializer
              .addProperty("panel", {
                name: "LastName",
                choices: ["Signature[0].LastName", "red", "green"], 
                default: "Signature[0].LastName",
                category: "Signature"
          });
          SurveyKo
            .Serializer
          .addProperty("panel", {
            name: "Upload",
            choices: ["Upload", "red", "green"], 
            default: "Upload",
            category: "Signature"
           });

    //this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.surveyCreator.saveSurveyFunc = function (saveNo, callback) { console.log('finished');};

    this.surveyCreator.tabs().push({
      name: "survey-templates",
      title: "My Custom Tab",
      template: "custom-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("survey-templates");
      },
      data: {},
    });
    this.surveyCreator.render("surveyCreatorContainer");
  }
  render() {
    return (<div>
      <script type="text/html" id="custom-tab-survey-templates">
        {`<div id="test">TEST</div>`}
      </script>

      <div id="surveyCreatorContainer" />
    </div>);
  }
  saveMySurvey = () => {
    console.log(JSON.stringify(this.surveyCreator.text));
  };
}

export default SurveyCreator; 



// $(document).on('click', 'button.my-button', function() {       
//       console.log("delayed binding");// do something
//       console.log(SurveyKo);
//       console.log(this); 
// });