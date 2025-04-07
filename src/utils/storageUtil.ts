export const removeApplicantInfo = () => {
  try {
    localStorage.removeItem("applicant-info");
  } catch (error) {
    console.error("Error while removing Applicant Info", error);
  }
};
