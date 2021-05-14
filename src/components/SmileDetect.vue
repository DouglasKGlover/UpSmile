<template>
  <div>
    <video id="inputVideo" autoplay muted></video>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  data() {
    return {
      trackingAllowed: true,
      smiling: false,
      lookingLeft: false,
      lookingRight: false,
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

      if (!detectionsWithExpressions.length) {
        return;
      }

      const nosePosition =
        detectionsWithExpressions[0].landmarks.relativePositions[30].x;
      this.lookingLeft = nosePosition >= 0.65;
      this.lookingRight = nosePosition <= 0.35;

      this.smiling = detectionsWithExpressions[0].expressions.happy > 0.7;
    },
  },
  mounted() {
    this.loadVideo();
    setInterval(() => {
      this.detectFace();
    }, 200);
  },
  watch: {
    smiling() {
      if (this.smiling) {
        this.$emit("smiling");
      }
    },
    lookingLeft() {
      if (this.lookingLeft) {
        this.$emit("looking-left");
      }
    },
    lookingRight() {
      if (this.lookingRight) {
        this.$emit("looking-right");
      }
    },
  },
};
</script>

<style>
body {
  font-family: arial;
}

video {
  border: 5px solid transparent;
}
video.smiling {
  border: 5px solid rgb(0, 221, 0);
}
</style>
