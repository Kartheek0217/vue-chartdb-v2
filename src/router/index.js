import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '@/views/EditorView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'editor', component: EditorView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
