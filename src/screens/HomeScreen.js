import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { getAllBooks } from '../data/books';
import { Colors, FontSize, Spacing, BorderRadius } from '../theme/colors';

// 书籍卡片组件
const BookCard = ({ book, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: book.color }]}
      onPress={() => onPress(book)}
      activeOpacity={0.8}
    >
      <View style={styles.bookContent}>
        <Text style={styles.bookEmoji}>{book.emoji}</Text>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.bookSubtitle} numberOfLines={1}>
          {book.subtitle}
        </Text>
        <View style={styles.chapterIndicator}>
          <Text style={styles.chapterText}>
            {book.chapters.length} 章
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 首页组件
export default function HomeScreen({ navigation }) {
  const books = getAllBooks();

  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { bookId: book.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🌟</Text>
        <Text style={styles.headerTitle}>小小哲学家的思考之旅</Text>
        <Text style={styles.headerSubtitle}>
          和小朋友一起，探索人生的五个大问题
        </Text>
      </View>

      {/* 书籍列表 */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>选择一本书开始阅读</Text>
        
        <View style={styles.booksGrid}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={handleBookPress}
            />
          ))}
        </View>

        {/* 底部提示 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 每本书包含6个章节，带你层层深入思考
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
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerEmoji: {
    fontSize: FontSize.huge,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxlarge,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSize.normal,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.large,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  bookCard: {
    width: '47%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    minHeight: 180,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bookContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookEmoji: {
    fontSize: FontSize.xxlarge,
    marginBottom: Spacing.sm,
  },
  bookTitle: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: Colors.textInverse,
    marginBottom: Spacing.xs,
  },
  bookSubtitle: {
    fontSize: FontSize.small,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.md,
  },
  chapterIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  chapterText: {
    fontSize: FontSize.tiny,
    color: Colors.textInverse,
    fontWeight: '600',
  },
  footer: {
    marginTop: Spacing.xxl,
    padding: Spacing.lg,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSize.normal,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
