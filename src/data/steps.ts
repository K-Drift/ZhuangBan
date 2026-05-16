/** 教程元信息：与妆伴 Demo 对齐 */
export const lessonMeta = {
  title: '姜乘澜日常全妆｜自然漂亮妆',
  sourceLabel: '抖音精选 · 真人美妆视频',
  durationLabel: '约 14 分钟',
  roughPracticeMinutes: '约 20 分钟',
  coverGradient: 'linear-gradient(135deg,#ffe4e6,#fff,#ffedd5)',
} as const

/** UI 展示的跟练步骤总数 */
export const TOTAL_STEPS = 11

/**
 * 视频文件统一放在 `public/videos/` 下，命名格式：
 * - 主线：`{序号}_{步骤名}.mp4`（如 `01_prep.mp4`）
 * - 分支：`{序号}_{步骤名}_{分支}.mp4`（如 `01_prep_dry.mp4`）
 */
export const STEP_VIDEO_FILES_COUNT = 35

const V = '/videos'

function clip(file: string) {
  return `${V}/${file}`
}

function thumb(file: string) {
  return `/thumbs/${file}`
}

/** 分支选项 */
export interface StepBranch {
  id: string
  label: string
  /** 对该选项的通俗解释 */
  meaning: string
  /** 选中后播放的视频切片（相对路径） */
  clip: string
  /** 选中后的 AI 指引文案 */
  guide: string
}

/** 评论区课代表产品 */
export interface CommentProduct {
  category: string
  name: string
  note: string
}

export interface LessonStep {
  id: string
  /** 1–11 */
  order: number
  /** 列表 / 播放器主标题 */
  title: string
  /** 副信息：目标一句话 */
  goal: string
  /** 粗估单次片段时长占位 */
  estimate: string
  videoSrc: string
  posterSrc?: string
  /** 跟练卡片：简短占位，可替换为脚本 */
  tip: string
  /** 有声循环片段旁的说明文案 */
  loopHint: string
  /** 本步骤的详细说明 */
  detail?: string
  /** 为什么这样做 */
  why?: string
  /** 常见错误 */
  mistake?: string
  /** 关联的课代表产品 key */
  productKey?: string
  /** 是否有当步分支选择 */
  branchTitle?: string
  branches?: StepBranch[]
  /** 步骤图标 */
  icon?: string
  /** 时间码（用于 UI 展示） */
  timeCode?: string
}

