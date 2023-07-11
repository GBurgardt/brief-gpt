



const axios = require("axios");
const { EventEmitter } = require("events");
const segmentDuration = 300;
const GPT_MODEL = "gpt-3.5-turbo-16k";
const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

const audioPath = "audio.mp3";
const progress = new EventEmitter();

const FormDataNew = require("form-data");

async function downloadAudio(url) {
  return new Promise((resolve, reject) => {
    console.log("Iniciando descarga del audio de YouTube...");
    ytdl(url, { filter: "audioonly" })
      .on("error", reject)
      .pipe(fs.createWriteStream(audioPath))
      .on("finish", resolve);
  });
}


function processAudioSegment(segmentPath, start) {
  return new Promise((resolve, reject) => {
    console.log(`Procesando el segmento desde el segundo ${start}...`);
    ffmpeg(audioPath)
      .setStartTime(start)
      .setDuration(segmentDuration)
      .output(segmentPath)
      .on("end", () => resolve(segmentPath))
      .on("error", reject)
      .run();
  });
}

async function getAudioMetadata() {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(audioPath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration);
    });
  });
}


async function generateSummary(prompt, transcription) {
  console.log("process.env.OPENAI_API_KEY", process.env.OPENAI_API_KEY);

  const payload = {
    model: GPT_MODEL,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: transcription,
      },
    ],
  };
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    config
  );

  progress.emit("progress", {
    stage: "summaryGenerated",
    data: response.data["choices"][0]["message"]["content"],
  });

  return response.data["choices"][0]["message"]["content"];
}

async function generateHighlights(prompt, summaries) {
  const combinedSummaries = summaries
    .map(s => `Segmento ${s.segment}: ${s.summary}`)
    .join("\n\n");
  const payload = {
    model: GPT_MODEL,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: combinedSummaries,
      },
    ],
  };
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  };
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    config
  );
  return response.data["choices"][0]["message"]["content"];
}

function transcribeAudio(segmentPath) {
  // let data = new FormData();
  let data = new FormDataNew();
  data.append("file", fs.createReadStream(segmentPath));
  data.append("model", "whisper-1");
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      ...data.getHeaders(),
    },
  };
  return axios
    .post("https://api.openai.com/v1/audio/transcriptions", data, config)
    .then((response) => response.data.text)
    .finally(() => fs.unlink(segmentPath, console.error));
}


export async function processAudio(url) {
  await downloadAudio(url);
  const duration = await getAudioMetadata();
  const promises = [];

  for (let start = 0; start < duration; start += segmentDuration) {
    const segmentPath = `segment-${start}.mp3`;
    promises.push(
      processAudioSegment(segmentPath, start)
        .then(transcribeAudio)
        .catch(console.error)
    );
  }

  progress.emit("progress", { stage: "audioDownloaded", data: null });

  const transcriptions = await Promise.all(promises);

  progress.emit("progress", {
    stage: "audioTranscribed",
    data: transcriptions,
  });

  const promptSegment =
    "Toma la siguiente transcripción de video y destila las ideas más importantes en un lenguaje claro y conciso. Debe permitir entender el video tras una lectura rápida.";
  const summaries = [];

  for (let i = 0; i < transcriptions.length; i++) {
    const summary = await generateSummary(promptSegment, transcriptions[i]);
    summaries.push({ segment: i + 1, summary });
  }

  const promptHighlight =
    "A partir de los siguientes resúmenes, identifica y genera los cinco o seis puntos más importantes del video completo. Cada punto debe ser explicado en no más de cuatro a seis líneas.";

  const highlights = await generateHighlights(promptHighlight, summaries);
  console.log("Puntos destacados del video:", highlights);

  return { transcriptions, summaries, highlights };
}
