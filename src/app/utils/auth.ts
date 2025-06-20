export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

const USERS_STORAGE_KEY = 'komisar_pivo_users';
const CURRENT_USER_KEY = 'komisar_pivo_current_user';

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

const saveCurrentUser = (user: Omit<User, 'password'>): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const register = (
  name: string,
  email: string,
  password: string
): AuthResponse => {
  const users = getUsers();
  
  if (users.some(user => user.email === email)) {
    return {
      success: false,
      message: 'Пользователь с таким email уже существует'
    };
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    role: 'user'
  };

  users.push(newUser);
  saveUsers(users);

  const userWithoutPassword: Omit<User, 'password'> = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
    role: newUser.role
  };
  saveCurrentUser(userWithoutPassword);

  return {
    success: true,
    message: 'Регистрация успешна',
    user: userWithoutPassword
  };
};

export const login = (email: string, password: string): AuthResponse => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return {
      success: false,
      message: 'Неверный email или пароль'
    };
  }

  const userWithoutPassword: Omit<User, 'password'> = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role
  };
  saveCurrentUser(userWithoutPassword);

  return {
    success: true,
    message: 'Вход выполнен успешно',
    user: userWithoutPassword
  };
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const updateUserProfile = (
  userId: string,
  updates: Partial<Omit<User, 'id' | 'role'>>
): AuthResponse => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return {
      success: false,
      message: 'Пользователь не найден'
    };
  }

  const updatedUser = {
    ...users[userIndex],
    name: updates.name || users[userIndex].name,
    email: updates.email || users[userIndex].email,
  };

  users[userIndex] = updatedUser;
  saveUsers(users);

  const userWithoutPassword: Omit<User, 'password'> = {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
    role: updatedUser.role
  };

  saveCurrentUser(userWithoutPassword);

  return {
    success: true,
    message: 'Профиль обновлен успешно',
    user: userWithoutPassword
  };
}; 