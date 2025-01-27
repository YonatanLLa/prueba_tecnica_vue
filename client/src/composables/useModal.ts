import { useModalConfigService } from "../services/modalConfigService";

export const useModal = () => {
  const {
    openFirstModal,
    openSecondModal,
    openThirdModal,
    openConfigModal,
    openConfigModalTwo,
  } = useModalConfigService();

  return {
    openFirstModal,
    openSecondModal,
    openThirdModal,
    openConfigModal,
    openConfigModalTwo,
  };
};
