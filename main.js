leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
song1_status="";
song2_status="";
song1="";
song2="";
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotposes);
}

function draw(){
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
song1_status=song1.isPlaying();
song2_status=song1.isPlaying();

if(scorerightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(song1_status==false){
        song1.play();
        document.getElementById("song-name").innerHTML="Playing- Harry Potter Theme Song";
    }
}
if(scoreleftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song-name").innerHTML="Playing- Peter Pan Song";
    }
}


}


function modelLoaded(){
    console.log("model loaded");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(leftWristY);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
    }
    
}