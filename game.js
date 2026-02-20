// ===== AENO GAME BASIC WORLD =====

// 基本場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// 相機
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 30);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// 地面
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3cb371 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ===== 建築 =====

function createHouse(x, z) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
  );
  body.position.y = 1;
  group.add(body);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.7, 1.5, 4),
    new THREE.MeshStandardMaterial({ color: 0xaa0000 })
  );
  roof.position.y = 2.5;
  roof.rotation.y = Math.PI / 4;
  group.add(roof);

  group.position.set(x, 0, z);
  scene.add(group);
}

function createFarm(x, z) {
  const farm = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.3, 3),
    new THREE.MeshStandardMaterial({ color: 0x996633 })
  );
  farm.position.set(x, 0.15, z);
  scene.add(farm);
}

function createLumberMill(x, z) {
  const mill = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 2, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 })
  );
  mill.position.set(x, 1, z);
  scene.add(mill);
}

function createTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
  );
  trunk.position.set(x, 0.75, z);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.8),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
  );
  leaves.position.set(x, 1.8, z);

  scene.add(trunk);
  scene.add(leaves);
}

// ===== 動物 =====

const animals = [];

function createAnimal(x, z) {
  const animal = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  animal.position.set(x, 0.5, z);

  animal.userData = {
    dirX: (Math.random() - 0.5) * 0.05,
    dirZ: (Math.random() - 0.5) * 0.05
  };

  animals.push(animal);
  scene.add(animal);
}

function updateAnimals() {
  animals.forEach(a => {
    a.position.x += a.userData.dirX;
    a.position.z += a.userData.dirZ;

    if (a.position.x > 80 || a.position.x < -80) {
      a.userData.dirX *= -1;
    }
    if (a.position.z > 80 || a.position.z < -80) {
      a.userData.dirZ *= -1;
    }
  });
}

// ===== 生成世界 =====

function generateWorld() {

  for (let i = 0; i < 5; i++) {
    createHouse(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }

  for (let i = 0; i < 2; i++) {
    createFarm(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }

  for (let i = 0; i < 2; i++) {
    createLumberMill(Math.random() * 60 - 30, Math.random() * 60 - 30);
  }

  for (let i = 0; i < 20; i++) {
    createTree(Math.random() * 150 - 75, Math.random() * 150 - 75);
  }

  for (let i = 0; i < 6; i++) {
    createAnimal(Math.random() * 100 - 50, Math.random() * 100 - 50);
  }
}

generateWorld();

// ===== 簡單鏡頭控制（手機可拖） =====

let isDragging = false;
let prevX = 0;

document.addEventListener("mousedown", e => {
  isDragging = true;
  prevX = e.clientX;
});

document.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const delta = e.clientX - prevX;
  camera.position.x -= delta * 0.05;
  prevX = e.clientX;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("touchstart", e => {
  isDragging = true;
  prevX = e.touches[0].clientX;
});

document.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const delta = e.touches[0].clientX - prevX;
  camera.position.x -= delta * 0.05;
  prevX = e.touches[0].clientX;
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// ===== 動畫循環 =====

function animate() {
  requestAnimationFrame(animate);

  updateAnimals();

  renderer.render(scene, camera);
}

animate();

// ===== 響應式 =====

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
