import { Mesh, MeshPhysicalMaterial, SphereGeometry } from 'three'
export const addAudioNodes = () => {
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
