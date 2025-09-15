import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '@/views/EditorView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'editor', component: EditorView },
    { path: '/examples', name: 'examples', component: () => import('@/views/ExamplesView.vue') },
    { path: '/templates', name: 'templates', component: () => import('@/views/TemplatesView.vue') },
  ],
})

export default router
