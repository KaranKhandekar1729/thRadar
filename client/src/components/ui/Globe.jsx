import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useEffect, useRef } from "react";
import countries from '../../data/custom.geo.json';

export default function Globe({ arcData = [], pointData = [], render = "arcs", padding, onReady }) {
  const domRef = useRef(null); // reference to the DOM
  const currentGlobeObj = useRef(null)

  const lines = arcData.map(e => ({
    startLat: e.originLat,
    startLng: e.originLng,
    endLat: e.targetLat,
    endLng: e.targetLng,
    status: e.rank
  }));

  const points = pointData.map(e => ({
    lat: e.latitude,
    lng: e.longitude,
  }));

  useEffect(() => {
    let renderer, camera, scene, controls;

    let mouseX = 0;
    var Globe;

    const mount = domRef.current; // DOM Object

    init();
    initGlobe();
    onWindowResize();
    animate();

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement) // append webgl canvas inside the parent div

      // Scene
      scene = new THREE.Scene();
      var ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
      scene.add(ambientLight);
      scene.background = new THREE.Color(0x000000);

      // Camera
      camera = new THREE.PerspectiveCamera();
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();

      // Lights
      var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dLight.position.set(-800, 2000, 400);
      camera.add(dLight);

      var dLight1 = new THREE.DirectionalLight(0x000800, 1);
      dLight1.position.set(-200, 500, 200);
      camera.add(dLight1);

      var pLight = new THREE.PointLight(0x8566cc, 1);
      pLight.position.set(-200, 500, -200);
      camera.add(pLight);

      camera.position.z = 400;
      camera.position.x = 0;
      camera.position.y = 0;

      scene.add(camera);

      scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.dynamicDumpingFactor = 0.01;
      controls.rotateSpeed = 0.8;
      controls.zoomSpeed = 2;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;

      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI - Math.PI / 3;

      window.addEventListener("resize", onWindowResize, false);
      // document.addEventListener("mousemove", onMouseMove);
    }

    function initGlobe() {
      Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.6)
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(0.25)

      currentGlobeObj.current = Globe

      if (render === "arcs") {
        const globeMaterial = Globe.globeMaterial();
        globeMaterial.color = new THREE.Color(0x3a228a);
        globeMaterial.emissive = new THREE.Color(0x220038);
        globeMaterial.emissiveIntensity = 0.1;
        globeMaterial.shininess = 0.7;

        controls.minDistance = 200;
        controls.maxDistance = 300;

        let accumulated = [];
        let start = 0;
        const batchSize = 5;

        function feedArcsBatch() {
          let batch = lines.slice(start, start + batchSize);
          if (batch.length === 0) {
            start = 0;
            batch = lines.slice(start, start + batchSize);
          }
          // Add new batch to accumulated arcs
          accumulated = accumulated.concat(batch);

          // Render all active arcs
          Globe.arcsData([...accumulated])
            // .arcAltitude(e => e.arcAlt || 0.4)
            .arcStroke(e => e.status ? 0.5 : 0.3)
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashInitialGap(1)
            .arcDashAnimateTime(3000)
            .arcsTransitionDuration(0)
            .arcAltitudeAutoScale(0.5)
            // .arcColor(() => "#b30000");

          // Remove batch after its animation duration
          setTimeout(() => {
            accumulated = accumulated.filter(a => !batch.includes(a));
          }, 3000 + 2500); // matches arcDashAnimateTime + time for arcs to fully animate

          start += batchSize;
          setTimeout(feedArcsBatch, 1000); // new batch spawns while old batch animates
        }

        feedArcsBatch();

        scene.add(Globe);

      } else if (render === "points") {
        const globeMaterial = Globe.globeMaterial();
        globeMaterial.color = new THREE.Color(0x00800);
        globeMaterial.emissive = new THREE.Color(0x003366);
        globeMaterial.emissiveIntensity = 0.1;
        globeMaterial.shininess = 0.7;

        controls.minDistance = 200;
        controls.maxDistance = 260;
        controls.enableZoom = false;

        let start = 0
        const batchSize = 50

        function feedPointsBatch() {
          let batch = points.slice(start, start + batchSize);

          if (batch.length === 0) {
            start = 0;
            batch = points.slice(start, start + batchSize);
          };

          Globe.ringsData(batch)
            .ringColor(() => "red")
            .ringMaxRadius(2)

          start += batchSize;
          setTimeout(feedPointsBatch, 5000);
        }

        feedPointsBatch()

        scene.add(Globe)
        if (onReady) onReady({
          rotateToLatLng: (lat, lng) => {
            const GlobeObj = currentGlobeObj.current
            if (!GlobeObj) return;

            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);

            const startY = GlobeObj.rotation.y;
            const startX = GlobeObj.rotation.x || 0;
            const targetY = -theta;
            const targetX = phi - Math.PI / 2;

            const duration = 1000;
            const startTime = performance.now();

            function animateRotation(time) {
              const elapsed = time - startTime;
              const t = Math.min(elapsed / duration, 1);
              GlobeObj.rotation.y = startY + (targetY - startY) * t;
              GlobeObj.rotation.x = startX + (targetX - startX) * t;
              if (t < 1) requestAnimationFrame(animateRotation);
            }
            requestAnimationFrame(animateRotation);
          }

        });
      }

      Globe.rotateY(-Math.PI * (5 / 9));
      Globe.rotateZ(-Math.PI / 6);
    }


    function onWindowResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      if (Globe) {
        Globe.rotation.y += mouseX * 0.1;
      }

      controls.update();
      renderer.render(scene, camera);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={domRef} className={`${padding ? "pt-80": "pt-12"} w-full h-full rounded-t-lg flex align-middle m-auto`} />;
}