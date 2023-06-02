import StoreModule from '../module';

/**
 * Авторизация пользователя
 */
class UserState extends StoreModule {
  initState() {
    return {
      isAuth: false,
      userProfile: {},
      waiting: false,
      error: null,
    };
  }

  async login(data) {
    this.setState({
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { result } = await response.json();
        localStorage.setItem('token', result.token);
        this.setState({
          userProfile: {
            name: result.user.profile.name,
            phone: result.user.profile.phone,
            email: result.user.email,
          },
          waiting: false,
          isAuth: true,
        });
      } else {
        const err = await response.json();
        throw new Error(err.error.data.issues[0].message);
      }
    } catch (error) {
      this.setState({
        error: error.message,
        waiting: false,
      });
    }
  }

  async logout() {
    this.setState({
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1//users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        this.setState({
          userProfile: {},
          waiting: false,
          isAuth: false,
        });
      }
    } catch (error) {
      this.setState({
        waiting: false,
      });
    }
  }

  async loginByToken() {
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

      const { result } = await response.json();
      this.setState({
        userProfile: {
          name: result.profile.name,
          phone: result.profile.phone,
          email: result.email,
        },
        waiting: false,
        isAuth: true,
      });
    } catch (error) {
      this.setState({
        userProfile: {},
        waiting: false,
        isAuth: false,
      });
    }
  }
}

export default UserState;
