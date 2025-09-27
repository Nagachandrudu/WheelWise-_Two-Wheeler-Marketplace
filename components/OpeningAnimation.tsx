
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

interface OpeningAnimationProps {
    onFinish: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onFinish }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const DURATION = 4000; // 4 seconds total
        const FADE_OUT_DURATION = 500; // 0.5 seconds fade

        const finishTimer = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onFinish, FADE_OUT_DURATION);
        }, DURATION - FADE_OUT_DURATION);

        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xDBEAFE, 2, 100);
        pointLight.position.set(5, 10, 15);
        scene.add(pointLight);
        const directionalLight = new THREE.DirectionalLight(0x10B981, 1);
        directionalLight.position.set(-5, -5, 5);
        scene.add(directionalLight);


        // 3D Text
        const fontLoader = new FontLoader();
        fontLoader.load(
            'https://aistudiocdn.com/three@^0.166.1/examples/fonts/helvetiker_bold.typeface.json',
            (font) => {
                const textGeometry = new TextGeometry('WheelWise', {
                    font: font,
                    size: 1.5,
                    height: 0.2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5,
                });
                textGeometry.center();

                const textMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xDBEAFE,
                    metalness: 0.9,
                    roughness: 0.05,
                    reflectivity: 1.0,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1,
                });
                
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                scene.add(textMesh);
                
                let animationFrameId: number;
                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate);
                    textMesh.rotation.y += 0.005;
                    renderer.render(scene, camera);
                };
                animate();
            }
        );

        const handleResize = () => {
            if (currentMount) {
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            clearTimeout(finishTimer);
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [onFinish]);


    return (
        <div 
            ref={mountRef} 
            className={`fixed inset-0 bg-brand-dark z-[101] transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} 
        />
    );
};

export default OpeningAnimation;
