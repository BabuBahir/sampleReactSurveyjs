import $ from "jquery";
var fileUploaderCompnent= ({
    name: "CleanFile",
    iconName: "icon-file",
    title: "CleanFile", 
    category: "config",
    questionJSON: {
        type: "file",     
        maxSize: 0 
    }, 
    onLoaded(question) {
        //Create rows and default values on first loading           
    },
    //Calls on property changed in component/root question
    onPropertyChanged(question, propertyName, newValue) {
                  
    }, 
    onAfterRenderContentElement(question, element, htmlElement) {
        //For example, add new elements to htmlElement based on some logic
        //question is the component question and element is a content element (question or panel)                
         
    },
    onAfterRender(question,  htmlElement) {       
        let style = "<style> #"+question.id+" .sv_q_file_remove_button {display: none !important;} </style>"
        $(style).appendTo("head") 
    }  
})

 
export default fileUploaderCompnent;

