import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ProfileCard } from "../components/ProfileCard"
import { useApplicant } from "../hooks/useApplicant"

const ProfilePage = () => {
  const {Applicant} = useApplicant();
  return (
    <div>
      <main className="mx-auto max-w-xl p-6 md:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-pretty font-sans text-2xl font-semibold tracking-tight">Hii , {Applicant?.firstName}</h1>
      </header>

      {
        Applicant ? (<ProfileCard profile={Applicant}/>) :(
          <div>
            <LoadingSpinner/>
          </div>
        )
      }
    </main>
    </div>
  )
}

export default ProfilePage