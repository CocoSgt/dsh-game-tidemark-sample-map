// 示例扩展：一张两方的小地图，带中英文的名字和简介。
// 启用办法见 mods/README.md：把这个文件夹拷到 mods/sample-map/，再在 mods/mods.js 里写 window.AWModList = ['sample-map'];
AWMods.register({
  id: 'sample-map',
  name: '示例地图：三岔河',
  version: '1.0.0',
  gameVersion: '1.x',
  author: 'Tidemark',
  desc: '一张 14×10 的两方小地图，用来演示扩展怎么写。',
  maps: [{
    name: '三岔河', size: '14×10 · 两个阵营 · 小图',
    blurb: '一条河把战场分成两半，中间一座桥、上下两处浅滩。先占桥头的城市，再决定从哪边过河。',
    // 只写左半，右半边按中心旋转 180° 自动生成。字符表见 mods/README.md
    half: [
      'mf..c.v',
      'fH.B..v',
      '.rrrrrb',
      '.K..f.v',
      '..f..cv',
      'c..*..v',
      '.B....e',
      '.rrrrrv',
      'f.K.f.v',
      'mf..c.v',
    ],
    units: [['inf', 2, 1], ['inf', 2, 6]],
  }],
  i18n: {
    en: {
      '示例地图：三岔河': 'Sample Map: Three Fords',
      '三岔河': 'Three Fords',
      '14×10 · 两个阵营 · 小图': '14×10 · 2 factions · small',
      '一条河把战场分成两半，中间一座桥、上下两处浅滩。先占桥头的城市，再决定从哪边过河。': 'A river splits the field. One bridge in the middle, a ford above and below. Take the city by the bridge first, then pick where to cross.',
      '一张 14×10 的两方小地图，用来演示扩展怎么写。': 'A small 14×10 two-faction map that shows how to write an extension.',
    },
  },
});
