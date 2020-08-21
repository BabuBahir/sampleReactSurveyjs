import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react";
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

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("default");

// //widgets.icheck(SurveyKo, $);
// widgets.prettycheckbox(SurveyKo);
// widgets.select2(SurveyKo, $);
// widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo, $);
// widgets.jqueryuidatepicker(SurveyKo, $);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo, $);
// //widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
// widgets.autocomplete(SurveyKo, $);
// widgets.bootstrapslider(SurveyKo);

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
            question.name="idfile";
            console.log(question);
            console.log("I am loaded");
        },
        //Calls on property changed in component/root question
        onPropertyChanged(question, propertyName, newValue) {
          console.log("-------------"); 
          if(propertyName.indexOf("value") !== -1){
                console.log(question);
                var formData = new FormData();
                formData.append(newValue.name, newValue);
                var xhr = new XMLHttpRequest();
                    xhr.responseType = "json";
                    xhr.open("POST", "/api/callYourService/uploadFiles?accessKey=<your_access_key>"); // https://surveyjs.io/api/MySurveys/uploadFiles
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

 
    let options = { showEmbededSurveyTab: true , questionTypes: ["text", "file" ] };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );    

    console.log(this.surveyCreator)
   // console.log(this.surveyCreator);
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
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
