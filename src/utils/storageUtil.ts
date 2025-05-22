export const removeApplicantInfo = () => {
  try {
    localStorage.removeItem("applicant-info");
    localStorage.removeItem("user-applications");
  } catch (error) {
    console.error("Error while removing Applicant Info", error);
  }
};
