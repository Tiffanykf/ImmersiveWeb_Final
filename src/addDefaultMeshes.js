//import some meshes and materials, for now we don't really know what these all are but that's okay
import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	Mesh,
	TextureLoader,
	MeshPhysicalMaterial,
	SphereGeometry,
} from 'three'

const loader = new TextureLoader()

export const addMusicSphere = () => {

	const sphere = new SphereGeometry(7, 100, 100)

	const sphereMaterial = new MeshPhysicalMaterial({
		color: 0xffff00,
		emissive: 0xffff00,
		emissiveIntensity: 0.5,
		metalness: 0.2,
		roughness: 0.3, //affects the shine of the object
		transmission: 0.2, //how much light passes through
	})
	const sphereMesh = new Mesh(sphere, sphereMaterial)
	return sphereMesh
}


//we're creating two simple functions now that create two different types of boxes, one made of a mesh basic material, one made of a mesh standard material and each is given a different color
export const addBoilerPlateMeshes = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(-2, 0, 0)
	return boxMesh
}

export const addStandardMesh = () => {
	const box = new BoxGeometry(1, 1, 1)
	const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 })
	const boxMesh = new Mesh(box, boxMaterial)
	boxMesh.position.set(2, 0, 0)
	return boxMesh
}
