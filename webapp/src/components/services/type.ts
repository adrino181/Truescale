export type login = {
  email?: string;
  password?: string;
  credential?: string;
};

export type register = {
  email: string;
  password: string;
};

export type resetPassword = {
  password: string;
};
