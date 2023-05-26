import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: 'en',
    };
  }

  changeLanguage(ln) {
    this.setState({ currentLanguage: ln }, 'language changed');
  }
}

export default Language;
