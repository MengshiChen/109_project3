import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {
  GLTFLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
// import * as THREE from "./src/three.module.js";
//
// // Import add-ons for glTF models, orbit controls, and font loader
// import{
//   OrbitControls
// } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
// import {
// 	GLTFLoader
// } from "./src/GLTFLoader.js";

let container, scene, camera, renderer, mesh, mesh2, mixer, controls, clock;

let ticker = 0;

// Call init and animate functions (defined below)
init();
animate();

function init() {

	//Identify div in HTML to place scene
	container = document.getElementById("space");

	//Crate clock for animation
	clock = new THREE.Clock();

	//Create scene
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xdfdfdf);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// Add scene to gltf.html
	container.appendChild(renderer.domElement);

	// Material to be added to preanimated model
	var newMaterial = new THREE.MeshStandardMaterial({
		color: 0x2E5939
	});

	// Load preanimated model, add material, and add it to the scene
	const loader = new GLTFLoader().load(
		"./assets/logo.glb",
		function(gltf) {
			gltf.scene.traverse(function(child) {
				if (child.isMesh) {
					// child.material = newMaterial;
				}
			});
			// set position and scale
			mesh = gltf.scene;
			mesh.position.set(4, 0, -6);
			mesh.rotation.set(0, 0, 0);
			mesh.scale.set(1, 1, 1);
			// Add model to scene
			scene.add(mesh);
			//Check for and play animation frames
			mixer = new THREE.AnimationMixer(mesh);
			gltf.animations.forEach((clip) => {
				mixer.clipAction(clip).play();
			});

		},
		undefined,
		function(error) {
			console.error(error);
		}
	);

	// Add Orbit Controls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.minDistance = 3;
	controls.maxDistance = 35;
	controls.target.set(0, 0, -0.2);

	// Position our camera so we can see the shape
	camera.position.z = 20;

	// Add a directional light to the scene
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
	scene.add(directionalLight);

	// Add an ambient light to the scene
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
	scene.add(ambientLight);


}

// Define animate loop
function animate () {
		// Render the scene with camera information
		renderer.render(scene, camera);

		// Rotate our cube
		// arrayCube.map(cube => {
		//     cube.rotation.x += Math.random() / 80;
		//     cube.rotation.y += Math.random() / 80;
		//     cube.position.x += (Math.random() / 50 - Math.random() / 50);
		//     cube.position.y += (Math.random() / 50 - Math.random() / 50);
		// });

		// Rotate our logo
		if (mesh) {
				mesh.rotation.x += 0.02
				mesh.rotation.y += 0.01
				mesh.rotation.z += 0.01
		}

		controls.update();

		// Get new information and rerender at 60fps
		requestAnimationFrame(animate);
}

// Start the animation loop
animate();

// // Define the render loop
// function render() {
//   renderer.render(scene, camera);
//   // manualAnimation();
// }

// Manual Looping animation for mesh2
// function manualAnimation() {
//   if (ticker == 0) {
//     if (mesh2.scale.x < 2) {
//       mesh2.scale.x += 0.00341;
//     }
//     if (mesh2.scale.x >= 2 && mesh2.scale.y < 2) {
//       mesh2.scale.y += 0.00341;
//     }
//     if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z < 2) {
//       mesh2.scale.z += 0.00341;
//     }
//     if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z >= 2) {
//       ticker = 1;
//     }
//   }
//   if (ticker == 1) {
//     if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z > 1) {
//       mesh2.scale.z -= 0.00341;
//     }
//     if (mesh2.scale.x >= 2 && mesh2.scale.y > 1 && mesh2.scale.z <= 1) {
//       mesh2.scale.y -= 0.00341;
//     }
//     if (mesh2.scale.x > 1 && mesh2.scale.y <= 1 && mesh2.scale.z <= 1) {
//       mesh2.scale.x -= 0.00341;
//     }
//     if (mesh2.scale.x <= 1 && mesh2.scale.y <= 1 && mesh2.scale.z <= 1) {
//       ticker = 0;
//     }
//   }
// }

// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
	render();
}
