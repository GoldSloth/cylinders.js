var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var light = new THREE.AmbientLight(0xffff00, 1)

scene.add(light)

var p0 = new THREE.Vector3(5, 5, 5)

var p1 = new THREE.Vector3(10, 10, 10)

var geometry0 = new THREE.SphereBufferGeometry( 1, 32, 32 )
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
var sphere0 = new THREE.Mesh( geometry0, material)

scene.add( sphere0 )

function render() {
    requestAnimationFrame( render )
    renderer.render( scene, camera )
}
render();
