let animals=[];

function loadWorld(){

const groundGeo = new THREE.PlaneGeometry(100,100);
const groundMat = new THREE.MeshStandardMaterial({color:0x228B22});
const ground = new THREE.Mesh(groundGeo,groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

for(let i=0;i<3;i++){
const box = new THREE.Mesh(
new THREE.BoxGeometry(3,3,3),
new THREE.MeshStandardMaterial({color:0x999999})
);
box.position.set(i*6-6,1.5,0);
scene.add(box);
}

for(let i=0;i<2;i++){
const animal = new THREE.Mesh(
new THREE.SphereGeometry(1,16,16),
new THREE.MeshStandardMaterial({color:0xff9900})
);
animal.position.set(i*5-2,1,5);
scene.add(animal);
animals.push(animal);
}

}

function updateWorld(){
animals.forEach(a=>{
a.position.x += 0.02;
if(a.position.x>10) a.position.x=-10;
});
}
