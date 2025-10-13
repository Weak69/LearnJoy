import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AnimatedIcon, LetterIcon, MathIcon, DrawIcon, StoryIcon, VoiceIcon } from '@/components/ui/AnimatedIcon';

export default function LearnScreen() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();

  const learningModules = [
    {
      id: 'bangla',
      title: t('alphabet.bangla'),
      subtitle: t('alphabet.title'),
      icon: 'text',
      color: theme.colors.primary,
      onPress: () => router.push('/bangla-alphabet'),
    },
    {
      id: 'english',
      title: t('alphabet.english'),
      subtitle: t('alphabet.title'),
      icon: 'text',
      color: theme.colors.primaryLight,
      onPress: () => router.push('/english-alphabet'),
    },
  ];

  const quickActions = [
    {
      id: 'math',
      title: t('nav.math'),
      icon: 'calculator',
      color: theme.colors.secondary,
      onPress: () => router.push('/math'),
    },
    {
      id: 'draw',
      title: t('nav.draw'),
      icon: 'create',
      color: theme.colors.accent,
      onPress: () => router.push('/draw'),
    },
    {
      id: 'story',
      title: t('nav.story'),
      icon: 'library',
      color: theme.colors.accentLight,
      onPress: () => router.push('/story'),
    },
    {
      id: 'speak',
      title: t('nav.speak'),
      icon: 'mic',
      color: theme.colors.primary,
      onPress: () => router.push('/speak'),
    },
  ];

  const renderAnimatedIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'text':
        return <LetterIcon color={color} size={32} animation="pulse" />;
      case 'calculator':
        return <MathIcon color={color} size={32} animation="rotate" />;
      case 'create':
        return <DrawIcon color={color} size={32} animation="pulse" />;
      case 'library':
        return <StoryIcon color={color} size={32} animation="wiggle" />;
      case 'mic':
        return <VoiceIcon color={color} size={32} animation="pulse" />;
      default:
        return <Ionicons name={iconName as any} size={32} color={color} />;
    }
  };

  const renderModuleVisual = (moduleId: string, color: string) => {
    if (moduleId === 'bangla') {
      return <Text style={[styles.sampleLetters, { color }]}>অ / ক</Text>;
    }
    if (moduleId === 'english') {
      return <Text style={[styles.sampleLetters, { color }]}>Aa</Text>;
    }
    return renderAnimatedIcon('text', color);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryLight]}
        style={styles.headerGradient}
      >
        <Header
          title={t('alphabet.title')}
          subtitle={`${t('alphabet.bangla')} & ${t('alphabet.english')}`}
          variant="transparent"
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
        />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Language Toggle */}
        <View style={styles.languageToggleContainer}>
          <Button
            title={t('alphabet.bangla')}
            onPress={() => setLanguage('bangla')}
            variant={language === 'bangla' ? 'primary' : 'outline'}
            size="small"
            style={styles.languageButton}
          />
          <Button
            title={t('alphabet.english')}
            onPress={() => setLanguage('english')}
            variant={language === 'english' ? 'primary' : 'outline'}
            size="small"
            style={styles.languageButton}
          />
        </View>

        {/* Learning Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('alphabet.title')}</Text>
          <View style={styles.modulesGrid}>
            {learningModules.map((module) => (
              <Card
                key={module.id}
                variant="elevated"
                padding="large"
                borderRadius="large"
                onPress={module.onPress}
                style={styles.moduleCard}
              >
                <View style={styles.moduleContent}>
                  {renderModuleVisual(module.id, module.color)}
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <Card
                key={action.id}
                variant="default"
                padding="medium"
                borderRadius="large"
                onPress={action.onPress}
                style={styles.quickActionCard}
              >
                <View style={styles.quickActionContent}>
                  {renderAnimatedIcon(action.icon, action.color)}
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Progress Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <Card variant="gradient" gradientColors={[theme.colors.secondary, theme.colors.secondaryLight]} padding="large">
            <View style={styles.progressContent}>
              <Ionicons name="trophy" size={24} color={theme.colors.white} />
              <Text style={styles.progressText}>Great job learning today!</Text>
              <Text style={styles.progressSubtext}>Keep up the excellent work</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerGradient: {
    paddingTop: 20,
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.h3,
  },
  headerSubtitle: {
    color: theme.colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  languageToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  languageButton: {
    flex: 1,
    maxWidth: 120,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.h5,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  modulesGrid: {
    gap: theme.spacing.md,
  },
  moduleCard: {
    minHeight: 100,
  },
  moduleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTitle: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
  },
  moduleSubtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickActionCard: {
    width: '47%',
    minHeight: 80,
  },
  quickActionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: theme.typography.body,
    fontWeight: theme.typography.medium,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: theme.typography.h6,
    fontWeight: theme.typography.bold,
    color: theme.colors.white,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  progressSubtext: {
    fontSize: theme.typography.caption,
    color: theme.colors.white,
    opacity: 0.9,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  sampleLetters: {
    fontSize: 32,
    fontWeight: theme.typography.bold,
  },
});
