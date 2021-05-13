<template>
  <div>
    <h2>Smile for the camera</h2>
    <video id="inputVideo" autoplay muted :class="{ smiling: smiling }"></video>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  data() {
    return {
      trackingAllowed: true,
      smiling: false,
    };
  },
  methods: {
    loadVideo() {
      const videoEl = document.getElementById("inputVideo");
      navigator.getUserMedia(
        { video: {} },
        (stream) => (videoEl.srcObject = stream),
        (err) => console.error(err)
      );
    },
    async detectFace() {
      const videoEl = document.getElementById("inputVideo");
      const MODEL_URL = "/models";

      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceExpressionModel(MODEL_URL);
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL);

      const detectionsWithExpressions = await faceapi
        .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      this.smiling = detectionsWithExpressions[0].expressions.happy > 0.7;
    },
  },
  mounted() {
    this.loadVideo();
    setInterval(() => {
      this.detectFace();
    }, 100);
  },
};
</script>

<style>
video {
  border: 5px solid transparent;
}
video.smiling {
  border: 5px solid rgb(0, 221, 0);
}
</style>
