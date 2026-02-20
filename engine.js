let scene, camera, renderer;

function initEngine(containerId){

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
2000
);

// 🔥 提高鏡頭 + 俯視角度
camera.position.set(0,40,40);
camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById(containerId).appendChild(renderer.domElement);

// 光源
const light = new THREE.DirectionalLight(0xffffff,1.2);
light.position.set(50,100,50);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambient);

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
