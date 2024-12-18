export const VALIDATION_SCHEME = {
  general: {
    not_empty: {
      rule: /^$|\s/,
      message: "This field cannot be empty or have whitespaces",
    },
  },

  username: {
    name_length: {
      rule: /^.{2,20}$/,
      message: "Username must be between 2 and 20 characters long",
    },
    special_chars: {
      rule: /^[A-z0-9]*$/,
      message: "Username must not contain any special characters",
    },
  },
  password: {
    password_length: {
      rule: /^.{8,}$/,
      message: "Password must be at least 8 characters long",
    },
    lowercase: {
      rule: /[a-z]/g,
      message: "Password must contain at least one lowercase letter",
    },
    uppercase: {
      rule: /[A-Z]/g,
      message: "Password must contain at least one uppercase letter",
    },
    number: {
      rule: /[0-9]/g,
      message: "Password must contain at least one digit",
    },
  },
};
