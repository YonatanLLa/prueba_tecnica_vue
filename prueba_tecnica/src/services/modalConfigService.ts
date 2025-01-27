import { useModalStore } from "../stores/modalStore";

export const useModalConfigService = () => {
  const modalStore = useModalStore();
  const openFirstModal = () => {
    modalStore.showModal({
      title: "Welcome to Legendaryum",
      content:
        "Enjoy amazing games, live unique experiences and win prizes in missions and tournaments. The adventure begins! 🚀",
      image: "/images/first_image.png",
      isVisibleModal: false,
      buttonText: "Next",
      cancelText: "",
      onNext: openSecondModal,
    });
  };

  const openSecondModal = () => {
    modalStore.showModal({
      title: "Gaming Passport",
      content:
        "Create your password and activate your Gaming Passport. Earn points, compete in hundreds of games and win great prizes. 🏆",
      isVisibleModal: true,
      isActionFromModal: true,
      isSecondModal: true,
      image: "/images/first_image.png",
      buttonText: "Save and continue ",
      cancelText: "Create later",
      onNext: openThirdModal,
    });
  };

  const openThirdModal = () => {
    modalStore.showModal({
      title: "Regalo de bienvenida",
      content:
        "Sign up and earn 1400 Legends Coins 💎 to create your Home, virtual worlds and a Hall of Fame. Live Legendaryum! 🌐✨",
      isVisibleImage: true,
      image: "/images/form_img.png",
      buttonText: "Create island now",
      cancelText: "Create later",
      isValidationIsland: true,
      onNext: () => {
        modalStore.hideModal();
      },
    });
  };

  // Configuración dinámica
  const openConfigModal = () => {
    modalStore.showModal({
      title: "My Gaming Passport",
      content:
        "Use your password and activate your Game Passport in hundreds of games. Earn points, compete and win great prizes. 🏆",
      buttonText: "Edit password",
      isVisibleNavegation: true,
      cancelText: "Close",
      image: "/images/first_image.png",
      isVisibleFromModal: true,
      isVisibleModal: true,
      onNext: openConfigModalTwo,
    });
  };

  const openConfigModalTwo = () => {
    modalStore.showModal({
      title: "My Gaming Passport 2",
      content:
        "Use your password and activate your Game Passport in hundreds of games. Earn points, compete and win great prizes. 🏆",
      buttonText: "Save password",
      cancelText: "Cancel",
      image: "/images/first_image.png",
      isVisibleModal: true,
      isActionFromModal: true,
      isVisibleNavegation: true,
      isVisibleBottomEdit: true,
      onNext: () => {
        modalStore.hideModal();
      },
    });
  };

  return {
    openFirstModal,
    openSecondModal,
    openThirdModal,
    openConfigModal,
    openConfigModalTwo,
  };
};