export const lessonSteps: LessonStep[] = [
  {
    id: 'intro',
    order: 1,
    title: '引言',
    goal: '建立本次全妆思路',
    estimate: '30s',
    videoSrc: clip('00_intro.mp4'),
    posterSrc: thumb('00_00_intro.jpg'),
    tip: '准备好镜子、粉扑、刷具和眼妆工具，再开始跟练。',
    loopHint: '了解全妆流程概览，建立跟练节奏。',
    detail: '先了解整套日常全妆的顺序：妆前、粉底、遮瑕、定妆、眼影、眼线、睫毛、眉毛、修容和唇妆。',
    why: '先建立全局步骤，跟练时不会被单个细节打断节奏。',
    mistake: '没有提前准备工具，跟练过程中频繁暂停，会影响节奏。',
    icon: '✨',
    timeCode: '00:00',
  },
  {
    id: 'prep',
    order: 2,
    title: '妆前',
    goal: '让底妆保湿、有粘性、延展好',
    estimate: '1 min',
    videoSrc: clip('01_prep.mp4'),
    posterSrc: thumb('01_01_prep.jpg'),
    tip: '少量上脸，优先处理需要服帖的位置。',
    loopHint: '观察妆前轻拍与服帖手法，小声循环更易跟上节奏。',
    detail: '妆前产品要保湿且有粘性，用量少、延展开，避免涂得面积太大。',
    why: '好的妆前状态能让后续粉底更贴、更薄，也减少斑驳。',
    mistake: '妆前涂太多、面积太大，会又薄又黏又贴，影响后续底妆。',
    productKey: 'prep',
    branchTitle: '这一步需要按肤质选择妆前处理',
    branches: [
      { id: 'dry', label: '干皮', meaning: '洗脸后容易紧绷、起皮，上粉底常卡粉', clip: clip('01_prep_dry.mp4'), guide: '干皮版：妆前重点补水保湿，少量多次按压，让底妆更贴。' },
      { id: 'oily', label: '油皮', meaning: '额头、鼻子容易出油，底妆容易暗沉脱妆', clip: clip('01_prep_oily.mp4'), guide: '油皮版：妆前减少厚重保湿，T 区先控油，避免后续泛油。' },
      { id: 'mixed', label: '混合皮', meaning: 'T 区出油，但脸颊偏干或容易卡粉', clip: clip('01_prep_mixed.mp4'), guide: '混合皮版：T 区轻控油，脸颊保湿，分区处理更稳。' },
    ],
    icon: '✨',
    timeCode: '00:31',
  },
  {
    id: 'foundation',
    order: 3,
    title: '粉底',
    goal: '面中均匀、边缘轻薄',
    estimate: '1.5 min',
    videoSrc: clip('02_foundation.mp4'),
    posterSrc: thumb('02_02_foundation.jpg'),
    tip: '先铺面中，再用余量带到脸侧和边缘。',
    loopHint: '注意粉扑/美妆蛋的轻拍方向与力度，小声循环校对节奏。',
    detail: '粉底要少量多次，面中大块区域可以厚一点，细节转折处薄一点，脸的边际保持轻薄。',
    why: '面中干净能提升整体气色，边缘轻薄会让底妆更自然。',
    mistake: '全脸同样厚度，容易假面；边缘太厚会不自然。',
    productKey: 'foundation',
    branchTitle: '这一步需要按肤质选择粉底上法',
    branches: [
      { id: 'dry', label: '干皮', meaning: '上粉后容易显纹、起皮，脸颊常觉得干', clip: clip('02_foundation_dry.mp4'), guide: '干皮版：粉底薄铺，重点用按压方式让粉底贴合，少摩擦。' },
      { id: 'oily', label: '油皮', meaning: '出门几小时后全脸或 T 区明显泛油光', clip: clip('02_foundation_oily.mp4'), guide: '油皮版：面中薄铺，出油区域不要叠太厚，后续靠定妆维持。' },
      { id: 'mixed', label: '混合皮', meaning: '鼻子额头出油，脸颊却不太出油或偏干', clip: clip('02_foundation_mixed.mp4'), guide: '混合皮版：T 区薄一些，脸颊按压贴合，分区控制粉量。' },
    ],
    icon: '🪄',
    timeCode: '01:31',
  },
  {
    id: 'concealer',
    order: 4,
    title: '遮瑕',
    goal: '处理局部瑕疵，保持底妆轻薄',
    estimate: '1 min',
    videoSrc: clip('03_concealer.mp4'),
    posterSrc: thumb('03_03_concealer.jpg'),
    tip: '先少量点涂，再用小刷子或指腹轻拍边缘。',
    loopHint: '遮瑕少量多次，局部点涂后轻拍边缘过渡。',
    detail: '遮瑕后续再展开讲，这里先只处理明显瑕疵，不要大面积覆盖。',
    why: '遮瑕是局部修饰，不应该替代粉底大面积使用。',
    mistake: '遮瑕范围过大，会让底妆变厚、变干。',
    productKey: 'concealer',
    icon: '🖌️',
    timeCode: '02:49',
  },
  {
    id: 'setting',
    order: 5,
    title: '定妆',
    goal: '控油、保留面部高光点',
    estimate: '1 min',
    videoSrc: clip('04_setting.mp4'),
    posterSrc: thumb('04_04_setting.jpg'),
    tip: '出油和易移位区域重点定，面部高光处保留清透。',
    loopHint: '跟练时注意粉扑按压与定妆喷雾距离，小声循环可帮助对齐。',
    detail: '定妆注意出油多、有沟壑纹路、遮瑕、眉毛、脸周、唇周等部位，同时保留面部高光点。',
    why: '局部定妆能让妆面更持久，同时避免全脸变哑光、失去立体感。',
    mistake: '全脸重压散粉，会显干、显纹，还会压掉自然光泽。',
    productKey: 'setting',
    branchTitle: '这一步需要按肤质选择定妆范围',
    branches: [
      { id: 'dry', label: '干皮', meaning: '上粉后容易显纹、起皮，脸颊常觉得干', clip: clip('04_setting_dry.mp4'), guide: '干皮版：只在眼下、鼻翼、唇周等容易移位处少量定妆，保留脸颊光泽。' },
      { id: 'oily', label: '油皮', meaning: '出门几小时后全脸或 T 区明显泛油光', clip: clip('04_setting_oily.mp4'), guide: '油皮版：T 区、鼻翼、额头和唇周重点定妆，但粉量分次轻压。' },
      { id: 'mixed', label: '混合皮', meaning: '鼻子额头出油，脸颊却不太出油或偏干', clip: clip('04_setting_mixed.mp4'), guide: '混合皮版：T 区重点定妆，脸颊只用余粉轻扫。' },
    ],
    icon: '⭐',
    timeCode: '02:55',
  },
  {
    id: 'eyeshadow',
    order: 6,
    title: '眼影',
    goal: '珠光打底、哑光晕染、下眼影修容连接',
    estimate: '1.5 min',
    videoSrc: clip('05_eyeshadow.mp4'),
    posterSrc: thumb('05_05_eyeshadow.jpg'),
    tip: '哑光色少量多次，边缘一定要晕开。',
    loopHint: '有声短片段只保留上色与晕染关键点，便于像动图一样循环。',
    detail: '先用珠光色打底，再用哑光色晕染，下眼影用修容色整体带一下。',
    why: '珠光增加清透感，哑光控制轮廓，下眼影连接能让眼妆更完整。',
    mistake: '珠光面积过大或哑光过重，会显肿或显脏。',
    productKey: 'eyeshadow',
    branchTitle: '这一步需要按眼型选择眼影画法',
    branches: [
      { id: 'puffy', label: '肿眼泡', meaning: '上眼皮肉感明显，眼窝不深，眼影容易显肿', clip: clip('05_eyeshadow_puffy.mp4'), guide: '肿眼泡版：珠光只放在眼中小范围，哑光消肿范围更重要。' },
      { id: 'double', label: '双眼皮', meaning: '睁眼时能看到清晰双眼皮褶皱和眼皮空间', clip: clip('05_eyeshadow_double.mp4'), guide: '双眼皮版：沿褶皱和眼尾加深，保留珠光打底的清透感。' },
      { id: 'inner', label: '内双', meaning: '闭眼有褶皱，睁眼后褶皱被眼皮遮住一部分', clip: clip('05_eyeshadow_inner.mp4'), guide: '内双版：颜色集中在睁眼可见范围内，下眼影用修容色轻带。' },
    ],
    icon: '👁️',
    timeCode: '04:05',
  },
  {
    id: 'eyeliner',
    order: 7,
    title: '眼线',
    goal: '用深色眼影配合眼线刷画稳定眼线',
    estimate: '1.5 min',
    videoSrc: clip('06_eyeliner.mp4'),
    posterSrc: thumb('06_06_eyeliner.jpg'),
    tip: '眼尾少量拉出，先短后长，慢慢加深。',
    loopHint: '循环播放时注意支撑手与笔尖角度，小声示范方便模仿。',
    detail: '用黑色或深棕色哑光眼影配合眼线刷画眼线，注意线条平稳，可在草稿基础上用眼线膏加深。',
    why: '先用眼影打草稿更适合新手，容错率高，后续再加深更自然。',
    mistake: '一次拉太长、线条不稳或两边角度不一致。',
    productKey: 'eyeliner',
    branchTitle: '这一步需要按眼型选择眼线画法',
    branches: [
      { id: 'puffy', label: '肿眼泡', meaning: '上眼皮厚重，画粗眼线容易被压住或显脏', clip: clip('06_eyeliner_puffy.mp4'), guide: '肿眼泡版：眼线贴近根部，眼尾轻微拉长，避免画粗。' },
      { id: 'double', label: '双眼皮', meaning: '眼皮褶皱清楚，眼线睁眼后仍能露出', clip: clip('06_eyeliner_double.mp4'), guide: '双眼皮版：中后段线条可以略明显，眼尾顺着眼型拉出。' },
      { id: 'inner', label: '内双', meaning: '睁眼后眼线容易被眼皮吃掉或变成粗黑线', clip: clip('06_eyeliner_inner.mp4'), guide: '内双版：重点加深睫毛根部，不要画成一整条粗黑线。' },
    ],
    icon: '👁️',
    timeCode: '05:36',
  },
  {
    id: 'lash',
    order: 8,
    title: '睫毛',
    goal: '根部量多、尾部渐少',
    estimate: '1.5 min',
    videoSrc: clip('07_lash.mp4'),
    posterSrc: thumb('07_07_lash.jpg'),
    tip: '先蹭掉多余膏体，再从根部向外处理。',
    loopHint: '有声短片段强调夹翘节奏，可多遍循环校对手腕角度。',
    detail: '夹睫毛时贴近根部，第一下重一点，越往稍部力度越轻；睫毛打底根部量多、梢部渐少。',
    why: '根部量足能让眼神更有支撑，尾部轻可以减少结块。',
    mistake: '整根刷得同样厚，会结块或显得沉重。',
    productKey: 'lash',
    icon: '⭐',
    timeCode: '07:19',
  },
  {
    id: 'brow',
    order: 9,
    title: '眉毛',
    goal: '颜色由深至浅，用螺旋刷过渡',
    estimate: '1.5 min',
    videoSrc: clip('08_brow.mp4'),
    posterSrc: thumb('08_08_brow.jpg'),
    tip: '眉头最淡，眉尾相对清晰，最后用螺旋刷扫开。',
    loopHint: '小声讲解 + 单笔走向循环，可帮助掌握毛流感。',
    detail: '眉毛颜色由深至浅：眉中、眉底、眉尾、眉上缘、眉头，用螺旋刷均匀过渡。',
    why: '自然眉毛不是一整块同色，而是有浓淡变化和毛流过渡。',
    mistake: '眉头太重或整条眉毛同样深，会显凶、不自然。',
    productKey: 'brow',
    branchTitle: '这一步可以按眉毛状态选择画法',
    branches: [
      { id: 'sparse', label: '眉毛少', meaning: '眉毛空缺明显，需要补形和补色', clip: clip('08_brow_sparse.mp4'), guide: '眉毛少版：先定眉尾和眉底，再用细线模拟毛流，最后刷开。' },
      { id: 'thick', label: '眉毛浓', meaning: '原生眉毛较多，只需要调整边缘和颜色', clip: clip('08_brow_thick.mp4'), guide: '眉毛浓版：少画颜色，重点修边和梳理毛流，避免变成色块。' },
      { id: 'flat', label: '眉形平', meaning: '眉峰不明显，整体缺少立体感', clip: clip('08_brow_flat.mp4'), guide: '眉形平版：轻微强调眉峰和眉尾，让眉毛更有精神。' },
    ],
    icon: '🖌️',
    timeCode: '08:51',
  },
  {
    id: 'contour',
    order: 10,
    title: '修容',
    goal: '刷毛蓬松、取粉均匀，阴影高光打碎阻断',
    estimate: '2 min',
    videoSrc: clip('09_contour.mp4'),
    posterSrc: thumb('09_09_contour.jpg'),
    tip: '少量取粉，先在手上或纸上匀开，再上脸。',
    loopHint: '有声短片段只保留结构与晕染关键路径，更易反复跟练。',
    detail: '修容要注意刷毛蓬松，取粉后匀一匀；阴影不连续，高光和阴影打碎阻断。',
    why: '修容最怕边界明显，打碎阻断能让立体感更自然。',
    mistake: '阴影一整条连续、颜色太深，会显脏。',
    productKey: 'contour',
    branchTitle: '这一步需要按脸型选择修容位置',
    branches: [
      { id: 'round', label: '圆脸', meaning: '脸部长度和宽度接近，脸颊圆润，下巴线条柔和', clip: clip('09_contour_round.mp4'), guide: '圆脸版：脸侧向内收，重点增加纵向轮廓，边缘要晕开。' },
      { id: 'long', label: '长脸', meaning: '脸长明显大于脸宽，中庭或下巴看起来偏长', clip: clip('09_contour_long.mp4'), guide: '长脸版：减少纵向修容，弱化过长比例，重心放在横向气色。' },
      { id: 'square', label: '方脸', meaning: '下颌角存在感强，脸部轮廓偏直、偏硬朗', clip: clip('09_contour_square.mp4'), guide: '方脸版：下颌角边缘柔和过渡，不要画出硬线条。' },
    ],
    icon: '🙂',
    timeCode: '10:38',
  },
  {
    id: 'lip',
    order: 11,
    title: '唇妆',
    goal: '和整体妆容保持色彩协调',
    estimate: '1 min',
    videoSrc: clip('10_lip.mp4'),
    posterSrc: thumb('10_10_lip.jpg'),
    tip: '先薄涂，再根据气色决定是否叠加。',
    loopHint: '有声短片段把腮红与唇部关键动作拆分循环，可按需快进快退。',
    detail: '选择和眼妆、腮红协调的唇色，薄涂后模糊边缘，保持日常自然感。',
    why: '唇妆决定整体气色和风格，颜色过重会抢走自然妆感。',
    mistake: '唇色太重或边缘太实，会让整体不够轻盈。',
    productKey: 'lip',
    branchTitle: '这一步需要按妆容风格选择唇色',
    branches: [
      { id: 'commute', label: '自然通勤', meaning: '适合上课上班，妆感轻、颜色低调不夸张', clip: clip('10_lip_commute.mp4'), guide: '自然通勤版：选择低饱和豆沙或奶茶色，薄涂后模糊边缘。' },
      { id: 'healthy', label: '显气色', meaning: '适合素颜气色弱，想看起来更元气精神', clip: clip('10_lip_healthy.mp4'), guide: '显气色版：唇色可以略提高饱和度，让气色更明显。' },
      { id: 'photo', label: '拍照感', meaning: '适合拍照或聚会，颜色更明显，镜头里不吃妆', clip: clip('10_lip_photo.mp4'), guide: '拍照感版：唇色和眼妆呼应，颜色可比日常略重一点。' },
    ],
    icon: '❤️',
    timeCode: '后段',
  },
]

