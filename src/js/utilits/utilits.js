export default {
  logout: async () => {
      header.logout();
    },
  openPopup: async () => {
      popup.setContent(popupSignin);

      popup.open();
      signInForm.init();
    },
  }