import StoreModule from '../module';

/**
 * Авторизация пользователя
 */
class AuthState extends StoreModule {
  initState() {
    return {
      isAuth: false,
      waiting: false,
      errorLogin: null,
      errorAuth: null,
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

        this.setState(
          {
            waiting: false,
            isAuth: true,
            errorLogin: null,
          },
          'Пользователь залогинен',
        );
      } else {
        const err = await response.json();
        throw new Error(err.error.data.issues[0].message);
      }
    } catch (error) {
      this.setState({
        errorLogin: error.message,
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
        this.setState(
          {
            waiting: false,
            isAuth: false,
          },
          'Пользователь вышел из аккаунта',
        );
      }
    } catch (error) {
      this.setState({
        waiting: false,
        errorLogin: error.message,
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

      if (response.ok) {
        this.setState(
          {
            waiting: false,
            isAuth: true,
            errorAuth: null,
          },
          'Пользователь авторизирован',
        );
      } else {
        const err = await response.json();
        throw new Error(err.error.data.issues[0].message);
      }
    } catch (error) {
      this.setState({
        waiting: false,
        isAuth: false,
        errorAuth: error.message,
      });
    }
  }
}

export default AuthState;
