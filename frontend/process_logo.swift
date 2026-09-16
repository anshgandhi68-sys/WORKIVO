import Foundation
import CoreGraphics
import AppKit

let inputPath = "/Users/anshgandhi/.gemini/antigravity-ide/brain/f1afbeba-b5f6-4f2f-a17c-d1688d59e24c/.user_uploaded/media_1789028318113.png"
guard let image = NSImage(contentsOfFile: inputPath),
      let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff) else {
    print("Error reading image")
    exit(1)
}

let width = bitmap.pixelsWide
let height = bitmap.pixelsHigh

// Background color in RGB (approx 90, 0, 140 / #5a008c)
let bgR: CGFloat = 0.3529
let bgG: CGFloat = 0.0
let bgB: CGFloat = 0.5490

// 1. Create a transparent version of the entire image by chroma-keying the purple background
guard let transRep = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: width,
    pixelsHigh: height,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .calibratedRGB,
    bytesPerRow: width * 4,
    bitsPerPixel: 32
) else {
    print("Error creating transparent rep")
    exit(1)
}

for y in 0..<height {
    for x in 0..<width {
        guard let c = bitmap.colorAt(x: x, y: y) else { continue }
        let r = c.redComponent
        let g = c.greenComponent
        let b = c.blueComponent
        
        // Euclidean distance in RGB to background
        let dist = sqrt(pow(r - bgR, 2) + pow(g - bgG, 2) + pow(b - bgB, 2))
        
        if dist < 0.12 {
            // Completely background
            transRep.setColor(NSColor(red: 0, green: 0, blue: 0, alpha: 0), atX: x, y: y)
        } else if dist < 0.25 {
            // Anti-aliased transition edge
            let alpha = (dist - 0.12) / (0.25 - 0.12)
            transRep.setColor(NSColor(red: r, green: g, blue: b, alpha: alpha), atX: x, y: y)
        } else {
            // Solid foreground
            transRep.setColor(NSColor(red: r, green: g, blue: b, alpha: 1.0), atX: x, y: y)
        }
    }
}

// Helper to save rect to PNG
func saveCrop(from rep: NSBitmapImageRep, rect: CGRect, to path: String) {
    guard let cgImage = rep.cgImage?.cropping(to: rect) else {
        print("Crop failed for \(path)")
        return
    }
    let newRep = NSBitmapImageRep(cgImage: cgImage)
    if let pngData = newRep.representation(using: .png, properties: [:]) {
        try? pngData.write(to: URL(fileURLWithPath: path))
        print("Saved: \(path) (\(Int(rect.width))x\(Int(rect.height)))")
    }
}

// In NSBitmapImageRep, y=0 is top
// Full logo rect (tight with small padding)
let fullLogoRect = CGRect(x: 215, y: 265, width: 590, height: 185)
saveCrop(from: bitmap, rect: fullLogoRect, to: "/Users/anshgandhi/WORKIVO/frontend/public/workivo-logo-purple.png")
saveCrop(from: transRep, rect: fullLogoRect, to: "/Users/anshgandhi/WORKIVO/frontend/public/workivo-logo-transparent.png")

// Find the balloon icon bounds inside WORKIVO
// The balloon icon is roughly between x=325 and x=420, y=270 and y=390
var iconMinX = 420, iconMaxX = 325, iconMinY = 390, iconMaxY = 270
for y in 270...390 {
    for x in 325...420 {
        if let c = transRep.colorAt(x: x, y: y), c.alphaComponent > 0.3 {
            iconMinX = min(iconMinX, x)
            iconMaxX = max(iconMaxX, x)
            iconMinY = min(iconMinY, y)
            iconMaxY = max(iconMaxY, y)
        }
    }
}
print("Balloon icon bounds: [\(iconMinX), \(iconMinY)] to [\(iconMaxX), \(iconMaxY)]")

let iconPad = 4
let iconRect = CGRect(
    x: iconMinX - iconPad,
    y: iconMinY - iconPad,
    width: (iconMaxX - iconMinX) + iconPad * 2,
    height: (iconMaxY - iconMinY) + iconPad * 2
)

saveCrop(from: bitmap, rect: iconRect, to: "/Users/anshgandhi/WORKIVO/frontend/public/workivo-icon-purple.png")
saveCrop(from: transRep, rect: iconRect, to: "/Users/anshgandhi/WORKIVO/frontend/public/workivo-icon-white.png")

// Also create a version of the icon colored with primary purple #5415A0 for light backgrounds
let purpleIconRep = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: Int(iconRect.width),
    pixelsHigh: Int(iconRect.height),
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .calibratedRGB,
    bytesPerRow: Int(iconRect.width) * 4,
    bitsPerPixel: 32
)!

for y in 0..<Int(iconRect.height) {
    for x in 0..<Int(iconRect.width) {
        let srcX = Int(iconRect.origin.x) + x
        let srcY = Int(iconRect.origin.y) + y
        if let c = transRep.colorAt(x: srcX, y: srcY) {
            let alpha = c.alphaComponent
            // Apply brand purple #5415A0 (R: 0.329, G: 0.082, B: 0.627)
            purpleIconRep.setColor(NSColor(red: 0.329, green: 0.082, blue: 0.627, alpha: alpha), atX: x, y: y)
        }
    }
}

if let pngData = purpleIconRep.representation(using: .png, properties: [:]) {
    try? pngData.write(to: URL(fileURLWithPath: "/Users/anshgandhi/WORKIVO/frontend/public/workivo-icon-purple-fill.png"))
    print("Saved purple fill icon")
}

print("Logo processing completed successfully!")
