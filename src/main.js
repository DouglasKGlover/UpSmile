// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("SmileDetect", () => import("@/components/SmileDetect.vue"));
  Vue.component("News", () => import("@/components/News.vue"));
  Vue.component("SmileDisplay", () => import("@/components/SmileDisplay.vue"));
}
