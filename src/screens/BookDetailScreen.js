import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getBook } from '../data/books';
import { Colors, FontSize, Spacing, BorderRadius } from '../theme/colors';

// 章节卡片组件
const ChapterCard = ({ chapter, bookColor, onPress, index }) => {
  return (
    <TouchableOpacity
      style={styles.chapterCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* 左侧序号指示器 */}
      <View style={[styles.chapterNumber, { backgroundColor: bookColor }]}>
        <Text style={styles.chapterNumberText}>{index + 1}</Text>
      </View>
      
      {/* 中间内容 */}
      <View style={styles.chapterContent}>
        <Text style={styles.chapterEmoji}>{chapter.emoji}</Text>
        <Text style={styles.chapterTitle} numberOfLines={2}>
          {chapter.title}
        </Text>
        <Text style={styles.chapterShortTitle}>{chapter.shortTitle}</Text>
      </View>
      
      {/* 右侧箭头 */}
      <View style={styles.arrowContainer}>
        <Text style={[styles.arrow, { color: bookColor }]}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function BookDetailScreen({ route, navigation }) {
  const { bookId } = route.params;
  const book = getBook(bookId);

  const handleChapterPress = (chapter) => {
    navigation.navigate('Chapter', { 
      bookId: book.id, 
      chapterId: chapter.id 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backArrow, { color: book.color }]}>←</Text>
          <Text style={[styles.backText, { color: book.color }]}>返回</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 书籍信息头部 */}
        <View style={[styles.bookHeader, { backgroundColor: book.color }]}>
          <Text style={styles.bookEmoji}>{book.emoji}</Text>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
          <Text style={styles.bookDescription}>{book.description}</Text>
        </View>

        {/* 章节列表 */}
        <View style={styles.chaptersContainer}>
          <Text style={styles.sectionTitle}>章节列表</Text>
          
          {book.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              bookColor={book.color}
              index={index}
              onPress={() => handleChapterPress(chapter)}
            />
          ))}
        </View>

        {/* 底部提示 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 点击章节开始阅读，建议按顺序阅读
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: FontSize.xlarge,
    marginRight: Spacing.xs,
  },
  backText: {
    fontSize: FontSize.normal,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  bookHeader: {
    padding: Spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  bookEmoji: {
    fontSize: FontSize.title,
    marginBottom: Spacing.md,
  },
  bookTitle: {
    fontSize: FontSize.xxlarge,
    fontWeight: 'bold',
    color: Colors.textInverse,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  bookSubtitle: {
    fontSize: FontSize.large,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  bookDescription: {
    fontSize: FontSize.normal,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  chaptersContainer: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.large,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chapterNumber: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chapterNumberText: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: Colors.textInverse,
  },
  chapterContent: {
    flex: 1,
  },
  chapterEmoji: {
    fontSize: FontSize.large,
    marginBottom: Spacing.xs,
  },
  chapterTitle: {
    fontSize: FontSize.normal,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  chapterShortTitle: {
    fontSize: FontSize.small,
    color: Colors.textTertiary,
  },
  arrowContainer: {
    paddingLeft: Spacing.sm,
  },
  arrow: {
    fontSize: FontSize.xlarge,
    fontWeight: 'bold',
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSize.small,
    color: Colors.textTertiary,
  },
});
