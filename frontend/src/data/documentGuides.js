import studyPermit from "../assets/study-permit.jpg";
import passport from "../assets/passport.png";
import sinNumber from "../assets/sin-number.webp";
import driversLicense from "../assets/drivers-license.png";
import englishTest from "../assets/IELTS.png";


const documentGuides = {

  "Study Permit": {
    image: studyPermit,
    instructions:
      "Enter the expiry date shown on your study permit."
  },


  "SIN Number": {
    image: sinNumber,
    instructions:
      "Enter the date shown on your SIN document."
  },


  "Passport": {
    image: passport,
    instructions:
      "Enter your passport expiry date."
  },


  "Driver's License": {
    image: driversLicense,
    instructions:
      "Enter the expiry date shown on your driver's license."
  },


  "English Proficiency": {
    image: englishTest,
    instructions:
      "Enter the expiry date of your English proficiency certificate."
  }

};


export default documentGuides;