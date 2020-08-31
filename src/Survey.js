import React from "react";
import * as  Survey from "survey-react";
import {  CustomWidgetCollection } from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";
// import "jquery-ui/themes/base/all.css";
//import "nouislider/distribute/nouislider.css";
// import "select2/dist/css/select2.css";
//import "bootstrap-slider/dist/css/bootstrap-slider.css";
// import "jquery-bar-rating/dist/themes/css-stars.css";
import $ from "jquery";
// import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
// import "pretty-checkbox/dist/pretty-checkbox.css";
import VASSlider from 'react-surveyjs-vas-widget';
import { json } from "./survey_json.js";
//import { json } from "./fileUploader.js";
import { MyQuestion } from "./MyQuestion";
//import "icheck/skins/square/blue.css";

window["$"] = window["jQuery"] = $;
//require("icheck");

Survey.StylesManager.applyTheme("bootstrap");

//widgets.icheck(Survey, $);
// widgets.prettycheckbox(Survey);
// widgets.select2(Survey, $);
// widgets.inputmask(Survey);
// widgets.jquerybarrating(Survey, $);
// widgets.jqueryuidatepicker(Survey, $);
// widgets.nouislider(Survey);
// widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
// widgets.sortablejs(Survey);
// widgets.ckeditor(Survey);
// widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

function onValueChanged(result) {
    //console.log("value changed!");
}

function onComplete(result) {
    console.log("Complete! " + result);
}

function onUploadFiles(survey,options){
    var formData = new FormData();
    options
        .files
        .forEach(function (file) {
            formData.append(file.name, file);
        });
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/YouarApi/MySurveys/uploadFiles");  
    xhr.onload = function () {
        var data = xhr.response;
        options.callback("success", options.files.map(file => {
            return {
                file: file,
                content: data[file.name]
            };
        }));
    };
    xhr.send(formData);
}

function onClearFiles(result){
    console.log(' grindrceel');
}

console.log(Survey);
Survey.ReactQuestionFactory.Instance.registerQuestion("myquestion", props => {
    return React.createElement(MyQuestion, props);
  });

  Survey
  .ComponentCollection
  .Instance
  .add({
      name: "FileUploader",
      title: "FileUploader",
      questionJSON: {
        json
      },
      onInit() {
          //Create a new class derived from Survey.ItemValue
          //It hides text, visibleIf and enableIf properties
          //and it adds a new price number property.              
          //Add orderItems properties. It is an array of ordertableitem elements
          Survey
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
          console.log('123');       
        // if(propertyName.indexOf("value") !== -1){
        //     //   console.log(question); 
        //       var formData = new FormData();
        //       formData.append(newValue.name, newValue);
        //       var xhr = new XMLHttpRequest();
        //           xhr.responseType = "json";
        //           xhr.open("POST", "/api/callYourService/uploadFiles?accessKey=<your_access_key>"); // https://surveyjs.io/api/MySurveys/uploadFiles
        //           xhr.onload = function () {
        //               var data = xhr.response;
        //               // options.callback("success", options.files.map(file => {
        //               //     return {
        //               //         file: file,
        //               //         content: data[file.name]
        //               //     };
        //               // }));
        //           };
        //       xhr.send(formData);
        //   }          
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

function onAfterRenderSurvey(sender,options){
   // console.log(sender);
   // console.log(options);
}

CustomWidgetCollection.Instance.addCustomWidget({
    name: 'visual_analog_scale',
    render: question => (
      <VASSlider
        minRateDescription={question.minRateDescription}
        maxRateDescription={question.maxRateDescription}
        rating={question.value}
        onRatingChange={(rating) => { question.value = rating; }}
      />),
  });

 
export function SurveyPage() {
    var model = new Survey.Model(json);
    window.survey =model;
    return (
    <div className="container">
        <h2>SurveyJS Library - a sample survey below</h2>
        <Survey.Survey
            model={model}
            onComplete={onComplete}
            onValueChanged={onValueChanged} 
            onUploadFiles={onUploadFiles}
            onAfterRenderSurvey ={onAfterRenderSurvey } 
          />
    </div>
    );
  }
  

  $(document).ready(function(){
      $(".my-button").click(function(){
            console.log(window.survey.getQuestionByName("MODE").value);
            let signatory = window.survey.getQuestionByName("SIGNATORY").value[0];
            let query =signatory.NOM +'+'+signatory.PRENOM +'+'+signatory.TELEPHONE +'+'+signatory.EMAIL; 
            window.open("https://www.google.com?q="+query);
      });
  });

  