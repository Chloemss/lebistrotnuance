/**
 * Cocktail3D — verre 3D paramétrique par boisson
 * Reçoit `nom` (nom du plat) et affiche le bon verre/couleur/garniture
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════
   CONFIG par boisson
═══════════════════════════════════════════════════ */
type Shape = 'highball' | 'coupe' | 'wine' | 'mug'

interface Cfg {
  shape:   Shape
  liquid:  string    // couleur liquide
  opacity: number
  foam?:   string    // couleur mousse/crème
  mint?:   boolean
  straw?:  string    // couleur paille
  salt?:   boolean   // bord salé
  yOff?:   number    // décalage vertical groupe
}

const CONFIG: Record<string, Cfg> = {
  'Sour des Nuances':    { shape: 'coupe',    liquid: '#C89010', opacity: 0.90, foam: '#f2e8dc' },
  'Spritz Foire':        { shape: 'wine',     liquid: '#F07820', opacity: 0.80, straw: '#cccccc' },
  'Moscow Mule':         { shape: 'mug',      liquid: '#c8e890', opacity: 0.72, mint: true, straw: '#44aa66' },
  'Margarita Classique': { shape: 'coupe',    liquid: '#c4f0b8', opacity: 0.74, salt: true },
  'Virgin Colada':       { shape: 'highball', liquid: '#f8f0d8', opacity: 0.90, foam: '#fefcfa', straw: '#c89040' },
  'Limonade Maison':     { shape: 'highball', liquid: '#e8d040', opacity: 0.74, mint: true, straw: '#88cc88' },
  'Bière Artisanale':    { shape: 'highball', liquid: '#c07018', opacity: 0.86, foam: '#f0ecd8' },
  'Vin de la Maison':    { shape: 'wine',     liquid: '#6b0f1e', opacity: 0.93 },
}

/* ═══════════════════════════════════════════════════
   MATÉRIAU VERRE (partagé)
═══════════════════════════════════════════════════ */
function GM() {
  return (
    <MeshTransmissionMaterial
      backside
      samples={8}
      thickness={0.04}
      roughness={0.01}
      transmission={0.97}
      ior={1.52}
      chromaticAberration={0.05}
      color="#cce8ff"
      envMapIntensity={1.4}
      toneMapped={false}
    />
  )
}

/* ═══════════════════════════════════════════════════
   FORMES DE VERRE
═══════════════════════════════════════════════════ */

/** Highball — grand verre droit (Colada, Limonade, Bière) */
function GlassHighball() {
  return (
    <>
      <mesh renderOrder={3}><cylinderGeometry args={[0.58, 0.50, 3.4, 64, 1, true]} /><GM /></mesh>
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}><circleGeometry args={[0.50, 48]} /><GM /></mesh>
      <mesh position={[0,  1.7, 0]} rotation={[ Math.PI / 2, 0, 0]} renderOrder={4}><torusGeometry args={[0.57, 0.022, 10, 64]} /><GM /></mesh>
    </>
  )
}

