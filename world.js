// ===== WORLD.JS =====
// 只負責建立世界物件（建築 + 動物）

function loadWorld() {

  if (!scene) {
    console.error("Engine not ready");
    return;
  }

  createBuildings();
  createAnimals();
}


// ===== 建築 =====
function createBuildings() {

  const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
  const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });

  for (let i = 0; i < 3; i++) {
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(i * 10 - 10, 5, -10);
    scene.add(building);
  }
}


// ===== 動物 =====
function createAnimals() {

  const animalGeometry = new THREE.SphereGeometry(2, 16, 16);
  const animalMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00 });

  for (let i = 0; i < 2; i++) {
    const animal = new THREE.Mesh(animalGeometry, animalMaterial);
    animal.position.set(i * 8 - 4, 2, 5);
    scene.add(animal);
  }
}
