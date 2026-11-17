<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomDesignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('roomDesign'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'thumbnail' => ['nullable', 'string'],
            'items' => ['present', 'array'],
            'items.*.furniture_catalog_id' => ['required', 'integer', 'exists:furniture_catalog,id'],
            'items.*.position_x' => ['required', 'numeric'],
            'items.*.position_y' => ['required', 'numeric'],
            'items.*.position_z' => ['required', 'numeric'],
            'items.*.rotation_y' => ['required', 'numeric'],
        ];
    }
}
