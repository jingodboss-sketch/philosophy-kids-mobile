// 移动端主题颜色 - 针对手机屏幕优化对比度
export const Colors = {
  // 主色调
  primary: '#5B8DEE',
  primaryLight: '#8BB4F5',
  primaryDark: '#3A6FD8',
  
  // 书籍颜色
  book1: '#E17055',
  book1Light: '#FAB1A0',
  book2: '#0984E3',
  book2Light: '#74B9FF',
  book3: '#00B894',
  book3Light: '#55EFC4',
  book4: '#FDCB6E',
  book4Light: '#FFEAA7',
  book5: '#E84393',
  book5Light: '#FD79A8',
  
  // 功能色
  accent: '#FF9F43',
  success: '#26DE81',
  warning: '#FED330',
  danger: '#FC5C65',
  purple: '#A55EEA',
  pink: '#FD79A8',
  
  // 背景色
  background: '#FFF9F0',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F0E8',
  
  // 文字色 - 确保在手机上清晰可读
  text: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#B2BEC3',
  textInverse: '#FFFFFF',
  
  // 边框和分割线
  border: '#E8E0D5',
  divider: '#F0EBE3',
  
  // 阴影
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
};

// 字体大小 - 针对手机屏幕优化
export const FontSize = {
  tiny: 10,
  small: 12,
  normal: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24,
  huge: 28,
  title: 32,
};

// 间距 - 针对触摸操作优化
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  huge: 32,
};

// 圆角
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

// 触摸目标最小尺寸（符合 Material Design 规范）
export const TouchTarget = {
  min: 44,
  comfortable: 48,
};
