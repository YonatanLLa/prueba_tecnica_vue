export interface ModalConfig {
  title: string;
  content: string;
  image?: string;
  isVisibleModal?: boolean;
  isVisibleNavegation?: boolean;
  isActionFromModal?: boolean;
  isFinalizedModal?: boolean;
  isValidationIsland?: boolean;
  isVisibleImage?: boolean;
  isVisibleFromModal?: boolean;
  isVisibleBottomEdit?: boolean;
  isSecondModal?: boolean;
  buttonText: string;
  cancelText: string;
  onNext: () => void;
}
