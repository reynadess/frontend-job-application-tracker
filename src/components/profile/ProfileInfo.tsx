import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const ProfileInfo = () => {
    // Mock session data
    const session = {
        data: {
            user: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                image: 'https://via.placeholder.com/150',
            },
        },
    };

    return (
        <div className="my-3 flex flex-col items-start justify-center gap-4">
            <div className="mt-2 flex w-full rounded-md border p-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={session.data.user.image} />
                    <AvatarFallback>{session.data.user.name}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex min-h-[40vh] w-full flex-col gap-4 rounded-md border p-4">
                <div className="mb-3 flex items-center justify-between">
                    <span>Profile Info</span>
                </div>
                <div className="flex flex-col gap-4">
                    <Label>Name</Label>
                    <Input
                        disabled
                        value={session.data.user.name}
                        className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label>Email</Label>
                    <Input
                        disabled
                        value={session.data.user.email}
                        className="rounded focus:border-slate-500 focus:outline-none focus-visible:ring-0"
                    />
                </div>
            </div>
        </div>
    );
};
