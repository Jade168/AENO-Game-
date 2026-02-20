let scene, camera, renderer;

function initEngine(containerId){

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,15,20);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById(containerId).appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

window.addEventListener("resize", ()=>{
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
}

function animate(){
requestAnimationFrame(animate);
if(window.updateWorld) updateWorld();
renderer.render(scene,camera);
}
