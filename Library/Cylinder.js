class Cylinder {
    constructor(p0, p1, radius1, radius2, segments, closed) {
        this.p0 = p0
        this.p1 = p1
        this.radius1 = radius1
        this.radius2 = radius2
        this.segments = segments
        this.closed = closed


        this.points = []
    }

    _makeP0P1Sub() {
        this.diff = new THREE.Vector3().subVectors(this.p1, this.p0)
    }

    _makePRand () {
        this.PRand = new THREE.Vector3(Math.random(), Math.random(), Math.random())
        var p0PrandDist = new THREE.Vector3().subVectors(this.PRand, this.p0).lengthSq()
        var p1PrandDist = new THREE.Vector3().subVectors(this.PRand, this.p1).lengthSq()
        var p0p1Dist = new THREE.Vector3().subVectors(this.p0, this.p1).lengthSq()
        while (! (p0PrandDist + p1PrandDist) > p0p1Dist) {
            this.PRand = new THREE.Vector3(Math.random(), Math.random(), Math.random())
        }
    }

    _makePlaneVectors() {
        var subpRandp0 = new THREE.Vector3(0, 0, 0)

        subpRandp0.subVectors(this.PRand, this.p0)

        var subp1p0 = new THREE.Vector3(0, 0, 0)

        subp1p0.subVectors(this.p1, this.p0)

        var R = new THREE.Vector3()
        R.crossVectors(subpRandp0, subp1p0)

        R.normalize()

        var S = new THREE.Vector3()
        S.crossVectors(R, new THREE.Vector3().subVectors(this.p1, this.p0))

        S.normalize()

        this.plane = {"R": R, "S": S}
    }

    _makeDisk(centre, radius) {
        var theta = 360 / this.segments
        var iTheta
        
        var points = []

        for (var i=0; i < this.segments; i++) {
            iTheta = theta * i * (Math.PI / 180)
            // For degrees -> Radian
            console.log(i)
            points.push(new THREE.Vector3(
                centre.x + (radius * Math.cos(iTheta) * this.plane.R.x) + (radius * Math.sin(iTheta) * this.plane.S.x),
                centre.y + (radius * Math.cos(iTheta) * this.plane.R.y) + (radius * Math.sin(iTheta) * this.plane.S.y),
                centre.z + (radius * Math.cos(iTheta) * this.plane.R.z) + (radius * Math.sin(iTheta) * this.plane.S.z)
                )
            )
        }

        this.points.push(points)
    }

    _makeEnd(offset) {
    
        for (var i=0; i<this.segments-1; i++) {
            this.geom.faces.push(new THREE.Face3(0, i + 1, i + 2))
        }

        this.geom.faces.push(new THREE.Face3(0, this.segments, 1))

        offset += this.segments + 1
        
        for (var i=0; i<this.segments-1; i++) {
            this.geom.faces.push(new THREE.Face3(offset + 0, offset + i + 1, offset + i + 2))
        }

        this.geom.faces.push(new THREE.Face3(offset, this.segments + offset, offset+1))

        return offset
    }

    _makeSides(offset) {
        for (var i=0; i<this.segments-1; i++) {
            this.geom.faces.push(new THREE.Face3(i + 1, i + offset + 1, i + offset + 2))
            this.geom.faces.push(new THREE.Face3(i + 2, i + 1, i + offset + 2))
        }


        this.geom.faces.push(new THREE.Face3(1, this.segments, 1 + offset))
        this.geom.faces.push(new THREE.Face3(this.segments, this.segments + offset, 1 + offset))

        return offset
    }

    _makeGeometry() {
        this.geom = new THREE.Geometry()
        var offset = 0

        this.geom.vertices.push(this.p0)

        for (var i=0; i<this.points[0].length; i++) {
            this.geom.vertices.push(this.points[0][i])
        }

        this.geom.vertices.push(this.p1)

        for (var i=0; i<this.points[1].length; i++) {
            this.geom.vertices.push(this.points[1][i])
        }

        if (this.closed) {
            offset = this._makeEnd(offset)
        }
        
        offset = this._makeSides(offset)
        console.log(this.geom)
        this.geom.computeBoundingBox()
        this.geom.computeBoundingSphere()
        // this.geom.computeFaceNormals()
        this.geom.computeVertexNormals()
        // this.geom.computeFlatVertexNormals()
        this.geom.computeMorphNormals()
    }

    _constructMesh(material) {
        return new THREE.Mesh(this.geom, material)
    }

    _constructWireFrame() {
        this.wireFrameGeom = new THREE.WireframeGeometry(this.geom)
        this.wireFrameLine = new THREE.LineSegments(this.wireFrameGeom)
        this.wireFrameLine.material.depthTest = true;
        this.wireFrameLine.material.transparent = true;
        this.wireFrameLine.material.opacity = 1;

        return this.wireFrameLine
    }

    makeCylinder(material, wireFrame) {
        this._makeP0P1Sub()
        this._makePRand()
        this._makePlaneVectors()
        this._makeDisk(this.p0, this.radius1, 0)
        this._makeDisk(this.p1, this.radius2, 1)
        console.log(this.points)
        this._makeGeometry()
        if (wireFrame) {
            return {"Mesh": this._constructMesh(material), "WireFrame": this._constructWireFrame()}
        }
        return {"Mesh": this._constructMesh(material)}
    }

}