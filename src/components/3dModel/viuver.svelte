<script>
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import {onMount} from 'svelte';
    export let size = {
        x: 500,
        y: 500
    }
    export let modelConfig
    export let modelTexture
    onMount(() => {
        const canvas = document.createElement('canvas')
        document.getElementById('3dModel').appendChild(canvas)
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.height = size.y
        canvas.width = size.x
        let texture = new THREE.TextureLoader().load(modelTexture)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, size.x / size.y, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({canvas: canvas})
        renderer.setSize(size.x, size.y)
        //CRÉATION DU JOUEUR
        // mapage du model
        const elements = elementsParser(modelConfig.elements)
        // création du joueur
        function createElements(elements, parent = null) {
    elements.forEach(function (element) {
        // Créer la géométrie du cube
        let geometry = new THREE.BoxGeometry(element.size.x, element.size.y, element.size.z);

        // Définir le matériau
        let material;
        if (element.texture.show){
            material = new THREE.MeshBasicMaterial({ map: texture });

            // Ajuster les coordonnées UV pour chaque face
            const u = element.texture.u;
            const v = element.texture.v;
            const sizeMult = 16 //element.texture.textureSize;
            const size = element.size
            const uvAttribute = geometry.attributes.uv;

            // Face mapping based on the provided image
            /*
                size:
                {
                    x:1
                    y:2
                    z:3
                }
                la texture est comme sa:
                *  ##--
                   ##--
                   ##--
                oooxuuuv
                oooxuuuv

                [*]: la potion "u, v"
                [#]: la fasse du haut
                [-]: la fasse du bas
                [o]: la fasse de gauche
                [x]: la fasse du devant
                [u]: la fasse de droite
                [v]: la fasse de derrière
            */
            const faceUvs = [
                // top
                { u1: u+size.z, v1: v, u2: u+size.z+size.y, v2:v, u3: u+size.z+size.y, v3: v+size.z, u4: u+size.z, v4: v+size.z },
                // bottom
                { u1: u+size.z+size.y, v1: v, u2: u+size.z+size.y+size.y, v2:v, u3: u+size.z+size.y+size.y, v3: v+size.z, u4: u+size.z+size.y, v4: v+size.z },
                // left
                { u1: u, v1: v+size.z, u2: u+size.z, v2:v+size.z, u3: u+size.z, v3: v+size.z+size.y, u4: u, v4: v+size.z+size.y },
                // front
                { u1: u+size.z, v1: v+size.z, u2: u+size.z+size.x, v2: v+size.z, u3: u+size.z+size.x, v3: v+size.z+size.y, u4: u+size.z, v4: v+size.z+size.y },
                // right
                { u1: u+size.z+size.x, v1: v+size.z, u2: u+size.z+size.x+size.z, v2:v+size.z, u3: u+size.z+size.x+size.z, v3: v+size.z+size.y, u4: u+size.z+size.x, v4: v+size.z+size.y },
                // back
                { u1: u+size.z+size.x+size.z, v1: v+size.z, u2: u+size.z+size.x+size.z+size.x, v2:v+size.z, u3: u+size.z+size.x+size.z+size.x, v3: v+size.z+size.y, u4: u+size.z+size.x+size.z, v4: v+size.z+size.y },
            ]
            for (let i = 0; i < uvAttribute.count; i += 4) {
                const faceIndex = Math.floor(i / 4);
                const faceUv = faceUvs[faceIndex];

                uvAttribute.setXY(i + 0, faceUv.u1, faceUv.v1);
                uvAttribute.setXY(i + 2, faceUv.u2, faceUv.v2);
                uvAttribute.setXY(i + 3, faceUv.u3, faceUv.v3);
                uvAttribute.setXY(i + 1, faceUv.u4, faceUv.v4);
                console.log("uvAttribute", uvAttribute);

            }

            uvAttribute.needsUpdate = true;
        } else {
            //material vert transparent 50%
            material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
        }

        // Créer le mesh du cube
        let cube = new THREE.Mesh(geometry, material);

        // Définir la position relative
        if (parent) {
            cube.position.set(
                parent.position.x + element.position.x,
                parent.position.y + element.position.y,
                parent.position.z + element.position.z
            );
        } else {
            cube.position.set(element.position.x, element.position.y, element.position.z);
        }

        // Définir la rotation
        // cube.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z);

        // Ajouter le cube à la scène ou au parent
        if (parent) {
            parent.add(cube);
        } else {
            scene.add(cube);
        }

        // Créer les éléments enfants
        createElements(element.children, cube);
    });
}




        createElements(elements)
        //FIN DE LA CRÉATION DU JOUEUR
        //ajoute une grille pour mieux voir les axes
        // const gridHelperX = new THREE.GridHelper(100, 100);
        // scene.add(gridHelperX)
        // const gridHelperY = new THREE.GridHelper(100, 100);
        // gridHelperY.rotation.x = Math.PI / 2
        // scene.add(gridHelperY)
        // const gridHelperZ = new THREE.GridHelper(100, 100);
        // gridHelperZ.rotation.z = Math.PI / 2
        // scene.add(gridHelperZ)
        
        
        camera.position.z = 5
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()

        function animate() {
            controls.update()
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
    })
    function elementsParser(elements) {
        //renvois name, id, children
        let returnElements = []
        // log.d("elementsParser iterator", iterator++);
        if (elements) {
            elements.forEach(function (element) {
                returnElements.push( {
                    name: element.name || element.id,
                    id: element.storeID || element.id,
                    offset: element.offset  || {x: 0, y: 0, z: 0},
                    rotation: element.rotation || {x: 0, y: 0, z: 0},
                    size: element.size || {x: 1, y: 1, z: 1},
                    position: element.pos || {x: 0, y: 0, z: 0},
                    mirror: element.mirror || false,
                    texture: {
                        u: element.u|| 0,
                        v: element.v || 0,
                        textureSize: element.textureSize || 1,
                        show: element.show || false,
                        texture: element.texture || false
                    },
                    children: elementsParser(element.children)
                })

            });
        }
        return returnElements;//renvois une liste d'objet contenant name, id, children
    }

</script>
<div id="3dModel"></div>