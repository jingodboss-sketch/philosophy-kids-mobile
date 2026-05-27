// 移动端书籍数据 - 针对手机屏幕优化
export const BooksData = {
  1: {
    id: 1,
    title: "我们为什么活着",
    subtitle: "探索人生的意义",
    emoji: "🌟",
    color: "#E17055",
    colorLight: "#FAB1A0",
    description: "思考生命的意义，探索存在的价值",
    chapters: [
      { id: 1, title: "从一个无聊的下午开始", emoji: "😴", shortTitle: "无聊的意义" },
      { id: 2, title: "我是谁？", emoji: "🪞", shortTitle: "自我认知" },
      { id: 3, title: "梦想有什么用？", emoji: "🚀", shortTitle: "梦想价值" },
      { id: 4, title: "生命只有一次吗？", emoji: "🦋", shortTitle: "生命有限" },
      { id: 5, title: "幸福是什么？", emoji: "😊", shortTitle: "幸福本质" },
      { id: 6, title: "意义由谁决定？", emoji: "🎯", shortTitle: "意义来源" }
    ]
  },
  2: {
    id: 2,
    title: "什么是对，什么是错",
    subtitle: "探索道德与选择",
    emoji: "⚖️",
    color: "#0984E3",
    colorLight: "#74B9FF",
    description: "理解道德标准，学会正确选择",
    chapters: [
      { id: 1, title: "撒谎一定错吗？", emoji: "🤥", shortTitle: "诚实与谎言" },
      { id: 2, title: "帮同学作弊是对还是错？", emoji: "📝", shortTitle: "友谊与规则" },
      { id: 3, title: "规则一定要遵守吗？", emoji: "📜", shortTitle: "规则与良心" },
      { id: 4, title: "为什么要帮助别人？", emoji: "🤝", shortTitle: "利他主义" },
      { id: 5, title: "好事是为了什么？", emoji: "🎯", shortTitle: "动机与结果" },
      { id: 6, title: "谁来决定什么是对的？", emoji: "❓", shortTitle: "道德标准" }
    ]
  },
  3: {
    id: 3,
    title: "我们怎么知道是真的",
    subtitle: "探索知识与真理",
    emoji: "🔍",
    color: "#00B894",
    colorLight: "#55EFC4",
    description: "培养批判思维，辨别真假信息",
    chapters: [
      { id: 1, title: "眼睛看到的就是真的吗？", emoji: "👁️", shortTitle: "感官可靠" },
      { id: 2, title: "梦是真的还是假的？", emoji: "💭", shortTitle: "梦境与现实" },
      { id: 3, title: "别人说的就可信吗？", emoji: "👂", shortTitle: "信息来源" },
      { id: 4, title: "怎么证明一件事是对的？", emoji: "📐", shortTitle: "证明方法" },
      { id: 5, title: "科学就一定正确吗？", emoji: "🔬", shortTitle: "科学本质" },
      { id: 6, title: "真理是什么？", emoji: "✨", shortTitle: "真理本质" }
    ]
  },
  4: {
    id: 4,
    title: "什么才是公平的",
    subtitle: "探索正义与社会",
    emoji: "🤝",
    color: "#FDCB6E",
    colorLight: "#FFEAA7",
    description: "理解公平正义，建立社会意识",
    chapters: [
      { id: 1, title: "分蛋糕怎样才公平？", emoji: "🎂", shortTitle: "分配正义" },
      { id: 2, title: "为什么有人富有有人穷？", emoji: "💰", shortTitle: "贫富差距" },
      { id: 3, title: "惩罚是为了什么？", emoji: "⚖️", shortTitle: "惩罚目的" },
      { id: 4, title: "规则对谁都一样吗？", emoji: "📏", shortTitle: "规则平等" },
      { id: 5, title: "什么是正义？", emoji: "⚔️", shortTitle: "正义本质" },
      { id: 6, title: "社会应该是怎样的？", emoji: "🏛️", shortTitle: "理想社会" }
    ]
  },
  5: {
    id: 5,
    title: "什么是美好的",
    subtitle: "探索幸福与审美",
    emoji: "🎨",
    color: "#E84393",
    colorLight: "#FD79A8",
    description: "发现生活之美，追求真正幸福",
    chapters: [
      { id: 1, title: "什么是美？", emoji: "🖼️", shortTitle: "美的定义" },
      { id: 2, title: "美是主观的还是客观的？", emoji: "🪞", shortTitle: "审美标准" },
      { id: 3, title: "艺术是什么？", emoji: "🎭", shortTitle: "艺术本质" },
      { id: 4, title: "什么是好的生活？", emoji: "🌈", shortTitle: "美好生活" },
      { id: 5, title: "幸福和快乐有什么区别？", emoji: "😊", shortTitle: "幸福本质" },
      { id: 6, title: "什么是值得追求的？", emoji: "⭐", shortTitle: "人生追求" }
    ]
  }
};

// 获取所有书籍列表
export const getAllBooks = () => Object.values(BooksData);

// 获取单本书
export const getBook = (bookId) => BooksData[bookId];

// 获取章节
export const getChapter = (bookId, chapterId) => {
  const book = BooksData[bookId];
  return book?.chapters.find(c => c.id === chapterId);
};
