<?php

namespace App\Models;

use App\Enums\RoomTemplate;
use Database\Factories\RoomDesignFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable(['user_id', 'room_template', 'name', 'thumbnail'])]
class RoomDesign extends Model
{
    /** @use HasFactory<RoomDesignFactory> */
    use HasFactory;

    protected $table = 'layouts';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'room_template' => RoomTemplate::class,
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<RoomDesignItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(RoomDesignItem::class, 'layout_id');
    }

    protected static function booted(): void
    {
        static::creating(function (self $roomDesign): void {
            $roomDesign->share_token ??= (string) Str::uuid();
        });
    }
}
