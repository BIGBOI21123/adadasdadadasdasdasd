Status = "";
objects = [];

function setup(){
    canvas = createCanvas(400,400);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}


function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input_id").value;
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,400,400);
    if(Status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            noFill();
            
            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
        }
    }
}
