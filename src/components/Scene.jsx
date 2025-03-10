import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState , useRef } from "react";
import Model from "./Model";
import useDimension from "@/hooks/useDimension";
import { OrthographicCamera } from "@react-three/drei";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SceneText from "./SceneText";
import Navbar from "./Navbar";

function CameraController() {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Smooth camera movement
    camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.05;
  });

  return null;
}

export default function Scene() {
  const Header = useRef(null);
  const device = useDimension();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 20,
        y: (event.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  

  if (!device.width || !device.height) {
    return null;
  }

  const frustumSize = device.height;
  const aspect = device.width / device.height;

  return (
    <div className="h-screen w-screen overflow-x-clip ">
      <div 
        className=" h-screen w-full overflow-x-clip"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Canvas>
          <OrthographicCamera
            makeDefault
            args={[
              (frustumSize * aspect) / -2,
              (frustumSize * aspect) / 2,
              frustumSize / 2,
              frustumSize / -2,
              -1000,
              1000,
            ]}
            position={[0, 0, 2]}
          />


        
          <Model />
          
        </Canvas>

        <SceneText/>
   
        
      </div>
    </div>
  );
}
