export interface Font {
  name: string
  en: string
  family: string
  weight: string
  preview: string
  cat: string
  scenes: string[]
  license: 'OFL' | 'Apache'
  desc: string
}

export interface CategoryInfo {
  id: string
  name: string
  nameEn: string
  icon: string
  desc: string
  fonts: Font[]
}

export const FONT_CSS_BASE = 'https://miaoda.feishu.cn/fonts/css2'

/** 字样渲染必须带 fallback：中文字体 TTF 体积大，未到时不能留空白 */
export const withFallback = (family: string) =>
  `${family}, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif`
export const GOOGLE_FONTS_SPECIMEN = (en: string) =>
  `https://fonts.google.com/specimen/${en.replace(/\s+/g, '+')}`

export const categories: CategoryInfo[] = [
  {id: 'action', name: '动作片', nameEn: 'ACTION', icon: '🎬', desc: '高冲击力、力量感强的压缩粗体与超粗黑体，适合动作片预告片标题、打斗场景字幕。', fonts: [
    {name: 'Anton', en: 'Anton', family: 'Anton', weight: '400', preview: 'ACTION', cat: '压缩展示', scenes: ['动作片预告', '打斗场景', '极限运动', '体育赛事'], license: 'OFL', desc: '超压缩粗体无衬线，视觉冲击力极强，是动作片大标题的经典选择。'},
    {name: 'Bebas Neue', en: 'Bebas Neue', family: '"Bebas Neue"', weight: '400', preview: 'PUNCH', cat: '压缩大写', scenes: ['预告片标题', '拳击/格斗', '赛车电影', '热血青春'], license: 'OFL', desc: '优雅的压缩大写字体，比Anton更精致，预告片与运动类内容常用。'},
    {name: 'Oswald', en: 'Oswald', family: 'Oswald', weight: '600', preview: 'FIGHT', cat: '压缩无衬线', scenes: ['动作片字幕', '犯罪片', '独立电影', '标题设计'], license: 'OFL', desc: '优雅压缩无衬线，5档字重，比纯展示字体更易读，动作片字幕与标题通用。'},
    {name: 'Big Shoulders Display', en: 'Big Shoulders Display', family: '"Big Shoulders Display"', weight: '900', preview: 'IMPACT', cat: '超粗展示', scenes: ['超级英雄', '动作大片', '户外探险', '力量感标题'], license: 'OFL', desc: '芝加哥风格的超粗展示字体，字面宽大力量感十足，超级英雄与动作大片标题首选。'},
    {name: '站酷庆科黄油体', en: 'ZCOOL QingKe HuangYou', family: '"ZCOOL QingKe HuangYou"', weight: '400', preview: '破风而行', cat: '创意黑体', scenes: ['国产动作片', '赛车题材', '青春热血', '网大标题'], license: 'OFL', desc: '站酷出品免费商用，笔画圆润有力，年轻感强，国产动作片与青春热血题材常用。'},
    {name: 'Dela Gothic One', en: 'Dela Gothic One', family: '"Dela Gothic One"', weight: '400', preview: '爆裂', cat: '超粗日文黑', scenes: ['日系动作', '动漫热血', '格斗题材', '暴走族风格'], license: 'OFL', desc: '超粗日文哥特体，笔画极粗结构紧凑，日系动作动漫与格斗题材的标志性字体。'},
  ]},
  {id: 'romance', name: '爱情片', nameEn: 'ROMANCE', icon: '💕', desc: '优雅衬线与流畅手写体，传递浪漫温柔情绪，适合爱情片标题、情书场景、浪漫旁白。', fonts: [
    {name: 'Playfair Display', en: 'Playfair Display', family: '"Playfair Display"', weight: '700', preview: 'Amour', cat: '高对比衬线', scenes: ['浪漫喜剧', '文艺爱情', '婚纱电影', '法式情调'], license: 'OFL', desc: '高对比度优雅衬线，灵感来自18世纪欧洲，爱情片标题与文艺片海报经典字体。'},
    {name: 'Dancing Script', en: 'Dancing Script', family: '"Dancing Script"', weight: '700', preview: 'Forever', cat: '手写花体', scenes: ['情书场景', '婚礼片段', '浪漫旁白', '回忆杀'], license: 'OFL', desc: '流畅优雅的英文手写字体，笔画如舞蹈般灵动，情书与婚礼场景的标准字体。'},
    {name: 'Great Vibes', en: 'Great Vibes', family: '"Great Vibes"', weight: '400', preview: 'Darling', cat: '花体手写', scenes: ['古典爱情', '宫廷恋爱', '奢华婚礼', '文艺标题'], license: 'OFL', desc: '华丽的花体手写字体，优雅奢华，古典爱情片与宫廷恋爱题材的首选。'},
    {name: 'Allura', en: 'Allura', family: 'Allura', weight: '400', preview: 'Mon Amour', cat: '优雅手写', scenes: ['法式爱情', '浪漫喜剧', '文艺短片', '情书旁白'], license: 'OFL', desc: '干净优雅的手写字体，比Great Vibes更克制，法式爱情与文艺片常用。'},
    {name: 'Lora', en: 'Lora', family: 'Lora', weight: '500', preview: 'Eternal', cat: '人文衬线', scenes: ['爱情片正文', '文艺旁白', '书信场景', '日记片段'], license: 'OFL', desc: '人文主义衬线字体，笔画圆润温暖，适合爱情片的正文旁白与书信场景。'},
    {name: '站酷小薇', en: 'ZCOOL XiaoWei', family: '"ZCOOL XiaoWei"', weight: '400', preview: '心动瞬间', cat: '文艺衬线', scenes: ['国产爱情片', '青春恋爱', '文艺短片', '小清新标题'], license: 'OFL', desc: '站酷出品免费商用，优雅衬线带装饰细节，国产爱情片与小清新文艺片常用。'},
  ]},
  {id: 'scifi', name: '科幻片', nameEn: 'SCI-FI', icon: '🚀', desc: '几何无衬线与等宽终端字体，传递未来科技感，适合科幻片片头、HUD界面、太空题材。', fonts: [
    {name: 'Orbitron', en: 'Orbitron', family: 'Orbitron', weight: '700', preview: 'NEXUS', cat: '几何未来', scenes: ['科幻片头', 'HUD界面', '赛博朋克', '太空题材'], license: 'OFL', desc: '专为未来科技设计的几何无衬线，灵感来自科幻电影显示界面，科幻片片头与HUD标准字体。'},
    {name: 'Audiowide', en: 'Audiowide', family: 'Audiowide', weight: '400', preview: 'CYBER', cat: '宽体科技', scenes: ['电子科幻', '赛博朋克', '游戏UI', '科技广告'], license: 'OFL', desc: '宽体科技感字体，笔画带独特电子风格，赛博朋克与电子科幻题材常用。'},
    {name: 'Share Tech Mono', en: 'Share Tech Mono', family: '"Share Tech Mono"', weight: '400', preview: 'SYSTEM//OK', cat: '终端等宽', scenes: ['电脑界面', '黑客场景', '终端显示', '复古科技'], license: 'OFL', desc: '等宽终端字体，模拟老式计算机显示，黑客电影与代码界面场景的经典选择。'},
    {name: 'Exo 2', en: 'Exo 2', family: '"Exo 2"', weight: '600', preview: 'FUTURE', cat: '几何无衬线', scenes: ['科幻纪录片', '太空探索', '科技品牌', '未来题材'], license: 'OFL', desc: '几何无衬线字体，科技感与可读性平衡，科幻纪录片与太空探索题材常用。'},
    {name: 'Rajdhani', en: 'Rajdhani', family: 'Rajdhani', weight: '600', preview: 'ORBIT', cat: '科技压缩', scenes: ['科幻动作', '游戏界面', '数据显示', '科技包装'], license: 'OFL', desc: '半压缩科技感无衬线，5档字重，科幻动作片与游戏UI界面常用。'},
    {name: 'Titillium Web', en: 'Titillium Web', family: '"Titillium Web"', weight: '600', preview: 'QUANTUM', cat: '现代科技', scenes: ['硬科幻', '科研题材', '科技纪录片', 'UI界面'], license: 'OFL', desc: '现代科技感无衬线，由意大利设计学院创作，硬科幻与科研题材纪录片常用。'},
  ]},
  {id: 'horror', name: '恐怖片', nameEn: 'HORROR', icon: '👻', desc: '哥特黑体、恐怖装饰字体与破损风格字体，营造惊悚不安氛围，适合恐怖片标题、血字场景。', fonts: [
    {name: 'Creepster', en: 'Creepster', family: 'Creepster', weight: '400', preview: 'BOO!', cat: '恐怖装饰', scenes: ['恐怖片标题', '万圣节', '僵尸题材', '惊悚预告'], license: 'OFL', desc: '经典恐怖装饰字体，笔画 dripping 效果，恐怖片标题与万圣节题材的标志性字体。'},
    {name: 'Nosifer', en: 'Nosifer', family: 'Nosifer', weight: '400', preview: 'DEATH', cat: '血字恐怖', scenes: ['吸血鬼', '血腥恐怖', '丧尸片', '邪教题材'], license: 'OFL', desc: '血字滴落效果的恐怖字体，吸血鬼与血腥恐怖片的经典标题字体。'},
    {name: 'Eater', en: 'Eater', family: 'Eater', weight: '400', preview: 'HUNGRY', cat: '怪物恐怖', scenes: ['怪物电影', '食人题材', '惊悚喜剧', 'B级片'], license: 'OFL', desc: '带尖牙与触角装饰的恐怖字体，怪物电影与食人题材的创意标题字体。'},
    {name: 'Metal Mania', en: 'Metal Mania', family: '"Metal Mania"', weight: '400', preview: 'DOOM', cat: '金属哥特', scenes: ['重金属恐怖', '地狱题材', '黑暗奇幻', '摇滚恐怖'], license: 'OFL', desc: '重金属风格哥特字体，尖锐锋利，地狱题材与黑暗奇幻恐怖片常用。'},
    {name: 'New Rocker', en: 'New Rocker', family: '"New Rocker"', weight: '400', preview: 'HELL', cat: '摇滚哥特', scenes: ['摇滚恐怖', '邪教题材', '黑暗青春', '哥特风格'], license: 'OFL', desc: '新摇滚风格哥特字体，比Metal Mania更现代，邪教与黑暗青春题材常用。'},
    {name: 'Butcherman', en: 'Butcherman', family: 'Butcherman', weight: '400', preview: 'SLASH', cat: '屠宰恐怖', scenes: ['砍杀片', '屠夫题材', '血腥惊悚', 'B级恐怖'], license: 'OFL', desc: '屠宰场风格恐怖字体，笔画带血迹与切割效果，砍杀片与屠夫题材专用。'},
  ]},
  {id: 'comedy', name: '喜剧片', nameEn: 'COMEDY', icon: '😄', desc: '圆润可爱、夸张活泼的字体，传递欢乐轻松情绪，适合喜剧片标题、搞笑字幕、综艺花字。', fonts: [
    {name: 'Fredoka', en: 'Fredoka', family: 'Fredoka', weight: '600', preview: 'HAHA', cat: '圆润可爱', scenes: ['家庭喜剧', '动画喜剧', '儿童电影', '轻松搞笑'], license: 'OFL', desc: '圆润可爱无衬线，5档字重，家庭喜剧与动画电影的常用字体。'},
    {name: 'Bangers', en: 'Bangers', family: 'Bangers', weight: '400', preview: 'POW!', cat: '漫画夸张', scenes: ['漫画改编', '动作喜剧', '超级英雄', '搞笑字幕'], license: 'OFL', desc: '漫画风格夸张字体，模仿美式漫画音效字，动作喜剧与超级英雄片常用。'},
    {name: 'Luckiest Guy', en: 'Luckiest Guy', family: '"Luckiest Guy"', weight: '400', preview: 'WOW!', cat: '复古卡通', scenes: ['复古喜剧', '卡通风格', '综艺花字', '搞笑预告'], license: 'OFL', desc: '50年代复古卡通风格字体，活泼有趣，复古喜剧与综艺花字常用。'},
    {name: 'Chewy', en: 'Chewy', family: 'Chewy', weight: '400', preview: 'YUMMY', cat: '俏皮圆润', scenes: ['美食喜剧', '宠物电影', '家庭温馨', '儿童内容'], license: 'OFL', desc: '俏皮圆润字体，笔画饱满有弹性，美食喜剧与宠物电影常用。'},
    {name: 'Sigmar', en: 'Sigmar', family: 'Sigmar', weight: '400', preview: 'BAM!', cat: '粗黑漫画', scenes: ['动作喜剧', '街头文化', '潮流喜剧', '嘻哈题材'], license: 'OFL', desc: '超粗漫画风格字体，街头感强，动作喜剧与潮流题材常用。'},
    {name: '站酷快乐体', en: 'ZCOOL KuaiLe', family: '"ZCOOL KuaiLe"', weight: '400', preview: '开心一夏', cat: '活泼圆润', scenes: ['国产喜剧', '综艺花字', '儿童节目', '美食探店'], license: 'OFL', desc: '站酷出品免费商用，圆润活泼充满童趣，国产喜剧与综艺花字的热门选择。'},
  ]},
  {id: 'mystery', name: '悬疑犯罪', nameEn: 'MYSTERY', icon: '🔍', desc: '等宽打字机字体与冷峻衬线体，营造悬疑紧张氛围，适合悬疑片字幕、犯罪现场、侦探推理。', fonts: [
    {name: 'Special Elite', en: 'Special Elite', family: '"Special Elite"', weight: '400', preview: 'TYPEWRITER', cat: '打字机', scenes: ['侦探片', '悬疑旁白', '档案文件', '复古犯罪'], license: 'OFL', desc: '模拟老式打字机的字体，侦探片与悬疑电影旁白的经典选择，营造档案文件感。'},
    {name: 'Courier Prime', en: 'Courier Prime', family: '"Courier Prime"', weight: '400', preview: 'EVIDENCE', cat: '等宽打字机', scenes: ['剧本格式', '法庭戏', '侦探推理', '新闻片段'], license: 'OFL', desc: '为剧本创作优化的等宽字体，比Courier更精致，法庭戏与侦探推理场景常用。'},
    {name: 'Cormorant Garamond', en: 'Cormorant Garamond', family: '"Cormorant Garamond"', weight: '500', preview: 'Mystery', cat: '优雅衬线', scenes: ['文艺悬疑', '心理惊悚', '古典推理', '英式侦探'], license: 'OFL', desc: '优雅高对比衬线，文艺气质浓厚，心理惊悚与英式侦探片常用。'},
    {name: 'Cinzel', en: 'Cinzel', family: 'Cinzel', weight: '700', preview: 'SECRET', cat: '古典大写', scenes: ['古典悬疑', '宗教题材', '密室推理', '历史犯罪'], license: 'OFL', desc: '古典罗马大写衬线，庄重神秘，宗教悬疑与密室推理题材常用。'},
    {name: 'IBM Plex Mono', en: 'IBM Plex Mono', family: '"IBM Plex Mono"', weight: '500', preview: 'CLUE_01', cat: '现代等宽', scenes: ['网络犯罪', '黑客悬疑', '数据推理', '现代侦探'], license: 'OFL', desc: 'IBM出品现代等宽字体，科技感强，网络犯罪与黑客悬疑片常用。'},
    {name: 'Old Standard TT', en: 'Old Standard TT', family: '"Old Standard TT"', weight: '400', preview: 'Cold Case', cat: '复古衬线', scenes: ['年代悬疑', '冷案重启', '古典犯罪', '报纸标题'], license: 'OFL', desc: '复古衬线字体，模拟19世纪印刷风格，年代悬疑片与报纸标题场景常用。'},
  ]},
  {id: 'wuxia', name: '武侠片', nameEn: 'WUXIA', icon: '⚔️', desc: '毛笔书法与行草字体，传递江湖侠气与东方美学，适合武侠片片名、武功秘籍、古风旁白。', fonts: [
    {name: '马善政', en: 'Ma Shan Zheng', family: '"Ma Shan Zheng"', weight: '400', preview: '江湖', cat: '毛笔楷书', scenes: ['武侠片名', '古装大片', '功夫电影', '国风标题'], license: 'OFL', desc: '书法家马善政创作的毛笔楷书，苍劲有力，武侠片片名与古装大片标题首选。'},
    {name: '龙藏体', en: 'Long Cang', family: '"Long Cang"', weight: '400', preview: '行云流水', cat: '行草手写', scenes: ['武侠旁白', '秘籍标题', '诗意场景', '山水意境'], license: 'OFL', desc: '流畅行草字体，笔画连绵如行云流水，武侠片旁白与秘籍标题常用。'},
    {name: '志莽行', en: 'Zhi Mang Xing', family: '"Zhi Mang Xing"', weight: '400', preview: '侠之大者', cat: '雄浑行楷', scenes: ['历史武侠', '战争史诗', '豪迈标题', '人物传记'], license: 'OFL', desc: '雄浑行楷字体，结构稳重笔画奔放，历史武侠与战争史诗片常用。'},
    {name: '柳建毛草', en: 'Liu Jian Mao Cao', family: '"Liu Jian Mao Cao"', weight: '400', preview: '剑影', cat: '狂草艺术', scenes: ['实验武侠', '艺术短片', '草书标题', '情绪表达'], license: 'OFL', desc: '狂放草书字体，笔画粗细变化剧烈，实验武侠与艺术短片的创意标题。'},
    {name: '思源宋体', en: 'Noto Serif SC', family: '"Noto Serif SC"', weight: '700', preview: '倚天屠龙', cat: '经典宋体', scenes: ['历史正剧', '文化武侠', '书籍排版', '文艺古装'], license: 'OFL', desc: 'Adobe与Google联合出品开源宋体，7档字重，历史正剧与文化武侠片标准字体。'},
    {name: 'Yuji Syuku', en: 'Yuji Syuku', family: '"Yuji Syuku"', weight: '400', preview: '武士道', cat: '日文书法', scenes: ['日式武士', '时代剧', '剑道题材', '和风武侠'], license: 'OFL', desc: '日文书法风格字体，笔触苍劲，日式武士片与时代剧标题常用。'},
  ]},
  {id: 'historical', name: '古装宫廷', nameEn: 'HISTORICAL', icon: '🏯', desc: '古典衬线与明朝体，传递庄重典雅的历史感，适合古装剧片名、宫廷场景、历史纪录片。', fonts: [
    {name: 'Noto Serif TC', en: 'Noto Serif TC', family: '"Noto Serif TC"', weight: '700', preview: '宮廷', cat: '繁体宋体', scenes: ['古装正剧', '宫廷戏', '历史大片', '繁体内容'], license: 'OFL', desc: '思源宋体繁体版，字形典雅规范，古装正剧与宫廷戏的标准字体。'},
    {name: 'Shippori Mincho', en: 'Shippori Mincho', family: '"Shippori Mincho"', weight: '600', preview: '王朝', cat: '明朝体', scenes: ['历史纪录片', '古装文艺', '文化节目', '书籍装帧'], license: 'OFL', desc: '日本出产明朝体，笔画优雅精致，历史纪录片与古装文艺片常用。'},
    {name: 'Yuji Mai', en: 'Yuji Mai', family: '"Yuji Mai"', weight: '400', preview: '霓裳', cat: '装饰书法', scenes: ['宫廷大戏', '古装爱情', '华丽标题', '服饰文化'], license: 'OFL', desc: '装饰性日文书法字体，华丽优雅，宫廷大戏与古装爱情片标题常用。'},
    {name: 'Klee One', en: 'Klee One', family: '"Klee One"', weight: '600', preview: '长安', cat: '人文明朝', scenes: ['文艺古装', '青春宫廷', '散文旁白', '诗词展示'], license: 'OFL', desc: 'Fontworks出品人文明朝体，温暖易读，文艺古装与诗词展示场景常用。'},
    {name: 'New Tegomin', en: 'New Tegomin', family: '"New Tegomin"', weight: '400', preview: '史记', cat: '古典明朝', scenes: ['历史正剧', '古籍展示', '书法题材', '文化纪录'], license: 'OFL', desc: '古典风格明朝体，模拟古籍刻本风格，历史正剧与古籍展示场景常用。'},
    {name: 'Pirata One', en: 'Pirata One', family: '"Pirata One"', weight: '400', preview: 'EMPIRE', cat: '古典装饰', scenes: ['航海历史', '大航海时代', '海盗题材', '探险史诗'], license: 'OFL', desc: '古典装饰性字体，航海时代风格，大航海与海盗题材历史片常用。'},
  ]},
  {id: 'documentary', name: '纪录片', nameEn: 'DOCUMENTARY', icon: '📹', desc: '清晰中性的无衬线与人文衬线，客观克制不抢戏，适合纪录片字幕、数据展示、旁白信息。', fonts: [
    {name: 'Inter', en: 'Inter', family: 'Inter', weight: '500', preview: 'Clarity', cat: '现代无衬线', scenes: ['纪实字幕', '数据展示', '科技纪录', '通用正文'], license: 'OFL', desc: '专为屏幕设计的无衬线，x高度大可读性强，现代纪录片字幕首选字体。'},
    {name: 'Roboto', en: 'Roboto', family: 'Roboto', weight: '400', preview: 'Objective', cat: '几何无衬线', scenes: ['科技纪录片', '自然纪录', 'YouTube内容', '通用字幕'], license: 'Apache', desc: 'Google出品几何无衬线，中性客观，科技与自然纪录片常用。'},
    {name: 'Lato', en: 'Lato', family: 'Lato', weight: '400', preview: 'Humanity', cat: '人文无衬线', scenes: ['人文纪录片', '社会题材', '人物专访', '温暖叙事'], license: 'OFL', desc: '人文主义无衬线，温暖友好，人文与社会题材纪录片常用。'},
    {name: 'Work Sans', en: 'Work Sans', family: '"Work Sans"', weight: '400', preview: 'Detail', cat: '工作无衬线', scenes: ['工艺纪录片', '手工业', '建筑纪录', '精细展示'], license: 'OFL', desc: '基于早期印刷无衬线设计，细节丰富，工艺与建筑类纪录片常用。'},
    {name: 'Source Code Pro', en: 'Source Code Pro', family: '"Source Code Pro"', weight: '400', preview: 'DATA_01', cat: '等宽代码', scenes: ['科技纪录', '数据可视化', '代码展示', '编程题材'], license: 'OFL', desc: 'Adobe出品等宽代码字体，清晰易读，科技纪录片与数据可视化场景常用。'},
    {name: 'Merriweather', en: 'Merriweather', family: 'Merriweather', weight: '400', preview: 'History', cat: '屏幕衬线', scenes: ['历史纪录片', '长篇旁白', '文字密集', '阅读优化'], license: 'OFL', desc: '专为屏幕阅读优化的衬线字体，历史纪录片与长篇旁白常用。'},
  ]},
  {id: 'animation', name: '动漫动画', nameEn: 'ANIMATION', icon: '🎨', desc: '圆润可爱与日文风格字体，传递活力与想象力，适合动画片头、动漫字幕、二次元内容。', fonts: [
    {name: 'M PLUS Rounded 1c', en: 'M PLUS Rounded 1c', family: '"M PLUS Rounded 1c"', weight: '700', preview: 'アニメ', cat: '日文圆体', scenes: ['日漫字幕', '动画标题', '治愈系', '可爱内容'], license: 'OFL', desc: '日文圆体字体，笔画圆润温暖，日漫字幕与治愈系动画常用。'},
    {name: 'Kiwi Maru', en: 'Kiwi Maru', family: '"Kiwi Maru"', weight: '500', preview: 'キウイ', cat: '可爱圆体', scenes: ['儿童动画', '萌系内容', '轻松日常', '低龄向'], license: 'OFL', desc: '可爱风格日文圆体，比M PLUS更活泼，儿童动画与萌系内容常用。'},
    {name: 'Hachi Maru Pop', en: 'Hachi Maru Pop', family: '"Hachi Maru Pop"', weight: '400', preview: 'ポップ', cat: 'POP圆体', scenes: ['搞笑动画', 'POP风格', '综艺动漫', '轻松喜剧'], license: 'OFL', desc: 'POP风格日文圆体，活泼有趣，搞笑动画与综艺动漫风格常用。'},
    {name: 'RocknRoll One', en: 'RocknRoll One', family: '"RocknRoll One"', weight: '400', preview: 'ロック', cat: '摇滚日文', scenes: ['热血动漫', '音乐动画', '摇滚题材', '战斗内容'], license: 'OFL', desc: '摇滚风格日文哥特体，力量感强，热血动漫与音乐动画标题常用。'},
    {name: 'Nunito', en: 'Nunito', family: 'Nunito', weight: '700', preview: 'CUTE', cat: '圆润无衬线', scenes: ['欧美动画', '儿童内容', '教育动画', '温馨故事'], license: 'OFL', desc: '圆润无衬线字体，末端圆润处理，欧美动画与儿童教育内容常用。'},
    {name: 'Fredoka', en: 'Fredoka', family: 'Fredoka', weight: '500', preview: 'FUN', cat: '超圆无衬线', scenes: ['3D动画', '喜剧动画', '亲子内容', '游戏UI'], license: 'OFL', desc: '超圆润无衬线字体，饱满可爱，3D动画与亲子内容常用。'},
  ]},
  {id: 'war', name: '战争片', nameEn: 'WAR', icon: '⚔️', desc: '模板印刷与军用 stencil 字体，传递战场粗粝感，适合战争片片名、军牌标识、战壕场景。', fonts: [
    {name: 'Stardos Stencil', en: 'Stardos Stencil', family: '"Stardos Stencil"', weight: '700', preview: 'D-DAY', cat: '模板衬线', scenes: ['二战电影', '军事行动', '历史战争', '军牌标识'], license: 'OFL', desc: '衬线风格模板字体，模拟军用模板印刷，二战题材战争片经典字体。'},
    {name: 'Saira Stencil One', en: 'Saira Stencil One', family: '"Saira Stencil One"', weight: '400', preview: 'BATTLE', cat: '现代模板', scenes: ['现代战争', '军事科幻', '特种部队', '战术标识'], license: 'OFL', desc: '现代无衬线模板字体，比Stardos更简洁，现代战争与军事科幻片常用。'},
    {name: 'Black Ops One', en: 'Black Ops One', family: '"Black Ops One"', weight: '400', preview: 'MISSION', cat: '军用粗黑', scenes: ['特种部队', '冷战题材', '军事动作', '秘密行动'], license: 'OFL', desc: '军用风格粗黑字体，模拟军队标识，特种部队与冷战题材战争片常用。'},
    {name: 'Teko', en: 'Teko', family: 'Teko', weight: '600', preview: 'WAR', cat: '压缩无衬线', scenes: ['战争预告', '战场字幕', '新闻片段', '紧急播报'], license: 'OFL', desc: ' Devanagari 风格压缩无衬线，紧凑有力，战争预告片与战场字幕常用。'},
    {name: 'Russo One', en: 'Russo One', family: '"Russo One"', weight: '400', preview: 'ATTACK', cat: '军事粗体', scenes: ['军事动作', '战争游戏', '坦克飞机', '硬核题材'], license: 'OFL', desc: '硬朗军事风格粗体，结构方正，军事动作片与战争游戏风格常用。'},
    {name: 'Anton', en: 'Anton', family: 'Anton', weight: '400', preview: 'INVASION', cat: '超压缩', scenes: ['战争大片', '入侵题材', '史诗战役', '预告片标题'], license: 'OFL', desc: '超压缩粗体，冲击力极强，战争大片与史诗战役预告片标题常用。'},
  ]},
  {id: 'crime', name: '刑侦法律', nameEn: 'CRIME', icon: '⚖️', desc: '等宽代码与冷峻无衬线，传递理性专业感，适合刑侦片字幕、法庭场景、法医报告。', fonts: [
    {name: 'Roboto Mono', en: 'Roboto Mono', family: '"Roboto Mono"', weight: '400', preview: 'CASE_047', cat: '现代等宽', scenes: ['法医报告', '证据展示', '电脑界面', '刑侦数据'], license: 'Apache', desc: 'Google出品等宽字体，清晰现代，法医报告与证据展示场景常用。'},
    {name: 'JetBrains Mono', en: 'JetBrains Mono', family: '"JetBrains Mono"', weight: '400', preview: 'EVIDENCE', cat: '编程等宽', scenes: ['网络犯罪', '黑客追踪', '数据取证', '技术刑侦'], license: 'OFL', desc: 'JetBrains出品编程等宽字体，现代感强，网络犯罪与技术刑侦题材常用。'},
    {name: 'Fira Code', en: 'Fira Code', family: '"Fira Code"', weight: '400', preview: 'DEBUG_', cat: '代码等宽', scenes: ['程序员题材', '黑客电影', '代码展示', '科技犯罪'], license: 'OFL', desc: 'Mozilla出品代码等宽字体，带连字特性，程序员与黑客题材电影常用。'},
    {name: 'Space Grotesk', en: 'Space Grotesk', family: '"Space Grotesk"', weight: '500', preview: 'LAW', cat: '现代无衬线', scenes: ['法庭戏', '律政剧', '现代刑侦', '法律文件'], license: 'OFL', desc: '现代几何无衬线，理性专业，法庭戏与律政剧标题和文件场景常用。'},
    {name: 'Archivo Narrow', en: 'Archivo Narrow', family: '"Archivo Narrow"', weight: '600', preview: 'WITNESS', cat: '压缩无衬线', scenes: ['新闻片段', '证人陈述', '档案文件', '紧凑排版'], license: 'OFL', desc: '压缩无衬线字体，源自报纸排版，新闻片段与档案文件场景常用。'},
    {name: 'Courier Prime', en: 'Courier Prime', family: '"Courier Prime"', weight: '400', preview: 'TESTIMONY', cat: '打字机等宽', scenes: ['法庭证词', '旧案档案', '打字机场景', '复古刑侦'], license: 'OFL', desc: '为剧本优化的打字机等宽字体，法庭证词与旧案档案场景常用。'},
  ]},
  {id: 'fantasy', name: '奇幻玄幻', nameEn: 'FANTASY', icon: '🐉', desc: '哥特装饰与古典衬线，传递魔法与异世界氛围，适合奇幻片片名、魔法书、精灵文字。', fonts: [
    {name: 'Cinzel', en: 'Cinzel', family: 'Cinzel', weight: '700', preview: 'MAGIC', cat: '罗马大写', scenes: ['史诗奇幻', '魔法世界', '精灵题材', '古典魔幻'], license: 'OFL', desc: '古典罗马大写衬线，庄重神圣，史诗奇幻与魔法世界标题首选。'},
    {name: 'UnifrakturCook', en: 'UnifrakturCook', family: 'UnifrakturCook', weight: '700', preview: 'DRAGON', cat: '哥特黑体', scenes: ['黑暗奇幻', '中世纪', '魔法书', '哥特风格'], license: 'OFL', desc: '哥特黑体字体，模拟中世纪手抄本，黑暗奇幻与魔法书场景常用。'},
    {name: 'MedievalSharp', en: 'MedievalSharp', family: 'MedievalSharp', weight: '400', preview: 'QUEST', cat: '中世纪手写', scenes: ['中世纪奇幻', '羊皮卷', '任务告示', '冒险题材'], license: 'OFL', desc: '中世纪手写风格字体，模拟羊皮卷书写，冒险奇幻与任务告示场景常用。'},
    {name: 'Cormorant', en: 'Cormorant', family: 'Cormorant', weight: '500', preview: 'ELVEN', cat: '优雅衬线', scenes: ['精灵题材', '唯美奇幻', '仙境场景', '诗意旁白'], license: 'OFL', desc: '优雅高对比衬线，纤细唯美，精灵题材与唯美奇幻片常用。'},
    {name: 'EB Garamond', en: 'EB Garamond', family: '"EB Garamond"', weight: '400', preview: 'LORE', cat: '古典衬线', scenes: ['古典奇幻', '书籍旁白', '传说故事', '文艺魔幻'], license: 'OFL', desc: '古典Garamond复刻字体，优雅古典，古典奇幻与传说故事旁白常用。'},
    {name: 'Yuji Mai', en: 'Yuji Mai', family: '"Yuji Mai"', weight: '400', preview: '妖狐', cat: '和风奇幻', scenes: ['日式奇幻', '妖怪题材', '灵异故事', '和风魔幻'], license: 'OFL', desc: '装饰性日文书法，和风奇幻与妖怪题材标题常用。'},
  ]},
  {id: 'youth', name: '青春校园', nameEn: 'YOUTH', icon: '🎓', desc: '清新现代无衬线与圆润字体，传递青春活力与校园气息，适合青春片片名、校园场景、毕业季。', fonts: [
    {name: 'Poppins', en: 'Poppins', family: 'Poppins', weight: '500', preview: 'YOUTH', cat: '几何无衬线', scenes: ['青春片', '校园剧', '毕业季', '年轻向'], license: 'OFL', desc: '几何无衬线字体，现代友好，青春片与校园剧标题和字幕常用。'},
    {name: 'Quicksand', en: 'Quicksand', family: 'Quicksand', weight: '500', preview: 'DREAM', cat: '圆润无衬线', scenes: ['校园爱情', '清新青春', '文艺短片', '毕业纪念'], license: 'OFL', desc: '圆润几何无衬线，清新自然，校园爱情与清新青春片常用。'},
    {name: 'Manrope', en: 'Manrope', family: 'Manrope', weight: '500', preview: 'NOW', cat: '现代无衬线', scenes: ['现代青春', '都市校园', '职场新人', 'Vlog风格'], license: 'OFL', desc: '现代无衬线字体，简洁当代，现代青春与都市校园题材常用。'},
    {name: 'DM Sans', en: 'DM Sans', family: '"DM Sans"', weight: '500', preview: 'FRESH', cat: '人文无衬线', scenes: ['文艺青春', '独立电影', '校园纪录', '清新风格'], license: 'OFL', desc: '人文主义无衬线，温暖易读，文艺青春与独立电影常用。'},
    {name: 'Sora', en: 'Sora', family: 'Sora', weight: '500', preview: 'SKY', cat: '现代几何', scenes: ['青春科幻', '校园科技', '未来青春', '成长题材'], license: 'OFL', desc: '现代几何无衬线，字体名意为天空，青春科幻与成长题材常用。'},
    {name: '站酷快乐体', en: 'ZCOOL KuaiLe', family: '"ZCOOL KuaiLe"', weight: '400', preview: '青春万岁', cat: '活泼圆润', scenes: ['国产青春片', '校园喜剧', '毕业季', '综艺青春'], license: 'OFL', desc: '站酷出品免费商用，圆润活泼，国产青春片与校园喜剧常用。'},
  ]},
  {id: 'urban', name: '都市职场', nameEn: 'URBAN', icon: '🏙️', desc: '现代简洁无衬线，传递专业干练的都市感，适合都市剧字幕、职场场景、商业内容。', fonts: [
    {name: 'Montserrat', en: 'Montserrat', family: 'Montserrat', weight: '500', preview: 'CITY', cat: '几何无衬线', scenes: ['都市剧', '职场戏', '商业电影', '品牌内容'], license: 'OFL', desc: '灵感来自老城市招牌的几何无衬线，现代都市感强，都市剧与职场戏常用。'},
    {name: 'Inter', en: 'Inter', family: 'Inter', weight: '500', preview: 'WORK', cat: '屏幕无衬线', scenes: ['现代职场', '科技公司', '商务内容', 'UI界面'], license: 'OFL', desc: '专为屏幕设计的无衬线，专业清晰，现代职场与科技公司题材常用。'},
    {name: 'Work Sans', en: 'Work Sans', family: '"Work Sans"', weight: '400', preview: 'BUSY', cat: '工作无衬线', scenes: ['职场日常', '创业题材', '加班场景', '都市生活'], license: 'OFL', desc: '基于早期印刷无衬线，工作感强，职场日常与创业题材常用。'},
    {name: 'Barlow', en: 'Barlow', family: 'Barlow', weight: '500', preview: 'FAST', cat: '紧凑无衬线', scenes: ['快节奏都市', '新闻媒体', '广告行业', '都市动作'], license: 'OFL', desc: '紧凑无衬线字体，源自公路标识，快节奏都市与新闻媒体题材常用。'},
    {name: 'Archivo', en: 'Archivo', family: 'Archivo', weight: '500', preview: 'GRIND', cat: 'Grotesque无衬线', scenes: ['都市底层', '奋斗题材', '新闻纪实', '现实主义'], license: 'OFL', desc: 'Grotesque风格无衬线，源自报纸排版，都市底层与奋斗题材常用。'},
    {name: 'Epilogue', en: 'Epilogue', family: 'Epilogue', weight: '500', preview: 'END', cat: '现代无衬线', scenes: ['都市文艺', '职场转折', '人生故事', '结语场景'], license: 'OFL', desc: '现代无衬线字体，名字意为结语，都市文艺与人生故事题材常用。'},
  ]},
  {id: 'republic', name: '民国年代', nameEn: 'REPUBLIC', icon: '📜', desc: '复古衬线与旧印刷风格字体，传递年代感与怀旧氛围，适合民国剧片名、旧报纸、老上海。', fonts: [
    {name: '陈宇燕', en: 'Chen Yu Yan', family: '"Chen Yu Yan"', weight: '400', preview: '旧时光', cat: '手写楷书', scenes: ['民国剧', '年代爱情', '书信场景', '怀旧文艺'], license: 'OFL', desc: '手写楷书字体，温润有年代感，民国剧与年代爱情片书信场景常用。'},
    {name: 'Sawarabi Mincho', en: 'Sawarabi Mincho', family: '"Sawarabi Mincho"', weight: '400', preview: '昭和', cat: '日式明朝', scenes: ['民国日式', '老上海', '租界题材', '年代纪录'], license: 'OFL', desc: '日式明朝体，复古温润，民国日式与老上海租界题材常用。'},
    {name: 'Sawarabi Gothic', en: 'Sawarabi Gothic', family: '"Sawarabi Gothic"', weight: '400', preview: '摩登', cat: '日式黑体', scenes: ['民国摩登', '老上海广告', '月份牌', '复古都市'], license: 'OFL', desc: '日式黑体字体，复古现代感，民国摩登与老上海广告月份牌场景常用。'},
    {name: 'BIZ UDMincho', en: 'BIZ UDMincho', family: '"BIZ UDMincho"', weight: '400', preview: '申报', cat: '商务明朝', scenes: ['民国报纸', '商业文件', '老书店', '印刷品'], license: 'OFL', desc: '商务用明朝体，清晰规范，民国报纸与商业文件场景常用。'},
    {name: 'Old Standard TT', en: 'Old Standard TT', family: '"Old Standard TT"', weight: '400', preview: '1920s', cat: '复古衬线', scenes: ['年代纪录', '旧报纸标题', '复古印刷', '古典场景'], license: 'OFL', desc: '模拟19世纪印刷的衬线字体，年代感强，旧报纸与复古印刷场景常用。'},
    {name: 'Playfair Display', en: 'Playfair Display', family: '"Playfair Display"', weight: '700', preview: 'VINTAGE', cat: '高对比衬线', scenes: ['老上海', '复古时尚', '爵士年代', '奢华民国'], license: 'OFL', desc: '高对比优雅衬线，复古奢华，老上海与爵士年代民国剧常用。'},
  ]},
  {id: 'disaster', name: '灾难求生', nameEn: 'DISASTER', icon: '🌋', desc: '超粗压缩与工业字体，传递紧迫与力量感，适合灾难片标题、紧急警报、求生场景。', fonts: [
    {name: 'Big Shoulders Text', en: 'Big Shoulders Text', family: '"Big Shoulders Text"', weight: '700', preview: 'CRISIS', cat: '工业无衬线', scenes: ['工业灾难', '工厂事故', '城市危机', '紧急状态'], license: 'OFL', desc: '芝加哥工业风格无衬线，硬朗有力，工业灾难与城市危机题材常用。'},
    {name: 'Bungee', en: 'Bungee', family: 'Bungee', weight: '400', preview: 'ALERT', cat: '招牌粗体', scenes: ['城市灾难', '招牌掉落', '紧急广播', '街头逃生'], license: 'OFL', desc: '模拟城市招牌的粗体字体，结构紧凑，城市灾难与街头逃生场景常用。'},
    {name: 'Monoton', en: 'Monoton', family: 'Monoton', weight: '400', preview: 'RADIO', cat: '装饰线体', scenes: ['核灾难', '辐射警报', '复古科幻', '末日广播'], license: 'OFL', desc: '装饰性线体字体，模拟辐射警告标识，核灾难与末日广播场景常用。'},
    {name: 'Righteous', en: 'Righteous', family: 'Righteous', weight: '400', preview: 'SURVIVE', cat: '复古无衬线', scenes: ['末日求生', '废土题材', '复古灾难', '生存挑战'], license: 'OFL', desc: '复古风格无衬线，70年代感，末日求生与废土题材灾难片常用。'},
    {name: 'Teko', en: 'Teko', family: 'Teko', weight: '700', preview: 'EVAC', cat: '压缩无衬线', scenes: ['紧急疏散', '海啸地震', '倒计时', '快速播报'], license: 'OFL', desc: '紧凑压缩无衬线，阅读速度快，紧急疏散与倒计时场景常用。'},
    {name: 'Russo One', en: 'Russo One', family: '"Russo One"', weight: '400', preview: 'IMPACT', cat: '军事粗体', scenes: ['陨石撞击', '外星入侵', '硬核灾难', '军事应对'], license: 'OFL', desc: '硬朗军事粗体，方正有力，陨石撞击与外星入侵灾难片常用。'},
  ]},
  {id: 'musical', name: '音乐歌舞', nameEn: 'MUSICAL', icon: '🎵', desc: '装饰艺术与流畅手写字体，传递节奏与艺术感，适合音乐片片名、歌词展示、舞台场景。', fonts: [
    {name: 'Pacifico', en: 'Pacifico', family: 'Pacifico', weight: '400', preview: 'Melody', cat: '冲浪手写', scenes: ['音乐爱情', '夏日歌舞', '冲浪题材', '复古流行'], license: 'OFL', desc: '50年代冲浪风格手写字体，轻松活泼，音乐爱情与夏日歌舞片常用。'},
    {name: 'Shrikhand', en: 'Shrikhand', family: 'Shrikhand', weight: '400', preview: 'JAZZ', cat: '装饰艺术', scenes: ['爵士音乐', '百老汇', '复古歌舞', '华丽舞台'], license: 'OFL', desc: '装饰艺术风格字体，华丽优雅，爵士音乐与百老汇歌舞片常用。'},
    {name: 'Sacramento', en: 'Sacramento', family: 'Sacramento', weight: '400', preview: 'Song', cat: '优雅花体', scenes: ['古典音乐', '钢琴题材', '文艺歌舞', '抒情场景'], license: 'OFL', desc: '优雅花体手写字体，流畅细腻，古典音乐与钢琴题材歌舞片常用。'},
    {name: 'Tangerine', en: 'Tangerine', family: 'Tangerine', weight: '700', preview: 'Opera', cat: '华丽花体', scenes: ['歌剧题材', '古典歌舞', '华丽舞台', '复古音乐'], license: 'OFL', desc: '华丽花体字体，笔画丰富，歌剧题材与古典歌舞片标题常用。'},
    {name: 'Parisienne', en: 'Parisienne', family: 'Parisienne', weight: '400', preview: 'Cabaret', cat: '法式手写', scenes: ['法式歌舞', '红磨坊', '巴黎题材', '复古爵士'], license: 'OFL', desc: '法式手写字体，优雅随性，法式歌舞与红磨坊题材常用。'},
    {name: 'Dancing Script', en: 'Dancing Script', family: '"Dancing Script"', weight: '700', preview: 'Rhythm', cat: '舞蹈手写', scenes: ['舞蹈电影', '街舞题材', '青春歌舞', '节奏展示'], license: 'OFL', desc: '舞蹈般流畅的手写字体，节奏感强，舞蹈电影与街舞题材常用。'},
  ]},
  {id: 'western', name: '西部片', nameEn: 'WESTERN', icon: '🤠', desc: '模板字体与粗犷手写，传递西部荒野与牛仔气息，适合西部片片名、通缉令、酒馆招牌。', fonts: [
    {name: 'Rochester', en: 'Rochester', family: 'Rochester', weight: '400', preview: 'Saloon', cat: '维多利亚花体', scenes: ['西部酒馆', '维多利亚西部', '贵妇题材', '优雅场景'], license: 'OFL', desc: '维多利亚风格花体字体，优雅华丽，西部酒馆与贵妇题材常用。'},
    {name: 'Yellowtail', en: 'Yellowtail', family: 'Yellowtail', weight: '400', preview: 'Ranch', cat: '复古手写', scenes: ['牧场西部', '牛仔手写', '复古招牌', '乡村音乐'], license: 'OFL', desc: '复古手写字体，模拟招牌书写，牧场西部与牛仔手写场景常用。'},
    {name: 'Grand Hotel', en: 'Grand Hotel', family: '"Grand Hotel"', weight: '400', preview: 'Hotel', cat: '装饰艺术', scenes: ['西部酒店', '火车站', '装饰艺术', '繁华西部'], license: 'OFL', desc: '装饰艺术风格字体，模拟酒店标识，西部酒店与火车站场景常用。'},
    {name: 'Pinyon Script', en: 'Pinyon Script', family: '"Pinyon Script"', weight: '400', preview: 'Wanted', cat: '花体手写', scenes: ['通缉令', '西部书信', '契约文件', '复古手写'], license: 'OFL', desc: '19世纪花体手写字体，模拟西部书信与通缉令，复古手写场景常用。'},
    {name: 'Alex Brush', en: 'Alex Brush', family: '"Alex Brush"', weight: '400', preview: 'Duel', cat: '优雅手写', scenes: ['绅士西部', '决斗场景', '优雅书信', '文艺西部'], license: 'OFL', desc: '优雅手写字体，流畅自然，绅士西部与决斗场景常用。'},
    {name: 'Stardos Stencil', en: 'Stardos Stencil', family: '"Stardos Stencil"', weight: '400', preview: 'SHERIFF', cat: '模板衬线', scenes: ['警长标识', '西部城镇', '通缉令', '军事西部'], license: 'OFL', desc: '衬线模板字体，模拟西部警长标识与通缉令，西部片经典字体。'},
  ]},
  {id: 'noir', name: '黑色电影', nameEn: 'FILM NOIR', icon: '🎞️', desc: '高对比衬线与冷峻等宽，传递阴暗悬疑与宿命感，适合黑色电影标题、侦探旁白、雨夜场景。', fonts: [
    {name: 'DM Serif Display', en: 'DM Serif Display', family: '"DM Serif Display"', weight: '400', preview: 'NOIR', cat: '高对比衬线', scenes: ['黑色电影', '侦探故事', '雨夜场景', '复古悬疑'], license: 'OFL', desc: '高对比衬线展示字体，优雅冷峻，黑色电影与侦探故事标题常用。'},
    {name: 'Fraunces', en: 'Fraunces', family: 'Fraunces', weight: '500', preview: 'SHADOW', cat: '可变衬线', scenes: ['文艺黑色', '复古悬疑', '人物特写', '烟雾场景'], license: 'OFL', desc: '可变字体衬线，高对比优雅，文艺黑色电影与复古悬疑常用。'},
    {name: 'Newsreader', en: 'Newsreader', family: 'Newsreader', weight: '400', preview: 'PRESS', cat: '新闻衬线', scenes: ['记者题材', '报纸黑色', '调查报道', '40年代风格'], license: 'OFL', desc: '为新闻阅读优化的衬线字体，40年代报纸风格，记者题材黑色电影常用。'},
    {name: 'Literata', en: 'Literata', family: 'Literata', weight: '400', preview: 'BOOK', cat: '书籍衬线', scenes: ['作家题材', '文学黑色', '书籍改编', '文艺悬疑'], license: 'OFL', desc: 'Google出品书籍衬线字体，文学气质，作家题材与文学黑色电影常用。'},
    {name: 'Special Elite', en: 'Special Elite', family: '"Special Elite"', weight: '400', preview: 'GUM SHOE', cat: '打字机', scenes: ['侦探笔记', '档案文件', '黑色旁白', '复古犯罪'], license: 'OFL', desc: '打字机风格字体，侦探黑色电影的标志性字体，档案与旁白场景常用。'},
    {name: 'UnifrakturMaguntia', en: 'UnifrakturMaguntia', family: 'UnifrakturMaguntia', weight: '400', preview: 'DARK', cat: '哥特黑体', scenes: ['黑暗黑色', '哥特悬疑', '宗教题材', '阴郁氛围'], license: 'OFL', desc: '哥特黑体字体，阴郁神秘，黑暗黑色电影与哥特悬疑题材常用。'},
  ]},
  {id: 'superhero', name: '超级英雄', nameEn: 'SUPERHERO', icon: '🦸', desc: '超粗展示与漫画风格字体，传递力量与英雄感，适合超级英雄片标题、漫画分镜、战斗场景。', fonts: [
    {name: 'Permanent Marker', en: 'Permanent Marker', family: '"Permanent Marker"', weight: '400', preview: 'POW!', cat: '马克笔手写', scenes: ['漫画分镜', '战斗音效', '街头英雄', '涂鸦风格'], license: 'OFL', desc: '马克笔手写风格字体，模拟漫画音效字，漫画分镜与战斗场景常用。'},
    {name: 'Press Start 2P', en: 'Press Start 2P', family: '"Press Start 2P"', weight: '400', preview: 'BOSS', cat: '像素字体', scenes: ['游戏改编', '像素英雄', '复古游戏', '电子世界'], license: 'OFL', desc: '8位像素风格字体，游戏改编超级英雄与电子世界题材常用。'},
    {name: 'VT323', en: 'VT323', family: 'VT323', weight: '400', preview: 'SYSTEM', cat: '终端像素', scenes: ['科技英雄', '电脑界面', '黑客英雄', '复古终端'], license: 'OFL', desc: 'VT323终端像素字体，模拟老式计算机显示，科技英雄与黑客题材常用。'},
    {name: 'Kumbh Sans', en: 'Kumbh Sans', family: '"Kumbh Sans"', weight: '700', preview: 'HERO', cat: '现代无衬线', scenes: ['现代英雄', '都市奇侠', '团队英雄', '科技超英'], license: 'OFL', desc: '现代无衬线字体，清晰有力，现代超级英雄与都市奇侠题材常用。'},
    {name: 'Bangers', en: 'Bangers', family: 'Bangers', weight: '400', preview: 'BAM!', cat: '漫画夸张', scenes: ['漫画改编', '战斗音效', '超级英雄', '搞笑英雄'], license: 'OFL', desc: '美式漫画夸张字体，超级英雄片战斗音效与漫画分镜的经典选择。'},
    {name: 'Bungee', en: 'Bungee', family: 'Bungee', weight: '400', preview: 'SMASH', cat: '招牌粗体', scenes: ['城市英雄', '街头超英', '霓虹招牌', '都市战斗'], license: 'OFL', desc: '城市招牌风格粗体，结构紧凑有力，城市超级英雄与街头战斗场景常用。'},
  ]},
  {id: 'experimental', name: '实验短片', nameEn: 'EXPERIMENTAL', icon: '🎥', desc: '独特装饰与先锋字体，传递实验与艺术感，适合实验片片名、艺术表达、先锋影像。', fonts: [
    {name: 'Libre Franklin', en: 'Libre Franklin', family: '"Libre Franklin"', weight: '400', preview: 'FORM', cat: '经典无衬线', scenes: ['艺术实验', '极简短片', '概念影像', '黑白电影'], license: 'OFL', desc: '经典无衬线字体，1911年设计复刻，极简实验片与黑白电影常用。'},
    {name: 'Public Sans', en: 'Public Sans', family: '"Public Sans"', weight: '400', preview: 'VOID', cat: '政府无衬线', scenes: ['社会实验', '纪录短片', '公共议题', '冷静观察'], license: 'OFL', desc: '美国政府出品无衬线，中性客观，社会实验与公共议题短片常用。'},
    {name: 'Hind', en: 'Hind', family: 'Hind', weight: '400', preview: 'SILENCE', cat: '天城文无衬线', scenes: ['跨文化实验', '印度题材', '多元影像', '艺术表达'], license: 'OFL', desc: '支持天城文的无衬线字体，跨文化实验与多元影像常用。'},
    {name: 'Mukta', en: 'Mukta', family: 'Mukta', weight: '400', preview: 'FLOW', cat: '天城文无衬线', scenes: ['流动影像', '诗意实验', '南亚题材', '艺术短片'], license: 'OFL', desc: '支持天城文的无衬线字体，字形流畅，诗意实验与艺术短片常用。'},
    {name: 'Jost', en: 'Jost', family: 'Jost', weight: '400', preview: 'BAUHAUS', cat: '包豪斯无衬线', scenes: ['包豪斯风格', '设计实验', '几何影像', '先锋艺术'], license: 'OFL', desc: '基于包豪斯设计的无衬线字体，几何感强，设计实验与先锋艺术影像常用。'},
    {name: 'Space Grotesk', en: 'Space Grotesk', family: '"Space Grotesk"', weight: '400', preview: 'LOOP', cat: '现代几何', scenes: ['循环实验', '数字艺术', '生成影像', '科技艺术'], license: 'OFL', desc: '现代几何无衬线，源自Space Mono，数字艺术与生成影像实验常用。'},
  ]},
]

export const getCategory = (id: string): CategoryInfo =>
  categories.find(c => c.id === id) ?? categories[0]
