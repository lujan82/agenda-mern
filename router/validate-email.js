const validateEmail = async (req, res, next) => {
  console.log("en validate email", emailUser);
  try {
    if (emailUser != "") {
      console.log("dentro del next");
      next();
    } else {
      console.log("emailUser es null", emailUser);
    }
  } catch (error) {
    console.log("error en validateEmail", error);
  }
};

module.exports = validateEmail;
