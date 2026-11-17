import RoomTemplateCard from '@/features/room-picker/components/RoomTemplateCard';
import AuthenticatedLayout from '@/shared/layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Create({ roomTemplates }) {
    const selectTemplate = (roomTemplate) => {
        router.post(route('room-designs.store'), { room_template: roomTemplate });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Choose a room" />

            <div className="mx-auto max-w-5xl px-6 py-12">
                <h1 className="mb-6 text-4xl font-bold text-gray-800">
                    Choose a room
                </h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {roomTemplates.map((roomTemplate) => (
                        <RoomTemplateCard
                            key={roomTemplate.value}
                            roomTemplate={roomTemplate}
                            onSelect={selectTemplate}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
