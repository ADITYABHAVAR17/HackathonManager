const User = require("../models/User");
const generatePassword = require("./passwordgen");
const sendEmail = require("./sendEmail");

const handleOAuthUser = async (profile, provider, done) => {
  try {
    console.log(`Handling OAuth user for provider: ${provider}`);
    console.log("Profile data:", profile);
    const email = profile.emails?.[0]?.value;
    if (!email) return done(new Error(`${provider} email not available`));

    const existingUser = await User.findOne({ email });
    if (existingUser) return done(null, existingUser);

    console.log(`New user registration via ${provider}:`, profile);
    const pass = generatePassword();

    const mailOptions = {
      to: email,
      subject: "Welcome to Our App!",
      text: `Hello ${profile.displayName || profile.username},\n\nYour account has been created successfully!\n\nYour password is: ${pass}\n\nPlease change it after your first login.\n\nBest,\nYour App Team`,
    };

    console.log(`Sending welcome email to: ${email}`);
    await sendEmail(mailOptions);

    const newUser = await User.create({
      name: profile.displayName || profile.username,
      email,
      password: pass,
      role: "team",
      picture: profile.photos?.[0]?.value,
      [`${provider}Id`]: profile.id,
    });

    done(null, newUser);
  } catch (err) {
    done(err);
  }
};

module.exports = handleOAuthUser;
