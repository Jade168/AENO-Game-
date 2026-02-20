let animals=[];

function loadWorld(){

// 🔥 地面縮細
const groundGeo = new THREE.PlaneGeometry(60,60);
const groundMat = new THREE.MeshStandardMaterial({color:0x3cb371});
const ground = new THREE.Mesh(groundGeo,groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// 🔥 建築抬高
for(let i=0;i<3;i++){
const box = new THREE.Mesh(
new THREE.BoxGeometry(4,6,4),
new THREE.MeshStandardMaterial({color:0x888888})
);
box.position.set(i*10-10,3,0);
scene.add(box);
}

// 🔥 動物抬高
for(let i=0;i<2;i++){
const animal = new THREE.Mesh(
new THREE.SphereGeometry(1.5,20,20),
new THREE.MeshStandardMaterial({color:0xff6600})
);
animal.position.set(i*8-4,1.5,10);
scene.add(animal);
animals.push(animal);
}

}

function updateWorld(){
animals.forEach(a=>{
a.position.x += 0.05;
if(a.position.x>20) a.position.x=-20;
});
}
