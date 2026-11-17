<?php

namespace App\Http\Controllers;

use App\Enums\RoomTemplate;
use App\Http\Requests\StoreRoomDesignRequest;
use App\Http\Requests\UpdateRoomDesignRequest;
use App\Models\FurnitureCatalog;
use App\Models\RoomDesign;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RoomDesignController extends Controller
{
    /**
     * Show the room template picker.
     */
    public function create(): Response
    {
        return Inertia::render('RoomDesigns/Create', [
            'roomTemplates' => RoomTemplate::options(),
        ]);
    }

    /**
     * Create a new room design from the chosen room template.
     */
    public function store(StoreRoomDesignRequest $request): RedirectResponse
    {
        $roomTemplate = RoomTemplate::from($request->validated('room_template'));

        $roomDesign = $request->user()->roomDesigns()->create([
            'room_template' => $roomTemplate,
            'name' => $roomTemplate->defaultName(),
        ]);

        return redirect()->route('room-designs.edit', $roomDesign);
    }

    /**
     * Show the furniture placement editor for a room design.
     */
    public function edit(RoomDesign $roomDesign): Response
    {
        Gate::authorize('update', $roomDesign);

        return Inertia::render('RoomDesigns/Edit', [
            'roomDesign' => $roomDesign->load('items.furnitureCatalog'),
            'furnitureCatalog' => FurnitureCatalog::all(),
        ]);
    }

    /**
     * Save the furniture placement for a room design.
     */
    public function update(UpdateRoomDesignRequest $request, RoomDesign $roomDesign): RedirectResponse
    {
        $validated = $request->validated();

        $roomDesign->name = $validated['name'];

        if (! empty($validated['thumbnail'])) {
            $roomDesign->thumbnail = $this->storeThumbnail($validated['thumbnail'], $roomDesign);
        }

        $roomDesign->save();

        $roomDesign->items()->delete();
        $roomDesign->items()->createMany($validated['items']);

        return redirect()->route('dashboard');
    }

    /**
     * Delete a room design.
     */
    public function destroy(RoomDesign $roomDesign): RedirectResponse
    {
        Gate::authorize('delete', $roomDesign);

        $roomDesign->delete();

        return redirect()->route('dashboard');
    }

    /**
     * Decode a base64 PNG data URL and store it, returning its public path.
     */
    private function storeThumbnail(string $dataUrl, RoomDesign $roomDesign): string
    {
        [, $encoded] = explode(',', $dataUrl, 2);

        $path = 'thumbnails/'.$roomDesign->share_token.'.png';

        Storage::disk('public')->put($path, base64_decode($encoded));

        return $path;
    }
}
