"use strict";
import "./assets/style.css";
import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
  WebGLRenderer,
  Group,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Line,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// init
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.getElementById("app");

const scene = new Scene();

const renderer = new WebGLRenderer({ antialias: true, canvas, alpha: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setAnimationLoop(animation);
window.addEventListener("resize", () => {
  //update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mouse Movements
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

let cursorX = 0;
let cursorY = 0;
document.addEventListener("mousemove", (e) => {
  //Updating mouse location realtive to three.js
  mouseX = e.clientX - windowX;
  mouseY = e.clientY - windowY;

  //Cursor Movement
  cursorX = targetX * 5;
  cursorY = -targetY * 5;

  //Square Rotation
  square.rotation.x += targetY - square.rotation.x;
  square.rotation.y += targetX - square.rotation.y;
  square.rotation.z -= targetY - square.rotation.x;
});

const camera = new PerspectiveCamera(70, size.width / size.height, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.set(-70.60196338553293, 27.258746892164954, 75.03042689975392);
camera.rotation.set(
  -0.34847616120824665,
  -0.7241400938135583,
  -0.23619246459996016
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const boxGeo = new BoxGeometry(1, 1, 1);
const boxMat = new MeshNormalMaterial();
const square = new Mesh(boxGeo, boxMat);
square.position.set(0, 0, 0);
scene.add(square);

const sphereGeometry = new SphereGeometry(3, 6, 6);
const sphereMaterial = new MeshNormalMaterial({
  wireframe: true,
});

const sphere = new Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const planeGeometry = new BoxGeometry(100, 5, 100);
const planeMaterial = new MeshStandardMaterial({
  color: 0x69c3ed,
});
const plane = new Mesh(planeGeometry, planeMaterial);
const planeLight = new PointLight(0xffffff, 1);
planeLight.position.set(0, -10, 0);
plane.add(planeLight);
plane.position.set(0, -5, 0);
scene.add(plane);

const light = new PointLight(0xffffff, 10, 100);
sphere.add(light);
light.position.set(0, 2, 0);

const sun = new Group();
sun.add(sphere);
sun.add(square);
sun.position.y = 10;
scene.add(sun);

// animation
function animation(time) {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  sunMovement().moveAroundPlane();

  sphere.rotateY(0.01);
  sphere.rotateX(-0.01);

  renderer.render(scene, camera);
}

//sun movement



//Have to implement
const wordCountMain = { value: 0 };
export const wordCount = new Proxy(wordCountMain, {
  set(target, key, value) {
    target[key] = value;
    return true;
  },
});
//End Block

const vertices = [];
let posXLimitChecker = true;
let posZLimitChecker = true;

function sunMovement() {

  //Limit
  function posLimit() {
    if (sun.position.x <= -42 && posXLimitChecker) {
      posXLimitChecker = false;
      wordCount.value++;
    } else if (sun.position.x >= 42 && !posXLimitChecker) {
      posXLimitChecker = true;
      wordCount.value++;
    } else if (sun.position.z <= -42 && posZLimitChecker) {
      posZLimitChecker = false;
      wordCount.value++;
    } else if (sun.position.z >= 42 && !posZLimitChecker) {
      posZLimitChecker = true;
      wordCount.value++;
    }
  }

  //X axis Movement
  function moveX() {
    if (sun.position.x >= -42 && posXLimitChecker) {
      sun.position.x -= 1;
    } else if (sun.position.x < 42 && !posXLimitChecker) {
      sun.position.x += 1;
    }
    posLimit();
  }

  //Z Move
  function moveZ() {
    if (sun.position.z >= -42 && posZLimitChecker) {
      sun.position.z -= 1;
    } else if (sun.position.z < 42 && !posZLimitChecker) {
      sun.position.z += 1;
    }
    posLimit();
  }

  function moveAroundPlane() {
    if (posXLimitChecker && posZLimitChecker) {
      sun.position.x -= 1;
    } else if (!posXLimitChecker && posZLimitChecker) {
      sun.position.z -= 1;
    } else if (!posZLimitChecker && !posXLimitChecker) {
      sun.position.x += 1;
    } else if (!posZLimitChecker && posXLimitChecker) {
      sun.position.z += 1;
    } else if (posZLimitChecker && !posXLimitChecker) {
      sun.position.x -= 1;
    }
    posLimit();
    

    function longTrail(){
      vertices.push(sun.position);
      const lineGeometry = new BufferGeometry().setFromPoints( vertices );
      const lineMat = new LineBasicMaterial( { color: 0x0000ff } );
      const line = new Line(lineGeometry,lineMat);
      scene.add(line);
    }

    return {longTrail};
  }

  return {
    moveX,
    moveZ,
    posLimit,
    moveAroundPlane,
  };
}
