//Currently Not Using
import{Camera} from 'three'
 /**
 * @class cameraController
 *
 * It will manage all this.camera related stuff
 * @param {Camera} camera
 */
export class cameraController {
    constructor(speed = 0.1,camera) {
      this.speed = speed;
      this.move();
      this.rotate();
      this.camera = camera;
    }
  
    move() {
        document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() == "w") {
          this.camera.position.z -= this.speed;
        } else if (e.key.toLowerCase() == "a") {
          this.camera.position.x -= this.speed;
        } else if (e.key.toLowerCase() == "s") {
          this.camera.position.z += this.speed;
        } else if (e.key.toLowerCase() == "d") {
          this.camera.position.x += this.speed;
        } else if (e.key.toLowerCase() == "r") {
          this.camera.position.y += this.speed;
        } else if (e.key.toLowerCase() == "e") {
          this.camera.position.y -= this.speed;
        }
      });
    }
  
    rotate() {
      document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowUp") {
          this.camera.rotation.x += this.speed;
        } else if (e.key == "ArrowLeft") {
          this.camera.rotation.y += this.speed;
        } else if (e.key == "ArrowDown") {
          this.camera.rotation.x -= this.speed;
        } else if (e.key == "ArrowRight") {
          this.camera.rotation.y -= this.speed;
        }
      });
    }
  }