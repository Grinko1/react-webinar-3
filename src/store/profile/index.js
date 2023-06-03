import StoreModule from '../module';

/**
 * Получение информации о профиле
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      waiting: false,
      error: null,
    };
  }

  async getCurrentUserInfo() {
    this.setState({
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const { result } = await response.json();
        this.setState(
          {
            profile: {
              name: result.profile.name,
              phone: result.profile.phone,
              email: result.email,
            },
            waiting: false,
          },
          'Полученна информация о профиле',
        );
      } else {
        const err = await response.json();
        throw new Error(err.error.data.issues[0].message);
      }
    } catch (error) {
      this.setState({
        userProfile: {},
        waiting: false,
        error: error.message,
      });
    }
  }
}

export default ProfileState;
