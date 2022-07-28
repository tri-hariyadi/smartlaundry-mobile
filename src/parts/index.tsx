import Header from './Header';
import Card from './Card';
import Alert, { AlertCompProps } from './Alert';
import LoadingRect from './SkletonLoading/LoadingRect';
import LoadingText from './SkletonLoading/LoadingText';
import Row from './SkletonLoading/Row';
import CardLoading from './SkletonLoading/CardLoading';
import BottomModal from './BottomModal';
import ErrorIndicator from './ErrorIndicator';
// import RemotePushController from './RemotePushController';

export {
  Header,
  Card,
  Alert,
  LoadingRect,
  LoadingText,
  Row,
  CardLoading,
  BottomModal,
  ErrorIndicator,
  // RemotePushController,
};

export interface AlertProps {
  showAlert: (_param: AlertCompProps) => void;
  hideAlert: () => void;
}

export interface BottomModalProps {
  show: () => void;
  dismiss: () => void;
}
