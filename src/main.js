//default imports, importing THREE so we can actually use THREE.js
//Importing our css, and importing our new helper functions that we made in class that return our lights, and meshes
import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, addMusicSphere} from './addDefaultMeshes'
import { addLight } from './addDefaultLights'
import Model from './Model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { addAudioNodes } from './addAudioNodes'



//Step 1 of our setup always revolves around our 3 essential characters, our camera, our renderer and our scene, by default we're always using the THREE.WebGLRenderer in this class
const renderer = new THREE.WebGLRenderer({ antialias: true })


//This is our default camera the perspective camera that imitates real life dimensions and proportions, just to recap the 4 parameters we pass in are: (Field of View, Aspect Ratio, Near Frustum, Far Frustum) aka (how wide can we see, what is the proportions of our screen, how close can our camera see, how far can our camera see)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)

const lights = {}

const meshes = {}

const scene = new THREE.Scene()

// Audio setup - create audio listener and positional audio sources
const listener = new THREE.AudioListener()
camera.add(listener)
const sound = new THREE.PositionalAudio(listener)
const audioLoader = new THREE.AudioLoader()

// Load and configure audio1
audioLoader.load('/LOST.mp3', function (buffer) {
	sound.setBuffer(buffer)
	sound.setRefDistance(20)
	sound.setRolloffFactor(2)
	sound.setMaxDistance(150)
	sound.setDistanceModel('exponential')
	sound.setPlaybackRate(.8)
	sound.setLoop(true)})

//Array to store collision objects
const collisionObjects = [];

//Raycaster to detect collision objects
const pointer = new THREE.Vector3()
const raycaster = new THREE.Raycaster()

init()
function init() {
	// set up our renderer default settings, aka where we render our scene to on our website
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.node1 = addAudioNodes()
	meshes.node1.add(sound)
	meshes.node1.position.set(5.286, -105.294, -51.596)


	//add ambient light
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
	scene.add(ambientLight)

	// //add lights to our lights object
	lights.default = addLight()
	scene.add(lights.default)
	scene.add(meshes.node1)

	const controls = new FirstPersonControls(camera, renderer.domElement)
	controls.lookSpeed = 0.01
	controls.movementSpeed = 0.5

	//create box for floor, since it wasn't captured
	const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x585554 })
	const floorGeometry = new THREE.BoxGeometry(13, 0.2, 90)
	const floor = new THREE.Mesh(floorGeometry, floorMaterial)
	floor.position.set(7.9, -7.594, 5.252)
	scene.add(floor)

	const floorGeometry2 = new THREE.BoxGeometry(11, .2, 20)
	const floor2 = new THREE.Mesh(floorGeometry2, floorMaterial)
	floor2.position.set(-4.080, -7.579, -2.425)
	scene.add(floor2)


	//camera position set to face down the hallway
	camera.position.set(9, -1, 40)

	window.addEventListener('click', () => {
		//remove loading screen 
		loadingScreen.style.display = 'none'
		//Check for click on sphere
		checkSphereClick()
		//play audio
		sound.play()
	})

	resize()
	instances()
	animate(controls)
}

function instances() {

	const stairs = new Model({
		name: 'stairs',
		scene: scene,
		meshes: meshes,
		url: 'Stairs.glb',
		scale: new THREE.Vector3(5, 5, 5),
		position: new THREE.Vector3(0.6, -45.8, -42.020),
		collisionObjects: collisionObjects,
	})
	stairs.init()

	const office = new Model({
		name: 'office',
		scene: scene,
		meshes: meshes,
		url: 'Office62.glb',
		scale: new THREE.Vector3(5, 5, 5),
		position: new THREE.Vector3(-3.5, 3.5, -3),
		collisionObjects: collisionObjects,
	})
	office.init()

	const sign1 = new Model({
		name: 'sign1',
		scene: scene,
		meshes: meshes,
		url: 'Sign.glb',
		scale: new THREE.Vector3(.05, .05, .05),
		position: new THREE.Vector3(7.744, -1.847, 43.410),
		rotation: new THREE.Vector3(0, Math.PI, 0),		collisionObjects: collisionObjects,
	})
	sign1.init()

	const sign2 = new Model({
		name: 'sign2',
		scene: scene,
		meshes: meshes,
		url: 'Sign2.glb',
		scale: new THREE.Vector3(1, 1, 1),
		position: new THREE.Vector3(18.256, -4.697, 26.709),
		rotation: new THREE.Vector3(0, -Math.PI / 2, 0),		collisionObjects: collisionObjects,
	})
	sign2.init()

	const sign3 = new Model({
		name: 'sign3',
		scene: scene,
		meshes: meshes,
		url: 'Sign2.glb',
		scale: new THREE.Vector3(1.5, 1.5, 1.5),
		position: new THREE.Vector3(-25.015, 3.877, -3.125),
		rotation: new THREE.Vector3(0, Math.PI / 2, 0),		collisionObjects: collisionObjects,
	})
	sign3.init()

	const sign4 = new Model({
		name: 'sign4',
		scene: scene,
		meshes: meshes,
		url: 'Sign.glb',
		scale: new THREE.Vector3(.045, .045, .045),
		position: new THREE.Vector3(21.272, -1.907, -36.759),
		rotation: new THREE.Vector3(0, -Math.PI/2, 0),
		collisionObjects: collisionObjects,
	})
	sign4.init()

	const sign5 = new Model({
		name: 'sign5',
		scene: scene,
		meshes: meshes,
		url: 'Sign.glb',
		scale: new THREE.Vector3(.045, .045, .045),
		position: new THREE.Vector3(5.766, -103.145, -38.113),
		rotation: new THREE.Vector3(0, Math.PI, 0),	
		collisionObjects: collisionObjects,
	})
	sign5.init()
}

//this is just a helpful function that helps us when our screen resizes
//don't worry too much about it
function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

//Detect collisions with raycaster
function checkCollisions(controls) {
    // Set ray direction to camera's forward direction
    pointer.set(0, 0, -1).applyQuaternion(camera.quaternion)
    raycaster.set(camera.position, pointer)

    // Check for intersections with the collidable objects
    const intersects = raycaster.intersectObjects(collisionObjects)

    if (intersects.length > 0 && intersects[0].distance < 3) {
        // If a collision is detected within a short distance, stop the camera from moving forward
        controls.object.position.copy(controls.prevPosition)
    }

    // Store the camera's current position for future checks
    controls.prevPosition = controls.object.position.clone()
}

// Function to check if the sphere was clicked
function checkSphereClick() {
	// Set ray direction to camera's forward direction
	pointer.set(0, 0, -1).applyQuaternion(camera.quaternion)
	raycaster.set(camera.position, pointer)
  
	// Check for intersections with the music sphere
	const intersects = raycaster.intersectObjects([meshes.node1]) 
  
	if (intersects.length > 0) {
	  // If the sphere is clicked, open this url
	  window.open('https://standupforscience2025.org/', '_blank')
	}
  }

function animate(controls) {

	//request animation frame will call (animate) which then calls request animation frame which then etc etc...
	requestAnimationFrame(() => animate(controls))

	//Check collisions before updating controls
	checkCollisions(controls)

	//Update controls each frame
	controls.update(0.1)

	// our key render function, we call render and we pass in the scene and camera, the world and the view we see it from and let the renderer do all the hard math.
	renderer.render(scene, camera)
}
