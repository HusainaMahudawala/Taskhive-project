export const getUsers= ()=>{
    const users=JSON.parse(localStorage.getItem("taskhive_users"));
    return users ? users: [];
}

export const saveUsers=(users)=>{
    localStorage.setItem("taskhive_users",JSON.stringify(users));
}

export const setLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("loggedInUser");
};

