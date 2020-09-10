import React from "react";
import * as  Survey from "survey-react";
import {  CustomWidgetCollection } from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";
//import "./index.css";
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
import { demojson } from "./survey_json.js";
//import {demojson} from "./Kira/signInComponent"
import {signApiComponent} from "./Kira/eSignApi"
//import { demojson } from "./survey_json.js";
import fileUploaderCompnent from "./fileUploader.js";
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
    console.log("all upload files");
    // var formData = new FormData();
    // options
    //     .files
    //     .forEach(function (file) {
    //         formData.append(file.name, file);
    //     });
    // var xhr = new XMLHttpRequest();
    // xhr.responseType = "json";
    // xhr.open("POST", "/YouarApi/MySurveys/uploadFiles");  
    // xhr.onload = function () {
    //     var data = xhr.response;
    //     options.callback("success", options.files.map(file => {
    //         return {
    //             file: file,
    //             content: data[file.name]
    //         };
    //     }));
    // };
    // xhr.send(formData);
}

function onClearFiles(result){
    console.log(' grindrceel');
}
 
    Survey.ReactQuestionFactory.Instance.registerQuestion("myquestion", props => {
        return React.createElement(MyQuestion, props);
    });
    
    Survey
    .ComponentCollection
    .Instance
    .add(fileUploaderCompnent);

    Survey
        .ComponentCollection
        .Instance
        .add(signApiComponent);
 
    Survey.Serializer.addProperty("survey", { name: "signmode" });
    Survey.Serializer.addProperty("survey", { name: "nom" });
    Survey.Serializer.addProperty("survey", { name: "prenom" });
    Survey.Serializer.addProperty("survey", { name: "upload"});

    function onAfterRenderQuestion(sender,options){  
         console.log(options.question);
         console.log($(options.htmlElement).find(".sv_q_file_remove_button"));
        //  if(options.cssClasses.removeButton){ 
        //     options.cssClasses.removeButton="kalli"
        //     console.log(options.cssClasses.removeButton);
        //  }
    }

    function onAfterRenderSurvey(sender,options){ 
        // console.log(sender);
         console.log(options.htmlElement);
    }
 
export function SurveyPage() {
    var model = new Survey.Model(demojson);
    window.survey =model;
    return (
    <div className="container">
        <h2>SurveyJS Library - a sample survey below</h2>
        <Survey.Survey
            model={model}
            onComplete={onComplete}
            onValueChanged={onValueChanged} 
            onUploadFiles={onUploadFiles}
            onAfterRenderSurvey ={onAfterRenderSurvey} 
            onAfterRenderQuestion={	onAfterRenderQuestion}
          />
    </div>
    );
  } 


  $(document).on('click', 'button.callAuthBtn', function() {  
          let quest11 = window.survey.getQuestionByName("question11");
          console.log(quest11);
        // let signatory = window.survey.getQuestionByName(window.survey.signmode).value;
        // let nom = window.survey.getQuestionByName(window.survey.nom).value;
        // let prenom = window.survey.getQuestionByName(window.survey.prenom).value;
        //   var obj = { signmode: signatory, nom:nom, prenom:  prenom };
        //   var myJSON = JSON.stringify(obj);
        //   alert(myJSON);  
    });

  