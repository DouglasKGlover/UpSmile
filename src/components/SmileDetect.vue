<template>
  <section id="webcam">
    <video
      id="inputVideo"
      autoplay
      muted
      :class="{
        smiling: smiling,
        'looking-left': lookingLeft,
        'looking-right': lookingRight,
      }"
    ></video>
    <p>Smile Counter: {{ smileCounter }}</p>
  </section>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  data() {
    return {
      trackingAllowed: true,
      smiling: false,
      smileCounter: 0,
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
      this.lookingLeft = nosePosition <= 0.35;
      this.lookingRight = nosePosition >= 0.65;

      this.smiling = detectionsWithExpressions[0].expressions.happy > 0.7;
    },
  },
  mounted() {
    this.loadVideo();
    setInterval(() => {
      this.detectFace();
    }, 550);
  },
  watch: {
    smiling() {
      if (this.smiling) {
        this.smileCounter++;
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

<style scoped>
#webcam {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
}

video {
  width: 100px;
  border: 5px solid black;
  transform: scaleX(-1);
}
video.smiling {
  border-bottom: 5px solid rgb(0, 255, 0);
}
video.looking-left {
  border-left: 5px solid rgb(0, 255, 0);
}
video.looking-right {
  border-right: 5px solid rgb(0, 255, 0);
}

p {
  font-size: 0.8em;
  margin: 0;
  text-align: center;
}
</style>
