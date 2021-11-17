import * as THREE from '../src/three.js';

			import Stats from '../src/GLTFLoader.js';
			import OrbitControls from '../src/OrbitControls.js';
      import {
        RoomEnvironment
      } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/environments/RoomEnvironment.js';

      // Set height and width to the size of our browser window
      let width = window.innerWidth,
          height = window.innerHeight;

      // RENDERER
      // Create a new renderer and attach it to our canvas element
      // Set antialiasing to true and alpha (transparency) buffer to true
      // Set the size equal to our window.
      const renderer = new THREE.WebGLRenderer({
          canvas: myCanvas,
          antialias: true,
          alpha: true
      });
      renderer.setSize(width, height);

      // SCENE
      // Create a new Three scene
      const scene = new THREE.Scene();

      // CAMERA
      // Create a camera, zoom it out from the model a bit, and add it to the scene.
      // Params are vertical field of view, aspect ratio, near plane, and far plane.
      const camera = new THREE.PerspectiveCamera(45, width / height, 10, 2000);
      camera.position.set(0,2,100);
      scene.add(camera);

      // LIGHT
      // Create a source of white light at half intensity and add to scene
      const color = 0xFFFFFF;
      const intensity = 0.8;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(100, 50, 100);
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);

      // LOADING 3D MODEL
      // Assigning logoMesh to the gltf scene, then adding it to the scene
      // We will use the scope of logoMesh to be able to rotate it in animate
      const loader = new THREE.GLTFLoader();
      loader.load('./assets/logo.glb', handle_load);
      let logoMesh;
      function handle_load(gltf) {
          logoMesh = gltf.scene;
          scene.add(logoMesh);
      }

      // RESIZE LISTENER
      // This is listening for any window resizing and will reset the aspect ratio of the render
      // and updates camera aspect ratio as well so logo is always in center of browser window.
      window.addEventListener('resize', function() {
          width = window.innerWidth,
          height = window.innerHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
      });

      // Use OrbitControls to control camera view via mouse
      const controls = new THREE.OrbitControls(camera, renderer.domElement);

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
          if (logoMesh) {
              logoMesh.rotation.x += 0.02
              logoMesh.rotation.y += 0.01
              logoMesh.rotation.z += 0.01
          }

          controls.update();

          // Get new information and rerender at 60fps
          requestAnimationFrame(animate);
      }

      // Start the animation loop
      animate();
