import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: 'ru',
    };
  }

  changeLanguage(ln) {
    this.setState({ currentLanguage: ln }, 'language changed');
  }
}

export default Language;
