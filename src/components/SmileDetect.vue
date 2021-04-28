<template>
  <div>
    <h2>Smile detect</h2>
    <img src="/smiling-test-1.jpg" alt="stock photo" id="test-human" />
    <img src="/test_tree.png" alt="stock photo" id="test-tree" />
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  methods: {
    async initDetection() {
      const MODEL_URL = "/models";
      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceExpressionModel(MODEL_URL);
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL);

      const detectionsWithExpressions = await faceapi
        .detectAllFaces(["test-human"], new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detectionsWithExpressions[0].expressions);
    },
  },
  mounted() {
    this.initDetection();
  },
};
</script>

<style></style>
