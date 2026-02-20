// ===== THREE SCENE CORE (CINEMATIC VERSION) =====

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(15, 12, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// ===== LIGHTING (like official example) =====

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;

scene.add(dirLight);


// ===== GROUND (official style) =====

const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.8,
    metalness: 0.2
});

const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);


// ===== AUTO STICK TO GROUND FUNCTION =====

function stickToGround(object) {
    const box = new THREE.Box3().setFromObject(object);
    object.position.y -= box.min.y;
}


// ===== EXAMPLE BUILDINGS (CLEAN STYLE) =====

function createBuilding(x, z) {
    const geo = new THREE.BoxGeometry(2, 4, 2);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.7,
        metalness: 0.1
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0, z);
    mesh.castShadow = true;
    scene.add(mesh);
    stickToGround(mesh);
}

createBuilding(-5, 0);
createBuilding(0, 0);
createBuilding(5, 0);


// ===== ANIMAL SPHERES (temporary placeholders) =====

function createAnimal(x, z) {
    const geo = new THREE.SphereGeometry(0.8, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        roughness: 0.6
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0, z);
    mesh.castShadow = true;
    scene.add(mesh);
    stickToGround(mesh);
}

createAnimal(2, 4);
createAnimal(6, 4);


// ===== RENDER LOOP =====

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


// ===== RESIZE =====

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