/** 视频文件名 → 中文展示名映射（不暴露文件名给用户） */
export const clipTitleMap: Record<string, string> = {
  '00_intro.mp4': '全妆流程引言',
  '01_prep.mp4': '妆前基础示范',
  '01_prep_dry.mp4': '干皮妆前保湿示范',
  '01_prep_oily.mp4': '油皮妆前控油示范',
  '01_prep_mixed.mp4': '混合皮分区妆前示范',
  '02_foundation.mp4': '粉底少量多次示范',
  '02_foundation_dry.mp4': '干皮粉底轻拍示范',
  '02_foundation_oily.mp4': '油皮粉底薄铺示范',
  '02_foundation_mixed.mp4': '混合皮粉底分区示范',
  '03_concealer.mp4': '局部遮瑕示范',
  '04_setting.mp4': '局部定妆示范',
  '04_setting_dry.mp4': '干皮少量定妆示范',
  '04_setting_oily.mp4': '油皮重点定妆示范',
  '04_setting_mixed.mp4': '混合皮分区定妆示范',
  '05_eyeshadow.mp4': '眼影珠光打底示范',
  '05_eyeshadow_puffy.mp4': '肿眼泡消肿眼影示范',
  '05_eyeshadow_double.mp4': '双眼皮层次眼影示范',
  '05_eyeshadow_inner.mp4': '内双可见范围眼影示范',
  '06_eyeliner.mp4': '眼线草稿加深示范',
  '06_eyeliner_puffy.mp4': '肿眼泡贴根眼线示范',
  '06_eyeliner_double.mp4': '双眼皮自然延长眼线示范',
  '06_eyeliner_inner.mp4': '内双根部眼线示范',
  '07_lash.mp4': '睫毛夹翘与打底示范',
  '08_brow.mp4': '自然眉毛过渡示范',
  '08_brow_sparse.mp4': '眉毛少补形示范',
  '08_brow_thick.mp4': '眉毛浓梳理示范',
  '08_brow_flat.mp4': '平眉增强眉峰示范',
  '09_contour.mp4': '自然修容示范',
  '09_contour_round.mp4': '圆脸收窄修容示范',
  '09_contour_long.mp4': '长脸横向修容示范',
  '09_contour_square.mp4': '方脸柔化修容示范',
  '10_lip.mp4': '自然唇妆示范',
  '10_lip_commute.mp4': '自然通勤唇色示范',
  '10_lip_healthy.mp4': '显气色唇色示范',
  '10_lip_photo.mp4': '拍照感唇色示范',
}

