interface User {
  id: string
  username: string
}

interface RegisterArgs {
  username: string
  password: string
}

const MockUserAPI = {
  register({ username }: RegisterArgs): Promise<User> {
    return Promise.resolve({ username, id: (Math.random() * 10000).toFixed(0) })
  },
}

export const UserAPI = MockUserAPI
