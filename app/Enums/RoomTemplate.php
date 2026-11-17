<?php

namespace App\Enums;

enum RoomTemplate: string
{
    case Room4x4 = 'room_4x4';
    case Room5x5 = 'room_5x5';
    case Room6x6 = 'room_6x6';
    case Room4x6 = 'room_4x6';
    case Room5x7 = 'room_5x7';
    case Room6x8 = 'room_6x8';

    public function label(): string
    {
        return match ($this) {
            self::Room4x4 => 'Room 4×4',
            self::Room5x5 => 'Room 5×5',
            self::Room6x6 => 'Room 6×6',
            self::Room4x6 => 'Room 4×6',
            self::Room5x7 => 'Room 5×7',
            self::Room6x8 => 'Room 6×8',
        };
    }

    /**
     * The default name given to a room design created from this template.
     */
    public function defaultName(): string
    {
        return "{$this->label()} Room";
    }

    /**
     * Serializable list of templates for the room picker screen.
     *
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $template) => ['value' => $template->value, 'label' => $template->label()],
            self::cases(),
        );
    }
}
