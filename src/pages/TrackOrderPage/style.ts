import { Platform, StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@utils/colors';
import customFont from '@utils/fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  contentContainer: {
    paddingHorizontal: normalizeDimens(15),
    paddingTop: normalizeDimens(15),
  },
  contentPage: {
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  header: {
    padding: normalizeDimens(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
    marginBottom: Platform.OS === 'android' ? -2 : 0,
  },
  headerDesc: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: colors.border,
  },
  content: {
    paddingHorizontal: normalizeDimens(20),
  },
  styleloadingRect: {
    borderRadius: 49,
  },
  loadingContainer: {
    paddingHorizontal: normalizeDimens(15),
  },
  listContainerStyle: {
    flexGrow: 1,
  },
  listEmptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
