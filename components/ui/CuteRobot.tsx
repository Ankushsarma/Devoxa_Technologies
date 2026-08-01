'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function ThreeDBlenderRobot() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 120 / 140, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // Renderer with full transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(120, 140);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights (Studio Lighting setup matching Blender render)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x90a4ae, 1.2);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Robot Main Group
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Materials (Blender Grey Clay / Matte Plastic)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x545c66,
      roughness: 0.35,
      metalness: 0.1,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x33383e,
      roughness: 0.4,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.1, // Glossy glass
      metalness: 0.6,
    });

    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // 1. HEAD (Rounded 3D Cube Helmet using scaled Sphere)
    const headGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
    headMesh.scale.set(1.35, 1.1, 1.1); // Rounded box shape
    headMesh.position.set(0, 0.4, 0);
    robotGroup.add(headMesh);

    // 2. SCREEN (Inset dark glossy plate)
    const screenGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.scale.set(1.15, 0.85, 0.5);
    screenMesh.position.set(0, 0.4, 0.7);
    robotGroup.add(screenMesh);

    // 3. EYES (Glowing White rounded nubs)
    const eyeGeo = new THREE.BoxGeometry(0.22, 0.28, 0.05);
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.3, 0.4, 1.18);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.3, 0.4, 1.18);
    robotGroup.add(rightEye);

    // 4. EAR NUB (Left Side)
    const earGeo = new THREE.BoxGeometry(0.2, 0.35, 0.3);
    const earMesh = new THREE.Mesh(earGeo, darkMaterial);
    earMesh.position.set(-1.6, 0.4, 0);
    robotGroup.add(earMesh);

    // 5. BODY (Small Torso)
    const bodyGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
    bodyMesh.scale.set(0.9, 1.0, 0.8);
    bodyMesh.position.set(0, -0.9, 0);
    robotGroup.add(bodyMesh);

    // 6. ARMS (Left & Right nubs)
    const armGeo = new THREE.SphereGeometry(0.25, 16, 16);
    
    const leftArm = new THREE.Mesh(armGeo, bodyMaterial);
    leftArm.position.set(-0.75, -0.9, 0);
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
    rightArm.position.set(0.75, -0.9, 0);
    robotGroup.add(rightArm);

    // 7. LEGS (Left & Right stubby feet)
    const legGeo = new THREE.CapsuleGeometry(0.18, 0.25, 8, 16);
    
    const leftLeg = new THREE.Mesh(legGeo, bodyMaterial);
    leftLeg.position.set(-0.3, -1.6, 0);
    robotGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, bodyMaterial);
    rightLeg.position.set(0.3, -1.6, 0);
    robotGroup.add(rightLeg);

    // Subtle 3D Angle Turn (pointing 3/4 like the reference photo!)
    robotGroup.rotation.y = -0.35; 
    robotGroup.rotation.x = 0.08;

    // Animation Loop (Leg swinging + Head Bobbing in 3D Space)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // 3D Walking Leg Motion
      leftLeg.rotation.x = Math.sin(time * 8) * 0.4;
      rightLeg.rotation.x = -Math.sin(time * 8) * 0.4;

      // 3D Arm Swinging
      leftArm.position.z = Math.sin(time * 8) * 0.15;
      rightArm.position.z = -Math.sin(time * 8) * 0.15;

      // Gentle 3D Head Bobbing
      const headBob = Math.sin(time * 3) * 0.05;
      headMesh.rotation.z = headBob;
      screenMesh.rotation.z = headBob;
      leftEye.rotation.z = headBob;
      rightEye.rotation.z = headBob;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '120px', height: '140px', pointerEvents: 'none' }} />;
}

export function CuteRobot() {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }} 
      animate={{
        //          1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
        x:       [  0,  50,  50,  50,  50,  65,  80,  80,  80,  80,  80,  80, 160, 240, 240, 240],
        y:       [-55, -55, -55, -55, -55, -85,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
        rotateY: [ 60,  60,  60,  60,  60,  60,  60,  60,  60,  60,   0,  60,  60,  60,  60,  60],
        rotate:  [  0,   0,   0,  25,   0,   0,   0,  90,  90,   0,   0,   0,   0,   0,   0,   0],
        scaleX:  [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
        scaleY:  [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
        opacity: [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1]
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        repeatType: "reverse",
        //      1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16
        times: [0.0, 0.15, 0.20, 0.23, 0.27, 0.32, 0.35, 0.37, 0.47, 0.50, 0.55, 0.60, 0.70, 0.80, 0.85, 1.0],
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        top: -65, 
        left: '10%', 
        width: '120px', 
        height: '140px',
        zIndex: 10,
        pointerEvents: 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      <ThreeDBlenderRobot />
    </motion.div>
  );
}
