/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 后端根 URL，不设则仅用前端静态 steps.ts */
  readonly VITE_API_BASE_URL?: string
  /** 默认 1；执行种子脚本后首课一般为 1 */
  readonly VITE_LESSON_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
