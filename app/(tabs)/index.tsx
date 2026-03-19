import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import skills from '../../skills.json';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/catavatar.jpg')}
          style={styles.profileImage}
          resizeMode="cover"
        />

        <Text style={styles.name}>Adna Jasarevic</Text>

        <Text style={styles.bio}>
          Computer science student with a strong interest in cybersecurity, digital
          forensics, and secure software development. Passionate about understanding
          how systems work under the hood, identifying vulnerabilities, and building
          secure and reliable applications. Currently working on projects related to
          memory analysis, system security, and modern web and mobile technologies.
        </Text>

        <View style={styles.divider} />

        <ScrollView contentContainerStyle={styles.skillsContainer}>
          {skills.map((item, index) => (
            <View
              key={index}
              style={[styles.skillTag, { backgroundColor: item.color }]}
            >
              <Text style={styles.skillText}>
                {item.skill} {getLevelEmoji(item.level)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function getLevelEmoji(level: string) {
  if (level === 'advanced') return '💪';
  if (level === 'intermediate') return '👍';
  if (level === 'beginner') return '🔥';
  return '';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  card: {
    width: 330,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cfcfcf',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  profileImage: {
    width: '100%',
    height: 140,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },

  bio: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  skillTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    margin: 3,
  },

  skillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
});