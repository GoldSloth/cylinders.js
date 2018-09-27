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

// var p0 = new THREE.Vector3(3, 3, 3)

// var p1 = new THREE.Vector3(10, 10, 10)



// var subpRandp0 = new THREE.Vector3(0, 0, 0)

// subpRandp0.subVectors(PRand, p0)

// var subp1p0 = new THREE.Vector3(0, 0, 0)

// subp1p0.subVectors(p1, p0)

// var R = new THREE.Vector3()
// R.crossVectors(subpRandp0, subp1p0)

// R.normalize()

// var S = new THREE.Vector3()
// S.crossVectors(R, new THREE.Vector3().subVectors(p1, p0))

// S.normalize()

// var divisions = 60
// var theta = 360/divisions

// var radius = 4

// var points = [p0]

// var iTheta = 0

// for (var i=0; i<divisions; i++) {
//     iTheta = theta * i * (Math.PI / 180)
//     console.log(theta*i)
//     console.log(iTheta)
//     points.push(new THREE.Vector3(
//         p0.x + (radius * Math.cos(iTheta) * R.x) + (radius * Math.sin(iTheta) * S.x),
//         p0.y + (radius * Math.cos(iTheta) * R.y) + (radius * Math.sin(iTheta) * S.y),
//         p0.z + (radius * Math.cos(iTheta) * R.z) + (radius * Math.sin(iTheta) * S.z)
//         )
//     )
// }

// var geom = new THREE.Geometry()

// geom.setFromPoints(points)

// var face
// for (var i=0; i<divisions-1; i++) {
//     face = new THREE.Face3(0, i+1, i+2)
//     geom.faces.push(face)
// }

// geom.faces.push(new THREE.Face3(0, divisions, 1))

// console.log(geom)



// console.log(geom)

// var geometry = new THREE.SphereBufferGeometry(5, 32, 32);
// var material = new THREE.MeshLambertMaterial({color: 0xffffff});
// var sphere = new THREE.Mesh( geometry, material );

// scene.add( sphere );

// var wireframe = new THREE.WireframeGeometry( geom );

// var line = new THREE.LineSegments( wireframe );
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;

scene.add(new THREE.AxisHelper())

// scene.add( line );

var mat = new THREE.MeshLambertMaterial({color: 0x00ffff, side: THREE.DoubleSide});

var cyl = new Cylinder(new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 0, 10), 2, 6, true)

var cylObj = cyl.makeCylinder(mat)

scene.add(cylObj)

camera.position.z = 15;

function animate() {
    requestAnimationFrame( animate );
    
    controls.update();
    renderer.render( scene, camera );
}
animate();