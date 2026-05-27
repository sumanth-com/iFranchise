# Generates a production-ready favicon / PWA icon set from the existing `public/favicon.png`.
# Intentionally does not modify any UI/layout code.

param(
  [string]$SourcePng = "public\\favicon.png",
  [string]$OutDir = "public"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

function Resize-Png {
  param(
    [Parameter(Mandatory=$true)][string]$InputPng,
    [Parameter(Mandatory=$true)][string]$OutputPng,
    [Parameter(Mandatory=$true)][int]$Size
  )

  if (-not (Test-Path -LiteralPath $InputPng)) {
    throw "Input PNG not found: $InputPng"
  }

  $img = [System.Drawing.Image]::FromFile($InputPng)
  try {
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.Clear([System.Drawing.Color]::Transparent)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      $rect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
      $g.DrawImage($img, $rect)
    } finally {
      $g.Dispose()
    }

    $bmp.Save($OutputPng, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $img.Dispose()
  }
}

function Write-FaviconIco {
  param(
    [Parameter(Mandatory=$true)][string]$InputPng,
    [Parameter(Mandatory=$true)][string]$OutputIco,
    [Parameter(Mandatory=$true)][int]$Size
  )

  $img = [System.Drawing.Image]::FromFile($InputPng)
  try {
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.Clear([System.Drawing.Color]::Transparent)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      $rect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
      $g.DrawImage($img, $rect)
    } finally {
      $g.Dispose()
    }

    # Single-size ICO is acceptable for broad browser support.
    $bmp.Save($OutputIco, [System.Drawing.Imaging.ImageFormat]::Icon)
  } finally {
    $img.Dispose()
  }
}

$src = $SourcePng

if (-not (Test-Path -LiteralPath $OutDir)) {
  throw "Output directory not found: $OutDir"
}

Resize-Png -InputPng $src -OutputPng "$OutDir\\favicon-16x16.png" -Size 16
Resize-Png -InputPng $src -OutputPng "$OutDir\\favicon-32x32.png" -Size 32
Resize-Png -InputPng $src -OutputPng "$OutDir\\apple-touch-icon.png" -Size 180

Resize-Png -InputPng $src -OutputPng "$OutDir\\android-chrome-192x192.png" -Size 192
Resize-Png -InputPng $src -OutputPng "$OutDir\\android-chrome-512x512.png" -Size 512

Write-FaviconIco -InputPng $src -OutputIco "$OutDir\\favicon.ico" -Size 32

Write-Host "Favicons generated in $OutDir"

