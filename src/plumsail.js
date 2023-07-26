//This is an example of code that exists in Plumsail: code that will simply call the functions available on the public GitHub.


//The following code allows javascript to be run from an external api for ease of editing
fd.beforeRender(function(vue){
    var script = document.createElement('script'); 
    script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
    document.getElementsByTagName('head')[0].appendChild(script);
    
    jQuery(document).ready(function($){
        var imported = document.createElement('script');
        imported.src = 'https://tce-innovation.github.io/Subcontractor-Automation/src/correction.js';
        document.head.appendChild(imported);
    });
});