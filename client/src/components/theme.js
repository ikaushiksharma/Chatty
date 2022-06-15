function theme() {
  return {
    colorThemes: [
      "red", //#f7e8a4
      "dark-blue", // #172A3A
      "green", // #d9c5b2
      "black", // #04A777
    ],
    themeClass: {},
    choiceClass(className) {
      const classes = { "color-choice": true };
      classes[className] = true;
      return classes;
    },
    changeTheme(className) {
      this.themeClass = this.colorThemes.reduce((allClasses, cn) => {
        allClasses[cn] = className === cn;
        return allClasses;
      }, {});
    },
  };
}