/** 根据视频文件路径获取中文展示名 */
export function getClipTitle(videoSrc: string): string {
  const fileName = videoSrc.split('/').pop() ?? ''
  return clipTitleMap[fileName] ?? '当前真人示范片段'
}

/** 评论区课代表产品清单 */
export const commentProducts: Record<string, CommentProduct[]> = {
  prep: [
    { category: '工具', name: '花知晓 人鱼月光手持镜', note: '课代表参考价：￥59' },
    { category: '粉扑', name: '妖制粉扑', note: '课代表参考价：￥29.9' },
  ],
  foundation: [
    { category: '粉扑', name: '妖制粉扑', note: '用于粉底少量多次拍开，课代表参考价：￥29.9' },
    { category: '化妆刷', name: 'Wakemake 化妆刷', note: '课代表参考价：￥76' },
  ],
  concealer: [{ category: '遮瑕刷', name: '空山新雨遮瑕刷', note: '课代表参考价：￥16' }],
  setting: [{ category: '定妆工具', name: '粉扑 / 定妆刷', note: '按出油位置局部定妆，评论区建议少量多次' }],
  eyeshadow: [
    { category: '眼影', name: '酵色单色眼影', note: '课代表参考价：￥58' },
    { category: '眼影盘', name: '3CE 眼影 smooth', note: '课代表参考价：￥245' },
    { category: '眼影盘', name: 'Lunasol 日月晶采四色眼影 01', note: '课代表参考价：￥165' },
  ],
  eyeliner: [{ category: '眼影膏', name: '谜尚眼影膏', note: '用于配合眼线加深，课代表参考价：￥50' }],
  lash: [{ category: '睫毛夹', name: '资生堂睫毛夹', note: '课代表参考价：￥60' }],
  brow: [{ category: '眉部工具', name: '螺旋刷 / 眉笔', note: '章节要点：眉毛颜色由深至浅，用螺旋刷均匀过渡' }],
  contour: [
    { category: '修容', name: '3CE 修容', note: '课代表参考价：￥150' },
    { category: '修容刷', name: '白凤堂 G512', note: '课代表参考价：￥710' },
  ],
  lip: [{ category: '唇釉', name: '阿玛尼唇釉', note: '课代表参考价：￥400' }],
}
