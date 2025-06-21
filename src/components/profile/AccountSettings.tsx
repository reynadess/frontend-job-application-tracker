import { ChangePassword } from './ChangePassword';

type Props = {};
export const AccountSettings = ({}: Props) => {
    return (
        <div className="flex h-full w-full flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border p-3">
                <p className="text-lg">Password and Authentication</p>
                <ChangePassword />
            </div>
        </div>
    );
};
