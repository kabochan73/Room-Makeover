// Visual-only geometry for each room template (width/depth/colors for the 3D scene).
// The template's id and display label are owned by the backend (App\Enums\RoomTemplate)
// and passed in via props; this file only adds what the 3D scene needs to render a room.
export const ROOM_DIMENSIONS = {
    room_4x4: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 4, depth: 4 },
    room_5x5: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 5, depth: 5 },
    room_6x6: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 6, depth: 6 },
    room_4x6: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 4, depth: 6 },
    room_5x7: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 5, depth: 7 },
    room_6x8: { floorColor: '#e8c48f', wallColor: '#faf0e6', width: 6, depth: 8 },
};

export const DEFAULT_ROOM_SIZE = 6;
export const WALL_HEIGHT = 2.5;
