import { execFileSync } from 'child_process'
import { statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs'
import path from 'path'
import ffmpeg from 'ffmpeg-static'

const OUT = path.resolve('src/imports/reels')
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

// Source order maps to the reel order on the page.
const jobs = [
  { src: '1st.mp4', id: 'DP1HOi1gV5u', title: 'FPV Flight Shoot' },
  { src: '2nd.mp4', id: 'DL1gZxruAuW', title: 'Brand Presenter' },
  { src: '3rd.mp4', id: 'DKbq4CTBITl', title: 'City Aerial Shoot' },
  { src: '4th.mp4', id: 'DKJkYa-MA3o', title: 'Behind The Scenes' },
  { src: '5th.mp4', id: 'DIGzp7kBxAX', title: 'Drone Unboxing' },
]

const mb = (p) => (statSync(p).size / 1048576).toFixed(1)

for (const job of jobs) {
  if (!existsSync(job.src)) {
    console.log(`SKIP ${job.src} — not found`)
    continue
  }

  const video = path.join(OUT, `${job.id}.mp4`)
  const poster = path.join(OUT, `${job.id}.jpg`)
  const before = mb(job.src)

  // Audio is KEPT: the card previews play muted, but the expanded player needs
  // sound. Instagram already compresses hard, so a re-encode can come out
  // LARGER than the source — encode to a temp file, then keep whichever wins.
  const tmp = path.join(OUT, `${job.id}.tmp.mp4`)
  execFileSync(ffmpeg, [
    '-y', '-i', job.src,
    '-vf', 'scale=720:-2',
    '-c:v', 'libx264', '-crf', '32', '-preset', 'medium',
    '-c:a', 'aac', '-b:a', '96k',
    '-movflags', '+faststart',
    tmp,
  ], { stdio: 'pipe' })

  if (statSync(tmp).size < statSync(job.src).size) {
    renameSync(tmp, video)
  } else {
    // Source wins on size — remux untouched, both streams copied.
    execFileSync(ffmpeg, [
      '-y', '-i', job.src,
      '-c', 'copy',
      '-movflags', '+faststart',
      video,
    ], { stdio: 'pipe' })
    unlinkSync(tmp)
  }

  // Grab a cover frame ~1s in (frame 0 is often black).
  execFileSync(ffmpeg, [
    '-y', '-ss', '1', '-i', job.src,
    '-frames:v', '1',
    '-vf', 'scale=720:-2',
    '-q:v', '4',
    poster,
  ], { stdio: 'pipe' })

  console.log(
    `${job.title.padEnd(20)} ${before}MB -> ${mb(video)}MB  +poster ${mb(poster)}MB  (${job.id})`
  )
}
