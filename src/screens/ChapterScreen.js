import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { getBook, getChapter } from '../data/books';
import { Colors, FontSize, Spacing, BorderRadius } from '../theme/colors';

const { width } = Dimensions.get('window');

// 选项按钮组件
const OptionButton = ({ option, letter, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.optionButton,
      isSelected && styles.optionButtonSelected
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[
      styles.optionLetter,
      isSelected && styles.optionLetterSelected
    ]]}>
      <Text style={[
        styles.optionLetterText,
        isSelected && styles.optionLetterTextSelected
      ]]}>{letter}</Text>
    </View>
    <Text style={[
      styles.optionText,
      isSelected && styles.optionTextSelected
    ]}>{option}</Text>
  </TouchableOpacity>
);

export default function ChapterScreen({ route, navigation }) {
  const { bookId, chapterId } = route.params;
  const book = getBook(bookId);
  const chapter = getChapter(bookId, chapterId);
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;

  // 模拟章节内容数据
  const chapterContent = {
    scenario: {
      text: `星期天下午，小明刚写完作业，躺在沙发上发呆。"玩什么好呢？"他翻了个身，"玩手机没意思，看电视没意思，做什么都无聊……"`,
      questions: ["你有没有过和小明一样的感觉？", "为什么有的时候会觉得无聊？"]
    },
    deepThinking: [
      {
        id: "dt1",
        question: "你觉得'无聊'是一种不好的感觉吗？",
        options: ["是，无聊让人难受", "不一定，无聊也有好处", "没想过这个问题"],
        feedback: "很多人觉得无聊是坏事，但哲学家会说，无聊其实是一个信号——它在告诉你，你需要找到真正让你投入的事情。"
      },
      {
        id: "dt2",
        question: "小狗会不会觉得无聊？一棵树会不会觉得无聊？",
        options: ["小狗会，树不会", "都会", "都不会", "不确定"],
        feedback: "小狗可能会无聊，因为它需要玩耍和探索。但树不会——因为它不会'思考'。哲学家会说，只有会思考的生命，才会感到无聊。"
      }
    ],
    philosophers: [
      {
        name: "亚里士多德",
        era: "古希腊",
        theory: "人活着是为了追求幸福。真正的幸福不是短暂的快乐，而是一种充实、有德性的生活。",
        quote: "幸福是生命的意义和目的"
      },
      {
        name: "斯宾诺莎",
        era: "近代荷兰",
        theory: "人活着是为了追求快乐。但快乐不是放纵，而是理解世界、顺应自然规律后内心的平静。",
        quote: "人的最高幸福是清醒的头脑"
      }
    ],
    experiment: {
      title: "永远不无聊的世界",
      content: "想象有一种魔法，让你永远不会感到无聊——你想做什么就能做什么，完全不会腻。",
      question: "如果你永远不会无聊，你第一件事想做什么？",
      options: ["吃遍所有好吃的", "玩遍所有游戏", "学习新知识", "交很多朋友"],
      feedback: "你的选择反映了你在乎什么！哲学家会说，这就是你在寻找的'意义'。"
    },
    reflection: {
      question: "读完这一章，你对'无聊'有什么新的看法？",
      options: [
        { text: "无聊其实是身体在提醒我：需要找点有意义的事情做", feedback: "太棒了！这就是在寻找人生意义的第一步" },
        { text: "无聊说明我现在的状态不对，应该找到真正让我兴奋的事情", feedback: "哲学家斯宾诺莎会说，真正的快乐来自于内心的充实" },
        { text: "无聊的时候正是思考的好时机", feedback: "苏格拉底说过：'未经审视的人生不值得过'" },
        { text: "有时候无聊也是正常的，不需要特别在意", feedback: "这也是一种观点，给自己放松的时间也是生活的一部分" }
      ]
    }
  };

  const handleOptionSelect = (sectionId, optionIndex) => {
    setSelectedOptions(prev => ({ ...prev, [sectionId]: optionIndex }));
    setShowFeedback(prev => ({ ...prev, [sectionId]: true }));
  };

  const handleNextChapter = () => {
    const nextChapterId = chapterId + 1;
    if (nextChapterId <= book.chapters.length) {
      navigation.replace('Chapter', { bookId, chapterId: nextChapterId });
    } else {
      navigation.navigate('BookDetail', { bookId });
    }
  };

  // 进度条动画
  const progress = (chapterId / book.chapters.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: book.color }]}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: book.color }]} />
          </View>
          <Text style={styles.progressText}>{chapterId}/{book.chapters.length}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* 章节标题 */}
        <View style={styles.titleSection}>
          <Text style={styles.chapterEmoji}>{chapter.emoji}</Text>
          <Text style={styles.chapterLabel}>第{chapterId}章</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
        </View>

        {/* 生活场景 */}
        <View style={styles.section}>
          <View style={[styles.sectionLabel, { backgroundColor: Colors.accent }]}>
            <Text style={styles.sectionLabelText}>🏠 生活场景</Text>
          </View>
          <View style={styles.scenarioBox}>
            <Text style={styles.scenarioText}>{chapterContent.scenario.text}</Text>
          </View>
          {chapterContent.scenario.questions.map((q, idx) => (
            <View key={idx} style={styles.questionRow}>
              <Text style={styles.questionIcon}>?</Text>
              <Text style={styles.questionText}>{q}</Text>
            </View>
          ))}
        </View>

        {/* 层层递进思考 */}
        <View style={styles.section}>
          <View style={[styles.sectionLabel, { backgroundColor: Colors.purple }]}>
            <Text style={styles.sectionLabelText}>🤔 层层递进思考</Text>
          </View>
          {chapterContent.deepThinking.map((item, index) => (
            <View key={item.id} style={styles.thinkingStep}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: Colors.purple }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepQuestion}>{item.question}</Text>
              </View>
              <View style={styles.optionsContainer}>
                {item.options.map((option, optIdx) => (
                  <OptionButton
                    key={optIdx}
                    option={option}
                    letter={String.fromCharCode(65 + optIdx)}
                    isSelected={selectedOptions[item.id] === optIdx}
                    onPress={() => handleOptionSelect(item.id, optIdx)}
                  />
                ))}
              </View>
              {showFeedback[item.id] && (
                <View style={styles.feedbackBox}>
                  <Text style={styles.feedbackLabel}>💡 思考一下</Text>
                  <Text style={styles.feedbackText}>{item.feedback}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* 哲学家的思考 */}
        <View style={styles.section}>
          <View style={[styles.sectionLabel, { backgroundColor: book.color }]}>
            <Text style={styles.sectionLabelText}>📜 哲学家的思考</Text>
          </View>
          {chapterContent.philosophers.map((philo, idx) => (
            <View key={idx} style={[styles.philoCard, { borderLeftColor: book.color }]}>
              <View style={styles.philoHeader}>
                <View style={[styles.philoAvatar, { backgroundColor: book.color }]}>
                  <Text style={styles.philoAvatarText}>👤</Text>
                </View>
                <View>
                  <Text style={styles.philoName}>{philo.name}</Text>
                  <Text style={styles.philoEra}>{philo.era}</Text>
                </View>
              </View>
              <Text style={styles.philoTheory}>{philo.theory}</Text>
              <View style={styles.quoteBox}>
                <Text style={[styles.quoteText, { color: book.color }]}>"{philo.quote}"</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 思想实验 */}
        <View style={styles.section}>
          <View style={styles.experimentBox}>
            <View style={styles.experimentHeader}>
              <Text style={styles.experimentIcon}>🧪</Text>
              <Text style={styles.experimentTitle}>思想实验：{chapterContent.experiment.title}</Text>
            </View>
            <Text style={styles.experimentContent}>{chapterContent.experiment.content}</Text>
            <Text style={styles.experimentQuestion}>{chapterContent.experiment.question}</Text>
            <View style={styles.optionsContainer}>
              {chapterContent.experiment.options.map((option, idx) => (
                <OptionButton
                  key={idx}
                  option={option}
                  letter={String.fromCharCode(65 + idx)}
                  isSelected={selectedOptions['experiment'] === idx}
                  onPress={() => handleOptionSelect('experiment', idx)}
                />
              ))}
            </View>
            {showFeedback['experiment'] && (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackLabel}>💡 思考一下</Text>
                <Text style={styles.feedbackText}>{chapterContent.experiment.feedback}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 我的思考 */}
        <View style={styles.section}>
          <View style={styles.reflectionBox}>
            <View style={styles.reflectionHeader}>
              <Text style={styles.reflectionIcon}>💭</Text>
              <Text style={[styles.reflectionTitle, { color: Colors.purple }]}>我的思考</Text>
            </View>
            <Text style={styles.reflectionQuestion}>{chapterContent.reflection.question}</Text>
            <View style={styles.optionsContainer}>
              {chapterContent.reflection.options.map((option, idx) => (
                <OptionButton
                  key={idx}
                  option={option.text}
                  letter={String.fromCharCode(65 + idx)}
                  isSelected={selectedOptions['reflection'] === idx}
                  onPress={() => handleOptionSelect('reflection', idx)}
                />
              ))}
            </View>
            {showFeedback['reflection'] && (
              <View style={[styles.feedbackBox, { backgroundColor: '#E8F5E9' }]}>
                <Text style={[styles.feedbackLabel, { color: '#2E7D32' }]}>🌟 哲学家点评</Text>
                <Text style={styles.feedbackText}>
                  {chapterContent.reflection.options[selectedOptions['reflection']]?.feedback}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 下一章按钮 */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: book.color }]}
            onPress={handleNextChapter}
          >
            <Text style={styles.nextButtonText}>
              {chapterId < book.chapters.length ? '下一章 →' : '完成本书 🎉'}
            </Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: {
    padding: Spacing.sm,
  },
  backArrow: {
    fontSize: FontSize.xxlarge,
    color: Colors.text,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: Spacing.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.divider,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: FontSize.small,
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  chapterEmoji: {
    fontSize: FontSize.huge,
    marginBottom: Spacing.md,
  },
  chapterLabel: {
    fontSize: FontSize.normal,
    color: Colors.textTertiary,
    marginBottom: Spacing.xs,
  },
  chapterTitle: {
    fontSize: FontSize.xxlarge,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  sectionLabelText: {
    fontSize: FontSize.small,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  scenarioBox: {
    backgroundColor: '#FFF5E6',
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  scenarioText: {
    fontSize: FontSize.normal,
    color: Colors.text,
    lineHeight: 24,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  questionIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.warning,
    borderRadius: BorderRadius.full,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: FontSize.small,
    fontWeight: 'bold',
    color: Colors.textInverse,
    marginRight: Spacing.sm,
  },
  questionText: {
    flex: 1,
    fontSize: FontSize.normal,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  thinkingStep: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    fontSize: FontSize.normal,
    fontWeight: 'bold',
    color: Colors.textInverse,
  },
  stepQuestion: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: Colors.surface,
    borderColor: Colors.primary,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  optionLetterSelected: {
    backgroundColor: Colors.primary,
  },
  optionLetterText: {
    fontSize: FontSize.small,
    fontWeight: 'bold',
    color: Colors.textInverse,
  },
  optionLetterTextSelected: {
    color: Colors.textInverse,
  },
  optionText: {
    flex: 1,
    fontSize: FontSize.normal,
    color: Colors.text,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: Colors.text,
    fontWeight: '500',
  },
  feedbackBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  feedbackLabel: {
    fontSize: FontSize.small,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  feedbackText: {
    fontSize: FontSize.normal,
    color: Colors.text,
    lineHeight: 22,
  },
  philoCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  philoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  philoAvatar: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  philoAvatarText: {
    fontSize: FontSize.large,
  },
  philoName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: Colors.text,
  },
  philoEra: {
    fontSize: FontSize.small,
    color: Colors.textTertiary,
  },
  philoTheory: {
    fontSize: FontSize.normal,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  quoteBox: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  quoteText: {
    fontSize: FontSize.normal,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  experimentBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  experimentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  experimentIcon: {
    fontSize: FontSize.xlarge,
    marginRight: Spacing.sm,
  },
  experimentTitle: {
    flex: 1,
    fontSize: FontSize.large,
    fontWeight: '600',
    color: '#2E7D32',
  },
  experimentContent: {
    fontSize: FontSize.normal,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  experimentQuestion: {
    fontSize: FontSize.medium,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  reflectionBox: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  reflectionIcon: {
    fontSize: FontSize.xlarge,
    marginRight: Spacing.sm,
  },
  reflectionTitle: {
    fontSize: FontSize.large,
    fontWeight: '600',
  },
  reflectionQuestion: {
    fontSize: FontSize.medium,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  nextButton: {
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: FontSize.large,
    fontWeight: '600',
    color: Colors.textInverse,
  },
});
