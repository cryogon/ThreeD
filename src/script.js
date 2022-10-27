"use strict";

import "./style.css"
import * as THREE from 'three';
// init
const canvas = document.getElementById('app');

const scene = new THREE.Scene();

const size = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener("resize",()=>{
    //update sizes
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    //update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(size.width,size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})
const camera = new THREE.PerspectiveCamera( 70, size.width / size.height, 0.01, 100 );
camera.position.z = 15;


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial();

const square = new THREE.Mesh( geometry, material );
square.position.set(0,0,0);
scene.add( square );

const sphereGeometry = new THREE.SphereGeometry(2,6,6);
const sphereMaterial = new THREE.MeshStandardMaterial({
    wireframe:true,
    colorWrite:0xffffff,
});

const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set(0,0,0);
scene.add( sphere );

const light = new THREE.PointLight(0xffffff,2,100);

light.position.set(1,2,2);
scene.add( light );


const renderer = new THREE.WebGLRenderer( { antialias: true,canvas,alpha:true } );
renderer.setSize( size.width, size.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setAnimationLoop( animation );


//Mouse Movements

let mouseX = 0;
let mouseY = 0;

let targetX,targetY;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

document.addEventListener("mousemove",(e)=>{
    mouseX = e.clientX - windowX;
    mouseY = e.clientY - windowY;
    
    square.rotation.x += (targetY-square.rotation.x);
    square.rotation.y += (targetX-square.rotation.y);
    square.rotation.z -= (targetY-square.rotation.x);
})

// animation
function animation( time ) {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
	
    sphere.rotateY(0.01);
    sphere.rotateX(-0.01);
    //Super Fast Fan Animation (Need to comment rotation inside event listener first)
    // square.rotation.x = time / 2000;
	// square.rotation.y = time / 1000;
    // square.rotation.x += (targetY-square.rotation.x) * 0.5;
    // square.rotation.y += (targetX-square.rotation.y) * 0.5;
    // square.rotation.z -= (targetY-square.rotation.x) * 0.5;

	renderer.render( scene, camera );

}