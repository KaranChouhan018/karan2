'use client';
import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO, useTexture } from "@react-three/drei";
import * as THREE from "three";
import useMouse from "@/hooks/useMouse";
import useDimension from "@/hooks/useDimension";
import { vertex } from "@/shaders/vertex";
import { fragment } from "@/shaders/fragment";

export default function Model() {
  const { viewport } = useThree();
  const brushTexture = useTexture("/images/brush.png");
  const meshRefs = useRef([]);
  const [meshes, setMeshes] = useState([]);
  const mouse = useMouse();
  const device = useDimension();
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);
  const { gl, camera } = useThree();

  // Load all image textures at the component level
  const imageTextures = useTexture(
    Array.from({ length: 9 }, (_, i) => `/images/floating_${i + 1}.jpg`)
  );

  const scene = new THREE.Scene();
  const max = 100;

  const uniforms = useRef({
    uDisplacement: { value: null },
    uTexture: { value: null },
    winResolution: {
      value: new THREE.Vector2(0, 0),
    },
  });

  const fboBase = useFBO(device.width, device.height);
  const fboTexture = useFBO(device.width, device.height);

  const { scene: imageScene, camera: imageCamera } = Images(viewport, imageTextures);

  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const groupRef = useRef();
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window);

  // Handle device orientation changes
  useEffect(() => {
    const handleOrientation = (event) => {
      setDeviceOrientation({
        beta: event.beta,
        gamma: event.gamma
      });
    };

    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    if (isTouch) {
      requestPermission();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isTouch]);

  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => (meshRefs.current[i] = el)}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent={true} map={brushTexture} />
      </mesh>
    ));
    setMeshes(generatedMeshes);
  }, [brushTexture]);

  function setNewWave(x, y, currentWave) {
    const mesh = meshRefs.current[currentWave];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      mesh.material.opacity = 1;
      mesh.scale.x = 1.75;
      mesh.scale.y = 1.75;
    }
  }

  function trackMousePos(x, y) {
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      setCurrentWave((currentWave + 1) % max);
      setNewWave(x, y, currentWave);
      
    }
    setPrevMouse({ x: x, y: y });
  }

  useFrame(({ gl, scene: finalScene }) => {
    const x = mouse.x - device.width / 2;
    const y = -mouse.y + device.height / 2;
    trackMousePos(x, y);
    meshRefs.current.forEach((mesh) => {
      if (mesh.visible) {
        mesh.rotation.z += 0.025;
        mesh.material.opacity *= 0.95;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
      }
    });

    if (device.width > 0 && device.height > 0) {
      // uniforms.current.uTexture.value = imageTexture;

      // Render to base texture with meshes
      gl.setRenderTarget(fboBase);
      gl.clear();
      meshRefs.current.forEach((mesh) => {
        if (mesh.visible) {
          scene.add(mesh);
        }
      });
      gl.render(scene, camera);
      meshRefs.current.forEach((mesh) => {
        if (mesh.visible) {
          scene.remove(mesh);
        }
      });
      uniforms.current.uTexture.value = fboTexture.texture;

      gl.setRenderTarget(fboTexture);
      gl.render(imageScene, imageCamera);
      uniforms.current.uDisplacement.value = fboBase.texture;

      gl.setRenderTarget(null);
      gl.render(finalScene, camera);
      // Render the scene with updated displacement
      // gl.setRenderTarget(fboTexture);
      // gl.clear();
      // gl.render(scene, camera);
      // uniforms.current.uTexture.value = fboTexture.texture;
      // gl.setRenderTarget(null);

      uniforms.current.winResolution.value = new THREE.Vector2(device.width, device.height).multiplyScalar(
        device.pixelRatio
      );
    }

    // Apply movement to images based on device orientation or mouse position
    if (imageScene) {
      imageScene.children.forEach(group => {
        if (group instanceof THREE.Group) {
          group.children.forEach((image, index) => {
            const originalPos = image.userData.originalPosition;
            
            if (isTouch && deviceOrientation.beta && deviceOrientation.gamma) {
              // Device orientation movement
              const moveFactorX = deviceOrientation.gamma * 0.002; // Adjust sensitivity
              const moveFactorY = deviceOrientation.beta * 0.002; // Adjust sensitivity
              
              image.position.x = originalPos.x + moveFactorX * (index + 1);
              image.position.y = originalPos.y + moveFactorY * (index + 1);
            } else {
              // Mouse movement
              const mouseX = (mouse.x - device.width / 2) * 0.001;
              const mouseY = (-mouse.y + device.height / 2) * 0.001;
              
              image.position.x = originalPos.x + mouseX * (index + 1);
              image.position.y = originalPos.y + mouseY * (index + 1);
            }

            // Add subtle floating animation
            image.position.y += Math.sin(Date.now() * 0.001 + index) * 0.1;
          });
        }
      });
    }
  }, 1);

  function Images(viewport, textures) {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      viewport.width / -2,
      viewport.width / 2,
      viewport.height / 2,
      viewport.height / -2,
      -1000,
      1000
    );
    camera.position.z = 2;
    scene.add(camera);
    
    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();
    
    // Create array of image positions for scattered layout
    const imageLayouts = [
      {
        position: { x: -0.4 * viewport.width, y: 0.3 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: 0.1 * viewport.width, y: 0.45 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: 0.4 * viewport.width, y: 0.25 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: -0.45 * viewport.width, y: -0.3 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: 0 * viewport.width, y: -0.4 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: 0.5 * viewport.width, y: -0.15 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      }
      ,
      {
        position: { x: -0.2 * viewport.width, y: -0.2 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: 0.25 * viewport.width, y: -0.25 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      },
      {
        position: { x: -0.1 * viewport.width, y: 0.4 * viewport.height, z: 1 },
        scale: { x: viewport.width / 8, y: viewport.width / 6 },
        rotation: 0
      }
      
    ];

    // Create and position each image with movement
    for (let i = 0; i < 9; i++) {
      const material = new THREE.MeshBasicMaterial({ 
        map: textures[i],
        transparent: true,
        opacity: 0.9
      });
      
      const image = new THREE.Mesh(geometry, material);
      const layout = imageLayouts[i];
      
      // Store original position for animation
      image.userData.originalPosition = {
        x: layout.position.x,
        y: layout.position.y,
        z: layout.position.z
      };
      
      image.position.set(
        layout.position.x,
        layout.position.y,
        layout.position.z
      );
      
      image.scale.set(
        layout.scale.x,
        layout.scale.y,
        1
      );
      
      image.rotation.z = layout.rotation;
      
      group.add(image);
    }
  
    scene.add(group);
    return { scene, camera, group };
  }
  return (
    <>
          <group>
      {meshes}
      {/* <Images /> */}
      <mesh>
        <planeGeometry args={[device.width, device.height, 1, 1]} />
        <shaderMaterial
          // args={[device.width, device.height, 1]}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          uniforms={uniforms.current}
        ></shaderMaterial>
     
      </mesh>
    </group>
   </>
  );

}