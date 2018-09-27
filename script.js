var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 5000)

var controls = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

camera.position.set( 0, 20, 100 );
controls.update();

var ambLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambLight)

var light = new THREE.DirectionalLight(0xffffff, 0.8)

light.position.set(0, 0, 15)

scene.add(light)


var axesHelper = new THREE.AxesHelper(1)

scene.add(axesHelper)

var mat = new THREE.MeshLambertMaterial({color: 0x00ffff, side: THREE.DoubleSide});

// -----------------------

var point1 = new THREE.Vector3(3, 13, 3)

var point2 = new THREE.Vector3(10, 0, 10)

var radius = 2

var segments = 20

var cyl = new Cylinder(point1, point2, radius, segments, true)

var cylObj = cyl.makeCylinder(mat, false)

// -----------------------

scene.add(cylObj.Mesh)

scene.add(cylObj.WireFrame)

camera.position.z = 15;

function animate() {
    requestAnimationFrame( animate );
    
    controls.update();
    renderer.render( scene, camera );
}
animate();