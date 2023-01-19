const formatUserForDB = (userObj) => {
 
  const newUser = {
    name: userObj.name,
    email: userObj.email,
    password: userObj.password,
    address: userObj.address,
    age: userObj.age,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}