/** Coupe — verre large peu profond sur tige (Sour, Margarita) */
function GlassCoupe() {
  return (
    <>
      <mesh position={[0, 0.18, 0]} renderOrder={3}><cylinderGeometry args={[0.70, 0.08, 0.56, 52, 1, true]} /><GM /></mesh>
      <mesh position={[0, -0.10, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}><circleGeometry args={[0.08, 32]} /><GM /></mesh>
      <mesh position={[0,  0.46, 0]} rotation={[ Math.PI / 2, 0, 0]} renderOrder={4}><torusGeometry args={[0.695, 0.020, 10, 64]} /><GM /></mesh>
      <mesh position={[0, -0.55, 0]} renderOrder={3}><cylinderGeometry args={[0.025, 0.025, 0.95, 8]} /><GM /></mesh>
      <mesh position={[0, -1.04, 0]} renderOrder={3}><cylinderGeometry args={[0.23, 0.23, 0.03, 40]} /><GM /></mesh>
    </>
  )
}

/** Verre à vin — bol arrondi sur tige fine (Spritz, Vin) */
function GlassWine() {
  return (
    <>
      <mesh position={[0,  0.46, 0]} renderOrder={3}><cylinderGeometry args={[0.52, 0.44, 0.68, 52, 1, true]} /><GM /></mesh>
      <mesh position={[0,  0.00, 0]} renderOrder={3}><cylinderGeometry args={[0.44, 0.09, 0.60, 52, 1, true]} /><GM /></mesh>
      <mesh position={[0, -0.30, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}><circleGeometry args={[0.09, 32]} /><GM /></mesh>
      <mesh position={[0,  0.80, 0]} rotation={[ Math.PI / 2, 0, 0]} renderOrder={4}><torusGeometry args={[0.515, 0.018, 10, 64]} /><GM /></mesh>
      <mesh position={[0, -0.82, 0]} renderOrder={3}><cylinderGeometry args={[0.022, 0.022, 1.0, 8]} /><GM /></mesh>
      <mesh position={[0, -1.34, 0]} renderOrder={3}><cylinderGeometry args={[0.22, 0.22, 0.03, 40]} /><GM /></mesh>
    </>
  )
}

/** Mug cuivré — Moscow Mule */
function GlassMug() {
  const mat = <meshStandardMaterial color="#B07030" metalness={0.85} roughness={0.28} />
  return (
    <>
      <mesh renderOrder={2}><cylinderGeometry args={[0.62, 0.56, 3.0, 36, 1, true]} />{mat}</mesh>
      <mesh position={[0, -1.50, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}><circleGeometry args={[0.56, 36]} />{mat}</mesh>
      <mesh position={[0,  1.52, 0]} rotation={[ Math.PI / 2, 0, 0]} renderOrder={3}><torusGeometry args={[0.62, 0.028, 8, 36]} />{mat}</mesh>
      <mesh position={[0, -1.52, 0]} rotation={[ Math.PI / 2, 0, 0]} renderOrder={3}><torusGeometry args={[0.56, 0.028, 8, 36]} />{mat}</mesh>
    </>
  )
}

/* ═══════════════════════════════════════════════════
   LIQUIDES (proportionnés à chaque verre)
═══════════════════════════════════════════════════ */
function LiquidHighball({ c, o }: { c: string; o: number }) {
  return <mesh position={[0, -0.35, 0]} renderOrder={1}><cylinderGeometry args={[0.55, 0.48, 2.62, 48]} /><meshStandardMaterial color={c} transparent opacity={o} roughness={0.06} /></mesh>
}
function LiquidCoupe({ c, o }: { c: string; o: number }) {
  return <mesh position={[0, 0.15, 0]} renderOrder={1}><cylinderGeometry args={[0.66, 0.07, 0.50, 36]} /><meshStandardMaterial color={c} transparent opacity={o} roughness={0.05} /></mesh>
}
function LiquidWine({ c, o }: { c: string; o: number }) {
  return (
    <>
      <mesh position={[0, 0.00, 0]} renderOrder={1}><cylinderGeometry args={[0.42, 0.08, 0.56, 36]} /><meshStandardMaterial color={c} transparent opacity={o} roughness={0.06} /></mesh>
      <mesh position={[0, 0.42, 0]} renderOrder={1}><cylinderGeometry args={[0.50, 0.42, 0.62, 48]} /><meshStandardMaterial color={c} transparent opacity={o} roughness={0.06} /></mesh>
    </>
  )
}
function LiquidMug({ c, o }: { c: string; o: number }) {
  return <mesh position={[0, 0.20, 0]} renderOrder={1}><cylinderGeometry args={[0.59, 0.55, 2.2, 36]} /><meshStandardMaterial color={c} transparent opacity={o} roughness={0.06} /></mesh>
}

/* ═══════════════════════════════════════════════════
   GARNITURES
═══════════════════════════════════════════════════ */
function Foam({ color, y, r }: { color: string; y: number; r: number }) {
  return (
    <mesh position={[0, y, 0]} renderOrder={2}>
      <cylinderGeometry args={[r, r, 0.10, 36]} />
      <meshStandardMaterial color={color} roughness={0.65} transparent opacity={0.90} />
    </mesh>
  )
}

function Mint({ yBase }: { yBase: number }) {
  const leaves: Array<{ p: [number,number,number]; r: [number,number,number] }> = [
    { p: [ 0.00, yBase,       0.00], r: [-0.32,  0.00,  0.10] },
    { p: [ 0.10, yBase + 0.10, -0.06], r: [-0.26,  0.85, -0.18] },
    { p: [-0.08, yBase + 0.05,  0.10], r: [-0.40, -0.55,  0.22] },
  ]
  return (
    <>
      {leaves.map((l, i) => (
        <mesh key={i} position={l.p} rotation={l.r} renderOrder={4}>
          <planeGeometry args={[0.17, 0.30]} />
          <meshStandardMaterial color="#2b7840" side={THREE.DoubleSide} transparent opacity={0.93} roughness={0.65} />
        </mesh>
      ))}
    </>
  )
}

function Straw({ color, y }: { color: string; y: number }) {
  return (
    <group position={[0.22, y, 0.10]} rotation={[0, 0.28, 0.06]}>
      <mesh renderOrder={4}>
        <cylinderGeometry args={[0.020, 0.020, 4.0, 10]} />
        <meshStandardMaterial color={color} roughness={0.22} metalness={0.04} />
      </mesh>
    </group>
  )
}

function SaltRim({ r }: { r: number }) {
  return (
    <mesh position={[0, 0.47, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={5}>
      <torusGeometry args={[r, 0.034, 6, 64]} />
      <meshStandardMaterial color="#f8f8f4" roughness={0.95} transparent opacity={0.92} />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════
   SCÈNE COMPOSITE
═══════════════════════════════════════════════════ */
const FOAM_Y: Record<Shape, number> = { highball: 1.02, coupe: 0.42, wine: 0.78, mug: 1.32 }
const FOAM_R: Record<Shape, number> = { highball: 0.53, coupe: 0.64, wine: 0.49, mug: 0.58 }
const MINT_Y: Record<Shape, number> = { highball: 1.36, coupe: 0.42, wine: 0.80, mug: 1.56 }
const STRAW_Y: Record<Shape, number>= { highball: 0.64, coupe: 0.30, wine: 0.60, mug: 0.78 }
const Y_OFF:   Record<Shape, number> = { highball: 0.10, coupe: -0.15, wine: -0.10, mug: 0.10 }

function Scene({ nom }: { nom: string }) {
  const cfg = CONFIG[nom] ?? CONFIG['Bière Artisanale']
  const { shape: s, liquid: c, opacity: o } = cfg

  const glass   = { highball: <GlassHighball />,    coupe: <GlassCoupe />, wine: <GlassWine />, mug: <GlassMug /> }[s]
  const liquid  = { highball: <LiquidHighball c={c} o={o} />, coupe: <LiquidCoupe c={c} o={o} />, wine: <LiquidWine c={c} o={o} />, mug: <LiquidMug c={c} o={o} /> }[s]

  return (
    <group position={[0, Y_OFF[s], 0]}>
      {liquid}
      {glass}
      {cfg.foam  && <Foam   color={cfg.foam}  y={FOAM_Y[s]}  r={FOAM_R[s]} />}
      {cfg.mint  && <Mint   yBase={MINT_Y[s]} />}
      {cfg.straw && <Straw  color={cfg.straw} y={STRAW_Y[s]} />}
      {cfg.salt  && <SaltRim r={0.68} />}
    </group>
  )
}

/* ═══════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════ */
export default function Cocktail3D({ nom }: { nom: string }) {
  return (
    <Canvas
      camera={{ position: [0.3, 0.8, 5.0], fov: 36 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 4]}   intensity={1.8} />
        <directionalLight position={[-3, 2, -3]} intensity={0.50} color="#b8ccff" />
        <pointLight      position={[0, 4, 2]}    intensity={0.80} color="#fff3d8" />

        <Scene nom={nom} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={2.2}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.76}
        />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
