# huangxiyuan.net 发布与恢复

## 旧站备份

- 仓库：https://github.com/hxy940219220-collab/huangxiyuan-website
- 备份分支：`codex/backup-before-aigc-2026-10-18`
- 旧站提交：`4e15a02e39461e94841d978915e77331168186cb`
- 旧站 Vercel 部署：https://vercel.com/hxy940219220-2880s-projects/huangxiyuan-website/B7N8NCdMevXBu4b18v7EaoxbGhu3
- 域名：`huangxiyuan.net`，跳转到 `www.huangxiyuan.net`

旧站源码、静态素材和原部署配置完整保留在备份分支。不要删除该分支。

## AIGC 网站

`index.html` 与 `assets/` 是网站源文件。执行 `node scripts/build.mjs`，只将页面和媒体复制到 `dist/`；Vercel 配置使用 Other 框架，无依赖安装。

原站和当前 AIGC 网站的源码都保留在 Git 历史。若要恢复旧站，优先在 Vercel 将上述旧部署设为生产版本；也可以从备份分支恢复全部文件并重新部署。

本文件记录发布准备及恢复路径，是否已上线以 Vercel 部署状态和域名实际返回为准。
