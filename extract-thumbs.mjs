import { execFile } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { promisify } from 'node:util'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'

const execFileAsync = promisify(execFile)

const VIDEOS_DIR = 'public/妆练2.0'
const OUT_DIR = 'public/thumbs'
const COUNT = 12

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true })
}

async function extractThumb(n) {
  const input = path.join(VIDEOS_DIR, `妆练2.0-${n}.mp4`)
  const output = path.join(OUT_DIR, `thumb-${n}.jpg`)
  if (!existsSync(input)) {
    console.log(`[skip] ${input} not found`)
    return
  }
  try {
    await execFileAsync(ffmpegPath, [
      '-i', input,
      '-ss', '00:00:02',
      '-vframes', '1',
      '-vf', 'scale=480:-1',
      '-q:v', '2',
      output,
    ], { timeout: 15000 })
    console.log(`[done] ${output}`)
  } catch (e) {
    console.error(`[fail] ${input}:`, e.message)
  }
}

console.log(`Extracting thumbnails with ffmpeg from: ${ffmpegPath}`)
for (let i = 1; i <= COUNT; i++) {
  await extractThumb(i)
}
console.log('All done.')
