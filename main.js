
var emoji="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100

});
camera=document.getElementById("camera");
Webcam.attach("#camera");


function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

    });
    
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2mQQt23yR/model.json",modelReady);

function modelReady(){
    console.log("Model Ready");
}
function speak()
    {
        var synth= window.SpeechSynthesis;
        speak_data_1="The hand sybmol is "+prediction_1;
        
        var utterthis= new SpeechSynthesisUtterance( speak_data_1);
        synth.speak(utterthis);



    }

    function check(){
        img=document.getElementById("captured_image");
        classifier.classify(img,gotResult);
        }
    function gotResult(error,results){
        if(error){
            console.error(error);
            
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            prediction_1=results[0].label;
            console.log(prediction_1);
            
            if(results[0].label=="Good")
            {
                document.getElementById("update_emoji").innerHTML="	&#128077;";
            }
            if(results[0].label=="Peace")
            {
                document.getElementById("update_emoji").innerHTML="&#9996;";
            }
            if(results[0].label=="Bad")
            {
                document.getElementById("update_emoji").innerHTML="&#128078";
            }
            if(results[0].label=="Amazing")
            {
                document.getElementById("update_emoji2").innerHTML="&#128076;";
            }
           
            speak();
        }
        
    }