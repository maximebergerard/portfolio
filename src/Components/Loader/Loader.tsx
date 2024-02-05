import { Html } from "@react-three/drei"
import "./Loader.css"

// interface ProgressBarProps {
//   progress: number
// }

// const progressBar = ({ progress }: ProgressBarProps) => {
//   const canvas = document.createElement("canvas")
//   const ctx = canvas.getContext("2d")

//   canvas.width = 800
//   canvas.height = 40

//   const totalWidth = canvas.width
//   const totalHeight = canvas.height

//   const cornerRadius = 20 // Adjust the corner radius

//   if (!ctx) return canvas
//   ctx.fillStyle = "#a88cf5"
//   ctx.fillRect(0, 0, canvas.width, canvas.height)

//   // Draw the background bar
//   ctx.fillStyle = "#a88cf5"
//   roundRect(ctx, 0, 0, totalWidth, totalHeight, cornerRadius)
//   ctx.fill()

//   // Draw the filled portion of the bar
//   const filledWidth = (progress / 100) * totalWidth
//   ctx.fillStyle = "#ffffff"
//   roundRect(ctx, 0, 0, filledWidth, totalHeight, cornerRadius)
//   ctx.fill()
//   return canvas
// }

// function roundRect(
//   context: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   width: number,
//   height: number,
//   radius: number,
// ) {
//   context.beginPath()
//   context.moveTo(x + radius, y)
//   context.lineTo(x + width - radius, y)
//   context.arcTo(x + width, y, x + width, y + radius, radius)
//   context.lineTo(x + width, y + height - radius)
//   context.arcTo(x + width, y + height, x + width - radius, y + height, radius)
//   context.lineTo(x + radius, y + height)
//   context.arcTo(x, y + height, x, y + height - radius, radius)
//   context.lineTo(x, y + radius)
//   context.arcTo(x, y, x + radius, y, radius)
//   context.closePath()
// }

const Loader = () => {
  // const { progress } = useProgress()
  // const texture = new THREE.CanvasTexture(progressBar({ progress }))
  const firstLine = "INTERACT"
  const secondLine = "WITH THE"
  const thirdLine = "SCENE"

  return (
    <>
      {/* <Html
        center
        style={{
          color: "#1B1B5A",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        position={[0, 1.2, 0]}
      >
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          Chargement à {Math.round(50)}%
        </p>
      </Html> */}
      {/* <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[4, 0.2, 10]} />
        <meshBasicMaterial map={texture} />
      </mesh> */}
      {/* <Html
        center
        className="title"
        style={{
          color: "#FFFFFF",
        }}
        position={[0.14, 0.14, 0]}
      >
        {text.split("").map((letter, index) => (
          <span key={index} className="wave-letter">
            {letter}
          </span>
        ))}
      </Html> */}
      <Html center className="title">
        <div className="line-container">
          <div
            className="wave-container"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            {firstLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{ color: "#FFFFFF" }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="wave-container">
            {firstLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{
                  color: "#1B1B5A",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="line-container">
          <div
            className="wave-container"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            {secondLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{ color: "#FFFFFF" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
          <div className="wave-container">
            {secondLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{
                  color: "#1B1B5A",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>
        <div className="line-container">
          <div
            className="wave-container"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            {thirdLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{ color: "#FFFFFF" }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="wave-container">
            {thirdLine.split("").map((letter, index) => (
              <span
                key={index}
                className="wave-letter"
                style={{
                  color: "#1B1B5A",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </>
  )
}

export default Loader
