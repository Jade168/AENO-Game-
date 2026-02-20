function startGame() {

  const container = document.getElementById("gameContainer");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0,20,30);

  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(10,20,10);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff,0.6);
  scene.add(ambient);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200,200),
    new THREE.MeshStandardMaterial({color:0x3cb371})
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
  }

  animate();
}
