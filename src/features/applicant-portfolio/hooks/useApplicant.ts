import { useApplicantStore } from "../store/ApplicantProfile.Store"

export const useApplicant = () => {
    const store = useApplicantStore();

    return {
        //state
        Applicant : store.Applicant,
        loading :store.loading,

        //Actions
        getApplicantInfo : async (input : string) => {
            await store.getApplicantInfo(input);
        }
    }
}