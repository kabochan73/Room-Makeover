import { ROOM_DIMENSIONS } from '@/features/room-editor/constants/roomDimensions';

export default function RoomTemplateCard({ roomTemplate, onSelect }) {
    const { wallColor, floorColor } = ROOM_DIMENSIONS[roomTemplate.value] ?? {};

    return (
        <button
            type="button"
            onClick={() => onSelect(roomTemplate.value)}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:border-accent-300 hover:shadow-md"
        >
            <div className="flex aspect-video flex-col">
                <div
                    className="flex-1"
                    style={{ backgroundColor: wallColor }}
                />
                <div
                    className="h-2/5"
                    style={{ backgroundColor: floorColor }}
                />
            </div>

            <div className="p-4">
                <p className="font-medium text-gray-900 group-hover:text-accent-700">
                    {roomTemplate.label}
                </p>
            </div>
        </button>
    );
}
