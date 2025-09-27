import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroAnimation: React.FC<{ className?: string }> = ({ className }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // --- Scene, Camera, Renderer ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 3.5;
        camera.position.y = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0x60A5FA, 3, 100);
        pointLight1.position.set(-5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x10B981, 3, 100);
        pointLight2.position.set(5, -5, -5);
        scene.add(pointLight2);


        // --- 3D Model (Procedural Motorcycle) ---
        const bike = new THREE.Group();
        
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1E40AF,
            roughness: 0.2,
            metalness: 0.8,
            reflectivity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });
        
        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.8,
            metalness: 0.1,
        });
        
        const seatMaterial = new THREE.MeshStandardMaterial({
            color: 0x5C3D2E,
            roughness: 0.9,
            metalness: 0.0,
        });

        // Wheels
        const wheelGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 40);
        const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontWheel.position.set(1, 0, 0);
        const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        backWheel.position.set(-1, 0, 0);
        bike.add(frontWheel, backWheel);

        // Frame
        const frameGeometry = new THREE.BoxGeometry(2.2, 0.15, 0.15);
        const mainFrame = new THREE.Mesh(frameGeometry, frameMaterial);
        mainFrame.position.set(0, 0.2, 0);
        bike.add(mainFrame);
        
        const seatGeometry = new THREE.BoxGeometry(0.7, 0.2, 0.4);
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.set(-0.5, 0.6, 0);
        bike.add(seat);

        // Handlebars
        const handleBarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const handleBar = new THREE.Mesh(handleBarGeometry, wheelMaterial); // Using wheel material for handlebars
        handleBar.rotation.z = Math.PI / 2;
        handleBar.rotation.y = Math.PI / 2;
        handleBar.position.set(1, 0.8, 0);
        bike.add(handleBar);

        bike.scale.set(1.5, 1.5, 1.5);
        bike.rotation.y = -0.5;
        scene.add(bike);

        // --- Animation Loop ---
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            bike.rotation.y += 0.003;
            renderer.render(scene, camera);
        };
        animate();

        // --- Handle Resize ---
        const handleResize = () => {
            if (currentMount) {
                const width = currentMount.clientWidth;
                const height = currentMount.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                 currentMount.removeChild(renderer.domElement);
            }
            cancelAnimationFrame(animationFrameId);
            
            // Dispose Three.js objects
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className={className} />;
};

export default HeroAnimation;
